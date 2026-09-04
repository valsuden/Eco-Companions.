import { User, Stats, PetInfo, InventoryItem } from '../types';

export const INITIAL_USER: User = {
  name: '',
  language: 'en',
  schoolGrade: 'Grado 6° - Liceo Caucasia',
  level: 1,
  xp: 0,
  coins: 50,
  streak: 1,
  dailyRewardClaimed: false,
  soundEnabled: true,
  musicEnabled: true,
  animationsEnabled: true,
  notificationsEnabled: true,
  timePlayedMinutes: 0,
  gamesCompleted: 0,
  wasteStats: {
    organic: 0,
    recyclable: 0,
    nonUsable: 0,
    total: 0,
  },
  highScores: {
    tetris: 0,
    fastSort: 0,
    parkCleanup: 0,
  },
  unlockedDecor: ['item_plant_guayacan'],
  equippedDecor: ['item_plant_guayacan'],
  equippedHat: '',
  equippedGlasses: '',
  equippedAccessory: '',
  equippedAura: '',
  equippedHabitat: 'garden_basic',
  ownedCosmetics: ['hat_liceo_cap', 'skin_mystic_night'],
  petAffectionEnergy: 100,
  lastPetTimestamp: Date.now(),
  theme: 'dark',
  accentColor: 'cyan',
  followSystemTheme: false,
};

export const INITIAL_STATS: Stats = {
  hunger: 80,
  energy: 85,
  mood: 90,
  hygiene: 80,
};

export const INITIAL_PET: PetInfo = {
  name: 'Aeris',
  species: 'cat',
  title: 'Guardián Místico del Liceo',
  colorScheme: 'mystic_night',
  favoriteFood: 'Pescado Sostenible',
  equippedHat: '',
  equippedGlasses: '',
  equippedAccessory: '',
  equippedAura: '',
  petAffectionEnergy: 100,
  lastPetTimestamp: Date.now(),
  adoptedAt: '2026-01-15T08:00:00.000Z',
};

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv_1',
    itemId: 'food_cat_kibble',
    name: 'Croquetas Ecológicas',
    icon: 'food_cat_kibble',
    rarity: 'common',
    category: 'food',
    qty: 5,
    description: 'Empaque biodegradable con ingredientes sostenibles.',
    effectText: '+30 Saciedad, +10 Ánimo',
    statBoost: { hunger: 30, mood: 10, energy: 15 }
  },
  {
    id: 'inv_2',
    itemId: 'food_spring_water',
    name: 'Agua Pura de Manantial',
    icon: 'food_spring_water',
    rarity: 'common',
    category: 'food',
    qty: 3,
    description: 'Agua fresca en cuenco reutilizable.',
    effectText: '+35 Energía, +10 Saciedad',
    statBoost: { energy: 35, hunger: 10 }
  },
  {
    id: 'inv_3',
    itemId: 'food_cat_grass',
    name: 'Hierba Gatera Orgánica',
    icon: 'food_cat_grass',
    rarity: 'common',
    category: 'food',
    qty: 2,
    description: 'Cultivada en la huerta escolar del Liceo Caucasia.',
    effectText: '+40 Ánimo, +15 Saciedad',
    statBoost: { mood: 40, hunger: 15, energy: 20 }
  },
  {
    id: 'inv_4',
    itemId: 'hat_liceo_cap',
    name: 'Gorra Eco-Liceísta',
    icon: 'hat_liceo_cap',
    rarity: 'rare',
    category: 'hat',
    cosmeticSlot: 'hat',
    qty: 1,
    description: 'Gorra oficial de explorador ambiental del Liceo Caucasia.',
    effectText: 'Orgullo y Estilo Liceísta'
  }
];
