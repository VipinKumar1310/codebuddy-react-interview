import { useState } from "react";

export function useMultiStepForm(steps) {
  const [currentStep, setCurrentStep] = useState(0);

  function nextStep() {
    setCurrentStep((currentStep) => {
      if (currentStep >= steps.length - 1) return currentStep;
      return currentStep + 1;
    });
  }

  function prevStep() {
    setCurrentStep((currentStep) => {
      if (currentStep <= 0) return currentStep;
      return currentStep - 1;
    });
  }

  function goToStep(step) {
    setCurrentStep(step);
  }

  return {
    currentStep,
    step: steps[currentStep],
    nextStep,
    prevStep,
    goToStep,
    steps,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps.length - 1,
  };
}
