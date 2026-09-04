import React, { useState } from 'react';
import { User, PetInfo } from '../types';
import { getEnvironmentalTitle, INITIAL_ACHIEVEMENTS, getLocalizedAchievement } from '../data/ecoData';
import { EcoIcon } from '../components/EcoIcon';
import { 
  Trophy, 
  Flame, 
  Coins, 
  Gamepad2, 
  Recycle, 
  Award, 
  CheckCircle2, 
  Lock, 
  ShieldCheck, 
  Leaf, 
  Trash2, 
  Boxes, 
  Zap, 
  Trees, 
  Sparkles,
  BookOpen,
  User as UserIcon
} from 'lucide-react';
import { AerisLogo } from '../components/AerisLogo';
import { useI18n, getLocalizedTitleName } from '../utils/i18n';
import { GrowthJournal } from '../components/GrowthJournal';
import { sound } from '../utils/sound';

interface ProfileViewProps {
  user: User;
  petInfo: PetInfo;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user, petInfo }) => {
  const currentLang = user.language || 'en';
  const t = useI18n(currentLang);
  const currentTitle = getEnvironmentalTitle(user.level);
  const [activeTab, setActiveTab] = useState<'agent' | 'journal'>('agent');

  // Calculate achievements progress dynamically
  const achievements = INITIAL_ACHIEVEMENTS.map((ach) => {
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

  return (
    <div 
      className="w-full h-full overflow-y-auto p-4 sm:p-6 select-none bg-theme-primary text-theme-primary"
    >
      <div className="max-w-4xl mx-auto space-y-6 pb-20 md:pb-6">
        {/* Navigation Tabs (Resumen de Agente vs. Diario de Crecimiento) */}
        <div 
          id="profile-nav-tabs"
          className="flex items-center gap-2 p-1.5 rounded-2xl border border-theme glass-panel"
        >
          <button
            id="tab-agent-summary"
            onClick={() => { sound.playClick(); setActiveTab('agent'); }}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${activeTab === 'agent' ? 'bg-theme-accent text-white shadow-theme-glow' : 'text-theme-secondary hover:text-theme-primary'}`}
          >
            <UserIcon className="w-4 h-4" />
            <span>{t.agentSummaryTab}</span>
          </button>

          <button
            id="tab-growth-journal"
            onClick={() => { sound.playClick(); setActiveTab('journal'); }}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${activeTab === 'journal' ? 'bg-theme-accent text-white shadow-theme-glow' : 'text-theme-secondary hover:text-theme-primary'}`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{t.growthJournalTab}</span>
          </button>
        </div>

        {activeTab === 'journal' ? (
          <GrowthJournal user={user} petInfo={petInfo} />
        ) : (
          <>
            {/* Main Identity Card */}
        <div 
          className="glass-card border border-theme-accent rounded-3xl p-5 sm:p-6 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            {/* AERIS Division Badge */}
            <div 
              className="w-20 h-20 rounded-2xl border border-theme flex items-center justify-center p-2 shrink-0 shadow-inner overflow-hidden relative glass-panel bg-theme-primary"
            >
              <AerisLogo mode="monogram" size="md" showWordmark={false} showSubtitle={false} glow={false} />
            </div>

            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <h1 
                  className="text-xl sm:text-2xl font-black text-theme-primary"
                >
                  {user.name || (currentLang === 'es' ? 'Agente Eco' : 'Eco Agent')}
                </h1>
                <span 
                  className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${currentTitle.color} flex items-center gap-1`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{getLocalizedTitleName(currentTitle.title, currentLang)}</span>
                </span>
              </div>

              <p 
                className="text-xs font-semibold mt-1 flex items-center justify-center sm:justify-start gap-1 text-theme-accent"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>AERIS DIVISION • LICEO CAUCASIA</span>
              </p>

              <div className="flex items-center justify-center sm:justify-start gap-4 mt-3 text-xs font-bold">
                <div className="flex items-center gap-1.5 text-amber-400">
                  <Coins className="w-4 h-4 text-amber-400" />
                  <span>{user.coins} {t.coins}</span>
                </div>
                <div className="flex items-center gap-1.5 text-rose-400">
                  <Flame className="w-4 h-4 text-rose-500" />
                  <span>{t.streak}: {user.streak} {t.days}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Level Badge Box */}
          <div 
            className="border border-theme-accent bg-theme-primary glass-panel rounded-3xl p-4 flex flex-col items-center justify-center min-w-[130px] shadow-lg"
          >
            <span 
              className="text-[10px] font-black uppercase tracking-wider text-theme-accent"
            >
              {t.level}
            </span>
            <span 
              className="text-3xl font-black my-0.5 text-theme-primary"
            >
              {user.level}
            </span>
            <span 
              className="text-[11px] font-semibold tabular-nums text-theme-muted"
            >
              {user.xp} XP
            </span>
          </div>
        </div>

        {/* Waste Sorted Breakdown (Visual Cards) */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Recycle className="w-5 h-5 text-theme-accent" />
            <h2 
              className="text-sm font-black text-theme-primary"
            >
              {t.wasteBreakdown}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Orgánicos */}
            <div 
              className="glass-panel bg-emerald-500/10 border-emerald-500/30 rounded-2xl p-4 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <Leaf className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-black text-emerald-400">{t.organic}</span>
              </div>
              <div className="mt-3">
                <span className="text-2xl font-black text-theme-primary">{user.wasteStats.organic}</span>
                <p className="text-[10px] text-emerald-400/90 mt-0.5 font-medium">{currentLang === 'es' ? 'Compost & Abono' : 'Compost & Soil'}</p>
              </div>
            </div>

            {/* Reciclables */}
            <div 
              className="glass-panel bg-sky-500/10 border-sky-500/30 rounded-2xl p-4 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <Recycle className="w-5 h-5 text-sky-400" />
                <span className="text-xs font-black text-sky-400">{t.recyclable}</span>
              </div>
              <div className="mt-3">
                <span className="text-2xl font-black text-theme-primary">{user.wasteStats.recyclable}</span>
                <p className="text-[10px] text-sky-400/90 mt-0.5 font-medium">{currentLang === 'es' ? 'Plástico, Vidrio, Papel' : 'Plastic, Glass, Paper'}</p>
              </div>
            </div>

            {/* No Aprovechables */}
            <div 
              className="glass-panel border-theme rounded-2xl p-4 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <Trash2 className="w-5 h-5 text-theme-muted" />
                <span className="text-xs font-black text-theme-secondary">{t.nonUsable}</span>
              </div>
              <div className="mt-3">
                <span className="text-2xl font-black text-theme-primary">{user.wasteStats.nonUsable}</span>
                <p className="text-[10px] mt-0.5 font-medium text-theme-muted">{currentLang === 'es' ? 'Disposición Final' : 'Final Disposal'}</p>
              </div>
            </div>

            {/* Total General */}
            <div 
              className="glass-panel border-theme-accent rounded-2xl p-4 flex flex-col justify-between shadow-lg"
            >
              <div className="flex items-center justify-between">
                <Sparkles className="w-5 h-5 text-theme-accent" />
                <span className="text-xs font-black text-theme-accent">{t.totalSorted}</span>
              </div>
              <div className="mt-3">
                <span className="text-2xl font-black text-theme-primary">{user.wasteStats.total}</span>
                <p className="text-[10px] mt-0.5 font-bold text-theme-secondary">{t.positiveImpact}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Game Stats & Records */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* General Stats */}
          <div 
            className="glass-panel border-theme rounded-3xl p-5 space-y-3"
          >
            <h3 
              className="text-xs font-black uppercase tracking-wider flex items-center gap-2 text-theme-secondary"
            >
              <Gamepad2 className="w-4 h-4 text-theme-accent" /> {t.gameStats}
            </h3>

            <div className="space-y-2 text-xs">
              <div 
                className="flex justify-between py-2 border-b border-theme"
              >
                <span className="text-theme-secondary">{t.gamesPlayed}</span>
                <span className="font-bold text-theme-primary">{user.gamesCompleted}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-theme-secondary">{t.timePlayed}</span>
                <span className="font-bold text-theme-primary">{user.timePlayedMinutes} {t.minutes}</span>
              </div>
            </div>
          </div>

          {/* Records by Minigame */}
          <div 
            className="glass-panel border-theme rounded-3xl p-5 space-y-3"
          >
            <h3 
              className="text-xs font-black uppercase tracking-wider flex items-center gap-2 text-theme-secondary"
            >
              <Trophy className="w-4 h-4 text-amber-400" /> {t.highScores}
            </h3>

            <div className="space-y-2 text-xs">
              <div 
                className="flex justify-between items-center py-2 border-b border-theme"
              >
                <span className="font-semibold flex items-center gap-2 text-theme-primary">
                  <Boxes className="w-4 h-4 text-emerald-400" />
                  <span>{t.tetrisTitle}</span>
                </span>
                <span className="font-extrabold text-amber-400">{user.highScores.tetris} {t.points}</span>
              </div>
              <div 
                className="flex justify-between items-center py-2 border-b border-theme"
              >
                <span className="font-semibold flex items-center gap-2 text-theme-primary">
                  <Zap className="w-4 h-4 text-sky-400" />
                  <span>{t.fastSortTitle}</span>
                </span>
                <span className="font-extrabold text-amber-400">{user.highScores.fastSort} {t.points}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-semibold flex items-center gap-2 text-theme-primary">
                  <Trees className="w-4 h-4 text-teal-400" />
                  <span>{t.parkCleanupTitle}</span>
                </span>
                <span className="font-extrabold text-amber-400">{user.highScores.parkCleanup} {t.points}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Environmental Achievements */}
        <div 
          className="glass-panel border-theme rounded-3xl p-5 space-y-4"
        >
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h2 
              className="text-sm font-black text-theme-primary"
            >
              {t.achievementsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className={`p-3 rounded-2xl flex items-center gap-3 transition-colors glass-panel ${
                  ach.unlocked ? 'bg-theme-primary border-theme-accent text-theme-primary' : 'text-theme-muted border-theme'
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 glass-panel ${
                    ach.unlocked ? 'border-theme-accent text-theme-accent' : 'bg-theme-primary border-theme text-theme-muted'
                  }`}
                >
                  {ach.unlocked ? <EcoIcon name={ach.icon} className="w-6 h-6" /> : <Lock className="w-4 h-4 opacity-50" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 
                      className={`text-xs font-bold truncate ${ach.unlocked ? 'text-theme-accent' : 'text-theme-secondary'}`}
                    >
                      {getLocalizedAchievement(ach, currentLang).title}
                    </h4>
                    {ach.unlocked && <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-theme-accent" />}
                  </div>
                  <p 
                    className="text-[10px] line-clamp-1 mt-0.5 text-theme-muted"
                  >
                    {getLocalizedAchievement(ach, currentLang).description}
                  </p>

                  {/* Progress bar */}
                  <div 
                    className="w-full h-1.5 rounded-full overflow-hidden mt-1.5 bg-theme-primary border border-theme"
                  >
                    <div
                      className={`h-full rounded-full ${ach.unlocked ? 'bg-theme-accent' : 'bg-theme-muted'}`}
                      style={{ 
                        width: `${(ach.progress / ach.maxProgress) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
          </>
        )}
      </div>
    </div>
  );
};
