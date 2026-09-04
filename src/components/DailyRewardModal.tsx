import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Sparkles, CheckCircle2, X, Coins, Crown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';
import { Language } from '../types';
import { useI18n } from '../utils/i18n';

interface DailyRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  streak: number;
  dailyRewardClaimed: boolean;
  onClaim: () => void;
  language?: Language;
}

export const DailyRewardModal: React.FC<DailyRewardModalProps> = ({
  isOpen,
  onClose,
  streak,
  dailyRewardClaimed,
  onClaim,
  language = 'en',
}) => {
  const t = useI18n(language);
  if (!isOpen) return null;

  const handleClaim = () => {
    sound.playReward();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
    onClaim();
  };

  const days = [
    { day: 1, reward: '50', isSpecial: false },
    { day: 2, reward: '75', isSpecial: false },
    { day: 3, reward: '100', isSpecial: false },
    { day: 4, reward: '125', isSpecial: false },
    { day: 5, reward: '150', isSpecial: false },
    { day: 6, reward: '200', isSpecial: false },
    { day: 7, reward: `350`, isSpecial: true, specialText: language === 'es' ? 'Regalo Épico' : 'Epic Gift' },
  ];

  const currentStreakDay = ((streak - 1) % 7) + 1;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl z-10 border border-stone-200 text-center text-stone-900"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-400 hover:text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Icon Header */}
          <div className="w-18 h-18 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 mx-auto -mt-12 mb-4 flex items-center justify-center text-white shadow-xl shadow-amber-500/10 border-2 border-white">
            <Gift className="w-9 h-9" />
          </div>

          <h2 className="text-xl font-black text-stone-800">{t.dailyReward}</h2>
          <p className="text-xs text-stone-500 mt-1 mb-6 font-medium">
            {language === 'es' 
              ? '¡Ingresa a diario para mantener tu racha y ganar recompensas de la división AERIS!'
              : 'Log in daily to maintain your streak and earn rewards for the AERIS division!'}
          </p>

          {/* 7 Day Matrix */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            {days.map((item) => {
              const isToday = item.day === currentStreakDay;
              const isPast = item.day < currentStreakDay;

              return (
                <div
                  key={item.day}
                  className={`rounded-2xl p-2.5 flex flex-col items-center justify-center transition-all ${
                    item.isSpecial 
                      ? 'col-span-2 bg-gradient-to-br from-amber-50 to-amber-100/40 border border-amber-200' 
                      : 'bg-stone-50 border border-stone-200/80'
                  } ${isToday ? 'ring-2 ring-cyan-500 ring-offset-2 ring-offset-white scale-105 bg-white shadow-sm' : ''}`}
                >
                  <span className={`text-[10px] font-black uppercase ${isToday ? 'text-cyan-600 font-black' : 'text-stone-400'}`}>
                    {t.day} {item.day}
                  </span>

                  <div className="my-1.5">
                    {isPast ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : item.isSpecial ? (
                      <div className="flex items-center gap-1">
                        <Crown className="w-5 h-5 text-amber-500" />
                        <Sparkles className="w-4 h-4 text-cyan-500" />
                      </div>
                    ) : (
                      <Gift className="w-5 h-5 text-stone-400" />
                    )}
                  </div>

                  <div className={`text-[11px] font-bold flex items-center gap-1 ${isToday ? 'text-amber-600 font-extrabold' : 'text-stone-600'}`}>
                    <Coins className="w-3 h-3 text-amber-500" />
                    <span>{item.reward}</span>
                  </div>
                  {item.specialText && (
                    <span className="text-[8px] font-bold text-amber-600 uppercase mt-0.5 tracking-tight">
                      {item.specialText}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Claim or Claimed Button */}
          <button
            onClick={handleClaim}
            disabled={dailyRewardClaimed}
            className={`w-full py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
              dailyRewardClaimed
                ? 'bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-white shadow-md active:scale-95'
            }`}
          >
            {dailyRewardClaimed ? t.claimed : t.claimReward}
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
