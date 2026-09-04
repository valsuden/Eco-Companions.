import React from 'react';
import { 
  Home, 
  Gamepad2, 
  User as UserIcon, 
  ShoppingBag, 
  Settings as SettingsIcon,
  ShieldCheck,
  Coins,
  Flame,
  Backpack,
  Languages,
  Target,
  Boxes,
  BookOpen
} from 'lucide-react';
import { ViewType, User } from '../types';
import { sound } from '../utils/sound';
import { useI18n } from '../utils/i18n';
import { AerisLogo } from './AerisLogo';

interface NavigationProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  user: User;
  unreadCount?: number;
  onUpdateUser?: (updates: Partial<User>) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate, user, onUpdateUser }) => {
  const t = useI18n(user.language || 'en');

  if (currentView === 'splash' || currentView === 'onboarding') {
    return null;
  }

  const navItems: { id: ViewType; label: string; icon: typeof Home; badge?: string }[] = [
    { id: 'home', label: t.home, icon: Home },
    { id: 'quests', label: user.language === 'es' ? 'Metas y Logros' : 'Quests', icon: Target },
    { id: 'collection', label: user.language === 'es' ? 'Colección' : 'Collection', icon: Boxes },
    { id: 'pet-diary', label: user.language === 'es' ? 'Diario Mascota' : 'Pet Diary', icon: BookOpen },
    { id: 'inventory', label: t.inventory, icon: Backpack },
    { id: 'games', label: t.games, icon: Gamepad2, badge: '3' },
    { id: 'store', label: t.store, icon: ShoppingBag },
    { id: 'ecopass', label: user.language === 'es' ? 'Pase Gratis' : 'Eco Pass', icon: Coins },
    { id: 'profile', label: t.profile, icon: UserIcon },
    { id: 'learn-english', label: user.language === 'es' ? 'Inglés' : 'English', icon: Languages },
    { id: 'settings', label: t.settings, icon: SettingsIcon },
  ];

  const handleNavClick = (view: ViewType) => {
    sound.playClick();
    onNavigate(view);
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* DESKTOP & TABLET SIDEBAR (>= md) */}
      {/* ========================================================================= */}
      <aside 
        id="desktop-sidebar-nav"
        className="hidden md:flex flex-col md:w-20 lg:w-64 border-r shrink-0 p-3 lg:px-4 lg:py-5 justify-between select-none relative z-40 transition-colors duration-200"
        style={{ 
          backgroundColor: 'var(--nav-bg)',
          borderColor: 'var(--border)',
          color: 'var(--text-primary)'
        }}
      >
        <div className="space-y-5">
          {/* Logo & Project Title */}
          <div className="flex items-center md:justify-center lg:justify-start gap-3 pl-1">
            <div className="w-9 h-9 flex items-center justify-center shrink-0">
              <AerisLogo mode="monogram" size="sm" glow={false} />
            </div>
            <div className="hidden lg:block">
              <div 
                className="font-extrabold text-[11px] tracking-[0.15em] uppercase leading-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                AERIS DIVISION
              </div>
              <div 
                className="text-[9px] font-semibold uppercase tracking-[0.05em] mt-0.5"
                style={{ color: 'var(--text-muted)' }}
              >
                Liceo Caucasia
              </div>
            </div>
          </div>
          
          <div className="w-full h-px" style={{ backgroundColor: 'var(--border)' }} />

          {/* User Profile Mini (Left Sidebar) */}
          <div 
            className="hidden lg:flex items-center gap-3 w-full p-2 rounded-2xl border"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
            }}
          >
            <div 
              className="w-9 h-9 rounded-xl border flex items-center justify-center shrink-0"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-accent)',
                color: 'var(--accent)',
              }}
            >
              <span className="font-bold text-[9.5px]">N{user.level}</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span 
                className="font-bold text-[11px] truncate"
                style={{ color: 'var(--text-primary)' }}
              >
                {user.name || 'elias'}
              </span>
              <div className="flex items-center gap-2 text-[9px] font-bold mt-0.5" style={{ color: 'var(--text-muted)' }}>
                <span className="flex items-center gap-0.5 text-amber-400"><Coins className="w-2.5 h-2.5" /> {user.coins}</span>
                <span>•</span>
                <span className="flex items-center gap-0.5 text-rose-400"><Flame className="w-2.5 h-2.5" /> {user.streak}d</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 w-full">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  title={item.label}
                  className="w-full flex flex-col lg:flex-row items-center lg:justify-between p-2 lg:px-3.5 lg:py-2.5 rounded-xl font-bold text-[10px] tracking-wide transition-all cursor-pointer min-h-[44px]"
                  style={{
                    backgroundColor: isActive ? 'var(--accent)' : 'transparent',
                    color: isActive ? '#ffffff' : 'var(--text-secondary)',
                    boxShadow: isActive ? '0 4px 12px var(--glow)' : 'none',
                  }}
                >
                  <div className="flex flex-col lg:flex-row items-center gap-1 lg:gap-3">
                    <div className="relative">
                      <Icon className="w-4 h-4 lg:w-4 lg:h-4" style={{ color: isActive ? '#ffffff' : 'inherit' }} />
                      {/* Mobile / Tablet badge */}
                      {item.badge && (
                        <span 
                          className="lg:hidden absolute -top-1.5 -right-2 font-black text-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-sm"
                          style={{
                            backgroundColor: isActive ? '#ffffff' : 'var(--accent)',
                            color: isActive ? 'var(--accent)' : '#ffffff',
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[8.5px] lg:text-[10px] leading-tight whitespace-nowrap">
                      {item.label}
                    </span>
                  </div>
                  {item.badge && (
                    <span 
                      className="hidden lg:inline-block text-[8px] px-1.5 py-0.5 rounded-full font-bold"
                      style={{
                        backgroundColor: isActive ? 'rgba(255,255,255,0.3)' : 'var(--surface)',
                        color: isActive ? '#ffffff' : 'var(--accent)',
                        borderColor: 'var(--border)',
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-2 mt-auto">
          {/* Prominent Bilingual Language Switcher */}
          <button
            onClick={() => {
              sound.playClick();
              if (onUpdateUser) {
                onUpdateUser({ language: user.language === 'es' ? 'en' : 'es' });
              }
            }}
            className="w-full py-2 px-2.5 border rounded-xl flex items-center justify-center gap-2 text-[9px] font-extrabold tracking-wider uppercase transition-colors cursor-pointer"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)',
            }}
            title={user.language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          >
            <span className="text-xs">{user.language === 'es' ? '🇺🇸' : '🇪🇸'}</span>
            <span className="truncate hidden lg:inline">
              {user.language === 'es' ? 'ENGLISH (EN)' : 'ESPAÑOL (ES)'}
            </span>
          </button>

          <div 
            className="w-full hidden lg:flex flex-col items-center justify-center p-2.5 rounded-xl border"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
            }}
          >
            <span className="text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: 'var(--accent)' }}>AERIS</span>
            <span className="text-[8px] font-bold mt-0.5" style={{ color: 'var(--text-muted)' }}>High Performance & Eco</span>
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MOBILE FIXED BOTTOM NAVIGATION BAR (< md) */}
      {/* ========================================================================= */}
      <nav 
        id="mobile-bottom-nav"
        className="md:hidden fixed bottom-0 left-0 right-0 h-16 border-t flex items-stretch justify-around px-1 z-50 shadow-2xl backdrop-blur-2xl"
        style={{ 
          backgroundColor: 'var(--nav-bg)',
          borderColor: 'var(--border)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)' 
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              id={`mobile-nav-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className="flex flex-col items-center justify-center flex-1 min-h-[48px] py-1 transition-all relative cursor-pointer active:scale-95"
              style={{
                color: isActive ? 'var(--accent)' : 'var(--text-muted)',
              }}
            >
              {/* Active Glow Indicator */}
              {isActive && (
                <span 
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 rounded-b-full shadow-md"
                  style={{
                    backgroundColor: 'var(--accent)',
                    boxShadow: '0 0 10px var(--glow)',
                  }}
                />
              )}

              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                {item.badge && (
                  <span 
                    className="absolute -top-1.5 -right-2.5 font-black text-[8px] w-4 h-4 rounded-full flex items-center justify-center shadow-md"
                    style={{
                      backgroundColor: 'var(--accent)',
                      color: '#ffffff',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 font-bold tracking-tight leading-none truncate max-w-[58px]">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
