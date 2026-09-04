import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { AerisLogo } from '../components/AerisLogo';
import { Sparkles, ArrowRight, ShieldCheck, Heart, User, Sparkle } from 'lucide-react';
import { sound } from '../utils/sound';
import { useI18n, Language } from '../utils/i18n';
import { PetSpecies } from '../types';
import { SPECIES_CATALOG } from '../data/ecoData';

interface OnboardingViewProps {
  onComplete: (playerName: string, petName: string, grade: string, species?: PetSpecies) => void;
  language?: Language;
}

export function OnboardingView({ onComplete, language = 'en' }: OnboardingViewProps) {
  const t = useI18n(language);
  const [playerName, setPlayerName] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<PetSpecies>('cat');
  const [petName, setPetName] = useState('Aeris');
  const isSpanish = language === 'es';

  const handleSpeciesChange = (species: PetSpecies) => {
    sound.playClick();
    setSelectedSpecies(species);
    if (!petName || petName === 'Aeris' || petName === 'Rocco' || petName === 'Copito') {
      if (species === 'dog') setPetName('Rocco');
      else if (species === 'rabbit') setPetName('Copito');
      else setPetName('Aeris');
    }
  };

  const handleSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!playerName.trim()) return;
    sound.playLevelUp();
    const finalPetName = petName.trim() || (selectedSpecies === 'dog' ? 'Rocco' : selectedSpecies === 'rabbit' ? 'Copito' : 'Aeris');
    onComplete(playerName.trim(), finalPetName, 'Liceo Caucasia', selectedSpecies);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-slate-950 via-slate-900 to-cyan-950 text-white select-none overflow-y-auto">
      <div className="max-w-md w-full bg-slate-900 border-2 border-cyan-500/40 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-4 relative my-auto">
        {/* AERIS DIVISION Logo in place of cat */}
        <div className="flex flex-col items-center">
          <AerisLogo size="md" showSubtitle={true} glow={true} />
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-3.5"
        >
          <div className="text-center space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.aerisDivisionTag}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-100 tracking-tight">
              {t.welcomeAgent}
            </h2>
            <p className="text-[11px] text-slate-400">
              {isSpanish ? 'Elige a tu guardián ecológico y personaliza tus nombres.' : 'Choose your eco-guardian species and customize your names.'}
            </p>
          </div>

          {/* 1. AGENT / PLAYER NAME INPUT */}
          <div className="space-y-1">
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.playerNameLabel}</span>
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder={t.playerNamePlaceholder}
              maxLength={24}
              className="w-full bg-slate-800/90 border border-slate-700 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 placeholder:text-slate-500 font-medium transition-colors shadow-inner"
              autoFocus
            />
          </div>

          {/* 2. PET SPECIES SELECTOR */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isSpanish ? 'Especie del Guardián' : 'Guardian Species'}</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {SPECIES_CATALOG.map((sp) => {
                const isSelected = selectedSpecies === sp.id;
                return (
                  <button
                    key={sp.id}
                    type="button"
                    onClick={() => handleSpeciesChange(sp.id)}
                    className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      isSelected
                        ? 'bg-cyan-950/90 border-cyan-400 ring-2 ring-cyan-500/50 shadow-md shadow-cyan-900/40'
                        : 'bg-slate-800/60 border-slate-700/80 hover:border-slate-600 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <span className="text-2xl">{sp.avatarEmoji}</span>
                    <span className="text-[11px] font-black text-slate-100">
                      {isSpanish ? (sp.id === 'cat' ? 'Gato' : sp.id === 'dog' ? 'Perro' : 'Conejo') : (sp.id === 'cat' ? 'Cat' : sp.id === 'dog' ? 'Dog' : 'Rabbit')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. PET NAME INPUT */}
          <div className="space-y-1">
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              <span>{isSpanish ? 'Nombre de tu Mascota' : 'Pet Name'}</span>
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder={isSpanish ? 'Ej: Aeris, Rocco, Copito...' : 'e.g. Aeris, Rocco, Luna...'}
                maxLength={20}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 placeholder:text-slate-500 font-medium transition-colors shadow-inner pr-12"
              />
              <span className="absolute right-3 text-base select-none">
                {selectedSpecies === 'dog' ? '🐶' : selectedSpecies === 'rabbit' ? '🐰' : '🐱'}
              </span>
            </div>
          </div>

          {/* Eco Mission Card */}
          <div className="bg-slate-950/80 border border-cyan-900/50 p-2.5 rounded-2xl text-[11px] text-cyan-200 space-y-0.5 shadow-md">
            <div className="font-bold flex items-center gap-1 text-cyan-300 text-[11px]">
              <Sparkles className="w-3 h-3 text-amber-400" /> {t.ecoMissionTitle}
            </div>
            <p className="text-slate-400 leading-tight text-[10.5px]">
              {t.ecoMissionDesc}
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!playerName.trim()}
            className={`w-full py-3 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
              playerName.trim()
                ? 'bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 shadow-cyan-900/50 active:scale-98'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
            }`}
          >
            <span>{t.startAdventure}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.form>
      </div>
    </div>
  );
}
