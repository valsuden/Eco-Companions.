import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, X, Sparkles, HelpCircle, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound';
import { useI18n } from '../utils/i18n';

export interface TourStep {
  id: string;
  targetId: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
}

interface GuidedTourProps {
  tourId: string;
  isOpen: boolean;
  onClose: () => void;
  steps: TourStep[];
  badgeText: string;
  finishButtonText: string;
  language?: 'es' | 'en';
}

interface TargetRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export const GuidedTour: React.FC<GuidedTourProps> = ({
  tourId,
  isOpen,
  onClose,
  steps,
  badgeText,
  finishButtonText,
  language = 'es',
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<TargetRect | null>(null);
  const t = useI18n(language);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const step = steps[currentStep] || steps[0];

  // Update target rect
  const updateTargetPosition = useCallback(() => {
    if (!step?.targetId) {
      setTargetRect(null);
      return;
    }

    const el = document.getElementById(step.targetId);
    if (el) {
      const rect = el.getBoundingClientRect();
      // Scroll into view if out of viewport
      const isInViewport =
        rect.top >= 40 &&
        rect.bottom <= window.innerHeight - 40 &&
        rect.left >= 10 &&
        rect.right <= window.innerWidth - 10;

      if (!isInViewport) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Re-read rect after slight scroll delay
        setTimeout(() => {
          const updatedRect = el.getBoundingClientRect();
          setTargetRect({
            top: updatedRect.top,
            left: updatedRect.left,
            width: updatedRect.width,
            height: updatedRect.height,
          });
        }, 300);
      } else {
        setTargetRect({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
      }
    } else {
      setTargetRect(null);
    }
  }, [step]);

  // When step or open state changes
  useEffect(() => {
    if (!isOpen) return;

    // Small delay to ensure DOM is rendered and positioned
    const timer = setTimeout(() => {
      updateTargetPosition();
    }, 150);

    const handleResize = () => updateTargetPosition();
    const handleScroll = () => updateTargetPosition();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isOpen, currentStep, updateTargetPosition]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentStep]);

  if (!isOpen || steps.length === 0) return null;

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    sound.playClick();
    if (isLastStep) {
      handleComplete();
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrev = () => {
    if (isFirstStep) return;
    sound.playClick();
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleComplete = () => {
    sound.playReward();
    try {
      localStorage.setItem(`caucasia_eco_tour_${tourId}`, 'true');
    } catch {
      // ignore
    }
    onClose();
  };

  const handleSkip = () => {
    sound.playClick();
    try {
      localStorage.setItem(`caucasia_eco_tour_${tourId}`, 'true');
    } catch {
      // ignore
    }
    onClose();
  };

  // Compute tooltip position style
  const getTooltipStyle = (): React.CSSProperties => {
    if (!targetRect) {
      // Center fallback
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'fixed',
      };
    }

    const pad = 12;
    const windowW = typeof window !== 'undefined' ? window.innerWidth : 1000;
    const windowH = typeof window !== 'undefined' ? window.innerHeight : 800;
    const tooltipWidth = Math.min(420, windowW - 32);

    // Center horizontally relative to target, but clamp inside screen
    let left = targetRect.left + targetRect.width / 2 - tooltipWidth / 2;
    left = Math.max(16, Math.min(windowW - tooltipWidth - 16, left));

    // Determine if we place above or below
    const spaceBelow = windowH - (targetRect.top + targetRect.height);
    const spaceAbove = targetRect.top;

    let top: number;
    if (spaceBelow >= 260 || spaceBelow >= spaceAbove) {
      // Place below target
      top = Math.min(windowH - 280, targetRect.top + targetRect.height + pad);
    } else {
      // Place above target
      top = Math.max(16, targetRect.top - 250 - pad);
    }

    return {
      top: `${top}px`,
      left: `${left}px`,
      width: `${tooltipWidth}px`,
      position: 'fixed',
    };
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto select-none overflow-hidden animate-fadeIn">
      {/* Dimmed backdrop */}
      <div 
        onClick={handleSkip}
        className="absolute inset-0 bg-slate-950/75 backdrop-blur-[2px] transition-opacity duration-300"
      />

      {/* Target Element Spotlight / Glow Ring */}
      {targetRect && (
        <motion.div
          layoutId="tour-spotlight"
          initial={false}
          animate={{
            top: targetRect.top - 6,
            left: targetRect.left - 6,
            width: targetRect.width + 12,
            height: targetRect.height + 12,
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          className="fixed pointer-events-none rounded-3xl z-40 border-2"
          style={{
            borderColor: 'var(--accent)',
            boxShadow: '0 0 0 9999px rgba(10, 15, 29, 0.72), 0 0 25px var(--glow)',
          }}
        >
          {/* Subtle pulse animation indicator inside ring */}
          <span className="absolute -top-2 -right-2 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border border-white" />
          </span>
        </motion.div>
      )}

      {/* Tooltip Dialog Card */}
      <div 
        ref={tooltipRef}
        style={getTooltipStyle()}
        className="z-50"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="rounded-3xl p-5 sm:p-6 border shadow-2xl backdrop-blur-xl relative overflow-hidden"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border-accent)',
              color: 'var(--text-primary)',
              boxShadow: 'var(--card-shadow), 0 20px 40px -15px rgba(0, 0, 0, 0.7)',
            }}
          >
            {/* Ambient accent subtle glow */}
            <div 
              className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none blur-3xl opacity-20"
              style={{ backgroundColor: 'var(--accent)' }}
            />

            {/* Header: Tour badge & Close button */}
            <div className="flex items-center justify-between gap-2 pb-3 border-b" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-2">
                <span 
                  className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border flex items-center gap-1.5"
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    borderColor: 'var(--border-accent)',
                    color: 'var(--accent)',
                  }}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{badgeText}</span>
                </span>
              </div>

              <button
                onClick={handleSkip}
                className="p-1.5 rounded-xl border transition-colors hover:opacity-80 cursor-pointer"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-muted)',
                }}
                title={t.tourSkip}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Body Content */}
            <div className="mt-4 flex items-start gap-3.5">
              <div 
                className="w-11 h-11 rounded-2xl border flex items-center justify-center shrink-0 shadow-inner"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border-accent)',
                  color: 'var(--accent)',
                }}
              >
                {step.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="text-sm sm:text-base font-black leading-snug" style={{ color: 'var(--text-primary)' }}>
                    {step.title}
                  </h3>
                  <span className="text-[10px] font-bold shrink-0" style={{ color: 'var(--text-muted)' }}>
                    {t.tourStepIndicator} {currentStep + 1}/{steps.length}
                  </span>
                </div>

                <p className="text-xs mt-1.5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {step.description}
                </p>
              </div>
            </div>

            {/* Footer: Step dots & Navigation Buttons */}
            <div className="mt-6 pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderColor: 'var(--border)' }}>
              {/* Step indicator dots */}
              <div className="flex items-center gap-1.5">
                {steps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      sound.playClick();
                      setCurrentStep(idx);
                    }}
                    className="h-2 rounded-full transition-all cursor-pointer"
                    style={{
                      width: idx === currentStep ? '20px' : '6px',
                      backgroundColor: idx === currentStep ? 'var(--accent)' : 'var(--border)',
                    }}
                    title={`${t.tourStepIndicator} ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                {!isFirstStep && (
                  <button
                    onClick={handlePrev}
                    className="px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      borderColor: 'var(--border)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>{t.tourPrev}</span>
                  </button>
                )}

                <button
                  onClick={handleNext}
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: '#0f172a',
                  }}
                >
                  <span>{isLastStep ? finishButtonText : t.tourNext}</span>
                  {isLastStep ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
