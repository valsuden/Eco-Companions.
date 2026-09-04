import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppNotification } from '../types';
import { sound } from '../utils/sound';
import { 
  Bell, 
  X, 
  CheckCircle2, 
  Trophy, 
  Sparkles, 
  Heart, 
  ShoppingBag, 
  Info,
  Coins,
  Zap,
  Trash2
} from 'lucide-react';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
  onClaimReward?: (notification: AppNotification) => void;
  language?: 'es' | 'en';
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onClearAll,
  onClaimReward,
  language = 'es',
}) => {
  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'quest':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'achievement':
        return <Trophy className="w-5 h-5 text-amber-400" />;
      case 'level':
        return <Sparkles className="w-5 h-5 text-purple-400" />;
      case 'pet':
        return <Heart className="w-5 h-5 text-rose-400" />;
      case 'store':
        return <ShoppingBag className="w-5 h-5 text-sky-400" />;
      default:
        return <Info className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm select-none">
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-md h-full glass-card border-l border-theme flex flex-col shadow-2xl bg-theme-surface"
        >
          {/* Header */}
          <div className="p-4 border-b border-theme flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-theme-accent text-white shadow-md">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-black text-theme-primary flex items-center gap-2">
                  <span>{language === 'es' ? 'Notificaciones' : 'Notifications'}</span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-rose-500 text-white">
                      {unreadCount} {language === 'es' ? 'nuevas' : 'new'}
                    </span>
                  )}
                </h2>
                <p className="text-xs text-theme-muted">
                  {language === 'es' ? 'Eventos, metas y recompensas' : 'Events, quests & rewards'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {notifications.length > 0 && (
                <button
                  onClick={() => {
                    sound.playClick();
                    onClearAll();
                  }}
                  className="p-2 rounded-xl hover:bg-theme-primary text-theme-muted hover:text-rose-400 transition-colors cursor-pointer"
                  title={language === 'es' ? 'Limpiar todas' : 'Clear all'}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="p-2 rounded-xl bg-theme-primary text-theme-primary hover:bg-theme-surface-hover transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-theme-primary border border-theme flex items-center justify-center text-theme-muted">
                  <Bell className="w-8 h-8 opacity-40" />
                </div>
                <h3 className="text-sm font-bold text-theme-primary">
                  {language === 'es' ? 'No tienes notificaciones' : 'No notifications'}
                </h3>
                <p className="text-xs text-theme-muted max-w-xs">
                  {language === 'es'
                    ? 'Completa metas, alimenta a tu mascota y sube de nivel para recibir avisos.'
                    : 'Complete quests, feed your pet and level up to earn alerts.'}
                </p>
              </div>
            ) : (
              notifications.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => {
                    if (!item.read) {
                      sound.playClick();
                      onMarkAsRead(item.id);
                    }
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 relative overflow-hidden ${
                    item.read
                      ? 'bg-theme-primary border-theme text-theme-secondary opacity-80'
                      : 'bg-theme-surface border-theme-accent shadow-theme-glow text-theme-primary'
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-theme-primary border border-theme shrink-0">
                    {getIcon(item.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs font-black truncate text-theme-primary">
                        {item.title}
                      </h4>
                      <span className="text-[9px] font-semibold text-theme-muted shrink-0">
                        {item.timestamp}
                      </span>
                    </div>

                    <p className="text-xs mt-0.5 leading-relaxed text-theme-muted">
                      {item.message}
                    </p>

                    {(item.rewardCoins || item.rewardXp) && (
                      <div className="mt-2 flex items-center justify-between gap-2 pt-2 border-t border-theme">
                        <div className="flex items-center gap-3 text-xs font-bold">
                          {item.rewardCoins && (
                            <span className="flex items-center gap-1 text-amber-400">
                              <Coins className="w-3.5 h-3.5" />
                              +{item.rewardCoins}
                            </span>
                          )}
                          {item.rewardXp && (
                            <span className="flex items-center gap-1 text-purple-400">
                              <Zap className="w-3.5 h-3.5" />
                              +{item.rewardXp} XP
                            </span>
                          )}
                        </div>

                        {onClaimReward && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              sound.playCoin();
                              onClaimReward(item);
                            }}
                            className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors cursor-pointer"
                          >
                            {language === 'es' ? 'Reclamar' : 'Claim'}
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {!item.read && (
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  )}
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
