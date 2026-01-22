import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../lib/cn';

export function StepProgress({ currentStep, totalSteps = 6 }) {
    const steps = [
        { id: 1, label: 'Upload' },
        { id: 2, label: 'Select' },
        { id: 3, label: 'Review' },
        { id: 4, label: 'Enhance' },
        { id: 5, label: 'Format' },
        { id: 6, label: 'Download' },
    ];

    return (
        <div className="flex items-center justify-center gap-2 py-6">
            {steps.map((step, index) => {
                const isCompleted = step.id < currentStep;
                const isCurrent = step.id === currentStep;
                const isUpcoming = step.id > currentStep;

                return (
                    <React.Fragment key={step.id}>
                        <div className="flex flex-col items-center gap-1">
                            <div
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 border-2",
                                    isCompleted && "bg-violet-600 border-violet-600 text-white",
                                    isCurrent && "bg-violet-600 border-violet-600 text-white shadow-lg shadow-violet-500/50 scale-110",
                                    isUpcoming && "bg-slate-800 border-slate-700 text-slate-500"
                                )}
                            >
                                {isCompleted ? <Check className="w-5 h-5" /> : step.id}
                            </div>
                            <span className={cn(
                                "text-[10px] hidden sm:block transition-colors",
                                isCurrent ? "text-violet-400 font-medium" : "text-slate-500"
                            )}>
                                {step.label}
                            </span>
                        </div>

                        {index < steps.length - 1 && (
                            <div
                                className={cn(
                                    "w-8 sm:w-12 h-0.5 transition-colors duration-300",
                                    step.id < currentStep ? "bg-violet-600" : "bg-slate-700"
                                )}
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}
