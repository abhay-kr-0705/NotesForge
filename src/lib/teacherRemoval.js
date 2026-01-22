import * as tf from '@tensorflow/tfjs';
import * as bodyPix from '@tensorflow-models/body-pix';

let model = null;
let modelLoading = false;

/**
 * Load the BodyPix model (cached after first load)
 */
export async function loadBodyPixModel(onProgress) {
    if (model) return model;
    if (modelLoading) {
        // Wait for existing load
        while (modelLoading) {
            await new Promise(r => setTimeout(r, 100));
        }
        return model;
    }

    modelLoading = true;
    onProgress?.('Loading AI model...');

    try {
        // Use MobileNetV1 for faster loading and inference
        model = await bodyPix.load({
            architecture: 'MobileNetV1',
            outputStride: 16,
            multiplier: 0.75,
            quantBytes: 2
        });
        return model;
    } finally {
        modelLoading = false;
    }
}

/**
 * Detect the dominant background color from non-person pixels
 */
function detectBackgroundColor(imageData, segmentation) {
    const data = imageData.data;
    const segData = segmentation.data;

    // Collect color samples from background (non-person) pixels
    const colorCounts = {};
    let totalBgPixels = 0;

    for (let i = 0; i < segData.length; i++) {
        if (segData[i] === 0) { // Background pixel
            const pixelIndex = i * 4;
            const r = data[pixelIndex];
            const g = data[pixelIndex + 1];
            const b = data[pixelIndex + 2];

            // Quantize colors to reduce unique values (group similar colors)
            const qr = Math.round(r / 32) * 32;
            const qg = Math.round(g / 32) * 32;
            const qb = Math.round(b / 32) * 32;

            const colorKey = `${qr},${qg},${qb}`;
            colorCounts[colorKey] = (colorCounts[colorKey] || 0) + 1;
            totalBgPixels++;
        }
    }

    // Find the most common background color
    let dominantColor = { r: 255, g: 255, b: 255 }; // Default white
    let maxCount = 0;

    for (const [key, count] of Object.entries(colorCounts)) {
        if (count > maxCount) {
            maxCount = count;
            const [r, g, b] = key.split(',').map(Number);
            dominantColor = { r, g, b };
        }
    }

    return dominantColor;
}

/**
 * Remove person from image and fill with detected background color
 * @param {HTMLCanvasElement} canvas - The input image canvas
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<HTMLCanvasElement>} - Canvas with person removed
 */
export async function removeTeacher(canvas, onProgress) {
    onProgress?.('Loading AI model...');
    const net = await loadBodyPixModel(onProgress);

    onProgress?.('Detecting person...');

    // Run segmentation
    const segmentation = await net.segmentPerson(canvas, {
        flipHorizontal: false,
        internalResolution: 'medium',
        segmentationThreshold: 0.7
    });

    // Check if person was detected
    const personPixels = segmentation.data.filter(x => x === 1).length;
    const totalPixels = segmentation.data.length;
    const personPercent = (personPixels / totalPixels) * 100;

    if (personPercent < 1) {
        onProgress?.('No person detected');
        return canvas; // No person found, return original
    }

    onProgress?.(`Person detected (${personPercent.toFixed(1)}% of image)...`);

    // Get image data
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Detect background color
    onProgress?.('Analyzing background color...');
    const bgColor = detectBackgroundColor(imageData, segmentation);

    onProgress?.('Removing person...');

    // Create a slightly expanded mask to remove person edges
    const expandedMask = expandMask(segmentation.data, canvas.width, canvas.height, 5);

    // Fill person pixels with background color
    for (let i = 0; i < expandedMask.length; i++) {
        if (expandedMask[i] === 1) { // Person pixel
            const pixelIndex = i * 4;
            data[pixelIndex] = bgColor.r;
            data[pixelIndex + 1] = bgColor.g;
            data[pixelIndex + 2] = bgColor.b;
            // Keep alpha
        }
    }

    // Put the modified image back
    ctx.putImageData(imageData, 0, 0);

    onProgress?.('Person removed successfully!');
    return canvas;
}

/**
 * Expand the person mask by a few pixels to catch edges
 */
function expandMask(mask, width, height, radius) {
    const expanded = new Uint8Array(mask.length);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = y * width + x;

            // Check if any neighbor within radius is a person
            let isPerson = false;
            for (let dy = -radius; dy <= radius && !isPerson; dy++) {
                for (let dx = -radius; dx <= radius && !isPerson; dx++) {
                    const ny = y + dy;
                    const nx = x + dx;
                    if (ny >= 0 && ny < height && nx >= 0 && nx < width) {
                        const ni = ny * width + nx;
                        if (mask[ni] === 1) {
                            isPerson = true;
                        }
                    }
                }
            }
            expanded[i] = isPerson ? 1 : 0;
        }
    }

    return expanded;
}

/**
 * Check if BodyPix model is already loaded
 */
export function isModelLoaded() {
    return model !== null;
}
