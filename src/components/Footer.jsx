import React from 'react';
import { Heart, Linkedin, Mail, Shield, Zap, UserX } from 'lucide-react';

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

    const socialLinks = [

        { icon: Linkedin, href: 'https://www.linkedin.com/in/abhay-kumar-81b2a8288/', label: 'LinkedIn' },
        { icon: Mail, href: 'mailto:abhayk7481@gmail.com', label: 'Email' },
    ];

    const badges = [
        { icon: Shield, text: "Privacy First", color: "emerald" },
        { icon: Zap, text: "100% Free", color: "blue" },
        { icon: UserX, text: "No Login", color: "amber" },
    ];

    return (
        <footer className="mt-auto bg-slate-950 border-t border-white/5">
            {/* Main Footer - Single Row */}
            <div className="w-full max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">

                    {/* Brand Column - Takes 2 columns on lg */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-9 h-9 rounded-lg overflow-hidden bg-slate-900 border border-white/10 p-0.5 flex-shrink-0">
                                <img src="/logo.svg" alt="NotesForge" className="w-full h-full object-cover rounded" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 leading-none">
                                    NotesForge
                                </span>
                                <span className="text-[8px] text-slate-500 font-bold tracking-[0.15em] uppercase">
                                    Free • Private • Instant
                                </span>
                            </div>
                        </div>

                        <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
                            Transform dark lecture slides into print-ready documents. 100% privacy-focused — all processing in your browser.
                        </p>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2">
                            {badges.map((badge, i) => (
                                <span
                                    key={i}
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-medium text-slate-300"
                                >
                                    <badge.icon className={`w-3 h-3 ${badge.color === 'emerald' ? 'text-emerald-400' :
                                        badge.color === 'blue' ? 'text-blue-400' : 'text-amber-400'
                                        }`} />
                                    {badge.text}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xs font-semibold text-white mb-3 uppercase tracking-wider">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><button onClick={() => onNavigate?.('about')} className="text-xs text-slate-400 hover:text-white transition-colors">About Us</button></li>
                            <li><button onClick={() => onNavigate?.('blog')} className="text-xs text-slate-400 hover:text-white transition-colors">Blog & Tech</button></li>
                            <li><button onClick={scrollToHowItWorks} className="text-xs text-slate-400 hover:text-white transition-colors">How it Works</button></li>
                            <li><button onClick={() => onNavigate?.('support')} className="text-xs text-slate-400 hover:text-white transition-colors">Support Us</button></li>
                            <li><button onClick={() => onNavigate?.('contact')} className="text-xs text-slate-400 hover:text-white transition-colors">Contact / Feedback</button></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-xs font-semibold text-white mb-3 uppercase tracking-wider">Legal</h4>
                        <ul className="space-y-2">
                            <li><button onClick={() => onNavigate?.('terms')} className="text-xs text-slate-400 hover:text-white transition-colors">Terms & Conditions</button></li>
                            <li><button onClick={() => onNavigate?.('privacy')} className="text-xs text-slate-400 hover:text-white transition-colors">Privacy Policy</button></li>
                            <li><button onClick={() => onNavigate?.('refund')} className="text-xs text-slate-400 hover:text-white transition-colors">Refund Policy</button></li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className="text-xs font-semibold text-white mb-3 uppercase tracking-wider">Connect</h4>
                        <div className="flex gap-2 mb-3">
                            {socialLinks.map((link, i) => (
                                <a
                                    key={i}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-violet-600/20 hover:border-violet-500/30 transition-all"
                                    title={link.label}
                                >
                                    <link.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                        <p className="text-[10px] text-slate-500">
                            Reach out via social links above
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/5 py-4 px-6">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="text-[11px] text-slate-500">
                        © {currentYear} NotesForge. All rights reserved.
                    </p>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                        Made with <Heart className="w-3 h-3 text-red-500" /> by{' '}
                        <a
                            href="https://www.linkedin.com/in/abhay-kumar-81b2a8288/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-violet-400 transition-colors font-medium"
                        >
                            Abhay Kumar
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
