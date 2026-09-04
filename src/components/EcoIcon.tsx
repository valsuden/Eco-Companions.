import React from 'react';
import { 
  Leaf, 
  Recycle, 
  Trash2, 
  Sparkles, 
  Utensils, 
  Droplet, 
  Flame, 
  Package, 
  Fish, 
  Apple, 
  Coffee, 
  Box, 
  Crown, 
  Flower2, 
  Sun, 
  Compass, 
  ShieldCheck, 
  Zap, 
  Trophy, 
  Award, 
  Heart, 
  Moon, 
  Trees, 
  Waves, 
  HelpCircle,
  FileText,
  Carrot,
  Salad,
  Soup,
  Bone,
  Wheat,
  Smile
} from 'lucide-react';

interface EcoIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const EcoIcon: React.FC<EcoIconProps> = ({ name, className = 'w-6 h-6', size }) => {
  const iconProps = { className, ...(size ? { size } : {}) };

  switch (name) {
    // Waste Items - Organics
    case 'org_1':
    case 'banana':
    case '🍌':
      return <Leaf {...iconProps} className={`${className} text-emerald-400`} />;
    case 'org_2':
    case 'apple':
    case '🍎':
      return <Apple {...iconProps} className={`${className} text-emerald-400`} />;
    case 'org_3':
    case 'leaves':
    case '🍂':
      return <Leaf {...iconProps} className={`${className} text-emerald-500`} />;
    case 'org_4':
    case 'eggshell':
    case '🥚':
      return <Sparkles {...iconProps} className={`${className} text-emerald-300`} />;
    case 'org_5':
    case 'coffee':
    case '☕':
      return <Coffee {...iconProps} className={`${className} text-amber-600`} />;
    case 'org_6':
    case 'orange':
    case '🍊':
      return <Sun {...iconProps} className={`${className} text-amber-500`} />;

    // Waste Items - Recyclables
    case 'rec_1':
    case 'pet_bottle':
    case '🧴':
      return <Droplet {...iconProps} className={`${className} text-sky-400`} />;
    case 'rec_2':
    case 'cardboard':
    case '📦':
      return <Box {...iconProps} className={`${className} text-amber-400`} />;
    case 'rec_3':
    case 'can':
    case '🥫':
      return <Package {...iconProps} className={`${className} text-cyan-400`} />;
    case 'rec_4':
    case 'paper':
    case '📄':
      return <FileText {...iconProps} className={`${className} text-slate-300`} />;
    case 'rec_5':
    case 'glass_jar':
    case '🫙':
      return <Droplet {...iconProps} className={`${className} text-teal-300`} />;
    case 'rec_6':
    case 'tetrapak':
    case '🧃':
      return <Package {...iconProps} className={`${className} text-blue-400`} />;

    // Waste Items - Non-Usable
    case 'non_1':
    case 'greasy_napkin':
    case 'non_3':
    case 'toilet_paper':
    case '🧻':
      return <Trash2 {...iconProps} className={`${className} text-slate-400`} />;
    case 'non_2':
    case 'snack_bag':
    case '🍟':
      return <Package {...iconProps} className={`${className} text-slate-400`} />;
    case 'non_4':
    case 'foam':
    case '🥡':
      return <Box {...iconProps} className={`${className} text-slate-400`} />;
    case 'non_5':
    case 'broken_ceramic':
      return <Trash2 {...iconProps} className={`${className} text-slate-500`} />;
    case 'non_6':
    case 'cigarette':
    case '🚬':
      return <Flame {...iconProps} className={`${className} text-rose-400`} />;

    // Foods - Cat
    case 'food_cat_kibble':
    case '🥣':
      return <Utensils {...iconProps} className={`${className} text-emerald-400`} />;
    case 'food_salmon_sustainable':
    case '🐟':
      return <Fish {...iconProps} className={`${className} text-cyan-400`} />;
    case 'food_cat_grass':
    case '🌱':
      return <Leaf {...iconProps} className={`${className} text-emerald-400`} />;
    case 'food_gourmet_treat':
    case '🍪':
      return <Sparkles {...iconProps} className={`${className} text-amber-400`} />;

    // Foods - Dog
    case 'food_dog_crunch_bone':
    case '🦴':
      return <Bone {...iconProps} className={`${className} text-amber-400`} />;
    case 'food_dog_veggie_stew':
    case '🍲':
      return <Soup {...iconProps} className={`${className} text-orange-400`} />;
    case 'food_dog_carrot_sticks':
      return <Carrot {...iconProps} className={`${className} text-orange-500`} />;
    case 'food_dog_banana_bites':
    case '🍌':
      return <Sparkles {...iconProps} className={`${className} text-amber-300`} />;

    // Foods - Rabbit
    case 'food_rabbit_timothy_hay':
    case '🌾':
      return <Wheat {...iconProps} className={`${className} text-lime-400`} />;
    case 'food_rabbit_fresh_carrot':
    case '🥕':
      return <Carrot {...iconProps} className={`${className} text-emerald-400`} />;
    case 'food_rabbit_mint_salad':
    case '🥗':
      return <Salad {...iconProps} className={`${className} text-emerald-300`} />;
    case 'food_rabbit_dried_berries':
    case '🍓':
      return <Apple {...iconProps} className={`${className} text-rose-400`} />;

    // Shared / Water
    case 'food_spring_water':
    case '💧':
      return <Droplet {...iconProps} className={`${className} text-sky-400`} />;

    // Species
    case 'cat':
    case '🐱':
      return <Heart {...iconProps} className={`${className} text-cyan-400`} />;
    case 'dog':
    case '🐶':
      return <Bone {...iconProps} className={`${className} text-amber-400`} />;
    case 'rabbit':
    case '🐰':
      return <Leaf {...iconProps} className={`${className} text-emerald-400`} />;

    // Store Items & Decor
    case 'item_plant_guayacan':
    case '🌸':
      return <Flower2 {...iconProps} className={`${className} text-pink-400`} />;
    case 'item_solar_fountain':
    case '⛲':
      return <Droplet {...iconProps} className={`${className} text-cyan-400`} />;
    case 'item_wood_composter':
    case '🪵':
      return <Box {...iconProps} className={`${className} text-amber-600`} />;
    case 'item_solar_lanterns':
    case '🏮':
      return <Sun {...iconProps} className={`${className} text-amber-400`} />;
    case 'item_eco_bed':
    case '🛏️':
      return <Moon {...iconProps} className={`${className} text-indigo-400`} />;
      
    // Cosmetics: Hats
    case 'hat_liceo_cap':
    case '🧢':
      return <ShieldCheck {...iconProps} className={`${className} text-cyan-400`} />;
    case 'hat_leaf_crown':
    case '👑':
      return <Crown {...iconProps} className={`${className} text-emerald-400`} />;
    case 'hat_sun_flower':
    case '🌻':
      return <Sun {...iconProps} className={`${className} text-amber-400`} />;
    case 'hat_cyber_headphones':
    case '🎧':
      return <Zap {...iconProps} className={`${className} text-cyan-300`} />;
    case 'hat_solar_crown':
      return <Crown {...iconProps} className={`${className} text-amber-300`} />;

    // Cosmetics: Glasses & Visors
    case 'glasses_cyber_visor':
      return <Zap {...iconProps} className={`${className} text-cyan-400`} />;
    case 'glasses_cool_shades':
    case '🕶️':
      return <Sun {...iconProps} className={`${className} text-slate-300`} />;

    // Cosmetics: Collars, Scarves, Capes
    case 'acc_eco_scarf':
    case '🧣':
      return <ShieldCheck {...iconProps} className={`${className} text-teal-400`} />;
    case 'acc_cauca_amulet':
      return <Droplet {...iconProps} className={`${className} text-sky-400`} />;
    case 'acc_solar_cape':
    case '✨':
      return <Sparkles {...iconProps} className={`${className} text-amber-300`} />;

    // Cosmetics: Auras & Skins
    case 'aura_spores':
      return <Sparkles {...iconProps} className={`${className} text-emerald-400`} />;
    case 'aura_cyber_glitch':
      return <Zap {...iconProps} className={`${className} text-cyan-400`} />;
    case 'skin_emerald_forest':
      return <Trees {...iconProps} className={`${className} text-emerald-400`} />;
    case 'skin_golden_sun':
      return <Sun {...iconProps} className={`${className} text-amber-400`} />;
    case 'skin_river_blue':
      return <Waves {...iconProps} className={`${className} text-sky-400`} />;
    case 'skin_snow_frost':
      return <Sparkles {...iconProps} className={`${className} text-indigo-300`} />;

    // Achievements & General
    case 'ach_first_game':
      return <Compass {...iconProps} className={`${className} text-emerald-400`} />;
    case 'ach_sort_10':
      return <Recycle {...iconProps} className={`${className} text-cyan-400`} />;
    case 'ach_sort_50':
    case '🌊':
      return <Waves {...iconProps} className={`${className} text-blue-400`} />;
    case 'ach_sort_100':
    case '🏆':
      return <Trophy {...iconProps} className={`${className} text-amber-400`} />;
    case 'ach_park_clean':
      return <Sparkles {...iconProps} className={`${className} text-teal-400`} />;
    case 'ach_combo_master':
    case '⚡':
      return <Zap {...iconProps} className={`${className} text-purple-400`} />;

    // Bins & Categories
    case 'organic':
    case '🟢':
      return <Leaf {...iconProps} className={`${className} text-emerald-400`} />;
    case 'recyclable':
    case '🔵':
      return <Recycle {...iconProps} className={`${className} text-blue-400`} />;
    case 'non_usable':
    case '⚫':
      return <Trash2 {...iconProps} className={`${className} text-slate-400`} />;

    default:
      return <Award {...iconProps} className={`${className} text-cyan-400`} />;
  }
};
