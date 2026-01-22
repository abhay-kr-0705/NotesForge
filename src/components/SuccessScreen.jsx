import React from 'react';
import { CheckCircle, Download, Eye, RefreshCw, Heart, Shield, Lock, Gift, AlertTriangle, Sparkles, ArrowLeft, Settings } from 'lucide-react';
import { Button } from './ui/Button';
import { StepProgress } from './StepProgress';

export function SuccessScreen({ fileInfo, onDownload, onPreview, onProcessAnother, onGoBack, onStepClick, canNavigateToStep }) {
    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Step Progress */}
            <StepProgress currentStep={6} onStepClick={onStepClick} canNavigateToStep={canNavigateToStep} />

            {/* Success Card - Download First */}
            <div className="text-center space-y-5 p-6 rounded-2xl bg-slate-900/50 border border-white/5 backdrop-blur-sm">
                {/* Success Icon */}
                <div className="relative mx-auto w-16 h-16">
                    <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-lg animate-pulse" />
                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-bold text-white mb-1">Success!</h2>
                    <p className="text-sm text-slate-400">Your document is ready for download.</p>
                </div>

                {/* Warning Banner */}
                <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-left">
                    <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span className="text-xs text-slate-300">Always review content before printing</span>
                </div>

                {/* File Info */}
                <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded bg-violet-500/20">
                            <Download className="w-4 h-4 text-violet-400" />
                        </div>
                        <div className="text-left">
                            <h3 className="font-medium text-white text-sm">{fileInfo?.name || 'Document'}_processed.pdf</h3>
                            <span className="text-xs text-slate-500">Enhanced PDF</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center py-2 border-t border-white/5">
                        <div>
                            <div className="text-xs font-semibold text-white">{fileInfo?.originalSize || '0'} KB</div>
                            <div className="text-[10px] text-slate-500">Original</div>
                        </div>
                        <div>
                            <div className="text-xs font-semibold text-violet-400">{fileInfo?.finalSize || '0'} MB</div>
                            <div className="text-[10px] text-slate-500">Final</div>
                        </div>
                        <div>
                            <div className="text-xs font-semibold text-white">{fileInfo?.pageCount || 0}</div>
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
                <div className="flex items-center justify-center gap-4 pt-2 border-t border-white/5">
                    <button
                        onClick={onGoBack}
                        className="flex items-center gap-1 text-sm text-slate-400 hover:text-violet-400 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Settings
                    </button>
                    <span className="text-slate-600">|</span>
                    <button
                        onClick={onProcessAnother}
                        className="flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Process Another
                    </button>
                </div>
            </div>

            {/* Donation Card - Below, accessible by scrolling */}
            <DonationCard />
        </div>
    );
}

function DonationCard() {
    return (
        <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-900/20 to-fuchsia-900/10 border border-violet-500/20 text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/30 text-fuchsia-300 text-xs">
                <Gift className="w-3 h-3" />
                100% FREE
            </div>

            <div>
                <h3 className="text-lg font-bold text-white mb-1">Help Keep It Free</h3>
                <p className="text-xs text-slate-400">
                    Every contribution helps us keep NotesForge free for students worldwide.
                </p>
            </div>

            <Button
                className="gap-2 bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500"
                onClick={() => window.open('https://buymeacoffee.com', '_blank')}
            >
                <Heart className="w-4 h-4" />
                Support NotesForge
            </Button>

            <div className="flex items-center justify-center gap-4 pt-3 border-t border-white/5 text-[10px] text-slate-500">
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
