import React from 'react';
import { Heart, Shield, Zap, Target, ArrowLeft, Sparkles, Github, Linkedin, Instagram, Twitter, Mail, Globe, BookOpen, Lightbulb } from 'lucide-react';

export function AboutPage({ onBack }) {
    const socialLinks = [
        { icon: Linkedin, href: 'https://www.linkedin.com/in/abhay-kumar-81b2a8288/', label: 'LinkedIn', color: 'hover:bg-blue-500/20 hover:border-blue-500/30' },
        { icon: Github, href: 'https://github.com/abhay-kr-0705', label: 'GitHub', color: 'hover:bg-slate-500/20 hover:border-slate-400/30' },
        { icon: Instagram, href: 'https://www.instagram.com/abhay_kr.07/', label: 'Instagram', color: 'hover:bg-pink-500/20 hover:border-pink-500/30' },
        { icon: Twitter, href: 'https://twitter.com/abhayk7481', label: 'Twitter', color: 'hover:bg-cyan-500/20 hover:border-cyan-500/30' },
        { icon: Mail, href: 'mailto:abhayk7481@gmail.com', label: 'Email', color: 'hover:bg-red-500/20 hover:border-red-500/30' },
        { icon: Globe, href: 'https://abhaykumarportfolio2.netlify.app/', label: 'Portfolio', color: 'hover:bg-violet-500/20 hover:border-violet-500/30' },
    ];

    return (
        <div className="max-w-4xl mx-auto py-6 space-y-10">
            {/* Back Button */}
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
            </button>

            {/* Hero */}
            <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs">
                    <Sparkles className="w-3 h-3" />
                    <span>About NotesForge</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Built for Students,{' '}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400">
                        By a Student
                    </span>
                </h1>
                <p className="text-slate-400 max-w-2xl mx-auto text-sm">
                    A free, privacy-focused tool that transforms dark lecture slides into print-ready documents.
                </p>
            </div>

            {/* Mission Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <MissionCard
                    icon={Target}
                    title="Our Mission"
                    description="Make quality education materials accessible by optimizing notes for affordable printing."
                    color="violet"
                />
                <MissionCard
                    icon={Shield}
                    title="Privacy First"
                    description="Your documents never leave your device. All processing happens locally in your browser."
                    color="emerald"
                />
                <MissionCard
                    icon={Heart}
                    title="Forever Free"
                    description="No subscriptions, no hidden costs, no watermarks. NotesForge will always be 100% free."
                    color="fuchsia"
                />
            </div>

            {/* Our Story */}
            <div className="p-5 rounded-xl bg-slate-900/50 border border-white/5">
                <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-cyan-400" />
                    Why NotesForge
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

            {/* Why NotesForge */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-violet-900/20 to-fuchsia-900/10 border border-violet-500/20">
                <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-400" />
                    Story Behind NotesForge
                </h2>
                <div className="space-y-3 text-slate-300 leading-relaxed text-sm">
                    <p>
                        During my IIT JEE preparation journey (and now in GATE), I stepped into a whole new era of
                        digital learning. Online classes were packed with information, and it felt impossible to
                        capture everything in my notes. I often spent hours trying to organize content, only to
                        feel that I was falling behind. It was frustrating, exhausting, and overwhelming — yet
                        I knew there had to be a better way.
                    </p>
                    <p>
                        That's when <span className="text-violet-400 font-medium">NotesForge</span> was born. I created a platform
                        that turns digital lessons and slides into clear, printable notes, saving precious time,
                        reducing effort, and allowing students to focus on learning, understanding, and achieving
                        their goals.
                    </p>
                    <p>
                        Today, thousands of students trust NotesForge to transform the way they study, making exam
                        preparation more efficient, productive, and even enjoyable.
                    </p>
                </div>
            </div>

            {/* Developer Section */}
            <div className="text-center space-y-3">
                <h2 className="text-lg font-bold text-white">Meet the Developer</h2>
                <div className="inline-block p-5 rounded-xl bg-slate-900/50 border border-white/5">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mx-auto mb-3 text-xl font-bold text-white">
                        AK
                    </div>
                    <h3 className="text-base font-semibold text-white">Abhay Kumar</h3>
                    <p className="text-xs text-slate-400 mb-3">Full Stack Developer</p>

                    {/* Social Links */}
                    <div className="flex flex-wrap justify-center gap-1.5">
                        {socialLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={link.label}
                                className={`w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all ${link.color}`}
                            >
                                <link.icon className="w-3.5 h-3.5" />
                            </a>
                        ))}
                    </div>

                    <div className="mt-3 pt-3 border-t border-white/5 text-[10px] text-slate-500">
                        <p>abhayk7481@gmail.com • @abhayk7481</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MissionCard({ icon: Icon, title, description, color }) {
    const colorClasses = {
        violet: 'bg-violet-500/20 text-violet-400',
        emerald: 'bg-emerald-500/20 text-emerald-400',
        fuchsia: 'bg-fuchsia-500/20 text-fuchsia-400',
    };

    return (
        <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 text-center space-y-2">
            <div className={`w-10 h-10 rounded-lg ${colorClasses[color]} flex items-center justify-center mx-auto`}>
                <Icon className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-white text-sm">{title}</h3>
            <p className="text-xs text-slate-400">{description}</p>
        </div>
    );
}
