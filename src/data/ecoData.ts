import { WasteItem, EcoFood, StoreItem, EducationalAchievement } from '../types';

export const WASTE_ITEMS: WasteItem[] = [
  // ORGANIC
  {
    id: 'org_1',
    name: 'Cáscara de Plátano',
    category: 'organic',
    icon: 'org_1',
    description: 'Residuo biodegradable rico en potasio.',
    educationalTip: 'Los residuos orgánicos se transforman en abono o compostaje para enriquecer la tierra del Liceo.'
  },
  {
    id: 'org_2',
    name: 'Restos de Manzana',
    category: 'organic',
    icon: 'org_2',
    description: 'Corazón y piel de fruta descompuesta.',
    educationalTip: 'Al compostar restos de frutas reducimos las emisiones de metano en los rellenos sanitarios.'
  },
  {
    id: 'org_3',
    name: 'Hojas Secas del Jardín',
    category: 'organic',
    icon: 'org_3',
    description: 'Materia vegetal de árboles y plantas.',
    educationalTip: 'Las hojas secas aportan carbono esencial para una mezcla equilibrada en el compost del colegio.'
  },
  {
    id: 'org_4',
    name: 'Cáscaras de Huevo',
    category: 'organic',
    icon: 'org_4',
    description: 'Residuo orgánico rico en carbonato de calcio.',
    educationalTip: 'Aportan calcio valioso para fortalecer las raíces de las plantas escolares.'
  },
  {
    id: 'org_5',
    name: 'Restos de Café',
    category: 'organic',
    icon: 'org_5',
    description: 'Borra de café molido tras la preparación.',
    educationalTip: 'La borra de café nutre la tierra y ahuyenta plagas de forma natural y ecológica.'
  },
  {
    id: 'org_6',
    name: 'Cáscara de Naranja',
    category: 'organic',
    icon: 'org_6',
    description: 'Residuo cítrico biodegradable.',
    educationalTip: 'Las cáscaras cítricas se degradan en pocas semanas y nutren el suelo orgánico.'
  },

  // RECYCLABLE
  {
    id: 'rec_1',
    name: 'Botella de Plástico PET',
    category: 'recyclable',
    icon: 'rec_1',
    description: 'Plástico transparente y limpio.',
    educationalTip: 'Las botellas plásticas limpias y secas se pueden transformar en nuevas fibras textiles o envases.'
  },
  {
    id: 'rec_2',
    name: 'Caja de Cartón Limpia',
    category: 'recyclable',
    icon: 'rec_2',
    description: 'Cartón plegado sin grasa ni humedad.',
    educationalTip: 'Reciclar 1 tonelada de cartón salva hasta 17 árboles y ahorra miles de litros de agua.'
  },
  {
    id: 'rec_3',
    name: 'Lata de Aluminio',
    category: 'recyclable',
    icon: 'rec_3',
    description: 'Lata de refresco o conserva lavada.',
    educationalTip: 'El aluminio es 100% reciclable de forma infinita y ahorra el 95% de energía frente a fabricarlo nuevo.'
  },
  {
    id: 'rec_4',
    name: 'Cuaderno y Hojas de Papel',
    category: 'recyclable',
    icon: 'rec_4',
    description: 'Papel escolar seco sin plastificar.',
    educationalTip: 'El papel limpio de apuntes del Liceo puede convertirse en papel reciclado para nuevos útiles.'
  },
  {
    id: 'rec_5',
    name: 'Frasco de Vidrio',
    category: 'recyclable',
    icon: 'rec_5',
    description: 'Envase de vidrio sin tapas ni residuos.',
    educationalTip: 'El vidrio reciclado nunca pierde calidad ni pureza, reduciendo la contaminación ambiental.'
  },
  {
    id: 'rec_6',
    name: 'Envase Tetra Pak',
    category: 'recyclable',
    icon: 'rec_6',
    description: 'Caja de leche o jugo enjuagada y aplanada.',
    educationalTip: 'Al desarmar y limpiar los envases Tetra Pak se rescata celulosa y polialuminio para nuevos productos.'
  },

  // NON USABLE
  {
    id: 'non_1',
    name: 'Servilleta Usada / Grasosa',
    category: 'non_usable',
    icon: 'non_1',
    description: 'Papel manchado con comida o grasa.',
    educationalTip: 'Las servilletas con grasa no pueden ser recicladas en el contenedor azul porque contaminan la pulpa de papel.'
  },
  {
    id: 'non_2',
    name: 'Envoltorio de Snacks Metalizado',
    category: 'non_usable',
    icon: 'non_2',
    description: 'Bolsas multicapa de papas o galletas.',
    educationalTip: 'Estos empaques combinan plástico y metales laminados que no son fácilmente reciclables actualmente.'
  },
  {
    id: 'non_3',
    name: 'Papel Higiénico Usado',
    category: 'non_usable',
    icon: 'non_3',
    description: 'Residuo sanitario contaminado.',
    educationalTip: 'Por higiene y bioseguridad, todo residuo sanitario va estrictamente al contenedor negro.'
  },
  {
    id: 'non_4',
    name: 'Icopor / Poliestireno Sucio',
    category: 'non_usable',
    icon: 'non_4',
    description: 'Recipiente de comida desechable.',
    educationalTip: 'El icopor sucio con comida no se puede reciclar fácilmente y debe depositarse en no aprovechables.'
  },
  {
    id: 'non_5',
    name: 'Taza de Cerámica Rota',
    category: 'non_usable',
    icon: 'non_5',
    description: 'Loza o cerámica fragmentada.',
    educationalTip: 'La cerámica tiene un punto de fusión diferente al vidrio común y no entra en el reciclaje de botellas.'
  },
  {
    id: 'non_6',
    name: 'Colilla de Cigarrillo',
    category: 'non_usable',
    icon: 'non_6',
    description: 'Filtro con toxinas y nicotina.',
    educationalTip: 'Una sola colilla contamina hasta 50 litros de agua; jamás debe arrojarse al suelo o ríos.'
  }
];

export const ECO_FOODS: EcoFood[] = [
  // CAT MENU
  {
    id: 'food_cat_kibble',
    name: 'Croquetas Ecológicas',
    icon: 'food_cat_kibble',
    price: 15,
    hungerBoost: 30,
    moodBoost: 10,
    energyBoost: 15,
    xpGained: 15,
    description: 'Elaboradas con proteína sostenible y empaque 100% biodegradable.',
    ecoTip: 'Optar por alimentos con envases compostables reduce residuos plásticos en el hogar.',
    suitableSpecies: ['cat'],
  },
  {
    id: 'food_salmon_sustainable',
    name: 'Filete de Pescado Sostenible',
    icon: 'food_salmon_sustainable',
    price: 35,
    hungerBoost: 55,
    moodBoost: 25,
    energyBoost: 30,
    xpGained: 30,
    description: 'Pescado de pesca artesanal responsable que protege el ecosistema del Río Cauca.',
    ecoTip: 'La pesca sostenible respeta los periodos de veda y los ciclos de reproducción acuática.',
    suitableSpecies: ['cat'],
  },
  {
    id: 'food_cat_grass',
    name: 'Hierba Gatera Orgánica',
    icon: 'food_cat_grass',
    price: 20,
    hungerBoost: 15,
    moodBoost: 40,
    energyBoost: 20,
    xpGained: 20,
    description: 'Brotes frescos cultivados en la huerta escolar del Liceo Caucasia.',
    ecoTip: 'Cultivar tus propias plantas y huertas purifica el aire de la institución.',
    suitableSpecies: ['cat'],
  },
  {
    id: 'food_gourmet_treat',
    name: 'Bocaditos de Fruta y Avena',
    icon: 'food_gourmet_treat',
    price: 45,
    hungerBoost: 40,
    moodBoost: 50,
    energyBoost: 40,
    xpGained: 35,
    description: 'Snacks horneados con avena e ingredientes de agricultores locales de Antioquia.',
    ecoTip: 'Consumir productos locales reduce la huella de carbono del transporte de alimentos.',
    suitableSpecies: ['cat'],
  },

  // DOG MENU
  {
    id: 'food_dog_crunch_bone',
    name: 'Huesos de Avena y Calabaza',
    icon: 'food_dog_crunch_bone',
    price: 15,
    hungerBoost: 35,
    moodBoost: 15,
    energyBoost: 15,
    xpGained: 15,
    description: 'Galletas horneadas con puré de calabaza de la huerta y avena integral sin conservantes.',
    ecoTip: 'Los premios caseros y orgánicos eliminan empaques plásticos innecesarios.',
    suitableSpecies: ['dog'],
  },
  {
    id: 'food_dog_veggie_stew',
    name: 'Guiso de Huerta y Arroz',
    icon: 'food_dog_veggie_stew',
    price: 35,
    hungerBoost: 60,
    moodBoost: 25,
    energyBoost: 35,
    xpGained: 30,
    description: 'Receta casera y nutritiva a base de zanahorias, guisantes y arroz integral local.',
    ecoTip: 'Aprovechar verduras frescas de temporada apoya la agricultura regenerativa.',
    suitableSpecies: ['dog'],
  },
  {
    id: 'food_dog_carrot_sticks',
    name: 'Palitos de Zanahoria Fresca',
    icon: 'food_dog_carrot_sticks',
    price: 20,
    hungerBoost: 20,
    moodBoost: 35,
    energyBoost: 25,
    xpGained: 20,
    description: 'Zanahorias enteras crujientes cosechadas directamente de la tierra fértil.',
    ecoTip: 'Un snack 100% natural sin procesar que cuida la higiene dental de tu perro.',
    suitableSpecies: ['dog'],
  },
  {
    id: 'food_dog_banana_bites',
    name: 'Premios de Banano y Chía',
    icon: 'food_dog_banana_bites',
    price: 45,
    hungerBoost: 45,
    moodBoost: 50,
    energyBoost: 45,
    xpGained: 35,
    description: 'Snacks energéticos elaborados con banano criollo de Caucasia y semillas de chía.',
    ecoTip: 'El banano local aprovecha frutas maduras reduciendo el desperdicio de alimentos.',
    suitableSpecies: ['dog'],
  },

  // RABBIT MENU
  {
    id: 'food_rabbit_timothy_hay',
    name: 'Heno Timothy y Trébol',
    icon: 'food_rabbit_timothy_hay',
    price: 15,
    hungerBoost: 30,
    moodBoost: 20,
    energyBoost: 20,
    xpGained: 15,
    description: 'Hierba de pastizal secada al sol natural con alto contenido de fibra digestiva.',
    ecoTip: 'El pastoreo regenerativo y heno natural protegen los suelos de la erosión.',
    suitableSpecies: ['rabbit'],
  },
  {
    id: 'food_rabbit_fresh_carrot',
    name: 'Zanahoria con Hojas Verdes',
    icon: 'food_rabbit_fresh_carrot',
    price: 30,
    hungerBoost: 50,
    moodBoost: 30,
    energyBoost: 30,
    xpGained: 25,
    description: 'Zanahoria tierna acompañada de sus hojas frescas nutritivas y sin pesticidas.',
    ecoTip: 'Aprovechar la verdura completa con sus hojas elimina residuos orgánicos en cocina.',
    suitableSpecies: ['rabbit'],
  },
  {
    id: 'food_rabbit_mint_salad',
    name: 'Ensalada de Menta y Huerta',
    icon: 'food_rabbit_mint_salad',
    price: 25,
    hungerBoost: 35,
    moodBoost: 45,
    energyBoost: 25,
    xpGained: 25,
    description: 'Hojas frescas de menta aromática, albahaca y lechuga romana recién cortadas.',
    ecoTip: 'Las plantas aromáticas en la huerta escolar atraen abejas polinizadoras.',
    suitableSpecies: ['rabbit'],
  },
  {
    id: 'food_rabbit_dried_berries',
    name: 'Manzana y Frutos Deshidratados',
    icon: 'food_rabbit_dried_berries',
    price: 45,
    hungerBoost: 40,
    moodBoost: 55,
    energyBoost: 40,
    xpGained: 35,
    description: 'Láminas crujientes de manzana y fresas deshidratadas con energía solar limpia.',
    ecoTip: 'La deshidratación solar preserva frutas sin consumir gas ni electricidad fósil.',
    suitableSpecies: ['rabbit'],
  },

  // COMMON FOR ALL
  {
    id: 'food_spring_water',
    name: 'Agua Pura de Manantial',
    icon: 'food_spring_water',
    price: 10,
    hungerBoost: 10,
    moodBoost: 15,
    energyBoost: 35,
    xpGained: 10,
    description: 'Servida en un tazón de cerámica reutilizable y fresco.',
    ecoTip: 'Usar bebederos reutilizables evita consumir botellas plásticas de un solo uso.',
    suitableSpecies: ['cat', 'dog', 'rabbit'],
  }
];

export const STORE_ITEMS: StoreItem[] = [
  // HATS & HEADWEAR
  {
    id: 'hat_liceo_cap',
    name: 'Gorra Eco-Liceísta',
    price: 90,
    icon: 'hat_liceo_cap',
    rarity: 'rare',
    category: 'accessory',
    cosmeticSlot: 'hat',
    description: 'Gorra oficial de explorador ambiental del Liceo Caucasia con visera aerodinámica.',
    effectText: 'Orgullo y Estilo Liceísta (+10% XP en minijuegos)',
    unlockLevel: 1,
  },
  {
    id: 'hat_leaf_crown',
    name: 'Corona de Hojas de Laurel',
    price: 110,
    icon: 'hat_leaf_crown',
    rarity: 'rare',
    category: 'accessory',
    cosmeticSlot: 'hat',
    description: 'Corona tejida a mano que distingue al protector de los bosques del Liceo.',
    effectText: 'Distintivo de Guardián Ecológico (+15 Ánimo)',
    unlockLevel: 2,
  },
  {
    id: 'hat_sun_flower',
    name: 'Girasol Radiante',
    price: 75,
    icon: 'hat_sun_flower',
    rarity: 'common',
    category: 'accessory',
    cosmeticSlot: 'hat',
    description: 'Flor alegre y radiante que sigue la luz solar.',
    effectText: '+10 Carisma y brillo de la mascota',
    unlockLevel: 1,
  },
  {
    id: 'hat_cyber_headphones',
    name: 'Auriculares Bio-Acústicos',
    price: 160,
    icon: 'hat_cyber_headphones',
    rarity: 'epic',
    category: 'accessory',
    cosmeticSlot: 'hat',
    description: 'Auriculares futuristas con luces de frecuencia y ritmos del bosque.',
    effectText: '+20 Energía pasiva durante el descanso',
    unlockLevel: 3,
  },
  {
    id: 'hat_solar_crown',
    name: 'Corona del Sol Dorado',
    price: 250,
    icon: 'hat_solar_crown',
    rarity: 'legendary',
    category: 'accessory',
    cosmeticSlot: 'hat',
    description: 'Corona forjada con rayos solares y gemas de cristal sostenible.',
    effectText: '+30% Monedas y resplandor áureo',
    unlockLevel: 4,
  },

  // GLASSES & VISORS
  {
    id: 'glasses_cyber_visor',
    name: 'Visor Eco-Scan Holográfico',
    price: 140,
    icon: 'glasses_cyber_visor',
    rarity: 'epic',
    category: 'accessory',
    cosmeticSlot: 'glasses',
    description: 'Visor cian con análisis en tiempo real de tipos de residuos y reciclabilidad.',
    effectText: 'Escáner molecular de residuos',
    unlockLevel: 2,
  },
  {
    id: 'glasses_cool_shades',
    name: 'Gafas de Sol Sostenibles',
    price: 85,
    icon: 'glasses_cool_shades',
    rarity: 'common',
    category: 'accessory',
    cosmeticSlot: 'glasses',
    description: 'Gafas oscuras fabricadas con plástico 100% reciclado del océano.',
    effectText: 'Estilo ecológico supremo',
    unlockLevel: 1,
  },

  // COLLARS, SCARVES & CAPES
  {
    id: 'acc_eco_scarf',
    name: 'Pañoleta Verde Liceo',
    price: 100,
    icon: 'acc_eco_scarf',
    rarity: 'rare',
    category: 'accessory',
    cosmeticSlot: 'accessory',
    description: 'Pañoleta con los colores institucionales verde y blanco del Liceo Caucasia.',
    effectText: 'Símbolo del club ambiental liceísta',
    unlockLevel: 1,
  },
  {
    id: 'acc_cauca_amulet',
    name: 'Amuleto del Río Cauca',
    price: 180,
    icon: 'acc_cauca_amulet',
    rarity: 'epic',
    category: 'accessory',
    cosmeticSlot: 'accessory',
    description: 'Gema cristalina que alberga una gota purificada de las aguas del Cauca.',
    effectText: '+25 Hidratación y frescura ambiental',
    unlockLevel: 3,
  },
  {
    id: 'acc_solar_cape',
    name: 'Capa Celestial del Sol',
    price: 300,
    icon: 'acc_solar_cape',
    rarity: 'legendary',
    category: 'accessory',
    cosmeticSlot: 'accessory',
    description: 'Manto dorado resplandeciente otorgado a los campeones del reciclaje.',
    effectText: '+50% Monedas en minijuegos',
    unlockLevel: 4,
  },

  // AURAS & EFFECTS
  {
    id: 'aura_spores',
    name: 'Aura de Esporas Místicas',
    price: 190,
    icon: 'aura_spores',
    rarity: 'epic',
    category: 'accessory',
    cosmeticSlot: 'aura',
    description: 'Partículas bioluminiscentes verdes y doradas flotando alrededor de tu gato.',
    effectText: 'Aura mágica de la selva',
    unlockLevel: 3,
  },
  {
    id: 'aura_cyber_glitch',
    name: 'Aura Circuito Cuántico',
    price: 260,
    icon: 'aura_cyber_glitch',
    rarity: 'legendary',
    category: 'accessory',
    cosmeticSlot: 'aura',
    description: 'Haces de datos cian y destellos holográficos futuristas.',
    effectText: 'Vórtice digital de alta tecnología',
    unlockLevel: 4,
  },

  // CAT SKINS
  {
    id: 'skin_emerald_forest',
    name: 'Pelaje Selva Esmeralda',
    price: 220,
    icon: 'skin_emerald_forest',
    rarity: 'epic',
    category: 'accessory',
    cosmeticSlot: 'skin',
    description: 'Manto verde bosque profundo con marcas doradas y ojos esmeralda.',
    effectText: 'Transformación felina guardiana',
    unlockLevel: 3,
  },
  {
    id: 'skin_golden_sun',
    name: 'Pelaje Felino Solar',
    price: 320,
    icon: 'skin_golden_sun',
    rarity: 'legendary',
    category: 'accessory',
    cosmeticSlot: 'skin',
    description: 'Manto dorado brillante con runas de fuego limpio y ojos ámbar radiante.',
    effectText: 'Resplandor solar divino',
    unlockLevel: 4,
  },
  {
    id: 'skin_river_blue',
    name: 'Pelaje Espíritu Fluvial',
    price: 220,
    icon: 'skin_river_blue',
    rarity: 'epic',
    category: 'accessory',
    cosmeticSlot: 'skin',
    description: 'Manto azul marino y turquesa con ondulaciones de río.',
    effectText: 'Fluidez y serenidad hídrica',
    unlockLevel: 3,
  },
  {
    id: 'skin_snow_frost',
    name: 'Pelaje Lince de Escarcha',
    price: 280,
    icon: 'skin_snow_frost',
    rarity: 'legendary',
    category: 'accessory',
    cosmeticSlot: 'skin',
    description: 'Manto blanco ártico perlado con sutiles toques violetas y ojos de cristal.',
    effectText: 'Pureza glacial eco-sostenible',
    unlockLevel: 4,
  },

  // PLANTS & DECOR
  {
    id: 'item_plant_guayacan',
    name: 'Mini Guayacán en Flor',
    price: 80,
    icon: 'item_plant_guayacan',
    rarity: 'rare',
    category: 'plant',
    description: 'Árbol insignia de la región que decora el jardín del gato y atrae polinizadores.',
    effectText: '+15 Ánimo diario para tu gato',
    unlockLevel: 1,
  },
  {
    id: 'item_solar_fountain',
    name: 'Fuente Solar de Aves',
    price: 150,
    icon: 'item_solar_fountain',
    rarity: 'epic',
    category: 'decor',
    description: 'Bebedero y fuente impulsada por energía solar limpia.',
    effectText: '+20 Energía ambiental',
    unlockLevel: 2,
  },
  {
    id: 'item_wood_composter',
    name: 'Compostera Ecológica',
    price: 120,
    icon: 'item_wood_composter',
    rarity: 'rare',
    category: 'decor',
    description: 'Compostera de madera para transformar residuos orgánicos en abono fértil.',
    effectText: '+25% de XP al clasificar orgánicos',
    unlockLevel: 2,
  },
  {
    id: 'item_solar_lanterns',
    name: 'Faroles Solares Nocturnos',
    price: 90,
    icon: 'item_solar_lanterns',
    rarity: 'common',
    category: 'decor',
    description: 'Iluminación cálida y 100% libre de cables para el patio de la mascota.',
    effectText: 'Ilumina el jardín con energía limpia',
    unlockLevel: 1,
  },
  {
    id: 'item_eco_bed',
    name: 'Cama de Algodón Orgánico',
    price: 180,
    icon: 'item_eco_bed',
    rarity: 'epic',
    category: 'habitat',
    description: 'Cama suave fabricada con fibras recicladas y algodón natural.',
    effectText: '+30 Recuperación de energía al descansar',
    unlockLevel: 3,
  }
];

export const INITIAL_ACHIEVEMENTS: EducationalAchievement[] = [
  {
    id: 'ach_first_game',
    title: 'Primeros Pasos Ecológicos',
    description: 'Completa tu primer minijuego ambiental.',
    icon: 'ach_first_game',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    rewardCoins: 30,
    rewardXp: 50
  },
  {
    id: 'ach_sort_10',
    title: 'Clasificador Novato',
    description: 'Clasifica 10 residuos en los contenedores correctos.',
    icon: 'ach_sort_10',
    unlocked: false,
    progress: 0,
    maxProgress: 10,
    rewardCoins: 40,
    rewardXp: 80
  },
  {
    id: 'ach_sort_50',
    title: 'Defensor del Río Cauca',
    description: 'Clasifica 50 residuos correctamente.',
    icon: 'ach_sort_50',
    unlocked: false,
    progress: 0,
    maxProgress: 50,
    rewardCoins: 100,
    rewardXp: 200
  },
  {
    id: 'ach_sort_100',
    title: 'Maestro del Reciclaje',
    description: 'Clasifica 100 residuos correctamente.',
    icon: 'ach_sort_100',
    unlocked: false,
    progress: 0,
    maxProgress: 100,
    rewardCoins: 250,
    rewardXp: 500
  },
  {
    id: 'ach_park_clean',
    title: 'Parque Radiante',
    description: 'Limpia por completo un nivel del Parque Ecológico.',
    icon: 'ach_park_clean',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    rewardCoins: 80,
    rewardXp: 150
  },
  {
    id: 'ach_combo_master',
    title: 'Fiebre de Reciclaje',
    description: 'Alcanza un combo de x5 en Clasifica Rápido o Eco-Tetris.',
    icon: 'ach_combo_master',
    unlocked: false,
    progress: 0,
    maxProgress: 5,
    rewardCoins: 60,
    rewardXp: 120
  }
];

export const ENVIRONMENTAL_TITLES: { minLevel: number; title: string; color: string; badge: string }[] = [
  { minLevel: 1, title: 'Novato Ecológico', color: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30', badge: 'LV.1' },
  { minLevel: 2, title: 'Vigía Verde', color: 'text-teal-400 bg-teal-950/60 border-teal-500/30', badge: 'LV.2' },
  { minLevel: 3, title: 'Guardián del Río Cauca', color: 'text-sky-400 bg-sky-950/60 border-sky-500/30', badge: 'LV.3' },
  { minLevel: 4, title: 'Defensor de los Bosques', color: 'text-green-400 bg-green-950/60 border-green-500/30', badge: 'LV.4' },
  { minLevel: 5, title: 'Héroe Liceista', color: 'text-amber-400 bg-amber-950/60 border-amber-500/30', badge: 'LV.5' },
  { minLevel: 6, title: 'Maestro Eco-Sostenible', color: 'text-violet-400 bg-violet-950/60 border-violet-500/30', badge: 'LV.6' }
];

export const LEVEL_UNLOCKS: { level: number; unlockName: string; unlockIcon: string; unlockDescription: string }[] = [
  { level: 2, unlockName: 'Corona de Hojas & Compostera', unlockIcon: 'hat_leaf_crown', unlockDescription: 'Desbloquea la Corona de Laurel y la Compostera Escolar en la Tienda.' },
  { level: 3, unlockName: 'Pañoleta Liceo & Cama Eco', unlockIcon: 'acc_eco_scarf', unlockDescription: 'Desbloquea la Pañoleta Institucional y la Cama de Fibras Orgánicas.' },
  { level: 4, unlockName: 'Capa Celestial del Sol', unlockIcon: 'acc_solar_cape', unlockDescription: 'Desbloquea la Capa Solar (+50% monedas en minijuegos).' },
  { level: 5, unlockName: 'Hábitat Bioluminiscente', unlockIcon: 'item_solar_fountain', unlockDescription: 'Desbloquea el título Héroe Liceista y decoraciones de alta tecnología.' },
  { level: 6, unlockName: 'Maestro Eco-Sostenible', unlockIcon: 'ach_combo_master', unlockDescription: 'Rango máximo de Guardián de la Cuenca del Río Cauca.' }
];

export function getEnvironmentalTitle(level: number) {
  const titles = [...ENVIRONMENTAL_TITLES].reverse();
  const found = titles.find((t) => level >= t.minLevel);
  return found || ENVIRONMENTAL_TITLES[0];
}

export function getNextLevelUnlock(currentLevel: number) {
  const next = LEVEL_UNLOCKS.find((u) => u.level === currentLevel + 1);
  if (next) return next;
  return {
    level: currentLevel + 1,
    unlockName: 'Recompensas de Prestigio',
    unlockIcon: 'ach_first_game',
    unlockDescription: '+100 Monedas y bonificaciones ecológicas.'
  };
}

// -------------------------------------------------------------
// BILINGUAL LOCALIZATION HELPERS (ENGLISH BY DEFAULT / SPANISH)
// -------------------------------------------------------------

const WASTE_LOCALIZATION: Record<string, { nameEn: string; descEn: string; tipEn: string }> = {
  org_1: {
    nameEn: 'Banana Peel',
    descEn: 'Biodegradable organic waste rich in potassium.',
    tipEn: 'Organic waste transforms into nutrient-rich compost to fertilize our school garden.'
  },
  org_2: {
    nameEn: 'Apple Core & Scraps',
    descEn: 'Decomposing fruit core and natural peel.',
    tipEn: 'Composting fruit scraps reduces methane emissions in landfills.'
  },
  org_3: {
    nameEn: 'Dry Garden Leaves',
    descEn: 'Natural plant matter from trees and shrubs.',
    tipEn: 'Dry brown leaves supply crucial carbon to balance school compost.'
  },
  org_4: {
    nameEn: 'Eggshells',
    descEn: 'Organic kitchen waste rich in calcium carbonate.',
    tipEn: 'Eggshells provide valuable calcium to strengthen plant root systems.'
  },
  org_5: {
    nameEn: 'Coffee Grounds',
    descEn: 'Ground coffee residue after brewing.',
    tipEn: 'Coffee grounds enrich soil nitrogen and naturally deter pests.'
  },
  org_6: {
    nameEn: 'Orange Peels',
    descEn: 'Citrus peel rich in organic matter.',
    tipEn: 'Citrus peels decompose quickly and add organic nutrients to the soil.'
  },
  rec_1: {
    nameEn: 'PET Plastic Bottle',
    descEn: 'Clear, clean plastic beverage bottle.',
    tipEn: 'Clean and dry plastic bottles can be transformed into new textile fibers and containers.'
  },
  rec_2: {
    nameEn: 'Clean Cardboard Box',
    descEn: 'Flattened dry cardboard free of grease.',
    tipEn: 'Recycling 1 ton of cardboard saves up to 17 trees and thousands of liters of water.'
  },
  rec_3: {
    nameEn: 'Aluminum Can',
    descEn: 'Rinsed aluminum soda or juice can.',
    tipEn: 'Aluminum is infinitely 100% recyclable, saving 95% of the energy needed for new metal.'
  },
  rec_4: {
    nameEn: 'Notebook & Paper Sheets',
    descEn: 'Dry school notebook pages without plastic laminate.',
    tipEn: 'Clean school paper can be recycled into new eco-friendly stationery and notebooks.'
  },
  rec_5: {
    nameEn: 'Clean Glass Jar',
    descEn: 'Rinsed glass container free of metal lids.',
    tipEn: 'Recycled glass never loses quality or purity and can be melted endlessly.'
  },
  rec_6: {
    nameEn: 'Tetra Pak Carton',
    descEn: 'Rinsed and flattened milk or juice carton.',
    tipEn: 'Recycling Tetra Pak cartons recovers cellulose fiber and poly-aluminum for building materials.'
  },
  non_1: {
    nameEn: 'Greasy Used Napkin',
    descEn: 'Paper napkin stained with oil or food grease.',
    tipEn: 'Greasy napkins cannot be recycled because oils contaminate the paper pulp process.'
  },
  non_2: {
    nameEn: 'Metallized Snack Bag',
    descEn: 'Multi-layer chip or cookie wrapper.',
    tipEn: 'Laminated multi-layer plastic and foil wraps cannot be easily recycled and belong in black bins.'
  },
  non_3: {
    nameEn: 'Used Toilet Paper',
    descEn: 'Contaminated sanitary waste.',
    tipEn: 'For sanitary and biosecurity reasons, all bathroom waste strictly belongs in the black bin.'
  },
  non_4: {
    nameEn: 'Contaminated Styrofoam',
    descEn: 'Food container stained with sauces.',
    tipEn: 'Greasy styrofoam is non-recyclable in standard municipal streams and goes to non-usable bins.'
  },
  non_5: {
    nameEn: 'Broken Ceramic Mug',
    descEn: 'Fragmented ceramic or stoneware crockery.',
    tipEn: 'Ceramics have a much higher melting point than container glass and cannot enter glass recycling.'
  },
  non_6: {
    nameEn: 'Cigarette Butt',
    descEn: 'Used toxic filter with nicotine residues.',
    tipEn: 'A single discarded cigarette butt can contaminate up to 50 liters of fresh water.'
  }
};

const FOOD_LOCALIZATION: Record<string, { nameEn: string; descEn: string; effectEn: string }> = {
  // CAT
  food_cat_kibble: {
    nameEn: 'Eco Kibbles',
    descEn: 'Organic biodegradable pet biscuits formulated with sustainable grains.',
    effectEn: '+30 Satiety, +10 Mood, +15 Energy'
  },
  food_salmon_sustainable: {
    nameEn: 'Sustainable River Fish',
    descEn: 'Locally and responsibly caught freshwater fish protecting the Cauca River basin.',
    effectEn: '+55 Satiety, +25 Mood, +30 Energy (+30 XP)'
  },
  food_cat_grass: {
    nameEn: 'Organic Cat Grass',
    descEn: 'Fresh wheatgrass shoots harvested from the Liceo Caucasia greenhouse.',
    effectEn: '+40 Mood, +15 Satiety, +20 Energy'
  },
  food_gourmet_treat: {
    nameEn: 'Fruit & Oat Treats',
    descEn: 'Handcrafted baked snacks made with local Antioquian rolled oats and fruits.',
    effectEn: '+40 Satiety, +50 Mood, +40 Energy (+35 XP)'
  },

  // DOG
  food_dog_crunch_bone: {
    nameEn: 'Eco Oat & Pumpkin Bones',
    descEn: 'Oven-baked crunchy dog biscuits with garden pumpkin puree and rolled oats.',
    effectEn: '+35 Satiety, +15 Mood, +15 Energy (+15 XP)'
  },
  food_dog_veggie_stew: {
    nameEn: 'Garden Veggie & Rice Stew',
    descEn: 'Slow-cooked wholesome stew with fresh garden carrots, peas, and brown rice.',
    effectEn: '+60 Satiety, +25 Mood, +35 Energy (+30 XP)'
  },
  food_dog_carrot_sticks: {
    nameEn: 'Crisp Organic Carrot Sticks',
    descEn: 'Crunchy raw farm carrots, high in beta-carotene for clean canine dental health.',
    effectEn: '+20 Satiety, +35 Mood, +25 Energy (+20 XP)'
  },
  food_dog_banana_bites: {
    nameEn: 'Banana & Chia Eco Biscuits',
    descEn: 'Energy-packed treats made with ripe Caucasia bananas and nutritious chia seeds.',
    effectEn: '+45 Satiety, +50 Mood, +45 Energy (+35 XP)'
  },

  // RABBIT
  food_rabbit_timothy_hay: {
    nameEn: 'Timothy Hay & Clover',
    descEn: 'High-fiber natural pasture grass sun-dried to perfection for digestive wellness.',
    effectEn: '+30 Satiety, +20 Mood, +20 Energy (+15 XP)'
  },
  food_rabbit_fresh_carrot: {
    nameEn: 'Whole Farm Carrot with Greens',
    descEn: 'Tender pesticide-free carrot complete with vitamin-rich sweet leafy tops.',
    effectEn: '+50 Satiety, +30 Mood, +30 Energy (+25 XP)'
  },
  food_rabbit_mint_salad: {
    nameEn: 'Fresh Mint & Garden Greens',
    descEn: 'Crisp hand-picked aromatic mint, basil, and romaine lettuce from school rainwater beds.',
    effectEn: '+35 Satiety, +45 Mood, +25 Energy (+25 XP)'
  },
  food_rabbit_dried_berries: {
    nameEn: 'Solar-Dried Apple & Berries',
    descEn: 'Sun-dehydrated crisp apple slices and forest berries with zero added sugars.',
    effectEn: '+40 Satiety, +55 Mood, +40 Energy (+35 XP)'
  },

  // COMMON
  food_spring_water: {
    nameEn: 'Pure Spring Water',
    descEn: 'Refreshing mountain spring water served in a clean reusable ceramic bowl.',
    effectEn: '+10 Satiety, +15 Mood, +35 Energy (+10 XP)'
  }
};

const STORE_LOCALIZATION: Record<string, { nameEn: string; descEn: string; effectEn: string }> = {
  hat_liceo_cap: {
    nameEn: 'Liceo Eco Explorer Cap',
    descEn: 'Official green cap representing environmental guardians of Liceo Caucasia.',
    effectEn: 'School pride and eco leadership'
  },
  hat_leaf_crown: {
    nameEn: 'Laurel Leaf Crown',
    descEn: 'Woven golden-green garland celebrating botanical conservation.',
    effectEn: '+10% XP bonus in all minigames'
  },
  hat_cyber_visor: {
    nameEn: 'AERIS Holographic Visor',
    descEn: 'High-tech eco-analysis visor that scans waste composition instantly.',
    effectEn: '+15% score in Fast Sort'
  },
  glasses_sunglasses: {
    nameEn: 'Eco Polarized Shades',
    descEn: 'Sunglasses made from 100% recycled ocean plastic frames.',
    effectEn: 'Cool style and solar eye protection'
  },
  glasses_nerd: {
    nameEn: 'Eco Scholar Glasses',
    descEn: 'Smart lenses made from recycled polycarbonate for sharp focus.',
    effectEn: '+10% bonus coins when classifying'
  },
  acc_eco_scarf: {
    nameEn: 'Liceo Green Scarf',
    descEn: 'Embroidered silk scarf in official school colors.',
    effectEn: 'Distinguished student badge'
  },
  acc_solar_cape: {
    nameEn: 'Celestial Solar Cape',
    descEn: 'Luminescent cape woven with flexible photovoltaic fibers.',
    effectEn: '+50% coins earned in all games'
  },
  aura_leaves: {
    nameEn: 'Swirling Nature Leaves Aura',
    descEn: 'Magical breeze of fluttering emerald leaves surrounding your pet.',
    effectEn: 'Perpetual botanical radiance'
  },
  aura_sparkles: {
    nameEn: 'Eco Stardust Aura',
    descEn: 'Luminescent golden particles reflecting clean environmental harmony.',
    effectEn: 'Legendary aura of distinction'
  },
  skin_mystic_night: {
    nameEn: 'Mystic Cyber Panther',
    descEn: 'Deep obsidian coat with luminescent cyan bioluminescent runes.',
    effectEn: 'AERIS stealth cyber feline'
  },
  skin_emerald_forest: {
    nameEn: 'Emerald Forest Guardian',
    descEn: 'Lush botanical coat patterned with Caucasia rainforest flora.',
    effectEn: 'Rainforest synergy and vigor'
  },
  skin_golden_sun: {
    nameEn: 'Radiant Sun Feline',
    descEn: 'Gleaming golden coat radiating pure solar warmth.',
    effectEn: 'Unstoppable solar glow'
  },
  skin_river_blue: {
    nameEn: 'Cauca River Spirit',
    descEn: 'Aquatic marine-blue coat with gentle river water ripples.',
    effectEn: 'Hydric tranquility and flow'
  },
  skin_snow_frost: {
    nameEn: 'Eco Frost Lynx',
    descEn: 'Pristine arctic-white coat with crystal eyes and lavender accents.',
    effectEn: 'Glacial eco-sustainable purity'
  },
  item_plant_guayacan: {
    nameEn: 'Flowering Guayacan Tree',
    descEn: 'Native regional tree that blooms vibrant flowers and feeds pollinators.',
    effectEn: '+15 daily pet mood'
  },
  item_solar_fountain: {
    nameEn: 'Solar Bird Fountain',
    descEn: 'Recirculating fresh water birdbath powered entirely by clean sunlight.',
    effectEn: '+20 environmental energy'
  },
  item_wood_composter: {
    nameEn: 'School Composter Box',
    descEn: 'Natural cedar compost bin that converts school food waste into rich soil.',
    effectEn: '+25% XP when sorting organic waste'
  },
  item_solar_lanterns: {
    nameEn: 'Solar Night Lanterns',
    descEn: 'Warm wireless outdoor lanterns charged by daytime solar radiation.',
    effectEn: 'Clean night illumination'
  },
  item_eco_bed: {
    nameEn: 'Organic Cotton Eco Bed',
    descEn: 'Ultra-soft plush cushion handcrafted from recycled textiles and natural cotton.',
    effectEn: '+30 Energy recovery while resting'
  }
};

const ACHIEVEMENT_LOCALIZATION: Record<string, { titleEn: string; descEn: string }> = {
  ach_first_game: {
    titleEn: 'First Eco Steps',
    descEn: 'Play and complete your very first environmental minigame.'
  },
  ach_sort_10: {
    titleEn: 'Novice Sorter',
    descEn: 'Correctly classify 10 waste items into the right bins.'
  },
  ach_sort_50: {
    titleEn: 'Cauca River Defender',
    descEn: 'Correctly classify 50 waste items across games.'
  },
  ach_sort_100: {
    titleEn: 'Master of Recycling',
    descEn: 'Achieve 100 correctly classified waste items.'
  },
  ach_park_clean: {
    titleEn: 'Spotless Park',
    descEn: 'Completely clean and restore a sector in the Park Cleanup game.'
  },
  ach_combo_master: {
    titleEn: 'Recycling Fever',
    descEn: 'Achieve a x5 streak combo in Fast Sort or Eco-Tetris.'
  }
};

export function getLocalizedWasteItem(item: WasteItem, lang: string = 'en'): WasteItem {
  if (lang === 'es') return item;
  const loc = WASTE_LOCALIZATION[item.id];
  if (!loc) return item;
  return {
    ...item,
    name: loc.nameEn || item.name,
    description: loc.descEn || item.description,
    educationalTip: loc.tipEn || item.educationalTip,
  };
}

export function getLocalizedFood(food: EcoFood, lang: string = 'en'): EcoFood {
  if (lang === 'es') return food;
  const loc = FOOD_LOCALIZATION[food.id];
  if (!loc) return food;
  return {
    ...food,
    name: loc.nameEn || food.name,
    description: loc.descEn || food.description,
    ecoTip: loc.effectEn || food.ecoTip,
  };
}

export function getLocalizedStoreItem(item: StoreItem, lang: string = 'en'): StoreItem {
  if (lang === 'es') return item;
  const loc = STORE_LOCALIZATION[item.id];
  if (!loc) return item;
  return {
    ...item,
    name: loc.nameEn || item.name,
    description: loc.descEn || item.description,
    effectText: loc.effectEn || item.effectText,
  };
}

export function getLocalizedAchievement(ach: EducationalAchievement, lang: string = 'en'): EducationalAchievement {
  if (lang === 'es') return ach;
  const loc = ACHIEVEMENT_LOCALIZATION[ach.id];
  if (!loc) return ach;
  return {
    ...ach,
    title: loc.titleEn || ach.title,
    description: loc.descEn || ach.description,
  };
}

export function getLocalizedLevelUnlock(unlock: typeof LEVEL_UNLOCKS[0], lang: string = 'en') {
  if (lang === 'es') return unlock;
  const map: Record<number, { name: string; desc: string }> = {
    2: { name: 'Leaf Crown & School Composter', desc: 'Unlocks the Laurel Crown and School Composter in the Eco Store.' },
    3: { name: 'Liceo Scarf & Eco Bed', desc: 'Unlocks the Official School Scarf and Organic Fiber Bed.' },
    4: { name: 'Celestial Solar Cape', desc: 'Unlocks the Photovoltaic Solar Cape (+50% coins in minigames).' },
    5: { name: 'Bioluminescent Habitat', desc: 'Unlocks the School Eco Hero rank and high-tech bio decorations.' },
    6: { name: 'Eco-Sustainable Master', desc: 'Highest guardian honor protecting the Cauca River Basin.' },
  };
  const loc = map[unlock.level];
  if (!loc) return unlock;
  return {
    ...unlock,
    unlockName: loc.name,
    unlockDescription: loc.desc,
  };
}

// SPECIES HELPERS & DATA
export interface SpeciesProfile {
  id: 'cat' | 'dog' | 'rabbit';
  name: string;
  defaultPetName: string;
  icon: string;
  avatarEmoji: string;
  tagline: string;
  personality: string;
  dietPreference: string;
  greetingEs: string;
  greetingEn: string;
}

export const SPECIES_CATALOG: SpeciesProfile[] = [
  {
    id: 'cat',
    name: 'Gato Místico / Mystic Cat',
    defaultPetName: 'Aeris',
    icon: 'cat',
    avatarEmoji: '🐱',
    tagline: 'Guardián nocturno del Río Cauca',
    personality: 'Sabio, curioso, empático y observador',
    dietPreference: 'Pescado fluvial sostenible, hierba gatera y bocaditos orgánicos',
    greetingEs: '¡Miau! Soy tu fiel compañero y guardián de la cuenca del Río Cauca. 🐾✨',
    greetingEn: 'Meow! I am your loyal companion and guardian of the Cauca River basin. 🐾✨'
  },
  {
    id: 'dog',
    name: 'Perro Explorador / Eco Scout Dog',
    defaultPetName: 'Bruno',
    icon: 'dog',
    avatarEmoji: '🐶',
    tagline: 'Explorador dinámico y recolector eco',
    personality: 'Leal, ultra-enérgico, alegre y protector',
    dietPreference: 'Guisos de huerta, huesos horneados de calabaza y palitos de zanahoria',
    greetingEs: '¡Guau guau! ¡Muevo mi colita de felicidad por verte! ¿Salimos a limpiar el parque o clasificar residuos? 🐶⚡',
    greetingEn: 'Woof woof! Wagging my tail with joy to see you! Ready to clean up the park or sort recyclables? 🐶⚡'
  },
  {
    id: 'rabbit',
    name: 'Conejo Botánico / Garden Rabbit',
    defaultPetName: 'Copito',
    icon: 'rabbit',
    avatarEmoji: '🐰',
    tagline: 'Experto en huertas y compostaje',
    personality: 'Dulce, atento, sereno y amante de las plantas',
    dietPreference: 'Heno timothy, zanahorias frescas de huerta y ensaladas de menta',
    greetingEs: '¡Sniff sniff! Con mis orejitas atentas estoy listo para escucharte y cuidar la huerta escolar. 🐰🌱',
    greetingEn: 'Sniff sniff! With attentive long ears, I am ready to listen and tend to the school organic garden. 🐰🌱'
  }
];

export function getFoodsForSpecies(species: 'cat' | 'dog' | 'rabbit' = 'cat', lang: string = 'en'): EcoFood[] {
  const matching = ECO_FOODS.filter((food) => {
    if (!food.suitableSpecies || food.suitableSpecies.length === 0) return true;
    return food.suitableSpecies.includes(species);
  });
  return matching.map((f) => getLocalizedFood(f, lang));
}

export function getSpeciesInfo(species: 'cat' | 'dog' | 'rabbit' = 'cat') {
  return SPECIES_CATALOG.find((s) => s.id === species) || SPECIES_CATALOG[0];
}


