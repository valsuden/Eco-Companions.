import { ThemeId, AccentColorId } from '../types';

export interface ThemeConfig {
  id: ThemeId;
  name: {
    es: string;
    en: string;
  };
  subtitle: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  isLight?: boolean;
  palette: [string, string, string, string]; // 4 prominent colors for preview card
  vars: {
    bgPrimary: string;
    bgSecondary: string;
    bgTertiary: string;
    surface: string;
    surfaceHover: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    accent: string;
    accentSecondary: string;
    accentRgb: string;
    success: string;
    warning: string;
    danger: string;
    border: string;
    borderSubtle: string;
    borderAccent: string;
    glow: string;
    cardBg: string;
    cardShadow: string;
    navBg: string;
    hudBg: string;
    modalBg: string;
  };
}

export interface AccentColorConfig {
  id: AccentColorId;
  name: {
    es: string;
    en: string;
  };
  hex: string;
  rgb: string;
  glow: string;
  borderAccent: string;
}

export const ACCENT_COLORS: AccentColorConfig[] = [
  {
    id: 'cyan',
    name: { es: 'Cyan Ecológico', en: 'Eco Cyan' },
    hex: '#06b6d4',
    rgb: '6, 182, 212',
    glow: 'rgba(6, 182, 212, 0.35)',
    borderAccent: '#22d3ee',
  },
  {
    id: 'turquoise',
    name: { es: 'Turquesa Río Cauca', en: 'Cauca Turquoise' },
    hex: '#14b8a6',
    rgb: '20, 184, 166',
    glow: 'rgba(20, 184, 166, 0.35)',
    borderAccent: '#2dd4bf',
  },
  {
    id: 'blue',
    name: { es: 'Azul Eléctrico', en: 'Electric Blue' },
    hex: '#3b82f6',
    rgb: '59, 130, 246',
    glow: 'rgba(59, 130, 246, 0.35)',
    borderAccent: '#60a5fa',
  },
  {
    id: 'emerald',
    name: { es: 'Verde Esmeralda', en: 'Emerald Green' },
    hex: '#10b981',
    rgb: '16, 185, 129',
    glow: 'rgba(16, 185, 129, 0.35)',
    borderAccent: '#34d399',
  },
  {
    id: 'purple',
    name: { es: 'Morado / Violeta', en: 'Cyber Purple' },
    hex: '#a855f7',
    rgb: '168, 85, 247',
    glow: 'rgba(168, 85, 247, 0.35)',
    borderAccent: '#c084fc',
  },
  {
    id: 'rose',
    name: { es: 'Rosa / Fucsia', en: 'Neon Rose' },
    hex: '#ec4899',
    rgb: '236, 72, 153',
    glow: 'rgba(236, 72, 153, 0.35)',
    borderAccent: '#f472b6',
  },
  {
    id: 'orange',
    name: { es: 'Naranja Sunset', en: 'Sunset Orange' },
    hex: '#f97316',
    rgb: '249, 115, 22',
    glow: 'rgba(249, 115, 22, 0.35)',
    borderAccent: '#fb923c',
  },
  {
    id: 'amber',
    name: { es: 'Amarillo / Ámbar', en: 'Solar Amber' },
    hex: '#eab308',
    rgb: '234, 179, 8',
    glow: 'rgba(234, 179, 8, 0.35)',
    borderAccent: '#facc15',
  },
];

export const THEMES_CONFIG: Record<ThemeId, ThemeConfig> = {
  dark: {
    id: 'dark',
    name: { es: 'CYBER ECO', en: 'CYBER ECO' },
    subtitle: { es: 'Tema oscuro nocturno', en: 'Dark nocturnal theme' },
    description: {
      es: 'Gris oscuro, Verde esmeralda, Cyan y acentos bioluminiscentes.',
      en: 'Dark slate, Emerald green, Cyan, and bioluminescent accents.',
    },
    isLight: false,
    palette: ['#090d16', '#111c30', '#10b981', '#06b6d4'],
    vars: {
      bgPrimary: '#090d16',
      bgSecondary: '#0f172a',
      bgTertiary: '#1e293b',
      surface: '#111c30',
      surfaceHover: '#1e2d4a',
      textPrimary: '#f8fafc',
      textSecondary: '#cbd5e1',
      textMuted: '#94a3b8',
      accent: '#10b981',
      accentSecondary: '#06b6d4',
      accentRgb: '16, 185, 129',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444',
      border: '#1e293b',
      borderSubtle: '#172033',
      borderAccent: '#10b981',
      glow: 'rgba(16, 185, 129, 0.35)',
      cardBg: '#0f172a',
      cardShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.7)',
      navBg: 'rgba(15, 23, 42, 0.96)',
      hudBg: 'rgba(9, 13, 22, 0.95)',
      modalBg: 'rgba(15, 23, 42, 0.98)',
    },
  },
  light: {
    id: 'light',
    isLight: true,
    name: { es: 'ECO CLARO', en: 'ECO LIGHT' },
    subtitle: { es: 'Tema claro y limpio', en: 'Clean and bright theme' },
    description: {
      es: 'Blanco perla, Gris suave, Verde natural y Azul cielo.',
      en: 'Pearl white, Soft gray, Natural green, and Sky blue.',
    },
    palette: ['#f8fafc', '#ffffff', '#059669', '#0284c7'],
    vars: {
      bgPrimary: '#f8fafc',
      bgSecondary: '#ffffff',
      bgTertiary: '#f1f5f9',
      surface: '#ffffff',
      surfaceHover: '#f1f5f9',
      textPrimary: '#0f172a',
      textSecondary: '#334155',
      textMuted: '#64748b',
      accent: '#059669',
      accentSecondary: '#0284c7',
      accentRgb: '5, 150, 105',
      success: '#059669',
      warning: '#d97706',
      danger: '#dc2626',
      border: '#e2e8f0',
      borderSubtle: '#cbd5e1',
      borderAccent: '#059669',
      glow: 'rgba(5, 150, 105, 0.25)',
      cardBg: '#ffffff',
      cardShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.08)',
      navBg: 'rgba(255, 255, 255, 0.97)',
      hudBg: 'rgba(248, 250, 252, 0.96)',
      modalBg: 'rgba(255, 255, 255, 0.98)',
    },
  },
  pastel: {
    id: 'pastel',
    name: { es: 'PASTEL', en: 'PASTEL' },
    subtitle: { es: 'Tema suave y moderno', en: 'Soft and modern aesthetic' },
    description: {
      es: 'Rosa pastel, Lila, Azul pastel y Verde menta.',
      en: 'Pastel pink, Lilac, Pastel blue, and Mint green.',
    },
    palette: ['#161224', '#f472b6', '#c084fc', '#34d399'],
    vars: {
      bgPrimary: '#140f20',
      bgSecondary: '#1d162d',
      bgTertiary: '#281e3c',
      surface: '#201833',
      surfaceHover: '#2d2247',
      textPrimary: '#fdf4ff',
      textSecondary: '#e9d5ff',
      textMuted: '#a855f7',
      accent: '#f472b6',
      accentSecondary: '#c084fc',
      accentRgb: '244, 114, 182',
      success: '#34d399',
      warning: '#fbbf24',
      danger: '#fb7185',
      border: '#3b2d5a',
      borderSubtle: '#2a1f42',
      borderAccent: '#f472b6',
      glow: 'rgba(244, 114, 182, 0.35)',
      cardBg: '#1b142b',
      cardShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.6)',
      navBg: 'rgba(23, 17, 36, 0.95)',
      hudBg: 'rgba(20, 15, 32, 0.92)',
      modalBg: 'rgba(27, 20, 43, 0.96)',
    },
  },
  ocean: {
    id: 'ocean',
    name: { es: 'OCEAN', en: 'OCEAN' },
    subtitle: { es: 'Inspirado en el océano', en: 'Deep ocean inspired' },
    description: {
      es: 'Azul abisal, Azul eléctrico, Turquesa y Cyan brillante.',
      en: 'Deep abyssal navy, Electric blue, Turquoise, and Cyan.',
    },
    palette: ['#030d1a', '#0284c7', '#14b8a6', '#38bdf8'],
    vars: {
      bgPrimary: '#030d1a',
      bgSecondary: '#07182c',
      bgTertiary: '#0d2542',
      surface: '#081e38',
      surfaceHover: '#0f2f54',
      textPrimary: '#f0f9ff',
      textSecondary: '#bae6fd',
      textMuted: '#7dd3fc',
      accent: '#0284c7',
      accentSecondary: '#14b8a6',
      accentRgb: '2, 132, 199',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#f43f5e',
      border: '#0c355e',
      borderSubtle: '#082542',
      borderAccent: '#38bdf8',
      glow: 'rgba(20, 184, 166, 0.4)',
      cardBg: '#051930',
      cardShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.7)',
      navBg: 'rgba(7, 24, 44, 0.95)',
      hudBg: 'rgba(3, 13, 26, 0.92)',
      modalBg: 'rgba(6, 25, 48, 0.96)',
    },
  },
  forest: {
    id: 'forest',
    name: { es: 'FOREST', en: 'FOREST' },
    subtitle: { es: 'Tema ecológico y botánico', en: 'Botanical and ecological theme' },
    description: {
      es: 'Verde oscuro, Verde esmeralda, Verde menta y Cyan selva.',
      en: 'Deep forest, Emerald green, Mint, and Jungle cyan.',
    },
    palette: ['#05120b', '#10b981', '#34d399', '#06b6d4'],
    vars: {
      bgPrimary: '#041009',
      bgSecondary: '#091d11',
      bgTertiary: '#102d1d',
      surface: '#0c2517',
      surfaceHover: '#133924',
      textPrimary: '#f0fdf4',
      textSecondary: '#bbf7d0',
      textMuted: '#86efac',
      accent: '#10b981',
      accentSecondary: '#34d399',
      accentRgb: '16, 185, 129',
      success: '#22c55e',
      warning: '#eab308',
      danger: '#ef4444',
      border: '#144229',
      borderSubtle: '#0c2d1b',
      borderAccent: '#34d399',
      glow: 'rgba(16, 185, 129, 0.4)',
      cardBg: '#081f13',
      cardShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.7)',
      navBg: 'rgba(9, 29, 17, 0.95)',
      hudBg: 'rgba(4, 16, 9, 0.92)',
      modalBg: 'rgba(8, 31, 19, 0.96)',
    },
  },
  purple: {
    id: 'purple',
    name: { es: 'PURPLE', en: 'PURPLE' },
    subtitle: { es: 'Tema futurista y cyber', en: 'Futuristic and cyber aesthetic' },
    description: {
      es: 'Morado oscuro, Violeta cuántico, Fucsia y Cyan neón.',
      en: 'Deep purple, Quantum violet, Fuchsia, and Neon cyan.',
    },
    palette: ['#0d0617', '#a855f7', '#d946ef', '#22d3ee'],
    vars: {
      bgPrimary: '#0d0617',
      bgSecondary: '#160b26',
      bgTertiary: '#23123d',
      surface: '#1b0d30',
      surfaceHover: '#291448',
      textPrimary: '#faf5ff',
      textSecondary: '#e9d5ff',
      textMuted: '#c084fc',
      accent: '#a855f7',
      accentSecondary: '#d946ef',
      accentRgb: '168, 85, 247',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#f43f5e',
      border: '#35185d',
      borderSubtle: '#220f3d',
      borderAccent: '#c084fc',
      glow: 'rgba(168, 85, 247, 0.4)',
      cardBg: '#150927',
      cardShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.7)',
      navBg: 'rgba(22, 11, 38, 0.95)',
      hudBg: 'rgba(13, 6, 23, 0.92)',
      modalBg: 'rgba(21, 9, 39, 0.96)',
    },
  },
  sunset: {
    id: 'sunset',
    name: { es: 'SUNSET', en: 'SUNSET' },
    subtitle: { es: 'Tema cálido y crepúsculo', en: 'Warm twilight sunset theme' },
    description: {
      es: 'Azul noche, Naranja solar, Rosa crepúsculo y Morado.',
      en: 'Night sky, Solar orange, Dusk rose, and Twilight purple.',
    },
    palette: ['#0f0a1c', '#f97316', '#f43f5e', '#a855f7'],
    vars: {
      bgPrimary: '#0f0a1c',
      bgSecondary: '#1a102e',
      bgTertiary: '#271743',
      surface: '#1f1338',
      surfaceHover: '#2e1c52',
      textPrimary: '#fff1f2',
      textSecondary: '#fed7aa',
      textMuted: '#fb923c',
      accent: '#f97316',
      accentSecondary: '#f43f5e',
      accentRgb: '249, 115, 22',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444',
      border: '#3c2062',
      borderSubtle: '#271440',
      borderAccent: '#fb923c',
      glow: 'rgba(249, 115, 22, 0.4)',
      cardBg: '#170e2a',
      cardShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.7)',
      navBg: 'rgba(26, 16, 46, 0.95)',
      hudBg: 'rgba(15, 10, 28, 0.92)',
      modalBg: 'rgba(23, 14, 42, 0.96)',
    },
  },
  monochrome: {
    id: 'monochrome',
    name: { es: 'MONOCHROME', en: 'MONOCHROME' },
    subtitle: { es: 'Minimalista de alto contraste', en: 'Minimalist high contrast' },
    description: {
      es: 'Negro obsidian, Blanco puro, Gris plata y acento personalizable.',
      en: 'Obsidian black, Pure white, Silver gray, and configurable accent.',
    },
    palette: ['#050505', '#ffffff', '#737373', '#e5e5e5'],
    vars: {
      bgPrimary: '#050505',
      bgSecondary: '#0f0f0f',
      bgTertiary: '#1a1a1a',
      surface: '#141414',
      surfaceHover: '#242424',
      textPrimary: '#ffffff',
      textSecondary: '#d4d4d4',
      textMuted: '#a3a3a3',
      accent: '#e5e5e5',
      accentSecondary: '#a3a3a3',
      accentRgb: '229, 229, 229',
      success: '#22c55e',
      warning: '#eab308',
      danger: '#ef4444',
      border: '#2a2a2a',
      borderSubtle: '#1c1c1c',
      borderAccent: '#ffffff',
      glow: 'rgba(255, 255, 255, 0.3)',
      cardBg: '#0d0d0d',
      cardShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.9)',
      navBg: 'rgba(15, 15, 15, 0.96)',
      hudBg: 'rgba(5, 5, 5, 0.94)',
      modalBg: 'rgba(17, 17, 17, 0.98)',
    },
  },
};

/**
 * Returns whether system prefers light mode
 */
export function isSystemLightMode(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
}

/**
 * Resolves the active theme ID taking followSystem into account
 */
export function getResolvedTheme(themeId: ThemeId = 'dark', followSystem = false): ThemeId {
  if (followSystem) {
    return isSystemLightMode() ? 'light' : (themeId === 'light' ? 'dark' : themeId);
  }
  return themeId;
}

/**
 * Applies the selected theme & custom accent color dynamically to document root via CSS variables
 */
export function applyTheme(
  themeId: ThemeId = 'dark',
  customAccent?: AccentColorId,
  followSystem = false
): void {
  if (typeof document === 'undefined') return;

  const resolvedThemeId = getResolvedTheme(themeId, followSystem);
  const theme = THEMES_CONFIG[resolvedThemeId] || THEMES_CONFIG.dark;
  const root = document.documentElement;

  // Set data-theme attribute on root
  root.setAttribute('data-theme', resolvedThemeId);
  if (theme.isLight) {
    root.classList.add('theme-light');
    root.classList.remove('theme-dark');
  } else {
    root.classList.add('theme-dark');
    root.classList.remove('theme-light');
  }

  // Base theme variables
  const vars = { ...theme.vars };

  // Custom Accent Override if selected
  if (customAccent) {
    const accentCfg = ACCENT_COLORS.find((a) => a.id === customAccent);
    if (accentCfg) {
      vars.accent = accentCfg.hex;
      vars.accentRgb = accentCfg.rgb;
      vars.glow = accentCfg.glow;
      vars.borderAccent = accentCfg.borderAccent;
    }
  }

  // Apply to document :root
  root.style.setProperty('--bg-primary', vars.bgPrimary);
  root.style.setProperty('--bg-secondary', vars.bgSecondary);
  root.style.setProperty('--bg-tertiary', vars.bgTertiary);
  root.style.setProperty('--surface', vars.surface);
  root.style.setProperty('--surface-hover', vars.surfaceHover);
  root.style.setProperty('--text-primary', vars.textPrimary);
  root.style.setProperty('--text-secondary', vars.textSecondary);
  root.style.setProperty('--text-muted', vars.textMuted);
  root.style.setProperty('--accent', vars.accent);
  root.style.setProperty('--accent-secondary', vars.accentSecondary);
  root.style.setProperty('--accent-rgb', vars.accentRgb);
  root.style.setProperty('--success', vars.success);
  root.style.setProperty('--warning', vars.warning);
  root.style.setProperty('--danger', vars.danger);
  root.style.setProperty('--border', vars.border);
  root.style.setProperty('--border-subtle', vars.borderSubtle);
  root.style.setProperty('--border-accent', vars.borderAccent);
  root.style.setProperty('--glow', vars.glow);
  root.style.setProperty('--card-bg', vars.cardBg);
  root.style.setProperty('--card-shadow', vars.cardShadow);
  root.style.setProperty('--nav-bg', vars.navBg);
  root.style.setProperty('--hud-bg', vars.hudBg);
  root.style.setProperty('--modal-bg', vars.modalBg);
}
