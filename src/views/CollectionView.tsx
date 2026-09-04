import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, PetInfo, CollectionItem, CollectionCategory } from '../types';
import { sound } from '../utils/sound';
import { useI18n } from '../utils/i18n';
import { 
  Boxes, 
  Crown, 
  Award, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  Cat, 
  Dog, 
  Rabbit,
  Bookmark,
  Percent
} from 'lucide-react';
import { EcoIcon } from '../components/EcoIcon';

interface CollectionViewProps {
  user: User;
  petInfo: PetInfo;
}

export const CollectionView: React.FC<CollectionViewProps> = ({ user, petInfo }) => {
  const currentLang = user.language || 'en';
  const t = useI18n(currentLang);

  const [activeCategory, setActiveCategory] = useState<CollectionCategory | 'all'>('all');

  // Build items list dynamically based on user progress and items owned
  const ownedCosmetics = user.ownedCosmetics || ['hat_liceo_cap', 'skin_mystic_night'];

  const collectionItems: CollectionItem[] = [
    {
      id: 'pet_cat',
      nameEs: 'Michi Eco-Liceísta',
      nameEn: 'Eco Liceo Cat',
      descEs: 'Gato ágil y curioso experto en identificar plásticos PET.',
      descEn: 'Agile cat expert at identifying PET plastics.',
      category: 'pets',
      icon: 'Cat',
      rarity: 'common',
      unlocked: true,
      unlockConditionEs: 'Mascota inicial de Aeris.',
      unlockConditionEn: 'Starting mascot of Aeris.',
    },
    {
      id: 'pet_dog',
      nameEs: 'Perro Explorador',
      nameEn: 'Scout Dog',
      descEs: 'Perro leal con olfato para detectar residuos orgánicos compostables.',
      descEn: 'Loyal dog with a nose for compostable organic waste.',
      category: 'pets',
      icon: 'Dog',
      rarity: 'rare',
      unlocked: ownedCosmetics.includes('pet_dog') || petInfo.species === 'dog',
      unlockConditionEs: 'Desbloquéalo en la Tienda con Monedas Eco.',
      unlockConditionEn: 'Unlock in Store with Eco Coins.',
    },
    {
      id: 'pet_rabbit',
      nameEs: 'Conejo Botánico',
      nameEn: 'Botanical Bunny',
      descEs: 'Conejo veloz amante de las huertas escolares y semillas.',
      descEn: 'Swift rabbit lover of school gardens and seeds.',
      category: 'pets',
      icon: 'Rabbit',
      rarity: 'epic',
      unlocked: ownedCosmetics.includes('pet_rabbit') || petInfo.species === 'rabbit',
      unlockConditionEs: 'Desbloquéalo en la Tienda con Monedas Eco.',
      unlockConditionEn: 'Unlock in Store with Eco Coins.',
    },
    {
      id: 'acc_liceo_cap',
      nameEs: 'Gorra Institucional Liceo',
      nameEn: 'Liceo School Cap',
      descEs: 'Gorra oficial con el escudo de Liceo Caucasia.',
      descEn: 'Official cap with the Liceo Caucasia crest.',
      category: 'accessories',
      icon: 'Crown',
      rarity: 'common',
      unlocked: ownedCosmetics.includes('hat_liceo_cap'),
      unlockConditionEs: 'Regalo de bienvenida al registrarte.',
      unlockConditionEn: 'Welcome gift upon signup.',
    },
    {
      id: 'acc_cyber_visor',
      nameEs: 'Visor Holográfico Eco',
      nameEn: 'Eco Holographic Visor',
      descEs: 'Lentes futuristas con análisis de espectro de residuos.',
      descEn: 'Futuristic visor analyzing waste spectra.',
      category: 'accessories',
      icon: 'Zap',
      rarity: 'epic',
      unlocked: ownedCosmetics.includes('glasses_cyber_visor'),
      unlockConditionEs: 'Consíguelo en el Pase Gratis Nivel 5.',
      unlockConditionEn: 'Earn at EcoPass Level 5.',
    },
    {
      id: 'badge_waste_sorter',
      nameEs: 'Insignia Clasificador Novato',
      nameEn: 'Rookie Sorter Badge',
      descEs: 'Otorgada al clasificar tus primeros 10 residuos correctamente.',
      descEn: 'Awarded after sorting your first 10 waste items correctly.',
      category: 'badges',
      icon: 'Recycle',
      rarity: 'rare',
      unlocked: user.wasteStats.total >= 10,
      unlockConditionEs: 'Clasifica 10 residuos en los minijuegos.',
      unlockConditionEn: 'Sort 10 waste items in minigames.',
    },
    {
      id: 'badge_river_guardian',
      nameEs: 'Guardián del Río Cauca',
      nameEn: 'River Cauca Guardian',
      descEs: 'Condecoración por mantener el ecosistema del santuario limpio.',
      descEn: 'Decoration for keeping the sanctuary ecosystem clean.',
      category: 'badges',
      icon: 'Award',
      rarity: 'legendary',
      unlocked: user.level >= 3,
      unlockConditionEs: 'Alcanza el Nivel 3 de Agente.',
      unlockConditionEn: 'Reach Agent Level 3.',
    },
    {
      id: 'memory_caucasia_adoption',
      nameEs: 'Foto de Adopción Liceísta',
      nameEn: 'Liceo Adoption Memory',
      descEs: 'El día que elegiste a tu compañero en Caucasia, Antioquia.',
      descEn: 'The day you chose your companion in Caucasia.',
      category: 'memories',
      icon: 'Bookmark',
      rarity: 'epic',
      unlocked: true,
      unlockConditionEs: 'Registrado en la historia del Agente.',
      unlockConditionEn: 'Recorded in Agent history.',
    },
  ];

  const filteredItems = collectionItems.filter((i) => {
    if (activeCategory === 'all') return true;
    return i.category === activeCategory;
  });

  const totalUnlocked = collectionItems.filter((i) => i.unlocked).length;
  const completionPercentage = Math.round((totalUnlocked / collectionItems.length) * 100);

  return (
    <div className="w-full h-full overflow-y-auto p-4 sm:p-6 select-none bg-theme-primary text-theme-primary">
      <div className="max-w-4xl mx-auto space-y-6 pb-24 md:pb-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-theme pb-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-theme-accent text-white shadow-md">
                <Boxes className="w-6 h-6" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-theme-primary">
                {currentLang === 'es' ? 'Álbum de Colección Aeris' : 'Aeris Collection Album'}
              </h1>
            </div>
            <p className="text-xs mt-1 text-theme-muted">
              {currentLang === 'es'
                ? 'Colecciona mascotas, accesorios, insignias ecológicas y memorias de Caucasia.'
                : 'Collect mascots, accessories, eco badges and memories of Caucasia.'}
            </p>
          </div>

          {/* Completion Bar Card */}
          <div className="p-3 rounded-2xl glass-card border border-theme flex items-center gap-3 shadow-md min-w-[200px]">
            <div className="p-2 rounded-xl bg-theme-primary text-theme-accent">
              <Percent className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between text-xs font-black text-theme-primary">
                <span>{currentLang === 'es' ? 'Colección' : 'Album'}</span>
                <span>{completionPercentage}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-theme-primary border border-theme overflow-hidden mt-1">
                <div
                  className="h-full rounded-full bg-theme-accent transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: currentLang === 'es' ? 'Todo' : 'All' },
            { id: 'pets', label: currentLang === 'es' ? 'Mascotas' : 'Mascots' },
            { id: 'accessories', label: currentLang === 'es' ? 'Accesorios' : 'Accessories' },
            { id: 'badges', label: currentLang === 'es' ? 'Insignias' : 'Badges' },
            { id: 'memories', label: currentLang === 'es' ? 'Memorias' : 'Memories' },
          ].map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playClick();
                  setActiveCategory(cat.id as any);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-theme-accent text-white shadow-md scale-105'
                    : 'glass-panel text-theme-secondary hover:text-theme-primary'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Collection Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-4 rounded-3xl border transition-all glass-panel flex flex-col justify-between gap-3 relative overflow-hidden ${
                item.unlocked
                  ? 'border-theme-accent shadow-theme-glow bg-theme-surface text-theme-primary'
                  : 'border-theme bg-theme-primary text-theme-muted opacity-70'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border relative ${
                    item.unlocked
                      ? 'bg-theme-accent text-white border-theme-accent shadow-md'
                      : 'bg-theme-primary text-theme-muted border-theme'
                  }`}
                >
                  <EcoIcon name={item.icon} className="w-6 h-6" />
                  {!item.unlocked && (
                    <div className="absolute inset-0 bg-slate-950/70 rounded-2xl flex items-center justify-center">
                      <Lock className="w-5 h-5 text-slate-400" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="text-xs font-black truncate text-theme-primary">
                      {currentLang === 'es' ? item.nameEs : item.nameEn}
                    </h3>
                    <span
                      className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                        item.rarity === 'legendary'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : item.rarity === 'epic'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                          : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      }`}
                    >
                      {item.rarity}
                    </span>
                  </div>

                  <p className="text-[11px] text-theme-muted mt-1 leading-snug">
                    {currentLang === 'es' ? item.descEs : item.descEn}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-theme text-[10px] font-bold flex items-center justify-between">
                {item.unlocked ? (
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{currentLang === 'es' ? 'Desbloqueado' : 'Unlocked'}</span>
                  </span>
                ) : (
                  <span className="text-theme-muted italic">
                    🔒 {currentLang === 'es' ? item.unlockConditionEs : item.unlockConditionEn}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
