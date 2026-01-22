import React, { useState } from 'react';
import { Upload, MousePointerClick, Settings2, Download, Printer, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '../lib/cn';

export function HowToUseSection() {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
            icon: Upload,
            title: "Upload PDF",
            description: "Drag and drop your lecture notes or click to select. We support PDFs of any size with unlimited pages.",
            detail: "Your files never leave your device - all processing happens locally in your browser.",
            color: "violet",
            gradient: "from-violet-500 to-purple-600"
        },
        {
            icon: MousePointerClick,
            title: "Select & Edit Pages",
            description: "Choose which pages to include. Click the pencil icon to edit specific areas with our selection tools.",
            detail: "Remove unwanted pages, invert specific regions, or paint over sensitive content.",
            color: "fuchsia",
            gradient: "from-fuchsia-500 to-pink-600"
        },
        {
            icon: Settings2,
            title: "Customize Layout",
            description: "Configure grid layout, colors, orientation, and quality settings to match your printing needs.",
            detail: "Arrange up to 16 slides per page with customizable borders and page numbers.",
            color: "cyan",
            gradient: "from-cyan-500 to-blue-600"
        },
        {
            icon: Download,
            title: "Download & Preview",
            description: "Get your optimized PDF instantly. Preview before downloading to ensure everything looks perfect.",
            detail: "Compare file sizes to see how much ink you'll save with our optimization.",
            color: "emerald",
            gradient: "from-emerald-500 to-teal-600"
        },
        {
            icon: Printer,
            title: "Print & Study",
            description: "Print your notes and ace those exams. Save ink, save paper, save money!",
            detail: "Optimized for both home printers and professional print shops.",
            color: "amber",
            gradient: "from-amber-500 to-orange-600"
        }
    ];

    const colorClasses = {
        violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/30', text: 'text-violet-400', glow: 'shadow-violet-500/30' },
        fuchsia: { bg: 'bg-fuchsia-500/10', border: 'border-fuchsia-500/30', text: 'text-fuchsia-400', glow: 'shadow-fuchsia-500/30' },
        cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', glow: 'shadow-cyan-500/30' },
        emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', glow: 'shadow-emerald-500/30' },
        amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', glow: 'shadow-amber-500/30' },
    };

    return (
        <section id="how-it-works" className="py-24 relative">
            {/* Background Decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-violet-600/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-white/10 text-sm mb-6">
                        <Sparkles className="w-4 h-4 text-violet-400" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400 font-medium">Simple 5-Step Process</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        From Upload to{' '}
                        <span className="relative">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">
                                Print-Ready
                            </span>
                            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                                <path d="M2 6C50 2 150 2 198 6" stroke="url(#underline-gradient)" strokeWidth="3" strokeLinecap="round" />
                                <defs>
                                    <linearGradient id="underline-gradient" x1="0" y1="0" x2="200" y2="0">
                                        <stop offset="0%" stopColor="#8b5cf6" />
                                        <stop offset="50%" stopColor="#d946ef" />
                                        <stop offset="100%" stopColor="#06b6d4" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </span>
                    </h2>
                    <p className="text-lg text-slate-400 mt-6">
                        Transform your dark lecture slides in minutes with our intuitive workflow
                    </p>
                </div>

                {/* Interactive Timeline */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Step Cards */}
                    <div className="space-y-4">
                        {steps.map((step, index) => {
                            const colors = colorClasses[step.color];
                            const isActive = activeStep === index;

                            return (
                                <div
                                    key={index}
                                    onClick={() => setActiveStep(index)}
                                    className={cn(
                                        "relative p-5 rounded-2xl border cursor-pointer transition-all duration-500 group",
                                        isActive
                                            ? `${colors.bg} ${colors.border} shadow-lg ${colors.glow}`
                                            : "bg-slate-900/30 border-white/5 hover:border-white/10"
                                    )}
                                >
                                    {/* Step Number Badge */}
                                    <div className={cn(
                                        "absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 border-2",
                                        isActive
                                            ? `bg-gradient-to-br ${step.gradient} border-transparent text-white shadow-lg ${colors.glow}`
                                            : "bg-slate-900 border-slate-700 text-slate-500"
                                    )}>
                                        {index + 1}
                                    </div>

                                    <div className="flex items-start gap-4 pl-4">
                                        {/* Icon */}
                                        <div className={cn(
                                            "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0",
                                            isActive ? `bg-gradient-to-br ${step.gradient} shadow-lg` : "bg-slate-800"
                                        )}>
                                            <step.icon className={cn("w-6 h-6", isActive ? "text-white" : "text-slate-500")} />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className={cn(
                                                    "font-semibold transition-colors",
                                                    isActive ? "text-white" : "text-slate-400"
                                                )}>
                                                    {step.title}
                                                </h3>
                                                <ArrowRight className={cn(
                                                    "w-4 h-4 transition-all duration-300",
                                                    isActive ? `${colors.text} translate-x-0 opacity-100` : "opacity-0 -translate-x-2"
                                                )} />
                                            </div>
                                            <p className={cn(
                                                "text-sm mt-1 transition-colors",
                                                isActive ? "text-slate-300" : "text-slate-500"
                                            )}>
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Expanded Detail */}
                                    <div className={cn(
                                        "overflow-hidden transition-all duration-500 pl-4",
                                        isActive ? "max-h-20 mt-3 opacity-100" : "max-h-0 opacity-0"
                                    )}>
                                        <div className={cn("text-xs p-3 rounded-lg", colors.bg, colors.border, "border")}>
                                            <span className={colors.text}>💡 Pro Tip: </span>
                                            <span className="text-slate-400">{step.detail}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right: Visual Preview */}
                    <div className="relative">
                        {/* Decorative Ring */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className={cn(
                                "w-80 h-80 rounded-full border-2 opacity-20 transition-colors duration-500",
                                colorClasses[steps[activeStep].color].border
                            )} />
                            <div className={cn(
                                "absolute w-64 h-64 rounded-full border-2 opacity-10 transition-colors duration-500",
                                colorClasses[steps[activeStep].color].border
                            )} />
                        </div>

                        {/* Central Icon Display */}
                        <div className="relative z-10 flex flex-col items-center justify-center min-h-[400px]">
                            <div className={cn(
                                "relative w-32 h-32 rounded-3xl flex items-center justify-center transition-all duration-500 transform",
                                `bg-gradient-to-br ${steps[activeStep].gradient}`,
                                "shadow-2xl",
                                colorClasses[steps[activeStep].color].glow
                            )}>
                                {/* Pulse Effect */}
                                <div className={cn(
                                    "absolute inset-0 rounded-3xl animate-ping opacity-20",
                                    `bg-gradient-to-br ${steps[activeStep].gradient}`
                                )} style={{ animationDuration: '2s' }} />

                                {React.createElement(steps[activeStep].icon, {
                                    className: "w-16 h-16 text-white relative z-10"
                                })}
                            </div>

                            {/* Step Info */}
                            <div className="mt-8 text-center">
                                <div className={cn(
                                    "inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4",
                                    colorClasses[steps[activeStep].color].bg,
                                    colorClasses[steps[activeStep].color].border,
                                    "border"
                                )}>
                                    <span className={cn("text-sm font-medium", colorClasses[steps[activeStep].color].text)}>
                                        Step {activeStep + 1} of 5
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    {steps[activeStep].title}
                                </h3>
                                <p className="text-slate-400 max-w-sm">
                                    {steps[activeStep].description}
                                </p>
                            </div>

                            {/* Navigation Dots */}
                            <div className="flex gap-2 mt-8">
                                {steps.map((step, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveStep(index)}
                                        className={cn(
                                            "w-2 h-2 rounded-full transition-all duration-300",
                                            activeStep === index
                                                ? `w-8 bg-gradient-to-r ${step.gradient}`
                                                : "bg-slate-700 hover:bg-slate-600"
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
