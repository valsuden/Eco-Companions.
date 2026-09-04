import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Waves, 
  Sun, 
  Droplets, 
  Eye, 
  Sparkles, 
  TreeDeciduous, 
  Compass,
  MapPin,
  Maximize2
} from 'lucide-react';
import { sound } from '../utils/sound';
import rioCaucaImg from '../assets/images/rio_cauca_caucasia_1788293196328.jpg';

interface RiverObservatoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReward: (xp: number, coins: number) => void;
}

export const RiverObservatoryModal: React.FC<RiverObservatoryModalProps> = ({
  isOpen,
  onClose,
  onReward,
}) => {
  const [hasScanned, setHasScanned] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  if (!isOpen) return null;

  const handleScanRiver = () => {
    sound.playClick();
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setHasScanned(true);
      sound.playReward();
      onReward(30, 20);
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div
        id="river-observatory-backdrop"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 select-none"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          className="border rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] transition-colors"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
            color: 'var(--text-primary)',
          }}
        >
          {/* Header */}
          <div 
            className="p-4 sm:p-5 border-b flex items-center justify-between"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderColor: 'var(--border)',
            }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-inner border"
                style={{
                  backgroundColor: 'rgba(56, 189, 248, 0.15)',
                  borderColor: 'rgba(56, 189, 248, 0.4)',
                  color: '#38bdf8',
                }}
              >
                <Waves className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <span>Ventana al Río Cauca</span>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    EN VIVO
                  </span>
                </h3>
                <p className="text-xs font-semibold flex items-center gap-1 mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                  <MapPin className="w-3 h-3 text-rose-400" />
                  <span>Caucasia, Bajo Cauca Antioqueño • Liceo Caucasia</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="w-8 h-8 rounded-xl border flex items-center justify-center transition-all cursor-pointer active:scale-95"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
                color: 'var(--text-muted)',
              }}
              aria-label="Cerrar ventana"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* REAL PHOTO PANORAMIC RIVER SCENERY WINDOW */}
          <div className="relative w-full h-64 sm:h-80 overflow-hidden group bg-slate-950 flex items-center justify-center">
            {/* The Photograph of Cauca River */}
            <img
              src={rioCaucaImg}
              alt="Vista panorámica aérea del Río Cauca en Caucasia Antioquia"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Subtle atmospheric vignette & gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />

            {/* Scanning radar line animation when active */}
            {isScanning && (
              <motion.div
                initial={{ top: 0 }}
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] z-20 pointer-events-none"
              />
            )}

            {/* Floating Ambient Fauna / Birds */}
            <motion.div
              animate={{ x: [450, -60], y: [15, 35, 15] }}
              transition={{ repeat: Infinity, duration: 16, ease: 'easeInOut' }}
              className="absolute top-8 right-0 text-white/90 drop-shadow text-xs font-bold pointer-events-none z-10 flex items-center gap-1"
            >
              <span>🦅</span>
              <span className="text-[8px] bg-black/40 backdrop-blur-xs px-1.5 py-0.5 rounded text-white/80">Garza Real</span>
            </motion.div>

            {/* Live Weather & Location Badge */}
            <div className="absolute bottom-3 left-3 z-30 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-[11px] font-bold text-white flex items-center gap-2 shadow-lg">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Caucasia • 33°C</span>
              <span className="opacity-40">|</span>
              <Droplets className="w-3.5 h-3.5 text-cyan-400" />
              <span>Río Cauca: Caudal Óptimo</span>
            </div>

            {/* Compass badge on top right */}
            <div className="absolute top-3 right-3 z-30 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/20 text-[10px] font-bold text-white/90 flex items-center gap-1.5 shadow">
              <Compass className="w-3 h-3 text-sky-400" />
              <span>7°59'11"N 75°11'36"W</span>
            </div>
          </div>

          {/* Telemetry & Action Footer */}
          <div 
            className="p-4 sm:p-5 space-y-4 flex-1 overflow-y-auto"
            style={{
              backgroundColor: 'var(--surface)',
            }}
          >
            <div className="grid grid-cols-3 gap-2">
              <div 
                className="p-2.5 rounded-2xl border text-center"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border)',
                }}
              >
                <span className="text-[9px] uppercase font-black" style={{ color: 'var(--text-muted)' }}>Índice Bio-Salud</span>
                <div className="text-sm sm:text-base font-black text-emerald-500">96.4%</div>
              </div>
              <div 
                className="p-2.5 rounded-2xl border text-center"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border)',
                }}
              >
                <span className="text-[9px] uppercase font-black" style={{ color: 'var(--text-muted)' }}>Radiación UV</span>
                <div className="text-sm sm:text-base font-black text-amber-400">7.2 UV</div>
              </div>
              <div 
                className="p-2.5 rounded-2xl border text-center"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border)',
                }}
              >
                <span className="text-[9px] uppercase font-black" style={{ color: 'var(--text-muted)' }}>Biodiversidad</span>
                <div className="text-sm sm:text-base font-black text-sky-400">18 Especies</div>
              </div>
            </div>

            {/* Educational Bio-Note */}
            <div 
              className="p-3 rounded-2xl border flex items-start gap-2.5 text-xs"
              style={{
                backgroundColor: 'rgba(56, 189, 248, 0.08)',
                borderColor: 'rgba(56, 189, 248, 0.25)',
                color: 'var(--text-secondary)',
              }}
            >
              <TreeDeciduous className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed">
                <span className="font-bold text-emerald-400">Ecosistema del Río Cauca:</span> Principal arteria fluvial que baña nuestro municipio de Caucasia. Proteger sus riberas y no arrojar plásticos mantiene vivas a las nutrias, bocachicos y aves ribereñas.
              </div>
            </div>

            {/* Interactive Eco-Scan Button */}
            <div className="pt-1">
              {!hasScanned ? (
                <button
                  onClick={handleScanRiver}
                  disabled={isScanning}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all active:scale-95"
                >
                  {isScanning ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Analizando Bioindicadores del Río...</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 text-white" />
                      <span>Escanear Río y Ganar +30 XP</span>
                    </>
                  )}
                </button>
              ) : (
                <div 
                  className="border p-3 rounded-2xl text-center text-xs font-black flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    borderColor: 'rgba(16, 185, 129, 0.35)',
                    color: '#10b981',
                  }}
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>¡Escaneo ecológico completado! +30 XP y +20 Monedas registradas 🎉</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
