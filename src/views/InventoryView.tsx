import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  PetInfo, 
  StoreItem, 
  InventoryItem, 
  ItemCategory, 
  CosmeticSlot,
  PetColorScheme, 
  EcoFood 
} from '../types';
import { STORE_ITEMS, ECO_FOODS } from '../data/ecoData';
import { PetAvatar } from '../components/PetAvatar';
import { EcoIcon } from '../components/EcoIcon';
import { sound } from '../utils/sound';
import { useI18n } from '../utils/i18n';
import { 
  Backpack, 
  Sparkles, 
  Crown, 
  Check, 
  ShoppingBag, 
  Utensils, 
  Shirt, 
  RotateCcw,
  Zap,
  Info,
  HelpCircle
} from 'lucide-react';
import { GuidedTour, TourStep } from '../components/GuidedTour';

interface InventoryViewProps {
  user: User;
  petInfo: PetInfo;
  onEquipCosmetic: (slot: CosmeticSlot, itemId: string) => void;
  onUnequipCosmetic: (slot: CosmeticSlot) => void;
  onChangeSkin: (skinId: PetColorScheme) => void;
  onUseInventoryItem: (item: InventoryItem) => void;
  onNavigateToStore: () => void;
}

export function InventoryView({
  user,
  petInfo,
  onEquipCosmetic,
  onUnequipCosmetic,
  onChangeSkin,
  onUseInventoryItem,
  onNavigateToStore,
}: InventoryViewProps) {
  const currentLang = user.language || 'en';
  const t = useI18n(currentLang);

  const [showTour, setShowTour] = useState(() => {
    try {
      return localStorage.getItem('caucasia_eco_tour_inventory_tour') !== 'true';
    } catch {
      return false;
    }
  });

  const tourSteps: TourStep[] = [
    {
      id: 'step_wardrobe',
      targetId: 'inventory-tabs',
      title: currentLang === 'es' ? 'Tu Inventario' : 'Your Inventory',
      description: currentLang === 'es' 
        ? 'Aquí puedes ver tu guardarropa de cosméticos y tu mochila con objetos consumibles.' 
        : 'Here you can see your cosmetic wardrobe and your backpack with consumable items.',
      icon: <Backpack className="w-5 h-5 text-emerald-400" />
    },
    {
      id: 'step_pet_preview',
      targetId: 'pet-preview-stage',
      title: currentLang === 'es' ? 'Vista Previa' : 'Preview Stage',
      description: currentLang === 'es' 
        ? 'Prueba cómo se ven los accesorios en tiempo real.' 
        : 'Try out accessories and see how they look in real time.',
      icon: <Sparkles className="w-5 h-5 text-amber-400" />
    }
  ];

  const [activeTab, setActiveTab] = useState<'wardrobe' | 'backpack'>('wardrobe');
  const [selectedWardrobeCategory, setSelectedWardrobeCategory] = useState<'all' | CosmeticSlot>('all');
  const [selectedBackpackCategory, setSelectedBackpackCategory] = useState<'all' | 'food' | 'plant' | 'decor'>('all');

  // Owned cosmetic IDs
  const ownedCosmetics = user.ownedCosmetics || ['hat_liceo_cap', 'skin_mystic_night'];
  const userInventory = user.inventory || [];

  // Cosmetic items list from STORE_ITEMS
  const cosmeticCatalog = STORE_ITEMS.filter((item) => 
    item.category === 'accessory' || item.cosmeticSlot !== undefined
  );

  const species = petInfo.species || 'cat';

  // Available skins list dynamically adapted to species
  const getSkinOptions = () => {
    if (species === 'dog') {
      return [
        { id: 'mystic_night', name: currentLang === 'es' ? 'Perro Explorador Café' : 'Chestnut Scout Dog', rarity: 'epic', desc: currentLang === 'es' ? 'Pelaje café tostado con manchas chocolate y cresta esmeralda' : 'Warm chestnut brown coat with chocolate scout spots' },
        { id: 'emerald_forest', name: currentLang === 'es' ? 'Scout Selva Esmeralda' : 'Emerald Forest Scout', rarity: 'epic', desc: currentLang === 'es' ? 'Pelaje castaño bosque con runas de musgo' : 'Woodland brown coat with emerald foliage runes' },
        { id: 'golden_sun', name: currentLang === 'es' ? 'Golden Retriever Solar' : 'Radiant Golden Retriever', rarity: 'legendary', desc: currentLang === 'es' ? 'Pelaje dorado miel con resplandor áureo' : 'Bright golden honey coat with radiant solar glow' },
        { id: 'river_blue', name: currentLang === 'es' ? 'Scout Espíritu del Río' : 'River Scout Dog', rarity: 'epic', desc: currentLang === 'es' ? 'Pelaje chocolate con detalles y runas acuáticas' : 'Chocolate brown coat with aquatic river runes' },
        { id: 'snow_frost', name: currentLang === 'es' ? 'Husky Escarcha Polar' : 'Polar Frost Husky', rarity: 'legendary', desc: currentLang === 'es' ? 'Pelaje café grisáceo nevado con ojos violeta' : 'Frosted hazel-silver coat with crystal violet eyes' },
      ];
    }
    if (species === 'rabbit') {
      return [
        { id: 'mystic_night', name: currentLang === 'es' ? 'Conejo Blanco Botánico' : 'Pearl White Garden Rabbit', rarity: 'epic', desc: currentLang === 'es' ? 'Pelaje blanco perla con orejitas rosadas y ojos rubí' : 'Pure pearl white coat with rosy ears and ruby eyes' },
        { id: 'emerald_forest', name: currentLang === 'es' ? 'Conejo Menta Botánica' : 'Botanical Mint Bunny', rarity: 'epic', desc: currentLang === 'es' ? 'Pelaje blanco con reflejos menta y runas esmeralda' : 'White coat with soft mint green botanical accents' },
        { id: 'golden_sun', name: currentLang === 'es' ? 'Conejo Manzanilla Solar' : 'Chamomile Solar Bunny', rarity: 'legendary', desc: currentLang === 'es' ? 'Pelaje blanco crema cálido y ojos ámbar' : 'Warm cream white coat with radiant amber eyes' },
        { id: 'river_blue', name: currentLang === 'es' ? 'Conejo Brisa del Río' : 'River Breeze Bunny', rarity: 'epic', desc: currentLang === 'es' ? 'Pelaje blanco nieve con destellos celestes' : 'Snow white coat with celestial blue river energy' },
        { id: 'snow_frost', name: currentLang === 'es' ? 'Conejo Copito Glaciar' : 'Glacier Frost Bunny', rarity: 'legendary', desc: currentLang === 'es' ? 'Pelaje blanco diamante con destellos de hielo' : 'Radiant diamond white coat with frosted violet eyes' },
      ];
    }
    return [
      { id: 'mystic_night', name: currentLang === 'es' ? 'Pantera Cyber-Mística' : 'Mystic Cyber Panther', rarity: 'epic', desc: currentLang === 'es' ? 'Pelaje oscuro con runas cian bioluminiscentes' : 'Deep dark coat with cyan glowing runes' },
      { id: 'emerald_forest', name: currentLang === 'es' ? 'Guardián Selva Esmeralda' : 'Emerald Forest Guardian', rarity: 'epic', desc: currentLang === 'es' ? 'Pelaje verde selva con ojos esmeralda' : 'Forest green coat with emerald glow' },
      { id: 'golden_sun', name: currentLang === 'es' ? 'Felino Solar Radiante' : 'Radiant Sun Feline', rarity: 'legendary', desc: currentLang === 'es' ? 'Pelaje dorado y resplandor áureo' : 'Golden coat with radiant sun aura' },
      { id: 'river_blue', name: currentLang === 'es' ? 'Espíritu del Río Cauca' : 'River Cauca Spirit', rarity: 'epic', desc: currentLang === 'es' ? 'Pelaje azul marino con runas de agua' : 'River blue coat with aquatic energy' },
      { id: 'snow_frost', name: currentLang === 'es' ? 'Lince de Escarcha Eco' : 'Eco Frost Lynx', rarity: 'legendary', desc: currentLang === 'es' ? 'Pelaje blanco perlado con toques violetas' : 'Arctic white coat with crystal eyes' },
    ];
  };

  const skinOptions = getSkinOptions() as { id: PetColorScheme; name: string; rarity: 'epic' | 'legendary'; desc: string }[];

  // Filter cosmetics
  const filteredCosmetics = cosmeticCatalog.filter((item) => {
    if (selectedWardrobeCategory === 'all') return true;
    return item.cosmeticSlot === selectedWardrobeCategory;
  });

  // Filter backpack items
  const filteredBackpack = userInventory.filter((item) => {
    if (selectedBackpackCategory === 'all') return true;
    return item.category === selectedBackpackCategory;
  });

  // Check if item is equipped
  const isItemEquipped = (item: StoreItem | { id: string; cosmeticSlot?: CosmeticSlot }) => {
    if (item.cosmeticSlot === 'hat') return petInfo.equippedHat === item.id;
    if (item.cosmeticSlot === 'glasses') return petInfo.equippedGlasses === item.id;
    if (item.cosmeticSlot === 'accessory') return petInfo.equippedAccessory === item.id;
    if (item.cosmeticSlot === 'aura') return petInfo.equippedAura === item.id;
    if (item.cosmeticSlot === 'skin') return petInfo.colorScheme === item.id;
    return false;
  };

  const handleToggleCosmetic = (item: StoreItem) => {
    if (!item.cosmeticSlot) return;
    const slot = item.cosmeticSlot;
    if (isItemEquipped(item)) {
      sound.playClick();
      onUnequipCosmetic(slot);
    } else {
      sound.playEquip();
      if (slot === 'skin') {
        onChangeSkin(item.id.replace('skin_', '') as PetColorScheme);
      } else {
        onEquipCosmetic(slot, item.id);
      }
    }
  };

  const handleResetAllCosmetics = () => {
    sound.playClick();
    onUnequipCosmetic('hat');
    onUnequipCosmetic('glasses');
    onUnequipCosmetic('accessory');
    onUnequipCosmetic('aura');
  };

  return (
    <div
      id="inventory-view"
      className="w-full h-full overflow-y-auto p-3 sm:p-6 select-none bg-theme-primary text-theme-primary relative"
    >
      <div className="max-w-5xl mx-auto space-y-5 pb-24 md:pb-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-theme pb-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md shrink-0 bg-theme-accent text-white">
                <Backpack className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-theme-primary">
                {currentLang === 'es' ? 'Inventario y Armario' : 'Inventory & Wardrobe'}
              </h1>
            </div>
            <p className="text-xs mt-1 text-theme-muted">
              {currentLang === 'es' 
                ? 'Personaliza a tu mascota 2.5D con cosméticos y administra tus recursos ecológicos.' 
                : 'Customize your 2.5D pet with cosmetics and manage your eco-resources.'}
            </p>
          </div>

          {/* Quick Store Link Button */}
          <button
            onClick={() => {
              sound.playClick();
              onNavigateToStore();
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer self-start sm:self-auto border glass-panel border-theme-accent text-theme-accent hover:bg-theme-surface-hover"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{currentLang === 'es' ? 'Ir a la Eco-Tienda' : 'Go to Eco-Store'}</span>
          </button>
          
          <button
            onClick={() => {
              sound.playClick();
              setShowTour(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-theme-accent text-xs font-bold transition-all cursor-pointer hover:opacity-85 glass-panel bg-theme-surface text-theme-accent self-start sm:self-auto"
            title={currentLang === 'es' ? 'Ayuda' : 'Help'}
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

        {/* Top Segmented Navigation Tabs */}
        <div id="inventory-tour-wardrobe" className="grid grid-cols-2 p-1 rounded-2xl shadow-inner max-w-md mx-auto glass-panel">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('wardrobe');
            }}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'wardrobe' ? 'shadow-md scale-[1.02] bg-theme-accent text-white' : 'opacity-70 hover:opacity-100 text-theme-secondary bg-transparent'
            }`}
          >
            <Shirt className="w-4 h-4" />
            <span>{currentLang === 'es' ? 'Armario de Cosméticos' : 'Pet Wardrobe'}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('backpack');
            }}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'backpack' ? 'shadow-md scale-[1.02] bg-theme-accent text-white' : 'opacity-70 hover:opacity-100 text-theme-secondary bg-transparent'
            }`}
          >
            <Backpack className="w-4 h-4" />
            <span id="inventory-tour-backpack">{currentLang === 'es' ? 'Mochila de Objetos' : 'Backpack'}</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: ARMARIO DE COSMÉTICOS & LIVE 2.5D PREVIEW */}
        {/* ========================================================================= */}
        {activeTab === 'wardrobe' && (
          <div id="inventory-tabs" className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left 5 Cols: Live 2.5D Pet Stage & Equipped Summary */}
            <div id="pet-preview-stage" className="lg:col-span-5 rounded-3xl p-4 sm:p-5 flex flex-col items-center justify-between relative overflow-hidden glass-card">
              {/* Top Bar on Stage */}
              <div className="w-full flex items-center justify-between z-10 border-b border-theme pb-2 mb-2">
                <span className="text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 text-theme-accent">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{currentLang === 'es' ? 'Probador 2.5D en Vivo' : 'Live 2.5D Dressing Room'}</span>
                </span>
                
                {(petInfo.equippedHat || petInfo.equippedGlasses || petInfo.equippedAccessory || petInfo.equippedAura) && (
                  <button
                    onClick={handleResetAllCosmetics}
                    title={currentLang === 'es' ? 'Quitar todos los accesorios' : 'Unequip all accessories'}
                    className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg transition-all hover:opacity-80 cursor-pointer glass-panel text-theme-muted"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{currentLang === 'es' ? 'Desequipar' : 'Unequip all'}</span>
                  </button>
                )}
              </div>

              {/* 2.5D Mascot Preview Avatar */}
              <div className="w-full flex items-center justify-center py-2">
                <PetAvatar
                  petInfo={petInfo}
                  actionState="happy"
                  size="responsive"
                  showMoodBubble={false}
                  language={currentLang}
                />
              </div>

              {/* Equipped Slots Badge Pills */}
              <div className="w-full mt-3 grid grid-cols-2 gap-2 text-[10px] font-bold">
                <div
                  className={`p-2 rounded-xl flex items-center gap-2 truncate glass-panel bg-theme-primary ${petInfo.equippedHat ? 'border-theme-accent' : ''}`}
                >
                  <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">
                    {petInfo.equippedHat 
                      ? (STORE_ITEMS.find((i) => i.id === petInfo.equippedHat)?.name || petInfo.equippedHat) 
                      : (currentLang === 'es' ? 'Sin sombrero' : 'No hat')}
                  </span>
                </div>

                <div
                  className={`p-2 rounded-xl flex items-center gap-2 truncate glass-panel bg-theme-primary ${petInfo.equippedGlasses ? 'border-theme-accent' : ''}`}
                >
                  <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">
                    {petInfo.equippedGlasses 
                      ? (STORE_ITEMS.find((i) => i.id === petInfo.equippedGlasses)?.name || petInfo.equippedGlasses) 
                      : (currentLang === 'es' ? 'Sin visor' : 'No glasses')}
                  </span>
                </div>

                <div
                  className={`p-2 rounded-xl flex items-center gap-2 truncate glass-panel bg-theme-primary ${petInfo.equippedAccessory ? 'border-theme-accent' : ''}`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">
                    {petInfo.equippedAccessory 
                      ? (STORE_ITEMS.find((i) => i.id === petInfo.equippedAccessory)?.name || petInfo.equippedAccessory) 
                      : (currentLang === 'es' ? 'Sin accesorio' : 'No accessory')}
                  </span>
                </div>

                <div
                  className={`p-2 rounded-xl flex items-center gap-2 truncate glass-panel bg-theme-primary ${petInfo.equippedAura ? 'border-theme-accent' : ''}`}
                >
                  <Zap className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span className="truncate">
                    {petInfo.equippedAura 
                      ? (STORE_ITEMS.find((i) => i.id === petInfo.equippedAura)?.name || petInfo.equippedAura) 
                      : (currentLang === 'es' ? 'Sin aura' : 'No aura')}
                  </span>
                </div>
              </div>
            </div>

            {/* Right 7 Cols: Cosmetic Categories & Grid */}
            <div className="lg:col-span-7 space-y-4">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {[
                  { id: 'all', label: currentLang === 'es' ? 'Todos' : 'All' },
                  { id: 'hat', label: currentLang === 'es' ? 'Sombreros' : 'Hats' },
                  { id: 'glasses', label: currentLang === 'es' ? 'Gafas y Visores' : 'Glasses' },
                  { id: 'accessory', label: currentLang === 'es' ? 'Collares y Capas' : 'Accessories' },
                  { id: 'aura', label: currentLang === 'es' ? 'Auras' : 'Auras' },
                  { id: 'skin', label: currentLang === 'es' ? 'Pelajes' : 'Skins' },
                ].map((cat) => {
                  const isSelected = selectedWardrobeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        sound.playClick();
                        setSelectedWardrobeCategory(cat.id as any);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isSelected ? 'shadow-md scale-105 bg-theme-accent border-theme-accent text-white' : 'hover:opacity-85 glass-panel text-theme-secondary border-transparent'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Skins Special Selector if 'skin' or 'all' is selected */}
              {(selectedWardrobeCategory === 'skin' || selectedWardrobeCategory === 'all') && (
                <div
                  className="p-3 sm:p-4 rounded-2xl border space-y-3"
                  style={{
                    backgroundColor: 'var(--surface)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                      {currentLang === 'es' ? 'Variantes de Pelaje (Skins)' : 'Pet Skin Variants'}
                    </span>
                    <span className="text-[10px] font-semibold" style={{ color: 'var(--text-muted)' }}>
                      {currentLang === 'es' ? 'Estilos 2.5D exclusivos' : 'Exclusive 2.5D Styles'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {skinOptions.map((skin) => {
                      const isEquipped = petInfo.colorScheme === skin.id;
                      const isOwned = ownedCosmetics.includes(`skin_${skin.id}`) || skin.id === 'mystic_night';

                      return (
                        <div
                          key={skin.id}
                          className={`p-2.5 rounded-xl flex items-center justify-between gap-2.5 transition-all glass-panel bg-theme-primary ${isEquipped ? 'border-theme-accent shadow-theme-glow' : ''}`}
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold truncate text-theme-primary">
                                {skin.name}
                              </span>
                              <span className={`text-[8px] font-black uppercase px-1.5 py-0.2 rounded-full ${
                                skin.rarity === 'legendary' 
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                                  : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                              }`}>
                                {skin.rarity}
                              </span>
                            </div>
                            <p className="text-[10px] truncate mt-0.5 text-theme-muted">
                              {skin.desc}
                            </p>
                          </div>

                          <button
                            onClick={() => {
                              if (isOwned) {
                                sound.playEquip();
                                onChangeSkin(skin.id);
                              } else {
                                sound.playClick();
                                onNavigateToStore();
                              }
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all shrink-0 cursor-pointer ${
                              isEquipped
                                ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-md'
                                : isOwned
                                ? 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/40'
                                : 'bg-slate-800/60 hover:bg-slate-700 text-slate-300 border border-slate-700'
                            }`}
                          >
                            {isEquipped ? (
                              <span className="flex items-center gap-1">
                                <Check className="w-3.5 h-3.5" />
                                <span>{currentLang === 'es' ? 'Puesto' : 'Worn'}</span>
                              </span>
                            ) : isOwned ? (
                              <span>{currentLang === 'es' ? 'Usar' : 'Wear'}</span>
                            ) : (
                              <span className="flex items-center gap-1">
                                <ShoppingBag className="w-3 h-3" />
                                <span>{currentLang === 'es' ? 'Obtener' : 'Get'}</span>
                              </span>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Cosmetics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredCosmetics.map((item) => {
                  const isOwned = ownedCosmetics.includes(item.id);
                  const isEquipped = isItemEquipped(item);

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`glass-panel p-3 rounded-2xl flex flex-col justify-between gap-2.5 transition-all relative overflow-hidden ${isEquipped ? 'border-theme-accent shadow-theme-glow' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm glass-panel bg-theme-primary">
                          <EcoIcon name={item.icon} className="w-6 h-6" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h3 className="text-xs font-extrabold truncate text-theme-primary">
                              {item.name}
                            </h3>
                            <span className={`text-[8px] font-black uppercase px-1.5 py-0.2 rounded-full ${
                              item.rarity === 'legendary' 
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                                : item.rarity === 'epic'
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                                : item.rarity === 'rare'
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                                : 'bg-slate-700/30 text-slate-300 border border-slate-600/40'
                            }`}>
                              {item.rarity}
                            </span>
                          </div>

                          <p className="text-[10px] line-clamp-2 mt-0.5 leading-snug text-theme-secondary">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* Bottom action row */}
                      <div className="flex items-center justify-between pt-1 border-t border-theme">
                        <span className="text-[9.5px] font-semibold truncate max-w-[150px] text-theme-accent">
                          {item.effectText}
                        </span>

                        <button
                          onClick={() => {
                            if (isOwned) {
                              handleToggleCosmetic(item);
                            } else {
                              sound.playClick();
                              onNavigateToStore();
                            }
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                            isEquipped
                              ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold active:scale-95'
                              : isOwned
                              ? 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 active:scale-95'
                              : 'bg-slate-800/60 hover:bg-slate-700 text-slate-300 border border-slate-700'
                          }`}
                        >
                          {isEquipped ? (
                            <span className="flex items-center gap-1">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                              <span>{currentLang === 'es' ? 'Equipado' : 'Equipped'}</span>
                            </span>
                          ) : isOwned ? (
                            <span>{currentLang === 'es' ? 'Equipar' : 'Equip'}</span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <ShoppingBag className="w-3 h-3" />
                              <span>{currentLang === 'es' ? 'En Tienda' : 'Store'}</span>
                            </span>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: MOCHILA DE OBJETOS & ECO-RECURSOS */}
        {/* ========================================================================= */}
        {activeTab === 'backpack' && (
          <div className="space-y-4">
            {/* Category Pills for Backpack */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: currentLang === 'es' ? 'Todo en Mochila' : 'All Bag Items' },
                { id: 'food', label: currentLang === 'es' ? 'Alimentos y Snacks' : 'Eco Foods' },
                { id: 'plant', label: currentLang === 'es' ? 'Plantas' : 'Plants' },
                { id: 'decor', label: currentLang === 'es' ? 'Decoraciones' : 'Decor' },
              ].map((cat) => {
                const isSelected = selectedBackpackCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedBackpackCategory(cat.id as any);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected ? 'shadow-md scale-105 bg-theme-accent border-theme-accent text-white' : 'hover:opacity-85 glass-panel text-theme-secondary border-transparent'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Inventory Bag List */}
            {filteredBackpack.length === 0 ? (
              <div className="glass-card p-8 sm:p-12 rounded-3xl text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center shadow-md glass-panel bg-theme-primary text-theme-muted">
                  <Backpack className="w-7 h-7 stroke-[1.8]" />
                </div>
                <h3 className="text-base font-bold text-theme-primary">
                  {currentLang === 'es' ? 'No tienes objetos en esta categoría' : 'No items in this category'}
                </h3>
                <p className="text-xs max-w-sm mx-auto text-theme-muted">
                  {currentLang === 'es' 
                    ? 'Consigue deliciosos alimentos ecológicos o decoraciones para el hábitat en la tienda.' 
                    : 'Get delicious eco-friendly food and habitat items in the store.'}
                </p>
                <button
                  onClick={() => {
                    sound.playClick();
                    onNavigateToStore();
                  }}
                  className="mt-2 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black text-slate-950 shadow-md cursor-pointer transition-all active:scale-95 bg-theme-accent"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{currentLang === 'es' ? 'Explorar Eco-Tienda' : 'Explore Eco-Store'}</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                {filteredBackpack.map((item) => (
                  <div
                    key={item.id}
                    className="glass-panel p-3.5 rounded-2xl flex flex-col justify-between gap-3 shadow-md"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 relative shadow-sm glass-panel bg-theme-primary">
                        <EcoIcon name={item.icon} className="w-6 h-6" />
                        {item.qty > 1 && (
                          <span
                            className="absolute -top-1.5 -right-1.5 font-black text-[9px] px-1.5 py-0.2 rounded-full border shadow-sm bg-theme-accent text-white border-theme-accent"
                          >
                            x{item.qty}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-extrabold truncate text-theme-primary">
                          {item.name}
                        </h4>
                        <p className="text-[10px] line-clamp-2 mt-0.5 text-theme-secondary">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-theme">
                      <span className="text-[9px] font-bold text-theme-accent">
                        {item.effectText}
                      </span>

                      {item.category === 'food' ? (
                        <button
                          onClick={() => {
                            sound.playEat();
                            onUseInventoryItem(item);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer shadow-md active:scale-95 border glass-panel border-theme-accent bg-theme-primary text-theme-accent hover:bg-theme-surface-hover"
                        >
                          <Utensils className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{currentLang === 'es' ? 'Alimentar' : 'Feed'}</span>
                        </button>
                      ) : (
                        <span className="text-[9px] font-semibold text-theme-muted">
                          {currentLang === 'es' ? 'En Hábitat' : 'In Habitat'}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <GuidedTour
        tourId="inventory_tour"
        isOpen={showTour}
        onClose={() => setShowTour(false)}
        steps={tourSteps}
        badgeText={currentLang === 'es' ? 'Inventario' : 'Inventory'}
        finishButtonText={currentLang === 'es' ? '¡Entendido!' : 'Got it!'}
        language={currentLang as 'es' | 'en'}
      />
    </div>
  );
}
