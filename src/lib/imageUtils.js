import { PDFDocument, rgb } from 'pdf-lib';

/**
 * Load an image file and return a canvas with the image rendered
 */
export async function loadImageToCanvas(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                resolve({
                    canvas,
                    width: img.width,
                    height: img.height,
                    name: file.name,
                    dataUrl: canvas.toDataURL('image/png')
                });
            };
            img.onerror = reject;
            img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

/**
 * Apply filters to image canvas (same as PDF pages)
 */
export function applyImageFilters(canvas, settings) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];

        // Smart Invert (preserves colors but inverts brightness)
        if (settings.invert) {
            r = 255 - r;
            g = 255 - g;
            b = 255 - b;
        }

        // Greyscale
        if (settings.greyscale) {
            const grey = 0.299 * r + 0.587 * g + 0.114 * b;
            r = g = b = grey;
        }

        // Black & White (threshold)
        if (settings.blackAndWhite) {
            const grey = 0.299 * r + 0.587 * g + 0.114 * b;
            const bw = grey > 128 ? 255 : 0;
            r = g = b = bw;
        }

        // Clear Background (make near-white pixels white)
        if (settings.clearBackground) {
            const brightness = (r + g + b) / 3;
            if (brightness > 200) {
                r = g = b = 255;
            }
        }

        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas;
}

/**
 * Generate a PDF from multiple images with grid layout
 */
export async function generatePdfFromImages(images, settings) {
    const pdfDoc = await PDFDocument.create();

    // Page dimensions
    const pageSizes = {
        'A4': { width: 595.28, height: 841.89 },
        'Letter': { width: 612, height: 792 },
        'A3': { width: 841.89, height: 1190.55 },
    };

    let pageSize = pageSizes[settings.documentSize] || pageSizes['A4'];

    // Swap for landscape
    if (settings.orientation === 'landscape') {
        pageSize = { width: pageSize.height, height: pageSize.width };
    }

    const margin = settings.margin || 20;
    const cellPadding = settings.cellPadding || 5;
    const rows = settings.rows || 2;
    const cols = settings.cols || 2;
    const imagesPerPage = rows * cols;

    const contentWidth = pageSize.width - 2 * margin;
    const contentHeight = pageSize.height - 2 * margin;
    const cellWidth = contentWidth / cols;
    const cellHeight = contentHeight / rows;

    let imageIndex = 0;
    const totalPages = Math.ceil(images.length / imagesPerPage);

    for (let pageNum = 0; pageNum < totalPages; pageNum++) {
        const page = pdfDoc.addPage([pageSize.width, pageSize.height]);

        for (let row = 0; row < rows && imageIndex < images.length; row++) {
            for (let col = 0; col < cols && imageIndex < images.length; col++) {
                const img = images[imageIndex];

                // Use the processed canvas data
                const imgDataUrl = img.dataUrl || img.canvas.toDataURL('image/png');
                const imgBytes = await fetch(imgDataUrl).then(res => res.arrayBuffer());

                let embeddedImg;
                if (imgDataUrl.includes('image/jpeg') || imgDataUrl.includes('image/jpg')) {
                    embeddedImg = await pdfDoc.embedJpg(imgBytes);
                } else {
                    embeddedImg = await pdfDoc.embedPng(imgBytes);
                }

                const x = margin + col * cellWidth + cellPadding;
                const y = pageSize.height - margin - (row + 1) * cellHeight + cellPadding;
                const drawWidth = cellWidth - 2 * cellPadding;
                const drawHeight = cellHeight - 2 * cellPadding;

                // Scale image to fit cell while maintaining aspect ratio
                const imgAspect = embeddedImg.width / embeddedImg.height;
                const cellAspect = drawWidth / drawHeight;

                let finalWidth, finalHeight;
                if (imgAspect > cellAspect) {
                    finalWidth = drawWidth;
                    finalHeight = drawWidth / imgAspect;
                } else {
                    finalHeight = drawHeight;
                    finalWidth = drawHeight * imgAspect;
                }

                // Center in cell
                const xOffset = (drawWidth - finalWidth) / 2;
                const yOffset = (drawHeight - finalHeight) / 2;

                page.drawImage(embeddedImg, {
                    x: x + xOffset,
                    y: y + yOffset,
                    width: finalWidth,
                    height: finalHeight,
                });

                // Draw border if enabled
                if (settings.showBorders) {
                    page.drawRectangle({
                        x: x,
                        y: y,
                        width: drawWidth,
                        height: drawHeight,
                        borderColor: rgb(0.7, 0.7, 0.7),
                        borderWidth: 0.5,
                    });
                }

                imageIndex++;
            }
        }

        // Add page number if enabled
        if (settings.addPageNumbers) {
            page.drawText(`${pageNum + 1} / ${totalPages}`, {
                x: pageSize.width / 2 - 20,
                y: 15,
                size: 10,
                color: rgb(0.5, 0.5, 0.5),
            });
        }
    }

    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
}
