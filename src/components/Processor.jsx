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
import { TermsPage, PrivacyPage, RefundPage } from './pages/PolicyPages';
import { Button } from './ui/Button';
import { AdBanner } from './ui/AdBanner';
import { loadPdf, renderPageToImage, applyFilters, generateGridPdf } from '../lib/pdfUtils';
import { Loader2, ArrowLeft, FileText, X, Plus, ChevronRight, Lightbulb, CheckCircle2, Hammer } from 'lucide-react';

export function Processor({ currentPage, onNavigate }) {
    const [step, setStep] = useState('home');
    const [files, setFiles] = useState([]); // Multi-file support
    const [pages, setPages] = useState([]);
    const [selectedPages, setSelectedPages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [status, setStatus] = useState('');
    const [processedPdfBlob, setProcessedPdfBlob] = useState(null);
    const fileInputRef = useRef(null);

    const [settings, setSettings] = useState({
        invert: true,
        clearBackground: false,
        greyscale: false,
        blackAndWhite: false,
        removeLogo: false,
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

        try {
            const pdf = await loadPdf(selectedFile);
            const numPages = pdf.numPages;
            const newPages = [...pages];
            const startId = pages.length;

            for (let i = 1; i <= numPages; i++) {
                setStatus(`Rendering page ${i} of ${numPages}...`);
                const canvas = await renderPageToImage(pdf, i, 0.5);
                newPages.push({
                    id: startId + i,
                    pageNum: i,
                    fileIndex: newFiles.length - 1,
                    fileName: selectedFile.name,
                    thumbnail: canvas.toDataURL(),
                    edited: false,
                });
            }
            setPages(newPages);
            setSelectedPages(newPages.map(p => p.id));

            // Stay on upload step to allow adding more PDFs
            if (step !== 'upload') {
                setStep('upload');
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

    const handleProcess = async () => {
        if (files.length === 0) return;
        setProcessing(true);
        setStep('processing');

        try {
            const processedImages = [];

            for (let i = 0; i < selectedPages.length; i++) {
                const pageId = selectedPages[i];
                const pageData = pages.find(p => p.id === pageId);
                if (!pageData) continue;

                setStatus(`Processing page ${i + 1}/${selectedPages.length}...`);

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
                } else {
                    // Render from original PDF
                    const file = files[pageData.fileIndex];
                    const pdf = await loadPdf(file);
                    const scale = settings.quality === 'high' ? 2 : settings.quality === 'low' ? 1 : 1.5;
                    canvas = await renderPageToImage(pdf, pageData.pageNum, scale);

                    // Apply all selected filters
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
        setPages([]);
        setSelectedPages([]);
        setProcessedPdfBlob(null);
        setStep('home');
        onNavigate('home');
    };

    const goBack = () => {
        if (step === 'upload') { setStep('home'); onNavigate('home'); }
        else if (step === 'select') setStep('upload');
        else if (step === 'settings') setStep('select');
    };

    const getTotalSize = () => {
        return files.reduce((acc, f) => acc + f.size, 0);
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

                <button
                    onClick={() => { setStep('home'); onNavigate('home'); }}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </button>

                {/* Pro Tip */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <div className="p-1.5 rounded-full bg-amber-500">
                        <Lightbulb className="w-4 h-4 text-slate-900" />
                    </div>
                    <div>
                        <span className="text-amber-400 font-medium">Pro Tip for Best Experience</span>
                        <p className="text-slate-400 text-sm mt-1">
                            For smooth and fast processing, make sure to <span className="text-white">close unnecessary browser tabs</span> and give your device enough breathing room. This helps us work our magic faster!
                        </p>
                    </div>
                </div>

                {/* Ad Banner - After Pro Tip */}
                <AdBanner type="horizontal" className="max-w-3xl" />

                {/* Show upload zone if no files yet */}
                {files.length === 0 && (
                    <>
                        <UploadZone onFileSelect={handleFileSelect} />
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
                    <div className="p-6 rounded-xl bg-slate-900/50 border border-white/5 space-y-4">
                        <h3 className="text-lg font-semibold text-white">Selected PDFs ({files.length})</h3>

                        <div className="space-y-2 max-h-60 overflow-y-auto scrollbar-thin">
                            {files.map((file, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700 group hover:border-slate-600 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-violet-500/20">
                                            <FileText className="w-4 h-4 text-violet-400" />
                                        </div>
                                        <div>
                                            <span className="text-white text-sm">{file.name}</span>
                                            <span className="text-xs text-slate-500 ml-2">({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
                                        </div>
                                        <span className="text-xs text-emerald-400 flex items-center gap-1">
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
                        <div className="flex items-center justify-between pt-4 border-t border-white/5 text-sm">
                            <span className="text-slate-400">
                                Total: <span className="text-white">{files.length} PDF{files.length > 1 ? 's' : ''}</span> •
                                <span className="text-white ml-1">{pages.length} pages</span> •
                                <span className="text-white ml-1">{(getTotalSize() / (1024 * 1024)).toFixed(2)} MB</span>
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
            </div>
        );
    }

    // SELECT: Page selection
    if (step === 'select') {
        return (
            <div className="max-w-6xl mx-auto space-y-6">
                <StepProgress currentStep={3} />
                <PageSelector
                    pages={pages}
                    selectedPages={selectedPages}
                    onSelectionChange={setSelectedPages}
                    onPageEdit={handlePageEdit}
                    onContinue={() => setStep('settings')}
                    onBack={goBack}
                />
            </div>
        );
    }

    // SETTINGS: Enhancement & Layout
    if (step === 'settings' || step === 'processing') {
        return (
            <div className="space-y-6">
                <StepProgress currentStep={step === 'processing' ? 5 : 4} />

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
                    name: files.length === 1 ? files[0]?.name?.replace('.pdf', '') : 'Combined',
                    originalSize: (getTotalSize() / 1024).toFixed(2),
                    finalSize: (processedPdfBlob?.size / (1024 * 1024)).toFixed(2),
                    pageCount: Math.ceil(selectedPages.length / (settings.rows * settings.cols))
                }}
                onDownload={handleDownload}
                onPreview={handlePreview}
                onProcessAnother={reset}
            />
        );
    }

    return null;
}
