import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText } from 'lucide-react';
import { cn } from '../lib/cn';

export function UploadZone({ onFileSelect }) {
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            onFileSelect(acceptedFiles[0]);
        }
    }, [onFileSelect]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        maxFiles: 1
    });

    return (
        <div
            {...getRootProps()}
            className={cn(
                "relative group cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed border-slate-700 bg-surface/50 p-12 text-center transition-all duration-300 hover:border-primary/50 hover:bg-surfaceHighlight/50",
                isDragActive && "border-primary bg-primary/10 ring-4 ring-primary/20 scale-[1.02]"
            )}
        >
            <input {...getInputProps()} />

            <div className="relative z-10 flex flex-col items-center gap-4">
                <div className={cn(
                    "flex h-20 w-20 items-center justify-center rounded-full bg-slate-800 shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:bg-primary",
                    isDragActive && "scale-110 bg-primary"
                )}>
                    {isDragActive ? (
                        <UploadCloud className="h-10 w-10 text-white animate-bounce" />
                    ) : (
                        <FileText className="h-10 w-10 text-slate-400 group-hover:text-white" />
                    )}
                </div>

                <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">
                        {isDragActive ? "Drop your PDF here" : "Upload your Lecture Notes"}
                    </h3>
                    <p className="text-slate-400 max-w-sm mx-auto">
                        Drag and drop your PDF file here, or click to browse. We process everything locally.
                    </p>
                </div>

                <div className="mt-4 rounded-full bg-slate-800 px-4 py-1.5 text-xs text-slate-400 font-medium border border-slate-700 group-hover:border-primary/50">
                    Supports PDF (Max 100MB)
                </div>
            </div>

            {/* Decorative Glow */}
            <div className={cn(
                "absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                isDragActive && "opacity-100"
            )} />
        </div>
    );
}
