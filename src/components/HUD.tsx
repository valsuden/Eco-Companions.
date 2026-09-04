import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Stats } from '../types';
import { getEnvironmentalTitle } from '../data/ecoData';
import { Flame, Coins, Heart, Zap, Check, Utensils, Sparkles, Bell, Volume2, VolumeX } from 'lucide-react';
import { useI18n, getLocalizedTitleName } from '../utils/i18n';
import { sound } from '../utils/sound';

interface HUDProps {
  user: User;
  stats: Stats;
  onOpenDailyReward?: () => void;
  onOpenNotifications?: () => void;
  unreadNotificationsCount?: number;
  onUpdateUser?: (updates: Partial<User>) => void;
}

export const HUD: React.FC<HUDProps> = ({ 
  user, 
  stats, 
  onOpenDailyReward, 
  onOpenNotifications,
  unreadNotificationsCount = 0,
  onUpdateUser 
}) => {
  const currentLang = user.language || 'en';
  const t = useI18n(currentLang);
  const currentTitle = getEnvironmentalTitle(user.level);

  const prevXpRef = useRef(user.xp);
  const [xpGainedNotification, setXpGainedNotification] = useState<{ id: number; amount: number } | null>(null);

  const getXpForLevel = (lvl: number) => {
    if (lvl === 1) return 100;
    if (lvl === 2) return 250;
    if (lvl === 3) return 500;
    if (lvl === 4) return 850;
    if (lvl === 5) return 1300;
    return lvl * 300;
  };

  const currentLevelMaxXp = getXpForLevel(user.level);
  const prevLevelXp = user.level > 1 ? getXpForLevel(user.level - 1) : 0;
  const xpInCurrentLevel = Math.max(0, user.xp - prevLevelXp);
  const xpNeededInCurrentLevel = Math.max(1, currentLevelMaxXp - prevLevelXp);
  const xpPercent = Math.min(100, Math.max(0, (xpInCurrentLevel / xpNeededInCurrentLevel) * 100));

  useEffect(() => {
    if (user.xp > prevXpRef.current) {
      const diff = user.xp - prevXpRef.current;
      setXpGainedNotification({ id: Date.now(), amount: diff });
      const notifyTimer = setTimeout(() => {
        setXpGainedNotification(null);
      }, 1600);
      prevXpRef.current = user.xp;
      return () => clearTimeout(notifyTimer);
    }
    prevXpRef.current = user.xp;
  }, [user.xp]);

  const streakTier = user.streak >= 7 ? 'x2.0' : user.streak >= 3 ? 'x1.5' : 'x1.0';

  return (
    <header
      id="eco-game-hud"
      className="w-full px-4 py-2.5 select-none z-30 shrink-0 border-b flex flex-col md:flex-row items-center justify-between gap-3 transition-colors duration-200"
      style={{
        backgroundColor: 'var(--hud-bg)',
        borderColor: 'var(--border)',
        color: 'var(--text-primary)',
      }}
    >
      {/* Left side: Level, Name, Title, XP Bar */}
      <div className="flex items-center gap-3 w-full md:w-auto md:min-w-[360px]">
        {/* Level Circle */}
        <div className="relative">
          <div 
            className="w-10 h-10 rounded-2xl flex flex-col items-center justify-center border shadow-sm"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border-accent)',
            }}
          >
            <span className="text-[6.5px] font-extrabold uppercase tracking-widest leading-none" style={{ color: 'var(--accent)' }}>LVL</span>
            <span className="text-xs font-black leading-none mt-0.5" style={{ color: 'var(--text-primary)' }}>{user.level}</span>
          </div>
          <div 
            className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center border shadow-sm"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
            }}
          >
            <Check className="w-2.5 h-2.5 text-emerald-500" />
          </div>
        </div>

        {/* User Info & XP Bar */}
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 relative">
            <span className="font-bold text-xs truncate" style={{ color: 'var(--text-primary)' }}>
              {user.name || 'elias'}
            </span>
            <span 
              className="text-[8px] px-2 py-0.5 rounded-full font-bold border"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
                color: 'var(--text-secondary)',
              }}
            >
              {getLocalizedTitleName(currentTitle.title, currentLang)}
            </span>

            {/* Floating +XP Pill */}
            <AnimatePresence>
              {xpGainedNotification && (
                <motion.div
                  key={xpGainedNotification.id}
                  initial={{ opacity: 0, y: 0, scale: 0.7 }}
                  animate={{ opacity: 1, y: -15, scale: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute -top-3 right-0 pointer-events-none z-40 px-1.5 py-0.5 rounded-full font-black text-[8px] shadow-sm flex items-center gap-0.5 bg-emerald-500 text-white"
                >
                  <Zap className="w-2.5 h-2.5 fill-white" />
                  <span>+{xpGainedNotification.amount}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2 w-full">
            <div 
              className="flex-1 h-1.5 rounded-full overflow-hidden"
              style={{ backgroundColor: 'var(--border)' }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: 'var(--accent)' }}
                initial={{ width: 0 }}
                animate={{ width: `${xpPercent}%` }}
                transition={{ type: 'spring', stiffness: 70, damping: 15 }}
              />
            </div>
            <span className="text-[8px] font-bold shrink-0" style={{ color: 'var(--text-muted)' }}>
              {xpInCurrentLevel}/{xpNeededInCurrentLevel} XP ({Math.round(xpPercent)}%)
            </span>
          </div>
        </div>
      </div>

      {/* Right side: Pills (Notification Bell, Sound, Streak, Sync, Language, Coins, Resources) */}
      <div className="flex flex-wrap items-center gap-2 md:gap-2.5 w-full md:w-auto justify-start md:justify-end">
        {/* Notifications Bell */}
        {onOpenNotifications && (
          <button
            onClick={() => {
              sound.playClick();
              onOpenNotifications();
            }}
            className="relative flex items-center justify-center w-8 h-8 rounded-xl border transition-all cursor-pointer shadow-sm active:scale-95"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)',
            }}
            title={currentLang === 'es' ? 'Notificaciones' : 'Notifications'}
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-black text-[9px] flex items-center justify-center animate-pulse shadow-sm">
                {unreadNotificationsCount}
              </span>
            )}
          </button>
        )}

        {/* Sound Toggle */}
        <button
          onClick={() => {
            const nextSound = !user.soundEnabled;
            sound.setEnabled(nextSound);
            if (onUpdateUser) onUpdateUser({ soundEnabled: nextSound });
          }}
          className="flex items-center justify-center w-8 h-8 rounded-xl border transition-all cursor-pointer shadow-sm active:scale-95"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
            color: user.soundEnabled ? 'var(--accent)' : 'var(--text-muted)',
          }}
          title={user.soundEnabled ? 'Silenciar sonidos' : 'Activar sonidos'}
        >
          {user.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 opacity-50" />}
        </button>

        {/* Streak Pill */}
        <button
          onClick={() => {
            sound.playClick();
            if (onOpenDailyReward) onOpenDailyReward();
          }}
          className="flex items-center gap-1 px-2.5 py-1 rounded-xl border text-[9px] font-bold transition-all cursor-pointer shadow-sm active:scale-95"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'rgba(249, 115, 22, 0.4)',
            color: '#f97316',
          }}
        >
          <Flame className="w-3.5 h-3.5 fill-[#f97316]" />
          <span>STREAK <span className="font-extrabold">{streakTier}</span></span>
          <span className="text-[8px] ml-0.5">{user.streak}d</span>
        </button>

        {/* Synced Pill */}
        <div 
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-[8.5px] font-bold shadow-sm"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
            color: 'var(--text-secondary)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Synced
        </div>

        {/* Language Selector Pill */}
        <button
          onClick={() => {
            sound.playClick();
            if (onUpdateUser) onUpdateUser({ language: currentLang === 'es' ? 'en' : 'es' });
          }}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-[8.5px] font-bold shadow-sm transition-all cursor-pointer active:scale-95 uppercase"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
            color: 'var(--text-primary)',
          }}
        >
          <span>{currentLang === 'es' ? 'ES ESPAÑOL' : 'EN ENGLISH'}</span>
        </button>

        {/* Coins Pill */}
        <div 
          className="flex items-center gap-1 px-2.5 py-1 rounded-xl border text-[9px] font-bold shadow-sm"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'rgba(234, 179, 8, 0.4)',
            color: '#eab308',
          }}
        >
          <Coins className="w-3 h-3 text-amber-400" />
          <span>{user.coins}</span>
        </div>

        {/* Resource Gauges Group */}
        <div 
          className="flex items-center gap-2 px-2 py-1 rounded-xl border shadow-sm"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
          }}
        >
          {/* Food / Hunger */}
          <div 
            className="flex items-center gap-1 cursor-help"
            title={`${t.hunger || 'Hambre'}: ${Math.round(stats.hunger)}%`}
          >
            <Utensils className="w-3 h-3 text-emerald-500" />
            <div className="w-5 sm:w-6 h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
              <div className="h-full bg-emerald-500" style={{ width: `${stats.hunger}%` }} />
            </div>
            <span className="text-[7.5px] font-bold" style={{ color: 'var(--text-muted)' }}>{Math.round(stats.hunger)}%</span>
          </div>
          
          <div className="w-px h-3" style={{ backgroundColor: 'var(--border)' }} />

          {/* Cleanliness / Hygiene (Limpieza) */}
          <div 
            className="flex items-center gap-1 cursor-help"
            title={`${t.hygiene || 'Limpieza'}: ${Math.round(stats.hygiene)}%`}
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <div className="w-5 sm:w-6 h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
              <div className="h-full bg-cyan-400" style={{ width: `${stats.hygiene}%` }} />
            </div>
            <span className="text-[7.5px] font-bold" style={{ color: 'var(--text-muted)' }}>{Math.round(stats.hygiene)}%</span>
          </div>

          <div className="w-px h-3" style={{ backgroundColor: 'var(--border)' }} />

          {/* Heart (Mood) */}
          <div 
            className="flex items-center gap-1 cursor-help"
            title={`${t.mood || 'Ánimo'}: ${Math.round(stats.mood)}%`}
          >
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            <div className="w-5 sm:w-6 h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
              <div className="h-full bg-rose-500" style={{ width: `${stats.mood}%` }} />
            </div>
            <span className="text-[7.5px] font-bold" style={{ color: 'var(--text-muted)' }}>{Math.round(stats.mood)}%</span>
          </div>

          <div className="w-px h-3" style={{ backgroundColor: 'var(--border)' }} />

          {/* Energy */}
          <div 
            className="flex items-center gap-1 cursor-help"
            title={`${t.energy || 'Energía'}: ${Math.round(stats.energy)}%`}
          >
            <Zap className="w-3 h-3 text-sky-500 fill-sky-500" />
            <div className="w-5 sm:w-6 h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
              <div className="h-full bg-sky-500" style={{ width: `${stats.energy}%` }} />
            </div>
            <span className="text-[7.5px] font-bold" style={{ color: 'var(--text-muted)' }}>{Math.round(stats.energy)}%</span>
          </div>
        </div>
      </div>
    </header>
  );
};
