import React, { useState } from 'react';
import { ArrowLeft, Mail, MessageSquare, Send, CheckCircle, AlertCircle, Lightbulb, Bug, HelpCircle, Sparkles, Github, Linkedin } from 'lucide-react';
import { Button } from '../ui/Button';

export function ContactPage({ onBack }) {
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

                <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-emerald-900/30 to-teal-900/20 border border-emerald-500/30">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Email Client Opened!</h2>
                    <p className="text-slate-400 mb-6">
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
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
            </button>

            {/* Hero */}
            <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs">
                    <MessageSquare className="w-3 h-3" />
                    <span>Get in Touch</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Contact{' '}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400">
                        Us
                    </span>
                </h1>
                <p className="text-slate-400 max-w-md mx-auto text-sm">
                    Have feedback, feature requests, or found a bug? We'd love to hear from you!
                </p>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-slate-900/50 border border-white/5 space-y-5">
                {/* Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Your Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="John Doe"
                            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Your Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="john@example.com"
                            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors"
                        />
                    </div>
                </div>

                {/* Type Selection */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3">What's this about?</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {contactTypes.map((type) => (
                            <button
                                key={type.value}
                                type="button"
                                onClick={() => setFormData({ ...formData, type: type.value })}
                                className={`p-3 rounded-xl border text-center transition-all ${formData.type === type.value
                                    ? 'bg-violet-500/20 border-violet-500 text-violet-400'
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
                    <label className="block text-sm font-medium text-slate-300 mb-2">Your Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell us what's on your mind..."
                        className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors resize-none"
                    />
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500"
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
            <div className="text-center p-4 rounded-xl bg-slate-900/30 border border-white/5">
                <Sparkles className="w-5 h-5 text-amber-400 mx-auto mb-2" />
                <p className="text-sm text-slate-400">
                    We typically respond within <span className="text-white font-medium">24-48 hours</span>
                </p>
            </div>
        </div>
    );
}
