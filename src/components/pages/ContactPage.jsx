import React, { useState } from 'react';
import { ArrowLeft, Mail, MessageSquare, Send, CheckCircle, AlertCircle, Lightbulb, Bug, HelpCircle, Sparkles, Github, Linkedin } from 'lucide-react';
import { Button } from '../ui/Button';
import { useTheme } from '../../lib/ThemeContext';

export function ContactPage({ onBack }) {
    const { isLight } = useTheme();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        type: 'feedback',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const contactTypes = [
        { value: 'feedback', label: 'General Feedback', icon: MessageSquare, color: 'violet' },
        { value: 'feature', label: 'Feature Request', icon: Lightbulb, color: 'amber' },
        { value: 'bug', label: 'Report a Bug', icon: Bug, color: 'red' },
        { value: 'help', label: 'Need Help', icon: HelpCircle, color: 'blue' },
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Create mailto link with form data
        const subject = encodeURIComponent(`[NotesForge ${formData.type}] ${formData.name}`);
        const body = encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\nType: ${formData.type}\n\nMessage:\n${formData.message}`
        );

        // Open email client
        window.location.href = `mailto:abhayk7481@gmail.com?subject=${subject}&body=${body}`;

        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 500);
    };

    if (submitted) {
        return (
            <div className="max-w-2xl mx-auto pt-4 pb-8">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm mb-8"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </button>

                <div className={`text-center p-8 rounded-2xl border ${isLight
                        ? "bg-emerald-50 border-emerald-100"
                        : "bg-gradient-to-br from-emerald-900/30 to-teal-900/20 border-emerald-500/30"
                    }`}>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isLight ? "bg-emerald-100" : "bg-emerald-500/20"
                        }`}>
                        <CheckCircle className={`w-8 h-8 ${isLight ? "text-emerald-600" : "text-emerald-400"}`} />
                    </div>
                    <h2 className={`text-2xl font-bold mb-2 ${isLight ? "text-slate-900" : "text-white"}`}>Email Client Opened!</h2>
                    <p className={`mb-6 ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                        Your email client should have opened with your message pre-filled.
                        Just hit send to reach us!
                    </p>
                    <Button onClick={() => setSubmitted(false)} variant="secondary">
                        Send Another Message
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto pt-4 space-y-6 pb-8">
            {/* Back Button */}
            <button
                onClick={onBack}
                className={`flex items-center gap-2 transition-colors text-sm ${isLight ? "text-gray-500 hover:text-gray-900" : "text-slate-400 hover:text-white"}`}
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
            </button>

            {/* Hero */}
            <div className="text-center space-y-3">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs ${isLight ? "bg-violet-50 border border-violet-200 text-violet-600" : "bg-violet-500/10 border border-violet-500/20 text-violet-400"}`}>
                    <MessageSquare className="w-3 h-3" />
                    <span>Get in Touch</span>
                </div>
                <h1 className={`text-3xl md:text-4xl font-bold ${isLight ? "text-gray-900" : "text-white"}`}>
                    Contact{' '}
                    <span className={`bg-clip-text text-transparent ${isLight ? "bg-gradient-to-r from-violet-600 to-cyan-500" : "bg-gradient-to-r from-violet-400 to-cyan-400"}`}>
                        Us
                    </span>
                </h1>
                <p className={`max-w-md mx-auto text-sm ${isLight ? "text-gray-600" : "text-slate-400"}`}>
                    Have feedback, feature requests, or found a bug? We'd love to hear from you!
                </p>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className={`p-6 rounded-2xl border space-y-5 ${isLight
                    ? "bg-white border-slate-200 shadow-sm"
                    : "bg-slate-900/50 border-white/5"
                }`}>
                {/* Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${isLight ? "text-slate-700" : "text-slate-300"}`}>Your Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="John Doe"
                            className={`w-full px-4 py-3 rounded-xl border transition-colors ${isLight
                                    ? "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-violet-500 focus:bg-white"
                                    : "bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-violet-500"
                                }`}
                        />
                    </div>
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${isLight ? "text-slate-700" : "text-slate-300"}`}>Your Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="john@example.com"
                            className={`w-full px-4 py-3 rounded-xl border transition-colors ${isLight
                                    ? "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-violet-500 focus:bg-white"
                                    : "bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-violet-500"
                                }`}
                        />
                    </div>
                </div>

                {/* Type Selection */}
                <div>
                    <label className={`block text-sm font-medium mb-3 ${isLight ? "text-slate-700" : "text-slate-300"}`}>What's this about?</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {contactTypes.map((type) => (
                            <button
                                key={type.value}
                                type="button"
                                onClick={() => setFormData({ ...formData, type: type.value })}
                                className={`p-3 rounded-xl border text-center transition-all ${formData.type === type.value
                                    ? isLight
                                        ? 'bg-violet-100 border-violet-200 text-violet-700'
                                        : 'bg-violet-500/20 border-violet-500 text-violet-400'
                                    : isLight
                                        ? 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-100'
                                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                                    }`}
                            >
                                <type.icon className="w-5 h-5 mx-auto mb-1" />
                                <span className="text-xs font-medium">{type.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Message */}
                <div>
                    <label className={`block text-sm font-medium mb-2 ${isLight ? "text-slate-700" : "text-slate-300"}`}>Your Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell us what's on your mind..."
                        className={`w-full px-4 py-3 rounded-xl border transition-colors resize-none ${isLight
                                ? "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-violet-500 focus:bg-white"
                                : "bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-violet-500"
                            }`}
                    />
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={loading}
                    className={`w-full gap-2 ${isLight
                            ? "bg-violet-600 hover:bg-violet-700 text-white shadow-md"
                            : "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500"
                        }`}
                >
                    {loading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Opening Email...
                        </>
                    ) : (
                        <>
                            <Send className="w-4 h-4" />
                            Send Message
                        </>
                    )}
                </Button>

                <p className="text-xs text-slate-500 text-center">
                    This will open your email client with the message pre-filled.
                </p>
            </form>



            {/* Response Time */}
            {/* Response Time */}
            <div className={`text-center p-4 rounded-xl border ${isLight
                    ? "bg-slate-50 border-slate-200"
                    : "bg-slate-900/30 border-white/5"
                }`}>
                <Sparkles className={`w-5 h-5 mx-auto mb-2 ${isLight ? "text-amber-500" : "text-amber-400"}`} />
                <p className={`text-sm ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                    We typically respond within <span className={`font-medium ${isLight ? "text-slate-900" : "text-white"}`}>24-48 hours</span>
                </p>
            </div>
        </div>
    );
}
