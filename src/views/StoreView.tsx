import { useState } from 'react';
import { motion } from 'motion/react';
import { User, StoreItem, ItemCategory } from '../types';
import { STORE_ITEMS, getLocalizedStoreItem } from '../data/ecoData';
import { EcoIcon } from '../components/EcoIcon';
import { ShoppingBag, Coins, Lock, Check, Sparkles, Leaf, Box, Crown, Home, HelpCircle } from 'lucide-react';
import { sound } from '../utils/sound';
import { useI18n } from '../utils/i18n';
import { GuidedTour, TourStep } from '../components/GuidedTour';

interface StoreViewProps {
  user: User;
  onBuyItem: (item: StoreItem) => void;
  onEquipItem: (item: StoreItem) => void;
}

export function StoreView({ user, onBuyItem, onEquipItem }: StoreViewProps) {
  const currentLang = user.language || 'en';
  const t = useI18n(currentLang);
  const [selectedCategory, setSelectedCategory] = useState<'all' | ItemCategory>('all');
  const [showTour, setShowTour] = useState(() => {
    try {
      return localStorage.getItem('caucasia_eco_tour_store_tour') !== 'true';
    } catch {
      return false;
    }
  });

  const tourSteps: TourStep[] = [
    {
      id: 'step_coins',
      targetId: 'store-tour-coins',
      title: t.storeTourStep1Title,
      description: t.storeTourStep1Desc,
      icon: <Coins className="w-5 h-5 text-amber-400" />,
    },
    {
      id: 'step_categories',
      targetId: 'store-tour-categories',
      title: t.storeTourStep2Title,
      description: t.storeTourStep2Desc,
      icon: <Sparkles className="w-5 h-5 text-cyan-400" />,
    },
    {
      id: 'step_items',
      targetId: 'store-tour-items',
      title: t.storeTourStep3Title,
      description: t.storeTourStep3Desc,
      icon: <ShoppingBag className="w-5 h-5 text-emerald-400" />,
    },
  ];

  const categories: { id: 'all' | ItemCategory; label: string; icon: typeof Sparkles }[] = [
    { id: 'all', label: t.all, icon: Sparkles },
    { id: 'plant', label: t.plants, icon: Leaf },
    { id: 'decor', label: t.decor, icon: Box },
    { id: 'accessory', label: t.accessories, icon: Crown },
    { id: 'habitat', label: t.habitats, icon: Home },
  ];

  const filteredItems = STORE_ITEMS.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <div 
      className="w-full h-full overflow-y-auto p-4 sm:p-6 select-none bg-theme-primary text-theme-primary"
    >
      <div className="max-w-4xl mx-auto space-y-6 pb-20 md:pb-6">
        {/* Header */}
        <div 
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-theme pb-4"
        >
          <div>
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-theme-accent" />
              <h1 className="text-xl sm:text-2xl font-black text-theme-primary">
                {t.storeTitle}
              </h1>
            </div>
            <p className="text-xs mt-1 text-theme-muted">
              {t.storeSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* Guided Tour Replay Button */}
            <button
              id="btn-store-tour"
              onClick={() => {
                sound.playClick();
                setShowTour(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-theme-accent text-xs font-bold transition-all cursor-pointer hover:opacity-85 glass-panel bg-theme-surface text-theme-accent"
              title={t.tourHelpBtnStore}
            >
              <HelpCircle className="w-4 h-4" />
              <span className="text-[11px] font-extrabold">{t.tourHelpBtnStore}</span>
            </button>

            {/* User Coins Counter */}
            <div 
              id="store-tour-coins"
              className="flex items-center gap-2 px-4 py-2 rounded-2xl border text-amber-300 font-extrabold text-xs sm:text-sm shadow-inner glass-panel bg-amber-500/10 border-amber-500/30"
            >
              <Coins className="w-4 h-4 text-amber-400" />
              <span>{user.coins} {t.coins}</span>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div id="store-tour-categories" className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedCategory(cat.id);
                }}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer border glass-panel ${
                  isActive ? 'bg-theme-accent border-theme-accent text-white' : 'bg-theme-surface border-theme text-theme-secondary hover:text-theme-primary'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-theme-accent'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Items Grid */}
        <div id="store-tour-items" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => {
            const isUnlockedLevel = user.level >= item.unlockLevel;
            const ownedCosmetics = user.ownedCosmetics || ['hat_liceo_cap', 'skin_mystic_night'];
            const isPurchased =
              user.unlockedDecor.includes(item.id) ||
              ownedCosmetics.includes(item.id) ||
              user.equippedHat === item.id ||
              user.equippedGlasses === item.id ||
              user.equippedAccessory === item.id ||
              user.equippedAura === item.id;
            const isEquipped =
              user.equippedDecor.includes(item.id) ||
              user.equippedHat === item.id ||
              user.equippedGlasses === item.id ||
              user.equippedAccessory === item.id ||
              user.equippedAura === item.id;
            const canAfford = user.coins >= item.price;

            return (
              <motion.div
                key={item.id}
                whileHover={isUnlockedLevel ? { y: -3 } : undefined}
                className={`glass-card border rounded-3xl p-5 flex flex-col justify-between shadow-xl relative overflow-hidden transition-all ${
                  isEquipped ? 'border-theme-accent shadow-theme-glow' : 'border-theme-accent/30'
                }`}
                style={{
                  opacity: isUnlockedLevel ? 1 : 0.65,
                }}
              >
                <div className="space-y-3">
                  {/* Top Item Card */}
                  <div className="flex items-start justify-between">
                    <div 
                      className="w-14 h-14 rounded-2xl border border-theme flex items-center justify-center shadow-inner glass-panel bg-theme-primary"
                    >
                      <EcoIcon name={item.icon} className="w-7 h-7" />
                    </div>

                    <div className="flex flex-col items-end">
                      <span 
                        className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full border border-theme glass-panel bg-theme-primary text-theme-muted"
                      >
                        {item.category}
                      </span>
                      {!isUnlockedLevel && (
                        <span className="text-[10px] font-bold text-amber-400 mt-1 flex items-center gap-1">
                          <Lock className="w-3 h-3" /> {t.unlockAtLevel} {item.unlockLevel}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-black text-theme-primary">
                      {getLocalizedStoreItem(item, currentLang).name}
                    </h3>
                    <p className="text-xs mt-0.5 line-clamp-2 text-theme-muted">
                      {getLocalizedStoreItem(item, currentLang).description}
                    </p>
                  </div>

                  <div 
                    className="text-[11px] font-bold px-2.5 py-1 rounded-xl border glass-panel bg-theme-accent/10 border-theme-accent text-theme-accent"
                  >
                    {getLocalizedStoreItem(item, currentLang).effectText}
                  </div>
                </div>

                {/* Buy / Equip Button */}
                <div 
                  className="mt-4 pt-3 border-t border-theme"
                >
                  {isPurchased ? (
                    <button
                      onClick={() => {
                        sound.playClick();
                        onEquipItem(item);
                      }}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border glass-panel ${
                        isEquipped ? 'bg-theme-accent text-white border-theme-accent' : 'bg-theme-primary text-theme-primary border-theme hover:bg-theme-surface-hover'
                      }`}
                    >
                      {isEquipped ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>{t.equipped}</span>
                        </>
                      ) : (
                        <span>{t.equip}</span>
                      )}
                    </button>
                  ) : (
                    <button
                      disabled={!isUnlockedLevel || !canAfford}
                      onClick={() => {
                        if (canAfford && isUnlockedLevel) {
                          sound.playSparkle();
                          onBuyItem(item);
                        }
                      }}
                      className={`w-full py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-md border glass-panel ${
                        !isUnlockedLevel ? 'bg-theme-surface border-theme text-theme-muted cursor-not-allowed'
                        : canAfford ? 'bg-theme-accent text-white border-theme-accent cursor-pointer hover:opacity-90'
                        : 'bg-theme-surface border-theme text-theme-secondary cursor-not-allowed'
                      }`}
                    >
                      {!isUnlockedLevel ? (
                        <div className="flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5" />
                          <span>{t.unlockAtLevel} {item.unlockLevel}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <span>{t.buy}</span>
                          <span className="font-extrabold flex items-center gap-1">
                            <Coins className="w-3 h-3 text-amber-400" />
                            <span>{item.price}</span>
                          </span>
                        </div>
                      )}
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Onboarding Guided Tour */}
      <GuidedTour
        tourId="store_tour"
        isOpen={showTour}
        onClose={() => setShowTour(false)}
        steps={tourSteps}
        badgeText={t.storeTourBadge}
        finishButtonText={t.tourFinishStore}
        language={user.language || 'en'}
      />
    </div>
  );
}
