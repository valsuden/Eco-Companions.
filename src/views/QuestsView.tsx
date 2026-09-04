import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, QuestItem, QuestCategory, EducationalAchievement } from '../types';
import { sound } from '../utils/sound';
import { useI18n } from '../utils/i18n';
import { GuidedTour, TourStep } from '../components/GuidedTour';
import { 
  CheckCircle2, 
  Flame, 
  Trophy, 
  Coins, 
  Zap, 
  Sparkles, 
  Target, 
  Calendar, 
  Gamepad2, 
  Heart, 
  Award,
  Gift,
  Info
} from 'lucide-react';
import { EcoIcon } from '../components/EcoIcon';
import { INITIAL_ACHIEVEMENTS, getLocalizedAchievement } from '../data/ecoData';

interface QuestsViewProps {
  user: User;
  onClaimQuestReward: (questId: string, coins: number, xp: number) => void;
  onClaimAchievementReward: (achievementId: string, coins: number, xp: number) => void;
}

export const QuestsView: React.FC<QuestsViewProps> = ({
  user,
  onClaimQuestReward,
  onClaimAchievementReward,
}) => {
  const currentLang = user.language || 'en';
  const t = useI18n(currentLang);

  const [activeTab, setActiveTab] = useState<'quests' | 'achievements'>('quests');
  const [questCategory, setQuestCategory] = useState<QuestCategory | 'all'>('all');

  // Generate initial quests state based on user stats
  const initialQuests: QuestItem[] = [
    {
      id: 'quest_daily_feed',
      titleEs: 'Alimentación Ecológica',
      titleEn: 'Eco Feeding',
      descEs: 'Alimenta a tu mascota 1 vez con comida nutritiva.',
      descEn: 'Feed your pet once with nutritious food.',
      category: 'daily',
      progress: user.wasteStats.total > 0 ? 1 : 0,
      maxProgress: 1,
      rewardCoins: 50,
      rewardXp: 30,
      completed: user.wasteStats.total > 0,
      claimed: false,
      icon: 'Apple',
    },
    {
      id: 'quest_daily_sort',
      titleEs: 'Clasificador Diario',
      titleEn: 'Daily Waste Sorter',
      descEs: 'Clasifica al menos 5 residuos en los minijuegos o el santuario.',
      descEn: 'Sort at least 5 waste items in games or sanctuary.',
      category: 'daily',
      progress: Math.min(5, user.wasteStats.total),
      maxProgress: 5,
      rewardCoins: 80,
      rewardXp: 50,
      completed: user.wasteStats.total >= 5,
      claimed: false,
      icon: 'Recycle',
    },
    {
      id: 'quest_weekly_games',
      titleEs: 'Maestro de Minijuegos',
      titleEn: 'Minigame Master',
      descEs: 'Completa 3 partidas en cualquier minijuego ecológico.',
      descEn: 'Play 3 matches in any eco minigame.',
      category: 'weekly',
      progress: Math.min(3, user.gamesCompleted),
      maxProgress: 3,
      rewardCoins: 150,
      rewardXp: 100,
      completed: user.gamesCompleted >= 3,
      claimed: false,
      icon: 'Gamepad2',
    },
    {
      id: 'quest_pet_petting',
      titleEs: 'Afecto y Cariño',
      titleEn: 'Pet Affection',
      descEs: 'Mueve o mima a tu mascota para elevar su ánimo al máximo.',
      descEn: 'Pet your mascot to boost its mood.',
      category: 'pet',
      progress: user.petAffectionEnergy ? Math.min(10, Math.floor(user.petAffectionEnergy / 10)) : 5,
      maxProgress: 10,
      rewardCoins: 60,
      rewardXp: 40,
      completed: (user.petAffectionEnergy || 0) >= 50,
      claimed: false,
      icon: 'Heart',
    },
    {
      id: 'quest_special_streak',
      titleEs: 'Guardián del Liceo',
      titleEn: 'Liceo Guardian Streak',
      descEs: 'Mantén una racha de al menos 3 días consecutivos en Aeris.',
      descEn: 'Maintain at least a 3-day active streak in Aeris.',
      category: 'special',
      progress: Math.min(3, user.streak),
      maxProgress: 3,
      rewardCoins: 250,
      rewardXp: 200,
      completed: user.streak >= 3,
      claimed: false,
      icon: 'Flame',
    },
  ];

  const [quests, setQuests] = useState<QuestItem[]>(initialQuests);

  const filteredQuests = quests.filter((q) => {
    if (questCategory === 'all') return true;
    return q.category === questCategory;
  });

  // Calculate achievements
  const achievements: EducationalAchievement[] = INITIAL_ACHIEVEMENTS.map((ach) => {
    let progress = 0;
    if (ach.id === 'ach_first_game') {
      progress = user.gamesCompleted > 0 ? 1 : 0;
    } else if (ach.id === 'ach_sort_10') {
      progress = Math.min(10, user.wasteStats.total);
    } else if (ach.id === 'ach_sort_50') {
      progress = Math.min(50, user.wasteStats.total);
    } else if (ach.id === 'ach_sort_100') {
      progress = Math.min(100, user.wasteStats.total);
    } else if (ach.id === 'ach_park_clean') {
      progress = user.highScores.parkCleanup > 0 ? 1 : 0;
    } else if (ach.id === 'ach_combo_master') {
      progress = (user.highScores.fastSort > 300 || user.highScores.tetris > 300) ? 5 : 2;
    }

    const unlocked = progress >= ach.maxProgress;
    return { ...ach, progress, unlocked };
  });

  const [showTour, setShowTour] = useState(() => {
    try {
      return localStorage.getItem('caucasia_eco_tour_quests_tour') !== 'true';
    } catch {
      return false;
    }
  });

  const tourSteps: TourStep[] = [
    {
      id: 'step_quests_list',
      targetId: 'quests-tour-list',
      title: currentLang === 'es' ? 'Metas y Logros' : 'Quests & Achievements',
      description: currentLang === 'es' 
        ? 'Completa estas misiones para ganar XP y subir de nivel a tu mascota.' 
        : 'Complete these quests to earn XP and level up your pet.',
      icon: <Target className="w-5 h-5 text-emerald-400" />
    }
  ];

  const handleClaimQuest = (quest: QuestItem) => {
    if (!quest.completed || quest.claimed) return;
    sound.playQuestComplete();
    setQuests((prev) =>
      prev.map((q) => (q.id === quest.id ? { ...q, claimed: true } : q))
    );
    onClaimQuestReward(quest.id, quest.rewardCoins, quest.rewardXp);
  };

  return (
    <div className="w-full h-full overflow-y-auto p-4 sm:p-6 select-none bg-theme-primary text-theme-primary relative">
      <div className="max-w-4xl mx-auto space-y-6 pb-24 md:pb-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-theme pb-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-theme-accent text-white shadow-md">
                <Target className="w-6 h-6" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-theme-primary">
                {currentLang === 'es' ? 'Metas y Logros Ecológicos' : 'Eco Quests & Achievements'}
              </h1>
            </div>
            <p className="text-xs mt-1 text-theme-muted">
              {currentLang === 'es'
                ? 'Cumple desafíos diarios, mantén tu racha activa y reclama monedas e XP.'
                : 'Complete daily challenges, maintain your streak, and earn rewards.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Active Streak Badge */}
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl border border-rose-500/30 bg-rose-500/10 text-rose-400 font-extrabold text-xs shadow-md self-start sm:self-auto">
              <Flame className="w-5 h-5 fill-rose-500 animate-pulse" />
              <div>
                <span className="block text-[10px] uppercase text-rose-300 font-black">
                  {currentLang === 'es' ? 'Racha Activa' : 'Active Streak'}
                </span>
                <span className="text-sm">{user.streak} {currentLang === 'es' ? 'Días Seguidos' : 'Days Streak'}</span>
              </div>
            </div>

            {/* Help Button */}
            <button
              onClick={() => {
                sound.playClick();
                setShowTour(true);
              }}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-theme-accent text-xs font-bold transition-all cursor-pointer hover:opacity-85 glass-panel bg-theme-surface text-theme-accent self-start sm:self-auto h-full"
              title={currentLang === 'es' ? 'Ayuda' : 'Help'}
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div id="quests-tour-list" className="grid grid-cols-2 p-1.5 rounded-2xl glass-panel max-w-md mx-auto">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('quests');
            }}
            className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'quests'
                ? 'bg-theme-accent text-white shadow-theme-glow'
                : 'text-theme-secondary hover:text-theme-primary'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>{currentLang === 'es' ? 'Metas y Objetivos' : 'Quests & Goals'}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('achievements');
            }}
            className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'achievements'
                ? 'bg-theme-accent text-white shadow-theme-glow'
                : 'text-theme-secondary hover:text-theme-primary'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>{currentLang === 'es' ? 'Insignias y Logros' : 'Achievements'}</span>
          </button>
        </div>

        {/* TAB 1: QUESTS / METAS */}
        {activeTab === 'quests' && (
          <div className="space-y-4">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: currentLang === 'es' ? 'Todas' : 'All' },
                { id: 'daily', label: currentLang === 'es' ? 'Diarias' : 'Daily' },
                { id: 'weekly', label: currentLang === 'es' ? 'Semanales' : 'Weekly' },
                { id: 'pet', label: currentLang === 'es' ? 'Mascota' : 'Pet' },
                { id: 'special', label: currentLang === 'es' ? 'Especiales' : 'Special' },
              ].map((cat) => {
                const isSelected = questCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      sound.playClick();
                      setQuestCategory(cat.id as any);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-theme-accent text-white shadow-md scale-105'
                        : 'glass-panel text-theme-secondary hover:text-theme-primary'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Quests List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredQuests.map((quest) => {
                const percent = Math.min(100, Math.round((quest.progress / quest.maxProgress) * 100));

                return (
                  <motion.div
                    key={quest.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-4 rounded-3xl border transition-all glass-panel flex flex-col justify-between gap-3 ${
                      quest.completed && !quest.claimed
                        ? 'border-emerald-500/50 bg-emerald-500/10 shadow-theme-glow'
                        : 'border-theme bg-theme-surface'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-theme-primary border border-theme flex items-center justify-center shrink-0 text-theme-accent shadow-inner">
                        <EcoIcon name={quest.icon} className="w-6 h-6" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-xs font-black truncate text-theme-primary">
                            {currentLang === 'es' ? quest.titleEs : quest.titleEn}
                          </h3>
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-theme-primary text-theme-accent border border-theme">
                            {quest.category}
                          </span>
                        </div>

                        <p className="text-xs text-theme-muted mt-1 leading-snug">
                          {currentLang === 'es' ? quest.descEs : quest.descEn}
                        </p>

                        {/* Progress Bar */}
                        <div className="mt-3 space-y-1">
                          <div className="flex justify-between text-[10px] font-bold text-theme-muted">
                            <span>{currentLang === 'es' ? 'Progreso' : 'Progress'}</span>
                            <span>{quest.progress} / {quest.maxProgress} ({percent}%)</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-theme-primary border border-theme overflow-hidden">
                            <div
                              className="h-full rounded-full bg-theme-accent transition-all duration-500"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Reward Row */}
                    <div className="flex items-center justify-between pt-2 border-t border-theme">
                      <div className="flex items-center gap-3 text-xs font-extrabold">
                        <span className="flex items-center gap-1 text-amber-400">
                          <Coins className="w-4 h-4" />
                          +{quest.rewardCoins}
                        </span>
                        <span className="flex items-center gap-1 text-purple-400">
                          <Zap className="w-4 h-4" />
                          +{quest.rewardXp} XP
                        </span>
                      </div>

                      {quest.claimed ? (
                        <span className="flex items-center gap-1 text-xs font-black text-emerald-400">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{currentLang === 'es' ? 'Reclamado' : 'Claimed'}</span>
                        </span>
                      ) : quest.completed ? (
                        <button
                          onClick={() => handleClaimQuest(quest)}
                          className="px-4 py-2 rounded-xl text-xs font-black bg-amber-400 hover:bg-amber-300 text-slate-950 uppercase tracking-wider shadow-lg transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5"
                        >
                          <Gift className="w-4 h-4" />
                          <span>{currentLang === 'es' ? 'Reclamar' : 'Claim'}</span>
                        </button>
                      ) : (
                        <span className="text-[10px] font-bold text-theme-muted uppercase">
                          {currentLang === 'es' ? 'En Progreso' : 'In Progress'}
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: ACHIEVEMENTS / LOGROS */}
        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {achievements.map((ach) => {
              const localized = getLocalizedAchievement(ach, currentLang);
              const percent = Math.min(100, Math.round((ach.progress / ach.maxProgress) * 100));

              return (
                <div
                  key={ach.id}
                  className={`p-4 rounded-3xl border transition-all glass-panel flex flex-col justify-between gap-3 ${
                    ach.unlocked
                      ? 'border-amber-500/40 bg-amber-500/10 shadow-theme-glow text-theme-primary'
                      : 'border-theme bg-theme-surface text-theme-muted'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                        ach.unlocked
                          ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md'
                          : 'bg-theme-primary text-theme-muted border-theme'
                      }`}
                    >
                      <EcoIcon name={ach.icon} className="w-6 h-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h3 className="text-xs font-black truncate text-theme-primary">
                          {localized.title}
                        </h3>
                        {ach.unlocked && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                      </div>

                      <p className="text-xs text-theme-muted mt-1 leading-snug">
                        {localized.description}
                      </p>

                      {/* Progress */}
                      <div className="mt-3 space-y-1">
                        <div className="flex justify-between text-[10px] font-bold text-theme-muted">
                          <span>{currentLang === 'es' ? 'Progreso' : 'Progress'}</span>
                          <span>{ach.progress} / {ach.maxProgress}</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-theme-primary border border-theme overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              ach.unlocked ? 'bg-amber-400' : 'bg-theme-accent'
                            }`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-theme text-xs font-extrabold">
                    <span className="flex items-center gap-1.5 text-amber-400">
                      <Coins className="w-4 h-4" />
                      +{ach.rewardCoins}
                    </span>
                    <span className="flex items-center gap-1.5 text-purple-400">
                      <Zap className="w-4 h-4" />
                      +{ach.rewardXp} XP
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <GuidedTour
        tourId="quests_tour"
        isOpen={showTour}
        onClose={() => setShowTour(false)}
        steps={tourSteps}
        badgeText={currentLang === 'es' ? 'Metas' : 'Quests'}
        finishButtonText={currentLang === 'es' ? '¡Entendido!' : 'Got it!'}
        language={currentLang as 'es' | 'en'}
      />
    </div>
  );
};
