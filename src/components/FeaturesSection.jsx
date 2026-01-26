import React from 'react';
import { Shield, Zap, Grid, Palette, FileOutput, Lock, Sparkles, MoveVertical } from 'lucide-react';
import { useTheme } from '../lib/ThemeContext';

export function FeaturesSection() {
    const { isLight } = useTheme();

    const features = [
        {
            icon: Shield,
            title: "Privacy First",
            description: "Your files never leave your device. All processing happens locally in your browser.",
            gradient: "from-emerald-500 to-teal-500",
            bgGlow: "bg-emerald-500/20"
        },
        {
            icon: Palette,
            title: "Smart Invert",
            description: "Automatically convert dark backgrounds to printer-friendly white while preserving text clarity.",
            gradient: "from-violet-500 to-fuchsia-500",
            bgGlow: "bg-violet-500/20"
        },
        {
            icon: Grid,
            title: "Flexible Grid Layouts",
            description: "Arrange multiple slides per page (2, 4, 6, 9) to save paper and create compact study sheets.",
            gradient: "from-cyan-500 to-blue-500",
            bgGlow: "bg-cyan-500/20"
        },
        {
            icon: Zap,
            title: "Lightning Fast",
            description: "Process entire lectures in seconds. No waiting, no queues, no limits.",
            gradient: "from-amber-500 to-orange-500",
            bgGlow: "bg-amber-500/20"
        },
        {
            icon: FileOutput,
            title: "High Quality Output",
            description: "Generate crisp, high-resolution PDFs optimized for both viewing and printing.",
            gradient: "from-rose-500 to-pink-500",
            bgGlow: "bg-rose-500/20"
        },
        {
            icon: Lock,
            title: "No Account Needed",
            description: "Start using immediately. No signup, no login, no credit card required.",
            gradient: "from-indigo-500 to-violet-500",
            bgGlow: "bg-indigo-500/20"
        },
    ];

    return (
        <section id="features" className={`pt-20 pb-8 ${isLight ? "bg-white" : ""}`}>
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-16 px-4">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-4 ${isLight
                    ? "bg-slate-100 border border-slate-200 text-slate-600 font-medium"
                    : "bg-violet-500/10 border border-violet-500/20 text-violet-400"
                    }`}>
                    <Sparkles className="w-3 h-3" />
                    <span>Features</span>
                </div>
                <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isLight ? "text-slate-900 tracking-tight" : "text-white"}`}>
                    Everything You Need to{' '}
                    <span className={`bg-clip-text text-transparent ${isLight
                        ? "bg-gradient-to-r from-violet-600 to-violet-600 text-violet-600" // Solid color feel for light mode
                        : "bg-gradient-to-r from-violet-400 to-cyan-400"
                        }`}>
                        Print Smart
                    </span>
                </h2>
                <p className={isLight ? "text-slate-600 max-w-lg mx-auto" : "text-slate-400"}>
                    Powerful tools designed specifically for students who want to save ink, paper, and study time.
                </p>
            </div>

            {/* Features Grid */}
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`group relative p-6 rounded-2xl transition-all duration-500 hover:-translate-y-1 ${isLight
                                ? "bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300"
                                : "bg-slate-900/50 border border-white/5 hover:border-white/10"
                                }`}
                        >
                            {/* Glow Effect - only in dark mode */}
                            {!isLight && (
                                <div className={`absolute inset-0 ${feature.bgGlow} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                            )}

                            <div className="relative">
                                {/* Icon */}
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isLight
                                    ? "bg-slate-100 text-slate-900"
                                    : `bg-gradient-to-br ${feature.gradient} shadow-lg`
                                    }`}>
                                    <feature.icon className={`w-6 h-6 ${isLight ? "text-slate-700" : "text-white"}`} />
                                </div>

                                {/* Content */}
                                <h3 className={`text-lg font-bold mb-2 transition-colors ${isLight
                                    ? "text-slate-900"
                                    : "text-white group-hover:text-violet-300"
                                    }`}>
                                    {feature.title}
                                </h3>
                                <p className={`text-sm leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
