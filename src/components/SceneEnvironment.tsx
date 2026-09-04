import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PetAvatar } from './PetAvatar';
import { PetInfo, Stats, User, EcoFood } from '../types';
import { ECO_FOODS, getNextLevelUnlock, getFoodsForSpecies } from '../data/ecoData';
import { EcoIcon } from './EcoIcon';
import { 
  Utensils, 
  Moon, 
  Droplets, 
  ShieldCheck, 
  Leaf, 
  Recycle, 
  Trash2, 
  Coins, 
  X, 
  Sparkles, 
  Zap, 
  Award,
  MessageSquare,
  BookOpen,
  Languages,
  ArrowRight,
  Bot,
  Edit3,
  Waves,
  Heart,
  Gamepad2,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { sound } from '../utils/sound';
import { useI18n, getLocalizedTitleName, getLocalizedUnlockName } from '../utils/i18n';
import { useLayoutBreakpoint } from '../utils/useLayoutBreakpoint';
import { LearnEnglishModal } from './LearnEnglishModal';
import { AerisChatModal } from './AerisChatModal';
import { HomeEcoWindows } from './HomeEcoWindows';
import { PetRenameModal } from './PetRenameModal';
import { RiverObservatoryModal } from './RiverObservatoryModal';

// 2.5D ILLUSTRATED VECTOR LANDSCAPE BACKGROUND representing the Bajo Cauca region
const SanctuaryLandscape: React.FC = () => {
  return (
    <svg className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#7dd3fc" />
        </linearGradient>
        <path id="grass1" d="M 0 20 Q 4 0 10 -15" fill="none" stroke="#15803d" strokeWidth="4.5" strokeLinecap="round" />
        <path id="grass2" d="M 0 20 Q -4 0 -10 -15" fill="none" stroke="#166534" strokeWidth="4.5" strokeLinecap="round" />
        <g id="daisy">
          <ellipse cx="0" cy="-12" rx="7" ry="11" fill="#f8fafc" transform="rotate(0)" />
          <ellipse cx="11.4" cy="-3.7" rx="7" ry="11" fill="#f8fafc" transform="rotate(72)" />
          <ellipse cx="7.1" cy="9.7" rx="7" ry="11" fill="#f8fafc" transform="rotate(144)" />
          <ellipse cx="-7.1" cy="9.7" rx="7" ry="11" fill="#f8fafc" transform="rotate(216)" />
          <ellipse cx="-11.4" cy="-3.7" rx="7" ry="11" fill="#f8fafc" transform="rotate(288)" />
          <circle cx="0" cy="0" r="7.5" fill="#facc15" />
        </g>
        <circle id="dot" cx="0" cy="0" r="3.5" fill="#f8fafc" opacity="0.6" />
      </defs>

      {/* Sky */}
      <rect width="800" height="500" fill="url(#skyGrad)" />

      {/* Sun */}
      <g transform="translate(140, 100)" className="animate-pulse-glow">
        <circle cx="0" cy="0" r="54" fill="#f59e0b" stroke="#f59e0b" strokeWidth="14" strokeLinecap="round" strokeDasharray="0.1 14.037" opacity="0.3" />
        <circle cx="0" cy="0" r="46" fill="#fde047" />
      </g>

      {/* Clouds */}
      <g fill="#f0f9ff" opacity="0.9" className="animate-float">
        {/* Left Cloud */}
        <g transform="translate(0, 0)">
          <circle cx="40" cy="200" r="45" />
          <circle cx="100" cy="150" r="60" />
          <circle cx="180" cy="165" r="55" />
          <circle cx="240" cy="195" r="40" />
          <rect x="25" y="150" width="220" height="90" rx="30" />
        </g>
        
        {/* Right Cloud */}
        <g transform="translate(0, -20)">
          <circle cx="510" cy="230" r="55" />
          <circle cx="590" cy="160" r="75" />
          <circle cx="690" cy="190" r="65" />
          <circle cx="770" cy="230" r="50" />
          <rect x="500" y="170" width="280" height="115" rx="35" />
        </g>
      </g>

      {/* Green Hill */}
      <path d="M 0 310 Q 400 280 800 320 L 800 500 L 0 500 Z" fill="#22c55e" />
      <path d="M 0 350 Q 400 320 800 360 L 800 500 L 0 500 Z" fill="#16a34a" opacity="0.4" />

      {/* Grass blades */}
      <g opacity="0.8">
        <use href="#grass1" x="70" y="325" />
        <use href="#grass2" x="120" y="335" />
        <use href="#grass1" x="220" y="320" />
        <use href="#grass2" x="350" y="315" />
        <use href="#grass1" x="420" y="325" />
        <use href="#grass2" x="520" y="315" />
        <use href="#grass1" x="600" y="325" />
        <use href="#grass2" x="700" y="330" />
        <use href="#grass1" x="760" y="320" />
        
        <use href="#grass1" x="50" y="380" />
        <use href="#grass2" x="160" y="390" />
        <use href="#grass1" x="210" y="390" />
        <use href="#grass2" x="330" y="400" />
        <use href="#grass1" x="480" y="390" />
        <use href="#grass2" x="620" y="420" />
        <use href="#grass1" x="680" y="440" />
        <use href="#grass2" x="780" y="400" />
        
        <use href="#grass1" x="110" y="470" />
        <use href="#grass2" x="250" y="450" />
        <use href="#grass1" x="320" y="470" />
        <use href="#grass2" x="400" y="440" />
        <use href="#grass1" x="530" y="460" />
        <use href="#grass2" x="590" y="490" />
        <use href="#grass1" x="720" y="480" />
      </g>

      {/* Daisies */}
      <g transform="translate(150, 345) scale(1.1)"><use href="#daisy" /></g>
      <g transform="translate(260, 340) scale(0.9)"><use href="#daisy" /></g>
      <g transform="translate(420, 335) scale(0.85)"><use href="#daisy" /></g>
      <g transform="translate(520, 410) scale(1.15)"><use href="#daisy" /></g>
      <g transform="translate(680, 410) scale(0.95)"><use href="#daisy" /></g>
      <g transform="translate(770, 380) scale(1)"><use href="#daisy" /></g>
      
      <g transform="translate(80, 420) scale(1)"><use href="#daisy" /></g>
      <g transform="translate(220, 450) scale(1.3)"><use href="#daisy" /></g>
      <g transform="translate(370, 425) scale(1.1)"><use href="#daisy" /></g>
      <g transform="translate(640, 470) scale(1.2)"><use href="#daisy" /></g>

      {/* White Dots */}
      <use href="#dot" x="50" y="350" />
      <use href="#dot" x="190" y="355" />
      <use href="#dot" x="310" y="340" />
      <use href="#dot" x="480" y="345" />
      <use href="#dot" x="580" y="330" />
      <use href="#dot" x="720" y="350" />
      
      <use href="#dot" x="130" y="400" />
      <use href="#dot" x="280" y="390" />
      <use href="#dot" x="420" y="410" />
      <use href="#dot" x="560" y="405" />
      <use href="#dot" x="680" y="415" />
      
      <use href="#dot" x="180" y="480" />
      <use href="#dot" x="340" y="470" />
      <use href="#dot" x="470" y="460" />
      <use href="#dot" x="600" y="430" />
      <use href="#dot" x="760" y="450" />
    </svg>
  );
};

// COMPACT STYLISH RECYCLE GUIDE WIDGET
interface RecycleGuideWidgetProps {
  onQuickRecycleInfo: (category: 'organic' | 'recyclable' | 'non_usable') => void;
  t: any;
  lang: string;
}

const RecycleGuideWidget: React.FC<RecycleGuideWidgetProps> = ({ onQuickRecycleInfo, t, lang }) => {
  return (
    <div 
      className="glass-panel rounded-3xl p-5 flex flex-col gap-4 shadow-theme-card w-full shrink-0"
    >
      <div className="flex items-center gap-3 pb-2 border-b border-white/10">
        <div className="w-8 h-8 rounded-xl bg-accent/20 flex items-center justify-center">
          <Recycle className="w-4 h-4 text-theme-accent animate-[spin_10s_linear_infinite]" />
        </div>
        <h2 className="text-sm font-extrabold uppercase tracking-wider text-theme-primary">
          {t.quickBinInfoTitle || (lang === 'es' ? 'Guía de Reciclaje' : 'Recycling Guide')}
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {/* GREEN BLOCK */}
        <button
          onClick={() => {
            sound.playClick();
            onQuickRecycleInfo('organic');
          }}
          className="w-full p-3 rounded-2xl border transition-all text-left flex items-center justify-between gap-3 group active:scale-[0.98] cursor-pointer hover:bg-emerald-500/10 border-emerald-500/30 bg-emerald-500/5"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-500/20">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[9px] font-black text-emerald-400 uppercase tracking-wider mb-1">{lang === 'es' ? 'VERDE' : 'GREEN'}</div>
              <div className="text-xs font-extrabold leading-none text-emerald-50">{t.organic || 'Organic'}</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </button>

        {/* WHITE BLOCK */}
        <button
          onClick={() => {
            sound.playClick();
            onQuickRecycleInfo('recyclable');
          }}
          className="w-full p-3 rounded-2xl border transition-all text-left flex items-center justify-between gap-3 group active:scale-[0.98] cursor-pointer hover:bg-sky-500/10 border-sky-500/30 bg-sky-500/5"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-sky-500/20">
              <Recycle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[9px] font-black text-sky-400 uppercase tracking-wider mb-1">{lang === 'es' ? 'BLANCO' : 'WHITE'}</div>
              <div className="text-xs font-extrabold leading-none text-sky-50">{t.recyclable || 'Recyclables'}</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-sky-400 shrink-0 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </button>

        {/* BLACK BLOCK */}
        <button
          onClick={() => {
            sound.playClick();
            onQuickRecycleInfo('non_usable');
          }}
          className="w-full p-3 rounded-2xl border transition-all text-left flex items-center justify-between gap-3 group active:scale-[0.98] cursor-pointer hover:bg-slate-500/10 border-slate-500/30 bg-slate-500/5"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-slate-500/20">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1">{lang === 'es' ? 'NEGRO' : 'BLACK'}</div>
              <div className="text-xs font-extrabold leading-none text-slate-50">{t.nonUsable || 'Non-Usable'}</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </button>
      </div>
    </div>
  );
};

interface SceneEnvironmentProps {
  user: User;
  stats: Stats;
  petInfo: PetInfo;
  actionState: 'idle' | 'eating' | 'playing' | 'sleeping' | 'happy' | 'sad' | 'celebrating';
  onFeedFood: (food: EcoFood) => void;
  onCleanPet: () => void;
  onSleepPet: () => void;
  onPetClick: () => void;
  onQuickRecycleInfo: (category: 'organic' | 'recyclable' | 'non_usable') => void;
  onRewardXpAndCoins: (xp: number, coins: number) => void;
  onUpdatePetName?: (newName: string) => void;
}

export const SceneEnvironment: React.FC<SceneEnvironmentProps> = ({
  user,
  stats,
  petInfo,
  actionState,
  onFeedFood,
  onCleanPet,
  onSleepPet,
  onPetClick,
  onQuickRecycleInfo,
  onRewardXpAndCoins,
  onUpdatePetName,
}) => {
  const currentLang = user.language || 'en';
  const t = useI18n(currentLang);
  const layout = useLayoutBreakpoint();

  const [showFoodSelector, setShowFoodSelector] = useState(false);
  const [activeFeedback, setActiveFeedback] = useState<{ id: number; text: string; color: string }[]>([]);
  const [isEnglishModalOpen, setIsEnglishModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isRiverModalOpen, setIsRiverModalOpen] = useState(false);

  const nextUnlock = getNextLevelUnlock(user.level);

  const triggerFeedback = (text: string, color: string = 'text-cyan-300') => {
    const id = Date.now() + Math.random();
    setActiveFeedback((prev) => [...prev, { id, text, color }]);
    setTimeout(() => {
      setActiveFeedback((prev) => prev.filter((item) => item.id !== id));
    }, 1200);
  };

  const isHungry = stats.hunger < 35;
  const isTired = stats.energy < 30;
  const isEnergized = stats.energy > 80 && stats.mood > 80;

  return (
    <div
      id="scene-environment-root"
      className="w-full h-full relative overflow-y-auto overflow-x-hidden flex flex-col select-none bg-transparent"
    >
      {/* Floating Action Feedback Text (+25 XP, etc.) */}
      <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
        <AnimatePresence>
          {activeFeedback.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 1, y: 30, scale: 0.8 }}
              animate={{ opacity: 0, y: -80, scale: 1.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="px-4 py-2 rounded-2xl border shadow-glow backdrop-blur-md font-black text-sm sm:text-base glass-panel"
              style={{
                borderColor: 'var(--border-accent)',
                color: 'var(--accent)',
              }}
            >
              {item.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* DUAL LAYER RESPONSIVE LAYOUT (Mobile: Vertical stacked scroll. Desktop: Side-by-side 2-column) */}
      <div className="w-full flex-1 max-w-7xl mx-auto p-3 sm:p-5 flex flex-col lg:flex-row gap-5 min-h-0 overflow-y-auto lg:overflow-hidden pb-24 md:pb-5">
        
        {/* LEFT COLUMN: THE 2.5D GAME VIEWPORT & PRIMARY CONTROLS */}
        <div className="flex-1 flex flex-col gap-5 min-h-0 lg:overflow-y-auto pr-0 lg:pr-1 no-scrollbar">
          
          {/* 1. THE 2.5D ILLUSTRATED LANDSCAPE CARD */}
          <div 
            className="w-full relative rounded-[2rem] border border-white/20 overflow-hidden shadow-2xl bg-slate-900 flex flex-col justify-between shrink-0"
            style={{
              height: 'clamp(400px, 50vh, 550px)',
              minHeight: '400px'
            }}
          >
            {/* Beautiful SVG Landscape Background */}
            <SanctuaryLandscape />
            
            {/* Dark overlay gradient at top for text legibility */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-slate-900/60 to-transparent z-10 pointer-events-none" />

            {/* Floators over landscape (LICEO CAUCASIA SANCTUARY & Target badge) */}
            <div className="absolute top-4 left-4 right-4 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pointer-events-none">
              <div 
                className="px-4 py-2 rounded-2xl border shadow-lg flex items-center gap-2.5 backdrop-blur-md self-start bg-slate-900/40 border-white/10"
              >
                <div className="w-4 h-4 rounded-full border border-emerald-400 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <span className="text-[9px] font-black tracking-wider uppercase text-white drop-shadow-md">
                  {t.sanctuaryTitle}
                </span>
              </div>
              
              <div 
                className="px-4 py-2 rounded-2xl border shadow-lg flex items-center gap-2 self-start backdrop-blur-md bg-amber-900/40 border-amber-500/30"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span className="text-[9px] font-bold text-amber-100">
                  {currentLang === 'es' ? 'Meta Nvl' : 'Target Level'} {user.level + 1}:
                </span>
                <span className="text-[9px] font-black text-amber-400 truncate max-w-[140px] sm:max-w-none drop-shadow-md">
                  {getLocalizedUnlockName(nextUnlock.unlockName, currentLang)}
                </span>
              </div>
            </div>

            {/* Pet / Companion Center Stage */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pb-20">
              {/* Elegant Glowing Pedestal */}
              <div 
                className="absolute top-[65%] pointer-events-none w-56 h-12 rounded-[100%] blur-[12px] opacity-60 bg-emerald-500/30"
              />
              <div 
                className="absolute top-[67%] pointer-events-none w-32 h-6 rounded-[100%] blur-[8px] opacity-80 bg-emerald-400/50"
              />
              
              <div className="relative z-10">
                <PetAvatar
                  petInfo={petInfo}
                  size="responsive"
                  actionState={actionState}
                  onPetClick={onPetClick}
                  showMoodBubble={true}
                  isHungry={isHungry}
                  isTired={isTired}
                  isEnergized={isEnergized}
                  affectionEnergy={user.petAffectionEnergy ?? 100}
                  language={currentLang}
                />
              </div>

              {/* Pet Name tag */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  sound.playClick();
                  setIsRenameModalOpen(true);
                }}
                className="mt-4 min-h-[36px] px-5 py-1.5 rounded-2xl border text-xs font-black flex items-center gap-2.5 shadow-xl cursor-pointer group z-20 transition-all backdrop-blur-md bg-slate-900/60 border-white/20 text-white hover:bg-slate-900/80"
              >
                <span className="drop-shadow-md">{petInfo.name}</span>
                <Edit3 className="w-3.5 h-3.5 text-emerald-400 group-hover:text-emerald-300" />
              </motion.button>
            </div>

            {/* Floating Chat and Care Action Container styled as an elegant overlay bar */}
            <div className="absolute bottom-4 left-4 right-4 z-30 flex justify-center">
              <div 
                className="w-full max-w-md p-3 rounded-[2rem] border shadow-2xl backdrop-blur-xl space-y-3 bg-slate-900/70 border-white/15"
              >
                {/* Chat Trigger Button */}
                <button 
                  onClick={() => {
                    sound.playClick();
                    setIsChatModalOpen(true);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-2xl active:scale-98 transition-all cursor-pointer group min-h-[48px] border bg-slate-800/80 border-white/10 hover:bg-slate-700/80"
                >
                  <div className="flex items-center gap-3.5">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg bg-emerald-500 text-white"
                    >
                      <MessageSquare className="w-5 h-5 fill-emerald-100" />
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] font-black leading-tight text-white tracking-wide uppercase">
                        {currentLang === 'es' ? `Chatear con ${petInfo.name}` : `Chat with ${petInfo.name}`}
                      </div>
                      <div className="text-[8px] font-bold leading-none mt-1 text-emerald-200">
                        {currentLang === 'es' ? '¡Habla con tu compañero ecológico!' : 'Talk with your eco companion!'}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 opacity-80 group-hover:opacity-100 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Unified care buttons dock inside the same translucent bar */}
                <div className="flex gap-2.5">
                  <div className="relative flex-1">
                    <button
                      onClick={() => {
                        sound.playClick();
                        setShowFoodSelector(!showFoodSelector);
                      }}
                      className="w-full min-h-[48px] py-2 px-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[9px] sm:text-[10px] uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/20 active:scale-95"
                    >
                      <Utensils className="w-4 h-4" />
                      <span>{t.feed}</span>
                    </button>

                    {/* Sustainable Food Selector dropdown */}
                    <AnimatePresence>
                    {showFoodSelector && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-[110%] left-0 mb-2 w-64 bg-slate-800 border border-white/10 rounded-3xl p-4 shadow-2xl z-50 space-y-3 max-w-sm backdrop-blur-xl"
                      >
                        <div className="flex items-center justify-between text-xs font-black text-emerald-400 pb-2 border-b border-white/10">
                          <span className="flex items-center gap-2">
                            <Utensils className="w-4 h-4" />
                            {t.sustainableFoods}
                          </span>
                          <button
                            onClick={() => setShowFoodSelector(false)}
                            className="w-8 h-8 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 cursor-pointer flex items-center justify-center transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="space-y-2 max-h-56 overflow-y-auto pr-1 no-scrollbar">
                          {getFoodsForSpecies(petInfo.species || 'cat', currentLang).map((food) => (
                            <button
                              key={food.id}
                              onClick={() => {
                                if (food.price > 0 && user.coins < food.price) {
                                  sound.playWrong();
                                  return;
                                }
                                onFeedFood(food);
                                setShowFoodSelector(false);
                                triggerFeedback(`+${food.hungerBoost} ${t.hunger} • +${food.xpGained} XP 🍎`, 'text-emerald-400');
                              }}
                              className="w-full min-h-[48px] flex items-center justify-between p-2.5 rounded-2xl bg-slate-700/50 hover:bg-slate-700 border border-white/5 text-left transition-all active:scale-95 cursor-pointer group"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/10 group-hover:border-emerald-500 transition-colors shrink-0 flex items-center justify-center">
                                  <EcoIcon name={food.icon} className="w-5 h-5 text-white" />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-[11px] font-bold text-white truncate">{food.name}</div>
                                  <div className="text-[9px] text-emerald-400 font-semibold truncate">
                                    +{food.hungerBoost} {t.hunger} • +{food.xpGained} XP
                                  </div>
                                </div>
                              </div>

                              <div className="text-xs font-black text-amber-400 flex items-center gap-1 shrink-0 ml-2">
                                {food.price === 0 ? (
                                  <span className="text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20 text-[9px] uppercase tracking-wider">
                                    {t.free}
                                  </span>
                                ) : (
                                  <>
                                    <Coins className="w-3.5 h-3.5" />
                                    <span>{food.price}</span>
                                  </>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                    </AnimatePresence>
                  </div>

                  <button
                    onClick={() => {
                      onCleanPet();
                      triggerFeedback(`+35 ${t.hygiene} • +15 XP 🫧`, 'text-sky-300');
                    }}
                    className="flex-1 min-h-[48px] py-2 px-2 bg-sky-600 hover:bg-sky-500 text-white font-black text-[9px] sm:text-[10px] uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-sky-500/20 active:scale-95"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{t.clean}</span>
                  </button>
                  <button
                    onClick={() => {
                      onSleepPet();
                      triggerFeedback(`+40 ${t.energy} • +15 XP 🌙`, 'text-indigo-300');
                    }}
                    className="flex-1 min-h-[48px] py-2 px-2 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-[9px] sm:text-[10px] uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-500/20 active:scale-95"
                  >
                    <Moon className="w-4 h-4" />
                    <span>{t.rest}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 2. DYNAMIC ENVIRONMENT WIDGETS PANEL (Río Cauca, Eco-tips, Mascota cards) */}
          <HomeEcoWindows
            user={user}
            stats={stats}
            petInfo={petInfo}
            onOpenRenameModal={() => setIsRenameModalOpen(true)}
            onOpenPanoramicWindow={() => setIsRiverModalOpen(true)}
            onReward={(xp, coins) => {
              onRewardXpAndCoins(xp, coins);
              triggerFeedback(`+${xp} XP • +${coins} 🪙`, 'text-accent');
            }}
          />

          {/* 3. ON MOBILE / TABLET ONLY: RENDER RECYCLE GUIDE STACKED AT BOTTOM */}
          <div className="block lg:hidden">
            <RecycleGuideWidget onQuickRecycleInfo={onQuickRecycleInfo} t={t} lang={currentLang} />
          </div>
        </div>

        {/* RIGHT COLUMN: RECYCLE GUIDE SIDEBAR (ON DESKTOP/TABLET LARGER VIEW >= lg) */}
        <div className="hidden lg:flex w-80 flex-col gap-5 shrink-0 overflow-y-auto pr-1 no-scrollbar">
          <RecycleGuideWidget onQuickRecycleInfo={onQuickRecycleInfo} t={t} lang={currentLang} />
        </div>

      </div>

      {/* LEARN ENGLISH MODAL */}
      <LearnEnglishModal
        isOpen={isEnglishModalOpen}
        onClose={() => setIsEnglishModalOpen(false)}
        language={currentLang === 'es' ? 'es' : 'en'}
        onReward={(xp, coins) => {
          onRewardXpAndCoins(xp, coins);
          triggerFeedback(`+${xp} XP • +${coins} 🪙 Monedas`, 'text-cyan-300');
        }}
      />

      {/* AERIS CHAT MODAL */}
      <AerisChatModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        petInfo={petInfo}
        user={user}
        stats={stats}
        onRewardXp={(xp) => {
          onRewardXpAndCoins(xp, 0);
          triggerFeedback(`+${xp} XP • Eco-Diálogo 🐾`, 'text-cyan-300');
        }}
      />

      {/* PET RENAME MODAL */}
      <PetRenameModal
        isOpen={isRenameModalOpen}
        onClose={() => setIsRenameModalOpen(false)}
        petInfo={petInfo}
        onRename={(newName) => {
          if (onUpdatePetName) {
            onUpdatePetName(newName);
          }
          triggerFeedback(`¡Renombrado a ${newName}! ✨`, 'text-cyan-300');
        }}
      />

      {/* RIVER OBSERVATORY PANORAMIC MODAL */}
      <RiverObservatoryModal
        isOpen={isRiverModalOpen}
        onClose={() => setIsRiverModalOpen(false)}
        onReward={(xp, coins) => {
          onRewardXpAndCoins(xp, coins);
          triggerFeedback(`+${xp} XP • +${coins} 🪙 Río Cauca`, 'text-cyan-300');
        }}
      />
    </div>
  );
};

