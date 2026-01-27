import React from 'react';
import { CheckCircle, Download, Eye, RefreshCw, Heart, Shield, Lock, Gift, AlertTriangle, Sparkles, ArrowLeft, Settings } from 'lucide-react';
import { Button } from './ui/Button';
import { useTheme } from '../lib/ThemeContext';
import { StepProgress } from './StepProgress';

export function SuccessScreen({ fileInfo, onDownload, onPreview, onProcessAnother, onGoBack, onStepClick, canNavigateToStep }) {
    const { isLight } = useTheme();

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Step Progress */}
            <StepProgress currentStep={6} onStepClick={onStepClick} canNavigateToStep={canNavigateToStep} />

            {/* Success Card - Download First */}
            <div className={`text-center space-y-5 p-6 rounded-2xl border backdrop-blur-sm transition-all ${isLight
                ? 'bg-emerald-50/80 border-emerald-200 shadow-sm'
                : 'bg-slate-900/50 border-white/5'
                }`}>
                {/* Success Icon */}
                <div className="relative mx-auto w-16 h-16">
                    <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-lg animate-pulse" />
                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                </div>

                <div>
                    <h2 className={`text-xl font-bold mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>Success!</h2>
                    <p className={`text-sm ${isLight ? 'text-emerald-700' : 'text-slate-400'}`}>Your document is ready for download.</p>
                </div>

                {/* Warning Banner */}
                <div className={`flex items-center gap-2 p-3 rounded-lg border text-left ${isLight
                    ? 'bg-amber-50 border-amber-200'
                    : 'bg-amber-500/10 border-amber-500/20'
                    }`}>
                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span className={`text-xs ${isLight ? 'text-amber-800' : 'text-slate-300'}`}>Always review content before printing</span>
                </div>

                {/* File Info */}
                <div className={`p-3 rounded-lg border ${isLight
                    ? 'bg-white/60 border-emerald-100'
                    : 'bg-slate-800/50 border-slate-700'
                    }`}>
                    <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded ${isLight ? 'bg-violet-100' : 'bg-violet-500/20'}`}>
                            <Download className={`w-4 h-4 ${isLight ? 'text-violet-600' : 'text-violet-400'}`} />
                        </div>
                        <div className="text-left">
                            <h3 className={`font-medium text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>{fileInfo?.name || 'Document'}_processed.pdf</h3>
                            <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>Enhanced PDF</span>
                        </div>
                    </div>

                    <div className={`grid grid-cols-3 gap-3 text-center py-2 border-t ${isLight ? 'border-slate-200' : 'border-white/5'}`}>
                        <div>
                            <div className={`text-xs font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>{fileInfo?.originalSize || '0'} KB</div>
                            <div className="text-[10px] text-slate-500">Original</div>
                        </div>
                        <div>
                            <div className="text-xs font-semibold text-violet-500">{fileInfo?.finalSize || '0'} MB</div>
                            <div className="text-[10px] text-slate-500">Final</div>
                        </div>
                        <div>
                            <div className={`text-xs font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>{fileInfo?.pageCount || 0}</div>
                            <div className="text-[10px] text-slate-500">Pages</div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons - Primary Focus */}
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Button onClick={onDownload} size="lg" className="gap-2">
                        <Download className="w-4 h-4" />
                        Download PDF
                    </Button>
                    <Button onClick={onPreview} variant="secondary" className="gap-2">
                        <Eye className="w-4 h-4" />
                        Preview
                    </Button>
                </div>

                {/* Back & Process Another Buttons */}
                <div className={`flex items-center justify-center gap-4 pt-2 border-t ${isLight ? 'border-slate-200' : 'border-white/5'}`}>
                    <button
                        onClick={onGoBack}
                        className={`flex items-center gap-1 text-sm transition-colors ${isLight ? 'text-slate-500 hover:text-violet-600' : 'text-slate-400 hover:text-violet-400'
                            }`}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Settings
                    </button>
                    <span className="text-slate-400">|</span>
                    <button
                        onClick={onProcessAnother}
                        className={`flex items-center gap-1 text-sm transition-colors ${isLight ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        <RefreshCw className="w-4 h-4" />
                        Process Another
                    </button>
                </div>
            </div>

            {/* Donation Card - Below, accessible by scrolling */}
            <DonationCard isLight={isLight} />
        </div>
    );
}

function DonationCard({ isLight }) {
    return (
        <div className={`p-5 rounded-2xl border text-center space-y-3 ${isLight
            ? 'bg-gradient-to-br from-violet-50 to-fuchsia-50 border-violet-200'
            : 'bg-gradient-to-br from-violet-900/20 to-fuchsia-900/10 border-violet-500/20'
            }`}>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs ${isLight
                ? 'bg-fuchsia-100 border border-fuchsia-200 text-fuchsia-700'
                : 'bg-fuchsia-500/20 border border-fuchsia-500/30 text-fuchsia-300'
                }`}>
                <Gift className="w-3 h-3" />
                100% FREE
            </div>

            <div>
                <h3 className={`text-lg font-bold mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>Help Keep It Free</h3>
                <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    Every contribution helps us keep NotesForge free for students worldwide.
                </p>
            </div>

            <Button
                className="gap-2 bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500 text-white"
                onClick={() => window.open('https://buymeacoffee.com', '_blank')}
            >
                <Heart className="w-4 h-4" />
                Support NotesForge
            </Button>

            <div className={`flex items-center justify-center gap-4 pt-3 border-t text-[10px] ${isLight
                ? 'border-violet-200 text-slate-500'
                : 'border-white/5 text-slate-500'
                }`}>
                <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3 text-emerald-500" />
                    Free Forever
                </span>
                <span className="flex items-center gap-1">
                    <Lock className="w-3 h-3 text-emerald-500" />
                    No Login
                </span>
            </div>
        </div>
    );
}

export { DonationCard };
