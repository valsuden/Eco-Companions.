import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Stats, PetInfo, EcoFood } from '../types';
import { HUD } from '../components/HUD';
import { SceneEnvironment } from '../components/SceneEnvironment';
import { CheckCircle2, Info, X, Leaf, Recycle, Trash2, Smartphone, Tablet, Monitor } from 'lucide-react';
import { sound } from '../utils/sound';
import { useI18n } from '../utils/i18n';
import { useLayoutBreakpoint } from '../utils/useLayoutBreakpoint';

interface HomeViewProps {
  user: User;
  stats: Stats;
  petInfo: PetInfo;
  actionState: 'idle' | 'eating' | 'playing' | 'sleeping' | 'happy' | 'sad' | 'celebrating';
  onFeedFood: (food: EcoFood) => void;
  onCleanPet: () => void;
  onSleepPet: () => void;
  onPetClick: () => void;
  onOpenDailyReward: () => void;
  onRewardXpAndCoins: (xp: number, coins: number) => void;
  onUpdatePetName?: (newName: string) => void;
  onUpdateUser?: (updates: Partial<User>) => void;
}

export function HomeView({
  user,
  stats,
  petInfo,
  actionState,
  onFeedFood,
  onCleanPet,
  onSleepPet,
  onPetClick,
  onOpenDailyReward,
  onRewardXpAndCoins,
  onUpdatePetName,
  onUpdateUser,
}: HomeViewProps) {
  const currentLang = user.language || 'en';
  const t = useI18n(currentLang);
  const layout = useLayoutBreakpoint();

  const [binInfoModal, setBinInfoModal] = useState<{
    category: 'organic' | 'recyclable' | 'non_usable';
  } | null>(null);

  const binDetails = {
    organic: {
      title: `${t.greenBin} • ${t.organic}`,
      icon: Leaf,
      subtitle: currentLang === 'es' ? 'Compostaje y regeneración de suelos en Caucasia' : 'Composting and soil regeneration',
      color: 'border-emerald-500/50 bg-emerald-950/95 text-emerald-300',
      description: currentLang === 'es'
        ? 'Restos de comida, cáscaras de frutas, verduras, hojas de jardín y residuos agrícolas biodegradables. En el Bajo Cauca se transforman en abono para huertas escolares.'
        : 'Food leftovers, fruit peels, vegetables, and garden waste. Transformed into rich compost for school organic gardens.',
      examples: currentLang === 'es'
        ? ['Cáscaras de banano y cítricos', 'Sobras de almuerzo y verduras', 'Hojas secas y pasto', 'Café molido y bolsitas de té']
        : ['Banana peels and citrus', 'Vegetables and fruit scraps', 'Leaves and grass clippings', 'Coffee grounds and tea bags'],
      tip: currentLang === 'es'
        ? '¡Nunca arrojes plásticos, bolsas o pilas aquí! Mantenlos limpios para el compostador.'
        : 'Never throw plastics, bags, or batteries here! Keep it 100% biodegradable.',
    },
    recyclable: {
      title: `${t.whiteBin} • ${t.recyclable}`,
      icon: Recycle,
      subtitle: currentLang === 'es' ? 'Economía circular y reciclaje liceísta' : 'Circular economy and school recycling',
      color: 'border-sky-500/50 bg-sky-950/95 text-sky-300',
      description: currentLang === 'es'
        ? 'Plásticos limpios y secos, botellas PET, papel, cartón, latas de aluminio y envases Tetra Pak. Al reciclarlos evitamos la contaminación del Río Cauca.'
        : 'Clean and dry plastic, PET bottles, paper, cardboard, aluminum cans, and Tetra Pak. Prevents river pollution.',
      examples: currentLang === 'es'
        ? ['Botellas de agua y gaseosa vacías', 'Cuadernos y papel de examen limpio', 'Cajas de cartón y empaques', 'Latas de atún y gaseosa limpias']
        : ['Empty beverage & PET bottles', 'Clean school notebooks & paper', 'Cardboard packaging boxes', 'Rinsed aluminum cans'],
      tip: currentLang === 'es'
        ? '¡Deben estar LIMPIOS Y SECOS! Si tienen grasa o líquido contaminarán todo el lote reciclable.'
        : 'Items must be CLEAN & DRY! Food stains can spoil entire batches of recyclables.',
    },
    non_usable: {
      title: `${t.blackBin} • ${t.nonUsable}`,
      icon: Trash2,
      subtitle: currentLang === 'es' ? 'Relleno sanitario controlado' : 'Controlled sanitary landfill',
      color: 'border-slate-600/70 bg-slate-900/95 text-slate-300',
      description: currentLang === 'es'
        ? 'Servilletas usadas, papel higiénico, tapabocas, empaques metalizados de papas fritas y galletas, icopor sucio y colillas.'
        : 'Used napkins, toilet paper, masks, metallized snack bags, dirty styrofoam, and cigarette butts.',
      examples: currentLang === 'es'
        ? ['Servilletas de papel con grasa', 'Paquetes de papitas y galletas', 'Papel higiénico y pañuelos', 'Icopor sucio con comida']
        : ['Greasy paper napkins', 'Metallized chips & snack bags', 'Tissues & sanitary paper', 'Contaminated styrofoam'],
      tip: currentLang === 'es'
        ? 'Reducir el uso de empaques desechables es la mejor forma de disminuir la caneca negra.'
        : 'Reducing single-use plastics is the most effective way to shrink landfill waste.',
    },
  };

  return (
    <div 
      id="home-view-container"
      className="w-full h-full flex flex-col overflow-hidden bg-theme-primary text-theme-primary  relative"
      style={{
        padding: '0',
      }}
    >
      {/* Dynamic Game HUD Header (Responsive 3-row layout on mobile, dynamic bar on tablet/desktop) */}
      <HUD 
        user={user} 
        stats={stats} 
        onOpenDailyReward={onOpenDailyReward} 
        onUpdateUser={onUpdateUser}
      />

      {/* Main Sanctuary Stage with smooth scrollable overflow and proper min-height */}
      <main 
        id="home-sanctuary-main"
        className="flex-1 min-h-0 relative overflow-y-auto overflow-x-hidden flex flex-col w-full max-w-full"
      >
        <SceneEnvironment
          user={user}
          stats={stats}
          petInfo={petInfo}
          actionState={actionState}
          onFeedFood={onFeedFood}
          onCleanPet={onCleanPet}
          onSleepPet={onSleepPet}
          onPetClick={onPetClick}
          onQuickRecycleInfo={(category) => {
            sound.playClick();
            setBinInfoModal({ category });
          }}
          onRewardXpAndCoins={onRewardXpAndCoins}
          onUpdatePetName={onUpdatePetName}
          onUpdateUser={onUpdateUser}
        />
      </main>

      {/* Waste Information Interactive Modal with Safe Touch Padding */}
      <AnimatePresence>
        {binInfoModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 select-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`border rounded-3xl p-4 sm:p-5 max-w-md w-full shadow-2xl space-y-3.5 sm:space-y-4 backdrop-blur-2xl max-h-[90vh] overflow-y-auto ${
                binDetails[binInfoModal.category].color
              }`}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-white/10 border border-white/20 shrink-0">
                    {binInfoModal.category === 'organic' && <Leaf className="w-6 h-6 text-emerald-400" />}
                    {binInfoModal.category === 'recyclable' && <Recycle className="w-6 h-6 text-sky-400" />}
                    {binInfoModal.category === 'non_usable' && <Trash2 className="w-6 h-6 text-slate-300" />}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-black text-white truncate">
                      {binDetails[binInfoModal.category].title}
                    </h3>
                    <p className="text-xs text-white/70 font-semibold truncate">
                      {binDetails[binInfoModal.category].subtitle}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setBinInfoModal(null)}
                  className="min-w-[48px] min-h-[48px] p-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center justify-center shrink-0"
                  aria-label="Cerrar modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
                {binDetails[binInfoModal.category].description}
              </p>

              {/* Examples with flex-wrap */}
              <div className="bg-black/30 rounded-2xl p-3.5 space-y-2 border border-white/10">
                <div className="text-xs font-bold uppercase tracking-wider text-white/80 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-cyan-300 shrink-0" />
                  <span>{currentLang === 'es' ? 'Ejemplos correctos:' : 'Accepted items:'}</span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-white/90">
                  {binDetails[binInfoModal.category].examples.map((ex, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Eco tip */}
              <div className="bg-white/10 rounded-2xl p-3 text-xs text-white/90 border border-white/15 flex items-start gap-2">
                <span className="text-base shrink-0">💡</span>
                <p className="font-semibold">{binDetails[binInfoModal.category].tip}</p>
              </div>

              <button
                onClick={() => setBinInfoModal(null)}
                className="w-full min-h-[48px] py-3 bg-white text-slate-950 font-black rounded-2xl text-xs uppercase tracking-wider hover:bg-white/90 active:scale-98 transition-all cursor-pointer shadow-lg flex items-center justify-center"
              >
                {currentLang === 'es' ? '¡Entendido!' : 'Got it!'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
