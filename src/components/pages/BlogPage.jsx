import React from 'react';
import { ArrowLeft, BookOpen, Code, Cpu, Shield, Zap, FileText, Globe, Lock, Brain, Layers, Share2, Smartphone, WifiOff, Heart, Printer, UserX } from 'lucide-react';

export function BlogPage({ onBack }) {
    const articles = [
        {
            title: "The Technology Behind NotesForge",
            icon: Cpu,
            color: "violet",
            content: (
                <div className="space-y-4 text-slate-300">
                    <p>
                        NotesForge is built on a modern, client-side architecture that prioritizes privacy and performance.
                        Unlike traditional PDF tools that upload your files to a server, we use <strong>WebAssembly (WASM)</strong>
                        to run powerful PDF processing libraries directly in your browser.
                    </p>
                    <h4 className="text-white font-semibold mt-4">Key Technologies:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong className="text-violet-400">React & Tailwind CSS:</strong> For a fast, responsive, and beautiful user interface.
                        </li>
                        <li>
                            <strong className="text-violet-400">PDF-lib:</strong> A powerful library for modifying documents (splitting, merging, inverting colors) entirely in JavaScript.
                        </li>
                        <li>
                            <strong className="text-violet-400">PDF.js:</strong> The industry standard for rendering PDF pages for preview without external dependencies.
                        </li>
                        <li>
                            <strong className="text-violet-400">JSZip:</strong> For efficient file handling and compression when dealing with multiple documents.
                        </li>
                    </ul>
                    <p>
                        This stack ensures that your data never leaves your device — "The cloud is just someone else's computer,"
                        and we believe your study notes should stay on yours.
                    </p>
                </div>
            )
        },
        {
            title: "How Does the 'Invert Colors' Feature Work?",
            icon: Zap,
            color: "amber",
            content: (
                <div className="space-y-4 text-slate-300">
                    <p>
                        Many lecture slides use "Dark Mode" (dark background, light text) which looks great on screens but is terrible for printing.
                        It wastes ink and makes pages soggy and unreadable.
                    </p>
                    <p>
                        Our specialized <strong>Smart Invert algorithm</strong> doesn't just negative the image. It intelligently:
                    </p>
                    <ol className="list-decimal pl-5 space-y-2">
                        <li>Analyzes the background color of each slide.</li>
                        <li>If it's dark, it swaps it to white.</li>
                        <li>Then, it inverts the text color (white → black) to maintain readability.</li>
                        <li>Crucially, it attempts to <strong className="text-amber-400">preserve images and diagrams</strong> so they don't look like X-ray negatives.</li>
                    </ol>
                    <p>
                        This typically saves <strong>90% of ink/toner</strong> while making the notes much easier to annotate with a pen.
                    </p>
                </div>
            )
        },
        {
            title: "Is It Really 100% Free? How Do You Sustain It?",
            icon: Heart,
            color: "red",
            content: (
                <div className="space-y-4 text-slate-300">
                    <p>
                        Yes, NotesForge is 100% free. No hidden subscriptions, no "Pro" plans, no watermarks.
                    </p>
                    <p>
                        The project was born out of personal necessity. As students, we couldn't find a good tool for this, so we built one.
                        Since the processing happens on <em>your</em> device, our server costs are minimal (we just host the static website files).
                    </p>
                    <p>
                        We sustain the project through:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Occasional voluntary donations (Buy Me a Coffee).</li>
                        <li>Open-source contributions from the developer community.</li>
                        <li>Passion for helping fellow students succeed.</li>
                    </ul>
                </div>
            )
        },
        {
            title: "Why No Login Required?",
            icon: UserX,
            color: "blue",
            content: (
                <div className="space-y-4 text-slate-300">
                    <p>
                        Simple: <strong>We don't want your data.</strong>
                    </p>
                    <p>
                        Most sites ask for login to track users, send marketing emails, or sell data. Since NotesForge is privacy-first and client-side,
                        we have no need to store your email or file history.
                    </p>
                    <p>
                        You arrive, you process your notes, you leave. That's the way tools should be — instant and frictionless.
                    </p>
                </div>
            )
        },
        {
            title: "Tips for Better Note Printing",
            icon: Printer,
            color: "emerald",
            content: (
                <div className="space-y-4 text-slate-300">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong className="text-emerald-400">Use Grid Layout:</strong> Printing 1 slide per page is a waste. Use our 4-slide or 6-slide grid options to save paper.
                        </li>
                        <li>
                            <strong className="text-emerald-400">Remove Teacher Slides:</strong> Use our "Remove Teacher" feature to automatically detect and delete slides that are mostly images or have low text content (often just "Any Questions?").
                        </li>
                        <li>
                            <strong className="text-emerald-400">Grayscale Mode:</strong> Even if you invert colors, force your printer to use "Black & White" or "Draft" mode to save color cartridges.
                        </li>
                    </ul>
                </div>
            )
        },
        {
            title: "Can I use NotesForge on my phone?",
            icon: Smartphone,
            color: "pink",
            content: (
                <div className="space-y-4 text-slate-300">
                    <p>
                        Absolutely! NotesForge is fully responsive and works great on mobile browsers (Chrome, Safari, Firefox).
                    </p>
                    <p>
                        However, for complex editing like selecting specific pages or arranging grid layouts,
                        we recommend using a <strong>desktop or tablet</strong> for the best experience simply because of the larger screen real estate.
                    </p>
                </div>
            )
        },
        {
            title: "Do I need internet to use this?",
            icon: WifiOff,
            color: "slate",
            content: (
                <div className="space-y-4 text-slate-300">
                    <p>
                        You only need internet to load the website initially. Once loaded, NotesForge works <strong>offline</strong> thanks to Service Worker technology.
                    </p>
                    <p>
                        You can even handle massive files without a connection because the processing happens on your device's processor, not on a remote server.
                    </p>
                </div>
            )
        },
        {
            title: "Are there any file size limits?",
            icon: Layers,
            color: "indigo",
            content: (
                <div className="space-y-4 text-slate-300">
                    <p>
                        We don't enforce a hard limit like "10MB max". You can process files as large as your device's memory can handle.
                    </p>
                    <p>
                        We've successfully tested with PDFs over <strong>100MB+</strong> and decks with hundreds of slides.
                        If your device slows down, try processing fewer pages at a time.
                    </p>
                </div>
            )
        }
    ];



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

            {/* Hero */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs">
                    <BookOpen className="w-3 h-3" />
                    <span>Knowledge Base</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                    NotesForge{' '}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400">
                        Inside Out
                    </span>
                </h1>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    Deep dive into how NotesForge works, the technology stack, and tips for efficient studying.
                </p>

                {/* Search/Filter (Visual only for now) */}
                <div className="max-w-md mx-auto pt-4 opacity-70">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/50 border border-white/10 text-slate-400 text-sm">
                        <Brain className="w-4 h-4" />
                        <span>Searching for answers? Just scroll down!</span>
                    </div>
                </div>
            </div>

            {/* Articles Grid */}
            <div className="grid gap-8">
                {articles.map((article, index) => (
                    <article key={index} className="p-6 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-violet-500/20 transition-all hover:bg-slate-900/80">
                        <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-xl bg-${article.color}-500/10 border border-${article.color}-500/20 flex-shrink-0`}>
                                <article.icon className={`w-6 h-6 text-${article.color}-400`} />
                            </div>
                            <div className="space-y-3">
                                <h2 className="text-xl font-bold text-white leading-tight">
                                    {article.title}
                                </h2>
                                <div className="text-sm leading-relaxed">
                                    {article.content}
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {/* Footer Note */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-violet-900/20 to-cyan-900/20 border border-white/5">
                <Brain className="w-8 h-8 text-violet-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Still have questions?</h3>
                <p className="text-slate-400 text-sm mb-4">
                    We're always looking for new ideas and questions to answer.
                </p>
                <div className="flex justify-center gap-3">

                    <button
                        onClick={() => window.location.href = 'mailto:abhayk7481@gmail.com'}
                        className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors"
                    >
                        Email Us
                    </button>
                </div>
            </div>
        </div>
    );
}
