import React, { useState } from 'react';
import { ArrowLeft, Heart, Gift, Sparkles, CheckCircle, Shield, Lock, Zap, Copy, Check, QrCode, Smartphone, ExternalLink, CreditCard, Globe, Rocket, Lightbulb, Users, Server } from 'lucide-react';
import { Button } from '../ui/Button';

export function SupportPage({ onBack }) {
    const [copied, setCopied] = useState(false);
    const upiId = 'NotesForge@ybl';

    const copyUPI = () => {
        navigator.clipboard.writeText(upiId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const openUPIApp = () => {
        const upiLink = `upi://pay?pa=${upiId}&pn=NotesForge&cu=INR`;
        window.location.href = upiLink;
    };

    const openRazorpay = () => {
        window.open('https://razorpay.me/@abhay07', '_blank');
    };

    const openPayPal = () => {
        window.open('https://paypal.me/abhayk7481', '_blank');
    };

    const supportBenefits = [
        { icon: Rocket, title: "Powerful New Features", desc: "AI enhancements & new tools" },
        { icon: Gift, title: "Always Free Forever", desc: "Zero-cost access for everyone" },
        { icon: Server, title: "Better Performance", desc: "Faster processing & quality" },
        { icon: Users, title: "Growing Community", desc: "Reaching more students" },
    ];

    const otherWays = [
        "Share NotesForge with friends, classmates, and colleagues",
        "Provide feedback and feature suggestions to help us improve",
        "Write a review or testimonial about your experience",
    ];

    return (
        <div className="max-w-3xl mx-auto pt-4 space-y-6 pb-8">
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
                <div className="relative inline-block">
                    <div className="absolute inset-0 bg-violet-500/30 rounded-full blur-xl animate-pulse" />
                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mx-auto shadow-lg shadow-violet-500/30">
                        <Heart className="w-8 h-8 text-white" />
                    </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Support{' '}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-purple-400">
                        NotesForge
                    </span>
                </h1>
                <p className="text-slate-400 max-w-md mx-auto">
                    Help us bring powerful new features and keep NotesForge free forever for everyone
                </p>
            </div>

            {/* Main Payment Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-600/30 via-purple-600/20 to-fuchsia-600/20 border border-violet-500/30 shadow-xl">
                <div className="text-center mb-5">
                    <h2 className="text-xl font-bold text-white mb-1">Support NotesForge</h2>
                    <p className="text-sm text-violet-200/70 italic">
                        Every contribution, no matter how small, makes a big difference
                    </p>
                </div>

                {/* UPI Section (India) */}
                <div className="p-5 rounded-xl bg-white/95 mb-4">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
                            <Smartphone className="w-4 h-4 text-violet-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800">Support via UPI (India)</h3>
                            <p className="text-xs text-slate-500">Scan QR or use UPI ID</p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-5 items-center">
                        {/* QR Code */}
                        <div className="flex-shrink-0 text-center">
                            <div className="p-3 bg-slate-50 rounded-xl border-2 border-dashed border-violet-200">
                                <img
                                    src="/upi-qr.png"
                                    alt="UPI QR Code"
                                    className="w-28 h-28 object-contain"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.parentElement.innerHTML = '<div class="w-28 h-28 bg-violet-50 rounded-lg flex items-center justify-center"><span class="text-xs text-violet-400">QR Code</span></div>';
                                    }}
                                />
                            </div>
                            <p className="text-xs text-slate-400 mt-2">Scan to Pay</p>
                        </div>

                        {/* UPI Details */}
                        <div className="flex-1 w-full space-y-3">
                            {/* UPI ID Box */}
                            <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-100 border border-slate-200">
                                <QrCode className="w-4 h-4 text-violet-500" />
                                <span className="flex-1 font-mono text-slate-700 font-medium">{upiId}</span>
                                <button
                                    onClick={copyUPI}
                                    className="p-2 rounded-lg bg-white hover:bg-slate-50 transition-colors border border-slate-200"
                                >
                                    {copied ? (
                                        <Check className="w-4 h-4 text-emerald-500" />
                                    ) : (
                                        <Copy className="w-4 h-4 text-slate-500" />
                                    )}
                                </button>
                            </div>

                            {/* Direct Pay Button */}
                            <Button
                                onClick={openUPIApp}
                                className="w-full gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white shadow-lg"
                            >
                                <Smartphone className="w-4 h-4" />
                                Open UPI App & Pay
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Other Payment Methods */}
                <div className="p-5 rounded-xl bg-white/95">
                    <h3 className="font-bold text-slate-800 mb-1 text-center">Other Payment Methods</h3>
                    <p className="text-xs text-slate-500 text-center mb-4">Choose your preferred payment platform</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {/* Razorpay Button */}
                        <button
                            onClick={openRazorpay}
                            className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-400 hover:to-violet-500 transition-all group shadow-lg"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                                    <CreditCard className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-left">
                                    <span className="font-bold text-white block">Razorpay</span>
                                    <span className="text-xs text-purple-100">UPI, Cards, Wallets</span>
                                </div>
                            </div>
                            <ExternalLink className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                        </button>

                        {/* PayPal Button */}
                        <button
                            onClick={openPayPal}
                            className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 transition-all group shadow-lg"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                                    <Globe className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-left">
                                    <span className="font-bold text-white block">PayPal</span>
                                    <span className="text-xs text-blue-100">International Users</span>
                                </div>
                            </div>
                            <ExternalLink className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Other Ways to Help */}
            <div className="p-5 rounded-xl bg-violet-500/10 border border-violet-500/20">
                <h3 className="font-bold text-white mb-3">Other Ways to Help</h3>
                <div className="space-y-2">
                    {otherWays.map((way, index) => (
                        <div key={index} className="flex items-start gap-3 p-2">
                            <div className="w-5 h-5 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <CheckCircle className="w-3 h-3 text-violet-400" />
                            </div>
                            <span className="text-sm text-slate-300">{way}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Why Your Support Matters */}
            <div className="p-5 rounded-xl bg-slate-900/50 border border-white/5">
                <h2 className="text-lg font-bold text-white mb-4 text-center">Why Your Support Matters</h2>
                <div className="grid grid-cols-2 gap-3">
                    {supportBenefits.map((benefit, index) => (
                        <div key={index} className="p-4 rounded-xl bg-slate-800/50 border border-white/5 hover:border-violet-500/30 transition-colors">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center mb-3">
                                <benefit.icon className="w-5 h-5 text-violet-400" />
                            </div>
                            <h4 className="font-semibold text-white text-sm mb-1">{benefit.title}</h4>
                            <p className="text-xs text-slate-400">{benefit.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 pt-3 border-t border-white/5 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    Free Forever
                </span>
                <span className="flex items-center gap-1">
                    <Lock className="w-3 h-3 text-emerald-500" />
                    No Login
                </span>
                <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3 text-emerald-500" />
                    No Watermarks
                </span>
                <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-emerald-500" />
                    Local Processing
                </span>
            </div>

            {/* Thank You */}
            <div className="text-center p-5 rounded-xl bg-gradient-to-br from-violet-900/30 to-purple-900/20 border border-violet-500/20">
                <Sparkles className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-white mb-1">Thank You!</h3>
                <p className="text-sm text-slate-400">
                    Your support means the world to us! Every contribution helps keep NotesForge free for students worldwide.
                </p>
            </div>
        </div>
    );
}
