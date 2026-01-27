import React, { useState, useRef } from 'react';
import { UploadZone } from './UploadZone';
import { PageSelector } from './PageSelector';
import { EnhancedSettingsPanel } from './EnhancedSettingsPanel';
import { SuccessScreen } from './SuccessScreen';
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { HowToUseSection } from './HowToUseSection';
import { StepProgress } from './StepProgress';
import { AboutPage } from './pages/AboutPage';
import { HelpCenterPage } from './pages/HelpCenterPage';
import { SupportPage } from './pages/SupportPage';
import { ContactPage } from './pages/ContactPage';
import { BlogPage } from './pages/BlogPage';
import { TermsPage, PrivacyPage, RefundPage } from './pages/PolicyPages';
import { Button } from './ui/Button';
import { AdBanner } from './ui/AdBanner';
import { loadPdf, renderPageToImage, applyFilters, generateGridPdf } from '../lib/pdfUtils';
import { loadImageToCanvas, applyImageFilters, generatePdfFromImages } from '../lib/imageUtils';
import { removeTeacher } from '../lib/teacherRemoval';
import { extractPptxSlides } from '../lib/pptxUtils';
import { Loader2, ArrowLeft, FileText, X, Plus, ChevronRight, Lightbulb, CheckCircle2, Hammer, Image, UserX } from 'lucide-react';
import { useTheme } from '../lib/ThemeContext';
import { trackEvent } from '../lib/firebase';

export function Processor({ currentPage, onNavigate }) {
    const { isLight } = useTheme();
    const [step, setStep] = useState('home');
    const [uploadMode, setUploadMode] = useState('pdf'); // 'pdf', 'images', or 'pptx'
    const [files, setFiles] = useState([]); // Multi-file support
    const [images, setImages] = useState([]); // Image files support
    const [pages, setPages] = useState([]);
    const [selectedPages, setSelectedPages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [status, setStatus] = useState('');
    const [processedPdfBlob, setProcessedPdfBlob] = useState(null);
    const fileInputRef = useRef(null);
    const imageInputRef = useRef(null);
    const pptxInputRef = useRef(null);
    const [draggedImageIndex, setDraggedImageIndex] = useState(null);

    const [settings, setSettings] = useState({
        invert: true,
        clearBackground: false,
        greyscale: false,
        blackAndWhite: false,
        removeLogo: false,
        removeTeacher: false, // AI-powered teacher removal for images
        quality: 'medium',
        documentSize: 'A4',
        orientation: 'portrait',
        rows: 3,
        cols: 1,
        showBorders: false,
        addPageNumbers: true,
        margin: 20,
        cellPadding: 5,
    });

    const updateSettings = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const scrollToUpload = () => {
        setStep('upload');
        onNavigate('upload');
    };

    const handleFileSelect = async (selectedFile) => {
        // Add to files list
        const newFiles = [...files, selectedFile];
        setFiles(newFiles);

        setLoading(true);
        setStatus('Loading PDF...');

        // Track Upload
        if (selectedFile) {
            trackEvent('file_upload', { file_type: 'pdf', file_size: selectedFile.size });
        }

        try {
            const pdf = await loadPdf(selectedFile);
            const numPages = pdf.numPages;
            const addedPages = [];
            const startId = pages.length;

            for (let i = 1; i <= numPages; i++) {
                setStatus(`Rendering page ${i} of ${numPages}...`);
                const canvas = await renderPageToImage(pdf, i, 0.5);
                addedPages.push({
                    id: startId + i,
                    pageNum: i,
                    fileIndex: newFiles.length - 1,
                    fileName: selectedFile.name,
                    thumbnail: canvas.toDataURL(),
                    edited: false,
                });
            }

            const updatedPages = [...pages, ...addedPages];
            setPages(updatedPages);

            // Stay on current step if selecting/editing
            if (step === 'home') {
                setStep('upload');
                setSelectedPages(updatedPages.map(p => p.id));
            } else if (step === 'select') {
                // Refresh selection to include ONLY new pages appended to existing selection
                setSelectedPages([...selectedPages, ...addedPages.map(p => p.id)]);
            } else {
                // Default: Select all
                setSelectedPages(updatedPages.map(p => p.id));
            }
        } catch (err) {
            console.error(err);
            alert('Error loading PDF. Please try a different file.');
            // Remove the failed file
            setFiles(files);
        } finally {
            setLoading(false);
            setStatus('');
        }
    };

    // Handle image uploads
    const handleImagesSelect = async (imageFiles) => {
        setLoading(true);
        setStatus('Loading images...');

        // If coming from home/upload, standard mode. If from select, it's append.
        const isAppend = step === 'select';
        if (!isAppend) setUploadMode('images');

        try {
            const currentImages = isAppend ? images : [];
            const currentPages = isAppend ? pages : [];
            const startImageId = currentImages.length > 0 ? Math.max(...currentImages.map(img => img.id)) : 0;
            const startPageId = currentPages.length > 0 ? Math.max(...currentPages.map(p => p.id)) : 0;

            const loadedImages = [];
            for (let i = 0; i < imageFiles.length; i++) {
                setStatus(`Loading image ${i + 1} of ${imageFiles.length}...`);
                const imgData = await loadImageToCanvas(imageFiles[i]);
                loadedImages.push({
                    id: startImageId + i + 1,
                    ...imgData,
                    selected: true,
                });
            }

            const newImages = [...currentImages, ...loadedImages];
            setImages(newImages);

            const newPages = loadedImages.map((img, idx) => ({
                id: startPageId + idx + 1,
                pageNum: startPageId + idx + 1,
                thumbnail: img.dataUrl,
                imageId: img.id, // Store reference to image
                isImage: true,
            }));

            const allPages = [...currentPages, ...newPages];
            setPages(allPages);

            if (isAppend) {
                setSelectedPages([...selectedPages, ...newPages.map(p => p.id)]);
            } else {
                setSelectedPages(newPages.map(p => p.id));
                setStep('upload');
            }
        } catch (err) {
            console.error(err);
            alert('Error loading images. Please try again.');
        } finally {
            setLoading(false);
            setStatus('');
        }
    };

    // Handle PPTX uploads - extract slides and treat as images
    const handlePptxSelect = async (pptxFile) => {
        console.log("PPTX Handler v2.0 - Loaded"); // Verification log
        setLoading(true);
        setStatus('Extracting PowerPoint slides...');

        const isAppend = step === 'select';
        if (!isAppend) setUploadMode('pptx');

        try {
            const extractedSlides = await extractPptxSlides(pptxFile, (progressMsg) => {
                setStatus(progressMsg);
            });

            if (extractedSlides.length === 0) {
                throw new Error('No slides could be extracted from the PowerPoint file.');
            }

            const currentImages = isAppend ? images : [];
            const currentPages = isAppend ? pages : [];
            const startImageId = currentImages.length > 0 ? Math.max(...currentImages.map(img => img.id)) : 0;
            const startPageId = currentPages.length > 0 ? Math.max(...currentPages.map(p => p.id)) : 0;

            // extractPptxSlides returns slide objects with canvas, dataUrl, width, height properties
            const loadedImages = extractedSlides.map((slide, i) => ({
                id: startImageId + i + 1,
                canvas: slide.canvas,
                dataUrl: slide.dataUrl,
                width: slide.width,
                height: slide.height,
                file: { name: pptxFile.name },
                selected: true,
            }));

            const newImages = [...currentImages, ...loadedImages];
            setImages(newImages);

            const newPages = loadedImages.map((img, idx) => ({
                id: startPageId + idx + 1,
                pageNum: startPageId + idx + 1,
                thumbnail: img.dataUrl,
                imageId: img.id,
                isImage: true,
                isPptx: true,
            }));

            const allPages = [...currentPages, ...newPages];
            setPages(allPages);

            if (isAppend) {
                setSelectedPages([...selectedPages, ...newPages.map(p => p.id)]);
            } else {
                setSelectedPages(newPages.map(p => p.id));
                setStep('upload');
            }
        } catch (err) {
            console.error('PPTX extraction error:', err);
            alert('Error extracting PowerPoint slides: ' + err.message + '\n\nNote: Only .pptx files (PowerPoint 2007+) are supported.');
        } finally {
            setLoading(false);
            setStatus('');
        }
    };

    const handleAddMorePdfs = () => {
        fileInputRef.current?.click();
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileSelect(file);
            e.target.value = ''; // Reset input
        }
    };

    const handleAddMoreImages = () => {
        imageInputRef.current?.click();
    };

    const handleImageInputChange = (e) => {
        const newFiles = Array.from(e.target.files || []);
        if (newFiles.length === 0) return;

        // Delegate to the main handler which supports appending logic
        handleImagesSelect(newFiles);

        // Reset input
        e.target.value = '';
    };

    const handleRemoveFile = (fileIndex) => {
        const newFiles = files.filter((_, i) => i !== fileIndex);
        const newPages = pages.filter(p => p.fileIndex !== fileIndex).map((p, idx) => ({
            ...p,
            id: idx + 1,
            fileIndex: p.fileIndex > fileIndex ? p.fileIndex - 1 : p.fileIndex
        }));
        setFiles(newFiles);
        setPages(newPages);
        setSelectedPages(newPages.map(p => p.id));
    };

    const handlePageEdit = (editedPage) => {
        setPages(pages.map(p => p.id === editedPage.id ? editedPage : p));
    };

    const handlePptxInputChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            handlePptxSelect(file);
            e.target.value = '';
        }
    };

    const handleReorder = (sourceId, targetId) => {
        const sourceIndex = pages.findIndex(p => p.id === sourceId);
        const targetIndex = pages.findIndex(p => p.id === targetId);

        if (sourceIndex === -1 || targetIndex === -1) return;

        const newPages = [...pages];
        const [movedPage] = newPages.splice(sourceIndex, 1);
        newPages.splice(targetIndex, 0, movedPage);

        // Re-assign IDs to maintain sequential order if needed, or just keep original IDs
        // For now, let's keep original IDs as they are used for selection
        setPages(newPages);
    };

    // Drag and Drop (Legacy for Upload step)
    const handleImageDragStart = (e, index) => {
        setDraggedImageIndex(index);
        e.dataTransfer.effectAllowed = 'move';
        // Add a slight delay to allow the drag image to be created
        setTimeout(() => {
            e.target.style.opacity = '0.5';
        }, 0);
    };

    const handleImageDragEnd = (e) => {
        e.target.style.opacity = '1';
        setDraggedImageIndex(null);
    };

    const handleImageDragOver = (e, index) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleImageDrop = (e, dropIndex) => {
        e.preventDefault();
        if (draggedImageIndex === null || draggedImageIndex === dropIndex) return;

        // Reorder images
        const newImages = [...images];
        const draggedImage = newImages[draggedImageIndex];
        newImages.splice(draggedImageIndex, 1);
        newImages.splice(dropIndex, 0, draggedImage);

        // Update images with new order and IDs
        const reorderedImages = newImages.map((img, idx) => ({
            ...img,
            id: idx + 1,
        }));

        setImages(reorderedImages);
        setPages(reorderedImages.map((img, idx) => ({
            id: idx + 1,
            pageNum: idx + 1,
            thumbnail: img.dataUrl,
            isImage: true,
        })));
        setSelectedPages(reorderedImages.map((_, idx) => idx + 1));
        setDraggedImageIndex(null);
    };

    const handleProcess = async () => {
        if (selectedPages.length === 0) return;
        setProcessing(true);
        setStep('processing');

        // Track Process Start
        trackEvent('process_start', {
            pages: selectedPages.length,
            layout: `${settings.rows}x${settings.cols}`
        });

        try {
            const processedImages = [];
            // Use 'pages' array to determine order, but filter by selection
            const pagesToProcess = pages.filter(p => selectedPages.includes(p.id));

            if (pagesToProcess.length === 0) {
                // If selectedPages contains IDs not in pages (shouldn't happen), try intersection
                throw new Error("No valid pages selected.");
            }

            for (let i = 0; i < pagesToProcess.length; i++) {
                const pageData = pagesToProcess[i];
                setStatus(`Processing page ${i + 1}/${pagesToProcess.length}...`);

                let canvas;

                if (pageData.edited) {
                    // Use edited thumbnail
                    canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const img = new Image();
                    await new Promise((resolve) => {
                        img.onload = resolve;
                        img.src = pageData.thumbnail;
                    });
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                } else if (pageData.isImage || pageData.isPptx) {
                    // It's an image/PPT slide
                    const fileId = pageData.imageId || pageData.id; // Fallback to id if imageId missing (legacy)
                    const originalImg = images.find(img => img.id === fileId);

                    if (originalImg && originalImg.canvas) {
                        canvas = document.createElement('canvas');
                        canvas.width = originalImg.canvas.width;
                        canvas.height = originalImg.canvas.height;
                        canvas.getContext('2d').drawImage(originalImg.canvas, 0, 0);
                    } else if (originalImg && originalImg.dataUrl) {
                        // Fallback to dataURL if canvas lost/missing
                        canvas = await loadImageToCanvas(originalImg.file || { name: 'image' }).then(res => res.canvas);
                    } else {
                        // Last resort: thumbnail
                        canvas = document.createElement('canvas');
                        const img = new Image();
                        await new Promise((resolve) => { img.onload = resolve; img.src = pageData.thumbnail; });
                        canvas.width = img.width;
                        canvas.height = img.height;
                        canvas.getContext('2d').drawImage(img, 0, 0);
                    }

                    // Remove teacher if enabled
                    if (settings.removeTeacher) {
                        setStatus(`Removing teacher from page ${i + 1}...`);
                        try {
                            canvas = await removeTeacher(canvas, (msg) => setStatus(`Page ${i + 1}: ${msg}`));
                        } catch (err) {
                            console.warn('Teacher removal failed', err);
                        }
                    }

                    applyImageFilters(canvas, settings);
                } else {
                    // Render from original PDF
                    const file = files[pageData.fileIndex];
                    const pdf = await loadPdf(file);
                    const scale = settings.quality === 'high' ? 2 : settings.quality === 'low' ? 1 : 1.5;
                    canvas = await renderPageToImage(pdf, pageData.pageNum, scale);

                    // Apply all selected filters to PDF page
                    canvas = applyFilters(canvas, settings);
                }

                processedImages.push({ canvas });
            }

            setStatus('Generating Final PDF...');
            const pdfBytes = await generateGridPdf(processedImages, settings);

            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            setProcessedPdfBlob(blob);
            setStep('success');

        } catch (err) {
            console.error(err);
            alert('Processing Failed. Please try again.');
            setStep('settings');
        } finally {
            setProcessing(false);
            setStatus('');
        }
    };

    const handleDownload = () => {
        if (!processedPdfBlob) return;

        // Track Download
        trackEvent('download_pdf', {
            size: processedPdfBlob.size,
            layout: `${settings.rows}x${settings.cols}`
        });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(processedPdfBlob);
        link.download = `NotesForge_${settings.rows}x${settings.cols}.pdf`;
        link.click();
    };

    const handlePreview = () => {
        if (!processedPdfBlob) return;
        window.open(URL.createObjectURL(processedPdfBlob), '_blank');
    };

    const reset = () => {
        setFiles([]);
        setImages([]);
        setPages([]);
        setSelectedPages([]);
        setProcessedPdfBlob(null);
        setUploadMode('pdf');
        setStep('home');
        onNavigate('home');
    };

    const goBack = () => {
        if (step === 'upload') { setStep('home'); onNavigate('home'); }
        else if (step === 'select') setStep('upload');
        else if (step === 'settings') {
            setStep('select');
        }
        else if (step === 'success') {
            // Go back to settings to adjust and reprocess
            setStep('settings');
            setProcessedPdfBlob(null); // Clear the old result
        }
    };

    const getTotalSize = () => {
        return files.reduce((acc, f) => acc + f.size, 0);
    };

    // Step timeline navigation
    const handleStepNavigate = (targetStep, stepId) => {
        // Clear processed result when navigating back
        if (step === 'success' && targetStep !== 'success') {
            setProcessedPdfBlob(null);
        }
        setStep(targetStep);
    };

    const canNavigateToStep = (targetStep) => {
        // Can always navigate to completed steps if we have content
        const hasContent = files.length > 0 || images.length > 0;
        if (!hasContent) return false;

        // Map step names to their order
        const stepOrder = { upload: 1, select: 2, settings: 4, success: 6 };
        const currentOrder = stepOrder[step] || 0;
        const targetOrder = stepOrder[targetStep] || 0;

        // Can navigate to current or earlier steps
        return targetOrder <= currentOrder;
    };

    // ===== STATIC PAGES =====
    if (currentPage === 'about') {
        return <AboutPage onBack={() => onNavigate('home')} />;
    }
    if (currentPage === 'help') {
        return <HelpCenterPage onBack={() => onNavigate('home')} />;
    }
    if (currentPage === 'support') {
        return <SupportPage onBack={() => onNavigate('home')} />;
    }
    if (currentPage === 'contact') {
        return <ContactPage onBack={() => onNavigate('home')} />;
    }
    if (currentPage === 'blog') {
        return <BlogPage onBack={() => onNavigate('home')} />;
    }
    if (currentPage === 'terms') {
        return <TermsPage onBack={() => onNavigate('home')} />;
    }
    if (currentPage === 'privacy') {
        return <PrivacyPage onBack={() => onNavigate('home')} />;
    }
    if (currentPage === 'refund') {
        return <RefundPage onBack={() => onNavigate('home')} />;
    }

    // Reset to home when navigating via navbar
    if (currentPage === 'home' && step !== 'home') {
        setStep('home');
        setFiles([]);
        setPages([]);
        setSelectedPages([]);
        setProcessedPdfBlob(null);
    }

    // ===== WIZARD STEPS =====

    // HOME: Landing page
    if (step === 'home' && currentPage === 'home') {
        return (
            <div className="space-y-0">
                <HeroSection onGetStarted={scrollToUpload} />
                <FeaturesSection />
                <HowToUseSection />
            </div>
        );
    }

    if (currentPage === 'upload' && step === 'home') {
        setStep('upload');
    }

    // UPLOAD: File selection with multi-PDF support
    if (step === 'upload') {
        return (
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Hidden file input for adding more PDFs */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileInputChange}
                    className="hidden"
                />
                <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    multiple
                    onChange={handleImageInputChange}
                    className="hidden"
                />
                <input
                    ref={pptxInputRef}
                    type="file"
                    accept=".pptx,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                    onChange={handlePptxInputChange}
                    className="hidden"
                />

                <button
                    onClick={() => { setStep('home'); onNavigate('home'); }}
                    className={`flex items-center gap-2 transition-colors ${isLight ? "text-slate-500 hover:text-slate-900" : "text-slate-400 hover:text-white"}`}
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </button>

                {/* Pro Tip */}
                <div className={`flex items-start gap-3 p-4 rounded-xl border ${isLight
                    ? "bg-blue-50 border-blue-200"
                    : "bg-blue-500/10 border-blue-500/20"
                    }`}>
                    <div className="p-1.5 rounded-full bg-amber-500">
                        <Lightbulb className="w-4 h-4 text-slate-900" />
                    </div>
                    <div>
                        <span className="text-amber-500 font-medium">Pro Tip for Best Experience</span>
                        <p className={`text-sm mt-1 ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                            For smooth and fast processing, make sure to <span className={isLight ? "text-slate-900 font-medium" : "text-white"}>close unnecessary browser tabs</span> and give your device enough breathing room. This helps us work our magic faster!
                        </p>
                    </div>
                </div>

                {/* Ad Banner - After Pro Tip */}
                <AdBanner type="horizontal" className="max-w-3xl" />

                {/* Show upload zone if no files/images yet */}
                {files.length === 0 && images.length === 0 && (
                    <>
                        <UploadZone
                            onFileSelect={handleFileSelect}
                            onImagesSelect={handleImagesSelect}
                            onPptxSelect={handlePptxSelect}
                        />
                        {/* Ad Banner - After Upload Zone */}
                        <AdBanner type="responsive" className="max-w-2xl" />
                    </>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center gap-4 p-8">
                        <Loader2 className="w-10 h-10 text-violet-500 animate-spin" />
                        <p className="text-slate-400">{status}</p>
                    </div>
                )}

                {/* Selected Files List */}
                {files.length > 0 && !loading && (
                    <div className={`p-6 rounded-xl border space-y-4 ${isLight
                        ? "bg-slate-50 border-slate-200"
                        : "bg-slate-900/50 border-white/5"
                        }`}>
                        <h3 className={`text-lg font-semibold ${isLight ? "text-slate-900" : "text-white"}`}>Selected PDFs ({files.length})</h3>

                        <div className="space-y-2 max-h-60 overflow-y-auto scrollbar-thin">
                            {files.map((file, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${isLight
                                        ? "bg-white border-slate-200 hover:border-slate-300"
                                        : "bg-slate-800/50 border-slate-700 hover:border-slate-600"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${isLight ? "bg-violet-100" : "bg-violet-500/20"}`}>
                                            <FileText className={`w-4 h-4 ${isLight ? "text-violet-600" : "text-violet-400"}`} />
                                        </div>
                                        <div>
                                            <span className={`text-sm ${isLight ? "text-slate-900" : "text-white"}`}>{file.name}</span>
                                            <span className="text-xs text-slate-500 ml-2">({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
                                        </div>
                                        <span className={`text-xs flex items-center gap-1 ${isLight ? "text-emerald-600" : "text-emerald-400"}`}>
                                            <CheckCircle2 className="w-3 h-3" />
                                            {pages.filter(p => p.fileIndex === index).length} pages
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveFile(index)}
                                        className="text-slate-500 hover:text-red-400 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        <div className={`flex items-center justify-between pt-4 border-t text-sm ${isLight ? "border-slate-200" : "border-white/5"}`}>
                            <span className="text-slate-400">
                                Total: <span className={isLight ? "text-slate-900" : "text-white"}>{files.length} PDF{files.length > 1 ? 's' : ''}</span> •
                                <span className={`ml-1 ${isLight ? "text-slate-900" : "text-white"}`}>{pages.length} pages</span> •
                                <span className={`ml-1 ${isLight ? "text-slate-900" : "text-white"}`}>{(getTotalSize() / (1024 * 1024)).toFixed(2)} MB</span>
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                            <Button onClick={() => setStep('select')} className="px-8 gap-2">
                                <CheckCircle2 className="w-4 h-4" />
                                Continue
                            </Button>
                            <Button variant="secondary" onClick={reset}>
                                Clear All
                            </Button>
                        </div>

                        {/* Add More PDFs */}
                        <button
                            onClick={handleAddMorePdfs}
                            className="flex items-center gap-2 text-violet-400 hover:text-violet-300 text-sm mx-auto pt-2 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Add more PDFs
                        </button>
                    </div>
                )}

                {/* Selected Images List */}
                {images.length > 0 && !loading && (
                    <div className={`p-6 rounded-xl border space-y-4 ${isLight
                        ? "bg-slate-50 border-emerald-200"
                        : "bg-slate-900/50 border-emerald-500/20"
                        }`}>
                        <div className="flex items-center justify-between">
                            <h3 className={`text-lg font-semibold flex items-center gap-2 ${isLight ? "text-slate-900" : "text-white"}`}>
                                <Image className={`w-5 h-5 ${isLight ? "text-emerald-600" : "text-emerald-400"}`} />
                                Uploaded Images ({images.length})
                            </h3>
                            <span className="text-xs text-slate-500">
                                💡 Drag images to reorder
                            </span>
                        </div>

                        {/* Image Grid Preview - Draggable */}
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-72 overflow-y-auto scrollbar-thin p-1">
                            {images.map((img, index) => (
                                <div
                                    key={img.id || index}
                                    draggable
                                    onDragStart={(e) => handleImageDragStart(e, index)}
                                    onDragEnd={handleImageDragEnd}
                                    onDragOver={(e) => handleImageDragOver(e, index)}
                                    onDrop={(e) => handleImageDrop(e, index)}
                                    className={`
                                        relative aspect-square rounded-lg overflow-hidden border-2 group cursor-grab active:cursor-grabbing transition-all duration-200
                                        ${draggedImageIndex === index
                                            ? 'border-emerald-500 scale-95 opacity-50'
                                            : draggedImageIndex !== null
                                                ? 'border-dashed border-slate-500 hover:border-emerald-400 hover:scale-105'
                                                : 'border-slate-700 hover:border-emerald-500/50'}
                                    `}
                                >
                                    <img
                                        src={img.dataUrl}
                                        alt={img.name}
                                        className="w-full h-full object-cover pointer-events-none"
                                    />
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const newImages = images.filter((_, i) => i !== index);
                                            setImages(newImages);
                                            setPages(newImages.map((img, idx) => ({
                                                id: idx + 1,
                                                pageNum: idx + 1,
                                                thumbnail: img.dataUrl,
                                                isImage: true,
                                            })));
                                            setSelectedPages(newImages.map(img => img.id));
                                        }}
                                        className="absolute top-1 right-1 p-1 bg-red-500/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                    >
                                        <X className="w-3 h-3 text-white" />
                                    </button>
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[10px] p-1 truncate flex items-center justify-between">
                                        <span className="font-bold">{index + 1}</span>
                                        <span className="opacity-60">⋮⋮</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/5 text-sm">
                            <span className="text-slate-400">
                                Total: <span className="text-white">{images.length} images</span>
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                            <Button onClick={() => setStep('select')} className="px-8 gap-2 bg-gradient-to-r from-emerald-600 to-cyan-600">
                                <CheckCircle2 className="w-4 h-4" />
                                Review & Edit Pages
                            </Button>
                            <Button variant="secondary" onClick={reset}>
                                Clear All
                            </Button>
                        </div>

                        {/* Add More Images */}
                        <button
                            onClick={handleAddMoreImages}
                            className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm mx-auto pt-2 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Add more images
                        </button>
                    </div>
                )}
            </div>
        );
    }

    // SELECT: Page selection
    if (step === 'select') {
        return (
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Hidden file inputs for adding more content */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileInputChange}
                    className="hidden"
                />
                <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    multiple
                    onChange={handleImageInputChange}
                    className="hidden"
                />
                <input
                    ref={pptxInputRef}
                    type="file"
                    accept=".pptx,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                    onChange={handlePptxInputChange}
                    className="hidden"
                />

                <StepProgress currentStep={3} onStepClick={handleStepNavigate} canNavigateToStep={canNavigateToStep} />
                <PageSelector
                    pages={pages}
                    selectedPages={selectedPages}
                    onSelectionChange={setSelectedPages}
                    onPageEdit={handlePageEdit}
                    onContinue={() => setStep('settings')}
                    onBack={goBack}
                    onReorder={handleReorder}
                    onAddPdfs={() => fileInputRef.current?.click()}
                    onAddImages={() => imageInputRef.current?.click()}
                    onAddPptx={() => pptxInputRef.current?.click()}
                />
            </div>
        );
    }

    // SETTINGS: Enhancement & Layout
    if (step === 'settings' || step === 'processing') {
        return (
            <div className="space-y-6">
                <StepProgress currentStep={step === 'processing' ? 5 : 4} onStepClick={handleStepNavigate} canNavigateToStep={canNavigateToStep} />

                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white">Enhance & Format</h2>
                    <p className="text-slate-400">Customize your document with our enhancement tools.</p>
                </div>

                <EnhancedSettingsPanel
                    settings={settings}
                    updateSettings={updateSettings}
                    fileInfo={{
                        name: files.length === 1 ? files[0]?.name : `${files.length} PDFs`,
                        size: getTotalSize(),
                        pageCount: selectedPages.length,
                        excludedCount: pages.length - selectedPages.length
                    }}
                    onBack={goBack}
                    onProcess={handleProcess}
                    processing={processing}
                />

                {processing && (
                    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-slate-900 rounded-2xl p-8 border border-white/10 text-center space-y-4">
                            <Loader2 className="w-12 h-12 text-violet-500 animate-spin mx-auto" />
                            <p className="text-white font-medium">Processing your document...</p>
                            <p className="text-slate-400 text-sm">{status}</p>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // SUCCESS: Download & Donation
    if (step === 'success') {
        return (
            <SuccessScreen
                fileInfo={{
                    name: files.length === 1 ? files[0]?.name?.replace('.pdf', '') : (images.length > 0 ? 'Images' : 'Combined'),
                    originalSize: (getTotalSize() / 1024).toFixed(2),
                    finalSize: (processedPdfBlob?.size / (1024 * 1024)).toFixed(2),
                    pageCount: Math.ceil((images.length || selectedPages.length) / (settings.rows * settings.cols))
                }}
                onDownload={handleDownload}
                onPreview={handlePreview}
                onProcessAnother={reset}
                onGoBack={goBack}
                onStepClick={handleStepNavigate}
                canNavigateToStep={canNavigateToStep}
            />
        );
    }

    return null;
}
