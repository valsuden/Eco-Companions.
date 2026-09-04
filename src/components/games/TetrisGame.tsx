import React, { useState, useEffect, useCallback } from 'react';
import { WasteItem, WasteCategory, Language } from '../../types';
import { WASTE_ITEMS, getLocalizedWasteItem } from '../../data/ecoData';
import { EcoIcon } from '../EcoIcon';
import { sound } from '../../utils/sound';
import { ArrowLeft, ArrowRight, ArrowDown, Trophy, Zap, Heart, Flame, Leaf, Recycle, Trash2, Coins } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useI18n } from '../../utils/i18n';

interface TetrisGameProps {
  language?: Language;
  onBack: () => void;
  onFinish: (score: number, coins: number, xp: number, classifiedCount: number) => void;
}

interface FallingItem {
  id: string;
  waste: WasteItem;
  col: number; // 0 (Verde - Orgánico), 1 (Azul - Reciclable), 2 (Negro - No aprovechable)
  y: number;   // 0 to 100%
  speed: number;
}

export const TetrisGame: React.FC<TetrisGameProps> = ({ language = 'en', onBack, onFinish }) => {
  const t = useI18n(language);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [classifiedCount, setClassifiedCount] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState<{ text: string; correct: boolean } | null>(null);

  const LANES: { id: WasteCategory; label: string; binName: string; icon: typeof Leaf; color: string; bg: string; border: string; binColor: string }[] = [
    { id: 'organic', label: t.organic, binName: language === 'es' ? 'Verde' : 'Green', icon: Leaf, color: 'text-emerald-400', bg: 'bg-emerald-950/30', border: 'border-emerald-500/40', binColor: 'bg-emerald-950/80' },
    { id: 'recyclable', label: t.recyclable, binName: language === 'es' ? 'Blanca' : 'White', icon: Recycle, color: 'text-slate-200', bg: 'bg-slate-100/10', border: 'border-slate-300/40', binColor: 'bg-slate-200 text-slate-800' },
    { id: 'non_usable', label: t.nonUsable, binName: language === 'es' ? 'Negra' : 'Black', icon: Trash2, color: 'text-slate-400', bg: 'bg-slate-900/40', border: 'border-slate-700/60', binColor: 'bg-slate-900' },
  ];

  // Active falling piece
  const [activePiece, setActivePiece] = useState<FallingItem | null>(null);

  const getNextWaste = useCallback((): WasteItem => {
    return WASTE_ITEMS[Math.floor(Math.random() * WASTE_ITEMS.length)];
  }, []);

  const spawnPiece = useCallback(() => {
    const waste = getNextWaste();
    const speed = 0.5 + level * 0.15;
    setActivePiece({
      id: `piece_${Date.now()}`,
      waste,
      col: 1, // Start in middle lane
      y: 0,
      speed,
    });
  }, [getNextWaste, level]);

  useEffect(() => {
    spawnPiece();
  }, [spawnPiece]);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setActivePiece((prev) => {
        if (!prev) return null;
        const newY = prev.y + prev.speed * 1.6;

        if (newY >= 82) {
          const targetCategory = LANES[prev.col].id;
          const isCorrect = targetCategory === prev.waste.category;

          if (isCorrect) {
            sound.playCorrect();
            const newCombo = combo + 1;
            const comboMultiplier = newCombo >= 10 ? 3 : newCombo >= 5 ? 2 : 1;
            const pointsGained = (20 + level * 10) * comboMultiplier;

            setScore((s) => s + pointsGained);
            setCombo(newCombo);
            setMaxCombo((m) => Math.max(m, newCombo));
            setClassifiedCount((c) => c + 1);

            if (newCombo >= 5) {
              sound.playCombo(newCombo);
            }

            setFeedback({
              text: `+${pointsGained} ${t.correct}! ${comboMultiplier > 1 ? `COMBO x${comboMultiplier}` : ''}`,
              correct: true,
            });

            if ((classifiedCount + 1) % 6 === 0) {
              setLevel((lvl) => lvl + 1);
              sound.playLevelUp();
            }
          } else {
            sound.playWrong();
            setCombo(0);
            setLives((l) => {
              const newLives = l - 1;
              if (newLives <= 0) {
                setGameOver(true);
              }
              return newLives;
            });
            setFeedback({
              text: `${t.wrong}!`,
              correct: false,
            });
          }

          setTimeout(() => setFeedback(null), 1200);
          spawnPiece();
          return null;
        }

        return { ...prev, y: newY };
      });
    }, 33);

    return () => clearInterval(interval);
  }, [gameOver, combo, level, classifiedCount, spawnPiece, t]);

  const moveLeft = useCallback(() => {
    setActivePiece((prev) => {
      if (!prev || prev.col <= 0) return prev;
      sound.playClick();
      return { ...prev, col: prev.col - 1 };
    });
  }, []);

  const moveRight = useCallback(() => {
    setActivePiece((prev) => {
      if (!prev || prev.col >= 2) return prev;
      sound.playClick();
      return { ...prev, col: prev.col + 1 };
    });
  }, []);

  const dropFast = useCallback(() => {
    setActivePiece((prev) => {
      if (!prev) return prev;
      sound.playClick();
      return { ...prev, speed: prev.speed + 2.5 };
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        moveLeft();
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        moveRight();
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S' || e.key === ' ') {
        dropFast();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver, moveLeft, moveRight, dropFast]);

  useEffect(() => {
    if (gameOver) {
      sound.playSparkle();
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }
  }, [gameOver]);

  const handleFinish = () => {
    const coinsEarned = Math.max(5, Math.floor(score / 15) + classifiedCount * 2);
    const xpEarned = Math.max(15, Math.floor(score / 10) + classifiedCount * 4);
    onFinish(score, coinsEarned, xpEarned, classifiedCount);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between bg-slate-950 text-white p-3 sm:p-5 select-none relative overflow-hidden ">
      {/* Top Game Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-bold text-slate-300 cursor-pointer border border-slate-700/60"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.exit}</span>
        </button>

        <div className="flex items-center gap-4 text-xs font-bold">
          <div className="flex items-center gap-1 text-amber-400">
            <Trophy className="w-4 h-4" />
            <span>{score} {t.points}</span>
          </div>

          <div className="flex items-center gap-1 text-cyan-400">
            <Zap className="w-4 h-4" />
            <span>{t.level.toUpperCase()} {level}</span>
          </div>

          <div className="flex items-center gap-1.5 text-rose-400">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>x{lives}</span>
          </div>
        </div>
      </div>

      {/* Main Tetris Grid (3 Bins Columns) */}
      <div className="flex-1 max-w-lg mx-auto w-full my-2 relative bg-slate-900/90 rounded-2xl border border-slate-800 flex overflow-hidden shadow-2xl backdrop-blur-md">
        {/* Combo badge */}
        {combo >= 2 && (
          <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 px-2.5 py-1 rounded-full text-xs font-black shadow-lg z-30 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 fill-slate-950" />
            <span>COMBO x{combo >= 10 ? '3' : combo >= 5 ? '2' : '1.5'}</span>
          </div>
        )}

        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`absolute top-4 left-1/2 -translate-x-1/2 z-40 px-4 py-1.5 rounded-full text-xs font-extrabold shadow-lg border ${
              feedback.correct
                ? 'bg-emerald-950/95 text-emerald-300 border-emerald-500/60'
                : 'bg-rose-950/95 text-rose-300 border-rose-500/60'
            }`}
          >
            {feedback.text}
          </div>
        )}

        {/* 3 Columns */}
        {LANES.map((lane, index) => {
          const LaneIcon = lane.icon;
          return (
            <div
              key={lane.id}
              onClick={() => {
                if (activePiece) {
                  sound.playClick();
                  setActivePiece((prev) => (prev ? { ...prev, col: index } : null));
                }
              }}
              className={`flex-1 h-full border-r last:border-r-0 border-slate-800/80 ${lane.bg} relative flex flex-col justify-between p-2 cursor-pointer transition-colors hover:bg-slate-800/40`}
            >
              {/* Top Lane Header */}
              <div className="text-center pt-2">
                <span className={`text-[11px] font-black uppercase flex items-center justify-center gap-1.5 ${lane.color}`}>
                  <LaneIcon className="w-3.5 h-3.5" />
                  <span>{lane.label}</span>
                </span>
              </div>

              {/* Bottom Target Bin */}
              <div
                className={`w-full py-3.5 rounded-xl ${lane.binColor} border ${lane.border} flex flex-col items-center justify-center text-white shadow-md`}
              >
                <LaneIcon className={`w-6 h-6 ${lane.color}`} />
                <span className="text-[10px] font-black uppercase mt-1 tracking-wider">
                  {lane.binName}
                </span>
              </div>
            </div>
          );
        })}

        {/* Falling Waste Item */}
        {activePiece && (
          <div
            style={{
              left: `${(activePiece.col * 100) / 3}%`,
              width: `${100 / 3}%`,
              top: `${activePiece.y}%`,
            }}
            className="absolute flex flex-col items-center pointer-events-none z-20 transition-all duration-75"
          >
            <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-slate-800/90 border border-cyan-400/50 flex flex-col items-center justify-center shadow-xl backdrop-blur-md">
              <EcoIcon name={activePiece.waste.icon} className="w-7 h-7" />
            </div>
            <div className="mt-1 px-2 py-0.5 bg-slate-950/90 rounded-md text-[10px] font-bold text-slate-200 text-center truncate max-w-[90%] border border-slate-700">
              {getLocalizedWasteItem(activePiece.waste, language).name}
            </div>
          </div>
        )}
      </div>

      {/* Touch & Click Controls */}
      <div className="max-w-lg mx-auto w-full flex items-center justify-between gap-3 pb-2">
        <button
          onClick={moveLeft}
          className="flex-1 py-3.5 bg-slate-800/90 hover:bg-slate-700 active:scale-95 rounded-2xl font-black text-xs uppercase flex items-center justify-center gap-1.5 border border-slate-700 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400" />
          <span>{t.left}</span>
        </button>

        <button
          onClick={dropFast}
          className="flex-1 py-3.5 bg-cyan-600 hover:bg-cyan-500 active:scale-95 text-slate-950 rounded-2xl font-black text-xs uppercase flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-950/40 cursor-pointer border border-cyan-400/30"
        >
          <ArrowDown className="w-4 h-4" />
          <span>{t.dropFast}</span>
        </button>

        <button
          onClick={moveRight}
          className="flex-1 py-3.5 bg-slate-800/90 hover:bg-slate-700 active:scale-95 rounded-2xl font-black text-xs uppercase flex items-center justify-center gap-1.5 border border-slate-700 cursor-pointer"
        >
          <span>{t.right}</span>
          <ArrowRight className="w-4 h-4 text-cyan-400" />
        </button>
      </div>

      {/* Game Over Modal */}
      {gameOver && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 z-50 select-none">
          <div className="max-w-sm w-full bg-slate-900 border border-cyan-500/50 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
              <Trophy className="w-8 h-8 text-amber-400" />
            </div>
            <h3 className="text-xl font-black text-slate-100">{t.gameOver}</h3>
            <p className="text-xs text-slate-400">
              {language === 'es' ? 'Gran trabajo clasificando los residuos del Liceo Caucasia.' : 'Great job sorting waste and protecting the environment.'}
            </p>

            <div className="grid grid-cols-2 gap-2 bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 block">{t.score}</span>
                <span className="font-black text-amber-400 text-sm">{score} {t.points}</span>
              </div>
              <div>
                <span className="text-slate-500 block">{t.wasteSorted}</span>
                <span className="font-black text-cyan-400 text-sm">{classifiedCount}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Max Combo</span>
                <span className="font-black text-rose-400 text-sm">{maxCombo}x</span>
              </div>
              <div>
                <span className="text-slate-500 block">{t.coins}</span>
                <span className="font-black text-emerald-400 text-sm flex items-center justify-center gap-1">
                  <Coins className="w-3.5 h-3.5 text-amber-400" />
                  <span>+{Math.max(5, Math.floor(score / 15) + classifiedCount * 2)}</span>
                </span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg cursor-pointer"
            >
              {t.claimReward}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
