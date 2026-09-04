import React, { useState, useEffect, useRef, MouseEvent, TouchEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PetInfo, PetColorScheme, PetSpecies } from '../types';
import { Sparkles, Utensils, Moon, Heart, Award, Gamepad2, AlertCircle } from 'lucide-react';

interface PetAvatarProps {
  petInfo: PetInfo;
  actionState?: 'idle' | 'eating' | 'playing' | 'sleeping' | 'happy' | 'sad' | 'celebrating';
  onPetClick?: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero' | 'responsive';
  showMoodBubble?: boolean;
  isHungry?: boolean;
  isTired?: boolean;
  isEnergized?: boolean;
  affectionEnergy?: number;
  language?: 'en' | 'es';
}

export function PetAvatar({
  petInfo,
  actionState = 'idle',
  onPetClick,
  showMoodBubble = true,
  isHungry = false,
  isTired = false,
  isEnergized = false,
  affectionEnergy = 100,
  language = 'en',
}: PetAvatarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [clickSparks, setClickSparks] = useState<{ id: number; x: number; text: string; isXP: boolean }[]>([]);

  const species: PetSpecies = petInfo.species || 'cat';

  // Periodic organic blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 3400 + Math.random() * 2200);

    return () => clearInterval(blinkInterval);
  }, []);

  // 2.5D Dynamic Cursor / Touch Depth Tracking
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || actionState === 'sleeping') return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateY = Math.max(-14, Math.min(14, (x / (rect.width / 2)) * 12));
    const rotateX = Math.max(-10, Math.min(10, (-y / (rect.height / 2)) * 10));
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.touches.length === 0 || actionState === 'sleeping') return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left - rect.width / 2;
    const y = touch.clientY - rect.top - rect.height / 2;
    const rotateY = Math.max(-12, Math.min(12, (x / (rect.width / 2)) * 10));
    const rotateX = Math.max(-8, Math.min(8, (-y / (rect.height / 2)) * 8));
    setTilt({ rotateX, rotateY });
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (onPetClick) {
      onPetClick();
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left - 40;
      
      const hasXPBonus = (affectionEnergy || 0) > 0;
      let text = '';
      if (hasXPBonus) {
        if (species === 'dog') {
          const dogSparks = ['+3 XP ⚡', '¡Guau! 🐶💚', '¡Mueve la colita! 🐾', '+Ánimo ✨'];
          text = dogSparks[Math.floor(Math.random() * dogSparks.length)];
        } else if (species === 'rabbit') {
          const rabbitSparks = ['+3 XP ⚡', '¡Sniff! 🐰🌱', '¡Saltito! ✨', '+Ánimo 🥕'];
          text = rabbitSparks[Math.floor(Math.random() * rabbitSparks.length)];
        } else {
          const xpSparks = ['+3 XP ⚡', '+Ánimo ✨', '¡Miau! 💚', '🐾'];
          text = xpSparks[Math.floor(Math.random() * xpSparks.length)];
        }
      } else {
        const tiredSparks = ['Zzz...', 'Agotado 💧', 'Necesito descanso', '...'];
        text = tiredSparks[Math.floor(Math.random() * tiredSparks.length)];
      }

      const newSpark = { id: Date.now() + Math.random(), x: clickX, text, isXP: hasXPBonus };
      setClickSparks((prev) => [...prev.slice(-3), newSpark]);
      setTimeout(() => {
        setClickSparks((prev) => prev.filter((h) => h.id !== newSpark.id));
      }, 1100);
    }
  };

  // Color Palettes based on selected Pet Skin Variant and Species
  interface PaletteColors {
    coatHighlight: string;
    coatBase: string;
    coatShadow: string;
    bellyTuft: string;
    earInner: string;
    spotColor: string;
    eyeIrisGradStart: string;
    eyeIrisGradEnd: string;
    runeColor: string;
    whiskerColor: string;
  }

  // 1. CAT (Mystic Feline - Black / Dark Mystic by default)
  const catPalettes: Record<PetColorScheme, PaletteColors> = {
    mystic_night: {
      coatHighlight: '#1e293b',
      coatBase: '#0b101d',
      coatShadow: '#030712',
      bellyTuft: '#38bdf8',
      earInner: '#f43f5e',
      spotColor: '#020617',
      eyeIrisGradStart: '#67e8f9',
      eyeIrisGradEnd: '#0369a1',
      runeColor: '#22d3ee',
      whiskerColor: '#94a3b8',
    },
    emerald_forest: {
      coatHighlight: '#166534',
      coatBase: '#064e3b',
      coatShadow: '#022c22',
      bellyTuft: '#86efac',
      earInner: '#f472b6',
      spotColor: '#022c22',
      eyeIrisGradStart: '#4ade80',
      eyeIrisGradEnd: '#15803d',
      runeColor: '#34d399',
      whiskerColor: '#a7f3d0',
    },
    golden_sun: {
      coatHighlight: '#f59e0b',
      coatBase: '#b45309',
      coatShadow: '#78350f',
      bellyTuft: '#fde68a',
      earInner: '#fb7185',
      spotColor: '#78350f',
      eyeIrisGradStart: '#fcd34d',
      eyeIrisGradEnd: '#d97706',
      runeColor: '#fbbf24',
      whiskerColor: '#fef3c7',
    },
    river_blue: {
      coatHighlight: '#0284c7',
      coatBase: '#075985',
      coatShadow: '#082f49',
      bellyTuft: '#bae6fd',
      earInner: '#fb7185',
      spotColor: '#0c4a6e',
      eyeIrisGradStart: '#38bdf8',
      eyeIrisGradEnd: '#0369a1',
      runeColor: '#0ea5e9',
      whiskerColor: '#e0f2fe',
    },
    snow_frost: {
      coatHighlight: '#ffffff',
      coatBase: '#e2e8f0',
      coatShadow: '#94a3b8',
      bellyTuft: '#c7d2fe',
      earInner: '#f472b6',
      spotColor: '#cbd5e1',
      eyeIrisGradStart: '#818cf8',
      eyeIrisGradEnd: '#4338ca',
      runeColor: '#a855f7',
      whiskerColor: '#64748b',
    },
  };

  // 2. DOG (Eco Scout - Rich Warm Brown / Café by default with chocolate spots)
  const dogPalettes: Record<PetColorScheme, PaletteColors> = {
    mystic_night: {
      coatHighlight: '#9f6036', // Warm caramel/toffee highlight
      coatBase: '#6c3b1a',      // Rich warm scout brown
      coatShadow: '#3f1f0a',    // Deep chocolate shadow
      bellyTuft: '#fef3c7',     // Soft warm cream chest & muzzle
      earInner: '#fca5a5',      // Gentle rosy inner ear
      spotColor: '#361805',     // Dark chocolate ear & eye patch
      eyeIrisGradStart: '#fbbf24', // Warm golden amber scout eyes
      eyeIrisGradEnd: '#b45309',
      runeColor: '#10b981',     // Eco scout emerald crest
      whiskerColor: '#3f1f0a',
    },
    emerald_forest: {
      coatHighlight: '#855127',
      coatBase: '#593213',
      coatShadow: '#2f1704',
      bellyTuft: '#dcfce7',
      earInner: '#fca5a5',
      spotColor: '#1e3a2b',
      eyeIrisGradStart: '#4ade80',
      eyeIrisGradEnd: '#15803d',
      runeColor: '#34d399',
      whiskerColor: '#2f1704',
    },
    golden_sun: {
      coatHighlight: '#fbbf24',
      coatBase: '#d97706',
      coatShadow: '#854d0e',
      bellyTuft: '#fef9c3',
      earInner: '#fca5a5',
      spotColor: '#78350f',
      eyeIrisGradStart: '#fde047',
      eyeIrisGradEnd: '#ca8a04',
      runeColor: '#f59e0b',
      whiskerColor: '#854d0e',
    },
    river_blue: {
      coatHighlight: '#8c5836',
      coatBase: '#5c3319',
      coatShadow: '#351909',
      bellyTuft: '#e0f2fe',
      earInner: '#fca5a5',
      spotColor: '#075985',
      eyeIrisGradStart: '#38bdf8',
      eyeIrisGradEnd: '#0284c7',
      runeColor: '#06b6d4',
      whiskerColor: '#351909',
    },
    snow_frost: {
      coatHighlight: '#d6ccc2',
      coatBase: '#8d6e63',
      coatShadow: '#4e342e',
      bellyTuft: '#ffffff',
      earInner: '#fca5a5',
      spotColor: '#3e2723',
      eyeIrisGradStart: '#818cf8',
      eyeIrisGradEnd: '#4338ca',
      runeColor: '#a855f7',
      whiskerColor: '#4e342e',
    },
  };

  // 3. RABBIT (Garden Botanical - Pure Pearl White / Blanco by default with pink ears)
  const rabbitPalettes: Record<PetColorScheme, PaletteColors> = {
    mystic_night: {
      coatHighlight: '#ffffff', // Radiant pure white highlight
      coatBase: '#f1f5f9',      // Soft pearl white base
      coatShadow: '#cbd5e1',    // Gentle volumetric slate shadow
      bellyTuft: '#fdf2f8',     // Delicate soft pastel pink chest fluff
      earInner: '#f472b6',      // Rosy velvet inner ears
      spotColor: '#e2e8f0',     // Soft cloudy white patch
      eyeIrisGradStart: '#f43f5e', // Ruby pink gem eyes
      eyeIrisGradEnd: '#9d174d',
      runeColor: '#22c55e',     // Botanical garden leaf green
      whiskerColor: '#94a3b8',
    },
    emerald_forest: {
      coatHighlight: '#ffffff',
      coatBase: '#f0fdf4',
      coatShadow: '#bbf7d0',
      bellyTuft: '#dcfce7',
      earInner: '#f472b6',
      spotColor: '#86efac',
      eyeIrisGradStart: '#4ade80',
      eyeIrisGradEnd: '#15803d',
      runeColor: '#10b981',
      whiskerColor: '#86efac',
    },
    golden_sun: {
      coatHighlight: '#ffffff',
      coatBase: '#fefce8',
      coatShadow: '#fef08a',
      bellyTuft: '#fef3c7',
      earInner: '#fb7185',
      spotColor: '#fde047',
      eyeIrisGradStart: '#f59e0b',
      eyeIrisGradEnd: '#b45309',
      runeColor: '#eab308',
      whiskerColor: '#cbd5e1',
    },
    river_blue: {
      coatHighlight: '#ffffff',
      coatBase: '#f0f9ff',
      coatShadow: '#bae6fd',
      bellyTuft: '#e0f2fe',
      earInner: '#f472b6',
      spotColor: '#7dd3fc',
      eyeIrisGradStart: '#38bdf8',
      eyeIrisGradEnd: '#0284c7',
      runeColor: '#0ea5e9',
      whiskerColor: '#94a3b8',
    },
    snow_frost: {
      coatHighlight: '#ffffff',
      coatBase: '#f8fafc',
      coatShadow: '#94a3b8',
      bellyTuft: '#ffffff',
      earInner: '#f472b6',
      spotColor: '#e2e8f0',
      eyeIrisGradStart: '#818cf8',
      eyeIrisGradEnd: '#4338ca',
      runeColor: '#a855f7',
      whiskerColor: '#64748b',
    },
  };

  const palettesBySpecies = species === 'dog' 
    ? dogPalettes 
    : species === 'rabbit' 
    ? rabbitPalettes 
    : catPalettes;

  const palette = palettesBySpecies[petInfo.colorScheme || 'mystic_night'] || palettesBySpecies.mystic_night;

  // Dynamic Aura color based on state & equipped aura
  const getAuraColor = () => {
    if (petInfo.equippedAura === 'aura_cyber_glitch') return 'from-cyan-400/35 via-blue-500/20 to-transparent';
    if (petInfo.equippedAura === 'aura_spores') return 'from-emerald-400/35 via-amber-400/20 to-transparent';
    if (actionState === 'celebrating') return 'from-amber-400/35 via-cyan-400/30 to-emerald-400/15';
    if (actionState === 'eating' || actionState === 'happy') return 'from-emerald-400/30 via-teal-400/20 to-transparent';
    if (actionState === 'sleeping' || isTired) return 'from-sky-600/25 via-indigo-600/20 to-transparent';
    if (isEnergized) return 'from-cyan-400/35 via-blue-500/25 to-transparent';
    if (isHungry) return 'from-amber-500/25 via-orange-500/15 to-transparent';
    return 'from-cyan-500/20 via-teal-500/15 to-transparent';
  };

  const getHappyBubbleText = () => {
    if (language === 'es') {
      if (species === 'dog') return '¡Moviendo la cola!';
      if (species === 'rabbit') return '¡Saltando de alegría!';
      return '¡Ronroneando!';
    } else {
      if (species === 'dog') return 'Wagging Tail!';
      if (species === 'rabbit') return 'Hopping Happily!';
      return 'Purring!';
    }
  };

  return (
    <div
      ref={containerRef}
      id="pet-avatar-container"
      className="relative flex flex-col items-center justify-center select-none cursor-pointer group shrink-0"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      style={{
        width: 'clamp(140px, 36vw, 250px)',
        height: 'clamp(150px, 38vw, 270px)',
        maxHeight: '36vh',
        perspective: '1000px',
      }}
    >
      {/* 1. Dynamic Ambient Aura Behind Pet */}
      <motion.div
        animate={{
          scale: actionState === 'celebrating' ? [1, 1.2, 1] : actionState === 'happy' ? [1, 1.12, 1] : [1, 1.05, 1],
          opacity: actionState === 'sleeping' ? 0.35 : 0.85,
        }}
        transition={{
          repeat: Infinity,
          duration: actionState === 'celebrating' ? 1.1 : 3.2,
          ease: 'easeInOut',
        }}
        className={`absolute inset-2 rounded-full bg-gradient-to-t ${getAuraColor()} blur-xl sm:blur-2xl pointer-events-none -z-10`}
      />

      {/* Floating Sparks on Petting / Interaction */}
      <AnimatePresence>
        {clickSparks.map((spark) => (
          <motion.div
            key={spark.id}
            initial={{ opacity: 1, y: 10, scale: 0.8, x: spark.x }}
            animate={{ opacity: 0, y: -50, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className={`absolute top-1 pointer-events-none z-50 flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[10px] sm:text-[11px] font-black shadow-sm ${
              spark.isXP 
                ? 'bg-white border-emerald-200 text-emerald-600' 
                : 'bg-stone-50 border-stone-200 text-stone-500'
            }`}
          >
            {spark.isXP ? (
              <Sparkles className="w-3 h-3 text-emerald-500 shrink-0 animate-spin" />
            ) : (
              <Moon className="w-3 h-3 text-stone-400 shrink-0" />
            )}
            <span>{spark.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Mood Status Floating Bubble */}
      {showMoodBubble && (actionState !== 'idle' || isHungry || isTired) && (
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 4 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className="absolute top-0 bg-white px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full shadow-md border border-stone-200 text-[9.5px] sm:text-xs font-extrabold text-stone-700 flex items-center gap-1.5 z-30"
        >
          {actionState === 'eating' && (
            <>
              <Utensils className="w-3 h-3 text-emerald-500 animate-bounce" />
              <span className="text-emerald-700">{language === 'es' ? 'Alimentándose...' : 'Feeding...'}</span>
            </>
          )}
          {actionState === 'sleeping' && (
            <>
              <Moon className="w-3 h-3 text-sky-500" />
              <span className="text-sky-700">{language === 'es' ? 'Descansando' : 'Sleeping'}</span>
            </>
          )}
          {actionState === 'happy' && (
            <>
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" />
              <span className="text-rose-700">{getHappyBubbleText()}</span>
            </>
          )}
          {actionState === 'celebrating' && (
            <>
              <Award className="w-3 h-3 text-amber-500 animate-spin" />
              <span className="text-amber-700 font-black">{language === 'es' ? '¡SUBISTE DE NIVEL! ⚡' : 'LEVEL UP! ⚡'}</span>
            </>
          )}
          {actionState === 'playing' && (
            <>
              <Gamepad2 className="w-3 h-3 text-sky-500" />
              <span className="text-sky-700">{language === 'es' ? 'Eco-Modo Activo' : 'Eco-Mode Active'}</span>
            </>
          )}
          {actionState === 'idle' && isHungry && (
            <>
              <AlertCircle className="w-3 h-3 text-amber-500" />
              <span className="text-amber-700">{language === 'es' ? 'Tiene apetito' : 'Is hungry'}</span>
            </>
          )}
          {actionState === 'idle' && !isHungry && isTired && (
            <>
              <Moon className="w-3 h-3 text-indigo-500" />
              <span className="text-indigo-700">{language === 'es' ? 'Algo soñoliento' : 'Sleepy'}</span>
            </>
          )}
        </motion.div>
      )}

      {/* Sleeping Animated Z's */}
      {actionState === 'sleeping' && (
        <div className="absolute top-2 right-4 sm:right-10 pointer-events-none z-40">
          <motion.div
            animate={{ opacity: [0, 1, 0], y: [-5, -35], x: [0, 15] }}
            transition={{ repeat: Infinity, duration: 2.2 }}
            className="text-cyan-400 font-black text-xs sm:text-sm"
          >
            Z
          </motion.div>
          <motion.div
            animate={{ opacity: [0, 1, 0], y: [-5, -45], x: [8, 24] }}
            transition={{ repeat: Infinity, duration: 2.2, delay: 0.7 }}
            className="text-emerald-400 font-black text-sm sm:text-base"
          >
            Z
          </motion.div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2.5D VOLUMETRIC CHARACTER RIG WITH TILT & DEPTH */}
      {/* ========================================================================= */}
      <motion.div
        className="w-full h-full relative flex items-center justify-center"
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          y: actionState === 'sleeping' ? [0, 2, 0] : actionState === 'celebrating' ? [0, -12, 0] : [0, -6, 0],
          scale: actionState === 'happy' ? [1, 1.03, 1] : 1,
        }}
        transition={{
          y: {
            repeat: Infinity,
            duration: actionState === 'celebrating' ? 0.5 : actionState === 'sleeping' ? 3.6 : 2.6,
            ease: 'easeInOut',
          },
          scale: { duration: 0.3 },
          rotateX: { duration: 0.15 },
          rotateY: { duration: 0.15 },
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <svg
          viewBox="0 0 360 400"
          className="w-full h-full object-contain filter drop-shadow-[0_16px_28px_rgba(0,0,0,0.65)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* 2.5D Volumetric Body Gradient with ambient occlusion */}
            <radialGradient id="petBody25D" cx="42%" cy="38%" r="62%">
              <stop offset="0%" stopColor={palette.coatHighlight} />
              <stop offset="65%" stopColor={palette.coatBase} />
              <stop offset="100%" stopColor={palette.coatShadow} />
            </radialGradient>

            {/* 2.5D Head Spherical Gradient */}
            <radialGradient id="petHead25D" cx="40%" cy="32%" r="58%">
              <stop offset="0%" stopColor={palette.coatHighlight} />
              <stop offset="60%" stopColor={palette.coatBase} />
              <stop offset="100%" stopColor={palette.coatShadow} />
            </radialGradient>

            {/* Bioluminescent Glowing Iris */}
            <radialGradient id="petIrisGlow" cx="45%" cy="40%" r="55%">
              <stop offset="0%" stopColor={palette.eyeIrisGradStart} />
              <stop offset="70%" stopColor={palette.eyeIrisGradEnd} />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>

            {/* Cape Gradient */}
            <linearGradient id="solarCapeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>

            {/* Cyber Visor Gradient */}
            <linearGradient id="cyberVisorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.85" />
            </linearGradient>

            {/* Ambient Occlusion Ground Shadow */}
            <radialGradient id="groundShadowGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.65" />
              <stop offset="60%" stopColor="#000000" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* LAYER 0: 2.5D AMBIENT GROUND SHADOW */}
          <ellipse
            cx="180"
            cy="375"
            rx="85"
            ry="18"
            fill="url(#groundShadowGrad)"
          />

          {/* LAYER 1: BACK COSMETICS (CAPES & AURAS) */}
          {petInfo.equippedAccessory === 'acc_solar_cape' && (
            <motion.path
              d="M 125 240 Q 90 320 110 370 Q 180 395 250 370 Q 270 320 235 240 Z"
              fill="url(#solarCapeGrad)"
              stroke="#fbbf24"
              strokeWidth="2.5"
              filter="drop-shadow(0 0 12px rgba(251, 191, 36, 0.5))"
              animate={{
                d: [
                  'M 125 240 Q 85 320 105 370 Q 180 395 255 370 Q 275 320 235 240 Z',
                  'M 125 240 Q 95 320 115 370 Q 180 395 245 370 Q 265 320 235 240 Z',
                  'M 125 240 Q 85 320 105 370 Q 180 395 255 370 Q 275 320 235 240 Z',
                ]
              }}
              transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
            />
          )}

          {/* ========================================================================= */}
          {/* LAYER 1.5: SPECIES-SPECIFIC TAIL */}
          {/* ========================================================================= */}
          {/* CAT TAIL: S-Curve with glowing rune */}
          {species === 'cat' && (
            <motion.g
              animate={{
                rotate: actionState === 'celebrating' ? [-14, 18, -14] : actionState === 'happy' ? [-8, 12, -8] : [0, 8, 0],
                originX: '240px',
                originY: '290px',
              }}
              transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
            >
              <path
                d="M 235 290 C 295 290, 325 220, 295 160 C 280 135, 255 165, 265 185 C 275 210, 245 245, 215 270 Z"
                fill="url(#petBody25D)"
                stroke="#0f172a"
                strokeWidth="2"
              />
              <circle cx="295" cy="160" r="6" fill={palette.runeColor} filter={`drop-shadow(0 0 8px ${palette.runeColor})`} />
              <path d="M 295 160 Q 310 148 305 138 Q 295 145 295 160" fill="#34d399" />
            </motion.g>
          )}

          {/* DOG TAIL: Fluffy Wagging Tail with high energy */}
          {species === 'dog' && (
            <motion.g
              animate={{
                rotate: actionState === 'celebrating' ? [-25, 30, -25] : actionState === 'happy' ? [-18, 22, -18] : [-8, 12, -8],
                originX: '235px',
                originY: '295px',
              }}
              transition={{ repeat: Infinity, duration: actionState === 'happy' || actionState === 'celebrating' ? 0.4 : 1.2, ease: 'easeInOut' }}
            >
              <path
                d="M 230 295 C 270 280, 295 240, 280 205 C 270 185, 250 200, 255 220 C 260 240, 240 265, 215 285 Z"
                fill="url(#petBody25D)"
                stroke="#0f172a"
                strokeWidth="2"
              />
              {/* Fluffy tail tip patch */}
              <ellipse cx="278" cy="208" rx="10" ry="12" fill={palette.bellyTuft} opacity="0.9" />
              <circle cx="276" cy="204" r="4" fill={palette.runeColor} filter={`drop-shadow(0 0 6px ${palette.runeColor})`} />
            </motion.g>
          )}

          {/* RABBIT TAIL: Cute Fluffy Cotton Ball Tail */}
          {species === 'rabbit' && (
            <motion.g
              animate={{
                scale: actionState === 'happy' ? [1, 1.15, 1] : [1, 1.05, 1],
                x: actionState === 'celebrating' ? [-2, 2, -2] : [0, 1, 0],
              }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            >
              <ellipse cx="256" cy="305" rx="20" ry="18" fill="url(#petBody25D)" stroke="#0f172a" strokeWidth="2" />
              <ellipse cx="258" cy="303" rx="15" ry="13" fill={palette.bellyTuft} opacity="0.85" />
              <circle cx="258" cy="303" r="4" fill={palette.runeColor} filter={`drop-shadow(0 0 6px ${palette.runeColor})`} />
            </motion.g>
          )}

          {/* LAYER 2: 2.5D BODY & TORSO */}
          <ellipse cx="180" cy="285" rx="82" ry="92" fill="url(#petBody25D)" stroke="#0f172a" strokeWidth="2.5" />

          {/* Torso Top Highlight / 2.5D Rim Light */}
          <ellipse cx="180" cy="235" rx="60" ry="24" fill={palette.coatHighlight} opacity="0.4" />

          {/* DOG BODY SPOTS */}
          {species === 'dog' && (
            <g opacity="0.55">
              <ellipse cx="140" cy="275" rx="16" ry="22" fill={palette.spotColor} />
              <ellipse cx="225" cy="265" rx="18" ry="14" fill={palette.spotColor} />
            </g>
          )}

          {/* Bioluminescent Cyber Core Chest Rune */}
          <g filter={`drop-shadow(0 0 8px ${palette.runeColor})`}>
            {species === 'cat' && (
              <>
                <polygon points="180,242 196,268 180,294 164,268" fill="none" stroke={palette.runeColor} strokeWidth="3" />
                <circle cx="180" cy="268" r="5" fill={palette.runeColor} />
                <line x1="180" y1="242" x2="180" y2="230" stroke={palette.runeColor} strokeWidth="2" strokeLinecap="round" />
                <line x1="196" y1="268" x2="208" y2="268" stroke={palette.runeColor} strokeWidth="2" strokeLinecap="round" />
                <line x1="164" y1="268" x2="152" y2="268" stroke={palette.runeColor} strokeWidth="2" strokeLinecap="round" />
              </>
            )}
            {species === 'dog' && (
              <>
                {/* Dog Bone-Shield Eco Crest */}
                <path d="M 172 250 Q 180 244 188 250 Q 192 265 180 282 Q 168 265 172 250 Z" fill="none" stroke={palette.runeColor} strokeWidth="2.8" />
                <circle cx="180" cy="262" r="4.5" fill={palette.runeColor} />
                <circle cx="174" cy="252" r="2" fill={palette.runeColor} />
                <circle cx="186" cy="252" r="2" fill={palette.runeColor} />
              </>
            )}
            {species === 'rabbit' && (
              <>
                {/* Rabbit Clover / Leaf Core Crest */}
                <circle cx="180" cy="256" r="4" fill={palette.runeColor} />
                <circle cx="173" cy="264" r="3.5" fill={palette.runeColor} />
                <circle cx="187" cy="264" r="3.5" fill={palette.runeColor} />
                <line x1="180" y1="266" x2="180" y2="278" stroke={palette.runeColor} strokeWidth="2" strokeLinecap="round" />
              </>
            )}
          </g>

          {/* Chest Fur Tuft */}
          <path
            d="M 150 230 C 165 252, 195 252, 210 230 C 200 265, 160 265, 150 230 Z"
            fill={palette.bellyTuft}
            opacity="0.3"
          />

          {/* LAYER 3: REAR & FRONT PAWS */}
          {/* Left Rear Foot */}
          <ellipse cx="132" cy="360" rx="26" ry="16" fill="url(#petBody25D)" stroke="#0f172a" strokeWidth="2" />
          <circle cx="125" cy="363" r="3" fill={palette.runeColor} opacity="0.75" />
          <circle cx="132" cy="365" r="3" fill={palette.runeColor} opacity="0.75" />
          <circle cx="139" cy="363" r="3" fill={palette.runeColor} opacity="0.75" />

          {/* Right Rear Foot */}
          <ellipse cx="228" cy="360" rx="26" ry="16" fill="url(#petBody25D)" stroke="#0f172a" strokeWidth="2" />
          <circle cx="221" cy="363" r="3" fill={palette.runeColor} opacity="0.75" />
          <circle cx="228" cy="365" r="3" fill={palette.runeColor} opacity="0.75" />
          <circle cx="235" cy="363" r="3" fill={palette.runeColor} opacity="0.75" />

          {/* Front Paws Resting with Depth */}
          <ellipse cx="152" cy="285" rx="15" ry="24" fill="url(#petBody25D)" stroke="#0f172a" strokeWidth="2" />
          <ellipse cx="208" cy="285" rx="15" ry="24" fill="url(#petBody25D)" stroke="#0f172a" strokeWidth="2" />

          {/* LAYER 4: NECK ACCESSORIES */}
          {/* Pañoleta Verde Liceo */}
          {petInfo.equippedAccessory === 'acc_eco_scarf' && (
            <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.4))">
              <path
                d="M 125 210 Q 180 235 235 210 Q 210 245 180 250 Q 150 245 125 210 Z"
                fill="#10b981"
                stroke="#059669"
                strokeWidth="2"
              />
              <path d="M 172 245 L 180 270 L 188 245 Z" fill="#34d399" />
              <path d="M 155 220 Q 180 232 205 220" stroke="#fef08a" strokeWidth="2.5" fill="none" />
            </g>
          )}

          {/* Amuleto del Río Cauca */}
          {petInfo.equippedAccessory === 'acc_cauca_amulet' && (
            <g filter="drop-shadow(0 0 10px #38bdf8)">
              <line x1="140" y1="215" x2="180" y2="238" stroke="#fbbf24" strokeWidth="2.5" />
              <line x1="220" y1="215" x2="180" y2="238" stroke="#fbbf24" strokeWidth="2.5" />
              <path
                d="M 180 235 C 172 245, 170 255, 180 262 C 190 255, 188 245, 180 235 Z"
                fill="#0ea5e9"
                stroke="#38bdf8"
                strokeWidth="1.5"
              />
              <circle cx="178" cy="248" r="2" fill="#ffffff" opacity="0.8" />
            </g>
          )}

          {/* ========================================================================= */}
          {/* LAYER 5: SPECIES EARS */}
          {/* ========================================================================= */}

          {/* CAT EARS: Pointed triangular ears */}
          {species === 'cat' && (
            <>
              {/* Left Ear */}
              <motion.g
                animate={{
                  rotate: isHungry ? [-7, -3, -7] : [0, -4, 0],
                  originX: '100px',
                  originY: '115px',
                }}
                transition={{ repeat: Infinity, duration: 3.4, ease: 'easeInOut' }}
              >
                <polygon points="85,135 105,42 148,112" fill="url(#petHead25D)" stroke="#0f172a" strokeWidth="2.5" />
                <polygon points="96,125 110,65 138,108" fill={palette.earInner} opacity="0.85" />
              </motion.g>

              {/* Right Ear */}
              <motion.g
                animate={{
                  rotate: isTired ? [7, 3, 7] : [0, 4, 0],
                  originX: '260px',
                  originY: '115px',
                }}
                transition={{ repeat: Infinity, duration: 3.4, ease: 'easeInOut', delay: 0.35 }}
              >
                <polygon points="275,135 255,42 212,112" fill="url(#petHead25D)" stroke="#0f172a" strokeWidth="2.5" />
                <polygon points="264,125 250,65 222,108" fill={palette.earInner} opacity="0.85" />
              </motion.g>
            </>
          )}

          {/* DOG EARS: Floppy ears framing the head */}
          {species === 'dog' && (
            <>
              {/* Left Floppy Ear */}
              <motion.g
                animate={{
                  rotate: isHungry ? [-6, 2, -6] : [0, -5, 0],
                  originX: '110px',
                  originY: '100px',
                }}
                transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
              >
                <path
                  d="M 115 95 C 75 90, 50 140, 65 190 C 75 220, 110 215, 118 175 C 122 145, 128 115, 115 95 Z"
                  fill="url(#petHead25D)"
                  stroke="#0f172a"
                  strokeWidth="2.5"
                />
                <path
                  d="M 108 115 C 80 120, 68 150, 78 185 C 85 200, 102 195, 108 170 Z"
                  fill={palette.earInner}
                  opacity="0.8"
                />
              </motion.g>

              {/* Right Floppy Ear (With adorable scout patch) */}
              <motion.g
                animate={{
                  rotate: isTired ? [6, -2, 6] : [0, 5, 0],
                  originX: '250px',
                  originY: '100px',
                }}
                transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut', delay: 0.2 }}
              >
                <path
                  d="M 245 95 C 285 90, 310 140, 295 190 C 285 220, 250 215, 242 175 C 238 145, 232 115, 245 95 Z"
                  fill={palette.spotColor}
                  stroke="#0f172a"
                  strokeWidth="2.5"
                />
                <path
                  d="M 252 115 C 280 120, 292 150, 282 185 C 275 200, 258 195, 252 170 Z"
                  fill={palette.earInner}
                  opacity="0.8"
                />
              </motion.g>
            </>
          )}

          {/* RABBIT EARS: Tall, upright twitching bunny ears */}
          {species === 'rabbit' && (
            <>
              {/* Left Tall Bunny Ear */}
              <motion.g
                animate={{
                  rotate: isHungry ? [-8, -2, -8] : [-3, 3, -3],
                  originX: '135px',
                  originY: '95px',
                }}
                transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
              >
                <path
                  d="M 145 95 C 130 60, 95 -10, 120 -30 C 145 -30, 165 30, 160 90 Z"
                  fill="url(#petHead25D)"
                  stroke="#0f172a"
                  strokeWidth="2.5"
                />
                <path
                  d="M 142 80 C 132 50, 110 5, 124 -15 C 138 -15, 150 30, 150 78 Z"
                  fill={palette.earInner}
                  opacity="0.85"
                />
              </motion.g>

              {/* Right Tall Bunny Ear */}
              <motion.g
                animate={{
                  rotate: isTired ? [8, 2, 8] : [3, -3, 3],
                  originX: '225px',
                  originY: '95px',
                }}
                transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut', delay: 0.3 }}
              >
                <path
                  d="M 215 95 C 230 60, 265 -10, 240 -30 C 215 -30, 195 30, 200 90 Z"
                  fill="url(#petHead25D)"
                  stroke="#0f172a"
                  strokeWidth="2.5"
                />
                <path
                  d="M 218 80 C 228 50, 250 5, 236 -15 C 222 -15, 210 30, 210 78 Z"
                  fill={palette.earInner}
                  opacity="0.85"
                />
              </motion.g>
            </>
          )}

          {/* Head Sphere (2.5D Volumetric Geometry) */}
          <ellipse cx="180" cy="148" rx="80" ry="70" fill="url(#petHead25D)" stroke="#0f172a" strokeWidth="2.5" />

          {/* DOG EYE PATCH (Iconic scout spot over left eye) */}
          {species === 'dog' && (
            <ellipse cx="146" cy="140" rx="25" ry="28" fill={palette.spotColor} opacity="0.65" />
          )}

          {/* Cheek 2.5D Highlights / Blush */}
          <ellipse cx="125" cy="165" rx="20" ry="12" fill={palette.bellyTuft} opacity="0.16" />
          <ellipse cx="235" cy="165" rx="20" ry="12" fill={palette.bellyTuft} opacity="0.16" />

          {/* Cyber / Botanical Cheek Tech Marks */}
          {species === 'cat' && (
            <>
              <path d="M 110 156 L 126 159 L 114 167" stroke={palette.runeColor} strokeWidth="2" fill="none" opacity="0.8" />
              <path d="M 250 156 L 234 159 L 246 167" stroke={palette.runeColor} strokeWidth="2" fill="none" opacity="0.8" />
            </>
          )}
          {species === 'dog' && (
            <>
              <circle cx="120" cy="165" r="2" fill={palette.runeColor} />
              <circle cx="126" cy="168" r="2" fill={palette.runeColor} />
              <circle cx="240" cy="165" r="2" fill={palette.runeColor} />
              <circle cx="234" cy="168" r="2" fill={palette.runeColor} />
            </>
          )}
          {species === 'rabbit' && (
            <>
              <ellipse cx="120" cy="164" rx="8" ry="4" fill="#f43f5e" opacity="0.25" />
              <ellipse cx="240" cy="164" rx="8" ry="4" fill="#f43f5e" opacity="0.25" />
            </>
          )}

          {/* Forehead Bioluminescent Sprout / Eco Crest */}
          <g filter="drop-shadow(0 0 10px #34d399)">
            {species === 'cat' && (
              <>
                <path d="M 180 84 C 168 62, 180 44, 196 50 C 202 68, 190 84, 180 84 Z" fill="#34d399" />
                <path d="M 180 84 C 164 72, 152 54, 164 42 C 178 48, 180 72, 180 84 Z" fill="#10b981" />
                <circle cx="180" cy="85" r="4" fill={palette.runeColor} />
              </>
            )}
            {species === 'dog' && (
              <>
                <path d="M 180 80 L 187 88 L 180 96 L 173 88 Z" fill="#fbbf24" />
                <circle cx="180" cy="88" r="3" fill="#10b981" />
              </>
            )}
            {species === 'rabbit' && (
              <>
                <circle cx="180" cy="85" r="5" fill="#34d399" />
                <path d="M 180 80 Q 186 70 180 62 Q 174 70 180 80" fill="#38bdf8" />
              </>
            )}
          </g>

          {/* Whiskers (For Cat & Rabbit) */}
          {(species === 'cat' || species === 'rabbit') && (
            <g stroke={palette.whiskerColor} strokeWidth="1.6" strokeLinecap="round" opacity="0.75">
              {/* Left Whiskers */}
              <path d="M 125 168 Q 90 162 65 158" />
              <path d="M 125 174 Q 90 176 68 182" />
              {/* Right Whiskers */}
              <path d="M 235 168 Q 270 162 295 158" />
              <path d="M 235 174 Q 270 176 292 182" />
            </g>
          )}

          {/* LAYER 6: 2.5D EYES */}
          {actionState === 'sleeping' || isBlinking ? (
            /* Closed / Sleeping Eyes */
            <g stroke="#38bdf8" strokeWidth="3.8" strokeLinecap="round" fill="none">
              <path d="M 132 148 Q 148 160 164 148" />
              <path d="M 196 148 Q 212 160 228 148" />
            </g>
          ) : actionState === 'happy' || actionState === 'celebrating' ? (
            /* Happy Blissful Crescent Eyes */
            <g stroke={palette.runeColor} strokeWidth="4.2" strokeLinecap="round" fill="none" filter={`drop-shadow(0 0 8px ${palette.runeColor})`}>
              <path d="M 132 148 Q 148 132 164 148" />
              <path d="M 196 148 Q 212 132 228 148" />
            </g>
          ) : (
            /* 2.5D Glowing Eyes with Glossy Depth */
            <g>
              {/* Left Eye Socket Shadow */}
              <ellipse cx="148" cy="144" rx="16" ry="20" fill="#030712" />
              {/* Left Iris */}
              <ellipse cx="148" cy="144" rx="15" ry="19" fill="url(#petIrisGlow)" stroke="#0e7490" strokeWidth="1.5" />
              {/* Left Pupil with tracking */}
              <ellipse
                cx={148 + tilt.rotateY * 0.25}
                cy={144 - tilt.rotateX * 0.2}
                rx={species === 'cat' ? 7 : 10}
                ry={species === 'cat' ? 15 : 13}
                fill="#020617"
              />
              {/* Spherical Gloss Highlights */}
              <circle cx="144" cy="137" r="5" fill="#ffffff" />
              <circle cx="152" cy="150" r="2.2" fill="#ffffff" opacity="0.85" />
              {species === 'rabbit' && <circle cx="140" cy="148" r="2" fill="#ffffff" opacity="0.6" />}

              {/* Right Eye Socket Shadow */}
              <ellipse cx="212" cy="144" rx="16" ry="20" fill="#030712" />
              {/* Right Iris */}
              <ellipse cx="212" cy="144" rx="15" ry="19" fill="url(#petIrisGlow)" stroke="#0e7490" strokeWidth="1.5" />
              {/* Right Pupil with tracking */}
              <ellipse
                cx={212 + tilt.rotateY * 0.25}
                cy={144 - tilt.rotateX * 0.2}
                rx={species === 'cat' ? 7 : 10}
                ry={species === 'cat' ? 15 : 13}
                fill="#020617"
              />
              {/* Spherical Gloss Highlights */}
              <circle cx="208" cy="137" r="5" fill="#ffffff" />
              <circle cx="216" cy="150" r="2.2" fill="#ffffff" opacity="0.85" />
              {species === 'rabbit' && <circle cx="204" cy="148" r="2" fill="#ffffff" opacity="0.6" />}
            </g>
          )}

          {/* ========================================================================= */}
          {/* NOSE & MOUTH RIG BASED ON SPECIES */}
          {/* ========================================================================= */}
          {species === 'cat' && (
            <>
              <polygon points="176,166 184,166 180,171" fill="#f43f5e" />
              <path
                d="M 173 172 Q 180 177 180 172 Q 180 177 187 172"
                stroke="#94a3b8"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </>
          )}

          {species === 'dog' && (
            <>
              {/* Dog Cute Snout & Black Button Nose */}
              <ellipse cx="180" cy="170" rx="18" ry="12" fill={palette.bellyTuft} opacity="0.25" />
              <ellipse cx="180" cy="166" rx="6" ry="4.5" fill="#0f172a" />
              <circle cx="178" cy="165" r="1.5" fill="#ffffff" opacity="0.8" />
              {/* Cheerful Puppy Smile */}
              <path
                d="M 170 172 Q 175 178 180 172 Q 185 178 190 172"
                stroke="#0f172a"
                strokeWidth="2.2"
                fill="none"
                strokeLinecap="round"
              />
              {actionState === 'happy' && (
                /* Cute Puppy Tongue */
                <path d="M 176 173 Q 180 184 184 173 Z" fill="#fb7185" stroke="#f43f5e" strokeWidth="1" />
              )}
            </>
          )}

          {species === 'rabbit' && (
            <>
              {/* Rabbit Soft Pink Y-Nose */}
              <ellipse cx="180" cy="166" rx="4.5" ry="3.5" fill="#fb7185" />
              <path
                d="M 180 169 L 180 174 M 174 174 Q 180 177 180 174 Q 180 177 186 174"
                stroke="#94a3b8"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
              />
              {/* Bunny Front Buck Teeth */}
              <rect x="177" y="174" width="6" height="4" rx="1" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
              <line x1="180" y1="174" x2="180" y2="178" stroke="#cbd5e1" strokeWidth="0.8" />
            </>
          )}

          {/* LAYER 7: EQUIPPED GLASSES & VISORS */}
          {/* Visor Eco-Scan Holográfico */}
          {petInfo.equippedGlasses === 'glasses_cyber_visor' && (
            <g filter="drop-shadow(0 0 12px #06b6d4)">
              <rect x="120" y="130" width="120" height="30" rx="10" fill="url(#cyberVisorGrad)" stroke="#22d3ee" strokeWidth="2" />
              <line x1="125" y1="140" x2="235" y2="140" stroke="#a5f3fc" strokeWidth="1" strokeDasharray="4 2" opacity="0.8" />
              <line x1="125" y1="150" x2="235" y2="150" stroke="#a5f3fc" strokeWidth="1" strokeDasharray="8 4" opacity="0.8" />
              <circle cx="132" cy="145" r="3" fill="#22d3ee" />
            </g>
          )}

          {/* Gafas de Sol Sostenibles */}
          {petInfo.equippedGlasses === 'glasses_cool_shades' && (
            <g filter="drop-shadow(0 4px 8px rgba(0,0,0,0.5))">
              <polygon points="122,132 165,132 158,158 126,155" fill="#0f172a" stroke="#334155" strokeWidth="2" />
              <polygon points="195,132 238,132 234,155 202,158" fill="#0f172a" stroke="#334155" strokeWidth="2" />
              <line x1="165" y1="136" x2="195" y2="136" stroke="#475569" strokeWidth="3" />
              <line x1="130" y1="136" x2="155" y2="152" stroke="#ffffff" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
              <line x1="202" y1="136" x2="228" y2="152" stroke="#ffffff" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
            </g>
          )}

          {/* LAYER 8: EQUIPPED HATS & HEADWEAR */}
          {/* Gorra Eco-Liceísta */}
          {petInfo.equippedHat === 'hat_liceo_cap' && (
            <g filter="drop-shadow(0 4px 10px rgba(0,0,0,0.5))">
              <path
                d="M 125 96 C 125 55, 235 55, 235 96 Z"
                fill="#0f172a"
                stroke="#06b6d4"
                strokeWidth="2.5"
              />
              <path
                d="M 115 95 C 145 105, 215 105, 245 95 C 235 110, 125 110, 115 95 Z"
                fill="#0284c7"
                stroke="#38bdf8"
                strokeWidth="2"
              />
              <circle cx="180" cy="74" r="8" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />
              <path d="M 176 77 L 180 70 L 184 77 Z" fill="#0f172a" />
            </g>
          )}

          {/* Corona de Hojas de Laurel */}
          {petInfo.equippedHat === 'hat_leaf_crown' && (
            <g filter="drop-shadow(0 0 10px #34d399)">
              <path d="M 120 90 Q 180 70 240 90" stroke="#15803d" strokeWidth="4" fill="none" />
              <path d="M 130 84 Q 138 68 148 76 Q 140 88 130 84" fill="#34d399" />
              <path d="M 155 76 Q 165 60 174 70 Q 164 82 155 76" fill="#10b981" />
              <path d="M 185 70 Q 195 56 205 68 Q 195 80 185 70" fill="#34d399" />
              <path d="M 215 78 Q 224 66 232 76 Q 222 88 215 78" fill="#10b981" />
            </g>
          )}

          {/* Girasol Radiante */}
          {petInfo.equippedHat === 'hat_sun_flower' && (
            <g transform="translate(230, 60)" filter="drop-shadow(0 0 8px #fbbf24)">
              <circle cx="0" cy="0" r="10" fill="#78350f" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <ellipse
                  key={angle}
                  cx="0"
                  cy="-16"
                  rx="5"
                  ry="9"
                  fill="#fbbf24"
                  transform={`rotate(${angle})`}
                />
              ))}
            </g>
          )}

          {/* Auriculares Bio-Acústicos */}
          {petInfo.equippedHat === 'hat_cyber_headphones' && (
            <g filter="drop-shadow(0 0 12px #22d3ee)">
              <path d="M 95 125 Q 180 35 265 125" stroke="#0f172a" strokeWidth="6" fill="none" />
              <path d="M 95 125 Q 180 35 265 125" stroke="#22d3ee" strokeWidth="2.5" fill="none" />
              <rect x="80" y="110" width="22" height="36" rx="8" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="91" cy="128" r="4" fill="#ecfeff" />
              <rect x="258" y="110" width="22" height="36" rx="8" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="269" cy="128" r="4" fill="#ecfeff" />
            </g>
          )}

          {/* Corona del Sol Dorado */}
          {petInfo.equippedHat === 'hat_solar_crown' && (
            <g filter="drop-shadow(0 0 14px #fbbf24)">
              <polygon points="135,85 145,50 160,75 180,35 200,75 215,50 225,85" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
              <rect x="135" y="82" width="90" height="8" rx="2" fill="#f59e0b" />
              <circle cx="180" cy="50" r="4" fill="#ffffff" />
            </g>
          )}
        </svg>
      </motion.div>
    </div>
  );
}

