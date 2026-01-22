import React from 'react';
import { cn } from '../lib/cn';

export function LoadingSpinner({ size = 'default', text = '' }) {
    const sizeClasses = {
        sm: 'w-6 h-6',
        default: 'w-10 h-10',
        lg: 'w-16 h-16',
    };

    return (
        <div className="flex flex-col items-center gap-4">
            {/* Modern Dot Spinner */}
            <div className="relative">
                <div className={cn("relative", sizeClasses[size])}>
                    {/* Outer spinning ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-violet-500 border-r-fuchsia-500 animate-spin" />

                    {/* Inner pulsing dot */}
                    <div className="absolute inset-2 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 animate-pulse" />

                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-full bg-violet-500/20 blur-md animate-pulse" />
                </div>
            </div>

            {text && (
                <p className="text-sm text-slate-400 animate-pulse">{text}</p>
            )}
        </div>
    );
}

// Alternative: Three dots loading animation
export function DotsLoader({ text = '' }) {
    return (
        <div className="flex flex-col items-center gap-4">
            <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className="w-3 h-3 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500"
                        style={{
                            animation: 'bounce 1.4s infinite ease-in-out both',
                            animationDelay: `${i * 0.16}s`,
                        }}
                    />
                ))}
            </div>
            {text && <p className="text-sm text-slate-400">{text}</p>}

            <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
        </div>
    );
}

// Processing progress animation
export function ProcessingLoader({ text = 'Processing...', progress = 0 }) {
    return (
        <div className="flex flex-col items-center gap-4 w-full max-w-xs">
            {/* Animated icon */}
            <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                </div>
                <div className="absolute -inset-2 rounded-3xl bg-violet-500/20 blur-xl" />
            </div>

            {/* Progress bar */}
            {progress > 0 && (
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}

            <p className="text-sm text-slate-400">{text}</p>
        </div>
    );
}
