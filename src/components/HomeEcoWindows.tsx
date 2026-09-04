import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Stats, PetInfo } from '../types';
import { 
  Waves, 
  Sparkles, 
  Edit3, 
  Leaf, 
  Utensils,
  Gamepad2,
  Heart,
  CheckCircle2,
  Circle,
  RefreshCw,
  Eye,
  Zap,
  X
} from 'lucide-react';
import { sound } from '../utils/sound';
import rioCaucaImg from '../assets/images/rio_cauca_caucasia_1788293196328.jpg';

interface HomeEcoWindowsProps {
  user: User;
  stats: Stats;
  petInfo: PetInfo;
  onOpenRenameModal: () => void;
  onOpenPanoramicWindow: () => void;
  onReward: (xp: number, coins: number) => void;
}

interface DailyQuest {
  id: string;
  title: string;
  desc: string;
  icon: string;
  xp: number;
  coins: number;
  completed: boolean;
}

export const HomeEcoWindows: React.FC<HomeEcoWindowsProps> = ({
  user,
  stats,
  petInfo,
  onOpenRenameModal,
  onOpenPanoramicWindow,
  onReward,
}) => {
  const [activeWindow, setActiveWindow] = useState<'climate' | 'quests' | 'tips' | 'pet' | null>(null);
  const [tipIndex, setTipIndex] = useState(0);
  // Computes realistic Caucasia (Bajo Cauca, Antioquia) climate based on time of day
  const getCaucasiaBaselineWeather = React.useCallback((spanish: boolean) => {
    // Caucasia is in UTC-5 timezone
    const now = new Date();
    const utcHours = now.getUTCHours();
    const colHours = (utcHours - 5 + 24) % 24;

    let temp = 33;
    let humidity = 65;
    let text = spanish ? 'Soleado ☀️' : 'Sunny ☀️';

    if (colHours >= 11 && colHours <= 16) {
      temp = 34;
      humidity = 62;
      text = spanish ? 'Caluroso y Soleado ☀️' : 'Hot & Sunny ☀️';
    } else if (colHours >= 6 && colHours < 11) {
      temp = 29;
      humidity = 76;
      text = spanish ? 'Brisa Tropical ⛅' : 'Tropical Breeze ⛅';
    } else if (colHours > 16 && colHours <= 19) {
      temp = 31;
      humidity = 72;
      text = spanish ? 'Atardecer Cálido 🌤️' : 'Warm Sunset 🌤️';
    } else {
      temp = 26;
      humidity = 86;
      text = spanish ? 'Noche Fresca 🌙' : 'Fresh Night 🌙';
    }

    return { temp, text, humidity };
  }, []);

  const [weather, setWeather] = useState<{ temp: number; text: string; humidity?: number }>(() => 
    getCaucasiaBaselineWeather(user.language === 'es')
  );

  const isSpanish = user.language === 'es';

  React.useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const fetchWeather = async () => {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=7.9865&longitude=-75.1935&current=temperature_2m,relative_humidity_2m,weather_code',
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error('API status not ok');
        const data = await res.json();
        
        if (isMounted && data.current) {
          const temp = Math.round(data.current.temperature_2m);
          const humidity = data.current.relative_humidity_2m;
          const code = data.current.weather_code;
          
          let text = isSpanish ? 'Soleado ☀️' : 'Sunny ☀️';
          if (code === 0) text = isSpanish ? 'Soleado ☀️' : 'Sunny ☀️';
          else if (code >= 1 && code <= 3) text = isSpanish ? 'Nublado ⛅' : 'Cloudy ⛅';
          else if (code >= 51 && code <= 65) text = isSpanish ? 'Lluvia 🌧️' : 'Rain 🌧️';
          else if (code >= 80 && code <= 82) text = isSpanish ? 'Chubascos 🌦️' : 'Showers 🌦️';
          else if (code >= 95 && code <= 99) text = isSpanish ? 'Tormenta ⛈️' : 'Storm ⛈️';
          else text = isSpanish ? 'Nublado ⛅' : 'Cloudy ⛅';

          setWeather({ temp, text, humidity });
        }
      } catch {
        // Graceful local simulation fallback for sandboxed/offline environments
        if (isMounted) {
          setWeather(getCaucasiaBaselineWeather(isSpanish));
        }
      } finally {
        clearTimeout(timeoutId);
      }
    };

    fetchWeather();
    return () => {
      isMounted = false;
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [isSpanish, getCaucasiaBaselineWeather]);

  const ECO_TIPS = [
    {
      title: isSpanish ? 'Protección del Río Cauca' : 'Protection of Cauca River',
      body: isSpanish 
        ? 'Evita arrojar basuras en las calles de Caucasia; con las lluvias terminarán en el río, afectando a la fauna local.'
        : 'Avoid throwing trash on Caucasia streets; with rain it ends up in the river affecting local fauna.',
      icon: <Waves className="w-5 h-5" />,
    },
    {
      title: isSpanish ? 'Apaga en los salones' : 'Turn off in classrooms',
      body: isSpanish
        ? 'Apaga los ventiladores y luces del Liceo cuando salgan al descanso o terminen la jornada escolar.'
        : 'Turn off fans and lights at the school when going to break or finishing the school day.',
      icon: <Zap className="w-5 h-5" />,
    },
    {
      title: isSpanish ? 'Usa tu termo' : 'Use your thermos',
      body: isSpanish
        ? 'Trae un termo reutilizable desde casa en lugar de comprar botellas plásticas en la tienda escolar.'
        : 'Bring a reusable thermos from home instead of buying plastic bottles at the school store.',
      icon: <CheckCircle2 className="w-5 h-5" />,
    },
  ];

  const quests: DailyQuest[] = [
    {
      id: 'feed',
      title: isSpanish ? 'Alimentación Ecológica' : 'Eco Feeding',
      desc: isSpanish ? 'Alimenta a tu mascota con un recurso natural' : 'Feed your pet with a natural resource',
      icon: 'utensils',
      xp: 25,
      coins: 10,
      completed: stats.hunger >= 95,
    },
    {
      id: 'clean',
      title: isSpanish ? 'Higiene del Hábitat' : 'Habitat Hygiene',
      desc: isSpanish ? 'Mantén el hábitat limpio (100%)' : 'Keep the habitat clean (100%)',
      icon: 'droplets',
      xp: 25,
      coins: 10,
      completed: stats.hygiene >= 95,
    },
    {
      id: 'games',
      title: isSpanish ? 'Jugar un Minijuego' : 'Play a Minigame',
      desc: isSpanish ? 'Clasifica residuos en Tetris' : 'Sort waste in Tetris',
      icon: 'gamepad',
      xp: 35,
      coins: 20,
      completed: user.gamesCompleted > 0,
    },
    {
      id: 'affection',
      title: isSpanish ? 'Afecto 2.5D' : 'Affection Petting',
      desc: isSpanish ? 'Toca a tu mascota' : 'Tap your pet',
      icon: 'heart',
      xp: 15,
      coins: 10,
      completed: (user.petAffectionEnergy ?? 100) > 40,
    },
  ];

  const getQuestIcon = (id: string) => {
    switch (id) {
      case 'feed': return <Utensils className="w-4 h-4 text-[#10b981]" />;
      case 'clean': return <Sparkles className="w-4 h-4 text-[#3b82f6]" />;
      case 'games': return <Gamepad2 className="w-4 h-4 text-[#8b5cf6]" />;
      case 'affection': return <Heart className="w-4 h-4 text-[#f43f5e]" />;
      default: return <CheckCircle2 className="w-4 h-4 text-[#64748b]" />;
    }
  };

  const handleNextTip = () => {
    sound.playPop();
    setTipIndex((prev) => (prev + 1) % ECO_TIPS.length);
  };

  return (
    <div className="w-full space-y-2">
      {/* 3 COMPACT INTERACTIVE WINDOW CARDS */}
      <div 
        className="flex sm:grid sm:grid-cols-3 gap-3 w-full overflow-x-auto pb-1 sm:pb-0 overscroll-contain no-scrollbar select-none"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {/* WINDOW 1: Observatorio del Río Cauca & Clima */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            sound.playClick();
            onOpenPanoramicWindow();
          }}
          className="p-3 rounded-2xl border text-left shadow-sm transition-all cursor-pointer group flex flex-col justify-between min-h-[80px] min-w-[150px] sm:min-w-0 shrink-0 sm:shrink backdrop-blur-md relative overflow-hidden"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
          }}
        >
          {/* Subtle background image overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-24 opacity-25 group-hover:opacity-40 transition-opacity pointer-events-none overflow-hidden">
            <img 
              src={rioCaucaImg} 
              alt="Río Cauca preview" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--surface)] to-transparent" />
          </div>

          <div className="flex items-center justify-between w-full mb-1 relative z-10">
            <span className="text-[8px] font-extrabold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
              <Waves className="w-3 h-3" />
              <span>{isSpanish ? 'Río Cauca' : 'Cauca River'}</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div className="relative z-10">
            <div className="text-[9.5px] font-extrabold transition-colors mb-0.5 truncate" style={{ color: 'var(--text-primary)' }}>
              <span>{weather ? `${weather.temp}°C • ${weather.text}` : isSpanish ? '34°C • Nublado ⛅' : '34°C • Cloudy ⛅'}</span>
            </div>
            <div className="text-[7.5px] font-bold flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
              <span>{isSpanish ? 'Humedad' : 'Humidity'}: {weather?.humidity ? `${weather.humidity}%` : '61%'}</span>
              <span>•</span>
              <span className="text-emerald-400 flex items-center gap-0.5">
                {isSpanish ? 'Ver' : 'View'} <Eye className="w-2.5 h-2.5" />
              </span>
            </div>
          </div>
        </motion.button>

        {/* WINDOW 2: Eco-Consejo Liceísta */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            sound.playClick();
            setActiveWindow(activeWindow === 'tips' ? null : 'tips');
          }}
          className="p-3 rounded-2xl text-left shadow-sm transition-all cursor-pointer group flex flex-col justify-between min-h-[80px] min-w-[150px] sm:min-w-0 shrink-0 sm:shrink border backdrop-blur-md"
          style={{
            backgroundColor: activeWindow === 'tips' ? 'var(--surface-hover)' : 'var(--surface)',
            borderColor: activeWindow === 'tips' ? 'var(--accent)' : 'var(--border)',
          }}
        >
          <div className="flex items-center justify-between w-full mb-1">
            <span className="text-[8px] font-extrabold uppercase tracking-wider flex items-center gap-1.5" style={{ color: 'var(--accent)' }}>
              <Leaf className="w-3 h-3" />
              <span>Eco-Tip</span>
            </span>
            <span className="text-[8px] opacity-70">{ECO_TIPS[tipIndex].icon}</span>
          </div>

          <div>
            <div className="text-[9.5px] font-extrabold transition-colors truncate mb-0.5" style={{ color: 'var(--text-primary)' }}>
              {ECO_TIPS[tipIndex].title}
            </div>
            <div className="text-[7.5px] font-bold truncate" style={{ color: 'var(--text-muted)' }}>
              {isSpanish ? 'Consejo ecológico' : 'Eco-friendly tip'}
            </div>
          </div>
        </motion.button>

        {/* WINDOW 3: Perfil Rápido de Mascota */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            sound.playClick();
            onOpenRenameModal();
          }}
          className="p-3 rounded-2xl border text-left shadow-sm transition-all cursor-pointer group flex flex-col justify-between min-h-[80px] min-w-[150px] sm:min-w-0 shrink-0 sm:shrink backdrop-blur-md"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="flex items-center justify-between w-full mb-1">
            <span className="text-[8px] font-extrabold uppercase tracking-wider flex items-center gap-1.5" style={{ color: 'var(--accent)' }}>
              <span className="text-[8px]">PET</span>
            </span>
            <Edit3 className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--accent)' }} />
          </div>

          <div>
            <div className="text-[9.5px] font-extrabold transition-colors truncate mb-0.5" style={{ color: 'var(--text-primary)' }}>
              {petInfo.name}
            </div>
            <div className="text-[7.5px] font-bold flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
              {isSpanish ? 'Afecto' : 'Affection'}: {user.petAffectionEnergy ?? 100}% <Sparkles className="w-2.5 h-2.5 text-amber-400" />
            </div>
          </div>
        </motion.button>
      </div>

      {/* EXPANDABLE MODAL / DETAIL DRAWER FOR ACTIVE WINDOW */}
      <AnimatePresence>
        {activeWindow === 'tips' && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            className="overflow-hidden"
          >
            <div 
              className="border rounded-2xl p-3.5 shadow-sm space-y-2.5"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
                color: 'var(--text-primary)',
              }}
            >
              <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-2">
                  <Leaf className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
                  <span className="text-[9px] font-extrabold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                    {isSpanish ? 'Eco-Consejo Liceísta' : 'School Eco-Tip'} ({tipIndex + 1}/{ECO_TIPS.length})
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleNextTip}
                    className="px-2 py-1 rounded-lg border text-[8px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      borderColor: 'var(--border)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <RefreshCw className="w-2.5 h-2.5 animate-spin" style={{ animationDuration: '3s' }} />
                    <span>{isSpanish ? 'Siguiente' : 'Next'}</span>
                  </button>
                  <button
                    onClick={() => setActiveWindow(null)}
                    className="p-1 rounded-lg border cursor-pointer"
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      borderColor: 'var(--border)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <div 
                className="flex items-start gap-2.5 p-2.5 rounded-xl border"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border)',
                }}
              >
                <span className="shrink-0 mt-0.5" style={{ color: 'var(--accent)' }}>{ECO_TIPS[tipIndex].icon}</span>
                <div>
                  <h4 className="text-[9.5px] font-black" style={{ color: 'var(--accent)' }}>{ECO_TIPS[tipIndex].title}</h4>
                  <p className="text-[8.5px] mt-1 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{ECO_TIPS[tipIndex].body}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
