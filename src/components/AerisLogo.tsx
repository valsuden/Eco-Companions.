import React from 'react';

interface AerisLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showSubtitle?: boolean;
  showWordmark?: boolean;
  mode?: 'full' | 'monogram' | 'wordmark' | 'horizontal';
  className?: string;
  glow?: boolean;
  variant?: 'auto' | 'light' | 'dark';
}

export const AerisLogo: React.FC<AerisLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  showWordmark = true,
  mode = 'full',
  className = '',
  glow = true,
}) => {
  const dimensions = {
    xs: { icon: 'w-6 h-6', wordmark: 'h-3.5', sub: 'text-[6px]', gap: 'gap-0.5' },
    sm: { icon: 'w-8 h-8', wordmark: 'h-4', sub: 'text-[7.5px]', gap: 'gap-1' },
    md: { icon: 'w-12 h-12', wordmark: 'h-5 sm:h-6', sub: 'text-[9px]', gap: 'gap-1.5' },
    lg: { icon: 'w-18 h-18 sm:w-20 sm:h-20', wordmark: 'h-6 sm:h-7', sub: 'text-[11px]', gap: 'gap-2' },
    xl: { icon: 'w-24 h-24 sm:w-28 sm:h-28', wordmark: 'h-8 sm:h-9', sub: 'text-xs', gap: 'gap-2.5' },
    hero: { icon: 'w-32 h-32 sm:w-40 sm:h-40', wordmark: 'h-10 sm:h-12', sub: 'text-sm sm:text-base', gap: 'gap-3' },
  }[size];

  const shouldRenderWordmark = mode === 'wordmark' || mode === 'horizontal' || (mode === 'full' && showWordmark);
  const shouldRenderMonogram = mode === 'monogram' || mode === 'horizontal' || mode === 'full';

  // SVG Geometric Monogram Emblem
  const renderMonogramSvg = () => (
    <div className="relative flex items-center justify-center shrink-0">
      {glow && (
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-50 pointer-events-none"
          style={{ 
            backgroundColor: 'var(--accent, #0ea5e9)',
            transform: 'scale(1.2)' 
          }}
        />
      )}

      <svg
        viewBox="0 0 200 200"
        className={`${dimensions.icon} filter drop-shadow-[0_4px_12px_rgba(6,182,212,0.3)] transition-all`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Metallic Cyan Gradient for the sliced wing */}
          <linearGradient id="aerisBevelGradMain" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#082f49" />
            <stop offset="40%" stopColor="#0369a1" />
            <stop offset="75%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>

          {/* Dark Metallic Solid Body Gradient */}
          <linearGradient id="aerisDarkBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="30%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>

          <linearGradient id="aerisRightLegGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="50%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          <filter id="aerisGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#0284c7" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* 1. TOP APEX & RIGHT SLOPED MAIN BEAM */}
        <path
          d="M 100 22 L 118 22 L 174 158 L 142 158 L 100 56 Z"
          fill="url(#aerisRightLegGrad)"
          filter="url(#aerisGlowFilter)"
        />

        {/* 2. INNER CREST SHADOW BEAM */}
        <path
          d="M 102 24 L 112 24 L 156 130 L 144 130 L 100 36 Z"
          fill="#e0f2fe"
          opacity="0.9"
        />

        {/* 3. LEFT UPPER APEX EXTENSION */}
        <path
          d="M 100 22 L 82 22 L 62 72 L 90 72 L 100 48 Z"
          fill="url(#aerisDarkBodyGrad)"
        />

        {/* 4. ICONIC SLICED LOWER-LEFT HORIZONTAL CHEVRON WING */}
        <path
          d="M 60 84 
             L 36 134 
             L 48 158 
             L 74 158 
             L 80 142 
             L 126 142 
             L 138 128 
             L 74 128 
             L 82 112 
             L 100 112 
             L 112 84 
             Z"
          fill="url(#aerisBevelGradMain)"
        />

        {/* Top border highlight for the bevel wing */}
        <path
          d="M 74 128 L 138 128 L 126 142 L 80 142 Z"
          fill="#38bdf8"
          opacity="0.75"
        />
        <path
          d="M 60 84 L 112 84 L 100 112 L 60 84 Z"
          fill="#7dd3fc"
          opacity="0.35"
        />
      </svg>
    </div>
  );

  // SVG Geometric Modern Wordmark
  const renderWordmarkSvg = () => (
    <div className={`flex flex-col items-center select-none ${dimensions.gap}`}>
      {/* Precision Geometric SVG Typography for A E R I S */}
      <svg
        viewBox="0 0 280 40"
        className={`w-auto ${dimensions.wordmark} text-cyan-300 drop-shadow-[0_2px_8px_rgba(6,182,212,0.3)]`}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* LETTER 'A': Stylized chevron apex */}
        <g transform="translate(10, 3)">
          <path
            d="M 22 2 L 40 33 L 31 33 L 22 13 L 13 33 L 4 33 Z"
            className="fill-cyan-400"
          />
        </g>

        {/* LETTER 'E': Three sharp high-tech horizontal bars */}
        <g transform="translate(75, 4)">
          <rect x="0" y="2" width="28" height="5" rx="1.5" className="fill-cyan-300" />
          <rect x="0" y="14" width="24" height="5" rx="1.5" className="fill-teal-300" />
          <rect x="0" y="26" width="28" height="5" rx="1.5" className="fill-cyan-300" />
        </g>

        {/* LETTER 'R': Sleek curved aerodynamic R */}
        <g transform="translate(130, 4)">
          <path
            d="M 0 2 L 20 2 C 28 2, 33 6, 33 14 C 33 20, 29 24, 21 25 L 34 33 L 24 33 L 13 25 L 8 25 L 8 33 L 0 33 Z M 8 8 L 8 19 L 19 19 C 23 19, 25 17, 25 13.5 C 25 10, 23 8, 19 8 Z"
            className="fill-cyan-400"
          />
        </g>

        {/* LETTER 'I': Clean vertical column */}
        <g transform="translate(195, 4)">
          <rect x="0" y="2" width="7.5" height="31" rx="1.5" className="fill-teal-300" />
        </g>

        {/* LETTER 'S': Sharp aerodynamic segmented S */}
        <g transform="translate(230, 4)">
          <path
            d="M 6 33 L 26 33 C 30 33, 33 30, 33 26 L 33 20 C 33 16, 30 14.5, 25 14.5 L 12 14.5 C 9 14.5, 8 13, 8 11 L 8 9 C 8 7, 10 5, 13 5 L 32 5 L 32 0.5 L 12 0.5 C 6 0.5, 1 4.5, 1 9.5 L 1 14 C 1 19, 5 21, 10 21 L 23 21 C 26 21, 27 22.5, 27 24.5 L 27 27.5 C 27 29.5, 25 31, 22 31 L 6 31 Z"
            className="fill-cyan-300"
          />
        </g>
      </svg>

      {/* Subtitle: G A M E   S T U D I O */}
      {showSubtitle && (
        <div 
          className={`font-extrabold tracking-[0.42em] uppercase text-center select-none text-slate-400 ${dimensions.sub}`}
          style={{ 
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          GAME STUDIO
        </div>
      )}
    </div>
  );

  if (mode === 'horizontal') {
    return (
      <div className={`flex items-center gap-3 select-none ${className}`}>
        {renderMonogramSvg()}
        <div className="flex flex-col items-start justify-center">
          {renderWordmarkSvg()}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {shouldRenderMonogram && renderMonogramSvg()}
      {shouldRenderWordmark && (
        <div className="mt-2.5 flex flex-col items-center">
          {renderWordmarkSvg()}
        </div>
      )}
    </div>
  );
};
