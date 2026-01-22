import React, { useState, useEffect } from "react";
import { Menu, X, Info, HelpCircle, Heart, Home, Sparkles } from "lucide-react";
import { Button } from "./ui/Button";

export function Navbar({ currentPage, onNavigate }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'about', label: 'About', icon: Info },
        { id: 'help', label: 'Help', icon: HelpCircle },
        { id: 'support', label: 'Support', icon: Heart },
    ];

    const handleLogoClick = () => {
        onNavigate('home');
        window.scrollTo(0, 0);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-slate-950/95 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
                : "bg-slate-950/80 backdrop-blur-sm"
                }`}
        >
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <button onClick={handleLogoClick} className="flex items-center gap-3 group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 rounded-xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
                        <img
                            src="/logo.svg"
                            alt="NotesForge Logo"
                            className="relative w-10 h-10 rounded-xl"
                        />
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400">
                            NotesForge
                        </span>
                        <span className="text-[8px] text-slate-500 tracking-wider font-medium">FREE • PRIVATE • INSTANT</span>
                    </div>
                </button>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-1 bg-slate-800/40 rounded-full px-1.5 py-1 border border-white/5">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${currentPage === item.id
                                ? 'bg-gradient-to-r from-blue-500/20 to-violet-500/20 text-white border border-white/10'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <item.icon className="w-3.5 h-3.5" />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                {/* CTA Button */}
                <div className="hidden md:block">
                    <Button
                        onClick={() => onNavigate('upload')}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 shadow-lg shadow-violet-500/25"
                    >
                        <Sparkles className="w-4 h-4" />
                        Start Forging
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 rounded-xl bg-slate-800/50 border border-white/10 text-slate-300 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-slate-950/98 backdrop-blur-xl border-b border-white/10 p-4">
                    <div className="space-y-1">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => { onNavigate(item.id); setMobileMenuOpen(false); }}
                                className={`flex items-center gap-3 w-full text-left p-3 rounded-xl text-sm font-medium transition-all ${currentPage === item.id
                                    ? 'bg-gradient-to-r from-blue-500/20 to-violet-500/20 text-white'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <item.icon className="w-4 h-4" />
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>
                    <div className="pt-3 mt-3 border-t border-white/10">
                        <Button
                            className="w-full flex items-center justify-center gap-2"
                            onClick={() => { onNavigate('upload'); setMobileMenuOpen(false); }}
                        >
                            <Sparkles className="w-4 h-4" />
                            Start Forging
                        </Button>
                    </div>
                </div>
            )}
        </header>
    );
}
