import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useTheme } from "../lib/ThemeContext";

import { CookieConsent } from "./CookieConsent";

export function Layout({ children, currentPage, onNavigate }) {
    const { isLight } = useTheme();

    return (
        <div className={`min-h-screen relative overflow-hidden font-sans flex flex-col ${isLight
            ? "bg-white selection:bg-slate-200 selection:text-slate-900"
            : "bg-background selection:bg-primary/30 selection:text-white"
            }`}>
            {/* Animated Background Gradients - Dark Mode Only */}
            {!isLight && (
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-fuchsia-600/8 rounded-full blur-[100px]" />
                </div>
            )}

            {/* Subtle Grid Pattern - Dark Mode Only */}
            {!isLight && (
                <div
                    className="fixed inset-0 pointer-events-none opacity-[0.01]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />
            )}

            <Navbar currentPage={currentPage} onNavigate={onNavigate} />

            <main className="flex-1 container mx-auto px-4 pt-20 pb-6 relative z-10">
                {children}
            </main>

            <Footer onNavigate={onNavigate} />
            <CookieConsent />
        </div>
    );
}

