import React from 'react';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';

export function Footer({ onNavigate }) {
    const currentYear = new Date().getFullYear();

    const scrollToHowItWorks = () => {
        if (onNavigate) onNavigate('home');
        setTimeout(() => {
            const element = document.getElementById('how-it-works');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    const developerLinks = [
        { icon: Linkedin, href: 'https://www.linkedin.com/in/abhay-kumar-81b2a8288/', label: 'LinkedIn' },
        { icon: Github, href: 'https://github.com/abhay-kr-0705', label: 'GitHub' },
        { icon: Mail, href: 'mailto:abhayk7481@gmail.com', label: 'Email' },
    ];

    return (
        <footer className="w-full mt-auto bg-slate-950 border-t border-white/5">
            <div className="w-full max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">

                    {/* Brand Column (Span 4) */}
                    <div className="md:col-span-5 space-y-6">
                        {/* Logo Block matching screenshot */}
                        <div className="flex items-center gap-4">
                            {/* Icon Circle */}
                            <div className="relative w-14 h-14 rounded-full bg-[#0B1221] border border-white/5 flex items-center justify-center shadow-lg shadow-black/40">
                                <img src="/logo.svg" alt="NotesForge" className="w-8 h-8" />
                            </div>

                            {/* Text Block */}
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-[#A5B4FC] tracking-tight">
                                    NotesForge
                                </span>
                                <span className="text-[10px] sm:text-xs font-bold text-slate-500 tracking-[0.2em] uppercase mt-0.5">
                                    FREE • PRIVATE • INSTANT
                                </span>
                            </div>
                        </div>

                        <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                            The smartest way to print lecture slides. We help students save paper, ink, and time with secure, browser-based PDF processing tools.
                        </p>

                        <div className="flex gap-3">
                            {developerLinks.map((link, i) => (
                                <a
                                    key={i}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-violet-600/20 hover:border-violet-500/30 transition-all shadow-md group"
                                >
                                    <link.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Columns (Span 2 each) */}
                    <div className="md:col-span-2 md:col-start-7">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Platform</h4>
                        <ul className="space-y-3">
                            <li><button onClick={() => onNavigate?.('home')} className="text-sm text-slate-400 hover:text-violet-400 transition-colors">Home</button></li>
                            <li><button onClick={() => onNavigate?.('about')} className="text-sm text-slate-400 hover:text-violet-400 transition-colors">About Us</button></li>
                            <li><button onClick={scrollToHowItWorks} className="text-sm text-slate-400 hover:text-violet-400 transition-colors">How it Works</button></li>
                            <li><button onClick={() => onNavigate?.('upload')} className="text-sm text-slate-400 hover:text-violet-400 transition-colors">Start Forging</button></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Legal</h4>
                        <ul className="space-y-3">
                            <li><button onClick={() => onNavigate?.('terms')} className="text-sm text-slate-400 hover:text-violet-400 transition-colors">Terms of Service</button></li>
                            <li><button onClick={() => onNavigate?.('privacy')} className="text-sm text-slate-400 hover:text-violet-400 transition-colors">Privacy Policy</button></li>
                            <li><button onClick={() => onNavigate?.('refund')} className="text-sm text-slate-400 hover:text-violet-400 transition-colors">Refund Policy</button></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Support</h4>
                        <ul className="space-y-3">
                            <li><button onClick={() => onNavigate?.('help')} className="text-sm text-slate-400 hover:text-violet-400 transition-colors">Help Center</button></li>
                            <li><button onClick={() => onNavigate?.('support')} className="text-sm text-slate-400 hover:text-violet-400 transition-colors">Support Us</button></li>
                            <li><button onClick={() => onNavigate?.('contact')} className="text-sm text-slate-400 hover:text-violet-400 transition-colors">Contact</button></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <p>© {currentYear} NotesForge. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Built with <Heart className="w-3 h-3 text-red-500 fill-red-500/20" /> by{' '}
                        <a
                            href="https://www.linkedin.com/in/abhay-kumar-81b2a8288/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-slate-400 hover:text-violet-400 transition-colors border-b border-transparent hover:border-violet-400/50 pb-0.5"
                        >
                            Abhay Kumar
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
