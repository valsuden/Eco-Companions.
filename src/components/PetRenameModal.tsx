import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PetInfo } from '../types';
import { X, Check, Edit3, Sparkles, Heart, RefreshCw } from 'lucide-react';
import { sound } from '../utils/sound';

interface PetRenameModalProps {
  isOpen: boolean;
  onClose: () => void;
  petInfo: PetInfo;
  onRename: (newName: string) => void;
}

const NAME_SUGGESTIONS = [
  'Aeris',
  'Brisa',
  'Cauca',
  'Luz',
  'Rayo',
  'Eco',
  'Verde',
  'Solar',
  'Milo',
  'Nutria',
  'Pelusa',
  'Guayacán',
];

export const PetRenameModal: React.FC<PetRenameModalProps> = ({
  isOpen,
  onClose,
  petInfo,
  onRename,
}) => {
  const [name, setName] = useState(petInfo.name || 'Aeris');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) return;
    sound.playLevelUp();
    onRename(cleanName);
    onClose();
  };

  const handlePickSuggestion = (suggested: string) => {
    sound.playPop();
    setName(suggested);
  };

  return (
    <AnimatePresence>
      <div 
        id="pet-rename-backdrop"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
        className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 select-none"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          className="bg-slate-900 border-2 border-cyan-500/40 rounded-3xl p-5 sm:p-6 w-full max-w-md shadow-2xl space-y-4 text-white relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-cyan-950 border border-cyan-400/40 flex items-center justify-center text-cyan-300 text-lg shadow-inner">
                🐾
              </div>
              <div>
                <h3 className="text-base font-black text-slate-100 flex items-center gap-1.5">
                  <span>Renombrar Mascota</span>
                </h3>
                <p className="text-xs text-slate-400 font-semibold">
                  Personaliza el nombre de tu compañero 2.5D
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Current Preview Tag */}
          <div className="bg-slate-950/80 border border-cyan-500/30 rounded-2xl p-4 flex items-center justify-center gap-3 shadow-inner">
            <span className="text-2xl animate-bounce">✨</span>
            <div className="text-center">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-cyan-400">
                Vista Previa del Nombre
              </span>
              <div className="text-lg font-black text-slate-100 tracking-wide mt-0.5">
                {name.trim() || 'Sin Nombre'}
              </div>
            </div>
            <span className="text-2xl animate-bounce [animation-delay:0.2s]">🐾</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Nuevo Nombre:</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Escribe el nombre aquí..."
                maxLength={20}
                autoFocus
                className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-sm text-white font-bold placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors shadow-inner"
              />
            </div>

            {/* Quick Suggestions Chips */}
            <div className="space-y-1.5">
              <span className="text-[10.5px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Sugerencias Populares</span>
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                {NAME_SUGGESTIONS.map((sug) => (
                  <button
                    key={sug}
                    type="button"
                    onClick={() => handlePickSuggestion(sug)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      name.trim() === sug
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-sm'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700/80 hover:border-cyan-500/40'
                    }`}
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit & Cancel Buttons */}
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="flex-1 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={!name.trim()}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:to-teal-300 disabled:opacity-40 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-cyan-950/50 cursor-pointer active:scale-95"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Guardar</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
