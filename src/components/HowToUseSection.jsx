import React, { useState } from 'react';
import { Upload, MousePointerClick, Settings2, Download, Printer, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '../lib/cn';
import { useTheme } from '../lib/ThemeContext';

export function HowToUseSection() {
    const [activeStep, setActiveStep] = useState(0);
    const { isLight } = useTheme();

    const steps = [
        {
            icon: Upload,
            title: "Upload PDF",
            description: "Drag and drop your lecture notes. We support PDFs of any size.",
            mobileDesc: "Upload your lecture slides instantly.",
            detail: "Processing happens 100% on your device.",
            color: "violet",
            gradient: "from-violet-500 to-purple-600"
        },
        {
            icon: MousePointerClick,
            title: "Select Pages",
            description: "Choose pages to keep. Edit content with selection tools.",
            mobileDesc: "Tap to select the pages you want.",
            detail: "Remove title slides or standard fillers.",
            color: "fuchsia",
            gradient: "from-fuchsia-500 to-pink-600"
        },
        {
            icon: Settings2,
            title: "Customize",
            description: "Configure grid (1-6 slides), colors, and quality settings.",
            mobileDesc: "Set grid layout & invert colors.",
            detail: "Save paper by shrinking slides.",
            color: "cyan",
            gradient: "from-cyan-500 to-blue-600"
        },
        {
            icon: Download,
            title: "Preview",
            description: "Check exactly how your PDF will look before saving.",
            mobileDesc: "See the result before downloading.",
            detail: "Compare file size savings instantly.",
            color: "emerald",
            gradient: "from-emerald-500 to-teal-600"
        },
        {
            icon: Printer,
            title: "Print",
            description: "Get your optimized, ink-saving PDF ready for printing.",
            mobileDesc: "Save ink, paper, and money!",
            detail: "Perfect for home or shop printing.",
            color: "amber",
            gradient: "from-amber-500 to-orange-600"
        }
    ];

    const colorClasses = isLight ? {
        violet: { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-600', glow: 'shadow-none', line: 'bg-violet-200' },
        fuchsia: { bg: 'bg-fuchsia-50', border: 'border-fuchsia-200', text: 'text-fuchsia-600', glow: 'shadow-none', line: 'bg-fuchsia-200' },
        cyan: { bg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-600', glow: 'shadow-none', line: 'bg-cyan-200' },
        emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600', glow: 'shadow-none', line: 'bg-emerald-200' },
        amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-600', glow: 'shadow-none', line: 'bg-amber-200' },
    } : {
        violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/30', text: 'text-violet-400', glow: 'shadow-violet-500/30', line: 'bg-violet-500' },
        fuchsia: { bg: 'bg-fuchsia-500/10', border: 'border-fuchsia-500/30', text: 'text-fuchsia-400', glow: 'shadow-fuchsia-500/30', line: 'bg-fuchsia-500' },
        cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', glow: 'shadow-cyan-500/30', line: 'bg-cyan-500' },
        emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', glow: 'shadow-emerald-500/30', line: 'bg-emerald-500' },
        amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', glow: 'shadow-amber-500/30', line: 'bg-amber-500' },
    };

    return (
        <section id="how-it-works" className={`pt-8 pb-20 md:pb-24 relative px-4 overflow-hidden ${isLight ? "bg-white" : ""}`}>
            {/* Background Decoration */}
            <div className="absolute inset-0 pointer-events-none">
                {isLight ? (
                    <>
                        <div className="absolute top-1/4 left-0 w-64 md:w-96 h-64 md:h-96 bg-violet-100/50 rounded-full blur-[120px]" />
                        <div className="absolute bottom-1/4 right-0 w-64 md:w-96 h-64 md:h-96 bg-blue-100/40 rounded-full blur-[120px]" />
                    </>
                ) : (
                    <>
                        <div className="absolute top-1/4 left-0 w-64 md:w-96 h-64 md:h-96 bg-violet-600/10 rounded-full blur-[100px]" />
                        <div className="absolute bottom-1/4 right-0 w-64 md:w-96 h-64 md:h-96 bg-cyan-600/10 rounded-full blur-[100px]" />
                    </>
                )}
            </div>

            <div className={`relative z-10 max-w-6xl mx-auto rounded-3xl ${isLight ? "md:p-8" : ""}`}>
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs mb-4 ${isLight
                            ? "bg-slate-100 border border-slate-200 text-slate-600 font-medium"
                            : "bg-slate-900/50 border border-white/10 text-slate-300"
                        }`}>
                        <Sparkles className={`w-3 h-3 ${isLight ? "text-violet-600" : "text-violet-400"}`} />
                        <span>Simple Workflow</span>
                    </div>
                    <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${isLight ? "text-slate-900 tracking-tight" : "text-white"}`}>
                        How it <span className={`relative inline-block ${isLight ? "text-violet-600" : "text-violet-400"}`}>
                            Works
                            {/* Classy Curved Underline */}
                            <svg className="absolute w-full h-3 -bottom-2 left-0" viewBox="0 0 100 20" preserveAspectRatio="none">
                                <path
                                    d="M0 10 Q50 20 100 10"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    className={isLight ? "opacity-30" : "opacity-50"}
                                />
                            </svg>
                        </span>
                    </h2>
                    <p className={`text-sm md:text-lg ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                        From dark slides to printable notes in seconds
                    </p>
                </div>

                {/* Mobile Flowchart View (Visible only on mobile) */}
                <div className="md:hidden relative max-w-sm mx-auto pl-4">
                    {/* Continuous Vertical Line */}
                    <div className={`absolute left-[27px] top-6 bottom-6 w-0.5 opacity-30 ${isLight
                        ? "bg-slate-200"
                        : "bg-gradient-to-b from-violet-500 via-cyan-500 to-amber-500"
                        }`} />

                    <div className="space-y-8">
                        {steps.map((step, index) => {
                            const colors = colorClasses[step.color];
                            return (
                                <div key={index} className="relative flex items-center gap-6 group">
                                    {/* Flow Node */}
                                    <div className={`relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border-2 transition-all duration-300 ${isLight
                                        ? "bg-white border-slate-200 shadow-sm"
                                        : `bg-slate-900 ${colors.border} shadow-lg shadow-black/50`
                                        }`}>
                                        {!isLight && (
                                            <div className={`absolute inset-0 rounded-2xl opacity-20 bg-${step.color}-500 blur-md group-hover:opacity-40 transition-opacity`} />
                                        )}
                                        <step.icon className={`w-6 h-6 ${colors.text}`} />

                                        {/* Step Number Badge */}
                                        <div className={`absolute -top-2 -right-2 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center border-2 ${isLight
                                            ? "bg-slate-100 border-white text-slate-900 shadow-sm"
                                            : "bg-white text-slate-900 border-slate-900"
                                            }`}>
                                            {index + 1}
                                        </div>
                                    </div>

                                    {/* Content Card */}
                                    <div className={`flex-1 p-4 rounded-xl border transition-colors ${isLight
                                        ? "bg-white border-slate-200 shadow-sm"
                                        : "bg-slate-900/40 border-white/5 backdrop-blur-sm hover:bg-slate-900/60"
                                        }`}>
                                        <h3 className={`font-bold text-base mb-1 ${isLight ? "text-slate-900" : "text-white"}`}>{step.title}</h3>
                                        <p className={`text-xs leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>{step.mobileDesc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Desktop Interactive View (Hidden on mobile) */}
                <div className="hidden md:grid grid-cols-2 gap-12 items-center">
                    {/* Left: Step List */}
                    <div className="space-y-4">
                        {steps.map((step, index) => {
                            const colors = colorClasses[step.color];
                            const isActive = activeStep === index;

                            return (
                                <div
                                    key={index}
                                    onClick={() => setActiveStep(index)}
                                    className={cn(
                                        "relative p-5 rounded-2xl border cursor-pointer transition-all duration-300 ml-3 group",
                                        isLight
                                            ? isActive
                                                ? "bg-white border-violet-200 shadow-md translate-x-1"
                                                : "bg-white border-slate-100 hover:border-slate-300 hover:bg-slate-50"
                                            : isActive
                                                ? `${colors.bg} ${colors.border} shadow-lg ${colors.glow}`
                                                : "bg-slate-900/30 border-white/5 hover:border-white/10"
                                    )}
                                >
                                    {/* Desktop Step Number */}
                                    <div className={cn(
                                        "absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 border-2",
                                        isLight
                                            ? isActive
                                                ? "bg-violet-600 border-white text-white shadow-md scale-110"
                                                : "bg-white border-slate-200 text-slate-400"
                                            : isActive
                                                ? `bg-gradient-to-br ${step.gradient} border-transparent text-white shadow-lg`
                                                : "bg-slate-900 border-slate-700 text-slate-500"
                                    )}>
                                        {index + 1}
                                    </div>

                                    <div className="flex items-center gap-4 pl-4">
                                        <div className={cn(
                                            "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                                            isLight
                                                ? isActive ? "bg-violet-50 text-violet-600" : "bg-slate-50 text-slate-400"
                                                : isActive ? `bg-gradient-to-br ${step.gradient} shadow-lg` : "bg-slate-800"
                                        )}>
                                            <step.icon className={cn("w-6 h-6",
                                                isLight
                                                    ? isActive ? "text-violet-600" : "text-slate-400"
                                                    : isActive ? "text-white" : "text-slate-500"
                                            )} />
                                        </div>

                                        <div>
                                            <h3 className={cn(
                                                "font-semibold text-base transition-colors",
                                                isLight
                                                    ? isActive ? "text-slate-900" : "text-slate-500"
                                                    : isActive ? "text-white" : "text-slate-400"
                                            )}>
                                                {step.title}
                                            </h3>
                                            <p className={cn(
                                                "text-sm mt-1 transition-colors",
                                                isLight
                                                    ? isActive ? "text-slate-600" : "text-slate-400"
                                                    : isActive ? "text-slate-300" : "text-slate-500"
                                            )}>
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right: Visual Preview */}
                    <div className="relative">
                        {/* Decorative Rings */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className={cn(
                                "w-96 h-96 rounded-full border-2 transition-colors duration-500",
                                isLight
                                    ? "border-slate-100 opacity-100"
                                    : `opacity-20 ${colorClasses[steps[activeStep].color].border}`
                            )} />
                        </div>

                        {/* Active Step Display */}
                        <div className="relative z-10 flex flex-col items-center justify-center min-h-[400px] text-center">
                            <div className={cn(
                                "w-32 h-32 rounded-3xl flex items-center justify-center mb-8 transition-all duration-500 shadow-2xl",
                                isLight
                                    ? "bg-white border-2 border-slate-100 shadow-xl"
                                    : `bg-gradient-to-br ${steps[activeStep].gradient}`
                            )}>
                                {React.createElement(steps[activeStep].icon, {
                                    className: cn(
                                        "w-16 h-16",
                                        isLight ? "text-violet-600" : "text-white"
                                    )
                                })}
                            </div>
                            <h3 className={`text-3xl font-bold mb-2 ${isLight ? "text-slate-900" : "text-white"}`}>
                                {steps[activeStep].title}
                            </h3>
                            <p className={`max-w-sm mx-auto ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                                {steps[activeStep].detail}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
