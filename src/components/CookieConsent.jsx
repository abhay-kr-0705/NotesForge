import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import { useTheme } from '../lib/ThemeContext';

export function CookieConsent({ onAccept, onDecline }) {
    const [isVisible, setIsVisible] = useState(false);
    const { isLight } = useTheme();

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            // Show after a short delay
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'accepted');
        setIsVisible(false);
        if (onAccept) onAccept();
    };

    const handleDecline = () => {
        localStorage.setItem('cookie_consent', 'declined');
        setIsVisible(false);
        if (onDecline) onDecline();
    };

    if (!isVisible) return null;

    return (
        <div className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 p-5 rounded-2xl border shadow-2xl z-50 transition-all duration-300 transform translate-y-0 ${isLight
            ? "bg-white border-slate-200"
            : "bg-slate-900 border-white/10"
            }`}>
            <div className="flex items-start gap-4">
                <div className={`p-2 rounded-xl flex-shrink-0 ${isLight ? "bg-violet-100 text-violet-600" : "bg-violet-500/20 text-violet-400"
                    }`}>
                    <Cookie className="w-6 h-6" />
                </div>
                <div className="flex-1">
                    <h3 className={`font-bold mb-1 ${isLight ? "text-slate-900" : "text-white"}`}>
                        We use cookies
                    </h3>
                    <p className={`text-xs mb-4 leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                        We use cookies to improve your experience.
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={handleAccept}
                            className={`flex-1 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${isLight
                                ? "bg-violet-600 hover:bg-violet-700 text-white"
                                : "bg-violet-600 hover:bg-violet-500 text-white"
                                }`}
                        >
                            Accept
                        </button>
                        <button
                            onClick={handleDecline}
                            className={`flex-1 px-4 py-2 rounded-lg text-xs font-bold border transition-colors ${isLight
                                ? "border-slate-200 text-slate-600 hover:bg-slate-50"
                                : "border-white/10 text-slate-400 hover:bg-white/5"
                                }`}
                        >
                            Decline
                        </button>
                    </div>
                </div>
                <button
                    onClick={() => setIsVisible(false)}
                    className={`p-1 rounded-lg transition-colors ${isLight ? "hover:bg-slate-100 text-slate-400" : "hover:bg-white/5 text-slate-500"
                        }`}
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
