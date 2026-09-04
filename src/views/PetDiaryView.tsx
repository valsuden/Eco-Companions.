import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, PetInfo, PetSpecies } from '../types';
import { sound } from '../utils/sound';
import { useI18n } from '../utils/i18n';
import { GrowthJournal } from '../components/GrowthJournal';
import { PetAvatar } from '../components/PetAvatar';
import { 
  BookOpen, 
  Heart, 
  Sparkles, 
  Cat, 
  Dog, 
  Rabbit, 
  Smile, 
  Zap, 
  Utensils, 
  Check, 
  Award,
  Crown
} from 'lucide-react';

interface PetDiaryViewProps {
  user: User;
  petInfo: PetInfo;
  onSwitchPetSpecies?: (species: PetSpecies) => void;
  onUpdatePetName?: (newName: string) => void;
}

export const PetDiaryView: React.FC<PetDiaryViewProps> = ({
  user,
  petInfo,
  onSwitchPetSpecies,
  onUpdatePetName,
}) => {
  const currentLang = user.language || 'en';
  const t = useI18n(currentLang);

  const [selectedSpecies, setSelectedSpecies] = useState<PetSpecies>(petInfo.species || 'cat');

  const speciesProfiles = {
    cat: {
      name: currentLang === 'es' ? 'Michi Eco-Liceísta' : 'Eco Liceo Cat',
      species: 'cat' as PetSpecies,
      personality: currentLang === 'es' ? 'Curioso, Ágil y Protector del Río' : 'Curious, Agile & River Guardian',
      favoriteFood: currentLang === 'es' ? 'Pescado Fresco del Río Cauca' : 'Fresh River Fish',
      favoriteActivity: currentLang === 'es' ? 'Jugar Tetris de Residuos y DORMIR' : 'Waste Tetris & Napping',
      desc: currentLang === 'es'
        ? 'Experto en detectar plásticos PET y botellas de vidrio. Le encanta descansar en áreas soleadas del santuario.'
        : 'Expert at detecting PET plastics and glass bottles. Loves sunbathing in the sanctuary.',
      unlocked: true,
      icon: Cat,
      color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
    },
    dog: {
      name: currentLang === 'es' ? 'Scout Guardián' : 'Scout Guardian Dog',
      species: 'dog' as PetSpecies,
      personality: currentLang === 'es' ? 'Leal, Enérgico y Reciclador Entusiasta' : 'Loyal, Energetic & Sorter',
      favoriteFood: currentLang === 'es' ? 'Premios Orgánicos de Manzana' : 'Organic Apple Crunch',
      favoriteActivity: currentLang === 'es' ? 'Carreras de Clasificación Rápida' : 'Fast Sorting Races',
      desc: currentLang === 'es'
        ? 'Acompañante fiel que detecta residuos orgánicos para el compostador de Liceo Caucasia.'
        : 'Faithful companion detecting organic waste for the Liceo Caucasia composter.',
      unlocked: user.ownedCosmetics?.includes('pet_dog') || petInfo.species === 'dog',
      icon: Dog,
      color: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
    },
    rabbit: {
      name: currentLang === 'es' ? 'Conejo Botánico' : 'Botanical Bunny',
      species: 'rabbit' as PetSpecies,
      personality: currentLang === 'es' ? 'Tierno, Rápido y Amante de Huertas' : 'Sweet, Fast & Garden Lover',
      favoriteFood: currentLang === 'es' ? 'Zanahorias y Brotes de Caucasia' : 'Crisp Carrots & Greens',
      favoriteActivity: currentLang === 'es' ? 'Limpieza de Parques y Sembrado' : 'Park Cleanup & Planting',
      desc: currentLang === 'es'
        ? 'Especialista en semillas de la biodiversidad del Bajo Cauca. Cuida las plantas medicinales.'
        : 'Specialist in seeds of Lower Cauca biodiversity. Takes care of medicinal plants.',
      unlocked: user.ownedCosmetics?.includes('pet_rabbit') || petInfo.species === 'rabbit',
      icon: Rabbit,
      color: 'border-rose-500/40 bg-rose-500/10 text-rose-400',
    },
  };

  const currentProfile = speciesProfiles[selectedSpecies];

  const handleSelectSpecies = (species: PetSpecies) => {
    sound.playPetSound(species);
    setSelectedSpecies(species);
    if (onSwitchPetSpecies && speciesProfiles[species].unlocked) {
      onSwitchPetSpecies(species);
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto p-4 sm:p-6 select-none bg-theme-primary text-theme-primary">
      <div className="max-w-4xl mx-auto space-y-6 pb-24 md:pb-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-theme pb-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-theme-accent text-white shadow-md">
                <BookOpen className="w-6 h-6" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-theme-primary">
                {currentLang === 'es' ? 'Diario y Registro de Mascotas' : 'Pet Journal & Diary'}
              </h1>
            </div>
            <p className="text-xs mt-1 text-theme-muted">
              {currentLang === 'es'
                ? 'Conoce la personalidad de tus mascotas, su progreso, hitos y momentos especiales.'
                : 'Discover pet personalities, progress, milestones, and memories.'}
            </p>
          </div>
        </div>

        {/* Pet Species Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(['cat', 'dog', 'rabbit'] as PetSpecies[]).map((sp) => {
            const prof = speciesProfiles[sp];
            const isSelected = selectedSpecies === sp;
            const isCurrentActive = petInfo.species === sp || (!petInfo.species && sp === 'cat');
            const Icon = prof.icon;

            return (
              <button
                key={sp}
                onClick={() => handleSelectSpecies(sp)}
                className={`p-3.5 rounded-3xl border transition-all cursor-pointer flex items-center gap-3 text-left relative overflow-hidden glass-panel ${
                  isSelected
                    ? 'border-theme-accent shadow-theme-glow bg-theme-surface'
                    : 'border-theme bg-theme-primary text-theme-muted hover:text-theme-primary'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border shadow-md ${
                    isSelected ? 'bg-theme-accent text-white border-theme-accent' : 'bg-theme-primary border-theme text-theme-muted'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <h3 className="text-xs font-black truncate text-theme-primary">
                      {prof.name}
                    </h3>
                  </div>

                  <p className="text-[10px] text-theme-muted truncate mt-0.5">
                    {prof.personality}
                  </p>

                  {isCurrentActive && (
                    <span className="inline-flex items-center gap-1 text-[9px] font-black text-emerald-400 mt-1">
                      <Check className="w-3 h-3" />
                      <span>{currentLang === 'es' ? 'Activa en Santuario' : 'Active Pet'}</span>
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Pet Inspection Card */}
        <div className="glass-card border border-theme-accent rounded-3xl p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Avatar Stage 2.5D */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-theme-primary rounded-2xl border border-theme shadow-inner relative">
            <PetAvatar
              petInfo={{
                ...petInfo,
                species: selectedSpecies,
              }}
              actionState="happy"
              size="responsive"
              showMoodBubble={true}
              language={currentLang}
            />
            <div className="mt-3 text-center">
              <span className="text-xs font-black text-theme-accent uppercase tracking-wider block">
                {currentProfile.name}
              </span>
              <span className="text-[10px] font-bold text-theme-muted">
                Nivel {user.level} • {user.xp} XP
              </span>
            </div>
          </div>

          {/* Details & Traits */}
          <div className="md:col-span-7 space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-theme pb-2">
              <h2 className="text-sm font-black text-theme-primary flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-theme-accent" />
                <span>{currentLang === 'es' ? 'Ficha Biológica de la Mascota' : 'Pet Profile Sheet'}</span>
              </h2>
              {onSwitchPetSpecies && petInfo.species !== selectedSpecies && (
                <button
                  onClick={() => onSwitchPetSpecies(selectedSpecies)}
                  className="px-3 py-1.5 rounded-xl text-xs font-black bg-theme-accent text-white shadow-md hover:bg-theme-accent/90 transition-all cursor-pointer"
                >
                  {currentLang === 'es' ? 'Activar en Santuario' : 'Activate Pet'}
                </button>
              )}
            </div>

            <p className="text-xs text-theme-muted leading-relaxed">
              {currentProfile.desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <div className="p-2.5 rounded-xl bg-theme-primary border border-theme flex items-center gap-2">
                <Utensils className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-[9px] font-bold text-theme-muted uppercase block">
                    {currentLang === 'es' ? 'Comida Favorita' : 'Favorite Food'}
                  </span>
                  <span className="font-extrabold text-theme-primary">{currentProfile.favoriteFood}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-theme-primary border border-theme flex items-center gap-2">
                <Smile className="w-4 h-4 text-cyan-400 shrink-0" />
                <div>
                  <span className="text-[9px] font-bold text-theme-muted uppercase block">
                    {currentLang === 'es' ? 'Actividad Favorita' : 'Favorite Activity'}
                  </span>
                  <span className="font-extrabold text-theme-primary">{currentProfile.favoriteActivity}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Growth Journal Timeline Component */}
        <div className="space-y-3">
          <h2 className="text-sm font-black text-theme-primary flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-theme-accent" />
            <span>{currentLang === 'es' ? 'Registro de Hitos y Crecimiento' : 'Growth Journal & History'}</span>
          </h2>
          <GrowthJournal user={user} petInfo={{ ...petInfo, species: selectedSpecies }} />
        </div>
      </div>
    </div>
  );
};
