import Image from 'next/image';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Step {
  number: number;
  label: string;
}

type ProgressStepperProps = {
  activeStep: number;
  onStepChange?: (step: number) => void;
  completedSteps?: Partial<Record<number, boolean>>;
};

export default function ProgressStepper({
  activeStep,
  onStepChange,
  completedSteps = {},
}: ProgressStepperProps) {
  const steps: Step[] = [
    { number: 1, label: 'Add Product' },
    { number: 2, label: 'Select Models' },
    { number: 3, label: 'Select Poses' },
    { number: 4, label: 'Select Background' },
    { number: 5, label: 'Summary' },
  ];

  return (
    <div className="w-full rounded-xl border border-border bg-surface p-3 sm:p-4 relative stepper-gradient overflow-x-auto">
      <div className="flex items-center gap-1 sm:gap-2 min-w-max">
        {steps.map((step, index) => {
          const hasSelection = !!completedSteps[step.number];
          const isCompleted = step.number < activeStep || hasSelection;
          const isActive = step.number === activeStep;
          return (
            <React.Fragment key={step.number}>
              <button
                type="button"
                onClick={onStepChange ? () => onStepChange(step.number) : undefined}
                className={`flex items-center gap-1 sm:gap-[6px] leading-[120%] pr-2 sm:pr-4 p-1.5 sm:p-[6px] rounded-lg text-xs sm:text-sm transition-all duration-300 shrink-0 ${isActive
                    ? 'bg-surface-tint border-orange-300 text-black-600 font-semibold border'
                    : isCompleted
                      ? 'text-orange-600 font-medium border-transparent border'
                      : 'text-gray-600 font-medium border-transparent border'
                  }`}
                aria-current={isActive ? 'step' : undefined}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isCompleted ? (
                    <motion.div
                      key="completed"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="h-7 w-7 sm:h-[30px] sm:w-[30px] rounded-md bg-orange-600 flex items-center justify-center shrink-0"
                    >
                      <Image src="/assets/white-tick.svg" alt="completed" width={14} height={14} className="relative w-3 h-3 sm:w-[14px] sm:h-[14px]" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="uncompleted"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`${isActive ? "bg-orange-600 text-white" : "bg-surface-muted"} h-7 w-7 sm:h-[30px] sm:w-[30px] flex items-center justify-center rounded-md shrink-0 text-xs sm:text-base transition-colors duration-300`}
                    >
                      {step.number}
                    </motion.div>
                  )}
                </AnimatePresence>
                <span className="whitespace-nowrap hidden sm:inline">{step.label}</span>
              </button>
              {index < steps.length - 1 && (
                <div className='p-[2px]'><Image src="/assets/arrow.svg" alt="arrow" width={16} height={16} /></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

