import { Language } from '../types';

export type { Language };

export interface Translations {
  // Common & Navigation
  home: string;
  games: string;
  store: string;
  inventory: string;
  wardrobe: string;
  profile: string;
  settings: string;
  level: string;
  coins: string;
  points: string;
  days: string;
  day: string;
  streak: string;
  back: string;
  exit: string;
  cancel: string;
  save: string;
  confirm: string;
  claim: string;
  claimed: string;
  claimReward: string;
  claimRewards: string;
  completed: string;
  correct: string;
  wrong: string;
  combo: string;
  free: string;
  equipped: string;
  equip: string;
  buy: string;
  locked: string;
  unlockAtLevel: string;
  all: string;
  plants: string;
  decor: string;
  accessories: string;
  habitats: string;
  close: string;
  score: string;
  wasteSorted: string;
  gameOver: string;
  continue: string;
  left: string;
  right: string;
  dropFast: string;
  correctBin: string;
  
  // Waste Categories
  organic: string;
  organicDesc: string;
  recyclable: string;
  recyclableDesc: string;
  nonUsable: string;
  nonUsableDesc: string;
  greenBin: string;
  whiteBin: string;
  blackBin: string;

  // Splash & Onboarding
  gameTitle: string;
  gameSubtitle: string;
  editionSubtitle: string;
  playNow: string;
  welcomeAgent: string;
  enterNamePrompt: string;
  playerNameLabel: string;
  playerNamePlaceholder: string;
  ecoMissionTitle: string;
  ecoMissionDesc: string;
  startAdventure: string;
  aerisDivisionTag: string;

  // Home / Sanctuary
  sanctuaryTitle: string;
  feed: string;
  clean: string;
  rest: string;
  feedPet: string;
  cleanPet: string;
  sleepPet: string;
  sustainableFoods: string;
  hunger: string;
  mood: string;
  energy: string;
  hygiene: string;
  petCleanMsg: string;
  petFeedMsg: string;
  petRestMsg: string;
  quickBinInfoTitle: string;
  gotIt: string;

  // Minigames Hub
  gamesHubTitle: string;
  gamesHubSubtitle: string;
  totalWasteSorted: string;
  playGame: string;
  bestScore: string;

  // Game 1: Tetris
  tetrisTitle: string;
  tetrisTag: string;
  tetrisDesc: string;
  tetrisHowTo: string;
  tetrisLeft: string;
  tetrisRight: string;
  tetrisDrop: string;
  gameFinished: string;
  classified: string;
  maxCombo: string;

  // Game 2: Fast Sort
  fastSortTitle: string;
  fastSortTag: string;
  fastSortDesc: string;
  fastSortHowTo: string;
  round: string;
  timeLeft: string;
  whyThisBin: string;
  nextItem: string;

  // Game 3: Park Cleanup
  parkCleanupTitle: string;
  parkCleanupTag: string;
  parkCleanupDesc: string;
  parkCleanupHowTo: string;
  parkLevel: string;
  parkCleanliness: string;
  selectTrashPrompt: string;
  sortIntoBin: string;
  nextLevel: string;
  congratsParkClean: string;

  // Store
  storeTitle: string;
  storeSubtitle: string;
  notEnoughCoins: string;
  itemPurchased: string;
  itemEquipped: string;

  // Profile
  profileTitle: string;
  ecoTitle: string;
  wasteBreakdown: string;
  totalSorted: string;
  positiveImpact: string;
  gameStats: string;
  gamesPlayed: string;
  timePlayed: string;
  minutes: string;
  highScores: string;
  achievementsTitle: string;
  growthJournalTab: string;
  agentSummaryTab: string;
  growthJournalTitle: string;
  growthJournalSubtitle: string;
  adoptionCertificateTitle: string;
  adoptionDateLabel: string;
  timeTogetherLabel: string;
  daysTogether: string;
  officialGuardianLabel: string;
  schoolCampusLabel: string;
  petSpeciesLabel: string;
  registryCodeLabel: string;
  affectionBondLabel: string;
  growthStagesTitle: string;
  milestonesTitle: string;
  milestonesReachedLabel: string;
  allMilestonesFilter: string;
  completedFilter: string;
  inProgressFilter: string;
  growthNotesTitle: string;

  // Onboarding Guided Tours
  tourNext: string;
  tourPrev: string;
  tourSkip: string;
  tourFinishGames: string;
  tourFinishStore: string;
  tourStepIndicator: string;
  tourHelpBtnGames: string;
  tourHelpBtnStore: string;
  gamesTourBadge: string;
  gamesTourStep1Title: string;
  gamesTourStep1Desc: string;
  gamesTourStep2Title: string;
  gamesTourStep2Desc: string;
  gamesTourStep3Title: string;
  gamesTourStep3Desc: string;
  storeTourBadge: string;
  storeTourStep1Title: string;
  storeTourStep1Desc: string;
  storeTourStep2Title: string;
  storeTourStep2Desc: string;
  storeTourStep3Title: string;
  storeTourStep3Desc: string;

  // Settings
  settingsTitle: string;
  settingsSubtitle: string;
  appearanceTitle: string;
  appearanceSubtitle: string;
  themePresetLabel: string;
  themePresetDesc: string;
  accentColorLabel: string;
  accentColorDesc: string;
  followSystemLabel: string;
  followSystemDesc: string;
  activeThemeBadge: string;
  livePreview: string;
  resetAppearance: string;
  languageLabel: string;
  languageDesc: string;
  english: string;
  spanish: string;
  systemOptions: string;
  soundEffects: string;
  soundEffectsDesc: string;
  highPerformance: string;
  highPerformanceDesc: string;
  educationalTips: string;
  educationalTipsDesc: string;
  playerProfile: string;
  aboutProject: string;
  aboutProjectDesc: string;
  dangerZone: string;
  dangerZoneDesc: string;
  resetProgress: string;
  resetConfirmTitle: string;
  resetConfirmDesc: string;
  yesReset: string;

  // Daily Reward
  dailyReward: string;
  dailyRewardTitle: string;
  dailyRewardSubtitle: string;
  comeBackTomorrow: string;
  claimDay: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    home: 'HOME',
    games: 'GAMES',
    store: 'STORE',
    inventory: 'INVENTORY',
    wardrobe: 'WARDROBE',
    profile: 'PROFILE',
    settings: 'SETTINGS',
    level: 'Level',
    coins: 'Coins',
    points: 'PTS',
    days: 'days',
    day: 'Day',
    streak: 'Streak',
    back: 'Back',
    exit: 'Exit',
    cancel: 'Cancel',
    save: 'Save',
    confirm: 'Confirm',
    claim: 'Claim',
    claimed: 'Claimed',
    claimReward: 'Claim Reward',
    claimRewards: 'Claim Rewards',
    completed: 'Completed',
    correct: 'Correct!',
    wrong: 'Wrong Bin!',
    combo: 'COMBO',
    free: 'Free',
    equipped: 'Equipped',
    equip: 'Equip',
    buy: 'Buy',
    locked: 'Locked',
    unlockAtLevel: 'Unlocks at Level',
    all: 'All',
    plants: 'Plants',
    decor: 'Decor',
    accessories: 'Accessories',
    habitats: 'Habitats',
    close: 'Close',
    score: 'Score',
    wasteSorted: 'Waste Sorted',
    gameOver: 'Game Over!',
    continue: 'Continue',
    left: 'Left',
    right: 'Right',
    dropFast: 'Drop Fast',
    correctBin: 'Correct Bin',

    organic: 'Organic',
    organicDesc: 'Food scraps, fruit peels, leaves and garden waste.',
    recyclable: 'Recyclables',
    recyclableDesc: 'Clean plastic bottles, paper, cardboard, glass and cans.',
    nonUsable: 'Non-Usable',
    nonUsableDesc: 'Used napkins, contaminated plastic, hygiene waste.',
    greenBin: 'Green Bin',
    whiteBin: 'White Bin',
    blackBin: 'Black Bin',

    gameTitle: 'ECO LICEISTA',
    gameSubtitle: 'Sort waste, complete eco-challenges and protect nature.',
    editionSubtitle: 'Sustainability & Waste Sorting Edition',
    playNow: 'PLAY NOW!',
    welcomeAgent: 'Welcome, Eco Agent!',
    enterNamePrompt: 'Enter your name to start your environmental journey and games.',
    playerNameLabel: 'Player Name',
    playerNamePlaceholder: 'e.g. Alex Green',
    ecoMissionTitle: 'Eco Mission:',
    ecoMissionDesc: 'Sort waste into Green (Organic), White (Recyclable), and Black (Non-Usable) bins and clean the Cauca River Park.',
    startAdventure: 'START PLAYING',
    aerisDivisionTag: 'AERIS DIVISION • LICEO CAUCASIA',

    sanctuaryTitle: 'Liceo Caucasia Sanctuary',
    feed: 'Feed',
    clean: 'Clean',
    rest: 'Rest',
    feedPet: 'Feed',
    cleanPet: 'Clean',
    sleepPet: 'Rest',
    sustainableFoods: 'Sustainable Foods',
    hunger: 'Hunger',
    mood: 'Mood',
    energy: 'Energy',
    hygiene: 'Cleanliness',
    petCleanMsg: 'is sparkling clean and fresh! 🫧',
    petFeedMsg: 'loved the healthy eco-snack! (+XP)',
    petRestMsg: 'is resting and recovering energy! 💤',
    quickBinInfoTitle: 'Recycling Guide',
    gotIt: 'Got It!',

    gamesHubTitle: 'Environmental Mini-Games',
    gamesHubSubtitle: 'Learn how to sort waste, earn coins 🪙 and gain XP to level up.',
    totalWasteSorted: 'Total Waste Sorted',
    playGame: 'PLAY',
    bestScore: 'Best Score',

    tetrisTitle: 'Waste Tetris',
    tetrisTag: 'Falling Puzzle & Reflexes',
    tetrisDesc: 'Move falling waste to the correct bin before it hits the bottom.',
    tetrisHowTo: 'Controls: Left/Right arrows or on-screen buttons to aim.',
    tetrisLeft: 'Left',
    tetrisRight: 'Right',
    tetrisDrop: 'Drop',
    gameFinished: 'Game Finished!',
    classified: 'Sorted',
    maxCombo: 'Max Combo',

    fastSortTitle: 'Fast Sort',
    fastSortTag: 'Speed & Accuracy',
    fastSortDesc: 'Quickly choose the right bin for each item before time runs out.',
    fastSortHowTo: 'Tap the matching color bin before the countdown ends.',
    round: 'Round',
    timeLeft: 'Time',
    whyThisBin: 'Why this bin?',
    nextItem: 'Next Item',

    parkCleanupTitle: 'Park Cleanup',
    parkCleanupTag: 'Interactive Scene Cleanup',
    parkCleanupDesc: 'Collect scattered litter in the park and sort each piece.',
    parkCleanupHowTo: 'Tap trash items on the grass and select the right bin.',
    parkLevel: 'Park Stage',
    parkCleanliness: 'Cleanliness',
    selectTrashPrompt: 'Tap trash items to pick them up',
    sortIntoBin: 'Sort into Bin',
    nextLevel: 'Next Stage',
    congratsParkClean: 'The park is completely clean and blooming!',

    storeTitle: 'Eco Store',
    storeSubtitle: 'Spend your eco-coins on accessories and habitat upgrades.',
    notEnoughCoins: 'Not enough coins!',
    itemPurchased: 'Item purchased successfully!',
    itemEquipped: 'Item equipped!',

    profileTitle: 'Eco Agent Profile',
    ecoTitle: 'Eco Guardian of Caucasia',
    wasteBreakdown: 'Waste Classification Breakdown',
    totalSorted: 'Total Sorted',
    positiveImpact: 'Positive Impact',
    gameStats: 'Game Statistics',
    gamesPlayed: 'Games Played',
    timePlayed: 'Time Played',
    minutes: 'min',
    highScores: 'High Scores',
    achievementsTitle: 'Achievements & Milestones',
    growthJournalTab: 'Growth Journal',
    agentSummaryTab: 'Agent Summary',
    growthJournalTitle: 'Pet Growth Journal',
    growthJournalSubtitle: 'Adoption history, evolution stages, and milestones achieved at Liceo Caucasia',
    adoptionCertificateTitle: 'Official Eco-Adoption Certificate',
    adoptionDateLabel: 'Adoption Date',
    timeTogetherLabel: 'Time Together',
    daysTogether: 'days together',
    officialGuardianLabel: 'Official Guardian',
    schoolCampusLabel: 'Campus',
    petSpeciesLabel: 'Companion Species',
    registryCodeLabel: 'Eco-Registry ID',
    affectionBondLabel: 'Affection Bond',
    growthStagesTitle: 'Growth & Evolution Stages',
    milestonesTitle: 'Milestones Achieved',
    milestonesReachedLabel: 'Milestones Completed',
    allMilestonesFilter: 'All Milestones',
    completedFilter: 'Completed',
    inProgressFilter: 'In Progress',
    growthNotesTitle: 'Field Memories & Notes',

    // Onboarding Guided Tours
    tourNext: 'Next',
    tourPrev: 'Back',
    tourSkip: 'Skip Tour',
    tourFinishGames: 'Start Playing & Earning!',
    tourFinishStore: 'Start Shopping!',
    tourStepIndicator: 'Step',
    tourHelpBtnGames: 'Earning Guide',
    tourHelpBtnStore: 'Shopping Guide',
    gamesTourBadge: 'GAMES TOUR • EARNING COINS',
    gamesTourStep1Title: 'Earn Eco-Coins & XP',
    gamesTourStep1Desc: 'Play mini-games to earn Eco-Coins and Level XP. Every item sorted and cleanup completed adds coins to your school savings!',
    gamesTourStep2Title: 'Challenge Your High Scores',
    gamesTourStep2Desc: 'Play Waste Tetris, Fast Sort, and Park Cleanup. Achieve higher scores to unlock bonus rewards and special achievements!',
    gamesTourStep3Title: 'Accurate Sorting Multiplier',
    gamesTourStep3Desc: 'Follow the official green (organic), white (recyclable), and black (non-usable) bins. Perfect streaks grant coin multipliers!',
    storeTourBadge: 'STORE TOUR • SPENDING COINS',
    storeTourStep1Title: 'Your Eco-Coins Balance',
    storeTourStep1Desc: 'Here you can see your current coin balance earned from playing games and caring for your pet. Save up to buy special upgrades!',
    storeTourStep2Title: 'Browse Categories & Catalog',
    storeTourStep2Desc: 'Explore nutritious organic pet food, garden plants, school uniform hats & glasses, and custom room habitats for your companion.',
    storeTourStep3Title: 'Buy & Equip Instantly',
    storeTourStep3Desc: 'Unlock items as your level rises. Click Buy when you have enough coins, then tap Equip to immediately customize your pet and room!',

    settingsTitle: 'Settings & Config',
    settingsSubtitle: 'Customize appearance, language, audio and game performance.',
    appearanceTitle: 'Appearance & Themes',
    appearanceSubtitle: 'Personalize themes, accents and visual atmosphere.',
    themePresetLabel: 'Theme Presets',
    themePresetDesc: 'Select a theme to instantly transform the entire interface.',
    accentColorLabel: 'Accent Color',
    accentColorDesc: 'Choose your primary highlight color with guaranteed contrast.',
    followSystemLabel: 'Follow System',
    followSystemDesc: 'Automatically adapt to your device light or dark mode.',
    activeThemeBadge: 'ACTIVE',
    livePreview: 'Live Preview',
    resetAppearance: 'Reset Theme',
    languageLabel: 'Game Language',
    languageDesc: 'Choose English (default) or Spanish.',
    english: 'English (Default)',
    spanish: 'Español (Spanish)',
    systemOptions: 'Preferences',
    soundEffects: 'Sound Effects (SFX)',
    soundEffectsDesc: 'Play audio cues and chime feedback.',
    highPerformance: 'High Performance Mode',
    highPerformanceDesc: 'Optimized for smooth gameplay on low-end laptops and mobile.',
    educationalTips: 'Eco Tips',
    educationalTipsDesc: 'Show waste sorting tips on mistakes.',
    playerProfile: 'Player Identity',
    aboutProject: 'About AERIS Division',
    aboutProjectDesc: 'Created for students of Liceo Caucasia (Antioquia) to foster environmental habits through interactive play.',
    dangerZone: 'Reset Data',
    dangerZoneDesc: 'Erase all progress, coins and unlocked items.',
    resetProgress: 'Reset Progress',
    resetConfirmTitle: 'Reset everything?',
    resetConfirmDesc: 'All your stats, level and coins will be permanently cleared.',
    yesReset: 'Yes, Reset All',

    dailyReward: 'Daily Reward',
    dailyRewardTitle: 'Daily Eco Reward',
    dailyRewardSubtitle: 'Log in every day to keep your streak and earn coins and prizes!',
    comeBackTomorrow: 'Come back tomorrow for your next reward!',
    claimDay: 'Day',
  },
  es: {
    home: 'INICIO',
    games: 'JUEGOS',
    store: 'TIENDA',
    inventory: 'INVENTARIO',
    wardrobe: 'ARMARIO',
    profile: 'PERFIL',
    settings: 'AJUSTES',
    level: 'Nivel',
    coins: 'Monedas',
    points: 'PTS',
    days: 'días',
    day: 'Día',
    streak: 'Racha',
    back: 'Volver',
    exit: 'Salir',
    cancel: 'Cancelar',
    save: 'Guardar',
    confirm: 'Confirmar',
    claim: 'Reclamar',
    claimed: 'Reclamado',
    claimReward: 'Reclamar Recompensa',
    claimRewards: 'Reclamar Recompensas',
    completed: 'Completado',
    correct: '¡Correcto!',
    wrong: '¡Contenedor Incorrecto!',
    combo: 'COMBO',
    free: 'Gratis',
    equipped: 'Equipado',
    equip: 'Equipar',
    buy: 'Comprar',
    locked: 'Bloqueado',
    unlockAtLevel: 'Desbloquea en Nivel',
    all: 'Todo',
    plants: 'Plantas',
    decor: 'Decoración',
    accessories: 'Accesorios',
    habitats: 'Hábitats',
    close: 'Cerrar',
    score: 'Puntuación',
    wasteSorted: 'Residuos Clasificados',
    gameOver: '¡Partida Terminada!',
    continue: 'Continuar',
    left: 'Izquierda',
    right: 'Derecha',
    dropFast: 'Soltar Rápido',
    correctBin: 'Contenedor Correcto',

    organic: 'Orgánico',
    organicDesc: 'Restos de comida, cáscaras de frutas, hojas y poda de jardín.',
    recyclable: 'Reciclable',
    recyclableDesc: 'Botellas de plástico limpias, papel, cartón, vidrio y latas.',
    nonUsable: 'No Aprovechable',
    nonUsableDesc: 'Servilletas usadas, plásticos contaminados, residuos sanitarios.',
    greenBin: 'Caneca Verde',
    whiteBin: 'Caneca Blanca',
    blackBin: 'Caneca Negra',

    gameTitle: 'ECO LICEISTA',
    gameSubtitle: 'Clasifica residuos, supera desafíos y protege el medio ambiente.',
    editionSubtitle: 'Edición de Sostenibilidad y Clasificación de Residuos',
    playNow: '¡JUGAR AHORA!',
    welcomeAgent: '¡Bienvenido, Agente Ecológico!',
    enterNamePrompt: 'Ingresa tu nombre para iniciar tu aventura ambiental.',
    playerNameLabel: 'Nombre del Jugador',
    playerNamePlaceholder: 'Ej. Juan Pérez',
    ecoMissionTitle: 'Misión Ecológica:',
    ecoMissionDesc: 'Clasifica residuos en las canecas Verde (Orgánico), Blanca (Reciclable) y Negra (No Aprovechable) y limpia el Parque del Río Cauca.',
    startAdventure: 'INICIAR AVENTURA',
    aerisDivisionTag: 'DIVISIÓN AERIS • LICEO CAUCASIA',

    sanctuaryTitle: 'Santuario Liceo Caucasia',
    feed: 'Alimentar',
    clean: 'Limpiar',
    rest: 'Dormir',
    feedPet: 'Alimentar',
    cleanPet: 'Limpiar',
    sleepPet: 'Dormir',
    sustainableFoods: 'Alimentos Sostenibles',
    hunger: 'Hambre',
    mood: 'Ánimo',
    energy: 'Energía',
    hygiene: 'Higiene',
    petCleanMsg: '¡quedó reluciente y fresco! 🫧',
    petFeedMsg: '¡disfrutó su comida ecológica! (+XP)',
    petRestMsg: '¡está descansando y recuperando energías! 💤',
    quickBinInfoTitle: 'Guía de Reciclaje',
    gotIt: '¡Entendido!',

    gamesHubTitle: 'Mini-Juegos Ambientales',
    gamesHubSubtitle: 'Aprende a clasificar residuos, gana monedas 🪙 y obtén XP para subir de nivel.',
    totalWasteSorted: 'Total Residuos Clasificados',
    playGame: 'JUGAR',
    bestScore: 'Mejor Puntaje',

    tetrisTitle: 'Eco-Tetris',
    tetrisTag: 'Puzzle y Reflejos',
    tetrisDesc: 'Mueve el residuo que cae hacia el contenedor correcto antes de que llegue al fondo.',
    tetrisHowTo: 'Controles: Flechas Izquierda/Derecha o botones en pantalla.',
    tetrisLeft: 'Izquierda',
    tetrisRight: 'Derecha',
    tetrisDrop: 'Soltar',
    gameFinished: '¡Partida Completada!',
    classified: 'Clasificados',
    maxCombo: 'Mayor Combo',

    fastSortTitle: 'Clasifica Rápido',
    fastSortTag: 'Velocidad y Precisión',
    fastSortDesc: 'Elige velozmente la caneca correspondiente para cada residuo antes de que acabe el tiempo.',
    fastSortHowTo: 'Toca la caneca correcta antes de que el temporizador llegue a cero.',
    round: 'Ronda',
    timeLeft: 'Tiempo',
    whyThisBin: '¿Por qué esta caneca?',
    nextItem: 'Siguiente Residuo',

    parkCleanupTitle: 'Limpia el Parque',
    parkCleanupTag: 'Escena Interactiva',
    parkCleanupDesc: 'Recoge los residuos regados por el parque y clasifícalos en su respectiva caneca.',
    parkCleanupHowTo: 'Toca los residuos en el césped y selecciona la caneca correcta.',
    parkLevel: 'Fase del Parque',
    parkCleanliness: 'Limpieza',
    selectTrashPrompt: 'Toca los residuos para recogerlos',
    sortIntoBin: 'Clasificar en Caneca',
    nextLevel: 'Siguiente Fase',
    congratsParkClean: '¡El parque está totalmente limpio y lleno de flores!',

    storeTitle: 'Tienda Ecológica',
    storeSubtitle: 'Gasta tus eco-monedas en decoraciones y mejoras para el hábitat.',
    notEnoughCoins: '¡No tienes suficientes monedas!',
    itemPurchased: '¡Artículo comprado con éxito!',
    itemEquipped: '¡Artículo equipado!',

    profileTitle: 'Perfil del Agente',
    ecoTitle: 'Guardián Ecológico Liceista',
    wasteBreakdown: 'Desglose de Clasificación',
    totalSorted: 'Total Clasificados',
    positiveImpact: 'Impacto Positivo',
    gameStats: 'Estadísticas de Juego',
    gamesPlayed: 'Partidas Jugadas',
    timePlayed: 'Tiempo Jugado',
    minutes: 'min',
    highScores: 'Mejores Puntajes',
    achievementsTitle: 'Logros y Reconocimientos',
    growthJournalTab: 'Diario de Crecimiento',
    agentSummaryTab: 'Resumen de Agente',
    growthJournalTitle: 'Diario de Crecimiento',
    growthJournalSubtitle: 'Historial de adopción, etapas de evolución e hitos alcanzados en el Liceo Caucasia',
    adoptionCertificateTitle: 'Certificado Oficial de Adopción Eco',
    adoptionDateLabel: 'Fecha de Adopción',
    timeTogetherLabel: 'Tiempo Juntos',
    daysTogether: 'días juntos',
    officialGuardianLabel: 'Tutor Oficial',
    schoolCampusLabel: 'Sede Educativa',
    petSpeciesLabel: 'Especie Compañera',
    registryCodeLabel: 'Matrícula Ecológica',
    affectionBondLabel: 'Vínculo de Cariño',
    growthStagesTitle: 'Fases de Crecimiento & Evolución',
    milestonesTitle: 'Hitos Alcanzados por la Mascota',
    milestonesReachedLabel: 'Hitos Completados',
    allMilestonesFilter: 'Todos los Hitos',
    completedFilter: 'Alcanzados',
    inProgressFilter: 'En Progreso',
    growthNotesTitle: 'Recuerdos & Bitácora de Campo',

    // Onboarding Guided Tours
    tourNext: 'Siguiente',
    tourPrev: 'Anterior',
    tourSkip: 'Omitir Guía',
    tourFinishGames: '¡A Jugar y Ganar!',
    tourFinishStore: '¡A Explorar la Tienda!',
    tourStepIndicator: 'Paso',
    tourHelpBtnGames: 'Guía de Monedas',
    tourHelpBtnStore: 'Guía de Compras',
    gamesTourBadge: 'TOUR DE JUEGOS • CÓMO GANAR MONEDAS',
    gamesTourStep1Title: 'Gana Monedas y Experiencia (XP)',
    gamesTourStep1Desc: 'Juega los minijuegos ecológicos para acumular Monedas Eco y subir de nivel. Cada residuo clasificado y cada parque limpio te recompensan.',
    gamesTourStep2Title: 'Supera Tus Mejores Puntajes',
    gamesTourStep2Desc: 'Practica en Tetris de Residuos, Clasificación Rápida y Limpia el Parque. Cuanto mayor sea tu récord, mejores bonificaciones de monedas recibirás.',
    gamesTourStep3Title: 'Multiplicador por Buena Separación',
    gamesTourStep3Desc: 'Usa correctamente las canecas: verde (orgánicos), blanca (aprovechables) y negra (no aprovechables). ¡Las rachas perfectas multiplican tus ganancias!',
    storeTourBadge: 'TOUR DE TIENDA • CÓMO GASTAR MONEDAS',
    storeTourStep1Title: 'Tus Monedas Ecológicas',
    storeTourStep1Desc: 'Aquí ves tu alcancía con las monedas acumuladas jugando y cuidando a tu mascota. Ahorra para comprar mejores mejoras y atuendos.',
    storeTourStep2Title: 'Catálogo Sostenible por Categorías',
    storeTourStep2Desc: 'Encuentra comida orgánica nutritiva, plantas para la huerta escolar, uniformes y gorras del Liceo, y hábitats temáticos para tu mascota.',
    storeTourStep3Title: 'Comprar y Equipar al Instante',
    storeTourStep3Desc: 'Desbloquea artículos subiendo de nivel escolar. Cuando tengas suficientes monedas pulsa Comprar, y luego Equipar para vestir a tu compañero.',

    settingsTitle: 'Ajustes y Configuración',
    settingsSubtitle: 'Personaliza apariencia, idioma, sonido y rendimiento.',
    appearanceTitle: 'Apariencia y Temas',
    appearanceSubtitle: 'Personaliza temas visuales, acentos y estilo de la interfaz.',
    themePresetLabel: 'Temas Disponibles',
    themePresetDesc: 'Selecciona un tema para transformar al instante toda la interfaz.',
    accentColorLabel: 'Color de Acento',
    accentColorDesc: 'Escoge tu color principal con contraste y legibilidad garantizados.',
    followSystemLabel: 'Seguir el Sistema',
    followSystemDesc: 'Detectar automáticamente si el dispositivo utiliza modo claro u oscuro.',
    activeThemeBadge: 'ACTIVO',
    livePreview: 'Vista Previa en Vivo',
    resetAppearance: 'Restablecer Apariencia',
    languageLabel: 'Idioma del Juego',
    languageDesc: 'Selecciona Inglés (por defecto) o Español.',
    english: 'English (Inglés)',
    spanish: 'Español (Spanish)',
    systemOptions: 'Opciones de Sistema',
    soundEffects: 'Efectos de Sonido (SFX)',
    soundEffectsDesc: 'Reproducir sonidos y efectos interactivos.',
    highPerformance: 'Modo Alto Rendimiento',
    highPerformanceDesc: 'Optimizado sin lag para computadores y celulares de gama baja.',
    educationalTips: 'Consejos Ecológicos',
    educationalTipsDesc: 'Mostrar explicaciones pedagógicas al equivocarse.',
    playerProfile: 'Identidad del Jugador',
    aboutProject: 'Acerca de AERIS Division',
    aboutProjectDesc: 'Creado para los estudiantes del Liceo Caucasia con el fin de fomentar la cultura ambiental y el reciclaje.',
    dangerZone: 'Zona de Peligro',
    dangerZoneDesc: 'Borrar todo el progreso, monedas y objetos desbloqueados.',
    resetProgress: 'Reiniciar Progreso',
    resetConfirmTitle: '¿Reiniciar todo el juego?',
    resetConfirmDesc: 'Tus estadísticas, nivel y monedas se borrarán permanentemente.',
    yesReset: 'Sí, Reiniciar Todo',

    dailyReward: 'Recompensa Diaria',
    dailyRewardTitle: 'Recompensa Diaria Ecológica',
    dailyRewardSubtitle: '¡Entra cada día para mantener tu racha y ganar monedas y objetos!',
    comeBackTomorrow: '¡Vuelve mañana para tu próxima recompensa!',
    claimDay: 'Día',
  },
};

export function useI18n(lang?: string | Language): Translations {
  if (lang === 'es') return TRANSLATIONS.es;
  return TRANSLATIONS.en;
}

export function getLocalizedTitleName(name: string, lang: string) {
  if (lang === 'es') return name;
  const map: Record<string, string> = {
    'Novato Ecológico': 'Eco Novice',
    'Vigía Verde': 'Green Watcher',
    'Guardián del Río Cauca': 'Cauca River Guardian',
    'Defensor de los Bosques': 'Forest Defender',
    'Héroe Liceista': 'School Eco Hero',
    'Maestro Eco-Sostenible': 'Eco-Sustainable Master',
  };
  return map[name] || name;
}

export function getLocalizedUnlockName(name: string, lang: string) {
  if (lang === 'es') return name;
  const map: Record<string, string> = {
    'Corona de Hojas & Compostera': 'Leaf Crown & School Composter',
    'Pañoleta Liceo & Cama Eco': 'Liceo Scarf & Eco Bed',
    'Capa Celestial del Sol': 'Celestial Solar Cape',
    'Hábitat Bioluminiscente': 'Bioluminescent Habitat',
    'Maestro Eco-Sostenible': 'Eco-Sustainable Master',
    'Recompensas de Prestigio': 'Prestige Rewards',
  };
  return map[name] || name;
}

