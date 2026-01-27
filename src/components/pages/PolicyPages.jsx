import React from 'react';
import { ArrowLeft, FileText, Shield, RefreshCcw } from 'lucide-react';
import { useTheme } from '../../lib/ThemeContext';

export function TermsPage({ onBack }) {
    const { isLight } = useTheme();
    return (
        <div className="max-w-3xl mx-auto pt-4 space-y-6">
            <button
                onClick={onBack}
                className={`flex items-center gap-2 transition-colors text-sm ${isLight ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white'}`}
            >
                <ArrowLeft className="w-4 h-4" />Back to Home
            </button>

            <div className="text-center space-y-2">
                <FileText className={`w-10 h-10 mx-auto ${isLight ? 'text-violet-600' : 'text-violet-400'}`} />
                <h1 className={`text-2xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Terms & Conditions</h1>
                <p className={`text-sm ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Last updated: January 2026</p>
            </div>

            <div className={`p-5 rounded-xl border space-y-4 text-sm ${isLight ? 'bg-white border-slate-200 text-slate-600' : 'bg-slate-900/50 border-white/5 text-slate-300'}`}>
                <section>
                    <h2 className={`font-semibold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>1. Acceptance of Terms</h2>
                    <p>By accessing and using NotesForge, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our service.</p>
                </section>

                <section>
                    <h2 className={`font-semibold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>2. Service Description</h2>
                    <p>NotesForge is a free, browser-based tool that converts PDF documents into print-optimized formats. All processing occurs locally in your browser; no files are uploaded to our servers.</p>
                </section>

                <section>
                    <h2 className={`font-semibold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>3. User Responsibilities</h2>
                    <p>You are responsible for ensuring you have the right to process the documents you upload. Do not use NotesForge for illegal purposes or to process copyrighted material without permission.</p>
                </section>

                <section>
                    <h2 className={`font-semibold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>4. Disclaimer</h2>
                    <p>NotesForge is provided "as is" without warranties of any kind. We do not guarantee the accuracy or reliability of the output. Use at your own risk.</p>
                </section>

                <section>
                    <h2 className={`font-semibold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>5. Limitation of Liability</h2>
                    <p>NotesForge and its developers shall not be liable for any damages arising from the use of this service.</p>
                </section>
            </div>
        </div>
    );
}

export function PrivacyPage({ onBack }) {
    const { isLight } = useTheme();
    return (
        <div className="max-w-3xl mx-auto pt-4 space-y-6">
            <button
                onClick={onBack}
                className={`flex items-center gap-2 transition-colors text-sm ${isLight ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white'}`}
            >
                <ArrowLeft className="w-4 h-4" />Back to Home
            </button>

            <div className="text-center space-y-2">
                <Shield className={`w-10 h-10 mx-auto ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
                <h1 className={`text-2xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Privacy Policy</h1>
                <p className={`text-sm ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Last updated: January 2026</p>
            </div>

            <div className={`p-5 rounded-xl border space-y-4 text-sm ${isLight ? 'bg-white border-slate-200 text-slate-600' : 'bg-slate-900/50 border-white/5 text-slate-300'}`}>
                <section>
                    <h2 className={`font-semibold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>1. No Data Collection</h2>
                    <p>NotesForge does not collect, store, or transmit any personal data or documents. All PDF processing happens entirely within your browser.</p>
                </section>

                <section>
                    <h2 className={`font-semibold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>2. Local Processing</h2>
                    <p>Your files never leave your device. We use JavaScript-based PDF libraries (PDF.js, pdf-lib) that run locally in your browser.</p>
                </section>

                <section>
                    <h2 className={`font-semibold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>3. No Cookies</h2>
                    <p>We do not use cookies or tracking technologies to monitor your activity.</p>
                </section>

                <section>
                    <h2 className={`font-semibold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>4. Third-Party Services</h2>
                    <p>We may use Google Fonts for typography. No other third-party services are integrated that could access your documents.</p>
                </section>

                <section>
                    <h2 className={`font-semibold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>5. Contact</h2>
                    <p>For privacy-related inquiries, contact us at: abhayk7481@gmail.com</p>
                </section>
            </div>
        </div>
    );
}

export function RefundPage({ onBack }) {
    const { isLight } = useTheme();
    return (
        <div className="max-w-3xl mx-auto pt-4 space-y-6">
            <button
                onClick={onBack}
                className={`flex items-center gap-2 transition-colors text-sm ${isLight ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white'}`}
            >
                <ArrowLeft className="w-4 h-4" />Back to Home
            </button>

            <div className="text-center space-y-2">
                <RefreshCcw className={`w-10 h-10 mx-auto ${isLight ? 'text-amber-600' : 'text-amber-400'}`} />
                <h1 className={`text-2xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Refund Policy</h1>
                <p className={`text-sm ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Last updated: January 2026</p>
            </div>

            <div className={`p-5 rounded-xl border space-y-4 text-sm ${isLight ? 'bg-white border-slate-200 text-slate-600' : 'bg-slate-900/50 border-white/5 text-slate-300'}`}>
                <section>
                    <h2 className={`font-semibold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>Free Service</h2>
                    <p>NotesForge is a completely free service. There are no charges for using any of our features.</p>
                </section>

                <section>
                    <h2 className={`font-semibold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>Voluntary Donations</h2>
                    <p>Any donations made to support NotesForge are voluntary and non-refundable. Donations help us maintain and improve the service for all users.</p>
                </section>

                <section>
                    <h2 className={`font-semibold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>Exceptional Circumstances</h2>
                    <p>In case of accidental or duplicate donations, please contact us at abhayk7481@gmail.com within 7 days. We will review requests on a case-by-case basis.</p>
                </section>
            </div>
        </div>
    );
}
