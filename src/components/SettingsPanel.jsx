import React from 'react';
import { Grid, Layers, Moon, Sun, Type } from 'lucide-react';
import { cn } from '../lib/cn';

export function SettingsPanel({ settings, updateSettings }) {
    const gridOptions = [1, 2, 4, 6, 9];

    return (
        <div className="w-full lg:w-80 flex-shrink-0 space-y-6 rounded-xl border border-white/5 bg-surface/50 p-6 backdrop-blur-md h-fit">
            <div>
                <h3 className="text-lg font-semibold text-white mb-1">Layout Configuration</h3>
                <p className="text-xs text-slate-500">Customize how your slides appear.</p>
            </div>

            {/* Grid Layout Selection */}
            <div className="space-y-3">
                <label className="text-sm text-slate-400 flex items-center gap-2">
                    <Grid className="w-4 h-4" /> Slides per page
                </label>
                <div className="grid grid-cols-5 gap-2">
                    {gridOptions.map((num) => (
                        <button
                            key={num}
                            onClick={() => updateSettings('slidesPerPage', num)}
                            className={cn(
                                "flex items-center justify-center p-2 rounded-lg border text-sm font-medium transition-all duration-200",
                                settings.slidesPerPage === num
                                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105"
                                    : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white"
                            )}
                        >
                            {num}
                        </button>
                    ))}
                </div>
            </div>

            {/* Color Mode */}
            <div className="space-y-3">
                <label className="text-sm text-slate-400 flex items-center gap-2">
                    <Sun className="w-4 h-4" /> Color Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                    <button
                        onClick={() => updateSettings('invert', false)}
                        className={cn(
                            "p-3 rounded-lg border text-sm flex gap-2 items-center justify-center font-medium",
                            !settings.invert
                                ? "bg-white text-slate-900 border-white"
                                : "bg-slate-800 border-slate-700 text-slate-400"
                        )}
                    >
                        <Type className="w-4 h-4" /> Original
                    </button>
                    <button
                        onClick={() => updateSettings('invert', true)}
                        className={cn(
                            "p-3 rounded-lg border text-sm flex gap-2 items-center justify-center font-medium",
                            settings.invert
                                ? "bg-primary text-white border-primary"
                                : "bg-slate-800 border-slate-700 text-slate-400"
                        )}
                    >
                        <Moon className="w-4 h-4" /> Inverted
                    </button>
                </div>
                <p className="text-xs text-slate-500 bg-slate-900/50 p-2 rounded">
                    Inverted mode turns dark slides into white background for printing.
                </p>
            </div>

            {/* Other Toggles */}
            <div className="space-y-3 pt-4 border-t border-white/5">
                <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-sm text-slate-400 group-hover:text-white transition-colors">Show Borders</span>
                    <input
                        type="checkbox"
                        checked={settings.showBorders}
                        onChange={(e) => updateSettings('showBorders', e.target.checked)}
                        className="w-5 h-5 rounded border-slate-700 bg-slate-800 text-primary focus:ring-primary focus:ring-offset-slate-900"
                    />
                </label>
                <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-sm text-slate-400 group-hover:text-white transition-colors">Greyscale Text</span>
                    <input
                        type="checkbox"
                        checked={settings.greyscale}
                        onChange={(e) => updateSettings('greyscale', e.target.checked)}
                        className="w-5 h-5 rounded border-slate-700 bg-slate-800 text-primary focus:ring-primary focus:ring-offset-slate-900"
                    />
                </label>
            </div>
        </div>
    );
}
