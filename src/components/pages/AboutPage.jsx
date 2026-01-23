import React from 'react';
import { ArrowLeft, Shield, Zap, Users, Globe, Lock, Eye, Code, FileText, Heart, CheckCircle, Monitor, Cpu, Server, Sparkles, BookOpen, Lightbulb, Target } from 'lucide-react';

export function AboutPage({ onBack, onNavigate }) {
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

    const colorClasses = {
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
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
            </button>

            {/* Hero Section */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-xs mb-2">
                    <Shield className="w-3 h-3" />
                    Privacy-First PDF Tools
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-white">
                    About{' '}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-purple-400">
                        NotesForge
                    </span>
                </h1>

                <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                    Free, privacy-first PDF tools that work entirely in your browser
                </p>

                <p className="text-slate-500 max-w-xl mx-auto text-sm">
                    Transform dark lecture slides into printer-friendly documents with zero uploads and complete privacy.
                </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className="p-5 rounded-2xl bg-slate-900/50 border border-white/5 text-center hover:border-violet-500/30 transition-colors">
                        <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-purple-400">
                            {stat.value}
                        </div>
                        <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Our Mission */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 text-center space-y-2 hover:border-violet-500/30 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center mx-auto">
                        <Target className="w-5 h-5 text-violet-400" />
                    </div>
                    <h3 className="font-semibold text-white text-sm">Our Mission</h3>
                    <p className="text-xs text-slate-400">Make quality education materials accessible by optimizing notes for affordable printing.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 text-center space-y-2 hover:border-emerald-500/30 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center mx-auto">
                        <Shield className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h3 className="font-semibold text-white text-sm">Privacy First</h3>
                    <p className="text-xs text-slate-400">Your documents never leave your device. All processing happens locally in your browser.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 text-center space-y-2 hover:border-fuchsia-500/30 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-fuchsia-500/20 flex items-center justify-center mx-auto">
                        <Heart className="w-5 h-5 text-fuchsia-400" />
                    </div>
                    <h3 className="font-semibold text-white text-sm">Forever Free</h3>
                    <p className="text-xs text-slate-400">No subscriptions, no hidden costs, no watermarks. NotesForge will always be 100% free.</p>
                </div>
            </div>

            {/* Our Core Values */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white text-center">Our Core Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {coreValues.map((value, index) => (
                        <div key={index} className="p-5 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-violet-500/30 transition-all group">
                            <div className={`w-12 h-12 rounded-xl ${colorClasses[value.color]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <value.icon className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-white text-lg mb-2">{value.title}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">{value.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Why NotesForge */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-violet-900/20 to-fuchsia-900/10 border border-violet-500/20">
                <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-400" />
                    Story Behind NotesForge
                </h2>
                <div className="space-y-3 text-slate-300 leading-relaxed text-sm">
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

            {/* What We Do */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white text-center">What We Do</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {whatWeDo.map((item, index) => (
                        <div key={index} className="p-5 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-violet-500/30 transition-all text-center">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
                                <item.icon className="w-7 h-7 text-violet-400" />
                            </div>
                            <h3 className="font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Powered by Modern Browser Technology */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-900/20 to-purple-900/10 border border-violet-500/20">
                <h2 className="text-xl font-bold text-white text-center mb-6">Powered by Modern Browser Technology</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {technologies.map((tech, index) => (
                        <div key={index} className="text-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center mx-auto mb-3">
                                <tech.icon className="w-6 h-6 text-violet-400" />
                            </div>
                            <div className="font-semibold text-white text-sm">{tech.name}</div>
                            <div className="text-xs text-slate-500 mt-1">{tech.desc}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* How It Works Link */}
            <div className="text-center p-5 rounded-2xl bg-slate-900/50 border border-white/5">
                <h3 className="font-bold text-white mb-2">Want to see how it works?</h3>
                <p className="text-sm text-slate-400 mb-4">Check out our step-by-step guide on the homepage.</p>
                <button
                    onClick={() => {
                        onBack();
                        setTimeout(() => {
                            const element = document.getElementById('how-it-works');
                            if (element) element.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors"
                >
                    <Zap className="w-4 h-4" />
                    See How It Works
                </button>
            </div>

            {/* Trust Footer */}
            <div className="flex flex-wrap justify-center gap-4 pt-4 border-t border-white/5 text-xs text-slate-500">
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
