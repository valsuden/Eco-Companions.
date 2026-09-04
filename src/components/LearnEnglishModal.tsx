import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Volume2, 
  RotateCcw, 
  Trophy, 
  Coins, 
  Zap, 
  X,
  Languages,
  Award,
  Search,
  BookA,
  Lightbulb,
  Leaf,
  Recycle,
  Droplets,
  Sun
} from 'lucide-react';
import { sound } from '../utils/sound';
import { useI18n } from '../utils/i18n';

interface LearnEnglishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReward: (xp: number, coins: number) => void;
  language?: 'es' | 'en';
}

interface EnglishChallenge {
  id: string;
  topic: string;
  wordEn: string;
  wordEs: string;
  phonetic: string;
  sentenceEn: string;
  sentenceEs: string;
  questionEn: string;
  questionEs: string;
  optionsEn: string[];
  optionsEs: string[];
  correctIndex: number;
  funFactEn: string;
  funFactEs: string;
  iconName: string;
}

interface VocabularyCard {
  id: string;
  termEn: string;
  termEs: string;
  category: 'waste' | 'water' | 'energy' | 'nature' | 'climate';
  phonetic: string;
  definitionEn: string;
  definitionEs: string;
  exampleEn: string;
  exampleEs: string;
  emoji: string;
}

const ENGLISH_LESSONS: EnglishChallenge[] = [
  {
    id: 'eco_1',
    topic: 'Recycling & Nature',
    wordEn: 'Recycle',
    wordEs: 'Reciclar',
    phonetic: '/riːˈsaɪ.kəl/',
    sentenceEn: 'We recycle plastic bottles to protect the Cauca River.',
    sentenceEs: 'Reciclamos botellas de plástico para proteger el río Cauca.',
    questionEn: 'What does "Recycle" mean?',
    questionEs: '¿Qué significa "Recycle" en español?',
    optionsEn: ['Throw in trash', 'Process to reuse', 'Burn waste', 'Pollute waters'],
    optionsEs: ['Tirar a la basura', 'Procesar para reutilizar', 'Quemar residuos', 'Contaminar aguas'],
    correctIndex: 1,
    funFactEn: 'Recycling 1 aluminum can saves enough electricity to power a TV for 3 hours!',
    funFactEs: '¡Reciclar 1 lata de aluminio ahorra suficiente energía para ver televisión por 3 horas!',
    iconName: '♻️',
  },
  {
    id: 'eco_2',
    topic: 'Organic Waste',
    wordEn: 'Compost',
    wordEs: 'Compostaje / Abono',
    phonetic: '/ˈkɒm.pɒst/',
    sentenceEn: 'Organic waste from the green bin turns into rich compost.',
    sentenceEs: 'Los residuos orgánicos de la caneca verde se convierten en rico abono.',
    questionEn: 'Which item can be transformed into compost?',
    questionEs: '¿Qué residuo se transforma en abono o compost?',
    optionsEn: ['Plastic bags', 'Banana peels & leaves', 'Batteries', 'Glass jars'],
    optionsEs: ['Bolsas plásticas', 'Cáscaras de plátano y hojas', 'Pilas alcalinas', 'Frascos de vidrio'],
    correctIndex: 1,
    funFactEn: 'Composting prevents organic waste from generating harmful methane in municipal landfills.',
    funFactEs: 'El compostaje evita que la materia orgánica genere gas metano en los rellenos sanitarios.',
    iconName: '🌱',
  },
  {
    id: 'eco_3',
    topic: 'Clean Energy',
    wordEn: 'Solar Energy',
    wordEs: 'Energía Solar',
    phonetic: '/ˈsoʊ.lɚ ˈen.ɚ.dʒi/',
    sentenceEn: 'Solar panels capture clean electricity from sunlight in Caucasia.',
    sentenceEs: 'Los paneles solares capturan energía limpia de la luz solar en Caucasia.',
    questionEn: 'How do you say "Energía Renovable" in English?',
    questionEs: '¿Cómo se dice "Energía Renovable" en inglés?',
    optionsEn: ['Fossil Power', 'Renewable Energy', 'Heavy Fuel', 'Toxic Grid'],
    optionsEs: ['Energía Fósil', 'Renewable Energy', 'Combustible Pesado', 'Red Tóxica'],
    correctIndex: 1,
    funFactEn: 'The sun delivers more clean energy to Earth in a single hour than all humans consume in a year!',
    funFactEs: '¡El sol entrega a la Tierra más energía limpia en una sola hora de la que la humanidad usa en un año!',
    iconName: '☀️',
  },
  {
    id: 'eco_4',
    topic: 'Wildlife & Biodiversity',
    wordEn: 'Biodiversity',
    wordEs: 'Biodiversidad',
    phonetic: '/ˌbaɪ.oʊ.daɪˈvɝː.sə.t̬i/',
    sentenceEn: 'Caucasia has rich biodiversity with tropical birds, river turtles, and native trees.',
    sentenceEs: 'Caucasia tiene una rica biodiversidad con aves tropicales, tortugas de río y árboles nativos.',
    questionEn: 'What is the English term for living varieties in an ecosystem?',
    questionEs: '¿Cuál es el término en inglés para la variedad de seres vivos en un ecosistema?',
    optionsEn: ['Pollution', 'Biodiversity', 'Deforestation', 'Erosion'],
    optionsEs: ['Contaminación', 'Biodiversity', 'Deforestación', 'Erosión'],
    correctIndex: 1,
    funFactEn: 'Colombia is one of the top biodiversity hotspots on planet Earth, housing over 1,900 bird species!',
    funFactEs: '¡Colombia es uno de los países más biodiversos del planeta, albergando más de 1.900 especies de aves!',
    iconName: '🦜',
  },
  {
    id: 'eco_5',
    topic: 'Recyclables Bin',
    wordEn: 'White Bin',
    wordEs: 'Caneca Blanca',
    phonetic: '/waɪt bɪn/',
    sentenceEn: 'Paper, cardboard, metal cans, and clean plastics belong in the white bin.',
    sentenceEs: 'El papel, cartón, latas de metal y plásticos limpios van en la caneca blanca.',
    questionEn: 'What belongs in the "White Bin"?',
    questionEs: '¿Qué residuo se deposita en la "Caneca Blanca"?',
    optionsEn: ['Food scraps', 'Clean cardboard & cans', 'Greasy napkins', 'Hospital bandages'],
    optionsEs: ['Restos de comida', 'Cartón limpio y latas', 'Servilletas grasosas', 'Vendas hospitalarias'],
    correctIndex: 1,
    funFactEn: 'Recycling clean paper saves up to 60% of water and prevents cutting down new trees.',
    funFactEs: '¡Reciclar papel limpio ahorra hasta un 60% de agua y evita talar árboles nuevos!',
    iconName: '📦',
  },
  {
    id: 'eco_6',
    topic: 'Water Conservation',
    wordEn: 'Watershed',
    wordEs: 'Cuenca Hidrográfica',
    phonetic: '/ˈwɑː.t̬ɚ.ʃed/',
    sentenceEn: 'The Cauca River watershed provides fresh water and sustains aquatic habitats.',
    sentenceEs: 'La cuenca del río Cauca suministra agua dulce y sostiene hábitats acuáticos.',
    questionEn: 'How do you say "Ahorrar Agua" in English?',
    questionEs: '¿Cómo se dice "Ahorrar Agua" en inglés?',
    optionsEn: ['Waste Water', 'Save Water', 'Drink Juice', 'Boil River'],
    optionsEs: ['Desperdiciar Agua', 'Save Water', 'Tomar Jugo', 'Hervir Río'],
    correctIndex: 1,
    funFactEn: 'Turning off the tap while brushing your teeth saves up to 8 liters of water per minute!',
    funFactEs: '¡Cerrar la llave mientras te cepillas los dientes ahorra hasta 8 litros de agua por minuto!',
    iconName: '💧',
  },
  {
    id: 'eco_7',
    topic: 'Sustainable Living',
    wordEn: 'Upcycling',
    wordEs: 'Suprarreciclaje / Reutilización Creativa',
    phonetic: '/ˈʌpˌsaɪ.klɪŋ/',
    sentenceEn: 'Upcycling turns discarded wooden pallets into school garden benches.',
    sentenceEs: 'El suprarreciclaje convierte estibas de madera desechadas en bancas para el jardín escolar.',
    questionEn: 'What is "Upcycling"?',
    questionEs: '¿Qué significa "Upcycling"?',
    optionsEn: ['Burning plastic', 'Creative reuse with higher value', 'Burying trash', 'Polluting soil'],
    optionsEs: ['Quemar plástico', 'Reutilización creativa de mayor valor', 'Enterrar basura', 'Contaminar suelo'],
    correctIndex: 1,
    funFactEn: 'Upcycling gives discarded items a second, more beautiful life without chemical melting.',
    funFactEs: '¡El suprarreciclaje otorga a los objetos una segunda vida más valiosa sin fundirlos químicamente!',
    iconName: '🎨',
  },
  {
    id: 'eco_8',
    topic: 'Carbon Footprint',
    wordEn: 'Carbon Footprint',
    wordEs: 'Huella de Carbono',
    phonetic: '/ˈkɑːr.bən ˈfʊt.prɪnt/',
    sentenceEn: 'Riding a bicycle to Liceo Caucasia helps reduce our carbon footprint.',
    sentenceEs: 'Ir en bicicleta al Liceo Caucasia ayuda a reducir nuestra huella de carbono.',
    questionEn: 'What reduces your carbon footprint?',
    questionEs: '¿Qué acción reduce tu huella de carbono?',
    optionsEn: ['Driving huge cars alone', 'Walking or cycling', 'Leaving lights on all night', 'Burning garbage'],
    optionsEs: ['Manejar autos grandes solo', 'Caminar o andar en bicicleta', 'Dejar luces encendidas toda la noche', 'Quemar basura'],
    correctIndex: 1,
    funFactEn: 'Planting one native tree can absorb over 22 kg of CO2 annually for decades!',
    funFactEs: '¡Plantar un árbol nativo puede absorber más de 22 kg de CO2 al año por décadas!',
    iconName: '👣',
  }
];

const VOCABULARY_LIST: VocabularyCard[] = [
  {
    id: 'voc_1',
    termEn: 'Biodegradable',
    termEs: 'Biodegradable',
    category: 'waste',
    phonetic: '/ˌbaɪ.oʊ.dɪˈɡreɪ.də.bəl/',
    definitionEn: 'Capable of being decomposed naturally by bacteria and fungi.',
    definitionEs: 'Capaz de descomponerse naturalmente mediante bacterias y hongos.',
    exampleEn: 'Fruit peels are 100% biodegradable.',
    exampleEs: 'Las cáscaras de fruta son 100% biodegradables.',
    emoji: '🍂'
  },
  {
    id: 'voc_2',
    termEn: 'Reforestation',
    termEs: 'Reforestación',
    category: 'nature',
    phonetic: '/ˌriː.fɔːr.əˈsteɪ.ʃən/',
    definitionEn: 'The process of planting trees in an area where trees were lost.',
    definitionEs: 'Proceso de sembrar árboles en áreas donde el bosque fue talado o destruido.',
    exampleEn: 'Students organized a reforestation project along the Cauca riverbank.',
    exampleEs: 'Los estudiantes organizaron una jornada de reforestación junto al río Cauca.',
    emoji: '🌲'
  },
  {
    id: 'voc_3',
    termEn: 'Aquatic Habitat',
    termEs: 'Hábitat Acuático',
    category: 'water',
    phonetic: '/əˈkwæt̬.ɪk ˈhæb.ə.tæt/',
    definitionEn: 'An environment located in fresh or marine water where organisms live.',
    definitionEs: 'Ambiente en agua dulce o marina donde viven organismos.',
    exampleEn: 'Clean water is crucial for the river fish aquatic habitat.',
    exampleEs: 'El agua limpia es vital para el hábitat acuático de los peces del río.',
    emoji: '🐟'
  },
  {
    id: 'voc_4',
    termEn: 'Solar Panel',
    termEs: 'Panel Solar',
    category: 'energy',
    phonetic: '/ˈsoʊ.lɚ ˈpæn.əl/',
    definitionEn: 'A device that converts radiant light from the sun into electricity.',
    definitionEs: 'Dispositivo que convierte la luz del sol en electricidad.',
    exampleEn: 'Solar panels power our environmental science lab.',
    exampleEs: 'Los paneles solares alimentan nuestro laboratorio ambiental.',
    emoji: '⚡'
  },
  {
    id: 'voc_5',
    termEn: 'Single-Use Plastic',
    termEs: 'Plástico de un solo uso',
    category: 'waste',
    phonetic: '/ˈsɪŋ.ɡəl juːs ˈplæs.tɪk/',
    definitionEn: 'Plastic items used only once before being discarded or recycled.',
    definitionEs: 'Artículos plásticos usados una única vez antes de tirarse.',
    exampleEn: 'Switching to cloth bags eliminates single-use plastic bags.',
    exampleEs: 'Usar bolsas de tela elimina las bolsas plásticas de un solo uso.',
    emoji: '🛍️'
  },
  {
    id: 'voc_6',
    termEn: 'Ecosystem',
    termEs: 'Ecosistema',
    category: 'nature',
    phonetic: '/ˈiː.koʊˌsɪs.təm/',
    definitionEn: 'A biological community of interacting organisms and their physical environment.',
    definitionEs: 'Comunidad biológica de seres vivos que interactúan con su entorno físico.',
    exampleEn: 'The wetlands of Caucasia form a rich tropical ecosystem.',
    exampleEs: 'Los humedales de Caucasia forman un rico ecosistema tropical.',
    emoji: '🌿'
  },
  {
    id: 'voc_7',
    termEn: 'Landfill',
    termEs: 'Relleno Sanitario',
    category: 'waste',
    phonetic: '/ˈlænd.fɪl/',
    definitionEn: 'A site for the disposal of waste materials by burial.',
    definitionEs: 'Lugar acondicionado para la disposición final de basuras.',
    exampleEn: 'Recycling prevents excessive garbage from ending up in the landfill.',
    exampleEs: 'Reciclar evita que demasiada basura termine en el relleno sanitario.',
    emoji: '🏔️'
  },
  {
    id: 'voc_8',
    termEn: 'Renewable Resource',
    termEs: 'Recurso Renovable',
    category: 'energy',
    phonetic: '/rɪˈnuː.ə.bəl ˈriː.sɔːrs/',
    definitionEn: 'A natural resource that replenishes naturally over short periods.',
    definitionEs: 'Recurso natural que se repone naturalmente en poco tiempo.',
    exampleEn: 'Wind and solar light are clean renewable resources.',
    exampleEs: 'El viento y la luz solar son recursos renovables limpios.',
    emoji: '💨'
  }
];

export const LearnEnglishModal: React.FC<LearnEnglishModalProps> = ({
  isOpen,
  onClose,
  onReward,
  language = 'en',
}) => {
  const isSpanish = language === 'es';
  const t = useI18n(language);
  const [activeTab, setActiveTab] = useState<'quiz' | 'dictionary'>('quiz');
  const [currentLessonIdx, setCurrentLessonIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVocabCategory, setSelectedVocabCategory] = useState<string>('all');

  if (!isOpen) return null;

  const currentLesson = ENGLISH_LESSONS[currentLessonIdx];

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.88;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentLesson.correctIndex) {
      sound.playSuccess();
      setIsCorrect(true);
      setScore((prev) => prev + 1);
    } else {
      sound.playWrong();
      setIsCorrect(false);
    }
  };

  const handleNext = () => {
    if (currentLessonIdx < ENGLISH_LESSONS.length - 1) {
      setCurrentLessonIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(false);
    } else {
      setCompleted(true);
      sound.playLevelUp();
      const earnedXp = 45 + score * 12;
      const earnedCoins = 25 + score * 8;
      onReward(earnedXp, earnedCoins);
    }
  };

  const handleRestart = () => {
    setCurrentLessonIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setScore(0);
    setCompleted(false);
  };

  const filteredVocab = VOCABULARY_LIST.filter((item) => {
    const matchesSearch = 
      item.termEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.termEs.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definitionEn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedVocabCategory === 'all' || item.category === selectedVocabCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <AnimatePresence>
      <div 
        id="learn-english-modal-backdrop"
        className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 select-none overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 15 }}
          className="bg-slate-900 border border-cyan-500/40 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden text-slate-100 relative my-auto flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-slate-950/80 p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
                <Languages className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-black text-slate-100">
                    {isSpanish ? 'Academia de Inglés & Eco-Vocabulario' : 'English & Eco-Vocabulary Hub'}
                  </h2>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 font-extrabold">
                    +XP & 🪙
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-medium">
                  {isSpanish ? 'Liceo Caucasia • Pronunciación, Retos & Glosario' : 'Caucasia Academy • Pronunciation, Quizzes & Glossary'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-100 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-800 bg-slate-950/40 px-4 pt-2 gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('quiz')}
              className={`pb-2.5 px-3 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer border-b-2 ${
                activeTab === 'quiz'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isSpanish ? 'Retos Interactivos' : 'Interactive Quizzes'}</span>
            </button>

            <button
              onClick={() => setActiveTab('dictionary')}
              className={`pb-2.5 px-3 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer border-b-2 ${
                activeTab === 'dictionary'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookA className="w-3.5 h-3.5" />
              <span>{isSpanish ? 'Glosario & Audio' : 'Glossary & Audio'}</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {activeTab === 'quiz' ? (
              !completed ? (
                <div className="space-y-4">
                  {/* Progress Indicator */}
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                    <span>
                      {isSpanish ? 'Lección' : 'Lesson'} {currentLessonIdx + 1} / {ENGLISH_LESSONS.length}
                    </span>
                    <span className="text-cyan-400 font-black">
                      {isSpanish ? 'Aciertos' : 'Score'}: {score}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400"
                      animate={{ width: `${((currentLessonIdx + 1) / ENGLISH_LESSONS.length) * 100}%` }}
                    />
                  </div>

                  {/* Main Word Card */}
                  <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 text-center space-y-2 relative overflow-hidden">
                    <div className="text-2xl">{currentLesson.iconName}</div>
                    <div className="text-[11px] uppercase font-black tracking-wider text-cyan-400">
                      {currentLesson.topic}
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xl sm:text-2xl font-black text-slate-100 tracking-wide">
                        {currentLesson.wordEn}
                      </span>
                      <button
                        onClick={() => handleSpeak(currentLesson.wordEn)}
                        className="p-1.5 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 transition-colors cursor-pointer"
                        title={isSpanish ? 'Escuchar pronunciación' : 'Listen to pronunciation'}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-xs text-cyan-400 font-mono">
                      {currentLesson.phonetic}
                    </div>

                    <div className="text-xs font-bold text-emerald-400 pt-1 border-t border-slate-800">
                      {isSpanish ? 'Español' : 'Spanish'}: {currentLesson.wordEs}
                    </div>

                    {/* Example sentence */}
                    <div className="bg-slate-900/90 rounded-xl p-3 text-xs space-y-1 text-left border border-slate-800">
                      <div className="text-slate-200 font-semibold flex items-center justify-between">
                        <span>"{currentLesson.sentenceEn}"</span>
                        <button
                          onClick={() => handleSpeak(currentLesson.sentenceEn)}
                          className="text-cyan-400 hover:text-cyan-300 p-0.5 cursor-pointer"
                          title="Play sentence"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-slate-400 text-[11px] italic">
                        "{currentLesson.sentenceEs}"
                      </div>
                    </div>
                  </div>

                  {/* Quiz Question */}
                  <div className="space-y-2 pt-1">
                    <div className="text-xs sm:text-sm font-black text-slate-200 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{isSpanish ? currentLesson.questionEs : currentLesson.questionEn}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(isSpanish ? currentLesson.optionsEs : currentLesson.optionsEn).map((opt, i) => {
                        const isSelected = selectedOption === i;
                        const isTheCorrectOne = i === currentLesson.correctIndex;
                        let btnStyle = 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200';

                        if (isAnswered) {
                          if (isTheCorrectOne) {
                            btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-black shadow-sm';
                          } else if (isSelected && !isTheCorrectOne) {
                            btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-300 line-through';
                          } else {
                            btnStyle = 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60';
                          }
                        }

                        return (
                          <button
                            key={i}
                            onClick={() => handleSelectOption(i)}
                            disabled={isAnswered}
                            className={`p-3 rounded-2xl border text-left text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                          >
                            <span className="truncate">{opt}</span>
                            {isAnswered && isTheCorrectOne && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-1" />
                            )}
                            {isAnswered && isSelected && !isTheCorrectOne && (
                              <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-1" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Feedback banner & Next Button */}
                  {isAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-3 pt-2"
                    >
                      <div className={`p-3 rounded-2xl border text-xs leading-relaxed ${
                        isCorrect
                          ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                          : 'bg-amber-950/60 border-amber-500/40 text-amber-300'
                      }`}>
                        <div className="font-black flex items-center gap-1.5 mb-1">
                          {isCorrect ? (isSpanish ? '✨ ¡Excelente respuesta!' : '✨ Great answer!') : (isSpanish ? '💡 Dato ecológico:' : '💡 Eco Insight:')}
                        </div>
                        <div>{isSpanish ? currentLesson.funFactEs : currentLesson.funFactEn}</div>
                      </div>

                      <button
                        onClick={handleNext}
                        className="w-full py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/30 cursor-pointer"
                      >
                        <span>
                          {currentLessonIdx < ENGLISH_LESSONS.length - 1
                            ? (isSpanish ? 'Siguiente Lección' : 'Next Lesson')
                            : (isSpanish ? 'Completar y Reclamar Recompensas' : 'Complete and Claim Rewards')}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}
                </div>
              ) : (
                /* Celebration Completion Screen */
                <div className="p-4 sm:p-6 text-center space-y-5">
                  <motion.div
                    initial={{ scale: 0.5, rotate: -15 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-amber-500 via-orange-500 to-emerald-400 mx-auto flex items-center justify-center shadow-xl text-slate-950 font-black"
                  >
                    <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-slate-950" />
                  </motion.div>

                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-black text-slate-100">
                      {isSpanish ? '¡Práctica de Inglés Completada!' : 'English Challenge Completed!'}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {isSpanish
                        ? 'Has reforzado el vocabulario ecológico de AERIS y Liceo Caucasia.'
                        : 'You mastered bilingual eco-vocabulary to protect the Cauca River ecosystem.'}
                    </p>
                  </div>

                  {/* Rewards Box */}
                  <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 flex items-center justify-around">
                    <div className="flex items-center gap-2 text-cyan-400 font-black text-sm">
                      <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400" />
                      <span>+{45 + score * 12} XP</span>
                    </div>
                    <div className="w-[1px] h-8 bg-slate-800" />
                    <div className="flex items-center gap-2 text-amber-400 font-black text-sm">
                      <Coins className="w-5 h-5 text-amber-400" />
                      <span>+{25 + score * 8} {t.coins}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleRestart}
                      className="flex-1 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer border border-slate-700"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>{isSpanish ? 'Repetir' : 'Restart'}</span>
                    </button>
                    <button
                      onClick={onClose}
                      className="flex-1 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-600/30"
                    >
                      <span>{t.continue}</span>
                    </button>
                  </div>
                </div>
              )
            ) : (
              /* Dictionary / Glossary Tab */
              <div className="space-y-4">
                {/* Search & Category Filter */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder={isSpanish ? 'Buscar palabra o término...' : 'Search vocabulary...'}
                      className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="flex gap-1 overflow-x-auto pb-1 text-[11px] font-bold">
                    {[
                      { id: 'all', label: isSpanish ? 'Todo' : 'All' },
                      { id: 'waste', label: isSpanish ? 'Residuos' : 'Waste' },
                      { id: 'water', label: isSpanish ? 'Agua' : 'Water' },
                      { id: 'energy', label: isSpanish ? 'Energía' : 'Energy' },
                      { id: 'nature', label: isSpanish ? 'Naturaleza' : 'Nature' },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedVocabCategory(cat.id)}
                        className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-all ${
                          selectedVocabCategory === cat.id
                            ? 'bg-cyan-500 text-slate-950 font-black'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Vocabulary Cards List */}
                <div className="space-y-2.5">
                  {filteredVocab.map((voc) => (
                    <div
                      key={voc.id}
                      className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2 hover:border-cyan-500/40 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{voc.emoji}</span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-black text-slate-100">{voc.termEn}</span>
                              <button
                                onClick={() => handleSpeak(voc.termEn)}
                                className="p-1 rounded-md bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 cursor-pointer"
                                title="Pronounce"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <span className="text-[10px] text-cyan-400 font-mono">{voc.phonetic}</span>
                          </div>
                        </div>

                        <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                          {voc.termEs}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300">
                        {isSpanish ? voc.definitionEs : voc.definitionEn}
                      </p>

                      <div className="bg-slate-900/90 rounded-xl p-2 text-[11px] text-slate-400 flex items-center justify-between border border-slate-800">
                        <span className="italic">"{voc.exampleEn}"</span>
                        <button
                          onClick={() => handleSpeak(voc.exampleEn)}
                          className="text-cyan-400 hover:text-cyan-300 p-0.5 cursor-pointer ml-2 shrink-0"
                          title="Play example"
                        >
                          <Volume2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
