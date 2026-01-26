import React from 'react';
import { Grid, Moon, Sun, Type, Droplets, Image, Gauge, FileText, Columns, Rows, Maximize, Hash, SeparatorHorizontal, CheckCircle, Eraser, Contrast, Palette, SlidersHorizontal, UserX } from 'lucide-react';
import { cn } from '../lib/cn';
import { Button } from './ui/Button';
import { useTheme } from '../lib/ThemeContext';

export function EnhancedSettingsPanel({ settings, updateSettings, fileInfo, onBack, onProcess, processing }) {
    const { isLight } = useTheme();
    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* File Info Card */}
            {fileInfo && (
                <div className={`flex items-center justify-between p-4 rounded-xl border ${isLight
                        ? "bg-white border-slate-200 shadow-sm"
                        : "bg-slate-900/50 border-white/5"
                    }`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${isLight ? "bg-violet-50 text-violet-600" : "bg-violet-500/20"}`}>
                            <FileText className={`w-6 h-6 ${isLight ? "text-violet-600" : "text-violet-400"}`} />
                        </div>
                        <div>
                            <h3 className={`font-medium ${isLight ? "text-slate-900" : "text-white"}`}>{fileInfo.name}</h3>
                            <div className={`flex gap-4 text-sm ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                                <span>Size: <span className="text-violet-400">{(fileInfo.size / 1024).toFixed(2)} KB</span></span>
                                <span>Pages: <span className="text-violet-400">{fileInfo.pageCount}</span></span>
                                <span>Excluded: <span className="text-red-400">{fileInfo.excludedCount || 0}</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: Enhancement */}
                <div className={`space-y-6 p-6 rounded-2xl border backdrop-blur-sm ${isLight
                        ? "bg-white border-slate-200 shadow-sm"
                        : "bg-slate-900/50 border-white/5"
                    }`}>
                    <div>
                        <h3 className={`text-lg font-semibold flex items-center gap-2 ${isLight ? "text-slate-900" : "text-white"}`}>
                            <Droplets className="w-5 h-5 text-violet-400" />
                            Enhancement
                        </h3>
                        <p className={`text-xs mt-1 ${isLight ? "text-slate-500" : "text-slate-500"}`}>Apply image processing filters</p>
                    </div>

                    {/* Filters Section */}
                    <div className="space-y-3">
                        <h4 className="text-sm text-slate-400 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                            Color Filters
                        </h4>

                        {/* Invert Colors */}
                        <SettingToggle
                            label="Smart Invert Colors"
                            description="Dark to white background conversion"
                            checked={settings.invert}
                            onChange={(v) => updateSettings('invert', v)}
                        />

                        {/* Clear PDF Background */}
                        <SettingToggle
                            label="Clear PDF Background"
                            description="Remove background noise, make dark areas white"
                            checked={settings.clearBackground}
                            onChange={(v) => updateSettings('clearBackground', v)}
                        />

                        {/* Grayscale */}
                        <SettingToggle
                            label="Grayscale"
                            description="Convert to shades of gray"
                            checked={settings.greyscale}
                            onChange={(v) => updateSettings('greyscale', v)}
                        />

                        {/* Black & White */}
                        <SettingToggle
                            label="Black & White"
                            description="Pure black and white (high contrast)"
                            checked={settings.blackAndWhite}
                            onChange={(v) => updateSettings('blackAndWhite', v)}
                        />
                    </div>

                    {/* Remove Logo */}
                    <div className="space-y-3 pt-4 border-t border-white/5">
                        <h4 className="text-sm text-slate-400 flex items-center gap-2">
                            <Eraser className="w-4 h-4" />
                            Logo Removal
                        </h4>
                        <SettingToggle
                            label="Remove Logo"
                            description="Remove logos from corners of slides"
                            checked={settings.removeLogo}
                            onChange={(v) => updateSettings('removeLogo', v)}
                        />
                    </div>

                    {/* Remove Teacher (AI-Powered) */}
                    <div className="space-y-3 pt-4 border-t border-white/5">
                        <h4 className="text-sm text-slate-400 flex items-center gap-2">
                            <UserX className="w-4 h-4" />
                            AI Teacher Removal
                            <span className="px-1.5 py-0.5 text-[10px] bg-emerald-500/20 text-emerald-400 rounded-full">NEW</span>
                        </h4>
                        <SettingToggle
                            label="Remove Teacher/Person"
                            description="Auto-detect and remove person from slides (for images only)"
                            checked={settings.removeTeacher}
                            onChange={(v) => updateSettings('removeTeacher', v)}
                        />
                        {settings.removeTeacher && (
                            <p className="text-xs text-amber-400/80 bg-amber-500/10 rounded-lg p-2">
                                ⚠️ AI model will be downloaded (~2MB) on first use. Processing may take longer.
                            </p>
                        )}
                    </div>

                    {/* Output Quality */}
                    <div className={`space-y-3 pt-4 border-t ${isLight ? "border-slate-100" : "border-white/5"}`}>
                        <h4 className="text-sm text-slate-400 flex items-center gap-2">
                            <Gauge className="w-4 h-4" />
                            Output Quality
                        </h4>
                        <div className="grid grid-cols-3 gap-2">
                            {['low', 'medium', 'high'].map((quality) => (
                                <button
                                    key={quality}
                                    onClick={() => updateSettings('quality', quality)}
                                    className={cn(
                                        "p-3 rounded-lg border text-sm capitalize font-medium transition-all",
                                        settings.quality === quality
                                            ? "bg-violet-600 border-violet-600 text-white"
                                            : isLight
                                                ? "bg-slate-50 border-slate-200 text-slate-600 hover:border-violet-500/50"
                                                : "bg-slate-800 border-slate-700 text-slate-400 hover:border-violet-500/50"
                                    )}
                                >
                                    {quality}
                                </button>
                            ))}
                        </div>
                        <p className="text-xs text-slate-500">
                            {settings.quality === 'low' && '⚡ Smaller file size, faster processing'}
                            {settings.quality === 'medium' && '⚖️ Balanced quality and file size'}
                            {settings.quality === 'high' && '✨ Best quality, larger file size'}
                        </p>
                    </div>
                </div>

                {/* Right Column: Layout */}
                <div className={`space-y-6 p-6 rounded-2xl border backdrop-blur-sm ${isLight
                        ? "bg-white border-slate-200 shadow-sm"
                        : "bg-slate-900/50 border-white/5"
                    }`}>
                    <div>
                        <h3 className={`text-lg font-semibold flex items-center gap-2 ${isLight ? "text-slate-900" : "text-white"}`}>
                            <Grid className="w-5 h-5 text-cyan-400" />
                            Layout
                        </h3>
                        <p className={`text-xs mt-1 ${isLight ? "text-slate-500" : "text-slate-500"}`}>Arrange your document pages</p>
                    </div>

                    {/* Document Size */}
                    <div className="space-y-3">
                        <h4 className="text-sm text-slate-400">Document Size</h4>
                        <div className="grid grid-cols-2 gap-2">
                            {['original', 'A4'].map((size) => (
                                <button
                                    key={size}
                                    onClick={() => updateSettings('documentSize', size)}
                                    className={cn(
                                        "p-3 rounded-lg border text-sm font-medium transition-all",
                                        settings.documentSize === size
                                            ? "bg-violet-600 border-violet-600 text-white"
                                            : isLight
                                                ? "bg-slate-50 border-slate-200 text-slate-600 hover:border-violet-500/50"
                                                : "bg-slate-800 border-slate-700 text-slate-400 hover:border-violet-500/50"
                                    )}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Orientation */}
                    <div className="space-y-3">
                        <h4 className="text-sm text-slate-400">Orientation</h4>
                        <div className="grid grid-cols-2 gap-2">
                            {['portrait', 'landscape'].map((orient) => (
                                <button
                                    key={orient}
                                    onClick={() => updateSettings('orientation', orient)}
                                    className={cn(
                                        "p-3 rounded-lg border text-sm font-medium capitalize transition-all flex items-center justify-center gap-2",
                                        settings.orientation === orient
                                            ? "bg-violet-600 border-violet-600 text-white"
                                            : isLight
                                                ? "bg-slate-50 border-slate-200 text-slate-600 hover:border-violet-500/50"
                                                : "bg-slate-800 border-slate-700 text-slate-400 hover:border-violet-500/50"
                                    )}
                                >
                                    <div className={cn(
                                        "border border-current rounded-sm",
                                        orient === 'portrait' ? 'w-3 h-4' : 'w-4 h-3'
                                    )} />
                                    {orient}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Slides Per Page */}
                    <div className="space-y-3">
                        <h4 className="text-sm text-slate-400">Slides per Page</h4>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="text-xs text-slate-500">Rows</label>
                                <select
                                    value={settings.rows}
                                    onChange={(e) => updateSettings('rows', parseInt(e.target.value))}
                                    className={`w-full mt-1 p-3 rounded-lg border focus:border-violet-500 focus:outline-none ${isLight
                                            ? "bg-slate-50 border-slate-200 text-slate-900"
                                            : "bg-slate-800 border-slate-700 text-white"
                                        }`}
                                >
                                    {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-xs text-slate-500">Columns</label>
                                <select
                                    value={settings.cols}
                                    onChange={(e) => updateSettings('cols', parseInt(e.target.value))}
                                    className={`w-full mt-1 p-3 rounded-lg border focus:border-violet-500 focus:outline-none ${isLight
                                            ? "bg-slate-50 border-slate-200 text-slate-900"
                                            : "bg-slate-800 border-slate-700 text-white"
                                        }`}
                                >
                                    {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Margin Control */}
                    <div className="space-y-3">
                        <h4 className="text-sm text-slate-400 flex items-center gap-2">
                            <SlidersHorizontal className="w-4 h-4" />
                            Margins & Spacing
                        </h4>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-500">Page Margin</span>
                                <span className="text-violet-400">{settings.margin || 20}px</span>
                            </div>
                            <input
                                type="range"
                                min="5"
                                max="50"
                                value={settings.margin || 20}
                                onChange={(e) => updateSettings('margin', parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-500">Cell Padding</span>
                                <span className="text-violet-400">{settings.cellPadding || 5}px</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="20"
                                value={settings.cellPadding || 5}
                                onChange={(e) => updateSettings('cellPadding', parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-500"
                            />
                        </div>
                    </div>

                    {/* Separation Lines */}
                    <div className="space-y-3">
                        <h4 className="text-sm text-slate-400 flex items-center gap-2">
                            <SeparatorHorizontal className="w-4 h-4" />
                            Additional Options
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                            <OptionButton
                                label="Borders"
                                active={settings.showBorders}
                                onClick={() => updateSettings('showBorders', !settings.showBorders)}
                            />
                            <OptionButton
                                label="Page Numbers"
                                active={settings.addPageNumbers}
                                onClick={() => updateSettings('addPageNumbers', !settings.addPageNumbers)}
                            />
                        </div>
                    </div>

                    {/* Dynamic Layout Preview */}
                    <div className="space-y-3 pt-4 border-t border-white/5">
                        <h4 className="text-sm text-slate-400">Layout Preview</h4>
                        <div className="flex items-center gap-6">
                            {/* Preview Box */}
                            <div
                                className={cn(
                                    "rounded-lg border flex flex-col gap-0.5 overflow-hidden transition-all duration-300",
                                    settings.orientation === 'portrait' ? 'w-20 h-28' : 'w-28 h-20',
                                    isLight ? "bg-slate-200 border-slate-300" : "bg-slate-800 border-slate-700"
                                )}
                                style={{ padding: `${(settings.margin || 20) / 5}px` }}
                            >
                                {Array.from({ length: settings.rows }).map((_, r) => (
                                    <div key={r} className="flex-1 flex gap-0.5">
                                        {Array.from({ length: settings.cols }).map((_, c) => (
                                            <div
                                                key={c}
                                                className={cn(
                                                    "flex-1 rounded-sm transition-all",
                                                    isLight ? "bg-white" : "bg-violet-500/30",
                                                    settings.showBorders && (isLight ? "border border-slate-900/10" : "border border-violet-500/50")
                                                )}
                                                style={{ margin: `${(settings.cellPadding || 5) / 5}px` }}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>

                            {/* Info */}
                            <div className="text-right">
                                <div className="text-3xl font-bold text-violet-400">{settings.rows * settings.cols}</div>
                                <div className="text-xs text-slate-500">
                                    {settings.rows}×{settings.cols} slides per page
                                </div>
                                <div className="text-xs text-slate-600 mt-1">
                                    {settings.orientation === 'portrait' ? 'Portrait' : 'Landscape'} • {settings.documentSize || 'A4'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4">
                <button
                    onClick={onBack}
                    className={`transition-colors ${isLight ? "text-slate-500 hover:text-slate-900" : "text-slate-400 hover:text-white"}`}
                >
                    ← Back
                </button>
                <Button
                    size="lg"
                    onClick={onProcess}
                    disabled={processing}
                    className="px-8 gap-2"
                >
                    {processing ? (
                        <>Processing...</>
                    ) : (
                        <>
                            <CheckCircle className="w-5 h-5" />
                            Process File
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}

// Toggle Switch Component
function SettingToggle({ label, description, checked, onChange }) {
    const { isLight } = useTheme();
    return (
        <label className={`flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer group ${isLight
                ? "bg-slate-50 border-slate-200 hover:border-violet-500/50"
                : "bg-slate-800/50 border-slate-700 hover:border-violet-500/50"
            }`}>
            <div>
                <span className={`transition-colors ${isLight ? "text-slate-900 group-hover:text-violet-600" : "text-white group-hover:text-violet-300"}`}>{label}</span>
                {description && <p className="text-xs text-slate-500">{description}</p>}
            </div>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onChange(!checked);
                }}
                className={cn(
                    "relative w-12 h-6 rounded-full transition-colors duration-300",
                    checked ? "bg-violet-600" : (isLight ? "bg-slate-300" : "bg-slate-700")
                )}
            >
                <div
                    className={cn(
                        "absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300",
                        checked ? "left-7" : "left-1"
                    )}
                />
            </button>
        </label>
    );
}

// Option Button
function OptionButton({ label, active, onClick }) {
    const { isLight } = useTheme();
    return (
        <button
            onClick={onClick}
            className={cn(
                "p-3 rounded-lg border text-sm font-medium transition-all",
                active
                    ? "bg-violet-600 border-violet-600 text-white"
                    : isLight
                        ? "bg-slate-50 border-slate-200 text-slate-600 hover:border-violet-500/50"
                        : "bg-slate-800 border-slate-700 text-slate-400 hover:border-violet-500/50"
            )}
        >
            {label}
        </button>
    );
}
