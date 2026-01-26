import React from 'react';
import { Heart, Linkedin, Mail, Shield, Zap, UserX } from 'lucide-react';
import { useTheme } from '../lib/ThemeContext';

export function Footer({ onNavigate }) {
    const currentYear = new Date().getFullYear();
    const { isLight } = useTheme();

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
        <footer className={`mt-auto border-t ${isLight
                ? "bg-slate-50 border-slate-200"
                : "bg-slate-950 border-white/5"
            }`}>
            {/* Main Footer - Single Row */}
            <div className="w-full max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">

                    {/* Brand Column - Takes 2 columns on lg */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center gap-4">
                            <div className={`w-9 h-9 rounded-lg overflow-hidden p-0.5 flex-shrink-0 ${isLight
                                    ? "bg-white border border-slate-200 shadow-sm"
                                    : "bg-slate-900 border border-white/10"
                                }`}>
                                <img src="/Gemini_Generated_Image_6jwaga6jwaga6jwa.png" alt="NotesForge" className="w-full h-full object-cover rounded" />
                            </div>
                            <div className="flex flex-col">
                                <span className={`text-lg font-bold bg-clip-text text-transparent leading-none ${isLight
                                        ? "bg-gradient-to-r from-slate-700 to-slate-900"
                                        : "bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400"
                                    }`}>
                                    NotesForge
                                </span>
                                <span className={`text-[8px] font-bold tracking-[0.15em] uppercase ${isLight ? "text-slate-500" : "text-slate-500"
                                    }`}>
                                    Free • Private • Instant
                                </span>
                            </div>
                        </div>

                        <p className={`text-xs leading-relaxed max-w-xs ${isLight ? "text-slate-500" : "text-slate-400"
                            }`}>
                            Transform dark lecture slides into print-ready documents. 100% privacy-focused — all processing in your browser.
                        </p>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2">
                            {badges.map((badge, i) => (
                                <span
                                    key={i}
                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium ${isLight
                                            ? "bg-white border border-slate-200 text-slate-600 shadow-sm"
                                            : "bg-slate-900 border border-slate-800 text-slate-300"
                                        }`}
                                >
                                    <badge.icon className={`w-3 h-3 ${badge.color === 'emerald' ? 'text-emerald-500' :
                                        badge.color === 'blue' ? 'text-blue-500' : 'text-amber-500'
                                        }`} />
                                    {badge.text}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className={`text-xs font-semibold mb-3 uppercase tracking-wider ${isLight ? "text-slate-900" : "text-white"
                            }`}>Quick Links</h4>
                        <ul className="space-y-2">
                            <li><button onClick={() => onNavigate?.('about')} className={`text-xs transition-colors ${isLight ? "text-slate-500 hover:text-slate-900" : "text-slate-400 hover:text-white"}`}>About Us</button></li>
                            <li><button onClick={() => onNavigate?.('blog')} className={`text-xs transition-colors ${isLight ? "text-slate-500 hover:text-slate-900" : "text-slate-400 hover:text-white"}`}>Blog & Tech</button></li>
                            <li><button onClick={scrollToHowItWorks} className={`text-xs transition-colors ${isLight ? "text-slate-500 hover:text-slate-900" : "text-slate-400 hover:text-white"}`}>How it Works</button></li>
                            <li><button onClick={() => onNavigate?.('support')} className={`text-xs transition-colors ${isLight ? "text-slate-500 hover:text-slate-900" : "text-slate-400 hover:text-white"}`}>Support Us</button></li>
                            <li><button onClick={() => onNavigate?.('contact')} className={`text-xs transition-colors ${isLight ? "text-slate-500 hover:text-slate-900" : "text-slate-400 hover:text-white"}`}>Contact / Feedback</button></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className={`text-xs font-semibold mb-3 uppercase tracking-wider ${isLight ? "text-slate-900" : "text-white"
                            }`}>Legal</h4>
                        <ul className="space-y-2">
                            <li><button onClick={() => onNavigate?.('terms')} className={`text-xs transition-colors ${isLight ? "text-slate-500 hover:text-slate-900" : "text-slate-400 hover:text-white"}`}>Terms & Conditions</button></li>
                            <li><button onClick={() => onNavigate?.('privacy')} className={`text-xs transition-colors ${isLight ? "text-slate-500 hover:text-slate-900" : "text-slate-400 hover:text-white"}`}>Privacy Policy</button></li>
                            <li><button onClick={() => onNavigate?.('refund')} className={`text-xs transition-colors ${isLight ? "text-slate-500 hover:text-slate-900" : "text-slate-400 hover:text-white"}`}>Refund Policy</button></li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className={`text-xs font-semibold mb-3 uppercase tracking-wider ${isLight ? "text-slate-900" : "text-white"
                            }`}>Connect</h4>
                        <div className="flex gap-2 mb-3">
                            {socialLinks.map((link, i) => (
                                <a
                                    key={i}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${isLight
                                            ? "bg-white border border-slate-200 text-slate-500 hover:text-violet-600 hover:border-violet-300 shadow-sm"
                                            : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-violet-600/20 hover:border-violet-500/30"
                                        }`}
                                    title={link.label}
                                >
                                    <link.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                        <p className={`text-[10px] ${isLight ? "text-slate-500" : "text-slate-500"}`}>
                            Reach out via social links above
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className={`border-t py-4 px-6 ${isLight ? "border-slate-200" : "border-white/5"
                }`}>
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className={`text-[11px] ${isLight ? "text-slate-500" : "text-slate-500"}`}>
                        © {currentYear} NotesForge. All rights reserved.
                    </p>
                    <p className={`text-[11px] flex items-center gap-1 ${isLight ? "text-slate-500" : "text-slate-500"}`}>
                        Made with <Heart className="w-3 h-3 text-red-500" /> by{' '}
                        <a
                            href="https://www.linkedin.com/in/abhay-kumar-81b2a8288/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`font-medium transition-colors ${isLight ? "text-slate-700 hover:text-violet-600" : "text-white hover:text-violet-400"
                                }`}
                        >
                            Abhay Kumar
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}

