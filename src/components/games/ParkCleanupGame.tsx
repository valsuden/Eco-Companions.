import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WasteItem, WasteCategory, Language } from '../../types';
import { WASTE_ITEMS, getLocalizedWasteItem } from '../../data/ecoData';
import { EcoIcon } from '../EcoIcon';
import { sound } from '../../utils/sound';
import { ArrowLeft, Sparkles, Trophy, Timer, Leaf, Recycle, Trash2, Crown, ArrowRight, Lightbulb, Coins, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useI18n } from '../../utils/i18n';

interface ParkCleanupGameProps {
  language?: Language;
  onBack: () => void;
  onFinish: (score: number, coins: number, xp: number, classifiedCount: number) => void;
}

interface ParkLitter {
  id: string;
  waste: WasteItem;
  x: number;
  y: number;
  cleaned: boolean;
}

const ParkLandscape = () => (
  <svg className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" viewBox="0 0 800 700" preserveAspectRatio="xMidYMid slice">
    {/* Sky */}
    <rect width="800" height="270" fill="#75C6DE" />
    
    {/* Sun */}
    <circle cx="130" cy="110" r="48" fill="#DFE274" />
    
    {/* Ground */}
    <rect x="0" y="270" width="800" height="430" fill="#9CD17D" />
    
    {/* Grass blades */}
    <g fill="none" stroke="#6FA74B" strokeWidth="4.5" strokeLinecap="round">
      <path d="M 30,285 L 26,305" />
      <path d="M 50,280 L 46,310" />
      <path d="M 150,275 L 146,305" />
      <path d="M 170,270 L 166,310" />
      <path d="M 230,320 L 226,350" />
      <path d="M 245,325 L 241,365" />
      <path d="M 360,265 L 358,280" />
      <path d="M 510,355 L 507,370" />
      <path d="M 535,350 L 532,380" />
      <path d="M 575,275 L 570,305" />
      <path d="M 705,340 L 700,375" />
      <path d="M 725,345 L 720,380" />
      <path d="M 740,335 L 735,370" />
      <path d="M 760,340 L 755,385" />
      <path d="M 775,345 L 770,380" />
      <path d="M 60,405 L 55,445" />
      <path d="M 75,410 L 70,460" />
      <path d="M 90,415 L 85,475" />
      <path d="M 220,420 L 215,465" />
      <path d="M 240,425 L 235,480" />
      <path d="M 310,550 L 305,600" />
      <path d="M 330,555 L 325,615" />
      <path d="M 430,515 L 425,570" />
      <path d="M 445,520 L 440,580" />
      <path d="M 645,525 L 640,590" />
      <path d="M 665,530 L 660,605" />
      <path d="M 745,530 L 740,585" />
      <path d="M 770,540 L 765,600" />
      <path d="M 120,625 L 115,670" />
      <path d="M 135,635 L 130,685" />
      <path d="M 540,650 L 535,680" />
      <path d="M 555,655 L 550,685" />
    </g>

    {/* Flowers */}
    <g fill="#F2F9F5">
      <circle cx="15" cy="275" r="4.5" />
      <circle cx="90" cy="295" r="5" />
      <circle cx="250" cy="305" r="4.5" />
      <circle cx="760" cy="310" r="4" />
      <circle cx="720" cy="330" r="4.5" />
      
      <circle cx="85" cy="350" r="5" />
      <circle cx="195" cy="360" r="4.5" />
      <circle cx="300" cy="395" r="5.5" />
      <circle cx="470" cy="370" r="5" />
      <circle cx="535" cy="405" r="6" />
      
      <circle cx="70" cy="480" r="5" />
      <circle cx="160" cy="515" r="4.5" />
      <circle cx="350" cy="520" r="5" />
      <circle cx="475" cy="505" r="4.5" />
      <circle cx="550" cy="565" r="5" />
      <circle cx="610" cy="475" r="4.5" />
      <circle cx="690" cy="490" r="5.5" />
      <circle cx="720" cy="610" r="5" />
      
      <circle cx="215" cy="585" r="5" />
      <circle cx="375" cy="660" r="4.5" />
      <circle cx="45" cy="665" r="4" />
    </g>

    {/* Bench Structure */}
    <rect x="392" y="165" width="11" height="225" fill="#2C2C2C" />
    <rect x="620" y="165" width="11" height="225" fill="#2C2C2C" />
    
    <rect x="375" y="145" width="275" height="22" fill="#B38666" />
    <rect x="375" y="180" width="275" height="22" fill="#B38666" />
    <rect x="375" y="215" width="275" height="22" fill="#B38666" />
    
    <rect x="360" y="340" width="16" height="85" fill="#2C2C2C" />
    <rect x="655" y="340" width="16" height="85" fill="#2C2C2C" />

    <polygon points="360,265 665,265 675,295 350,295" fill="#B38666" />
    <polygon points="340,310 685,310 695,345 330,345" fill="#B38666" />
  </svg>
);

export function ParkCleanupGame({ language = 'en', onBack, onFinish }: ParkCleanupGameProps) {
  const t = useI18n(language);
  const [level, setLevel] = useState(1);
  const maxLevels = 6;
  const [score, setScore] = useState(0);
  const [coinsEarnedTotal, setCoinsEarnedTotal] = useState(0);
  const [xpEarnedTotal, setXpEarnedTotal] = useState(0);
  const [totalClassified, setTotalClassified] = useState(0);
  const [litters, setLitters] = useState<ParkLitter[]>([]);
  const [selectedLitter, setSelectedLitter] = useState<ParkLitter | null>(null);
  const [timeLeft, setTimeLeft] = useState(40);
  const [levelComplete, setLevelComplete] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null);

  const initLevelLitters = useCallback((lvl: number) => {
    const count = Math.min(10, 4 + lvl * 1.5);
    const generated: ParkLitter[] = [];

    for (let i = 0; i < count; i++) {
      const waste = WASTE_ITEMS[Math.floor(Math.random() * WASTE_ITEMS.length)];
      const x = 12 + Math.random() * 76;
      const y = 35 + Math.random() * 45;
      generated.push({
        id: `litter_${lvl}_${i}_${Date.now()}`,
        waste,
        x,
        y,
        cleaned: false,
      });
    }

    setLitters(generated);
    setTimeLeft(Math.max(20, 45 - lvl * 3));
    setLevelComplete(false);
  }, []);

  useEffect(() => {
    initLevelLitters(level);
  }, [level, initLevelLitters]);

  useEffect(() => {
    if (levelComplete || gameFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          sound.playWrong();
          setGameFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [levelComplete, gameFinished]);

  const totalInLevel = litters.length;
  const cleanedInLevel = litters.filter((l) => l.cleaned).length;
  const cleanlinessPercent = totalInLevel > 0 ? Math.round((cleanedInLevel / totalInLevel) * 100) : 0;

  const handleSortBin = (category: WasteCategory) => {
    if (!selectedLitter) return;

    const isCorrect = category === selectedLitter.waste.category;

    if (isCorrect) {
      sound.playCorrect();
      const points = 40 + level * 10;
      setScore((s) => s + points);
      setTotalClassified((c) => c + 1);

      const updated = litters.map((l) =>
        l.id === selectedLitter.id ? { ...l, cleaned: true } : l
      );
      setLitters(updated);
      setSelectedLitter(null);

      const remaining = updated.filter((l) => !l.cleaned).length;
      if (remaining === 0) {
        handleCompleteLevel();
      }
    } else {
      sound.playWrong();
      setErrorFeedback(`${t.wrong}!`);
      setTimeout(() => setErrorFeedback(null), 2000);
    }
  };

  const handleCompleteLevel = () => {
    sound.playLevelUp();
    confetti({ particleCount: 50, spread: 60 });
    setLevelComplete(true);

    const bonusCoins = 15 + level * 5;
    const bonusXp = 35 + level * 10;
    setCoinsEarnedTotal((c) => c + bonusCoins);
    setXpEarnedTotal((x) => x + bonusXp);

    if (level >= maxLevels) {
      setGameFinished(true);
    }
  };

  const handleNextLevel = () => {
    setLevel((l) => l + 1);
  };

  const handleFinishGame = () => {
    const finalCoins = coinsEarnedTotal + Math.floor(score / 15);
    const finalXp = xpEarnedTotal + Math.floor(score / 10);
    onFinish(score, finalCoins, finalXp, totalClassified);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between bg-theme-primary text-theme-primary p-3 sm:p-5 select-none relative overflow-hidden ">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-theme z-30">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-theme-surface hover:bg-theme-surface-hover text-xs font-bold text-theme-secondary border border-theme cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.exit}</span>
        </button>

        <div className="flex items-center gap-4 text-xs font-bold">
          <div className="flex items-center gap-1 text-theme-accent">
            <span>{t.level} {level}/{maxLevels}</span>
          </div>

          <div className="flex items-center gap-1 text-amber-400">
            <Trophy className="w-4 h-4" />
            <span>{score} {t.points}</span>
          </div>

          <div className="flex items-center gap-1 text-sky-400">
            <Timer className="w-4 h-4" />
            <span>{timeLeft}s</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Park Canvas */}
      <div className="flex-1 max-w-2xl mx-auto w-full my-2 relative rounded-3xl overflow-hidden border border-theme shadow-theme-card flex flex-col justify-between">
        {/* Static Vector Background Matching the Photo */}
        <ParkLandscape />

        {/* Cleanliness Progress Top Badge */}
        <div className="relative z-10 p-3 flex items-center justify-between">
          <div className="glass-panel px-3.5 py-1.5 rounded-2xl border flex items-center gap-2 shadow-sm">
            <Sparkles className="w-4 h-4 text-theme-accent" />
            <span className="text-xs font-bold text-theme-primary">
              {t.parkCleanupTitle}: {cleanlinessPercent}%
            </span>
          </div>

          <div className="glass-panel px-3 py-1.5 rounded-2xl border text-xs font-bold text-theme-accent shadow-sm">
            {cleanedInLevel} / {totalInLevel} {language === 'es' ? 'Recogidos' : 'Cleaned'}
          </div>
        </div>

        {/* Scattered Litters to Clean */}
        <div className="absolute inset-0 z-20 pointer-events-auto">
          {litters.map((litter) => {
            if (litter.cleaned) return null;
            return (
              <motion.button
                key={litter.id}
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                onClick={() => {
                  sound.playClick();
                  setSelectedLitter(litter);
                }}
                style={{ left: `${litter.x}%`, top: `${litter.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-2xl glass-card border-theme-accent/40 hover:border-theme-accent shadow-lg transition-transform active:scale-90 flex flex-col items-center group cursor-pointer backdrop-blur-md"
                title={`${litter.waste.name}`}
              >
                <div className="p-1">
                  <EcoIcon name={litter.waste.icon} className="w-7 h-7" />
                </div>
                <span className="text-[9px] font-black text-white bg-theme-accent px-1.5 py-0.5 rounded-full mt-0.5 whitespace-nowrap shadow-xs uppercase tracking-tight">
                  {language === 'es' ? 'Recoger' : 'Collect'}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Bottom Educational Hint */}
        <div className="relative z-10 p-3 text-center">
          <span className="text-[11px] font-semibold text-theme-secondary glass-panel px-3.5 py-1.5 rounded-full shadow-sm inline-flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-theme-accent" />
            <span>{t.parkCleanupDesc}</span>
          </span>
        </div>
      </div>

      {/* POPUP: SORT SELECTED LITTER INTO BINS */}
      <AnimatePresence>
        {selectedLitter && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 select-none"
          >
            <div className="glass-card border border-theme-accent/50 rounded-3xl p-5 max-w-sm w-full text-center space-y-4 shadow-theme-glow">
              <div className="w-16 h-16 rounded-2xl bg-theme-surface border border-theme flex items-center justify-center mx-auto shadow-inner">
                <EcoIcon name={selectedLitter.waste.icon} className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-base font-black text-theme-primary">{getLocalizedWasteItem(selectedLitter.waste, language).name}</h3>
                <p className="text-xs text-theme-secondary mt-0.5">{getLocalizedWasteItem(selectedLitter.waste, language).description}</p>
              </div>

              {errorFeedback && (
                <div className="p-2 bg-rose-500/20 border border-rose-500/50 rounded-xl text-xs font-bold text-rose-400">
                  {errorFeedback}
                </div>
              )}

              <div className="text-xs font-bold text-theme-secondary">{language === 'es' ? '¿A qué contenedor pertenece?' : 'Which bin does it belong to?'}</div>

              {/* 3 Bins */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleSortBin('organic')}
                  className="py-3 px-1 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 font-bold text-xs text-emerald-400 shadow-sm active:scale-95 transition-all flex flex-col items-center gap-1 border border-emerald-500/40 cursor-pointer"
                >
                  <Leaf className="w-4 h-4 text-emerald-400" />
                  <span>{t.organic}</span>
                </button>

                <button
                  onClick={() => handleSortBin('recyclable')}
                  className="py-3 px-1 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 font-bold text-xs text-sky-400 shadow-sm active:scale-95 transition-all flex flex-col items-center gap-1 border border-sky-500/40 cursor-pointer"
                >
                  <Recycle className="w-4 h-4 text-sky-400" />
                  <span>{t.recyclable}</span>
                </button>

                <button
                  onClick={() => handleSortBin('non_usable')}
                  className="py-3 px-1 rounded-xl bg-slate-500/20 hover:bg-slate-500/30 font-bold text-xs text-slate-300 shadow-sm active:scale-95 transition-all flex flex-col items-center gap-1 border border-slate-500/40 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4 text-slate-400" />
                  <span>{t.nonUsable}</span>
                </button>
              </div>

              <button
                onClick={() => setSelectedLitter(null)}
                className="text-xs text-theme-muted hover:text-theme-primary underline pt-1 cursor-pointer transition-colors"
              >
                {t.cancel}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LEVEL COMPLETED MODAL */}
      <AnimatePresence>
        {levelComplete && !gameFinished && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 select-none"
          >
            <div className="glass-card border border-theme-accent/50 rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-theme-glow">
              <div className="w-12 h-12 rounded-2xl bg-theme-accent/20 border border-theme-accent/40 flex items-center justify-center mx-auto text-theme-accent">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-black text-theme-accent">{t.level} {level} {language === 'es' ? '¡Limpiado!' : 'Completed!'}</h2>
              <p className="text-xs text-theme-secondary">
                {language === 'es' ? 'El sector ahora luce limpio gracias a tu labor ecológica.' : 'The area looks cleaner thanks to your environmental work.'}
              </p>

              <div className="bg-theme-surface p-3 rounded-2xl border border-theme text-xs font-bold text-amber-400 flex items-center justify-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-amber-400" />
                <span>+15 {t.coins} • +35 XP</span>
              </div>

              <button
                onClick={handleNextLevel}
                className="w-full py-3 rounded-xl bg-theme-accent hover:opacity-90 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-md border border-theme-accent"
              >
                <span>{language === 'es' ? 'Siguiente Nivel' : 'Next Level'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GAME FINISHED MODAL */}
      <AnimatePresence>
        {gameFinished && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 select-none"
          >
            <div className="glass-card border border-theme-accent/60 rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-theme-glow">
              <div className="w-12 h-12 rounded-2xl bg-theme-accent/20 border border-theme-accent/40 flex items-center justify-center mx-auto text-theme-accent">
                <Crown className="w-6 h-6 text-amber-400" />
              </div>
              <h2 className="text-xl font-black text-theme-accent">{language === 'es' ? '¡Misión Parque Completada!' : 'Park Cleaned!'}</h2>
              <p className="text-xs text-theme-secondary">
                {language === 'es' ? 'Has protegido la fauna, el río y las áreas verdes del Liceo Caucasia.' : 'You protected nature, water, and green areas.'}
              </p>

              <div className="bg-theme-surface rounded-2xl p-3 border border-theme space-y-2 text-xs">
                <div className="flex justify-between font-bold">
                  <span className="text-theme-muted">{t.score}:</span>
                  <span className="text-amber-400">{score} {t.points}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-theme-muted">{t.wasteSorted}:</span>
                  <span className="text-theme-accent">{totalClassified}</span>
                </div>
                <div className="flex justify-between font-bold pt-1.5 border-t border-theme">
                  <span className="text-theme-muted">{t.coins}:</span>
                  <span className="text-amber-300 flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5 text-amber-400" />
                    <span>+{coinsEarnedTotal + Math.floor(score / 15)}</span>
                    <span className="text-theme-muted">•</span>
                    <span>+{xpEarnedTotal + Math.floor(score / 10)} XP</span>
                  </span>
                </div>
              </div>

              <button
                onClick={handleFinishGame}
                className="w-full py-3 rounded-xl bg-theme-accent hover:opacity-90 text-white font-black text-xs uppercase tracking-wider shadow-md cursor-pointer border border-theme-accent"
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
