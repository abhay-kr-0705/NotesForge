import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText, Image, Presentation } from 'lucide-react';
import { cn } from '../lib/cn';
import { useTheme } from '../lib/ThemeContext';

export function UploadZone({ onFileSelect, onImagesSelect, onPptxSelect }) {
    const [mode, setMode] = useState('pdf'); // 'pdf', 'images', or 'pptx'
    const { isLight } = useTheme();

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
            <div className={`flex items-center justify-center gap-1 p-1 rounded-full max-w-md mx-auto border transition-colors ${isLight ? "bg-slate-100 border-slate-200" : "bg-slate-800/50 border-white/5"
                }`}>
                <button
                    onClick={() => setMode('pdf')}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                        mode === 'pdf'
                            ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-lg"
                            : isLight ? "text-slate-500 hover:text-slate-900" : "text-slate-400 hover:text-white"
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
                            : isLight ? "text-slate-500 hover:text-slate-900" : "text-slate-400 hover:text-white"
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
                            : isLight ? "text-slate-500 hover:text-slate-900" : "text-slate-400 hover:text-white"
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
                    "relative group cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-300",
                    isLight
                        ? "bg-white border-slate-300 hover:border-slate-400 hover:bg-slate-50"
                        : "bg-surface/50 border-slate-700 hover:bg-surfaceHighlight/50 hover:border-primary/50",
                    isDragActive && (isLight ? "border-violet-500 bg-violet-50 ring-4 ring-violet-100" : "border-primary bg-primary/10 ring-4 ring-primary/20 scale-[1.02]"),
                    mode === 'images' && (isLight ? "hover:border-emerald-400" : "border-emerald-700 hover:border-emerald-500/50"),
                    mode === 'pptx' && (isLight ? "hover:border-orange-400" : "border-orange-700 hover:border-orange-500/50")
                )}
            >
                <input {...getInputProps()} />

                <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className={cn(
                        "flex h-20 w-20 items-center justify-center rounded-full shadow-xl transition-all duration-500 group-hover:scale-110",
                        isLight
                            ? "bg-slate-100 text-slate-500"
                            : "bg-slate-800 text-slate-400",
                        mode === 'pdf' && (isLight ? "group-hover:bg-violet-100 group-hover:text-violet-600" : "group-hover:bg-violet-500 group-hover:text-white"),
                        mode === 'images' && (isLight ? "group-hover:bg-emerald-100 group-hover:text-emerald-600" : "group-hover:bg-emerald-500 group-hover:text-white"),
                        mode === 'pptx' && (isLight ? "group-hover:bg-orange-100 group-hover:text-orange-600" : "group-hover:bg-orange-500 group-hover:text-white"),
                        isDragActive && mode === 'pdf' && "scale-110 bg-violet-500 text-white",
                        isDragActive && mode === 'images' && "scale-110 bg-emerald-500 text-white",
                        isDragActive && mode === 'pptx' && "scale-110 bg-orange-500 text-white"
                    )}>
                        {isDragActive ? (
                            <UploadCloud className="h-10 w-10 animate-bounce" />
                        ) : (
                            <IconComponent className="h-10 w-10" />
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className={`text-2xl font-bold ${isLight ? "text-slate-900" : "text-white"}`}>
                            {config.title}
                        </h3>
                        <p className={`max-w-sm mx-auto ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                            {config.description}
                        </p>
                    </div>

                    <div className={cn(
                        "mt-4 rounded-full px-4 py-1.5 text-xs font-medium border",
                        mode === 'pdf' && (isLight ? "bg-slate-100 text-slate-500 border-slate-200" : "bg-slate-800 text-slate-400 border-slate-700"),
                        mode === 'images' && (isLight ? "bg-slate-100 text-slate-500 border-slate-200" : "bg-slate-800 text-slate-400 border-slate-700"),
                        mode === 'pptx' && (isLight ? "bg-slate-100 text-slate-500 border-slate-200" : "bg-slate-800 text-slate-400 border-slate-700")
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
