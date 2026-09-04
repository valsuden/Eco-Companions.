import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useLayoutBreakpoint } from '../utils/useLayoutBreakpoint';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export const GlobalBackground: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const { isDesktop } = useLayoutBreakpoint();

  useEffect(() => {
    // Generate subtle floating particles
    const count = isDesktop ? 24 : 12;
    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
      size: Math.random() * 4 + 2, // 2px to 6px
      duration: Math.random() * 20 + 10, // 10s to 30s
      delay: Math.random() * 10,
      opacity: Math.random() * 0.3 + 0.1, // 0.1 to 0.4
    }));
    setParticles(newParticles);
  }, [isDesktop]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Soft gradient base layer */}
      <div className="absolute inset-0 bg-theme-primary" />
      
      {/* Decorative blurred blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-theme-accent/5 blur-3xl opacity-50" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-theme-accent/10 blur-3xl opacity-50" />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-theme-accent"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: ['-15vh', '15vh', '-15vh'],
            x: ['-5vw', '5vw', '-5vw'],
            opacity: [p.opacity, p.opacity * 2, p.opacity],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};
