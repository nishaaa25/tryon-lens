import Image from 'next/image';
import React from 'react';

interface Step {
  number: number;
  label: string;
}

type ProgressStepperProps = {
  activeStep: number;
  onStepChange?: (step: number) => void;
};

export default function ProgressStepper({
  activeStep,
  onStepChange,
}: ProgressStepperProps) {
  const steps: Step[] = [
    { number: 1, label: 'Add Product' },
    { number: 2, label: 'Select Models' },
    // { number: 3, label: 'Customize Models' },
    { number: 3, label: 'Select Poses' },
    { number: 4, label: 'Select Background' },
    { number: 5, label: 'Summary' },
  ];

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-4 relative stepper-gradient ">
      <div className="flex items-center gap-2 min-w-max">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <button
            type="button"
            onClick={onStepChange ? () => onStepChange(step.number) : undefined}
            className={`flex items-center gap-[6px] leading-[120%]  pr-4  p-[6px] rounded-lg text-sm transition-colors ${
              step.number === activeStep
                ? 'bg-[#fff3eb] border border-orange-300 text-black-600 font-semibold '
                : 'text-gray-600 font-medium border border-transparent '
            }`}
            aria-current={step.number === activeStep ? 'step' : undefined}
          >
            <div className={`${step.number === activeStep ? "bg-orange-600 text-white" : "bg-[#f2f5f8]"} h-[30px] w-[30px] flex items-center justify-center rounded-md `}>{step.number}</div>
            <span>{step.label}</span>
          </button>
          {index < steps.length - 1 && (
            <div className='p-[2px]'><Image src="/assets/arrow.svg" alt="arrow" width={16} height={16} /></div>
          )}
        </React.Fragment>
      ))}
      </div>
    </div>
  );
}

