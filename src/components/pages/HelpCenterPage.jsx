import React, { useState } from 'react';
import { ArrowLeft, HelpCircle, FileText, Printer, Settings, Shield, ChevronDown, ChevronUp, Search, Sparkles, Upload, Edit, Download, Zap, MessageCircle } from 'lucide-react';

export function HelpCenterPage({ onBack }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [openCategory, setOpenCategory] = useState('getting-started');
    const [openFaq, setOpenFaq] = useState(null);

    const categories = [
        {
            id: 'getting-started',
            icon: Upload,
            title: 'Getting Started',
            color: 'violet',
            faqs: [
                {
                    q: "How do I upload a PDF?",
                    a: "Click the 'Process Your Notes' button on the homepage, then drag and drop your PDF file into the upload zone, or click to browse and select your file."
                },
                {
                    q: "What file types are supported?",
                    a: "Currently, NotesForge supports PDF files only. We're working on adding support for images and PowerPoint files in future updates."
                },
                {
                    q: "Is there a file size limit?",
                    a: "Since all processing happens locally in your browser, the only limit is your device's memory. For best performance, we recommend files under 50MB."
                },
                {
                    q: "Can I upload multiple PDFs at once?",
                    a: "Yes! After uploading your first PDF, click the '+ Add more PDFs' button to add additional files. All pages will be combined in the output."
                }
            ]
        },
        {
            id: 'editing',
            icon: Edit,
            title: 'Editing & Enhancement',
            color: 'fuchsia',
            faqs: [
                {
                    q: "How do I invert colors on specific areas?",
                    a: "In the page selection step, click the pencil icon on any page thumbnail. Use the Rectangle or Circle tool to select an area, choose 'Invert Colors' action, and draw on the area you want to invert."
                },
                {
                    q: "What does 'Clear PDF Background' do?",
                    a: "This feature detects the dominant background color and replaces it with white, while preserving all text and annotations. It's perfect for dark-themed slides."
                },
                {
                    q: "How does watermark removal work?",
                    a: "NotesForge analyzes color patterns to detect semi-transparent watermarks and logos. It then removes them while preserving the original content."
                },
                {
                    q: "What's the difference between Grayscale and Black & White?",
                    a: "Grayscale converts your document to shades of gray (smooth gradients). Black & White converts to pure black and white only (high contrast, best for text-heavy documents)."
                }
            ]
        },
        {
            id: 'layout',
            icon: Settings,
            title: 'Layout & Formatting',
            color: 'cyan',
            faqs: [
                {
                    q: "How do I fit multiple slides per page?",
                    a: "In the Settings panel, adjust the 'Rows' and 'Columns' values. For example, 3 rows × 2 columns = 6 slides per page."
                },
                {
                    q: "How do I change the orientation?",
                    a: "In the Layout section, select either 'Portrait' or 'Landscape'. The preview will update to show your selection."
                },
                {
                    q: "Can I adjust margins?",
                    a: "Yes! Use the 'Page Margin' and 'Cell Padding' sliders in the Layout section to control spacing."
                },
                {
                    q: "What do separation lines/borders do?",
                    a: "When enabled, a thin gray line is drawn around each slide cell, making it easier to cut or fold printed pages."
                }
            ]
        },
        {
            id: 'output',
            icon: Download,
            title: 'Output & Downloads',
            color: 'emerald',
            faqs: [
                {
                    q: "How do I preview before downloading?",
                    a: "After processing completes, click the 'Preview' button to open the PDF in a new browser tab before downloading."
                },
                {
                    q: "What quality settings should I use?",
                    a: "Use 'Low' for smaller files and faster processing, 'Medium' for balanced quality (recommended), or 'High' for best print quality."
                },
                {
                    q: "Why is my output file larger than expected?",
                    a: "Higher quality settings and more slides result in larger files. Try reducing quality to 'Medium' or 'Low' if file size is a concern."
                }
            ]
        },
        {
            id: 'privacy',
            icon: Shield,
            title: 'Privacy & Security',
            color: 'amber',
            faqs: [
                {
                    q: "Are my files uploaded to any server?",
                    a: "No! All processing happens locally in your browser using JavaScript. Your files never leave your device."
                },
                {
                    q: "Do you store any of my data?",
                    a: "We don't store any personal data or documents. NotesForge is completely privacy-focused."
                },
                {
                    q: "Is NotesForge safe to use?",
                    a: "Yes! We use industry-standard libraries (PDF.js, pdf-lib) and all code runs locally. No external servers are involved in processing."
                }
            ]
        }
    ];

    const colorClasses = {
        violet: { bg: 'bg-violet-500/20', text: 'text-violet-400', border: 'border-violet-500/30' },
        fuchsia: { bg: 'bg-fuchsia-500/20', text: 'text-fuchsia-400', border: 'border-fuchsia-500/30' },
        cyan: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' },
        emerald: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
        amber: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
    };

    const filteredCategories = categories.map(cat => ({
        ...cat,
        faqs: cat.faqs.filter(faq =>
            faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(cat => cat.faqs.length > 0 || !searchQuery);

    return (
        <div className="max-w-4xl mx-auto py-6 space-y-8">
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
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs">
                    <HelpCircle className="w-3 h-3" />
                    <span>Help Center</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                    How Can We{' '}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">
                        Help You?
                    </span>
                </h1>
                <p className="text-sm text-slate-400 max-w-md mx-auto">
                    Find answers to common questions about NotesForge
                </p>

                {/* Search */}
                <div className="relative max-w-md mx-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search for help..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                    />
                </div>
            </div>

            {/* Quick Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2">
                {categories.map((cat) => {
                    const colors = colorClasses[cat.color];
                    return (
                        <button
                            key={cat.id}
                            onClick={() => setOpenCategory(cat.id)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all ${openCategory === cat.id
                                    ? `${colors.bg} ${colors.text} ${colors.border} border`
                                    : 'bg-slate-900/50 text-slate-400 border border-white/5 hover:border-white/10'
                                }`}
                        >
                            <cat.icon className="w-3 h-3" />
                            {cat.title}
                        </button>
                    );
                })}
            </div>

            {/* FAQ Content */}
            <div className="space-y-4">
                {filteredCategories.map((category) => {
                    const colors = colorClasses[category.color];
                    const isOpen = openCategory === category.id || searchQuery;

                    if (!isOpen && !searchQuery) return null;

                    return (
                        <div key={category.id} className="space-y-2">
                            <h2 className={`text-sm font-medium ${colors.text} flex items-center gap-2`}>
                                <category.icon className="w-4 h-4" />
                                {category.title}
                            </h2>

                            <div className="space-y-1">
                                {category.faqs.map((faq, index) => {
                                    const faqId = `${category.id}-${index}`;
                                    return (
                                        <div
                                            key={index}
                                            className="rounded-lg bg-slate-900/50 border border-white/5 overflow-hidden"
                                        >
                                            <button
                                                onClick={() => setOpenFaq(openFaq === faqId ? null : faqId)}
                                                className="w-full flex items-center justify-between p-3 text-left"
                                            >
                                                <span className="text-sm text-white">{faq.q}</span>
                                                {openFaq === faqId ? (
                                                    <ChevronUp className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                                                ) : (
                                                    <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />
                                                )}
                                            </button>
                                            {openFaq === faqId && (
                                                <div className="px-3 pb-3">
                                                    <p className="text-xs text-slate-400 leading-relaxed">{faq.a}</p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Still Need Help */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-900/20 to-emerald-900/10 border border-cyan-500/20 text-center">
                <MessageCircle className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <h3 className="text-base font-semibold text-white mb-1">Still Need Help?</h3>
                <p className="text-xs text-slate-400 mb-3">Can't find what you're looking for?</p>
                <a
                    href="mailto:abhayk7481@gmail.com"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 text-white text-sm font-medium hover:bg-cyan-500 transition-colors"
                >
                    Contact Support
                </a>
            </div>
        </div>
    );
}
