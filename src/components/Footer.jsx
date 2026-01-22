import React from 'react';
import { Heart, Shield, Zap, Github, Twitter, Linkedin, Mail, Instagram, Globe } from 'lucide-react';

export function Footer({ onNavigate }) {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { id: 'about', label: 'About Us' },
        { id: 'help', label: 'Help Center' },
        { id: 'support', label: 'Support Us' },
    ];

    const legalLinks = [
        { id: 'terms', label: 'Terms & Conditions' },
        { id: 'privacy', label: 'Privacy Policy' },
        { id: 'refund', label: 'Refund Policy' },
    ];

    const socialLinks = [
        { href: 'https://github.com/abhay-kr-0705', icon: Github, label: 'GitHub' },
        { href: 'https://www.linkedin.com/in/abhay-kumar-81b2a8288/', icon: Linkedin, label: 'LinkedIn' },
        { href: 'https://twitter.com/abhayk7481', icon: Twitter, label: 'Twitter' },
        { href: 'https://instagram.com/abhayk7481', icon: Instagram, label: 'Instagram' },
        { href: 'mailto:abhayk7481@gmail.com', icon: Mail, label: 'Email' },
    ];

    return (
        <footer className="relative border-t border-white/5 bg-slate-950">
            {/* Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

            <div className="container mx-auto px-4 py-10">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
                    {/* Brand Column */}
                    <div className="md:col-span-5">
                        <div className="flex items-center gap-3 mb-4">
                            <img
                                src="/logo.svg"
                                alt="NotesForge Logo"
                                className="w-10 h-10 rounded-xl"
                            />
                            <div className="flex flex-col">
                                <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400 leading-tight">
                                    NotesForge
                                </span>
                                <span className="text-[8px] text-slate-500 tracking-wider leading-tight">FREE • PRIVATE • INSTANT</span>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm max-w-sm mb-4 leading-relaxed">
                            Transform dark lecture slides into print-ready documents.
                            100% privacy-focused — all processing in your browser.
                        </p>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap gap-2">
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                                <Shield className="w-3 h-3" />
                                <span>Privacy First</span>
                            </div>
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs">
                                <Zap className="w-3 h-3" />
                                <span>100% Free</span>
                            </div>
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs">
                                <Globe className="w-3 h-3" />
                                <span>No Login</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="md:col-span-2">
                        <h4 className="text-white font-semibold text-sm mb-3">Quick Links</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.id}>
                                    <button
                                        onClick={() => onNavigate(link.id)}
                                        className="text-slate-400 hover:text-white transition-colors text-sm"
                                    >
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="md:col-span-2">
                        <h4 className="text-white font-semibold text-sm mb-3">Legal</h4>
                        <ul className="space-y-2">
                            {legalLinks.map((link) => (
                                <li key={link.id}>
                                    <button
                                        onClick={() => onNavigate(link.id)}
                                        className="text-slate-400 hover:text-white transition-colors text-sm"
                                    >
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div className="md:col-span-3">
                        <h4 className="text-white font-semibold text-sm mb-3">Connect</h4>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800/50 border border-white/5 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
                                    title={social.label}
                                >
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                        <p className="text-xs text-slate-500">
                            Reach out via social links above
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3">
                    <p className="text-slate-500 text-xs">
                        © {currentYear} NotesForge. All rights reserved.
                    </p>
                    <p className="text-slate-500 text-xs flex items-center gap-1">
                        Made with <Heart className="w-3 h-3 text-red-500" /> by{' '}
                        <a
                            href="https://www.linkedin.com/in/abhay-kumar-81b2a8288/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 font-medium"
                        >
                            Abhay Kumar
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
