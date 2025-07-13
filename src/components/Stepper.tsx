'use client';

import { motion } from 'framer-motion';

interface Step {
  id: string;
  label: string;
  completed: boolean;
}

interface StepperProps {
  steps: Step[];
  currentStep: string;
  className?: string;
}

export default function Stepper({ steps, currentStep, className = '' }: StepperProps) {
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <div className={`w-full ${className}`}>
      {/* デスクトップ版 */}
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.completed;
          const isPending = !isActive && !isCompleted;

          return (
            <div key={step.id} className="flex items-center">
              {/* ステップアイコン */}
              <div className="flex flex-col items-center">
                <motion.div
                  className={`stepper-item ${
                    isActive ? 'active' : isCompleted ? 'completed' : 'pending'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </motion.div>
                
                {/* ステップラベル */}
                <div className="mt-2 text-center">
                  <p className={`text-sm font-medium ${
                    isActive ? 'text-mystic-300' : isCompleted ? 'text-white' : 'text-white/50'
                  }`}>
                    {step.label}
                  </p>
                </div>
              </div>

              {/* 接続線 */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div className={`h-0.5 rounded-full ${
                    isCompleted ? 'bg-mystic-500' : 'bg-white/20'
                  }`} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* モバイル版 */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.completed;

            return (
              <div key={step.id} className="flex flex-col items-center">
                <motion.div
                  className={`stepper-item ${
                    isActive ? 'active' : isCompleted ? 'completed' : 'pending'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
        
        {/* 現在のステップ情報 */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white">
            {steps[currentStepIndex]?.label}
          </h3>
          <p className="text-xs text-white/40 mt-2">
            {currentStepIndex + 1} / {steps.length}
          </p>
        </div>
      </div>
    </div>
  );
} 