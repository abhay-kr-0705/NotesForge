import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function Layout({ children, currentPage, onNavigate }) {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden font-sans selection:bg-primary/30 selection:text-white flex flex-col">
            {/* Animated Background Gradients */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-fuchsia-600/8 rounded-full blur-[100px]" />
            </div>

            {/* Subtle Grid Pattern */}
            <div
                className="fixed inset-0 pointer-events-none opacity-[0.01]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <Navbar currentPage={currentPage} onNavigate={onNavigate} />

            <main className="flex-1 container mx-auto px-4 pt-20 pb-6 relative z-10">
                {children}
            </main>

            <Footer onNavigate={onNavigate} />
        </div>
    );
}
