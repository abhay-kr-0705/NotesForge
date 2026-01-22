import React, { useState, useRef, useEffect } from 'react';
import { X, Square, Circle, Droplets, PaintBucket, Undo2, Redo2, Check } from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '../lib/cn';

export function PageEditor({ page, onSave, onClose }) {
    const canvasRef = useRef(null);
    const [selectionTool, setSelectionTool] = useState('rectangle'); // 'rectangle' | 'circle'
    const [editAction, setEditAction] = useState('invert'); // 'invert' | 'paintBlack'
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [originalImage, setOriginalImage] = useState(null);

    // Load image into canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !page?.thumbnail) return;

        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            setOriginalImage(img);
            // Save initial state
            saveToHistory();
        };
        img.src = page.thumbnail;
    }, [page]);

    const saveToHistory = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const dataUrl = canvas.toDataURL();
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(dataUrl);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    };

    const undo = () => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            loadFromHistory(history[newIndex]);
        }
    };

    const redo = () => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            loadFromHistory(history[newIndex]);
        }
    };

    const loadFromHistory = (dataUrl) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
        img.src = dataUrl;
    };

    const getMousePos = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    };

    const handleMouseDown = (e) => {
        setIsDrawing(true);
        const pos = getMousePos(e);
        setStartPos(pos);
        setCurrentPos(pos);
    };

    const handleMouseMove = (e) => {
        if (!isDrawing) return;
        setCurrentPos(getMousePos(e));
    };

    const handleMouseUp = () => {
        if (!isDrawing) return;
        setIsDrawing(false);
        applyEffect();
    };

    const applyEffect = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Calculate selection bounds
        const x = Math.min(startPos.x, currentPos.x);
        const y = Math.min(startPos.y, currentPos.y);
        const width = Math.abs(currentPos.x - startPos.x);
        const height = Math.abs(currentPos.y - startPos.y);

        if (width < 5 || height < 5) return; // Too small

        // Get image data for the selected region
        const imageData = ctx.getImageData(x, y, width, height);
        const data = imageData.data;

        if (editAction === 'invert') {
            for (let i = 0; i < data.length; i += 4) {
                data[i] = 255 - data[i];     // Red
                data[i + 1] = 255 - data[i + 1]; // Green
                data[i + 2] = 255 - data[i + 2]; // Blue
            }
        } else if (editAction === 'paintBlack') {
            for (let i = 0; i < data.length; i += 4) {
                data[i] = 0;     // Red
                data[i + 1] = 0; // Green
                data[i + 2] = 0; // Blue
            }
        }

        // Apply based on shape
        if (selectionTool === 'rectangle') {
            ctx.putImageData(imageData, x, y);
        } else if (selectionTool === 'circle') {
            // For circle, we need to mask
            const centerX = x + width / 2;
            const centerY = y + height / 2;
            const radiusX = width / 2;
            const radiusY = height / 2;

            // Create temporary canvas for masking
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = width;
            tempCanvas.height = height;
            const tempCtx = tempCanvas.getContext('2d');
            tempCtx.putImageData(imageData, 0, 0);

            // Draw ellipse mask
            ctx.save();
            ctx.beginPath();
            ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(tempCanvas, x, y);
            ctx.restore();
        }

        saveToHistory();
    };

    const handleSave = () => {
        const canvas = canvasRef.current;
        const editedThumbnail = canvas.toDataURL();
        onSave({ ...page, thumbnail: editedThumbnail, edited: true });
    };

    // Draw selection preview
    useEffect(() => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Redraw from history
        if (history[historyIndex]) {
            const img = new Image();
            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);

                // Draw selection preview
                ctx.strokeStyle = '#8b5cf6';
                ctx.lineWidth = 2;
                ctx.setLineDash([5, 5]);

                const x = Math.min(startPos.x, currentPos.x);
                const y = Math.min(startPos.y, currentPos.y);
                const width = Math.abs(currentPos.x - startPos.x);
                const height = Math.abs(currentPos.y - startPos.y);

                if (selectionTool === 'rectangle') {
                    ctx.strokeRect(x, y, width, height);
                } else {
                    ctx.beginPath();
                    ctx.ellipse(x + width / 2, y + height / 2, width / 2, height / 2, 0, 0, Math.PI * 2);
                    ctx.stroke();
                }
                ctx.setLineDash([]);
            };
            img.src = history[historyIndex];
        }
    }, [isDrawing, currentPos, selectionTool]);

    return (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex">
            {/* Left Sidebar - Tools */}
            <div className="w-64 bg-slate-900 border-r border-white/5 p-4 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-white">Edit Page {page?.id}</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Selection Tool */}
                <div className="space-y-3">
                    <h3 className="text-sm text-slate-400">Selection Tool</h3>
                    <div className="space-y-2">
                        <button
                            onClick={() => setSelectionTool('rectangle')}
                            className={cn(
                                "w-full flex items-center gap-3 p-3 rounded-lg border transition-all",
                                selectionTool === 'rectangle'
                                    ? "bg-violet-600 border-violet-600 text-white"
                                    : "bg-slate-800 border-slate-700 text-slate-400 hover:border-violet-500/50"
                            )}
                        >
                            <Square className="w-5 h-5" />
                            <span>Rectangle</span>
                        </button>
                        <button
                            onClick={() => setSelectionTool('circle')}
                            className={cn(
                                "w-full flex items-center gap-3 p-3 rounded-lg border transition-all",
                                selectionTool === 'circle'
                                    ? "bg-violet-600 border-violet-600 text-white"
                                    : "bg-slate-800 border-slate-700 text-slate-400 hover:border-violet-500/50"
                            )}
                        >
                            <Circle className="w-5 h-5" />
                            <span>Circle</span>
                        </button>
                    </div>
                </div>

                {/* Edit Action */}
                <div className="space-y-3">
                    <h3 className="text-sm text-slate-400">Edit Action</h3>
                    <div className="space-y-2">
                        <button
                            onClick={() => setEditAction('invert')}
                            className={cn(
                                "w-full flex items-center gap-3 p-3 rounded-lg border transition-all",
                                editAction === 'invert'
                                    ? "bg-violet-600 border-violet-600 text-white"
                                    : "bg-slate-800 border-slate-700 text-slate-400 hover:border-violet-500/50"
                            )}
                        >
                            <Droplets className="w-5 h-5" />
                            <span>Invert Colors</span>
                        </button>
                        <button
                            onClick={() => setEditAction('paintBlack')}
                            className={cn(
                                "w-full flex items-center gap-3 p-3 rounded-lg border transition-all",
                                editAction === 'paintBlack'
                                    ? "bg-violet-600 border-violet-600 text-white"
                                    : "bg-slate-800 border-slate-700 text-slate-400 hover:border-violet-500/50"
                            )}
                        >
                            <PaintBucket className="w-5 h-5" />
                            <span>Paint Black</span>
                        </button>
                    </div>
                </div>

                {/* History */}
                <div className="space-y-3">
                    <h3 className="text-sm text-slate-400">History</h3>
                    <div className="flex gap-2">
                        <button
                            onClick={undo}
                            disabled={historyIndex <= 0}
                            className="flex-1 flex items-center justify-center gap-2 p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Undo2 className="w-4 h-4" />
                            <span>Undo</span>
                        </button>
                        <button
                            onClick={redo}
                            disabled={historyIndex >= history.length - 1}
                            className="flex-1 flex items-center justify-center gap-2 p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Redo2 className="w-4 h-4" />
                            <span>Redo</span>
                        </button>
                    </div>
                </div>

                {/* Tip */}
                <div className="mt-auto text-xs text-slate-500">
                    Draw selections, click Apply to commit changes.
                </div>
            </div>

            {/* Main Canvas Area */}
            <div className="flex-1 flex flex-col">
                {/* Toolbar */}
                <div className="h-12 bg-slate-900/50 border-b border-white/5 flex items-center justify-center px-4">
                    <span className="text-sm text-slate-400">
                        Tool: {selectionTool} • Action: {editAction}
                    </span>
                </div>

                {/* Canvas */}
                <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
                    <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10">
                        <canvas
                            ref={canvasRef}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={() => setIsDrawing(false)}
                            className="max-w-full max-h-[60vh] cursor-crosshair"
                            style={{ display: 'block' }}
                        />
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="h-16 bg-slate-900/50 border-t border-white/5 flex items-center justify-between px-6">
                    <button onClick={onClose} className="text-slate-400 hover:text-white">
                        Cancel
                    </button>
                    <Button onClick={handleSave} className="gap-2">
                        <Check className="w-4 h-4" />
                        Save Edits
                    </Button>
                </div>
            </div>
        </div>
    );
}
