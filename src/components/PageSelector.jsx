import React, { useState } from 'react';
import { Check, Pencil, Trash2, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/Button';
import { PageEditor } from './PageEditor';
import { cn } from '../lib/cn';
import { useTheme } from '../lib/ThemeContext';

import { UploadCloud, FileText, Image, Presentation } from 'lucide-react';

export function PageSelector({
    pages,
    selectedPages,
    onSelectionChange,
    onPageEdit,
    onContinue,
    onBack,
    onReorder,
    onAddPdfs,
    onAddImages,
    onAddPptx
}) {
    const { isLight } = useTheme();
    const [hoveredPage, setHoveredPage] = useState(null);
    const [editingPage, setEditingPage] = useState(null);
    const [draggedPageId, setDraggedPageId] = useState(null);

    const handleDragStart = (e, pageId) => {
        setDraggedPageId(pageId);
        e.dataTransfer.effectAllowed = 'move';
        // Set transparent drag image or basic ghost
    };

    const handleDragOver = (e, targetPageId) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e, targetPageId) => {
        e.preventDefault();
        if (draggedPageId && draggedPageId !== targetPageId) {
            onReorder?.(draggedPageId, targetPageId);
        }
        setDraggedPageId(null);
    };

    const togglePage = (pageId) => {
        if (selectedPages.includes(pageId)) {
            onSelectionChange(selectedPages.filter(id => id !== pageId));
        } else {
            onSelectionChange([...selectedPages, pageId].sort((a, b) => a - b));
        }
    };

    const selectAll = () => {
        onSelectionChange(pages.map(p => p.id));
    };

    const deselectAll = () => {
        onSelectionChange([]);
    };

    const handleEditClick = (e, page) => {
        e.stopPropagation();
        setEditingPage(page);
    };

    const handleSaveEdit = (editedPage) => {
        onPageEdit(editedPage);
        setEditingPage(null);
    };

    return (
        <>
            <div className="space-y-6">
                {/* Tip Banner */}
                <div className={`flex items-start gap-3 p-4 rounded-xl border ${isLight
                    ? "bg-amber-50 border-amber-200"
                    : "bg-amber-500/10 border-amber-500/20"
                    }`}>
                    <span className="text-xl">💡</span>
                    <div>
                        <span className="text-amber-500 font-medium">Tip: </span>
                        <span className={isLight ? "text-slate-600" : "text-slate-300"}>Click the pencil icon to edit individual pages. Deselect pages to remove them from the final document.</span>
                    </div>
                </div>

                {/* Selection Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className={`font-semibold ${isLight ? "text-slate-900" : "text-white"}`}>{selectedPages.length} of {pages.length}</span>
                        <span className="text-slate-500">pages selected</span>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="secondary" size="sm" onClick={selectAll}>
                            Select All
                        </Button>
                        <Button variant="secondary" size="sm" onClick={deselectAll}>
                            Deselect All
                        </Button>
                    </div>
                </div>

                {/* Page Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 max-h-[50vh] overflow-y-auto p-2 scrollbar-thin">
                    {pages.map((page, index) => {
                        const isSelected = selectedPages.includes(page.id);
                        return (
                            <div
                                key={page.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, page.id)}
                                onDragOver={(e) => handleDragOver(e, page.id)}
                                onDrop={(e) => handleDrop(e, page.id)}
                                className={cn(
                                    "relative group rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-2",
                                    isSelected
                                        ? "border-violet-500 shadow-lg shadow-violet-500/20"
                                        : isLight
                                            ? "border-slate-200 opacity-60 hover:opacity-100 hover:border-slate-300"
                                            : "border-slate-700 opacity-50 hover:opacity-80",
                                    draggedPageId === page.id && "opacity-20 border-dashed"
                                )}
                                onClick={() => togglePage(page.id)}
                                onMouseEnter={() => setHoveredPage(page.id)}
                                onMouseLeave={() => setHoveredPage(null)}
                            >
                                {/* Thumbnail */}
                                <img
                                    src={page.thumbnail}
                                    alt={`Page ${page.id}`}
                                    className="w-full h-auto"
                                />

                                {/* Edit Icon */}
                                <button
                                    onClick={(e) => handleEditClick(e, page)}
                                    className={cn(
                                        "absolute top-2 left-2 w-7 h-7 rounded-full flex items-center justify-center transition-all",
                                        "bg-violet-500 text-white opacity-0 group-hover:opacity-100 hover:bg-violet-400 hover:scale-110"
                                    )}
                                >
                                    <Pencil className="w-3.5 h-3.5" />
                                </button>

                                {/* Selection Indicator */}
                                <div className={cn(
                                    "absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center transition-all",
                                    isSelected ? "bg-violet-500" : "bg-slate-800/80 border border-slate-600"
                                )}>
                                    {isSelected && <Check className="w-4 h-4 text-white" />}
                                </div>

                                {/* Page Number */}
                                <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs font-medium text-white">
                                    {page.id}
                                </div>

                                {/* Reorder Controls (Mobile/Assessment) */}
                                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-20">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (index > 0) onReorder?.(page.id, pages[index - 1].id);
                                        }}
                                        disabled={index === 0}
                                        className="p-1 rounded-full bg-black/50 text-white hover:bg-violet-500 disabled:opacity-30 disabled:hover:bg-black/50"
                                        title="Move Backward"
                                    >
                                        <ChevronLeft className="w-3 h-3" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (index < pages.length - 1) onReorder?.(page.id, pages[index + 1].id);
                                        }}
                                        disabled={index === pages.length - 1}
                                        className="p-1 rounded-full bg-black/50 text-white hover:bg-violet-500 disabled:opacity-30 disabled:hover:bg-black/50"
                                        title="Move Forward"
                                    >
                                        <ChevronRight className="w-3 h-3" />
                                    </button>
                                </div>

                                {/* Edited Badge */}
                                {page.edited && (
                                    <div className="absolute bottom-8 left-2 bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-medium border border-emerald-500/30">
                                        Edited
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Add More Content Buttons */}
                <div className={`flex flex-wrap items-center justify-center gap-4 py-4 border-t rounded-xl ${isLight
                    ? "bg-slate-50 border-slate-200"
                    : "bg-slate-800/20 border-white/5"
                    }`}>
                    <span className="text-sm font-medium text-slate-500 w-full text-center sm:w-auto">Add more:</span>

                    <button onClick={onAddPdfs} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border transition-colors ${isLight
                        ? "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
                        : "bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 border-blue-600/30"
                        }`}>
                        <FileText className="w-4 h-4" /> PDF
                    </button>

                    <button onClick={onAddPptx} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border transition-colors ${isLight
                        ? "bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100"
                        : "bg-orange-600/20 text-orange-400 hover:bg-orange-600/30 border-orange-600/30"
                        }`}>
                        <Presentation className="w-4 h-4" /> PPT
                    </button>

                    <button onClick={onAddImages} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border transition-colors ${isLight
                        ? "bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100"
                        : "bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 border-emerald-600/30"
                        }`}>
                        <Image className="w-4 h-4" /> Images
                    </button>
                </div>

                {/* Actions */}
                <div className={`flex items-center justify-between pt-4 border-t ${isLight ? "border-slate-200" : "border-white/5"}`}>
                    <button
                        onClick={onBack}
                        className={`transition-colors ${isLight ? "text-slate-500 hover:text-slate-900" : "text-slate-400 hover:text-white"}`}
                    >
                        ← Back to Upload
                    </button>
                    <Button
                        size="lg"
                        onClick={onContinue}
                        disabled={selectedPages.length === 0}
                        className="px-8"
                    >
                        Continue with {selectedPages.length} Pages
                    </Button>
                </div>
            </div>

            {/* Page Editor Modal */}
            {editingPage && (
                <PageEditor
                    page={editingPage}
                    onSave={handleSaveEdit}
                    onClose={() => setEditingPage(null)}
                />
            )}
        </>
    );
}
