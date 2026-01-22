import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText, Image, Presentation } from 'lucide-react';
import { cn } from '../lib/cn';

export function UploadZone({ onFileSelect, onImagesSelect, onPptxSelect }) {
    const [mode, setMode] = useState('pdf'); // 'pdf', 'images', or 'pptx'

    const onDropPdf = useCallback((acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            onFileSelect(acceptedFiles[0]);
        }
    }, [onFileSelect]);

    const onDropImages = useCallback((acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            onImagesSelect(acceptedFiles);
        }
    }, [onImagesSelect]);

    const onDropPptx = useCallback((acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            onPptxSelect?.(acceptedFiles[0]);
        }
    }, [onPptxSelect]);

    const pdfDropzone = useDropzone({
        onDrop: onDropPdf,
        accept: { 'application/pdf': ['.pdf'] },
        maxFiles: 1,
        noClick: mode !== 'pdf',
        noDrag: mode !== 'pdf',
    });

    const imageDropzone = useDropzone({
        onDrop: onDropImages,
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/webp': ['.webp'],
            'image/gif': ['.gif']
        },
        multiple: true,
        noClick: mode !== 'images',
        noDrag: mode !== 'images',
    });

    const pptxDropzone = useDropzone({
        onDrop: onDropPptx,
        accept: {
            'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx']
        },
        maxFiles: 1,
        noClick: mode !== 'pptx',
        noDrag: mode !== 'pptx',
    });

    const currentDropzone = mode === 'pdf' ? pdfDropzone : mode === 'images' ? imageDropzone : pptxDropzone;
    const { getRootProps, getInputProps, isDragActive } = currentDropzone;

    const modeConfig = {
        pdf: {
            icon: FileText,
            color: 'violet',
            gradient: 'from-blue-500 to-violet-500',
            hoverGradient: 'from-violet-500/10 via-transparent to-blue-500/10',
            title: isDragActive ? "Drop your PDF here" : "Upload your Lecture Notes",
            description: "Drag and drop your PDF file here, or click to browse. We process everything locally.",
            support: "Supports PDF (Max 100MB)"
        },
        images: {
            icon: Image,
            color: 'emerald',
            gradient: 'from-emerald-500 to-cyan-500',
            hoverGradient: 'from-emerald-500/10 via-transparent to-cyan-500/10',
            title: isDragActive ? "Drop your images here" : "Upload your Screenshots",
            description: "Drag and drop multiple images or screenshots. We'll combine them into a printable PDF.",
            support: "Supports PNG, JPG, WebP, GIF"
        },
        pptx: {
            icon: Presentation,
            color: 'orange',
            gradient: 'from-orange-500 to-red-500',
            hoverGradient: 'from-orange-500/10 via-transparent to-red-500/10',
            title: isDragActive ? "Drop your PowerPoint here" : "Upload your Presentation",
            description: "Drag and drop your PowerPoint file. We'll extract slides and convert to printable PDF.",
            support: "Supports PPTX (PowerPoint 2007+)"
        }
    };

    const config = modeConfig[mode];
    const IconComponent = config.icon;

    return (
        <div className="space-y-4">
            {/* Mode Toggle */}
            <div className="flex items-center justify-center gap-1 p-1 bg-slate-800/50 rounded-full max-w-md mx-auto border border-white/5">
                <button
                    onClick={() => setMode('pdf')}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                        mode === 'pdf'
                            ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-lg"
                            : "text-slate-400 hover:text-white"
                    )}
                >
                    <FileText className="w-4 h-4" />
                    PDF
                </button>
                <button
                    onClick={() => setMode('pptx')}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                        mode === 'pptx'
                            ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                            : "text-slate-400 hover:text-white"
                    )}
                >
                    <Presentation className="w-4 h-4" />
                    PPT
                </button>
                <button
                    onClick={() => setMode('images')}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                        mode === 'images'
                            ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg"
                            : "text-slate-400 hover:text-white"
                    )}
                >
                    <Image className="w-4 h-4" />
                    Images
                </button>
            </div>

            {/* Drop Zone */}
            <div
                {...getRootProps()}
                className={cn(
                    "relative group cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed border-slate-700 bg-surface/50 p-12 text-center transition-all duration-300 hover:border-primary/50 hover:bg-surfaceHighlight/50",
                    isDragActive && "border-primary bg-primary/10 ring-4 ring-primary/20 scale-[1.02]",
                    mode === 'images' && "border-emerald-700 hover:border-emerald-500/50",
                    mode === 'pptx' && "border-orange-700 hover:border-orange-500/50"
                )}
            >
                <input {...getInputProps()} />

                <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className={cn(
                        "flex h-20 w-20 items-center justify-center rounded-full shadow-xl transition-all duration-500 group-hover:scale-110",
                        mode === 'pdf' && "bg-slate-800 group-hover:bg-violet-500",
                        mode === 'images' && "bg-slate-800 group-hover:bg-emerald-500",
                        mode === 'pptx' && "bg-slate-800 group-hover:bg-orange-500",
                        isDragActive && mode === 'pdf' && "scale-110 bg-violet-500",
                        isDragActive && mode === 'images' && "scale-110 bg-emerald-500",
                        isDragActive && mode === 'pptx' && "scale-110 bg-orange-500"
                    )}>
                        {isDragActive ? (
                            <UploadCloud className="h-10 w-10 text-white animate-bounce" />
                        ) : (
                            <IconComponent className="h-10 w-10 text-slate-400 group-hover:text-white" />
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-white">
                            {config.title}
                        </h3>
                        <p className="text-slate-400 max-w-sm mx-auto">
                            {config.description}
                        </p>
                    </div>

                    <div className={cn(
                        "mt-4 rounded-full px-4 py-1.5 text-xs font-medium border",
                        mode === 'pdf' && "bg-slate-800 text-slate-400 border-slate-700 group-hover:border-violet-500/50",
                        mode === 'images' && "bg-slate-800 text-slate-400 border-slate-700 group-hover:border-emerald-500/50",
                        mode === 'pptx' && "bg-slate-800 text-slate-400 border-slate-700 group-hover:border-orange-500/50"
                    )}>
                        {config.support}
                    </div>
                </div>

                {/* Decorative Glow */}
                <div className={cn(
                    "absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                    `bg-gradient-to-tr ${config.hoverGradient}`,
                    isDragActive && "opacity-100"
                )} />
            </div>
        </div>
    );
}
