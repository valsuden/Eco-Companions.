import React from 'react';
import { PetInfo, ViewType, Language } from '../types';
import { AerisLogo } from '../components/AerisLogo';
import { 
  Play, 
  Gamepad2, 
  User as UserIcon, 
  ShoppingBag, 
  Settings as SettingsIcon,
  ShieldCheck,
  Leaf
} from 'lucide-react';
import { sound } from '../utils/sound';
import { useI18n } from '../utils/i18n';

interface SplashViewProps {
  onStart: (targetView?: ViewType) => void;
  petInfo: PetInfo;
  language?: Language;
}

export const SplashView: React.FC<SplashViewProps> = ({ onStart, language = 'en' }) => {
  const t = useI18n(language);

  const handleAction = (view?: ViewType) => {
    sound.playClick();
    onStart(view);
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-b from-[#060a12] via-[#091122] to-[#041a22] flex flex-col items-center justify-between p-4 sm:p-8 select-none text-white ">
      {/* Background Subtle Tech Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

      {/* Top Header Branding */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-2 mt-2">
        <div className="flex items-center gap-2 bg-slate-900/90 px-3.5 py-1.5 rounded-full border border-cyan-500/40 shadow-lg backdrop-blur-md">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <div className="text-xs font-black tracking-wider text-cyan-300">
            {t.aerisDivisionTag}
          </div>
        </div>

        {/* Project Title */}
        <div className="pt-2">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-teal-300">
            {t.gameTitle}
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-300 max-w-md mt-1 flex items-center justify-center gap-1.5">
            <Leaf className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.gameSubtitle}</span>
          </p>
        </div>
      </div>

      {/* Central AERIS DIVISION Logo Display */}
      <div className="relative z-10 flex flex-col items-center my-2 sm:my-4">
        <AerisLogo size="xl" showSubtitle={true} glow={true} />
        <div className="mt-3 bg-slate-900/90 border border-cyan-500/40 px-4 py-1.5 rounded-full text-xs font-bold text-cyan-300 shadow-md backdrop-blur-md">
          {t.editionSubtitle}
        </div>
      </div>

      {/* Main Buttons Menu */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center space-y-3 mb-2">
        {/* Main PLAY Action Button */}
        <button
          onClick={() => handleAction('home')}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:to-teal-300 active:scale-95 text-slate-950 font-black text-base sm:text-lg uppercase tracking-wider flex items-center justify-center gap-3 shadow-xl shadow-cyan-950/60 border border-cyan-300/60 transition-all cursor-pointer"
        >
          <Play className="w-5 h-5 fill-slate-950" />
          <span>{t.playNow}</span>
        </button>

        {/* Secondary Direct Navigation Buttons */}
        <div className="w-full grid grid-cols-4 gap-2">
          {/* Games */}
          <button
            onClick={() => handleAction('games')}
            className="py-3 px-2 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-cyan-400/60 flex flex-col items-center justify-center gap-1 transition-all active:scale-95 text-slate-200 cursor-pointer backdrop-blur-md"
          >
            <Gamepad2 className="w-4 h-4 text-cyan-400" />
            <span className="text-[10px] font-bold">{t.games}</span>
          </button>

          {/* Store */}
          <button
            onClick={() => handleAction('store')}
            className="py-3 px-2 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-amber-400/60 flex flex-col items-center justify-center gap-1 transition-all active:scale-95 text-slate-200 cursor-pointer backdrop-blur-md"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span className="text-[10px] font-bold">{t.store}</span>
          </button>

          {/* Profile */}
          <button
            onClick={() => handleAction('profile')}
            className="py-3 px-2 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-teal-400/60 flex flex-col items-center justify-center gap-1 transition-all active:scale-95 text-slate-200 cursor-pointer backdrop-blur-md"
          >
            <UserIcon className="w-4 h-4 text-teal-400" />
            <span className="text-[10px] font-bold">{t.profile}</span>
          </button>

          {/* Settings */}
          <button
            onClick={() => handleAction('settings')}
            className="py-3 px-2 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-600 flex flex-col items-center justify-center gap-1 transition-all active:scale-95 text-slate-200 cursor-pointer backdrop-blur-md"
          >
            <SettingsIcon className="w-4 h-4 text-slate-400" />
            <span className="text-[10px] font-bold">{t.settings}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
