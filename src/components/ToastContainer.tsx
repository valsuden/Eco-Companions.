import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Info, CheckCircle, AlertTriangle } from 'lucide-react';
import { ToastItem } from '../types';

interface ToastContainerProps {
  toasts: ToastItem[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none px-4 w-full max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => {
          let Icon = Sparkles;
          let colorStyle = 'bg-slate-900/90 text-white border-white/20';

          if (toast.type === 'success') {
            Icon = CheckCircle;
            colorStyle = 'bg-emerald-950/90 text-emerald-100 border-emerald-500/30';
          } else if (toast.type === 'warning') {
            Icon = AlertTriangle;
            colorStyle = 'bg-amber-950/90 text-amber-100 border-amber-500/30';
          } else if (toast.type === 'info') {
            Icon = Info;
            colorStyle = 'bg-blue-950/90 text-blue-100 border-blue-500/30';
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              onClick={() => onRemove(toast.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border shadow-xl backdrop-blur-md text-xs sm:text-sm font-bold pointer-events-auto cursor-pointer select-none ${colorStyle}`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{toast.message}</span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
