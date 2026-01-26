import React from 'react';
import { ArrowLeft, Shield, Zap, Users, Globe, Lock, Eye, Code, FileText, Heart, CheckCircle, Monitor, Cpu, Server, Sparkles, BookOpen, Lightbulb, Target } from 'lucide-react';
import { useTheme } from '../../lib/ThemeContext';

export function AboutPage({ onBack, onNavigate }) {
    const { isLight } = useTheme();
    const stats = [
        { value: "100%", label: "Free" },
        { value: "0", label: "Data Collected" },
        { value: "Local", label: "Processing" },
        { value: "No", label: "Login Required" },
    ];

    const coreValues = [
        {
            icon: Heart,
            title: "Free Forever",
            desc: "We believe PDF tools should be accessible to everyone. No paywalls, no subscriptions, just free tools for all.",
            color: "violet"
        },
        {
            icon: Shield,
            title: "Privacy First",
            desc: "Your files never leave your device. Everything processes in your browser, ensuring complete privacy and security.",
            color: "emerald"
        },
        {
            icon: Users,
            title: "No Login Required",
            desc: "Use NotesForge instantly without creating an account. Anonymous, simple, and hassle-free.",
            color: "blue"
        },
        {
            icon: Zap,
            title: "Built for Students",
            desc: "Created by students who understand the struggle of expensive PDF tools and the need for privacy.",
            color: "amber"
        },
    ];

    const whatWeDo = [
        {
            icon: Monitor,
            title: "Browser-Based Processing",
            desc: "All PDF processing happens locally in your browser using JavaScript. No servers, no uploads, complete control."
        },
        {
            icon: Code,
            title: "Open & Transparent",
            desc: "Our approach is open and verifiable. You can inspect the code to confirm we don't collect or store your data."
        },
        {
            icon: Globe,
            title: "Works Offline",
            desc: "Once loaded, NotesForge works even without internet. Process PDFs anywhere, anytime."
        },
    ];

    const technologies = [
        { icon: FileText, name: "PDF-lib", desc: "PDF Processing" },
        { icon: Eye, name: "PDF.js", desc: "PDF Rendering" },
        { icon: Cpu, name: "WebAssembly", desc: "Fast Computation" },
        { icon: Lock, name: "Browser Security", desc: "Local Processing" },
    ];

    const colorClasses = isLight ? {
        violet: 'bg-violet-50 text-violet-700 border border-violet-100',
        emerald: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
        blue: 'bg-blue-50 text-blue-700 border border-blue-100',
        amber: 'bg-amber-50 text-amber-700 border border-amber-100',
    } : {
        violet: 'bg-violet-500/20 text-violet-400',
        emerald: 'bg-emerald-500/20 text-emerald-400',
        blue: 'bg-blue-500/20 text-blue-400',
        amber: 'bg-amber-500/20 text-amber-400',
    };

    return (
        <div className="max-w-4xl mx-auto pt-4 space-y-8 pb-12">
            {/* Back Button */}
            <button
                onClick={onBack}
                className={`flex items-center gap-2 transition-colors text-sm ${isLight ? "text-gray-500 hover:text-gray-900" : "text-slate-400 hover:text-white"}`}
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
            </button>

            {/* Hero Section */}
            <div className={`text-center space-y-4 ${isLight ? "mt-4" : ""}`}>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-2 ${isLight
                    ? "bg-slate-100 border border-slate-200 text-slate-600 font-medium"
                    : "bg-violet-500/20 border border-violet-500/30 text-violet-300"
                    }`}>
                    <Shield className="w-3 h-3" />
                    Privacy-First PDF Tools
                </div>

                <h1 className={`text-3xl md:text-4xl font-bold ${isLight ? "text-slate-900 tracking-tight" : "text-white"}`}>
                    About{' '}
                    <span className={`bg-clip-text text-transparent ${isLight
                        ? "bg-gradient-to-r from-violet-700 to-violet-600 text-violet-700"
                        : "bg-gradient-to-r from-violet-400 to-purple-400"
                        }`}>
                        NotesForge
                    </span>
                </h1>

                <p className={`max-w-2xl mx-auto text-lg ${isLight ? "text-slate-600 font-normal" : "text-slate-400"}`}>
                    Free, privacy-first PDF tools that work entirely in your browser
                </p>

                <p className={`max-w-xl mx-auto text-sm ${isLight ? "text-slate-500" : "text-slate-500"}`}>
                    Transform dark lecture slides into printer-friendly documents with zero uploads and complete privacy.
                </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className={`p-5 rounded-xl text-center transition-colors ${isLight
                        ? "bg-white border border-slate-200 shadow-sm hover:border-slate-300"
                        : "bg-slate-900/50 border border-white/5 hover:border-violet-500/30"
                        }`}>
                        <div className={`text-2xl md:text-3xl font-bold bg-clip-text text-transparent ${isLight
                            ? "bg-gradient-to-r from-slate-900 to-slate-700 text-slate-900"
                            : "bg-gradient-to-r from-violet-400 to-purple-400"
                            }`}>
                            {stat.value}
                        </div>
                        <div className={`text-sm mt-1 ${isLight ? "text-slate-600" : "text-slate-400"}`}>{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Our Mission */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`p-4 rounded-xl text-center space-y-2 transition-colors ${isLight ? "bg-white border border-slate-200 shadow-sm hover:border-slate-300" : "bg-slate-900/50 border border-white/5 hover:border-violet-500/30"}`}>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto ${isLight ? "bg-violet-100" : "bg-violet-500/20"}`}>
                        <Target className={`w-5 h-5 ${isLight ? "text-violet-600" : "text-violet-400"}`} />
                    </div>
                    <h3 className={`font-semibold text-sm ${isLight ? "text-slate-800" : "text-white"}`}>Our Mission</h3>
                    <p className={`text-xs ${isLight ? "text-slate-600" : "text-slate-400"}`}>Make quality education materials accessible by optimizing notes for affordable printing.</p>
                </div>
                <div className={`p-4 rounded-xl text-center space-y-2 transition-colors ${isLight ? "bg-white border border-slate-200 shadow-sm hover:border-slate-300" : "bg-slate-900/50 border border-white/5 hover:border-emerald-500/30"}`}>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto ${isLight ? "bg-emerald-100" : "bg-emerald-500/20"}`}>
                        <Shield className={`w-5 h-5 ${isLight ? "text-emerald-600" : "text-emerald-400"}`} />
                    </div>
                    <h3 className={`font-semibold text-sm ${isLight ? "text-slate-800" : "text-white"}`}>Privacy First</h3>
                    <p className={`text-xs ${isLight ? "text-slate-600" : "text-slate-400"}`}>Your documents never leave your device. All processing happens locally in your browser.</p>
                </div>
                <div className={`p-4 rounded-xl text-center space-y-2 transition-colors ${isLight ? "bg-white border border-slate-200 shadow-sm hover:border-slate-300" : "bg-slate-900/50 border border-white/5 hover:border-fuchsia-500/30"}`}>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto ${isLight ? "bg-fuchsia-100" : "bg-fuchsia-500/20"}`}>
                        <Heart className={`w-5 h-5 ${isLight ? "text-fuchsia-600" : "text-fuchsia-400"}`} />
                    </div>
                    <h3 className={`font-semibold text-sm ${isLight ? "text-slate-800" : "text-white"}`}>Forever Free</h3>
                    <p className={`text-xs ${isLight ? "text-slate-600" : "text-slate-400"}`}>No subscriptions, no hidden costs, no watermarks. NotesForge will always be 100% free.</p>
                </div>
            </div>

            {/* Our Core Values */}
            <div className="space-y-6">
                <h2 className={`text-2xl font-bold text-center ${isLight ? "text-slate-900" : "text-white"}`}>Our Core Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {coreValues.map((value, index) => (
                        <div key={index} className={`p-5 rounded-xl transition-all group ${isLight
                            ? "bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300"
                            : "bg-slate-900/50 border border-white/5 hover:border-violet-500/30"
                            }`}>
                            <div className={`w-12 h-12 rounded-lg ${colorClasses[value.color]} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                                <value.icon className="w-6 h-6" />
                            </div>
                            <h3 className={`font-bold text-lg mb-2 ${isLight ? "text-slate-900" : "text-white"}`}>{value.title}</h3>
                            <p className={`text-sm leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>{value.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Our Story */}
            <div className={`p-5 rounded-xl ${isLight
                    ? "bg-white border border-slate-200 shadow-sm"
                    : "bg-slate-900/50 border border-white/5"
                }`}>
                <h2 className={`text-lg font-bold mb-3 flex items-center gap-2 ${isLight ? "text-slate-900" : "text-white"}`}>
                    <BookOpen className="w-5 h-5 text-cyan-400" />
                    Why NotesForge
                </h2>
                <div className={`space-y-3 leading-relaxed text-sm ${isLight ? "text-slate-600" : "text-slate-300"}`}>
                    <p>
                        NotesForge was born out of frustration. As students preparing for competitive exams, we found ourselves
                        spending a fortune on ink cartridges just to print our lecture notes — most of which had dark backgrounds
                        that consumed excessive ink.
                    </p>
                    <p>
                        We looked for solutions but found nothing that was free, private, and actually worked well.
                        So we built NotesForge — a tool that does exactly what we needed: converts dark slides to
                        printer-friendly format, arranges multiple slides per page, and does it all without uploading
                        your files anywhere.
                    </p>
                    <p>
                        Today, NotesForge helps thousands of students save money on printing while keeping their study
                        materials private and secure.
                    </p>
                </div>
            </div>

            {/* Why NotesForge */}
            <div className={`p-5 rounded-xl ${isLight
                    ? "bg-violet-50/50 border border-violet-100"
                    : "bg-gradient-to-br from-violet-900/20 to-fuchsia-900/10 border border-violet-500/20"
                }`}>
                <h2 className={`text-lg font-bold mb-3 flex items-center gap-2 ${isLight ? "text-slate-900" : "text-white"}`}>
                    <Lightbulb className="w-5 h-5 text-amber-400" />
                    Story Behind NotesForge
                </h2>
                <div className={`space-y-3 leading-relaxed text-sm ${isLight ? "text-slate-600" : "text-slate-300"}`}>
                    <p>
                        During my IIT JEE preparation journey (and now in GATE), I stepped into a whole new era of
                        digital learning. Online classes were packed with information, and it felt impossible to
                        capture everything in my notes. I often spent hours trying to organize content, only to
                        feel that I was falling behind. It was frustrating, exhausting, and overwhelming — yet
                        I knew there had to be a better way.
                    </p>
                    <p>
                        That's when <span className={`font-medium ${isLight ? "text-violet-700" : "text-violet-400"}`}>NotesForge</span> was born. I created a platform
                        that turns digital lessons and slides into clear, printable notes, saving precious time,
                        reducing effort, and allowing students to focus on learning, understanding, and achieving
                        their goals.
                    </p>
                </div>
            </div>

            {/* What We Do */}
            <div className="space-y-6">
                <h2 className={`text-2xl font-bold text-center ${isLight ? "text-slate-900" : "text-white"}`}>What We Do</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {whatWeDo.map((item, index) => (
                        <div key={index} className={`p-5 rounded-2xl text-center transition-all ${isLight
                                ? "bg-white border border-slate-200 shadow-sm hover:border-violet-300"
                                : "bg-slate-900/50 border border-white/5 hover:border-violet-500/30"
                            }`}>
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${isLight ? "bg-violet-100" : "bg-gradient-to-br from-violet-500/20 to-purple-500/20"
                                }`}>
                                <item.icon className={`w-7 h-7 ${isLight ? "text-violet-600" : "text-violet-400"}`} />
                            </div>
                            <h3 className={`font-bold mb-2 ${isLight ? "text-slate-900" : "text-white"}`}>{item.title}</h3>
                            <p className={`text-sm leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Powered by Modern Browser Technology */}
            <div className={`p-6 rounded-2xl ${isLight
                    ? "bg-violet-50 border border-violet-100"
                    : "bg-gradient-to-br from-violet-900/20 to-purple-900/10 border border-violet-500/20"
                }`}>
                <h2 className={`text-xl font-bold text-center mb-6 ${isLight ? "text-slate-900" : "text-white"}`}>Powered by Modern Browser Technology</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {technologies.map((tech, index) => (
                        <div key={index} className={`text-center p-4 rounded-xl transition-colors ${isLight
                                ? "bg-white border border-violet-100 hover:border-violet-300 shadow-sm"
                                : "bg-white/5 border border-white/10 hover:border-violet-500/30"
                            }`}>
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${isLight ? "bg-violet-100" : "bg-violet-500/20"
                                }`}>
                                <tech.icon className={`w-6 h-6 ${isLight ? "text-violet-600" : "text-violet-400"}`} />
                            </div>
                            <div className={`font-semibold text-sm ${isLight ? "text-slate-900" : "text-white"}`}>{tech.name}</div>
                            <div className={`text-xs mt-1 ${isLight ? "text-slate-600" : "text-slate-500"}`}>{tech.desc}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* How It Works Link */}
            <div className={`text-center p-5 rounded-2xl ${isLight
                    ? "bg-slate-100 border border-slate-200"
                    : "bg-slate-900/50 border border-white/5"
                }`}>
                <h3 className={`font-bold mb-2 ${isLight ? "text-slate-900" : "text-white"}`}>Want to see how it works?</h3>
                <p className={`text-sm mb-4 ${isLight ? "text-slate-600" : "text-slate-400"}`}>Check out our step-by-step guide on the homepage.</p>
                <button
                    onClick={() => {
                        onBack();
                        setTimeout(() => {
                            const element = document.getElementById('how-it-works');
                            if (element) element.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                    }}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isLight
                            ? "bg-violet-600 hover:bg-violet-700 text-white shadow-sm"
                            : "bg-violet-600 hover:bg-violet-500 text-white"
                        }`}
                >
                    <Zap className="w-4 h-4" />
                    See How It Works
                </button>
            </div>

            {/* Trust Footer */}
            <div className={`flex flex-wrap justify-center gap-4 pt-4 border-t text-xs ${isLight ? "border-gray-200 text-gray-500" : "border-white/5 text-slate-500"}`}>
                <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    100% Browser-Based
                </span>
                <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3 text-emerald-500" />
                    Zero Data Collection
                </span>
                <span className="flex items-center gap-1">
                    <Lock className="w-3 h-3 text-emerald-500" />
                    No Account Required
                </span>
                <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-emerald-500" />
                    Free Forever
                </span>
            </div>
        </div>
    );
}
