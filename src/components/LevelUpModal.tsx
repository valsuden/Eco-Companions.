import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trophy, Award, Gift, ArrowRight, ShieldCheck } from 'lucide-react';
import { getNextLevelUnlock, getEnvironmentalTitle } from '../data/ecoData';
import { getLocalizedTitleName, getLocalizedUnlockName } from '../utils/i18n';
import { EcoIcon } from './EcoIcon';
import { sound } from '../utils/sound';

interface LevelUpModalProps {
  isOpen: boolean;
  newLevel: number;
  onClose: () => void;
  language: 'es' | 'en';
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
  isOpen,
  newLevel,
  onClose,
  language,
}) => {
  if (!isOpen) return null;

  const currentTitle = getEnvironmentalTitle(newLevel);
  const nextReward = getNextLevelUnlock(newLevel - 1);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm select-none ">
        {/* Background ambient radial glow */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 0.3 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute w-96 h-96 rounded-full bg-cyan-300/20 blur-3xl pointer-events-none"
        />

        <motion.div
          initial={{ scale: 0.85, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.85, y: 30, opacity: 0 }}
          className="relative max-w-md w-full bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-5 overflow-hidden text-stone-900"
        >
          {/* Top Decorative Ring */}
          <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/40"
            />
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-600 via-teal-500 to-emerald-400 flex items-center justify-center shadow-lg border border-cyan-300">
              <Trophy className="w-10 h-10 text-white drop-shadow-md" />
            </div>
          </div>

          {/* Titles & Rank Info */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-black uppercase tracking-widest text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
              {language === 'es' ? '¡NUEVO RANGO ALCANZADO!' : 'NEW RANK ACHIEVED!'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-800 mt-2">
              {language === 'es' ? `¡NIVEL ${newLevel} DESBLOQUEADO!` : `LEVEL ${newLevel} UNLOCKED!`}
            </h2>
            <div className="flex items-center justify-center gap-1.5 pt-1">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-emerald-700">{getLocalizedTitleName(currentTitle.title, language)}</span>
            </div>
          </div>

          {/* Unlocked Benefit Box */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-left flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-600 shrink-0">
              <EcoIcon name={nextReward.unlockIcon} className="w-8 h-8" />
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-1.5 text-xs font-black text-amber-600">
                <Gift className="w-3.5 h-3.5 text-amber-500" />
                <span>{language === 'es' ? 'Recompensa del Nivel:' : 'Level Reward:'}</span>
              </div>
              <h4 className="text-sm font-bold text-stone-800">{getLocalizedUnlockName(nextReward.unlockName, language)}</h4>
              <p className="text-[11px] text-stone-500 leading-snug">{nextReward.unlockDescription}</p>
            </div>
          </div>

          {/* Bonus Coin reward */}
          <div className="flex items-center justify-center gap-4 text-xs font-bold text-stone-500 py-1">
            <span className="flex items-center gap-1 text-amber-600">
              <span className="text-base">🪙</span> +50 {language === 'es' ? 'Monedas Eco' : 'Eco Coins'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-cyan-600">
              <ShieldCheck className="w-4 h-4 text-cyan-500" /> +100% {language === 'es' ? 'Energía' : 'Energy'}
            </span>
          </div>

          {/* Action Button */}
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform cursor-pointer"
          >
            <span>{language === 'es' ? 'Continuar Misión' : 'Continue Mission'}</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
