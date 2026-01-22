import React from 'react';
import { ArrowLeft, FileText, Shield, RefreshCcw } from 'lucide-react';

export function TermsPage({ onBack }) {
    return (
        <div className="max-w-3xl mx-auto pt-4 space-y-6">
            <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
                <ArrowLeft className="w-4 h-4" />Back to Home
            </button>

            <div className="text-center space-y-2">
                <FileText className="w-10 h-10 text-violet-400 mx-auto" />
                <h1 className="text-2xl font-bold text-white">Terms & Conditions</h1>
                <p className="text-sm text-slate-400">Last updated: January 2026</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/50 border border-white/5 space-y-4 text-sm text-slate-300">
                <section>
                    <h2 className="text-white font-semibold mb-2">1. Acceptance of Terms</h2>
                    <p>By accessing and using NotesForge, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our service.</p>
                </section>

                <section>
                    <h2 className="text-white font-semibold mb-2">2. Service Description</h2>
                    <p>NotesForge is a free, browser-based tool that converts PDF documents into print-optimized formats. All processing occurs locally in your browser; no files are uploaded to our servers.</p>
                </section>

                <section>
                    <h2 className="text-white font-semibold mb-2">3. User Responsibilities</h2>
                    <p>You are responsible for ensuring you have the right to process the documents you upload. Do not use NotesForge for illegal purposes or to process copyrighted material without permission.</p>
                </section>

                <section>
                    <h2 className="text-white font-semibold mb-2">4. Disclaimer</h2>
                    <p>NotesForge is provided "as is" without warranties of any kind. We do not guarantee the accuracy or reliability of the output. Use at your own risk.</p>
                </section>

                <section>
                    <h2 className="text-white font-semibold mb-2">5. Limitation of Liability</h2>
                    <p>NotesForge and its developers shall not be liable for any damages arising from the use of this service.</p>
                </section>
            </div>
        </div>
    );
}

export function PrivacyPage({ onBack }) {
    return (
        <div className="max-w-3xl mx-auto pt-4 space-y-6">
            <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
                <ArrowLeft className="w-4 h-4" />Back to Home
            </button>

            <div className="text-center space-y-2">
                <Shield className="w-10 h-10 text-emerald-400 mx-auto" />
                <h1 className="text-2xl font-bold text-white">Privacy Policy</h1>
                <p className="text-sm text-slate-400">Last updated: January 2026</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/50 border border-white/5 space-y-4 text-sm text-slate-300">
                <section>
                    <h2 className="text-white font-semibold mb-2">1. No Data Collection</h2>
                    <p>NotesForge does not collect, store, or transmit any personal data or documents. All PDF processing happens entirely within your browser.</p>
                </section>

                <section>
                    <h2 className="text-white font-semibold mb-2">2. Local Processing</h2>
                    <p>Your files never leave your device. We use JavaScript-based PDF libraries (PDF.js, pdf-lib) that run locally in your browser.</p>
                </section>

                <section>
                    <h2 className="text-white font-semibold mb-2">3. No Cookies</h2>
                    <p>We do not use cookies or tracking technologies to monitor your activity.</p>
                </section>

                <section>
                    <h2 className="text-white font-semibold mb-2">4. Third-Party Services</h2>
                    <p>We may use Google Fonts for typography. No other third-party services are integrated that could access your documents.</p>
                </section>

                <section>
                    <h2 className="text-white font-semibold mb-2">5. Contact</h2>
                    <p>For privacy-related inquiries, contact us at: abhayk7481@gmail.com</p>
                </section>
            </div>
        </div>
    );
}

export function RefundPage({ onBack }) {
    return (
        <div className="max-w-3xl mx-auto pt-4 space-y-6">
            <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
                <ArrowLeft className="w-4 h-4" />Back to Home
            </button>

            <div className="text-center space-y-2">
                <RefreshCcw className="w-10 h-10 text-amber-400 mx-auto" />
                <h1 className="text-2xl font-bold text-white">Refund Policy</h1>
                <p className="text-sm text-slate-400">Last updated: January 2026</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/50 border border-white/5 space-y-4 text-sm text-slate-300">
                <section>
                    <h2 className="text-white font-semibold mb-2">Free Service</h2>
                    <p>NotesForge is a completely free service. There are no charges for using any of our features.</p>
                </section>

                <section>
                    <h2 className="text-white font-semibold mb-2">Voluntary Donations</h2>
                    <p>Any donations made to support NotesForge are voluntary and non-refundable. Donations help us maintain and improve the service for all users.</p>
                </section>

                <section>
                    <h2 className="text-white font-semibold mb-2">Exceptional Circumstances</h2>
                    <p>In case of accidental or duplicate donations, please contact us at abhayk7481@gmail.com within 7 days. We will review requests on a case-by-case basis.</p>
                </section>
            </div>
        </div>
    );
}
