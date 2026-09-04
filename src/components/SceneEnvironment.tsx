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
        <path id="grass1" d="M 0 20 Q 4 0 10 -15" fill="none" stroke="#66ad3e" strokeWidth="4.5" strokeLinecap="round" />
        <path id="grass2" d="M 0 20 Q -4 0 -10 -15" fill="none" stroke="#66ad3e" strokeWidth="4.5" strokeLinecap="round" />
        <g id="daisy">
          <ellipse cx="0" cy="-12" rx="7" ry="11" fill="#eaf7f7" transform="rotate(0)" />
          <ellipse cx="11.4" cy="-3.7" rx="7" ry="11" fill="#eaf7f7" transform="rotate(72)" />
          <ellipse cx="7.1" cy="9.7" rx="7" ry="11" fill="#eaf7f7" transform="rotate(144)" />
          <ellipse cx="-7.1" cy="9.7" rx="7" ry="11" fill="#eaf7f7" transform="rotate(216)" />
          <ellipse cx="-11.4" cy="-3.7" rx="7" ry="11" fill="#eaf7f7" transform="rotate(288)" />
          <circle cx="0" cy="0" r="7.5" fill="#e3cf34" />
        </g>
        <circle id="dot" cx="0" cy="0" r="3.5" fill="#eaf7f7" />
      </defs>

      {/* Sky */}
      <rect width="800" height="500" fill="#64c3e3" />

      {/* Sun */}
      <g transform="translate(140, 100)">
        <circle cx="0" cy="0" r="54" fill="#eba162" stroke="#eba162" strokeWidth="14" strokeLinecap="round" strokeDasharray="0.1 14.037" />
        <circle cx="0" cy="0" r="46" fill="#dce172" />
      </g>

      {/* Clouds */}
      <g fill="#d9eeef">
        {/* Left Cloud */}
        <circle cx="40" cy="200" r="45" />
        <circle cx="100" cy="150" r="60" />
        <circle cx="180" cy="165" r="55" />
        <circle cx="240" cy="195" r="40" />
        <rect x="25" y="150" width="220" height="90" rx="30" />
        
        {/* Right Cloud */}
        <circle cx="510" cy="230" r="55" />
        <circle cx="590" cy="160" r="75" />
        <circle cx="690" cy="190" r="65" />
        <circle cx="770" cy="230" r="50" />
        <rect x="500" y="170" width="280" height="115" rx="35" />
      </g>

      {/* Green Hill */}
      <path d="M 0 310 Q 400 290 800 320 L 800 500 L 0 500 Z" fill="#9bd16c" />

      {/* Grass blades */}
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
      className="border rounded-[24px] p-4 flex flex-col gap-3.5 shadow-sm w-full shrink-0"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
        color: 'var(--text-primary)',
      }}
    >
      <div className="flex items-center gap-2 pb-0.5">
        <Recycle className="w-4 h-4 animate-[spin_10s_linear_infinite]" style={{ color: 'var(--accent)' }} />
        <h2 className="text-xs font-extrabold uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
          {t.quickBinInfoTitle || (lang === 'es' ? 'Guía de Reciclaje' : 'Recycling Guide')}
        </h2>
      </div>

      <div className="flex flex-col gap-2.5">
        {/* GREEN BLOCK */}
        <button
          onClick={() => {
            sound.playClick();
            onQuickRecycleInfo('organic');
          }}
          className="w-full p-2.5 rounded-2xl border transition-all text-left flex items-center justify-between gap-3 group active:scale-[0.98] cursor-pointer min-h-[56px]"
          style={{
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderColor: 'rgba(16, 185, 129, 0.35)',
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-sm">
              <Leaf className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[8px] font-black text-emerald-500 uppercase tracking-wider mb-0.5">{lang === 'es' ? 'VERDE' : 'GREEN'}</div>
              <div className="text-[11px] font-extrabold leading-none text-emerald-400">{t.organic || 'Organic'}</div>
            </div>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-emerald-500 shrink-0 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </button>

        {/* WHITE BLOCK */}
        <button
          onClick={() => {
            sound.playClick();
            onQuickRecycleInfo('recyclable');
          }}
          className="w-full p-2.5 rounded-2xl border transition-all text-left flex items-center justify-between gap-3 group active:scale-[0.98] cursor-pointer min-h-[56px]"
          style={{
            backgroundColor: 'rgba(56, 189, 248, 0.1)',
            borderColor: 'rgba(56, 189, 248, 0.35)',
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-sky-600 flex items-center justify-center text-white shrink-0 shadow-sm">
              <Recycle className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[8px] font-black text-sky-400 uppercase tracking-wider mb-0.5">{lang === 'es' ? 'BLANCO' : 'WHITE'}</div>
              <div className="text-[11px] font-extrabold leading-none text-sky-300">{t.recyclable || 'Recyclables'}</div>
            </div>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-sky-400 shrink-0 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </button>

        {/* BLACK BLOCK */}
        <button
          onClick={() => {
            sound.playClick();
            onQuickRecycleInfo('non_usable');
          }}
          className="w-full p-2.5 rounded-2xl border transition-all text-left flex items-center justify-between gap-3 group active:scale-[0.98] cursor-pointer min-h-[56px]"
          style={{
            backgroundColor: 'rgba(100, 116, 139, 0.15)',
            borderColor: 'rgba(100, 116, 139, 0.35)',
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-700 flex items-center justify-center text-white shrink-0 shadow-sm">
              <Trash2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[8px] font-black text-slate-400 uppercase tracking-wider mb-0.5">{lang === 'es' ? 'NEGRO' : 'BLACK'}</div>
              <div className="text-[11px] font-extrabold leading-none text-slate-300">{t.nonUsable || 'Non-Usable'}</div>
            </div>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
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
      className="w-full h-full relative overflow-y-auto overflow-x-hidden flex flex-col select-none "
      style={{
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
      }}
    >
      {/* Floating Action Feedback Text (+25 XP, etc.) */}
      <div className="absolute inset-0 pointer-events-none z-40 flex items-center justify-center">
        <AnimatePresence>
          {activeFeedback.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 1, y: 30, scale: 0.8 }}
              animate={{ opacity: 0, y: -70, scale: 1.25 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="px-3.5 py-1 rounded-2xl border shadow-2xl backdrop-blur-md font-black text-xs sm:text-sm"
              style={{
                backgroundColor: 'var(--surface)',
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
      <div className="w-full flex-1 max-w-7xl mx-auto p-3 sm:p-5 flex flex-col lg:flex-row gap-4 sm:gap-5 min-h-0 overflow-y-auto lg:overflow-hidden pb-20 md:pb-5">
        
        {/* LEFT COLUMN: THE 2.5D GAME VIEWPORT & PRIMARY CONTROLS */}
        <div className="flex-1 flex flex-col gap-4 min-h-0 lg:overflow-y-auto pr-0 lg:pr-1 no-scrollbar">
          
          {/* 1. THE 2.5D ILLUSTRATED LANDSCAPE CARD */}
          <div 
            className="w-full relative rounded-[28px] border border-[#e2e8f0] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] bg-[#e0f2fe] flex flex-col justify-between shrink-0"
            style={{
              height: 'clamp(360px, 48vh, 480px)',
              minHeight: '360px'
            }}
          >
            {/* Beautiful SVG Landscape Background */}
            <SanctuaryLandscape />

            {/* Floators over landscape (LICEO CAUCASIA SANCTUARY & Target badge) */}
            <div className="absolute top-3 left-3 right-3 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pointer-events-none">
              <div 
                className="px-3 py-1 rounded-xl border shadow-sm flex items-center gap-2 backdrop-blur-md self-start"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }}
              >
                <div className="w-3.5 h-3.5 rounded-full border flex items-center justify-center" style={{ borderColor: 'var(--accent)' }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                </div>
                <span className="text-[7.5px] font-black tracking-wider uppercase" style={{ color: 'var(--text-primary)' }}>
                  {t.sanctuaryTitle}
                </span>
                <ChevronRight className="w-3 h-3" style={{ color: 'var(--text-muted)' }} />
              </div>
              
              <div 
                className="px-3 py-1 rounded-xl border shadow-sm flex items-center gap-1.5 self-start backdrop-blur-md"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'rgba(245, 158, 11, 0.4)',
                }}
              >
                <Award className="w-3 h-3 text-amber-400" />
                <span className="text-[7.5px] font-bold" style={{ color: 'var(--text-secondary)' }}>
                  {currentLang === 'es' ? 'Meta Nvl' : 'Target Level'} {user.level + 1}:
                </span>
                <span className="text-[7.5px] font-black text-amber-400 truncate max-w-[140px] sm:max-w-none">
                  {getLocalizedUnlockName(nextUnlock.unlockName, currentLang)}
                </span>
              </div>
            </div>

            {/* Pet / Companion Center Stage */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pb-20">
              {/* Elegant Glowing Pedestal */}
              <div 
                className="absolute top-[60%] pointer-events-none w-48 h-10 rounded-[100%] blur-[8px] opacity-40"
                style={{ backgroundColor: 'var(--accent)' }}
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
                className="mt-2 min-h-[30px] px-3.5 py-1 rounded-xl border text-[10px] font-extrabold flex items-center gap-2 shadow-sm cursor-pointer group z-20 transition-all backdrop-blur-md"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }}
              >
                <span>{petInfo.name}</span>
                <Edit3 className="w-3 h-3" style={{ color: 'var(--accent)' }} />
              </motion.button>
            </div>

            {/* Floating Chat and Care Action Container styled as an elegant overlay bar */}
            <div className="absolute bottom-3 left-3 right-3 z-30">
              <div 
                className="w-full max-w-[420px] mx-auto p-2.5 sm:p-3 rounded-2xl border shadow-xl backdrop-blur-xl space-y-2.5"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                }}
              >
                {/* Chat Trigger Button */}
                <button 
                  onClick={() => {
                    sound.playClick();
                    setIsChatModalOpen(true);
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-xl active:scale-98 transition-all cursor-pointer group min-h-[40px] border"
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <div 
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-sm"
                      style={{ backgroundColor: 'var(--accent)', color: '#ffffff' }}
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-[8.5px] font-black leading-tight" style={{ color: 'var(--text-primary)' }}>
                        {currentLang === 'es' ? `Chatear con ${petInfo.name}` : `Chat with ${petInfo.name}`}
                      </div>
                      <div className="text-[7px] font-bold leading-none mt-0.5" style={{ color: 'var(--text-muted)' }}>
                        {currentLang === 'es' ? '¡Habla con tu compañero ecológico!' : 'Talk with your eco companion!'}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100" style={{ color: 'var(--accent)' }} />
                </button>

                {/* Unified care buttons dock inside the same translucent bar */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <button
                      onClick={() => {
                        sound.playClick();
                        setShowFoodSelector(!showFoodSelector);
                      }}
                      className="w-full min-h-[40px] py-1.5 px-2 bg-[#6b8f7e] hover:bg-[#5a7d6d] text-white font-extrabold text-[8px] sm:text-[9px] uppercase tracking-[0.1em] rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                    >
                      <Utensils className="w-3.5 h-3.5" />
                      <span>{t.feed}</span>
                    </button>

                    {/* Sustainable Food Selector dropdown */}
                    {showFoodSelector && (
                      <div className="fixed sm:absolute bottom-32 sm:bottom-full left-1/2 sm:left-0 -translate-x-1/2 sm:translate-x-0 mb-2 w-[calc(100vw-36px)] sm:w-80 bg-white border border-stone-200 rounded-3xl p-3.5 shadow-2xl z-50 space-y-2.5 max-w-sm">
                        <div className="flex items-center justify-between text-xs font-black text-emerald-700 pb-2 border-b border-stone-100">
                          <span className="flex items-center gap-1.5">
                            <Utensils className="w-4 h-4 text-emerald-600" />
                            {t.sustainableFoods}
                          </span>
                          <button
                            onClick={() => setShowFoodSelector(false)}
                            className="min-w-[32px] min-h-[32px] p-1 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-50 cursor-pointer flex items-center justify-center"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 no-scrollbar">
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
                                triggerFeedback(`+${food.hungerBoost} ${t.hunger} • +${food.xpGained} XP 🍎`, 'text-emerald-600');
                              }}
                              className="w-full min-h-[40px] flex items-center justify-between p-2 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200/60 text-left transition-all active:scale-98 cursor-pointer group"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="p-1 rounded-lg bg-white border border-stone-200 group-hover:border-emerald-500 transition-colors shrink-0">
                                  <EcoIcon name={food.icon} className="w-4 h-4 text-stone-700" />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-[11px] font-bold text-stone-800 truncate">{food.name}</div>
                                  <div className="text-[9px] text-emerald-600 font-semibold truncate">
                                    +{food.hungerBoost} {t.hunger} • +{food.xpGained} XP
                                  </div>
                                </div>
                              </div>

                              <div className="text-xs font-black text-amber-600 flex items-center gap-1 shrink-0 ml-1">
                                {food.price === 0 ? (
                                  <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 text-[8.5px]">
                                    {t.free}
                                  </span>
                                ) : (
                                  <>
                                    <Coins className="w-3 h-3 text-amber-500" />
                                    <span>{food.price}</span>
                                  </>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      onCleanPet();
                      triggerFeedback(`+35 ${t.hygiene} • +15 XP 🫧`, 'text-cyan-300');
                    }}
                    className="flex-1 min-h-[40px] py-1.5 px-2 bg-[#74a8ac] hover:bg-[#629498] text-white font-extrabold text-[8px] sm:text-[9px] uppercase tracking-[0.1em] rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t.clean}</span>
                  </button>
                  <button
                    onClick={() => {
                      onSleepPet();
                      triggerFeedback(`+40 ${t.energy} • +15 XP 🌙`, 'text-indigo-300');
                    }}
                    className="flex-1 min-h-[40px] py-1.5 px-2 bg-[#7ca1c0] hover:bg-[#6b8fab] text-white font-extrabold text-[8px] sm:text-[9px] uppercase tracking-[0.1em] rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                  >
                    <Moon className="w-3.5 h-3.5" />
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
              triggerFeedback(`+${xp} XP • +${coins} 🪙`, 'text-cyan-300');
            }}
          />

          {/* 3. ON MOBILE / TABLET ONLY: RENDER RECYCLE GUIDE STACKED AT BOTTOM */}
          <div className="block lg:hidden">
            <RecycleGuideWidget onQuickRecycleInfo={onQuickRecycleInfo} t={t} lang={currentLang} />
          </div>
        </div>

        {/* RIGHT COLUMN: RECYCLE GUIDE SIDEBAR (ON DESKTOP/TABLET LARGER VIEW >= lg) */}
        <div className="hidden lg:flex w-72 flex-col gap-4 shrink-0 overflow-y-auto pr-0.5 no-scrollbar">
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
