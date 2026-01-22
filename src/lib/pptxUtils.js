import JSZip from 'jszip';

/**
 * Extract slides from a PPTX file
 * PPTX files are ZIP archives containing XML and media files
 * This extracts embedded images and attempts to render slide content
 */
export async function extractPptxSlides(file, onProgress) {
    onProgress?.('Reading PowerPoint file...');

    try {
        const arrayBuffer = await file.arrayBuffer();
        const zip = await JSZip.loadAsync(arrayBuffer);

        onProgress?.('Extracting slides...');

        // Get all slide XML files
        const slideFiles = Object.keys(zip.files)
            .filter(name => name.match(/ppt\/slides\/slide\d+\.xml$/))
            .sort((a, b) => {
                const numA = parseInt(a.match(/slide(\d+)/)[1]);
                const numB = parseInt(b.match(/slide(\d+)/)[1]);
                return numA - numB;
            });

        if (slideFiles.length === 0) {
            throw new Error('No slides found in PowerPoint file');
        }

        onProgress?.(`Found ${slideFiles.length} slides...`);

        // Extract media files (images embedded in slides)
        const mediaFiles = {};
        const mediaFolder = zip.folder('ppt/media');

        if (mediaFolder) {
            const mediaEntries = Object.keys(zip.files)
                .filter(name => name.startsWith('ppt/media/'));

            for (const mediaPath of mediaEntries) {
                const mediaFile = zip.files[mediaPath];
                if (!mediaFile.dir) {
                    const blob = await mediaFile.async('blob');
                    const fileName = mediaPath.split('/').pop();
                    mediaFiles[fileName] = URL.createObjectURL(blob);
                }
            }
        }

        // Try to extract slide relationships to find which images go to which slide
        const slides = [];

        for (let i = 0; i < slideFiles.length; i++) {
            const slideFile = slideFiles[i];
            const slideNum = i + 1;

            onProgress?.(`Processing slide ${slideNum}/${slideFiles.length}...`);

            // Get slide relationships
            const relPath = slideFile.replace('slides/', 'slides/_rels/').replace('.xml', '.xml.rels');
            let slideImages = [];

            if (zip.files[relPath]) {
                const relXml = await zip.files[relPath].async('text');
                // Find image references
                const imageRefs = relXml.match(/Target="\.\.\/media\/[^"]+"/g) || [];
                slideImages = imageRefs.map(ref => {
                    const fileName = ref.match(/media\/([^"]+)/)?.[1];
                    return fileName && mediaFiles[fileName] ? mediaFiles[fileName] : null;
                }).filter(Boolean);
            }

            // Parse slide XML for text content
            const slideXml = await zip.files[slideFile].async('text');
            const textContent = extractTextFromSlideXml(slideXml);

            // Create a canvas representation of the slide
            const canvas = await renderSlideToCanvas(slideNum, textContent, slideImages, onProgress);

            slides.push({
                id: slideNum,
                canvas,
                width: canvas.width,
                height: canvas.height,
                name: `Slide ${slideNum}`,
                dataUrl: canvas.toDataURL('image/png'),
                textContent,
                hasImages: slideImages.length > 0
            });
        }

        // Clean up blob URLs
        Object.values(mediaFiles).forEach(url => URL.revokeObjectURL(url));

        onProgress?.('PowerPoint extraction complete!');
        return slides;

    } catch (error) {
        console.error('PPTX extraction error:', error);
        throw new Error(`Failed to extract PowerPoint: ${error.message}`);
    }
}

/**
 * Extract text content from slide XML
 */
function extractTextFromSlideXml(xml) {
    const texts = [];

    // Match text content in <a:t> tags
    const textMatches = xml.match(/<a:t[^>]*>([^<]*)<\/a:t>/g) || [];

    textMatches.forEach(match => {
        const text = match.replace(/<[^>]+>/g, '').trim();
        if (text) texts.push(text);
    });

    return texts;
}

/**
 * Render slide content to canvas
 */
async function renderSlideToCanvas(slideNum, textContent, images, onProgress) {
    const canvas = document.createElement('canvas');
    // Standard 16:9 slide dimensions
    canvas.width = 1280;
    canvas.height = 720;

    const ctx = canvas.getContext('2d');

    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // If we have images, draw the first one as the slide background
    if (images.length > 0) {
        try {
            const img = await loadImage(images[0]);
            // Scale to fit canvas
            const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
            const x = (canvas.width - img.width * scale) / 2;
            const y = (canvas.height - img.height * scale) / 2;
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        } catch (e) {
            console.warn('Failed to load slide image:', e);
        }
    }

    // Draw text content if no images or as overlay
    if (textContent.length > 0 && images.length === 0) {
        // Dark slide with text
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Slide number
        ctx.fillStyle = '#64748b';
        ctx.font = 'bold 24px Inter, sans-serif';
        ctx.fillText(`Slide ${slideNum}`, 40, 50);

        // Text content
        ctx.fillStyle = '#ffffff';
        ctx.font = '28px Inter, sans-serif';

        let y = 120;
        const lineHeight = 40;
        const maxWidth = canvas.width - 80;

        textContent.forEach((text, idx) => {
            if (idx === 0) {
                // Title - larger font
                ctx.font = 'bold 36px Inter, sans-serif';
                ctx.fillStyle = '#f1f5f9';
            } else {
                ctx.font = '24px Inter, sans-serif';
                ctx.fillStyle = '#cbd5e1';
            }

            // Word wrap
            const words = text.split(' ');
            let line = '';

            words.forEach(word => {
                const testLine = line + word + ' ';
                const metrics = ctx.measureText(testLine);

                if (metrics.width > maxWidth && line !== '') {
                    ctx.fillText(line, 40, y);
                    line = word + ' ';
                    y += lineHeight;
                } else {
                    line = testLine;
                }
            });

            ctx.fillText(line, 40, y);
            y += lineHeight * 1.5;

            if (y > canvas.height - 40) return; // Stop if we run out of space
        });
    }

    // Add slide number watermark
    ctx.fillStyle = 'rgba(100, 116, 139, 0.5)';
    ctx.font = 'bold 48px Inter, sans-serif';
    ctx.fillText(slideNum.toString(), canvas.width - 60, canvas.height - 30);

    return canvas;
}

/**
 * Load an image from URL
 */
function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    });
}

/**
 * Check if a file is a PPTX file
 */
export function isPptxFile(file) {
    return file.name.toLowerCase().endsWith('.pptx') ||
        file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
}
