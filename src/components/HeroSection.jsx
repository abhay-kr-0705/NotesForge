import React from 'react';
import { Sparkles, ArrowRight, Shield, Zap, Printer, Hammer, CheckCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { useTheme } from '../lib/ThemeContext';

export function HeroSection({ onGetStarted }) {
    const { isLight } = useTheme();

    // Dark mode features (preserved)
    const features = [
        { icon: Shield, text: "100% Private - No uploads" },
        { icon: Zap, text: "Instant processing" },
        { icon: Printer, text: "Print optimized" },
    ];

    return (
        <section className={`relative min-h-[90vh] flex items-center justify-center overflow-hidden ${isLight ? "bg-white" : ""}`}>
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`absolute inset-0 w-full h-full object-cover ${isLight ? "opacity-[0.08]" : "opacity-15"}`}
                >
                    <source src="/ProductShowcaseVideo.webm" type="video/webm" />
                </video>
                {/* Dark mode overlay only */}
                {!isLight && (
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/80 to-slate-950" />
                )}
            </div>

            {/* Content */}
            <div className={`relative z-10 text-center max-w-5xl mx-auto px-6 py-20 ${isLight ? "mt-10" : ""}`}>
                {/* Badge */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-8 ${isLight
                    ? "bg-slate-100 text-slate-700 font-medium border border-slate-200"
                    : "bg-blue-500/10 border border-blue-500/20 text-blue-400 animate-fade-in"
                    }`}>
                    <Hammer className="w-4 h-4" />
                    <span>Free & Open Source</span>
                    <span className={`w-1 h-1 rounded-full ${isLight ? "bg-slate-400" : "bg-blue-400"}`} />
                    <span>No Login Required</span>
                </div>

                {/* Main Heading */}
                <h1 className={`text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight ${isLight ? "tracking-tight text-slate-900" : ""}`}>
                    {isLight ? (
                        <>
                            Make Your <span className="text-violet-600">Lecture Slides</span><br />
                            <span className="text-violet-600">Printable</span>
                        </>
                    ) : (
                        <>
                            <span className="text-white">Make Your </span>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-500 to-purple-500">
                                Lecture Slides
                            </span>
                            <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                                Printable
                            </span>
                        </>
                    )}
                </h1>

                {/* Subtitle */}
                <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed ${isLight ? "text-slate-600 font-normal" : "text-slate-400"
                    }`}>
                    Instantly convert dark mode lecture slides into printer-friendly PDFs.
                    Save ink, save paper, and study smarter — all without uploading a single file.
                </p>

                {/* Feature Pills (Dark Mode Only or Clean Tags for Light) */}
                <div className="flex flex-wrap justify-center gap-4 mb-10">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm ${isLight
                                ? "bg-white border border-slate-200 text-slate-700 shadow-sm"
                                : "bg-slate-800/50 border border-white/5 text-slate-300"
                                }`}
                        >
                            <feature.icon className={`w-4 h-4 ${isLight ? "text-slate-900" : "text-emerald-400"}`} />
                            <span>{feature.text}</span>
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                        size="lg"
                        onClick={onGetStarted}
                        className={`text-lg px-8 py-6 group relative overflow-hidden ${isLight
                            ? "bg-slate-900 hover:bg-slate-800 text-white shadow-md hover:shadow-lg transition-all"
                            : "shadow-2xl shadow-blue-500/25 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500"
                            }`}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <Hammer className="w-5 h-5" />
                            Start Forging
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        {!isLight && (
                            <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 via-violet-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        )}
                    </Button>
                    <span className={`text-sm flex items-center gap-2 ${isLight ? "text-slate-500" : "text-slate-500"}`}>
                        <CheckCircle className={`w-4 h-4 ${isLight ? "text-emerald-600" : "text-emerald-500"}`} />
                        No signup needed
                    </span>
                </div>
            </div>
        </section>
    );
}
