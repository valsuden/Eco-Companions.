import { useState } from 'react';
import { motion } from 'motion/react';
import { User } from '../types';
import { TetrisGame } from '../components/games/TetrisGame';
import { FastSortGame } from '../components/games/FastSortGame';
import { ParkCleanupGame } from '../components/games/ParkCleanupGame';
import { Gamepad2, Sparkles, Trophy, Play, BookOpen, Boxes, Zap, Trees, Leaf, Recycle, Trash2, Coins, HelpCircle } from 'lucide-react';
import { sound } from '../utils/sound';
import { useI18n } from '../utils/i18n';
import { GuidedTour, TourStep } from '../components/GuidedTour';

interface GamesViewProps {
  user: User;
  onUpdateGameResults: (
    gameType: 'tetris' | 'fastSort' | 'parkCleanup',
    score: number,
    coinsEarned: number,
    xpEarned: number,
    wasteSortedCount: number
  ) => void;
}

export function GamesView({ user, onUpdateGameResults }: GamesViewProps) {
  const [activeGame, setActiveGame] = useState<'none' | 'tetris' | 'fastSort' | 'parkCleanup'>('none');
  const [showTour, setShowTour] = useState(() => {
    try {
      return localStorage.getItem('caucasia_eco_tour_games_tour') !== 'true';
    } catch {
      return false;
    }
  });
  const t = useI18n(user.language || 'en');

  const tourSteps: TourStep[] = [
    {
      id: 'step_rewards',
      targetId: 'games-tour-rewards',
      title: t.gamesTourStep1Title,
      description: t.gamesTourStep1Desc,
      icon: <Coins className="w-5 h-5 text-amber-400" />,
    },
    {
      id: 'step_cards',
      targetId: 'games-tour-cards',
      title: t.gamesTourStep2Title,
      description: t.gamesTourStep2Desc,
      icon: <Trophy className="w-5 h-5 text-sky-400" />,
    },
    {
      id: 'step_bins',
      targetId: 'games-tour-guide',
      title: t.gamesTourStep3Title,
      description: t.gamesTourStep3Desc,
      icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
    },
  ];

  if (activeGame === 'tetris') {
    return (
      <TetrisGame
        language={user.language || 'en'}
        onBack={() => setActiveGame('none')}
        onFinish={(score, coins, xp, count) => {
          onUpdateGameResults('tetris', score, coins, xp, count);
          setActiveGame('none');
        }}
      />
    );
  }

  if (activeGame === 'fastSort') {
    return (
      <FastSortGame
        language={user.language || 'en'}
        onBack={() => setActiveGame('none')}
        onFinish={(score, coins, xp, count) => {
          onUpdateGameResults('fastSort', score, coins, xp, count);
          setActiveGame('none');
        }}
      />
    );
  }

  if (activeGame === 'parkCleanup') {
    return (
      <ParkCleanupGame
        language={user.language || 'en'}
        onBack={() => setActiveGame('none')}
        onFinish={(score, coins, xp, count) => {
          onUpdateGameResults('parkCleanup', score, coins, xp, count);
          setActiveGame('none');
        }}
      />
    );
  }

  return (
    <div 
      className="w-full h-full overflow-y-auto p-4 sm:p-6 select-none bg-theme-primary text-theme-primary"
    >
      <div className="max-w-4xl mx-auto space-y-6 pb-20 md:pb-6">
        {/* Header */}
        <div 
          id="games-tour-rewards"
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-theme pb-4"
        >
          <div>
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-6 h-6 text-theme-accent" />
              <h1 className="text-xl sm:text-2xl font-black text-theme-primary">
                {t.gamesHubTitle}
              </h1>
            </div>
            <p className="text-xs mt-1 text-theme-muted">
              {t.gamesHubSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* Guided Tour Replay Button */}
            <button
              id="btn-games-tour"
              onClick={() => {
                sound.playClick();
                setShowTour(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-theme-accent text-xs font-bold transition-all cursor-pointer hover:opacity-85 glass-panel bg-theme-surface text-theme-accent"
              title={t.tourHelpBtnGames}
            >
              <HelpCircle className="w-4 h-4" />
              <span className="text-[11px] font-extrabold">{t.tourHelpBtnGames}</span>
            </button>

            <div 
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-theme text-xs font-bold glass-panel bg-theme-surface text-theme-accent"
            >
              <Sparkles className="w-4 h-4 text-theme-accent" />
              <span>{t.totalWasteSorted}: {user.wasteStats.total}</span>
            </div>
          </div>
        </div>

        {/* 3 Games Cards Grid */}
        <div id="games-tour-cards" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* GAME 1: WASTE TETRIS */}
          <motion.div
            whileHover={{ y: -4 }}
            className="border rounded-3xl p-5 flex flex-col justify-between shadow-xl transition-all relative overflow-hidden group glass-panel bg-theme-surface border-emerald-500/30"
          >
            <div className="space-y-3 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
                <Boxes className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/60">
                  {t.tetrisTag}
                </span>
                <h3 className="text-lg font-black mt-1.5 text-theme-primary">{t.tetrisTitle}</h3>
                <p className="text-xs leading-relaxed mt-1 text-theme-muted">
                  {t.tetrisDesc}
                </p>
              </div>

              {/* Highscore */}
              <div 
                className="rounded-xl p-2.5 border border-theme flex items-center justify-between text-xs glass-panel bg-theme-primary"
              >
                <span className="font-semibold flex items-center gap-1.5 text-theme-secondary">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" /> {t.bestScore}:
                </span>
                <span className="font-extrabold text-amber-400">{user.highScores.tetris} {t.points}</span>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setActiveGame('tetris');
              }}
              className="mt-5 w-full py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform cursor-pointer"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>{t.playGame}</span>
            </button>
          </motion.div>

          {/* GAME 2: FAST SORT */}
          <motion.div
            whileHover={{ y: -4 }}
            className="border rounded-3xl p-5 flex flex-col justify-between shadow-xl transition-all relative overflow-hidden group glass-panel bg-theme-surface border-sky-500/30"
          >
            <div className="space-y-3 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-inner">
                <Zap className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded-full border border-sky-800/60">
                  {t.fastSortTag}
                </span>
                <h3 className="text-lg font-black mt-1.5 text-theme-primary">{t.fastSortTitle}</h3>
                <p className="text-xs leading-relaxed mt-1 text-theme-muted">
                  {t.fastSortDesc}
                </p>
              </div>

              {/* Highscore */}
              <div 
                className="rounded-xl p-2.5 border border-theme flex items-center justify-between text-xs glass-panel bg-theme-primary"
              >
                <span className="font-semibold flex items-center gap-1.5 text-theme-secondary">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" /> {t.bestScore}:
                </span>
                <span className="font-extrabold text-amber-400">{user.highScores.fastSort} {t.points}</span>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setActiveGame('fastSort');
              }}
              className="mt-5 w-full py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-400 active:scale-95 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform cursor-pointer"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>{t.playGame}</span>
            </button>
          </motion.div>

          {/* GAME 3: PARK CLEANUP */}
          <motion.div
            whileHover={{ y: -4 }}
            className="border rounded-3xl p-5 flex flex-col justify-between shadow-xl transition-all relative overflow-hidden group glass-panel bg-theme-surface border-teal-500/30"
          >
            <div className="space-y-3 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 shadow-inner">
                <Sparkles className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-400 bg-teal-950/60 px-2 py-0.5 rounded-full border border-teal-800/60">
                  {t.parkCleanupTag}
                </span>
                <h3 className="text-lg font-black mt-1.5 text-theme-primary">{t.parkCleanupTitle}</h3>
                <p className="text-xs leading-relaxed mt-1 text-theme-muted">
                  {t.parkCleanupDesc}
                </p>
              </div>

              {/* Highscore */}
              <div 
                className="rounded-xl p-2.5 border border-theme flex items-center justify-between text-xs glass-panel bg-theme-primary"
              >
                <span className="font-semibold flex items-center gap-1.5 text-theme-secondary">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" /> {t.bestScore}:
                </span>
                <span className="font-extrabold text-amber-400">{user.highScores.parkCleanup} {t.points}</span>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setActiveGame('parkCleanup');
              }}
              className="mt-5 w-full py-2.5 rounded-2xl bg-teal-500 hover:bg-teal-400 active:scale-95 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform cursor-pointer"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>{t.playGame}</span>
            </button>
          </motion.div>
        </div>

        {/* Educational Waste Guide Section */}
        <div 
          id="games-tour-guide"
          className="border border-theme rounded-3xl p-5 space-y-4 glass-panel bg-theme-surface shadow-sm"
        >
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-theme-accent" />
            <h2 className="text-sm font-black text-theme-primary">{t.quickBinInfoTitle}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div 
              className="p-3.5 rounded-2xl space-y-1.5 border border-emerald-500/20 bg-emerald-500/10"
            >
              <div className="font-bold text-emerald-500 flex items-center gap-2">
                <Leaf className="w-4 h-4" />
                <span>{t.greenBin} ({t.organic})</span>
              </div>
              <p className="text-[11px] leading-relaxed text-theme-secondary">
                {t.organicDesc}
              </p>
            </div>

            <div 
              className="p-3.5 rounded-2xl space-y-1.5 border border-sky-500/20 bg-sky-500/10"
            >
              <div className="font-bold text-sky-400 flex items-center gap-2">
                <Recycle className="w-4 h-4" />
                <span>{t.whiteBin} ({t.recyclable})</span>
              </div>
              <p className="text-[11px] leading-relaxed text-theme-secondary">
                {t.recyclableDesc}
              </p>
            </div>

            <div 
              className="p-3.5 rounded-2xl space-y-1.5 border border-slate-500/20 bg-slate-500/10"
            >
              <div className="font-bold text-slate-400 flex items-center gap-2">
                <Trash2 className="w-4 h-4 text-slate-400" />
                <span>{t.blackBin} ({t.nonUsable})</span>
              </div>
              <p className="text-[11px] leading-relaxed text-theme-secondary">
                {t.nonUsableDesc}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Onboarding Guided Tour */}
      <GuidedTour
        tourId="games_tour"
        isOpen={showTour}
        onClose={() => setShowTour(false)}
        steps={tourSteps}
        badgeText={t.gamesTourBadge}
        finishButtonText={t.tourFinishGames}
        language={user.language || 'en'}
      />
    </div>
  );
}
