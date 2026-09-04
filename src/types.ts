export type Language = 'en' | 'es';

export type ThemeId = 
  | 'dark' 
  | 'light' 
  | 'pastel' 
  | 'ocean' 
  | 'forest' 
  | 'purple' 
  | 'sunset' 
  | 'monochrome';

export type AccentColorId = 
  | 'cyan' 
  | 'turquoise' 
  | 'blue' 
  | 'emerald' 
  | 'purple' 
  | 'rose' 
  | 'orange' 
  | 'amber';

export type ViewType = 
  | 'splash' 
  | 'onboarding' 
  | 'home' 
  | 'games' 
  | 'store' 
  | 'inventory'
  | 'profile' 
  | 'settings'
  | 'learn-english';

export type WasteCategory = 'organic' | 'recyclable' | 'non_usable';

export interface WasteItem {
  id: string;
  name: string;
  category: WasteCategory;
  icon: string;
  description: string;
  educationalTip: string;
}

export type ItemRarity = 'common' | 'rare' | 'epic' | 'legendary';
export type ItemCategory = 'food' | 'plant' | 'decor' | 'accessory' | 'habitat' | 'hat' | 'glasses' | 'aura' | 'skin';
export type CosmeticSlot = 'hat' | 'glasses' | 'accessory' | 'aura' | 'skin';

export type PetSpecies = 'cat' | 'dog' | 'rabbit';

export interface EcoFood {
  id: string;
  name: string;
  icon: string;
  price: number;
  hungerBoost: number;
  moodBoost: number;
  energyBoost: number;
  xpGained: number;
  description: string;
  ecoTip: string;
  suitableSpecies?: PetSpecies[];
}

export interface StoreItem {
  id: string;
  name: string;
  price: number;
  icon: string;
  rarity: ItemRarity;
  category: ItemCategory;
  cosmeticSlot?: CosmeticSlot;
  description: string;
  effectText: string;
  statBoost?: {
    hunger?: number;
    energy?: number;
    mood?: number;
    hygiene?: number;
  };
  unlockLevel: number;
}

export interface InventoryItem {
  id: string;
  itemId: string;
  name: string;
  icon: string;
  rarity: ItemRarity;
  category: ItemCategory;
  cosmeticSlot?: CosmeticSlot;
  qty: number;
  description: string;
  effectText: string;
  statBoost?: {
    hunger?: number;
    energy?: number;
    mood?: number;
    hygiene?: number;
  };
}

export interface User {
  name: string;
  language?: 'en' | 'es';
  schoolGrade?: string;
  level: number;
  xp: number;
  coins: number;
  streak: number;
  dailyRewardClaimed: boolean;
  lastRewardClaimDate?: string;
  soundEnabled: boolean;
  musicEnabled: boolean;
  animationsEnabled: boolean;
  notificationsEnabled: boolean;
  timePlayedMinutes: number;
  gamesCompleted: number;
  wasteStats: {
    organic: number;
    recyclable: number;
    nonUsable: number;
    total: number;
  };
  highScores: {
    tetris: number;
    fastSort: number;
    parkCleanup: number;
  };
  unlockedDecor: string[];
  equippedDecor: string[];
  equippedHat?: string;
  equippedGlasses?: string;
  equippedAccessory?: string;
  equippedAura?: string;
  equippedHabitat?: string;
  ownedCosmetics?: string[];
  inventory?: InventoryItem[];
  petAffectionEnergy?: number;
  lastPetTimestamp?: number;
  theme?: ThemeId;
  accentColor?: AccentColorId;
  followSystemTheme?: boolean;
  petSpecies?: PetSpecies;
}

export interface Stats {
  hunger: number;   // 0 - 100
  energy: number;   // 0 - 100
  mood: number;     // 0 - 100
  hygiene: number;  // 0 - 100
}

export type PetColorScheme = 'mystic_night' | 'emerald_forest' | 'golden_sun' | 'river_blue' | 'snow_frost';

export interface PetInfo {
  name: string;
  species?: PetSpecies; // 'cat' | 'dog' | 'rabbit' (default: 'cat')
  title: string;
  colorScheme: PetColorScheme;
  favoriteFood: string;
  equippedHat?: string;
  equippedGlasses?: string;
  equippedAccessory?: string;
  equippedAura?: string;
  petAffectionEnergy: number; // 0 - 100 anti-exploit
  lastPetTimestamp?: number;
  adoptedAt?: string; // ISO date string of adoption
}

export interface ToastItem {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning' | 'reward';
}

export interface EducationalAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  rewardCoins: number;
  rewardXp: number;
}
