import React, { useState, useEffect } from 'react';
import { User, PetInfo, PetSpecies } from '../types';
import { PetAvatar } from './PetAvatar';
import { 
  Calendar, 
  Award, 
  CheckCircle2, 
  Clock, 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  Leaf, 
  Crown, 
  Trophy, 
  BookOpen, 
  Utensils, 
  Gamepad2, 
  Recycle, 
  Flame, 
  Plus, 
  Trash2,
  Lock,
  ChevronRight,
  Filter,
  Check,
  Star
} from 'lucide-react';
import { sound } from '../utils/sound';
import { useI18n } from '../utils/i18n';

interface GrowthJournalProps {
  user: User;
  petInfo: PetInfo;
}

interface MilestoneItem {
  id: string;
  titleEs: string;
  titleEn: string;
  descEs: string;
  descEn: string;
  category: 'adoption' | 'care' | 'eco' | 'games' | 'evolution';
  icon: React.ReactNode;
  isCompleted: boolean;
  progress: number;
  maxProgress: number;
  badgeReward: string;
  achievedDateText?: string;
}

interface JournalNote {
  id: string;
  date: string;
  text: string;
  author: string;
}

const STORAGE_NOTES_KEY = 'caucasia_eco_pet_journal_notes';

export const GrowthJournal: React.FC<GrowthJournalProps> = ({ user, petInfo }) => {
  const currentLang = user.language || 'en';
  const t = useI18n(currentLang);

  // Adoption Date calculation
  const adoptionDateStr = petInfo.adoptedAt || '2026-01-15T08:00:00.000Z';
  const adoptionDate = new Date(adoptionDateStr);

  const formattedAdoptionDate = adoptionDate.toLocaleDateString(
    currentLang === 'es' ? 'es-ES' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  // Calculate days together
  const now = new Date();
  const diffMs = Math.max(0, now.getTime() - adoptionDate.getTime());
  const daysTogether = Math.max(1, Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1);

  // Filter state for milestones
  const [milestoneFilter, setMilestoneFilter] = useState<'all' | 'completed' | 'pending'>('all');

  // Interactive notes/memories log
  const [notes, setNotes] = useState<JournalNote[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_NOTES_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Pre-seeded heartwarming initial memories
    return [
      {
        id: 'note_1',
        date: formattedAdoptionDate,
        text: currentLang === 'es' 
          ? `¡Día inolvidable! ${petInfo.name} llegó oficialmente al Liceo Caucasia. Sus ojos reflejan curiosidad y muchas ganas de aprender sobre el cuidado del medio ambiente.`
          : `Unforgettable day! ${petInfo.name} officially joined Liceo Caucasia. Bright eyes full of curiosity and excitement to learn eco-stewardship.`,
        author: user.name || (currentLang === 'es' ? 'Tutor Oficial' : 'Official Guardian'),
      },
      {
        id: 'note_2',
        date: formattedAdoptionDate,
        text: currentLang === 'es'
          ? `Asignación de credencial ecológica y primeras croquetas sostenibles en la huerta escolar.`
          : `Official eco-badge assignment and first sustainable treat shared in the school garden.`,
        author: 'AERIS Division • Liceo Caucasia',
      }
    ];
  });

  const [newNoteText, setNewNoteText] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  // Save notes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_NOTES_KEY, JSON.stringify(notes));
    } catch {
      // ignore
    }
  }, [notes]);

  // Species localized name & details
  const species = petInfo.species || 'cat';
  const getSpeciesBadge = (sp: PetSpecies) => {
    switch (sp) {
      case 'dog':
        return currentLang === 'es' ? 'Canino Explorador de Caucasia 🐶' : 'Caucasia Explorer Dog 🐶';
      case 'rabbit':
        return currentLang === 'es' ? 'Conejo Botánico de la Huerta 🐰' : 'Botanical Garden Rabbit 🐰';
      default:
        return currentLang === 'es' ? 'Felino Místico Guardián 🐱' : 'Mystic Guardian Cat 🐱';
    }
  };

  // Growth Stage calculation
  const growthStages = [
    {
      stage: 1,
      nameEs: 'Cachorro Eco / Aprendiz',
      nameEn: 'Eco Cub / Learner',
      levelReq: 'Nivel 1 - 2',
      minLevel: 1,
      maxLevel: 2,
      descEs: 'Primeros pasos en el Liceo. Aprende a reconocer los colores de las canecas y recibe sus primeras caricias.',
      descEn: 'Early steps at Liceo Caucasia. Learning waste bin color codes and forming a caring bond.',
      icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
      color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
    },
    {
      stage: 2,
      nameEs: 'Guardián Joven / Explorador',
      nameEn: 'Young Guardian / Scout',
      levelReq: 'Nivel 3 - 4',
      minLevel: 3,
      maxLevel: 4,
      descEs: 'Acompaña con agilidad en los patios y asiste activamente en la clasificación de residuos.',
      descEn: 'Agile campus explorer helping classify materials and restoring park cleanliness.',
      icon: <Leaf className="w-5 h-5 text-cyan-400" />,
      color: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400',
    },
    {
      stage: 3,
      nameEs: 'Protector Místico / Experto',
      nameEn: 'Mystic Protector / Expert',
      levelReq: 'Nivel 5 - 7',
      minLevel: 5,
      maxLevel: 7,
      descEs: 'Conexión profunda con el Río Cauca y la flora local. Guía a otros estudiantes en el reciclaje.',
      descEn: 'Deep environmental connection with the Cauca River. Inspires classmates in green action.',
      icon: <ShieldCheck className="w-5 h-5 text-purple-400" />,
      color: 'border-purple-500/40 bg-purple-500/10 text-purple-400',
    },
    {
      stage: 4,
      nameEs: 'Guardián Legendario del Liceo',
      nameEn: 'Legendary Liceo Guardian',
      levelReq: 'Nivel 8+',
      minLevel: 8,
      maxLevel: 99,
      descEs: 'Máximo exponente de la sostenibilidad y biodiversidad. Aura protectora permanente.',
      descEn: 'Peak eco-stewardship and school pride. Radiant aura protecting Caucasia’s habitat.',
      icon: <Crown className="w-5 h-5 text-amber-400" />,
      color: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
    },
  ];

  const currentStageIndex = user.level >= 8 ? 3 : user.level >= 5 ? 2 : user.level >= 3 ? 1 : 0;
  const currentStage = growthStages[currentStageIndex];

  // Milestones Data
  const hasEquippedCosmetic = Boolean(
    petInfo.equippedHat || 
    petInfo.equippedGlasses || 
    petInfo.equippedAccessory || 
    petInfo.equippedAura || 
    (petInfo.colorScheme && petInfo.colorScheme !== 'mystic_night')
  );

  const milestones: MilestoneItem[] = [
    {
      id: 'm_adoption',
      titleEs: 'Ceremonia de Adopción Oficial',
      titleEn: 'Official Adoption Ceremony',
      descEs: `Asignación de matrícula ecológica y bienvenida en el Liceo Caucasia.`,
      descEn: `Eco-registry issued and official welcome at Liceo Caucasia.`,
      category: 'adoption',
      icon: <Heart className="w-4 h-4 text-rose-400" />,
      isCompleted: true,
      progress: 1,
      maxProgress: 1,
      badgeReward: 'AERIS-ADOPTION',
      achievedDateText: formattedAdoptionDate,
    },
    {
      id: 'm_first_feed',
      titleEs: 'Primer Bocado Sostenible',
      titleEn: 'First Sustainable Meal',
      descEs: `Alimentado con croquetas ecológicas cultivadas con abono orgánico.`,
      descEn: `Fed organic nutritious treats grown with composted school soil.`,
      category: 'care',
      icon: <Utensils className="w-4 h-4 text-emerald-400" />,
      isCompleted: user.level >= 1,
      progress: 1,
      maxProgress: 1,
      badgeReward: 'ECO-FOOD',
      achievedDateText: formattedAdoptionDate,
    },
    {
      id: 'm_bond_love',
      titleEs: 'Vínculo Afectivo & Caricias',
      titleEn: 'Affection & Caring Bond',
      descEs: `Recibió cariño de su tutor, alcanzando energía de afecto saludable.`,
      descEn: `Received warmth and love from guardian, reaching peak affection energy.`,
      category: 'care',
      icon: <Sparkles className="w-4 h-4 text-pink-400" />,
      isCompleted: (petInfo.petAffectionEnergy ?? 100) >= 40 || user.streak >= 1,
      progress: 1,
      maxProgress: 1,
      badgeReward: 'PURE-BOND',
      achievedDateText: formattedAdoptionDate,
    },
    {
      id: 'm_style_outfit',
      titleEs: 'Estilo & Identidad Liceísta',
      titleEn: 'Style & School Spirit',
      descEs: `Equipar un accesorio, gorra liceísta o skin mística de exploración.`,
      descEn: `Equip a hat, explorer accessory, or special aura skin on the pet.`,
      category: 'evolution',
      icon: <Crown className="w-4 h-4 text-amber-400" />,
      isCompleted: hasEquippedCosmetic,
      progress: hasEquippedCosmetic ? 1 : 0,
      maxProgress: 1,
      badgeReward: 'ECO-FASHION',
      achievedDateText: hasEquippedCosmetic ? (currentLang === 'es' ? 'En el ropero' : 'In wardrobe') : undefined,
    },
    {
      id: 'm_first_mission',
      titleEs: 'Primera Misión de Campo',
      titleEn: 'First Field Mission',
      descEs: `Completar un minijuego ecológico junto a la mascota.`,
      descEn: `Complete an educational eco-minigame alongside the pet.`,
      category: 'games',
      icon: <Gamepad2 className="w-4 h-4 text-sky-400" />,
      isCompleted: user.gamesCompleted >= 1,
      progress: Math.min(1, user.gamesCompleted),
      maxProgress: 1,
      badgeReward: 'MINIGAME-READY',
      achievedDateText: user.gamesCompleted >= 1 ? (currentLang === 'es' ? 'Misión completada' : 'Mission complete') : undefined,
    },
    {
      id: 'm_sort_10',
      titleEs: 'Primeros 10 Residuos Clasificados',
      titleEn: 'First 10 Sorted Items',
      descEs: `Separar correctamente 10 materiales en canecas verde, blanca y negra.`,
      descEn: `Sort 10 recyclable and organic items into the official colored bins.`,
      category: 'eco',
      icon: <Recycle className="w-4 h-4 text-teal-400" />,
      isCompleted: user.wasteStats.total >= 10,
      progress: Math.min(10, user.wasteStats.total),
      maxProgress: 10,
      badgeReward: 'SORT-10',
      achievedDateText: user.wasteStats.total >= 10 ? `${user.wasteStats.total} ${currentLang === 'es' ? 'residuos' : 'items'}` : undefined,
    },
    {
      id: 'm_park_clean',
      titleEs: 'Héroe del Parque Caucasia',
      titleEn: 'Caucasia Park Hero',
      descEs: `Limpiar con éxito un sector ambiental en el juego Limpia el Parque.`,
      descEn: `Completely restore and clean a green sector in the Park Cleanup game.`,
      category: 'games',
      icon: <Leaf className="w-4 h-4 text-emerald-400" />,
      isCompleted: user.highScores.parkCleanup > 0,
      progress: user.highScores.parkCleanup > 0 ? 1 : 0,
      maxProgress: 1,
      badgeReward: 'PARK-HERO',
      achievedDateText: user.highScores.parkCleanup > 0 ? `${user.highScores.parkCleanup} pts` : undefined,
    },
    {
      id: 'm_streak_3',
      titleEs: 'Compañero Inseparable (Racha de 3 Días)',
      titleEn: 'Inseparable Companion (3-Day Streak)',
      descEs: `Visitar y cuidar a la mascota durante al menos 3 días consecutivos.`,
      descEn: `Visit and care for the pet for at least 3 consecutive days.`,
      category: 'care',
      icon: <Flame className="w-4 h-4 text-rose-500" />,
      isCompleted: user.streak >= 3,
      progress: Math.min(3, user.streak),
      maxProgress: 3,
      badgeReward: 'DEVOTED-PET',
      achievedDateText: user.streak >= 3 ? `${user.streak} ${currentLang === 'es' ? 'días' : 'days'}` : undefined,
    },
    {
      id: 'm_evolution_lvl3',
      titleEs: 'Evolución a Guardián Joven (Nivel 3)',
      titleEn: 'Ascension to Young Guardian (Lvl 3)',
      descEs: `Alcanzar el Nivel 3 y desbloquear la Fase 2 de crecimiento.`,
      descEn: `Reach Level 3 to unlock Growth Stage 2 with expanded skills.`,
      category: 'evolution',
      icon: <Award className="w-4 h-4 text-cyan-400" />,
      isCompleted: user.level >= 3,
      progress: Math.min(3, user.level),
      maxProgress: 3,
      badgeReward: 'STAGE-2',
      achievedDateText: user.level >= 3 ? (currentLang === 'es' ? `Nivel ${user.level} alcanzado` : `Lvl ${user.level} reached`) : undefined,
    },
    {
      id: 'm_sort_50',
      titleEs: 'Centinela Ambiental (50 Residuos)',
      titleEn: 'Environmental Sentinel (50 Items)',
      descEs: `Clasificar más de 50 residuos protegiendo el campus escolar.`,
      descEn: `Sort over 50 items to keep Liceo Caucasia pristine and clean.`,
      category: 'eco',
      icon: <Trophy className="w-4 h-4 text-amber-400" />,
      isCompleted: user.wasteStats.total >= 50,
      progress: Math.min(50, user.wasteStats.total),
      maxProgress: 50,
      badgeReward: 'SENTINEL-50',
      achievedDateText: user.wasteStats.total >= 50 ? `${user.wasteStats.total} ${currentLang === 'es' ? 'residuos' : 'items'}` : undefined,
    },
    {
      id: 'm_senior_lvl5',
      titleEs: 'Protector Experto (Nivel 5)',
      titleEn: 'Senior Protector (Level 5)',
      descEs: `Alcanzar el Nivel 5 de conocimiento ecológico y liderazgo.`,
      descEn: `Reach Level 5 of eco-knowledge and leadership with your pet.`,
      category: 'evolution',
      icon: <Star className="w-4 h-4 text-purple-400" />,
      isCompleted: user.level >= 5,
      progress: Math.min(5, user.level),
      maxProgress: 5,
      badgeReward: 'STAGE-3',
      achievedDateText: user.level >= 5 ? (currentLang === 'es' ? `Nivel ${user.level} alcanzado` : `Lvl ${user.level} reached`) : undefined,
    },
  ];

  // Filtered milestones
  const filteredMilestones = milestones.filter((m) => {
    if (milestoneFilter === 'completed') return m.isCompleted;
    if (milestoneFilter === 'pending') return !m.isCompleted;
    return true;
  });

  const completedCount = milestones.filter((m) => m.isCompleted).length;
  const completionPercentage = Math.round((completedCount / milestones.length) * 100);

  // Add Note Handler
  const handleAddNote = () => {
    const trimmed = newNoteText.trim();
    if (!trimmed) return;
    sound.playReward();

    const todayDate = new Date().toLocaleDateString(
      currentLang === 'es' ? 'es-ES' : 'en-US',
      { year: 'numeric', month: 'short', day: 'numeric' }
    );

    const newEntry: JournalNote = {
      id: `note_${Date.now()}`,
      date: todayDate,
      text: trimmed,
      author: user.name || (currentLang === 'es' ? 'Tutor Oficial' : 'Official Guardian'),
    };

    setNotes([newEntry, ...notes]);
    setNewNoteText('');
    setIsAddingNote(false);
  };

  const handleDeleteNote = (noteId: string) => {
    sound.playClick();
    setNotes(notes.filter((n) => n.id !== noteId));
  };

  return (
    <div className="space-y-6 select-none animate-fadeIn">
      {/* ========================================================================= */}
      {/* 1. ADOPTION CERTIFICATE & HERITAGE CARD                                   */}
      {/* ========================================================================= */}
      <div 
        id="pet-adoption-certificate-card"
        className="border rounded-3xl p-5 sm:p-7 shadow-xl relative overflow-hidden backdrop-blur-md"
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border-accent)',
          boxShadow: 'var(--card-shadow)',
        }}
      >
        {/* Certificate Decorative Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-2xl border flex items-center justify-center shrink-0 shadow-inner"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-accent)',
                color: 'var(--accent)',
              }}
            >
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
                AERIS DIVISION • LICEO CAUCASIA
              </span>
              <h2 className="text-base sm:text-lg font-black" style={{ color: 'var(--text-primary)' }}>
                {t.adoptionCertificateTitle}
              </h2>
            </div>
          </div>

          <div 
            className="self-start sm:self-auto px-3 py-1 rounded-full border text-[10px] font-bold flex items-center gap-1.5"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderColor: 'var(--border-accent)',
              color: 'var(--accent)',
            }}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ID: #AERIS-{species.toUpperCase()}-2026</span>
          </div>
        </div>

        {/* Certificate Body Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6 items-center">
          {/* Pet Visual Display (Left Column) */}
          <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-4 rounded-2xl border relative overflow-hidden"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderColor: 'var(--border)',
            }}
          >
            {/* Ambient subtle glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent pointer-events-none" />

            <div className="w-32 h-32 relative flex items-center justify-center">
              <PetAvatar 
                petInfo={petInfo} 
                size="md" 
                showMoodBubble={false}
                language={currentLang}
              />
            </div>

            <div className="mt-2 relative z-10">
              <h3 className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>
                {petInfo.name}
              </h3>
              <p className="text-[11px] font-bold mt-0.5" style={{ color: 'var(--accent)' }}>
                {getSpeciesBadge(species)}
              </p>
              <div 
                className="mt-2 text-[10px] px-2.5 py-0.5 rounded-full font-semibold inline-block border"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-muted)'
                }}
              >
                {petInfo.title || 'Guardián Místico'}
              </div>
            </div>
          </div>

          {/* Key Dates & Formal Registration Details (Right Column) */}
          <div className="md:col-span-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Adoption Date */}
              <div 
                className="p-3.5 rounded-2xl border flex items-start gap-3"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border text-sky-400 bg-sky-500/10 border-sky-500/30">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: 'var(--text-muted)' }}>
                    {t.adoptionDateLabel}
                  </span>
                  <span className="text-xs font-black block mt-0.5" style={{ color: 'var(--text-primary)' }}>
                    {formattedAdoptionDate}
                  </span>
                  <span className="text-[9.5px] text-emerald-400 font-semibold block mt-0.5">
                    {currentLang === 'es' ? 'Primer día en el Liceo' : 'First day at Liceo'}
                  </span>
                </div>
              </div>

              {/* Time Together */}
              <div 
                className="p-3.5 rounded-2xl border flex items-start gap-3"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border text-amber-400 bg-amber-500/10 border-amber-500/30">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: 'var(--text-muted)' }}>
                    {t.timeTogetherLabel}
                  </span>
                  <span className="text-xs font-black block mt-0.5" style={{ color: 'var(--text-primary)' }}>
                    {daysTogether} {t.daysTogether}
                  </span>
                  <span className="text-[9.5px] text-rose-400 font-semibold block mt-0.5">
                    {user.streak > 1 ? `${user.streak} ${currentLang === 'es' ? 'días de racha activa 🔥' : 'days active streak 🔥'}` : (currentLang === 'es' ? 'Lazo en crecimiento 🌱' : 'Bond growing 🌱')}
                  </span>
                </div>
              </div>

              {/* Official Guardian */}
              <div 
                className="p-3.5 rounded-2xl border flex items-start gap-3"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border text-emerald-400 bg-emerald-500/10 border-emerald-500/30">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: 'var(--text-muted)' }}>
                    {t.officialGuardianLabel}
                  </span>
                  <span className="text-xs font-black block mt-0.5 truncate" style={{ color: 'var(--text-primary)' }}>
                    {user.name || (currentLang === 'es' ? 'Agente Eco' : 'Eco Agent')}
                  </span>
                  <span className="text-[9.5px] font-semibold block mt-0.5" style={{ color: 'var(--text-muted)' }}>
                    {user.schoolGrade || 'Liceo Caucasia'}
                  </span>
                </div>
              </div>

              {/* Campus Location */}
              <div 
                className="p-3.5 rounded-2xl border flex items-start gap-3"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border text-purple-400 bg-purple-500/10 border-purple-500/30">
                  <Leaf className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: 'var(--text-muted)' }}>
                    {t.schoolCampusLabel}
                  </span>
                  <span className="text-xs font-black block mt-0.5" style={{ color: 'var(--text-primary)' }}>
                    Liceo Caucasia
                  </span>
                  <span className="text-[9.5px] font-semibold block mt-0.5" style={{ color: 'var(--text-muted)' }}>
                    Sede Central • Caucasia, Antioquia
                  </span>
                </div>
              </div>
            </div>

            {/* Affection & Care Status Banner */}
            <div 
              className="p-3 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-accent)',
              }}
            >
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span className="font-bold" style={{ color: 'var(--text-secondary)' }}>
                  {t.affectionBondLabel}:
                </span>
                <span className="font-black text-rose-400">
                  {petInfo.petAffectionEnergy ?? 100}%
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px]">
                <Utensils className="w-3.5 h-3.5 text-emerald-400" />
                <span style={{ color: 'var(--text-muted)' }}>
                  {currentLang === 'es' ? 'Comida Predilecta:' : 'Favorite Food:'}
                </span>
                <span className="font-bold text-emerald-400">
                  {petInfo.favoriteFood || 'Pescado Sostenible'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. GROWTH & EVOLUTION STAGES TRACK                                        */}
      {/* ========================================================================= */}
      <div 
        className="border rounded-3xl p-5 sm:p-6 space-y-4 backdrop-blur-md"
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5" style={{ color: 'var(--accent)' }} />
            <div>
              <h3 className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>
                {t.growthStagesTitle}
              </h3>
              <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                {currentLang === 'es' 
                  ? `Etapa actual: ${currentStage.nameEs} (Nivel ${user.level})` 
                  : `Current stage: ${currentStage.nameEn} (Level ${user.level})`}
              </p>
            </div>
          </div>

          <div 
            className="px-3 py-1 rounded-full border text-xs font-black flex items-center gap-1.5 self-start sm:self-auto"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderColor: 'var(--border-accent)',
              color: 'var(--accent)',
            }}
          >
            <span>{currentLang === 'es' ? 'Fase' : 'Stage'} {currentStageIndex + 1} / 4</span>
          </div>
        </div>

        {/* Stages Timeline Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {growthStages.map((stg, idx) => {
            const isCompleted = user.level > stg.maxLevel;
            const isCurrent = user.level >= stg.minLevel && user.level <= stg.maxLevel;
            const isLocked = user.level < stg.minLevel;

            return (
              <div 
                key={stg.stage}
                className="p-4 rounded-2xl border flex flex-col justify-between relative transition-all"
                style={{
                  backgroundColor: isCurrent 
                    ? 'var(--bg-primary)' 
                    : isCompleted 
                    ? 'var(--bg-primary)' 
                    : 'var(--surface)',
                  borderColor: isCurrent 
                    ? 'var(--accent)' 
                    : isCompleted 
                    ? 'var(--border-accent)' 
                    : 'var(--border)',
                  opacity: isLocked ? 0.7 : 1,
                  boxShadow: isCurrent ? '0 0 16px var(--glow)' : 'none',
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-8 h-8 rounded-xl border flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: 'var(--surface)',
                        borderColor: isCurrent ? 'var(--accent)' : 'var(--border)',
                      }}
                    >
                      {stg.icon}
                    </div>

                    <span 
                      className="text-[9px] font-black px-2 py-0.5 rounded-full border"
                      style={{
                        backgroundColor: isCurrent 
                          ? 'var(--accent)' 
                          : isCompleted 
                          ? 'rgba(16,185,129,0.15)' 
                          : 'var(--surface)',
                        color: isCurrent 
                          ? '#ffffff' 
                          : isCompleted 
                          ? '#34d399' 
                          : 'var(--text-muted)',
                        borderColor: isCurrent 
                          ? 'var(--accent)' 
                          : isCompleted 
                          ? 'rgba(16,185,129,0.3)' 
                          : 'var(--border)',
                      }}
                    >
                      {isCompleted 
                        ? (currentLang === 'es' ? 'Completado' : 'Completed') 
                        : isCurrent 
                        ? (currentLang === 'es' ? 'Fase Activa' : 'Active Stage') 
                        : (currentLang === 'es' ? 'Bloqueado' : 'Locked')}
                    </span>
                  </div>

                  <h4 className="text-xs font-black mt-3" style={{ color: 'var(--text-primary)' }}>
                    {currentLang === 'es' ? stg.nameEs : stg.nameEn}
                  </h4>
                  <span className="text-[10px] font-bold block mt-0.5" style={{ color: 'var(--accent)' }}>
                    {stg.levelReq}
                  </span>

                  <p className="text-[10px] mt-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {currentLang === 'es' ? stg.descEs : stg.descEn}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex items-center justify-between text-[9px] font-bold">
                    <span style={{ color: 'var(--text-muted)' }}>{currentLang === 'es' ? 'Progreso' : 'Progress'}</span>
                    <span style={{ color: isCompleted || isCurrent ? 'var(--accent)' : 'var(--text-muted)' }}>
                      {isCompleted ? '100%' : isCurrent ? `${Math.round(((user.level - stg.minLevel + 0.5) / (stg.maxLevel - stg.minLevel + 1)) * 100)}%` : '0%'}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full overflow-hidden mt-1" style={{ backgroundColor: 'var(--border)' }}>
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: isCompleted ? '100%' : isCurrent ? `${Math.min(100, Math.max(20, Math.round(((user.level - stg.minLevel + 0.5) / (stg.maxLevel - stg.minLevel + 1)) * 100)))}%` : '0%',
                        backgroundColor: isCurrent ? 'var(--accent)' : '#34d399',
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MILESTONES ACHIEVED (HITOS ALCANZADOS)                                  */}
      {/* ========================================================================= */}
      <div 
        id="pet-milestones-section"
        className="border rounded-3xl p-5 sm:p-6 space-y-4 backdrop-blur-md"
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Trophy className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>
                {t.milestonesTitle}
              </h3>
              <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                {completedCount} / {milestones.length} {t.milestonesReachedLabel} ({completionPercentage}%)
              </p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl border self-start sm:self-auto"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderColor: 'var(--border)',
            }}
          >
            <button
              onClick={() => { sound.playClick(); setMilestoneFilter('all'); }}
              className={`px-3 py-1 rounded-xl text-[10px] font-extrabold transition-all cursor-pointer ${
                milestoneFilter === 'all' ? 'shadow-sm text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
              style={{
                backgroundColor: milestoneFilter === 'all' ? 'var(--accent)' : 'transparent',
              }}
            >
              {t.allMilestonesFilter} ({milestones.length})
            </button>
            <button
              onClick={() => { sound.playClick(); setMilestoneFilter('completed'); }}
              className={`px-3 py-1 rounded-xl text-[10px] font-extrabold transition-all cursor-pointer ${
                milestoneFilter === 'completed' ? 'shadow-sm text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
              style={{
                backgroundColor: milestoneFilter === 'completed' ? 'var(--accent)' : 'transparent',
              }}
            >
              {t.completedFilter} ({completedCount})
            </button>
            <button
              onClick={() => { sound.playClick(); setMilestoneFilter('pending'); }}
              className={`px-3 py-1 rounded-xl text-[10px] font-extrabold transition-all cursor-pointer ${
                milestoneFilter === 'pending' ? 'shadow-sm text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
              style={{
                backgroundColor: milestoneFilter === 'pending' ? 'var(--accent)' : 'transparent',
              }}
            >
              {t.inProgressFilter} ({milestones.length - completedCount})
            </button>
          </div>
        </div>

        {/* Overall Milestones Progress Bar */}
        <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
          <div 
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${completionPercentage}%`,
              backgroundColor: 'var(--accent)',
            }}
          />
        </div>

        {/* Milestones Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {filteredMilestones.map((m) => (
            <div
              key={m.id}
              className="p-3.5 rounded-2xl border flex items-start gap-3.5 transition-all"
              style={{
                backgroundColor: m.isCompleted ? 'var(--bg-primary)' : 'var(--surface)',
                borderColor: m.isCompleted ? 'var(--border-accent)' : 'var(--border)',
                opacity: m.isCompleted ? 1 : 0.85,
              }}
            >
              {/* Icon / Status Badge */}
              <div 
                className="w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 shadow-sm"
                style={{
                  backgroundColor: m.isCompleted ? 'var(--surface)' : 'var(--bg-primary)',
                  borderColor: m.isCompleted ? 'var(--border-accent)' : 'var(--border)',
                }}
              >
                {m.isCompleted ? m.icon : <Lock className="w-4 h-4 text-slate-500" />}
              </div>

              {/* Milestone Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1.5">
                  <h4 
                    className="text-xs font-black truncate"
                    style={{ color: m.isCompleted ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                  >
                    {currentLang === 'es' ? m.titleEs : m.titleEn}
                  </h4>
                  {m.isCompleted ? (
                    <span 
                      className="px-2 py-0.5 rounded-full text-[9px] font-black border shrink-0 flex items-center gap-1"
                      style={{
                        backgroundColor: 'rgba(16, 185, 129, 0.15)',
                        borderColor: 'rgba(16, 185, 129, 0.35)',
                        color: '#34d399',
                      }}
                    >
                      <Check className="w-2.5 h-2.5" />
                      <span>{currentLang === 'es' ? 'Alcanzado' : 'Achieved'}</span>
                    </span>
                  ) : (
                    <span 
                      className="px-2 py-0.5 rounded-full text-[9px] font-bold border shrink-0"
                      style={{
                        backgroundColor: 'var(--surface)',
                        borderColor: 'var(--border)',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {m.progress}/{m.maxProgress}
                    </span>
                  )}
                </div>

                <p className="text-[10px] mt-1 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {currentLang === 'es' ? m.descEs : m.descEn}
                </p>

                {/* Achieved Date or Progress Bar */}
                <div className="mt-2.5 flex items-center justify-between gap-2">
                  {m.isCompleted && m.achievedDateText ? (
                    <div className="flex items-center gap-1 text-[9.5px] font-semibold text-emerald-400">
                      <Calendar className="w-3 h-3" />
                      <span>{m.achievedDateText}</span>
                    </div>
                  ) : (
                    <div className="w-full">
                      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
                        <div 
                          className="h-full rounded-full"
                          style={{
                            width: `${(m.progress / m.maxProgress) * 100}%`,
                            backgroundColor: 'var(--accent)',
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <span 
                    className="text-[8.5px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border shrink-0"
                    style={{
                      backgroundColor: 'var(--surface)',
                      borderColor: 'var(--border)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {m.badgeReward}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. GROWTH NOTES & FIELD MEMORIES                                          */}
      {/* ========================================================================= */}
      <div 
        className="border rounded-3xl p-5 sm:p-6 space-y-4 backdrop-blur-md"
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
        }}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5" style={{ color: 'var(--accent)' }} />
            <div>
              <h3 className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>
                {t.growthNotesTitle}
              </h3>
              <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                {currentLang === 'es' 
                  ? 'Anotaciones y anécdotas del proceso de crianza y convivencia escolar' 
                  : 'Personal notes and memorable moments during school eco-adventures'}
              </p>
            </div>
          </div>

          {!isAddingNote && (
            <button
              onClick={() => { sound.playClick(); setIsAddingNote(true); }}
              className="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-accent)',
                color: 'var(--accent)',
              }}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{currentLang === 'es' ? 'Escribir Recuerdo' : 'Add Note'}</span>
            </button>
          )}
        </div>

        {/* Input box for new note */}
        {isAddingNote && (
          <div 
            className="p-4 rounded-2xl border space-y-3"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderColor: 'var(--border-accent)',
            }}
          >
            <label className="text-xs font-bold block" style={{ color: 'var(--text-primary)' }}>
              {currentLang === 'es' ? 'Nuevo Recuerdo con tu Mascota:' : 'New Memory with your Pet:'}
            </label>
            <textarea
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              placeholder={currentLang === 'es' ? 'Ej: Hoy Aeris me acompañó a reciclar 3 botellas en el recreo...' : 'E.g., Today we sorted plastic bottles during recess together...'}
              rows={3}
              maxLength={240}
              className="w-full p-3 rounded-xl border text-xs outline-none resize-none transition-colors"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
                color: 'var(--text-primary)',
              }}
            />
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => { setIsAddingNote(false); setNewNoteText(''); }}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer"
                style={{ color: 'var(--text-muted)' }}
              >
                {currentLang === 'es' ? 'Cancelar' : 'Cancel'}
              </button>
              <button
                onClick={handleAddNote}
                disabled={!newNoteText.trim()}
                className="px-4 py-1.5 rounded-xl text-xs font-bold text-white transition-all cursor-pointer disabled:opacity-50"
                style={{
                  backgroundColor: 'var(--accent)',
                }}
              >
                {currentLang === 'es' ? 'Guardar en el Diario' : 'Save to Journal'}
              </button>
            </div>
          </div>
        )}

        {/* Notes Timeline List */}
        <div className="space-y-3 pt-1">
          {notes.map((note) => (
            <div
              key={note.id}
              className="p-3.5 rounded-2xl border flex items-start justify-between gap-3 transition-colors"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border)',
              }}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[10px] font-bold">
                  <span className="text-sky-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {note.date}
                  </span>
                  <span style={{ color: 'var(--text-muted)' }}>•</span>
                  <span style={{ color: 'var(--accent)' }}>{note.author}</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                  {note.text}
                </p>
              </div>

              {notes.length > 1 && (
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  title={currentLang === 'es' ? 'Eliminar nota' : 'Delete note'}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 transition-colors cursor-pointer shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
