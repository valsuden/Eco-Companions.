import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WasteItem, WasteCategory, Language } from '../../types';
import { WASTE_ITEMS, getLocalizedWasteItem } from '../../data/ecoData';
import { EcoIcon } from '../EcoIcon';
import { sound } from '../../utils/sound';
import { ArrowLeft, Timer, Zap, Trophy, CheckCircle2, Leaf, Recycle, Trash2, Lightbulb, Sparkles, Coins } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useI18n } from '../../utils/i18n';

interface FastSortGameProps {
  language?: Language;
  onBack: () => void;
  onFinish: (score: number, coins: number, xp: number, classifiedCount: number) => void;
}

export function FastSortGame({ language = 'en', onBack, onFinish }: FastSortGameProps) {
  const t = useI18n(language);
  const [currentRound, setCurrentRound] = useState(1);
  const totalRounds = 12;
  const [currentWaste, setCurrentWaste] = useState<WasteItem>(() => WASTE_ITEMS[0]);
  const [timeLeft, setTimeLeft] = useState(10);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [learningModal, setLearningModal] = useState<{
    show: boolean;
    waste: WasteItem;
    chosenCategory: WasteCategory;
  } | null>(null);

  const pickNewWaste = useCallback(() => {
    const random = WASTE_ITEMS[Math.floor(Math.random() * WASTE_ITEMS.length)];
    setCurrentWaste(random);
    setTimeLeft(Math.max(4, 9 - Math.floor(currentRound / 3)));
  }, [currentRound]);

  useEffect(() => {
    if (gameOver || learningModal?.show) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          sound.playWrong();
          setCombo(0);
          setLearningModal({
            show: true,
            waste: currentWaste,
            chosenCategory: 'organic',
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameOver, learningModal, currentWaste]);

  useEffect(() => {
    pickNewWaste();
  }, [pickNewWaste]);

  const handleSelectBin = (category: WasteCategory) => {
    if (gameOver || learningModal?.show) return;

    const isCorrect = category === currentWaste.category;

    if (isCorrect) {
      sound.playCorrect();
      const newCombo = combo + 1;
      const multiplier = newCombo >= 5 ? 3 : newCombo >= 3 ? 2 : 1;
      const pointsGained = (30 + timeLeft * 5) * multiplier;

      setScore((s) => s + pointsGained);
      setCombo(newCombo);
      setMaxCombo((m) => Math.max(m, newCombo));
      setCorrectCount((c) => c + 1);

      if (newCombo >= 3) {
        sound.playCombo(newCombo);
      }

      advanceRound();
    } else {
      sound.playWrong();
      setCombo(0);
      setLearningModal({
        show: true,
        waste: currentWaste,
        chosenCategory: category,
      });
    }
  };

  const advanceRound = () => {
    if (currentRound >= totalRounds) {
      setGameOver(true);
      sound.playSparkle();
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    } else {
      setCurrentRound((r) => r + 1);
      pickNewWaste();
    }
  };

  const handleCloseLearningModal = () => {
    setLearningModal(null);
    advanceRound();
  };

  const handleFinish = () => {
    const coinsEarned = Math.max(5, Math.floor(score / 12) + correctCount * 2);
    const xpEarned = Math.max(20, Math.floor(score / 8) + correctCount * 5);
    onFinish(score, coinsEarned, xpEarned, correctCount);
  };

  const getCategoryDetails = (cat: WasteCategory) => {
    if (cat === 'organic') return { label: t.organic, icon: Leaf, color: 'text-emerald-400' };
    if (cat === 'recyclable') return { label: t.recyclable, icon: Recycle, color: 'text-sky-400' };
    return { label: t.nonUsable, icon: Trash2, color: 'text-slate-400' };
  };

  return (
    <div className="w-full h-full flex flex-col justify-between bg-slate-950 text-white p-3 sm:p-5 select-none relative overflow-hidden ">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-bold text-slate-300 border border-slate-700/60 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.exit}</span>
        </button>

        <div className="flex items-center gap-4 text-xs font-bold">
          <div className="flex items-center gap-1 text-cyan-400">
            <span>{t.round} {currentRound}/{totalRounds}</span>
          </div>

          <div className="flex items-center gap-1 text-amber-400">
            <Trophy className="w-4 h-4" />
            <span>{score} {t.points}</span>
          </div>

          {combo >= 2 && (
            <div className="flex items-center gap-1 text-purple-400 font-extrabold animate-pulse">
              <Zap className="w-4 h-4" />
              <span>x{combo} COMBO</span>
            </div>
          )}
        </div>
      </div>

      {/* Center Stage: Waste Display & Timer */}
      <div className="flex-1 max-w-md mx-auto w-full flex flex-col items-center justify-center my-4 space-y-4">
        {/* Timer Bar */}
        <div className="w-full flex items-center gap-2">
          <Timer className={`w-4 h-4 ${timeLeft <= 3 ? 'text-rose-400 animate-bounce' : 'text-cyan-400'}`} />
          <div className="flex-1 h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <motion.div
              className={`h-full ${
                timeLeft > 5 ? 'bg-cyan-500' : timeLeft > 2 ? 'bg-amber-500' : 'bg-rose-500'
              }`}
              animate={{ width: `${(timeLeft / 10) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="text-xs font-bold tabular-nums w-8 text-right text-slate-300">{timeLeft}s</span>
        </div>

        {/* Waste Central Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWaste.id + currentRound}
            initial={{ scale: 0.85, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: -15 }}
            className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 flex flex-col items-center text-center shadow-2xl relative overflow-hidden backdrop-blur-md"
          >
            <div className="w-20 h-20 rounded-3xl bg-slate-800/90 border border-slate-700 flex items-center justify-center mb-3 shadow-inner">
              <EcoIcon name={currentWaste.icon} className="w-10 h-10" />
            </div>

            <h3 className="text-lg font-black text-slate-100">{getLocalizedWasteItem(currentWaste, language).name}</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xs">{getLocalizedWasteItem(currentWaste, language).description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom 3 Target Bins */}
      <div className="max-w-md mx-auto w-full grid grid-cols-3 gap-2.5 sm:gap-3.5 pb-2">
        {/* Contenedor Verde */}
        <button
          onClick={() => handleSelectBin('organic')}
          className="flex flex-col items-center justify-center py-3.5 px-2 rounded-2xl bg-emerald-950/90 hover:bg-emerald-900 active:scale-95 text-emerald-300 font-black text-xs shadow-xl border border-emerald-500/50 transition-all cursor-pointer"
        >
          <Leaf className="w-5 h-5 text-emerald-400 mb-1" />
          <span>{t.organic}</span>
        </button>

        {/* Contenedor Blanco */}
        <button
          onClick={() => handleSelectBin('recyclable')}
          className="flex flex-col items-center justify-center py-3.5 px-2 rounded-2xl bg-slate-100 hover:bg-white active:scale-95 text-slate-700 font-black text-xs shadow-xl border border-slate-300 transition-all cursor-pointer"
        >
          <Recycle className="w-5 h-5 text-slate-600 mb-1" />
          <span>{t.recyclable}</span>
        </button>

        {/* Contenedor Negro */}
        <button
          onClick={() => handleSelectBin('non_usable')}
          className="flex flex-col items-center justify-center py-3.5 px-2 rounded-2xl bg-slate-900 hover:bg-slate-800 active:scale-95 text-slate-300 font-black text-xs shadow-xl border border-slate-700 transition-all cursor-pointer"
        >
          <Trash2 className="w-5 h-5 text-slate-400 mb-1" />
          <span>{t.nonUsable}</span>
        </button>
      </div>

      {/* EDUCATIONAL MODAL ON MISTAKE */}
      <AnimatePresence>
        {learningModal?.show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 z-50 select-none"
          >
            <div className="bg-slate-900 border border-amber-500/60 rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400">
                <Lightbulb className="w-6 h-6" />
              </div>

              <h2 className="text-base font-black text-amber-300">{language === 'es' ? '¡Momento de Aprendizaje!' : 'Eco Tip!'}</h2>

              <div className="bg-slate-800/80 rounded-2xl p-3.5 border border-slate-700 text-left space-y-2">
                <div className="flex items-center gap-2.5 text-xs font-bold text-slate-200">
                  <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-700">
                    <EcoIcon name={learningModal.waste.icon} className="w-5 h-5" />
                  </div>
                  <span>{getLocalizedWasteItem(learningModal.waste, language).name}</span>
                </div>

                {(() => {
                  const catDetails = getCategoryDetails(learningModal.waste.category);
                  const CatIcon = catDetails.icon;
                  return (
                    <div className={`text-xs font-bold flex items-center gap-1.5 ${catDetails.color}`}>
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                      <span>{t.correctBin}:</span>
                      <CatIcon className="w-3.5 h-3.5 shrink-0" />
                      <span>{catDetails.label}</span>
                    </div>
                  );
                })()}

                <p className="text-xs text-slate-300 leading-relaxed pt-1.5 border-t border-slate-700/60">
                  {getLocalizedWasteItem(learningModal.waste, language).educationalTip}
                </p>
              </div>

              <button
                onClick={handleCloseLearningModal}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                {t.continue}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GAME OVER MODAL */}
      <AnimatePresence>
        {gameOver && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 z-50 select-none"
          >
            <div className="bg-slate-900 border border-cyan-500/50 rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center mx-auto text-cyan-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-black text-cyan-400">{t.gameOver}</h2>
              <p className="text-xs text-slate-300">
                {language === 'es' ? 'Gran velocidad clasificando los residuos del Liceo Caucasia.' : 'Great speed sorting waste and protecting the ecosystem.'}
              </p>

              <div className="bg-slate-800/90 rounded-2xl p-3 border border-slate-700 space-y-2 text-xs">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-400">{t.score}:</span>
                  <span className="text-amber-400">{score} {t.points}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-slate-400">{t.correct}:</span>
                  <span className="text-cyan-400">{correctCount} / {totalRounds}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-slate-400">Max Combo:</span>
                  <span className="text-purple-400">{maxCombo}x</span>
                </div>
                <div className="flex justify-between font-bold pt-1.5 border-t border-slate-700">
                  <span className="text-slate-400">{t.coins}:</span>
                  <span className="text-amber-300 flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5 text-amber-400" />
                    <span>+{Math.max(5, Math.floor(score / 12) + correctCount * 2)}</span>
                    <span className="text-slate-500">•</span>
                    <span>+{Math.max(20, Math.floor(score / 8) + correctCount * 5)} XP</span>
                  </span>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-600/40 transition-transform active:scale-95 cursor-pointer"
              >
                {t.claimReward}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
