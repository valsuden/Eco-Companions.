import React from 'react';
import { motion } from 'motion/react';
import { 
  Palette, 
  Sparkles, 
  Check, 
  Laptop, 
  RotateCcw, 
  Eye, 
  Sliders, 
  ShieldCheck, 
  Flame, 
  Coins, 
  Heart, 
  Zap, 
  Leaf, 
  Sun, 
  Moon,
  Compass
} from 'lucide-react';
import { User, ThemeId, AccentColorId } from '../types';
import { 
  THEMES_CONFIG, 
  ACCENT_COLORS, 
  ThemeConfig, 
  AccentColorConfig,
  getResolvedTheme
} from '../utils/theme';
import { sound } from '../utils/sound';
import { useI18n } from '../utils/i18n';

interface ThemeCustomizerProps {
  user: User;
  onUpdateUser: (updates: Partial<User>) => void;
}

export const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({
  user,
  onUpdateUser,
}) => {
  const currentLang = user.language || 'en';
  const t = useI18n(currentLang);
  
  const currentThemeId = user.theme || 'dark';
  const currentAccentId = user.accentColor || 'cyan';
  const followSystem = user.followSystemTheme || false;
  const resolvedThemeId = getResolvedTheme(currentThemeId, followSystem);

  const handleSelectTheme = (themeId: ThemeId) => {
    sound.playClick();
    onUpdateUser({
      theme: themeId,
      followSystemTheme: false, // Explicit selection overrides auto-system
    });
  };

  const handleSelectAccent = (accentId: AccentColorId) => {
    sound.playClick();
    onUpdateUser({
      accentColor: accentId,
    });
  };

  const handleToggleFollowSystem = () => {
    sound.playClick();
    onUpdateUser({
      followSystemTheme: !followSystem,
    });
  };

  const handleResetAppearance = () => {
    sound.playCorrect();
    onUpdateUser({
      theme: 'dark',
      accentColor: 'cyan',
      followSystemTheme: false,
    });
  };

  const activeThemeConfig = THEMES_CONFIG[resolvedThemeId] || THEMES_CONFIG.dark;
  const activeAccentConfig = ACCENT_COLORS.find(a => a.id === currentAccentId) || ACCENT_COLORS[0];

  return (
    <div 
      id="theme-customizer-container"
      className="space-y-6"
    >
      {/* SECTION HEADER WITH LIVE THEME BADGE */}
      <div 
        className="rounded-3xl p-5 border shadow-xl backdrop-blur-md relative overflow-hidden"
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border-accent)',
        }}
      >
        {/* Glow corner ambient */}
        <div 
          className="absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: 'var(--accent)' }}
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg border"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-accent)',
                color: 'var(--accent)',
              }}
            >
              <Palette className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 
                  className="text-base sm:text-lg font-black tracking-wide"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {t.appearanceTitle}
                </h2>
                <span 
                  className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border shadow-sm"
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--accent)',
                    borderColor: 'var(--border-accent)',
                  }}
                >
                  {activeThemeConfig.name[currentLang]}
                </span>
              </div>
              <p 
                className="text-xs mt-0.5 line-clamp-1"
                style={{ color: 'var(--text-secondary)' }}
              >
                {t.appearanceSubtitle}
              </p>
            </div>
          </div>

          {/* Quick Actions (Reset & System Follow) */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleResetAppearance}
              className="px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 hover:opacity-80 active:scale-95"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border)',
                color: 'var(--text-secondary)',
              }}
              title={t.resetAppearance}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.resetAppearance}</span>
            </button>
          </div>
        </div>

        {/* FOLLOW SYSTEM TOGGLE ROW */}
        <div 
          className="mt-4 pt-4 border-t flex items-center justify-between gap-3"
          style={{ borderColor: 'var(--border)' }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div 
              className="p-2 rounded-xl border"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border)',
                color: 'var(--text-secondary)',
              }}
            >
              <Laptop className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div 
                className="text-xs font-bold truncate"
                style={{ color: 'var(--text-primary)' }}
              >
                {t.followSystemLabel}
              </div>
              <div 
                className="text-[11px] truncate"
                style={{ color: 'var(--text-muted)' }}
              >
                {t.followSystemDesc}
              </div>
            </div>
          </div>

          <button
            onClick={handleToggleFollowSystem}
            className="w-12 h-6 rounded-full transition-colors relative cursor-pointer shrink-0"
            style={{
              backgroundColor: followSystem ? 'var(--accent)' : 'var(--border)',
            }}
            aria-label={t.followSystemLabel}
          >
            <motion.div
              animate={{ left: followSystem ? '24px' : '2px' }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="w-5 h-5 rounded-full bg-white shadow-md absolute top-0.5"
            />
          </button>
        </div>
      </div>

      {/* 1. VISUAL THEME SELECTOR (8 RICH PREVIEW CARDS) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 
              className="text-xs font-black uppercase tracking-wider flex items-center gap-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.themePresetLabel}</span>
            </h3>
            <p 
              className="text-[11px]"
              style={{ color: 'var(--text-muted)' }}
            >
              {t.themePresetDesc}
            </p>
          </div>
        </div>

        {/* 8 Theme Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {(Object.values(THEMES_CONFIG) as ThemeConfig[]).map((thm) => {
            const isSelected = resolvedThemeId === thm.id;
            return (
              <motion.button
                key={thm.id}
                id={`theme-card-${thm.id}`}
                onClick={() => handleSelectTheme(thm.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative rounded-2xl p-3.5 text-left border transition-all cursor-pointer flex flex-col justify-between overflow-hidden group ${
                  isSelected 
                    ? 'ring-2 shadow-xl' 
                    : 'hover:border-opacity-80'
                }`}
                style={{
                  backgroundColor: thm.vars.surface,
                  borderColor: isSelected ? 'var(--accent)' : thm.vars.border,
                  boxShadow: isSelected ? `0 0 20px -3px ${thm.vars.glow}` : undefined,
                }}
              >
                {/* Active Checkmark Pill */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider shadow-md"
                    style={{
                      backgroundColor: 'var(--accent)',
                      color: thm.isLight ? '#ffffff' : '#070b14',
                    }}
                  >
                    <Check className="w-3 h-3 stroke-[3]" />
                    <span>{t.activeThemeBadge}</span>
                  </motion.div>
                )}

                {/* MINI THEME PREVIEW CANVAS */}
                <div 
                  className="w-full h-24 rounded-xl border p-2 flex flex-col justify-between mb-3 relative overflow-hidden shadow-inner"
                  style={{
                    backgroundColor: thm.vars.bgPrimary,
                    borderColor: thm.vars.border,
                  }}
                >
                  {/* Mini Header */}
                  <div 
                    className="w-full h-4 rounded-lg px-1.5 flex items-center justify-between border"
                    style={{
                      backgroundColor: thm.vars.hudBg,
                      borderColor: thm.vars.borderSubtle,
                    }}
                  >
                    <div className="flex items-center gap-1">
                      <div 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: thm.vars.accent }}
                      />
                      <div 
                        className="w-8 h-1 rounded-full" 
                        style={{ backgroundColor: thm.vars.textSecondary, opacity: 0.4 }}
                      />
                    </div>
                    <div 
                      className="w-3 h-2 rounded text-[6px] font-bold flex items-center justify-center"
                      style={{ backgroundColor: thm.vars.accent, color: thm.isLight ? '#fff' : '#000' }}
                    >
                      ★
                    </div>
                  </div>

                  {/* Mini Content Stage */}
                  <div className="flex items-center gap-2 my-auto px-1">
                    {/* Mini Mascot Aura */}
                    <div 
                      className="w-8 h-8 rounded-xl flex items-center justify-center border shadow-sm shrink-0"
                      style={{
                        backgroundColor: thm.vars.cardBg,
                        borderColor: thm.vars.accent,
                        boxShadow: `0 0 10px ${thm.vars.glow}`,
                      }}
                    >
                      <Sparkles 
                        className="w-4 h-4" 
                        style={{ color: thm.vars.accent }}
                      />
                    </div>

                    {/* Mini Progress Bars */}
                    <div className="flex-1 space-y-1">
                      <div 
                        className="w-full h-1.5 rounded-full overflow-hidden"
                        style={{ backgroundColor: thm.vars.border }}
                      >
                        <div 
                          className="h-full rounded-full" 
                          style={{ width: '75%', backgroundColor: thm.vars.accent }}
                        />
                      </div>
                      <div 
                        className="w-3/4 h-1.5 rounded-full overflow-hidden"
                        style={{ backgroundColor: thm.vars.border }}
                      >
                        <div 
                          className="h-full rounded-full" 
                          style={{ width: '50%', backgroundColor: thm.vars.accentSecondary }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 4 Palette Color Dots Strip */}
                  <div className="flex items-center gap-1.5 pt-1 border-t" style={{ borderColor: thm.vars.borderSubtle }}>
                    {thm.palette.map((color, idx) => (
                      <div
                        key={idx}
                        className="w-3.5 h-3.5 rounded-full border shadow-sm"
                        style={{
                          backgroundColor: color,
                          borderColor: 'rgba(255,255,255,0.2)',
                        }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                {/* Theme Name & Description */}
                <div>
                  <div className="flex items-center justify-between">
                    <h4 
                      className="text-xs sm:text-sm font-black tracking-wide"
                      style={{ color: thm.vars.textPrimary }}
                    >
                      {thm.name[currentLang]}
                    </h4>
                    {thm.isLight && (
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                    )}
                    {!thm.isLight && (
                      <Moon className="w-3.5 h-3.5 text-cyan-400 opacity-70" />
                    )}
                  </div>
                  <p 
                    className="text-[10.5px] font-medium mt-0.5 line-clamp-1"
                    style={{ color: thm.vars.textSecondary }}
                  >
                    {thm.subtitle[currentLang]}
                  </p>
                  <p 
                    className="text-[10px] mt-1 line-clamp-2 leading-relaxed opacity-75"
                    style={{ color: thm.vars.textMuted }}
                  >
                    {thm.description[currentLang]}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* 2. CUSTOM ACCENT COLOR PICKER */}
      <div 
        className="rounded-3xl p-5 border shadow-xl backdrop-blur-md space-y-3"
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <h3 
              className="text-xs font-black uppercase tracking-wider flex items-center gap-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              <Sliders className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
              <span>{t.accentColorLabel}</span>
            </h3>
            <p 
              className="text-[11px]"
              style={{ color: 'var(--text-muted)' }}
            >
              {t.accentColorDesc}
            </p>
          </div>
          <span 
            className="text-[11px] font-bold px-2 py-0.5 rounded-lg border self-start sm:self-auto"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderColor: 'var(--border)',
              color: 'var(--accent)',
            }}
          >
            {activeAccentConfig.name[currentLang]}
          </span>
        </div>

        {/* Presets Row */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5 pt-2">
          {ACCENT_COLORS.map((accent) => {
            const isSelected = currentAccentId === accent.id;
            return (
              <motion.button
                key={accent.id}
                id={`accent-btn-${accent.id}`}
                onClick={() => handleSelectAccent(accent.id)}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.92 }}
                className={`min-h-[48px] rounded-2xl p-2 flex flex-col items-center justify-center gap-1.5 border transition-all cursor-pointer relative ${
                  isSelected ? 'ring-2 shadow-lg' : 'hover:border-opacity-90'
                }`}
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: isSelected ? accent.hex : 'var(--border)',
                  boxShadow: isSelected ? `0 0 15px ${accent.glow}` : undefined,
                }}
                title={accent.name[currentLang]}
                aria-label={accent.name[currentLang]}
              >
                {/* Color Swatch Circle */}
                <div 
                  className="w-6 h-6 rounded-full shadow-inner flex items-center justify-center relative"
                  style={{ backgroundColor: accent.hex }}
                >
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-slate-950"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                    </motion.div>
                  )}
                </div>

                <span 
                  className="text-[9px] font-black tracking-tight truncate max-w-full text-center"
                  style={{ color: isSelected ? 'var(--text-primary)' : 'var(--text-muted)' }}
                >
                  {accent.id.toUpperCase()}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* 3. LIVE INTERACTIVE PREVIEW BOX */}
      <div 
        className="rounded-3xl p-5 border shadow-xl backdrop-blur-md space-y-4"
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" style={{ color: 'var(--accent)' }} />
            <h3 
              className="text-xs font-black uppercase tracking-wider"
              style={{ color: 'var(--text-secondary)' }}
            >
              {t.livePreview}
            </h3>
          </div>
          <div 
            className="text-[10px] font-semibold flex items-center gap-1"
            style={{ color: 'var(--text-muted)' }}
          >
            <span>Auto-aplicado en toda la app</span>
            <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: 'var(--accent)' }} />
          </div>
        </div>

        {/* Interactive Sandbox Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Card 1: Buttons Preview */}
          <div 
            className="p-3.5 rounded-2xl border space-y-2.5"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderColor: 'var(--border)',
            }}
          >
            <div className="text-[10px] font-black uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Botones y Acentos
            </div>
            
            <button 
              className="w-full py-2 px-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform cursor-pointer"
              style={{
                backgroundColor: 'var(--accent)',
                color: activeThemeConfig.isLight ? '#ffffff' : '#070b14',
                boxShadow: '0 0 15px var(--glow)',
              }}
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Botón Principal</span>
            </button>

            <button 
              className="w-full py-2 px-3 rounded-xl font-bold text-xs border flex items-center justify-center gap-1.5 active:scale-95 transition-transform cursor-pointer"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border-accent)',
                color: 'var(--text-primary)',
              }}
            >
              <Heart className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
              <span>Botón Secundario</span>
            </button>
          </div>

          {/* Card 2: Progress & Stats Preview */}
          <div 
            className="p-3.5 rounded-2xl border space-y-2.5"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderColor: 'var(--border)',
            }}
          >
            <div className="text-[10px] font-black uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Barras y Medidores
            </div>
            
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-bold" style={{ color: 'var(--text-secondary)' }}>
                <span>Nivel de Energía</span>
                <span style={{ color: 'var(--accent)' }}>85%</span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
                <div 
                  className="h-full rounded-full transition-all"
                  style={{ width: '85%', backgroundColor: 'var(--accent)' }}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-bold" style={{ color: 'var(--text-secondary)' }}>
                <span>Progreso XP</span>
                <span style={{ color: 'var(--success)' }}>60%</span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
                <div 
                  className="h-full rounded-full transition-all"
                  style={{ width: '60%', backgroundColor: 'var(--success)' }}
                />
              </div>
            </div>
          </div>

          {/* Card 3: Badges & Tags Preview */}
          <div 
            className="p-3.5 rounded-2xl border space-y-2.5"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderColor: 'var(--border)',
            }}
          >
            <div className="text-[10px] font-black uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Insignias y Estados
            </div>
            
            <div className="flex flex-wrap gap-1.5">
              <span 
                className="px-2 py-1 rounded-xl text-[10px] font-black border flex items-center gap-1 shadow-sm"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border-accent)',
                  color: 'var(--accent)',
                }}
              >
                <Flame className="w-3 h-3 fill-current" />
                <span>Racha 7d</span>
              </span>

              <span 
                className="px-2 py-1 rounded-xl text-[10px] font-black border flex items-center gap-1 shadow-sm"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }}
              >
                <Coins className="w-3 h-3 text-amber-400" />
                <span>250 Monedas</span>
              </span>

              <span 
                className="px-2 py-1 rounded-xl text-[10px] font-black border flex items-center gap-1 shadow-sm"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border)',
                  color: 'var(--success)',
                }}
              >
                <ShieldCheck className="w-3 h-3" />
                <span>Eco Agente</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
