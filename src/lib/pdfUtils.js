import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument, rgb } from 'pdf-lib';

// Robustly handle the worker import for Vite
// Using the non-minified version often avoids bundling issues
// Handle potential ESM/CJS interop issues
const pdfjs = pdfjsLib.default ? pdfjsLib.default : pdfjsLib;

// Use CDN for worker to prevent version mismatches
// Version 4.x requires .mjs extension for the worker
if (pdfjs.version.startsWith('4.')) {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
} else {
    // Fallback for v3.x and below
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
}

export async function loadPdf(file) {
    try {
        const arrayBuffer = await file.arrayBuffer();
        // Use the resolved 'pdfjs' object
        const loadingTask = pdfjs.getDocument(arrayBuffer);
        const pdf = await loadingTask.promise;
        return pdf;
    } catch (error) {
        console.error("Error loading PDF:", error);
        throw new Error("Failed to parse PDF file. " + error.message);
    }
}

export async function renderPageToImage(pdf, pageNum, scale = 1.5) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await page.render({ canvasContext: context, viewport }).promise;
    return canvas;
}

// Analyze image to find the dominant background color
function detectBackgroundColor(imageData) {
    const data = imageData.data;
    const colorCounts = {};

    // Sample every 10th pixel for performance
    for (let i = 0; i < data.length; i += 40) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Quantize colors to reduce unique values
        const qr = Math.floor(r / 32) * 32;
        const qg = Math.floor(g / 32) * 32;
        const qb = Math.floor(b / 32) * 32;

        const key = `${qr},${qg},${qb}`;
        colorCounts[key] = (colorCounts[key] || 0) + 1;
    }

    // Find most common color (background)
    let maxCount = 0;
    let bgColor = { r: 0, g: 0, b: 0 };

    for (const [key, count] of Object.entries(colorCounts)) {
        if (count > maxCount) {
            maxCount = count;
            const [r, g, b] = key.split(',').map(Number);
            bgColor = { r, g, b };
        }
    }

    return bgColor;
}

// Smart Invert: Inverts colors ensuring background becomes white
export function smartInvertColors(canvas) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas;
}

// Advanced Clear Background: Detects background color and replaces with white
// while preserving text and annotations of all colors
export function clearBackground(canvas, sensitivity = 40) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Detect the dominant background color
    const bgColor = detectBackgroundColor(imageData);

    // Calculate if background is dark or light
    const bgBrightness = (bgColor.r + bgColor.g + bgColor.b) / 3;
    const isDarkBg = bgBrightness < 128;

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Calculate color distance from background
        const dr = Math.abs(r - bgColor.r);
        const dg = Math.abs(g - bgColor.g);
        const db = Math.abs(b - bgColor.b);
        const distance = Math.sqrt(dr * dr + dg * dg + db * db);

        // If pixel is similar to background, make it white
        if (distance < sensitivity) {
            data[i] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
        } else if (isDarkBg) {
            // For dark backgrounds, boost the contrast of text/content
            // by making dark content darker and light content lighter
            const brightness = (r + g + b) / 3;
            if (brightness < 100) {
                // Dark content - make it pure black for better visibility
                data[i] = 0;
                data[i + 1] = 0;
                data[i + 2] = 0;
            } else {
                // Preserve colored annotations/highlights
                // Increase saturation and contrast
                const max = Math.max(r, g, b);
                const min = Math.min(r, g, b);
                if (max - min > 30) {
                    // This is a colored element, preserve but enhance
                    const factor = 1.2;
                    data[i] = Math.min(255, r * factor);
                    data[i + 1] = Math.min(255, g * factor);
                    data[i + 2] = Math.min(255, b * factor);
                }
            }
        }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas;
}

// Grayscale conversion
export function applyGrayscale(canvas) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        // Use luminance formula for better grayscale
        const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        data[i] = gray;
        data[i + 1] = gray;
        data[i + 2] = gray;
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas;
}

// Black & White (high contrast)
export function applyBlackAndWhite(canvas, threshold = 128) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        const value = gray > threshold ? 255 : 0;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas;
}

// Advanced Watermark/Logo Detection and Removal
// Detects semi-transparent overlays and repeating patterns
export function removeWatermark(canvas, threshold = 0.15) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const width = canvas.width;
    const height = canvas.height;

    // Detect the dominant background color first
    const bgColor = detectBackgroundColor(imageData);
    const bgBrightness = (bgColor.r + bgColor.g + bgColor.b) / 3;

    // Analyze color frequency to detect watermark colors
    // Watermarks are usually semi-transparent and appear as a subtle tint
    const colorHistogram = {};

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Skip pure black and pure white (likely text or background)
        const brightness = (r + g + b) / 3;
        if (brightness < 20 || brightness > 235) continue;

        // Skip colors very close to background
        const dr = Math.abs(r - bgColor.r);
        const dg = Math.abs(g - bgColor.g);
        const db = Math.abs(b - bgColor.b);
        if (dr < 20 && dg < 20 && db < 20) continue;

        // Quantize
        const qr = Math.floor(r / 16) * 16;
        const qg = Math.floor(g / 16) * 16;
        const qb = Math.floor(b / 16) * 16;
        const key = `${qr},${qg},${qb}`;
        colorHistogram[key] = (colorHistogram[key] || 0) + 1;
    }

    // Find colors that appear frequently but are not dominant (potential watermarks)
    const totalPixels = (width * height) / 4;
    const watermarkColors = [];

    for (const [key, count] of Object.entries(colorHistogram)) {
        const frequency = count / totalPixels;
        // Watermarks typically cover 5-40% of pixels with a consistent color
        if (frequency > 0.03 && frequency < 0.4) {
            const [r, g, b] = key.split(',').map(Number);
            // Check if it's a muted/gray color (typical for watermarks)
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            const saturation = max === 0 ? 0 : (max - min) / max;

            if (saturation < 0.3) {
                watermarkColors.push({ r, g, b, count });
            }
        }
    }

    // Remove detected watermark colors
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        for (const wc of watermarkColors) {
            const dr = Math.abs(r - wc.r);
            const dg = Math.abs(g - wc.g);
            const db = Math.abs(b - wc.b);

            if (dr < 25 && dg < 25 && db < 25) {
                // Replace with white (or background color for better blending)
                data[i] = 255;
                data[i + 1] = 255;
                data[i + 2] = 255;
                break;
            }
        }
    }

    // Second pass: Remove very light gray overlays (common watermark style)
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Detect light gray pixels that could be watermarks
        const brightness = (r + g + b) / 3;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);

        // Light gray watermarks typically have low saturation and medium-high brightness
        if (brightness > 180 && brightness < 250 && (max - min) < 20) {
            // Check surrounding pixels - if they're mostly white, this might be watermark text
            data[i] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
        }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas;
}

// Legacy corner removal (kept for backward compatibility but not recommended)
export function removeLogo(canvas, cornerSize = 80) {
    // Now redirects to watermark removal for better results
    return removeWatermark(canvas);
}

// Apply all selected filters to a canvas
export function applyFilters(canvas, settings) {
    let processed = canvas;

    // First apply inversion if needed
    if (settings.invert) {
        processed = smartInvertColors(processed);
    }

    // Then clear background (works better after inversion)
    if (settings.clearBackground) {
        processed = clearBackground(processed);
    }

    // Remove watermarks/logos
    if (settings.removeLogo) {
        processed = removeWatermark(processed);
    }

    // Apply color adjustments last
    if (settings.greyscale) {
        processed = applyGrayscale(processed);
    }

    if (settings.blackAndWhite) {
        processed = applyBlackAndWhite(processed);
    }

    return processed;
}

// Legacy function for backward compatibility
export function invertCanvasColors(canvas) {
    return smartInvertColors(canvas);
}

export async function generateGridPdf(images, settings) {
    const pdfDoc = await PDFDocument.create();
    const { showBorders, addPageNumbers, orientation, documentSize } = settings;

    let rows = settings.rows || 1;
    let cols = settings.cols || 1;
    const slidesPerPage = rows * cols;

    const margin = settings.margin || 20;
    const cellPadding = settings.cellPadding || 5;

    let pageWidth, pageHeight;

    if (documentSize === 'A4' || !documentSize) {
        pageWidth = 595.28;
        pageHeight = 841.89;
    } else if (documentSize === 'Letter') {
        pageWidth = 612;
        pageHeight = 792;
    } else {
        const firstCanvas = images[0]?.canvas;
        if (firstCanvas) {
            pageWidth = firstCanvas.width * 0.75;
            pageHeight = firstCanvas.height * 0.75;
        } else {
            pageWidth = 595.28;
            pageHeight = 841.89;
        }
    }

    if (orientation === 'landscape') {
        [pageWidth, pageHeight] = [pageHeight, pageWidth];
    }

    const cellWidth = (pageWidth - (margin * 2)) / cols;
    const cellHeight = (pageHeight - (margin * 2)) / rows;

    let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
    let idxOnPage = 0;

    for (let i = 0; i < images.length; i++) {
        if (idxOnPage >= slidesPerPage) {
            currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
            idxOnPage = 0;
        }

        const { canvas } = images[i];

        let quality = 0.8;
        if (settings.quality === 'high') quality = 0.95;
        else if (settings.quality === 'low') quality = 0.6;

        const imgBytes = canvas.toDataURL('image/jpeg', quality);
        const embeddedImage = await pdfDoc.embedJpg(imgBytes);

        const colVal = idxOnPage % cols;
        const rowVal = Math.floor(idxOnPage / cols);

        const x = margin + (colVal * cellWidth);
        const y = pageHeight - margin - ((rowVal + 1) * cellHeight);

        const imgDims = embeddedImage.scaleToFit(
            cellWidth - (cellPadding * 2),
            cellHeight - (cellPadding * 2)
        );

        const xOffset = (cellWidth - imgDims.width) / 2;
        const yOffset = (cellHeight - imgDims.height) / 2;

        currentPage.drawImage(embeddedImage, {
            x: x + xOffset,
            y: y + yOffset,
            width: imgDims.width,
            height: imgDims.height,
        });

        if (showBorders) {
            currentPage.drawRectangle({
                x: x,
                y: y,
                width: cellWidth,
                height: cellHeight,
                borderWidth: 0.5,
                borderColor: rgb(0.7, 0.7, 0.7),
                opacity: 0,
                borderOpacity: 1
            });
        }

        idxOnPage++;
    }

    if (addPageNumbers) {
        const pages = pdfDoc.getPages();
        for (let i = 0; i < pages.length; i++) {
            const page = pages[i];
            const { width } = page.getSize();
            page.drawText(`${i + 1} / ${pages.length}`, {
                x: width / 2 - 20,
                y: 15,
                size: 10,
                color: rgb(0.5, 0.5, 0.5),
            });
        }
    }

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
}
