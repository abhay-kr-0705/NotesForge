import React from 'react';
import { Play, Sparkles } from 'lucide-react';
import { Button } from './ui/Button';

export function VideoShowcase({ onGetStarted }) {
    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background Video Container */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-20"
                >
                    <source src="/ProductShowcaseVideo.webm" type="video/webm" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm mb-6">
                    <Sparkles className="w-4 h-4" />
                    <span>See It In Action</span>
                </div>

                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                    Watch How{' '}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
                        NotesForge
                    </span>{' '}
                    Works
                </h2>

                <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
                    See the magic happen — transform dark lecture slides into perfectly formatted,
                    print-ready notes in just a few clicks.
                </p>

                {/* Video Player Container */}
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-violet-500/10 bg-slate-900 aspect-video max-w-3xl mx-auto mb-8">
                    <video
                        controls
                        className="w-full h-full"
                        poster="/video-poster.png"
                    >
                        <source src="/ProductShowcaseVideo.webm" type="video/webm" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Play Button Overlay (optional, for custom styling) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
                        <div className="w-20 h-20 rounded-full bg-violet-600/80 backdrop-blur-sm flex items-center justify-center">
                            <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                    </div>
                </div>

                <Button onClick={onGetStarted} size="lg" className="px-8">
                    Try It Now — It's Free
                </Button>
            </div>
        </section>
    );
}
