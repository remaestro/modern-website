import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

interface Step {
  id: number;
  title: string;
  duration: string;
}

interface ProgressStepperProps {
  steps: Step[];
  currentStep: number;
}

function ProgressStepper({ steps, currentStep }: ProgressStepperProps) {
  return (
    <div className="max-w-5xl mx-auto mb-12">
      <div className="flex justify-between items-center relative">
        {/* Background line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -z-10" />
        
        {/* Progress line */}
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-energy-green to-cyber-blue -z-10 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />
        
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center">
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${
                currentStep >= step.id 
                  ? 'bg-gradient-to-r from-energy-green to-cyber-blue text-white' 
                  : 'bg-white/10 text-white/40'
              }`}
              animate={{ scale: currentStep === step.id ? 1.2 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep > step.id ? <FaCheckCircle /> : step.id}
            </motion.div>
            <p className="text-xs text-white/60 text-center max-w-20">{step.title}</p>
            <p className="text-xs text-white/40">{step.duration}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgressStepper;
