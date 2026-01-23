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
        <section id="how-it-works" className="py-16 md:py-24 relative px-4">
            {/* Background Decoration */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-0 w-64 md:w-96 h-64 md:h-96 bg-violet-600/10 rounded-full blur-[100px] md:blur-[150px]" />
                <div className="absolute bottom-1/4 right-0 w-64 md:w-96 h-64 md:h-96 bg-cyan-600/10 rounded-full blur-[100px] md:blur-[150px]" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
                    <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-white/10 text-xs md:text-sm mb-4 md:mb-6">
                        <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-violet-400" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400 font-medium">Simple 5-Step Process</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
                        From Upload to{' '}
                        <span className="relative inline-block">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">
                                Print-Ready
                            </span>
                            <svg className="absolute -bottom-1 md:-bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
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
                    <p className="text-sm md:text-lg text-slate-400 mt-4 md:mt-6">
                        Transform your dark lecture slides in minutes with our intuitive workflow
                    </p>
                </div>

                {/* Interactive Timeline - Mobile First */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
                    {/* Left: Step Cards */}
                    <div className="space-y-3 md:space-y-4">
                        {steps.map((step, index) => {
                            const colors = colorClasses[step.color];
                            const isActive = activeStep === index;

                            return (
                                <div
                                    key={index}
                                    onClick={() => setActiveStep(index)}
                                    className={cn(
                                        "relative p-4 md:p-5 rounded-xl md:rounded-2xl border cursor-pointer transition-all duration-500 group ml-0 md:ml-3",
                                        isActive
                                            ? `${colors.bg} ${colors.border} shadow-lg ${colors.glow}`
                                            : "bg-slate-900/30 border-white/5 hover:border-white/10"
                                    )}
                                >
                                    {/* Step Number Badge - Hidden on mobile, shown on larger screens */}
                                    <div className={cn(
                                        "hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full items-center justify-center text-sm font-bold transition-all duration-300 border-2",
                                        isActive
                                            ? `bg-gradient-to-br ${step.gradient} border-transparent text-white shadow-lg ${colors.glow}`
                                            : "bg-slate-900 border-slate-700 text-slate-500"
                                    )}>
                                        {index + 1}
                                    </div>

                                    <div className="flex items-start gap-3 md:gap-4 md:pl-4">
                                        {/* Icon with step number on mobile */}
                                        <div className="relative flex-shrink-0">
                                            <div className={cn(
                                                "w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center transition-all duration-300",
                                                isActive ? `bg-gradient-to-br ${step.gradient} shadow-lg` : "bg-slate-800"
                                            )}>
                                                <step.icon className={cn("w-5 h-5 md:w-6 md:h-6", isActive ? "text-white" : "text-slate-500")} />
                                            </div>
                                            {/* Mobile step number */}
                                            <div className={cn(
                                                "md:hidden absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold",
                                                isActive
                                                    ? `bg-gradient-to-br ${step.gradient} text-white`
                                                    : "bg-slate-700 text-slate-400"
                                            )}>
                                                {index + 1}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h3 className={cn(
                                                    "font-semibold text-sm md:text-base transition-colors truncate",
                                                    isActive ? "text-white" : "text-slate-400"
                                                )}>
                                                    {step.title}
                                                </h3>
                                                <ArrowRight className={cn(
                                                    "w-3 h-3 md:w-4 md:h-4 flex-shrink-0 transition-all duration-300",
                                                    isActive ? `${colors.text} translate-x-0 opacity-100` : "opacity-0 -translate-x-2"
                                                )} />
                                            </div>
                                            <p className={cn(
                                                "text-xs md:text-sm mt-1 transition-colors line-clamp-2",
                                                isActive ? "text-slate-300" : "text-slate-500"
                                            )}>
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Expanded Detail */}
                                    <div className={cn(
                                        "overflow-hidden transition-all duration-500",
                                        isActive ? "max-h-24 mt-3 opacity-100" : "max-h-0 opacity-0"
                                    )}>
                                        <div className={cn("text-xs p-2 md:p-3 rounded-lg md:ml-4", colors.bg, colors.border, "border")}>
                                            <span className={colors.text}>💡 Pro Tip: </span>
                                            <span className="text-slate-400">{step.detail}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right: Visual Preview - Hidden on mobile, shown on lg+ */}
                    <div className="hidden lg:block relative">
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

                {/* Mobile Navigation Dots - Only shown on mobile */}
                <div className="flex justify-center gap-2 mt-6 lg:hidden">
                    {steps.map((step, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveStep(index)}
                            className={cn(
                                "w-2 h-2 rounded-full transition-all duration-300",
                                activeStep === index
                                    ? `w-6 bg-gradient-to-r ${step.gradient}`
                                    : "bg-slate-700"
                            )}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
