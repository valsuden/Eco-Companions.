import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { 
  User, 
  Stats, 
  PetInfo, 
  PetSpecies,
  StoreItem, 
  EcoFood,
  InventoryItem,
  CosmeticSlot,
  PetColorScheme,
  ViewType, 
  ToastItem,
  AppNotification
} from './types';
import { 
  INITIAL_USER, 
  INITIAL_STATS, 
  INITIAL_PET,
  INITIAL_INVENTORY
} from './utils/storage';
import { sound } from './utils/sound';
import { applyTheme } from './utils/theme';

import { Navigation } from './components/Navigation';
import { DailyRewardModal } from './components/DailyRewardModal';
import { LevelUpModal } from './components/LevelUpModal';
import { ToastContainer } from './components/ToastContainer';
import { LearnEnglishModal } from './components/LearnEnglishModal';
import { NotificationCenter } from './components/NotificationCenter';

import { SplashView } from './views/SplashView';
import { OnboardingView } from './views/OnboardingView';
import { HomeView } from './views/HomeView';
import { InventoryView } from './views/InventoryView';
import { GamesView } from './views/GamesView';
import { StoreView } from './views/StoreView';
import { ProfileView } from './views/ProfileView';
import { SettingsView } from './views/SettingsView';
import { EcoPassView } from './views/EcoPassView';
import { QuestsView } from './views/QuestsView';
import { CollectionView } from './views/CollectionView';
import { PetDiaryView } from './views/PetDiaryView';

import { GlobalBackground } from './components/GlobalBackground';

const STORAGE_KEY = 'aeris_eco_liceista_v1';

export default function App() {
  // Load saved state or default
  const [user, setUser] = useState<User>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_user`);
      const parsed = saved ? JSON.parse(saved) : {};
      return { 
        ...INITIAL_USER, 
        ...parsed,
        inventory: parsed.inventory || INITIAL_INVENTORY,
        ownedCosmetics: parsed.ownedCosmetics || ['hat_liceo_cap', 'skin_mystic_night'],
        petAffectionEnergy: parsed.petAffectionEnergy !== undefined ? parsed.petAffectionEnergy : 100,
      };
    } catch {
      return { ...INITIAL_USER, inventory: INITIAL_INVENTORY };
    }
  });

  const [stats, setStats] = useState<Stats>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_stats`);
      return saved ? { ...INITIAL_STATS, ...JSON.parse(saved) } : INITIAL_STATS;
    } catch {
      return INITIAL_STATS;
    }
  });

  const [petInfo, setPetInfo] = useState<PetInfo>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_pet`);
      const parsed = saved ? JSON.parse(saved) : null;
      return parsed
        ? { ...INITIAL_PET, ...parsed, adoptedAt: parsed.adoptedAt || INITIAL_PET.adoptedAt || new Date().toISOString() }
        : INITIAL_PET;
    } catch {
      return INITIAL_PET;
    }
  });

  const [currentView, setCurrentView] = useState<ViewType>(() => {
    return user.name ? 'home' : 'splash';
  });

  // Notifications state
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'notif_welcome',
      title: '¡Bienvenido a Aeris 2.0!',
      message: 'Explora la nueva interfaz renovada con metas, colección, racha activa y diario de mascotas.',
      timestamp: 'Ahora',
      read: false,
      type: 'system',
    },
    {
      id: 'notif_daily_streak',
      title: 'Racha Activa Lista',
      message: 'Reclama tu bonificación diaria para mantener tu multiplicador de racha encendido.',
      timestamp: 'Hoy',
      read: false,
      type: 'quest',
      rewardCoins: 50,
      rewardXp: 30,
    },
  ]);

  // Modal and action states
  const [isDailyRewardOpen, setIsDailyRewardOpen] = useState(false);
  const [isEnglishModalOpen, setIsEnglishModalOpen] = useState(false);
  const [levelUpData, setLevelUpData] = useState<{ isOpen: boolean; level: number }>({
    isOpen: false,
    level: 1,
  });
  const [actionState, setActionState] = useState<'idle' | 'eating' | 'playing' | 'sleeping' | 'happy' | 'sad' | 'celebrating'>('idle');
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Ref for anti-spam throttle on petting
  const lastPetTimeRef = useRef<number>(0);

  // Sync sound setting
  useEffect(() => {
    sound.setEnabled(user.soundEnabled ?? true);
  }, [user.soundEnabled]);

  // Sync and Apply Active Theme & Accent
  useEffect(() => {
    applyTheme(user.theme || 'dark', user.accentColor || 'cyan', user.followSystemTheme || false);
  }, [user.theme, user.accentColor, user.followSystemTheme]);

  // Listen to OS system color scheme changes if followSystemTheme is active
  useEffect(() => {
    if (!user.followSystemTheme) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const handler = () => {
      applyTheme(user.theme || 'dark', user.accentColor || 'cyan', true);
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [user.theme, user.accentColor, user.followSystemTheme]);

  // Persist State to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_user`, JSON.stringify(user));
    } catch (e) {
      console.error('Failed to save user state', e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_stats`, JSON.stringify(stats));
    } catch (e) {
      console.error('Failed to save stats', e);
    }
  }, [stats]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_pet`, JSON.stringify(petInfo));
    } catch (e) {
      console.error('Failed to save pet', e);
    }
  }, [petInfo]);

  // Toast notifier helper
  const addToast = useCallback((message: string, type: 'info' | 'success' | 'warning' = 'info') => {
    const id = `toast_${Date.now()}_${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  // Vital stats decay loop & Pet Affection Energy passive recharge
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        hunger: Math.max(0, prev.hunger - 1),
        mood: Math.max(0, prev.mood - 1),
        energy: Math.max(0, prev.energy - 1),
        hygiene: Math.max(0, prev.hygiene - 1),
      }));

      // Increment played time & gradually recharge pet affection energy
      setUser((u) => ({
        ...u,
        timePlayedMinutes: (u.timePlayedMinutes || 0) + 1,
        petAffectionEnergy: Math.min(100, (u.petAffectionEnergy ?? 0) + 10),
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getTargetXPForLevel = (lvl: number) => {
    if (lvl === 1) return 100;
    if (lvl === 2) return 250;
    if (lvl === 3) return 450;
    if (lvl === 4) return 700;
    return 1000 + (lvl - 5) * 400;
  };

  // Check XP for Level Up
  const addXP = useCallback((amount: number) => {
    setUser((prev) => {
      const newXP = prev.xp + amount;
      const currentLevel = prev.level;
      const targetXPForNext = getTargetXPForLevel(currentLevel);

      if (newXP >= targetXPForNext) {
        sound.playLevelUp();
        const nextLvl = currentLevel + 1;
        setLevelUpData({ isOpen: true, level: nextLvl });
        setActionState('celebrating');
        setTimeout(() => setActionState('idle'), 3500);

        return {
          ...prev,
          level: nextLvl,
          xp: newXP,
          coins: prev.coins + 50,
        };
      }

      return { ...prev, xp: newXP };
    });
  }, []);

  const addCoins = useCallback((amount: number) => {
    setUser((prev) => ({ ...prev, coins: prev.coins + amount }));
  }, []);

  // Pet Action: Feed Food
  const handleFeedFood = (food: EcoFood) => {
    sound.playEat();
    setActionState('eating');

    setStats((prev) => ({
      ...prev,
      hunger: Math.min(100, prev.hunger + food.hungerBoost),
      mood: Math.min(100, prev.mood + food.moodBoost),
      energy: Math.min(100, prev.energy + food.energyBoost),
    }));

    if (food.price > 0) {
      setUser((prev) => ({ ...prev, coins: Math.max(0, prev.coins - food.price) }));
    }

    addXP(food.xpGained);

    // Recharge some affection energy when fed
    setUser((prev) => ({
      ...prev,
      petAffectionEnergy: Math.min(100, (prev.petAffectionEnergy ?? 0) + 20),
    }));

    setTimeout(() => {
      setActionState('happy');
      setTimeout(() => setActionState('idle'), 1500);
    }, 1800);
  };

  // Pet Action: Bath / Clean
  const handleCleanPet = () => {
    sound.playSparkle();
    setActionState('happy');

    setStats((prev) => ({
      ...prev,
      hygiene: Math.min(100, prev.hygiene + 35),
      mood: Math.min(100, prev.mood + 10),
    }));

    addXP(15);
    setUser((prev) => ({
      ...prev,
      petAffectionEnergy: Math.min(100, (prev.petAffectionEnergy ?? 0) + 15),
    }));
    setTimeout(() => setActionState('idle'), 1500);
  };

  // Pet Action: Sleep / Rest
  const handleSleepPet = () => {
    sound.playPurr();
    setActionState('sleeping');

    setStats((prev) => ({
      ...prev,
      energy: Math.min(100, prev.energy + 40),
    }));

    addXP(15);
    setUser((prev) => ({
      ...prev,
      petAffectionEnergy: Math.min(100, (prev.petAffectionEnergy ?? 0) + 25),
    }));
    setTimeout(() => setActionState('idle'), 2500);
  };

  // =========================================================================
  // FIX FOR XP FARMING EXPLOIT: Strict Energy System & Cooldown
  // =========================================================================
  const handlePetClick = () => {
    const now = Date.now();
    // Anti-rapid spam throttle: must wait at least 700ms between pets
    if (now - lastPetTimeRef.current < 700) {
      return;
    }
    lastPetTimeRef.current = now;

    sound.playPurr();
    setActionState('happy');

    setStats((prev) => ({
      ...prev,
      mood: Math.min(100, prev.mood + 6),
    }));

    const currentEnergy = user.petAffectionEnergy ?? 100;

    if (currentEnergy >= 15) {
      // Award modest XP (3 XP) and deduct affection energy
      addXP(3);
      setUser((prev) => ({
        ...prev,
        petAffectionEnergy: Math.max(0, (prev.petAffectionEnergy ?? 100) - 15),
        lastPetTimestamp: now,
      }));
    } else {
      // Energy is exhausted: Pet still purrs and feels loved, but 0 XP is granted to prevent farming!
      setUser((prev) => ({
        ...prev,
        lastPetTimestamp: now,
      }));
    }

    setTimeout(() => setActionState('idle'), 1400);
  };

  // =========================================================================
  // COSMETICS & INVENTORY HANDLERS
  // =========================================================================
  const handleEquipCosmetic = (slot: CosmeticSlot, itemId: string) => {
    sound.playEquip();

    setPetInfo((prev) => {
      const updated = { ...prev };
      if (slot === 'hat') updated.equippedHat = itemId;
      if (slot === 'glasses') updated.equippedGlasses = itemId;
      if (slot === 'accessory') updated.equippedAccessory = itemId;
      if (slot === 'aura') updated.equippedAura = itemId;
      return updated;
    });

    setUser((prev) => {
      const updated = { ...prev };
      if (slot === 'hat') updated.equippedHat = itemId;
      if (slot === 'glasses') updated.equippedGlasses = itemId;
      if (slot === 'accessory') updated.equippedAccessory = itemId;
      if (slot === 'aura') updated.equippedAura = itemId;
      return updated;
    });

    addToast('¡Cosmético equipado con éxito! ✨', 'success');
  };

  const handleUnequipCosmetic = (slot: CosmeticSlot) => {
    sound.playClick();

    setPetInfo((prev) => {
      const updated = { ...prev };
      if (slot === 'hat') updated.equippedHat = '';
      if (slot === 'glasses') updated.equippedGlasses = '';
      if (slot === 'accessory') updated.equippedAccessory = '';
      if (slot === 'aura') updated.equippedAura = '';
      return updated;
    });

    setUser((prev) => {
      const updated = { ...prev };
      if (slot === 'hat') updated.equippedHat = '';
      if (slot === 'glasses') updated.equippedGlasses = '';
      if (slot === 'accessory') updated.equippedAccessory = '';
      if (slot === 'aura') updated.equippedAura = '';
      return updated;
    });

    addToast('Cosmético desequipado', 'info');
  };

  const handleChangeSkin = (skinId: PetColorScheme) => {
    sound.playSparkle();
    setPetInfo((prev) => ({ ...prev, colorScheme: skinId }));
    setUser((prev) => ({
      ...prev,
      ownedCosmetics: Array.from(new Set([...(prev.ownedCosmetics || []), `skin_${skinId}`])),
    }));
    addToast('¡Nuevo estilo de pelaje 2.5D activado! 🐾', 'success');
  };

  const handleUseInventoryItem = (item: InventoryItem) => {
    sound.playEat();
    setActionState('eating');

    // Apply stat boosts from item
    if (item.statBoost) {
      setStats((prev) => ({
        hunger: Math.min(100, prev.hunger + (item.statBoost?.hunger || 0)),
        mood: Math.min(100, prev.mood + (item.statBoost?.mood || 0)),
        energy: Math.min(100, prev.energy + (item.statBoost?.energy || 0)),
        hygiene: Math.min(100, prev.hygiene + (item.statBoost?.hygiene || 0)),
      }));
    }

    addXP(20);

    // Decrement item qty in user's inventory
    setUser((prev) => {
      const inventory = prev.inventory || [];
      const updated = inventory
        .map((i) => (i.id === item.id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0);
      return { ...prev, inventory: updated };
    });

    addToast(`¡Consumiste ${item.name}! ${item.effectText}`, 'success');

    setTimeout(() => {
      setActionState('happy');
      setTimeout(() => setActionState('idle'), 1400);
    }, 1500);
  };

  // Minigames Results Handler
  const handleUpdateGameResults = (
    gameType: 'tetris' | 'fastSort' | 'parkCleanup',
    score: number,
    coinsEarned: number,
    xpEarned: number,
    wasteSortedCount: number
  ) => {
    sound.playReward();
    addCoins(coinsEarned);
    addXP(xpEarned);

    // Recharge pet affection energy when playing games
    setUser((prev) => {
      const currentBest = prev.highScores[gameType] || 0;
      const isNewRecord = score > currentBest;

      const org = Math.ceil(wasteSortedCount * 0.4);
      const rec = Math.floor(wasteSortedCount * 0.4);
      const non = wasteSortedCount - (org + rec);

      if (isNewRecord) {
        addToast(`🏆 ¡NUEVO RÉCORD en ${gameType.toUpperCase()}: ${score} PTS!`, 'success');
      } else {
        addToast(`¡Misión completada! +${coinsEarned} 🪙 Monedas y +${xpEarned} XP`, 'success');
      }

      return {
        ...prev,
        gamesCompleted: prev.gamesCompleted + 1,
        petAffectionEnergy: Math.min(100, (prev.petAffectionEnergy ?? 0) + 30),
        highScores: {
          ...prev.highScores,
          [gameType]: Math.max(currentBest, score),
        },
        wasteStats: {
          organic: prev.wasteStats.organic + org,
          recyclable: prev.wasteStats.recyclable + rec,
          nonUsable: prev.wasteStats.nonUsable + non,
          total: prev.wasteStats.total + wasteSortedCount,
        },
      };
    });
  };

  // Store Buy Item Handler
  const handleBuyItem = (item: StoreItem) => {
    if (user.coins < item.price) {
      addToast('No tienes suficientes monedas 🪙', 'warning');
      return;
    }

    sound.playCoin();
    setUser((prev) => {
      const updatedOwned = Array.from(new Set([...(prev.ownedCosmetics || []), item.id]));
      const updatedDecor = Array.from(new Set([...(prev.unlockedDecor || []), item.id]));
      return {
        ...prev,
        coins: prev.coins - item.price,
        unlockedDecor: updatedDecor,
        ownedCosmetics: updatedOwned,
      };
    });

    addToast(`¡Compraste ${item.name}! Ya está disponible en tu Inventario ✨`, 'success');
  };

  // Equip Item Handler (from store or quick action)
  const handleEquipItem = (item: StoreItem) => {
    sound.playSparkle();
    if (item.cosmeticSlot) {
      handleEquipCosmetic(item.cosmeticSlot, item.id);
    } else if (item.category === 'accessory') {
      const isEquipped = user.equippedHat === item.id;
      handleEquipCosmetic('hat', isEquipped ? '' : item.id);
    } else {
      const isEquipped = user.equippedDecor.includes(item.id);
      setUser((prev) => ({
        ...prev,
        equippedDecor: isEquipped
          ? prev.equippedDecor.filter((id) => id !== item.id)
          : [...prev.equippedDecor, item.id],
      }));
      addToast(isEquipped ? 'Guardaste la decoración' : `¡Colocaste ${item.name} en el hábitat!`, 'success');
    }
  };

  // Daily Reward Claim
  const handleClaimDailyReward = () => {
    addCoins(75);
    addXP(50);
    setUser((prev) => ({
      ...prev,
      streak: prev.streak + 1,
      dailyRewardClaimed: true,
      lastActiveDate: new Date().toISOString(),
      petAffectionEnergy: 100,
    }));
    addToast('¡Reclamaste tu recompensa diaria de +75 🪙 y +50 XP!', 'success');
    setIsDailyRewardOpen(false);
  };

  // Eco Pass Handler
  const handleClaimPassReward = (tier: number, rewardType: 'coins' | 'cosmetic', amount: number, cosmeticId?: string) => {
    setUser((prev) => {
      const claimedTiers = prev.claimedPassTiers || [];
      if (claimedTiers.includes(tier)) return prev;

      let newCoins = prev.coins;
      let newOwnedCosmetics = prev.ownedCosmetics || [];

      if (rewardType === 'coins') {
        newCoins += amount;
        addToast(user.language === 'es' ? `¡Reclamaste ${amount} Monedas del Pase!` : `Claimed ${amount} Pass Coins!`, 'success');
      } else if (rewardType === 'cosmetic' && cosmeticId) {
        newOwnedCosmetics = Array.from(new Set([...newOwnedCosmetics, cosmeticId]));
        addToast(user.language === 'es' ? '¡Cosmético Premium Reclamado!' : 'Premium Cosmetic Claimed!', 'success');
      }

      return {
        ...prev,
        coins: newCoins,
        ownedCosmetics: newOwnedCosmetics,
        claimedPassTiers: [...claimedTiers, tier]
      };
    });
  };

  // Quests & Achievement Reward Claims
  const handleClaimQuestReward = (questId: string, coins: number, xp: number) => {
    addCoins(coins);
    addXP(xp);
    addToast(user.language === 'es' ? `¡Meta completada! +${coins} 🪙 y +${xp} XP` : `Quest complete! +${coins} 🪙 and +${xp} XP`, 'success');
  };

  const handleClaimAchievementReward = (achievementId: string, coins: number, xp: number) => {
    addCoins(coins);
    addXP(xp);
    addToast(user.language === 'es' ? `¡Insignia desbloqueada! +${coins} 🪙 y +${xp} XP` : `Badge unlocked! +${coins} 🪙 and +${xp} XP`, 'success');
  };

  // Switch Pet Species Handler
  const handleSwitchPetSpecies = (species: PetSpecies) => {
    setPetInfo((prev) => ({
      ...prev,
      species,
      name: prev.name || (species === 'dog' ? 'Rocco' : species === 'rabbit' ? 'Copito' : 'Aeris'),
    }));
    addToast(user.language === 'es' ? `Mascota activa cambiada a ${species}` : `Active pet changed to ${species}`, 'info');
  };

  // Notification Handlers
  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
    addToast(user.language === 'es' ? 'Notificaciones limpiadas' : 'Notifications cleared', 'info');
  };

  const handleClaimNotificationReward = (notif: AppNotification) => {
    if (notif.rewardCoins) addCoins(notif.rewardCoins);
    if (notif.rewardXp) addXP(notif.rewardXp);
    setNotifications((prev) => prev.filter((n) => n.id !== notif.id));
    addToast(user.language === 'es' ? '¡Recompensa de notificación reclamada!' : 'Notification reward claimed!', 'success');
  };

  // Reset Progress Handler
  const handleResetProgress = () => {
    sound.playWrong();
    setUser(INITIAL_USER);
    setStats(INITIAL_STATS);
    setPetInfo(INITIAL_PET);
    localStorage.removeItem(`${STORAGE_KEY}_user`);
    localStorage.removeItem(`${STORAGE_KEY}_stats`);
    localStorage.removeItem(`${STORAGE_KEY}_pet`);
    
    // Clear all tour flags to restart tutorial
    for (const key of Object.keys(localStorage)) {
      if (key.startsWith('caucasia_eco_tour_')) {
        localStorage.removeItem(key);
      }
    }
    
    setCurrentView('onboarding');
    addToast('Progreso reiniciado correctamente', 'info');
  };

  // Update Pet Name Handler
  const handleUpdatePetName = (newName: string) => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    setPetInfo((prev) => ({
      ...prev,
      name: trimmed,
    }));
    addToast(`¡Nombre de la mascota actualizado a ${trimmed}! 🐾`, 'success');
  };

  // Onboarding completion
  const handleOnboardingComplete = (playerName: string, petName: string, grade: string, species: PetSpecies = 'cat') => {
    sound.playLevelUp();
    setUser((prev) => ({
      ...prev,
      name: playerName,
      schoolGrade: grade,
    }));
    setPetInfo((prev) => ({
      ...prev,
      name: petName || (species === 'dog' ? 'Rocco' : species === 'rabbit' ? 'Copito' : 'Aeris'),
      species: species,
      adoptedAt: prev.adoptedAt || new Date().toISOString(),
    }));
    setCurrentView('home');
    addToast(`¡Bienvenido al Liceo Caucasia, ${playerName}!`, 'success');
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-theme-primary flex flex-col md:flex-row text-theme-primary relative">
      <GlobalBackground />
      {/* Toast Notifications */}
      <ToastContainer
        toasts={toasts}
        onRemove={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
      />

      {/* Navigation Sidebar / Bottom Bar (Only when logged in & inside app) */}
      {currentView !== 'splash' && currentView !== 'onboarding' && (
        <Navigation
          currentView={currentView}
          user={user}
          onNavigate={(view) => {
            sound.playClick();
            if (view === 'learn-english') {
              setIsEnglishModalOpen(true);
            } else {
              setCurrentView(view);
            }
          }}
          unreadCount={user.dailyRewardClaimed ? 0 : 1}
          onUpdateUser={(updates) => setUser((u) => ({ ...u, ...updates }))}
        />
      )}

      {/* Main Content View Switcher */}
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <main className="flex-1 h-full overflow-hidden relative">
        <AnimatePresence mode="wait">
          {/* 1. SPLASH SCREEN */}
          {currentView === 'splash' && (
            <motion.div
              key="splash"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <SplashView
                petInfo={petInfo}
                language={user.language || 'en'}
                onStart={(targetView) => {
                  if (!user.name) {
                    setCurrentView('onboarding');
                  } else {
                    setCurrentView(targetView || 'home');
                  }
                }}
              />
            </motion.div>
          )}

          {/* 2. ONBOARDING */}
          {currentView === 'onboarding' && (
            <motion.div
              key="onboarding"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <OnboardingView 
                onComplete={handleOnboardingComplete} 
                language={user.language || 'en'}
              />
            </motion.div>
          )}

          {/* 3. HOME / SANCTUARY */}
          {currentView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <HomeView
                user={user}
                stats={stats}
                petInfo={petInfo}
                actionState={actionState}
                onFeedFood={handleFeedFood}
                onCleanPet={handleCleanPet}
                onSleepPet={handleSleepPet}
                onPetClick={handlePetClick}
                onOpenDailyReward={() => setIsDailyRewardOpen(true)}
                onOpenNotifications={() => setIsNotificationsOpen(true)}
                unreadNotificationsCount={notifications.filter((n) => !n.read).length}
                onRewardXpAndCoins={(xp, coins) => {
                  addXP(xp);
                  if (coins > 0) addCoins(coins);
                }}
                onUpdatePetName={handleUpdatePetName}
                onUpdateUser={(updates) => setUser((u) => ({ ...u, ...updates }))}
              />
            </motion.div>
          )}

          {/* 4. INVENTORY & COSMETICS WARDROBE */}
          {currentView === 'inventory' && (
            <motion.div
              key="inventory"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <InventoryView
                user={user}
                petInfo={petInfo}
                onEquipCosmetic={handleEquipCosmetic}
                onUnequipCosmetic={handleUnequipCosmetic}
                onChangeSkin={handleChangeSkin}
                onUseInventoryItem={handleUseInventoryItem}
                onNavigateToStore={() => setCurrentView('store')}
              />
            </motion.div>
          )}

          {/* 5. GAMES HUB */}
          {currentView === 'games' && (
            <motion.div
              key="games"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <GamesView
                user={user}
                onUpdateGameResults={handleUpdateGameResults}
              />
            </motion.div>
          )}

          {/* 6. STORE */}
          {currentView === 'store' && (
            <motion.div
              key="store"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <StoreView
                user={user}
                onBuyItem={handleBuyItem}
                onEquipItem={handleEquipItem}
              />
            </motion.div>
          )}

          {/* 7. PROFILE */}
          {currentView === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <ProfileView
                user={user}
                petInfo={petInfo}
              />
            </motion.div>
          )}

          {/* 8. ECO PASS */}
          {currentView === 'ecopass' && (
            <motion.div
              key="ecopass"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <EcoPassView
                user={user}
                onClaimReward={handleClaimPassReward}
              />
            </motion.div>
          )}

          {/* 9. SETTINGS */}
          {currentView === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <SettingsView
                user={user}
                petInfo={petInfo}
                onUpdateUser={(updates) => setUser((u) => ({ ...u, ...updates }))}
                onUpdatePetInfo={(updates) => setPetInfo((p) => ({ ...p, ...updates }))}
                onResetProgress={handleResetProgress}
                onBack={() => setCurrentView('home')}
              />
            </motion.div>
          )}

          {/* 10. QUESTS & LOGROS */}
          {currentView === 'quests' && (
            <motion.div
              key="quests"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <QuestsView
                user={user}
                onClaimQuestReward={handleClaimQuestReward}
                onClaimAchievementReward={handleClaimAchievementReward}
              />
            </motion.div>
          )}

          {/* 11. COLLECTION ALBUM */}
          {currentView === 'collection' && (
            <motion.div
              key="collection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <CollectionView
                user={user}
                petInfo={petInfo}
              />
            </motion.div>
          )}

          {/* 12. PET DIARY */}
          {currentView === 'pet-diary' && (
            <motion.div
              key="pet-diary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <PetDiaryView
                user={user}
                petInfo={petInfo}
                onSwitchPetSpecies={handleSwitchPetSpecies}
                onUpdatePetName={handleUpdatePetName}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Notification Center Drawer */}
      <NotificationCenter
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkNotificationAsRead}
        onClearAll={handleClearAllNotifications}
        onClaimReward={handleClaimNotificationReward}
        language={user.language || 'en'}
      />

      {/* Daily Reward Modal */}
      <DailyRewardModal
        isOpen={isDailyRewardOpen}
        onClose={() => setIsDailyRewardOpen(false)}
        streak={user.streak}
        dailyRewardClaimed={user.dailyRewardClaimed}
        onClaim={handleClaimDailyReward}
        language={user.language || 'en'}
      />

      {/* Level Up Celebration Modal */}
      <LevelUpModal
        isOpen={levelUpData.isOpen}
        newLevel={levelUpData.level}
        onClose={() => setLevelUpData((prev) => ({ ...prev, isOpen: false }))}
        language={user.language || 'en'}
      />

      {/* Learn English Modal */}
      <LearnEnglishModal
        isOpen={isEnglishModalOpen}
        onClose={() => setIsEnglishModalOpen(false)}
        language={user.language || 'en'}
        onReward={(xp, coins) => {
          addXP(xp);
          addCoins(coins);
          addToast(user.language === 'es' ? `¡Excelente práctica! +${xp} XP y +${coins} 🪙 Monedas` : `Great practice! +${xp} XP and +${coins} 🪙 Coins`, 'success');
        }}
      />
    </div>
  );
}


