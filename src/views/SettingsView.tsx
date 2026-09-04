import React, { useState, FormEvent } from 'react';
import { User, PetInfo, PetSpecies } from '../types';
import { SPECIES_CATALOG } from '../data/ecoData';
import { 
  Settings as SettingsIcon, 
  Volume2, 
  Sparkles, 
  Bell, 
  RotateCcw, 
  Info, 
  ShieldAlert, 
  ArrowLeft, 
  Languages, 
  Check,
  Palette,
  Sliders,
  User as UserIcon,
  AlertTriangle,
  Heart
} from 'lucide-react';
import { sound } from '../utils/sound';
import { useI18n, Language } from '../utils/i18n';
import { ThemeCustomizer } from '../components/ThemeCustomizer';

interface SettingsViewProps {
  user: User;
  petInfo: PetInfo;
  onUpdateUser: (updates: Partial<User>) => void;
  onUpdatePetInfo: (updates: Partial<PetInfo>) => void;
  onResetProgress: () => void;
  onBack: () => void;
}

type SettingsTab = 'system' | 'language' | 'appearance' | 'all';

export const SettingsView: React.FC<SettingsViewProps> = ({
  user,
  petInfo,
  onUpdateUser,
  onUpdatePetInfo,
  onResetProgress,
  onBack,
}) => {
  const currentLang = user.language || 'en';
  const t = useI18n(currentLang);
  const [activeTab, setActiveTab] = useState<SettingsTab>('system');
  const [playerNameInput, setPlayerNameInput] = useState(user.name);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSavePlayerName = (e: FormEvent) => {
    e.preventDefault();
    if (playerNameInput.trim()) {
      onUpdateUser({ name: playerNameInput.trim() });
      sound.playCorrect();
    }
  };

  const handleLanguageChange = (lang: Language) => {
    sound.playClick();
    onUpdateUser({ language: lang });
  };

  return (
    <div 
      className="w-full h-full overflow-y-auto p-4 sm:p-6 select-none bg-theme-primary text-theme-primary"
    >
      <div className="max-w-3xl mx-auto space-y-6 pb-24 md:pb-8">
        {/* Header */}
        <div 
          className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-theme pb-4 gap-4"
        >
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="md:hidden p-2 rounded-xl border border-theme cursor-pointer active:scale-95 glass-panel bg-theme-surface text-theme-secondary"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <SettingsIcon className="w-6 h-6 text-theme-accent" />
                <h1 
                  className="text-xl sm:text-2xl font-black text-theme-primary"
                >
                  {t.settingsTitle}
                </h1>
              </div>
              <p 
                className="text-xs mt-1 text-theme-secondary"
              >
                {t.settingsSubtitle}
              </p>
            </div>
          </div>

          {/* Quick Sub-Navigation Pills */}
          <div 
            className="flex items-center gap-1.5 p-1 rounded-2xl border border-theme overflow-x-auto no-scrollbar glass-panel bg-theme-surface"
          >
            {/* 1. SISTEMA / SYSTEM (FIRST) */}
            <button
              onClick={() => { sound.playClick(); setActiveTab('system'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                activeTab === 'system' ? 'shadow-md scale-100 bg-theme-accent text-white' : 'opacity-70 hover:opacity-100 text-theme-secondary'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{currentLang === 'es' ? 'Sistema' : 'System'}</span>
            </button>

            {/* 2. IDIOMA / LANGUAGE (SECOND) */}
            <button
              onClick={() => { sound.playClick(); setActiveTab('language'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                activeTab === 'language' ? 'shadow-md scale-100 bg-theme-accent text-white' : 'opacity-70 hover:opacity-100 text-theme-secondary'
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{currentLang === 'es' ? 'Idioma' : 'Language'}</span>
            </button>

            {/* 3. APARIENCIA / APPEARANCE (THIRD) */}
            <button
              onClick={() => { sound.playClick(); setActiveTab('appearance'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                activeTab === 'appearance' ? 'shadow-md scale-100 bg-theme-accent text-white' : 'opacity-70 hover:opacity-100 text-theme-secondary'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>{currentLang === 'es' ? 'Apariencia' : 'Appearance'}</span>
            </button>

            {/* 4. TODO / ALL */}
            <button
              onClick={() => { sound.playClick(); setActiveTab('all'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 ${
                activeTab === 'all' ? 'shadow-md bg-theme-accent text-white' : 'opacity-70 hover:opacity-100 text-theme-secondary'
              }`}
            >
              <span>{currentLang === 'es' ? 'Todo' : 'All'}</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 1. SISTEMA / SYSTEM PREFERENCES (FIRST) */}
        {/* ========================================================================= */}
        {(activeTab === 'system' || activeTab === 'all') && (
          <div className="space-y-6">
            {/* Audio & Performance */}
            <div 
              className="border border-theme rounded-3xl p-5 space-y-4 shadow-xl glass-panel bg-theme-surface"
            >
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-theme-accent" />
                <h2 
                  className="text-xs font-black uppercase tracking-wider text-theme-secondary"
                >
                  {t.systemOptions}
                </h2>
              </div>

              <div className="space-y-3 text-sm">
                {/* Sound Effects */}
                <div 
                  className="flex items-center justify-between p-3 rounded-2xl border border-theme glass-panel bg-theme-primary"
                >
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-5 h-5 text-theme-accent" />
                    <div>
                      <div 
                        className="font-bold text-xs text-theme-primary"
                      >
                        {t.soundEffects}
                      </div>
                      <div 
                        className="text-[10px] text-theme-muted"
                      >
                        {t.soundEffectsDesc}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const next = !user.soundEnabled;
                      onUpdateUser({ soundEnabled: next });
                      sound.setEnabled(next);
                      if (next) sound.playClick();
                    }}
                    className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                      user.soundEnabled ? 'bg-theme-accent' : 'bg-theme-border'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5 ${
                        user.soundEnabled ? 'left-6.5' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>

                {/* High Performance Mode */}
                <div 
                  className="flex items-center justify-between p-3 rounded-2xl border border-theme glass-panel bg-theme-primary"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <div>
                      <div 
                        className="font-bold text-xs text-theme-primary"
                      >
                        {t.highPerformance}
                      </div>
                      <div 
                        className="text-[10px] text-theme-muted"
                      >
                        {t.highPerformanceDesc}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      sound.playClick();
                      onUpdateUser({ animationsEnabled: !user.animationsEnabled });
                    }}
                    className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                      user.animationsEnabled ? 'bg-theme-accent' : 'bg-theme-border'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5 ${
                        user.animationsEnabled ? 'left-6.5' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>

                {/* Educational Notifications */}
                <div 
                  className="flex items-center justify-between p-3 rounded-2xl border border-theme glass-panel bg-theme-primary"
                >
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5" style={{ color: 'var(--success)' }} />
                    <div>
                      <div 
                        className="font-bold text-xs text-theme-primary"
                      >
                        {t.educationalTips}
                      </div>
                      <div 
                        className="text-[10px] text-theme-muted"
                      >
                        {t.educationalTipsDesc}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      sound.playClick();
                      onUpdateUser({ notificationsEnabled: !user.notificationsEnabled });
                    }}
                    className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                      user.notificationsEnabled ? 'bg-theme-accent' : 'bg-theme-border'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5 ${
                        user.notificationsEnabled ? 'left-6.5' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Player Profile & Pet Identity */}
            <div 
              className="border border-theme rounded-3xl p-5 space-y-4 shadow-xl glass-panel bg-theme-surface"
            >
              <div className="flex items-center gap-2">
                <UserIcon className="w-4 h-4 text-theme-accent" />
                <h2 
                  className="text-xs font-black uppercase tracking-wider text-theme-secondary"
                >
                  {t.playerProfile}
                </h2>
              </div>

              <form onSubmit={handleSavePlayerName} className="space-y-2 max-w-md">
                <label 
                  className="text-xs font-bold text-theme-secondary"
                >
                  {t.playerNameLabel}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={playerNameInput}
                    onChange={(e) => setPlayerNameInput(e.target.value)}
                    maxLength={24}
                    className="flex-1 rounded-xl px-3 py-2 text-xs border border-theme focus:outline-none glass-panel bg-theme-primary text-theme-primary"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 font-bold text-xs rounded-xl cursor-pointer shadow-md active:scale-95 transition-transform bg-theme-accent text-white"
                  >
                    {t.save}
                  </button>
                </div>
              </form>

              {/* Pet Species Selection */}
              <div className="pt-3 border-t border-theme space-y-2.5">
                <label 
                  className="text-xs font-bold flex items-center gap-1.5 text-theme-secondary"
                >
                  <Sparkles className="w-3.5 h-3.5 text-theme-accent" />
                  <span>{currentLang === 'es' ? 'Especie del Guardián Ecológico' : 'Eco-Guardian Species'}</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {SPECIES_CATALOG.map((sp) => {
                    const isSelected = (petInfo?.species || 'cat') === sp.id;
                    return (
                      <button
                        key={sp.id}
                        type="button"
                        onClick={() => {
                          sound.playClick();
                          if (onUpdatePetInfo) {
                            onUpdatePetInfo({ species: sp.id });
                          }
                        }}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 glass-panel ${
                          isSelected ? 'shadow-md ring-2 ring-theme-accent bg-theme-surface border-theme-accent' : 'opacity-75 hover:opacity-100 bg-theme-primary border-theme'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-2xl">{sp.avatarEmoji}</span>
                          {isSelected && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-black text-white bg-theme-accent">
                              {currentLang === 'es' ? 'Activo' : 'Active'}
                            </span>
                          )}
                        </div>
                        <div>
                          <div className="font-black text-xs text-theme-primary">
                            {currentLang === 'es' 
                              ? (sp.id === 'cat' ? 'Gato Místico' : sp.id === 'dog' ? 'Perro Scout' : 'Conejo Botánico')
                              : (sp.id === 'cat' ? 'Mystic Feline' : sp.id === 'dog' ? 'Eco Scout Dog' : 'Garden Rabbit')}
                          </div>
                          <div className="text-[10px] mt-0.5 line-clamp-1 text-theme-muted">
                            {currentLang === 'es' ? sp.tagline : sp.personality}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pet Name Setting */}
              <div className="pt-2 border-t border-theme space-y-2 max-w-md">
                <label 
                  className="text-xs font-bold flex items-center gap-1.5 text-theme-secondary"
                >
                  <Heart className="w-3.5 h-3.5 text-rose-400" />
                  <span>{currentLang === 'es' ? 'Nombre de la Mascota' : 'Pet Name'}</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={petInfo?.name || 'Aeris'}
                    onChange={(e) => {
                      if (onUpdatePetInfo) {
                        onUpdatePetInfo({ name: e.target.value });
                      }
                    }}
                    maxLength={20}
                    className="flex-1 rounded-xl px-3 py-2 text-xs border border-theme focus:outline-none glass-panel bg-theme-primary text-theme-primary"
                  />
                </div>
              </div>
            </div>

            {/* About Project */}
            <div 
              className="border border-theme-accent rounded-3xl p-5 space-y-2 glass-panel bg-theme-surface"
            >
              <div className="flex items-center gap-2 text-theme-accent">
                <Info className="w-5 h-5" />
                <h3 className="text-sm font-black">{t.aboutProject}</h3>
              </div>
              <p 
                className="text-xs leading-relaxed text-theme-secondary"
              >
                {t.aboutProjectDesc}
              </p>
            </div>

            {/* Danger Zone: Reset Progress */}
            <div 
              className="border border-rose-500/30 rounded-3xl p-5 space-y-3 glass-panel bg-theme-surface"
            >
              <div className="flex items-center gap-2 text-rose-400">
                <ShieldAlert className="w-5 h-5" />
                <h3 className="text-xs font-black uppercase tracking-wider">{t.dangerZone}</h3>
              </div>
              <p 
                className="text-xs text-theme-muted"
              >
                {t.dangerZoneDesc}
              </p>

              <button
                onClick={() => setShowResetConfirm(true)}
                className="px-4 py-2.5 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/40 text-xs font-black transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.resetProgress}</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. IDIOMA / LANGUAGE SELECTOR (SECOND) */}
        {/* ========================================================================= */}
        {(activeTab === 'language' || activeTab === 'all') && (
          <div 
            className="border border-theme rounded-3xl p-5 space-y-4 shadow-xl glass-panel bg-theme-surface"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Languages className="w-5 h-5 text-theme-accent" />
                <div>
                  <h2 
                    className="text-sm font-black text-theme-primary"
                  >
                    {t.languageLabel}
                  </h2>
                  <p 
                    className="text-[11px] text-theme-secondary"
                  >
                    {t.languageDesc}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* English */}
              <button
                onClick={() => handleLanguageChange('en')}
                className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all cursor-pointer glass-panel ${
                  currentLang === 'en'
                    ? 'ring-2 shadow-md bg-theme-surface border-theme-accent shadow-theme-glow'
                    : 'hover:opacity-85 bg-theme-primary border-theme'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div 
                    className="w-8 h-8 rounded-xl border border-theme-accent flex items-center justify-center font-black text-xs glass-panel bg-theme-primary text-theme-accent"
                  >
                    EN
                  </div>
                  <div className="text-left">
                    <div 
                      className="font-extrabold text-xs text-theme-primary"
                    >
                      English
                    </div>
                    <div 
                      className="text-[10px] font-semibold text-theme-accent"
                    >
                      (Default)
                    </div>
                  </div>
                </div>
                {currentLang === 'en' && <Check className="w-4 h-4 text-theme-accent" />}
              </button>

              {/* Spanish */}
              <button
                onClick={() => handleLanguageChange('es')}
                className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all cursor-pointer glass-panel ${
                  currentLang === 'es'
                    ? 'ring-2 shadow-md bg-theme-surface border-theme-accent shadow-theme-glow'
                    : 'hover:opacity-85 bg-theme-primary border-theme'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div 
                    className="w-8 h-8 rounded-xl border border-theme-accent flex items-center justify-center font-black text-xs glass-panel bg-theme-primary text-theme-accent"
                  >
                    ES
                  </div>
                  <div className="text-left">
                    <div 
                      className="font-extrabold text-xs text-theme-primary"
                    >
                      Español
                    </div>
                    <div 
                      className="text-[10px] font-semibold"
                      style={{ color: 'var(--success)' }}
                    >
                      (Completo)
                    </div>
                  </div>
                </div>
                {currentLang === 'es' && <Check className="w-4 h-4 text-theme-accent" />}
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. APARIENCIA / THEMES CUSTOMIZER (THIRD) */}
        {/* ========================================================================= */}
        {(activeTab === 'appearance' || activeTab === 'all') && (
          <ThemeCustomizer 
            user={user} 
            onUpdateUser={onUpdateUser} 
          />
        )}
      </div>

      {/* CONFIRMATION MODAL */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 z-50 select-none">
          <div 
            className="border rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--danger)',
            }}
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-base font-black text-rose-400">{t.resetConfirmTitle}</h3>
            <p 
              className="text-xs"
              style={{ color: 'var(--text-secondary)' }}
            >
              {t.resetConfirmDesc}
            </p>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 rounded-xl border font-bold text-xs cursor-pointer active:scale-95"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }}
              >
                {t.cancel}
              </button>
              <button
                onClick={() => {
                  setShowResetConfirm(false);
                  onResetProgress();
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-lg shadow-rose-900/50 cursor-pointer active:scale-95"
              >
                {t.yesReset}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

