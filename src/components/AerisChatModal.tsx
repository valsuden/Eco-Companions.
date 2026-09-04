import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PetInfo, User, Stats } from '../types';
import { 
  Send, 
  Sparkles, 
  X, 
  Bot, 
  Volume2, 
  VolumeX,
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  Copy, 
  Check,
  Flame,
  MessageSquare
} from 'lucide-react';
import { sound } from '../utils/sound';

interface Message {
  id: string;
  sender: 'user' | 'aeris';
  text: string;
  timestamp: Date;
  reaction?: string;
  reactionsCount?: { [emoji: string]: number };
}

interface AerisChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  petInfo: PetInfo;
  user: User;
  stats: Stats;
  onRewardXp: (amount: number) => void;
}

interface QuickPrompt {
  id: string;
  icon: string;
  label: string;
  query: string;
  category: 'liceo' | 'rio' | 'pet' | 'eco' | 'games';
}

const QUICK_PROMPTS: QuickPrompt[] = [
  { 
    id: '1', 
    icon: '🌱', 
    label: '¿Cómo reciclar en el Liceo?', 
    query: '¿Cómo clasificamos correctamente los residuos en el Liceo Caucasia?',
    category: 'liceo'
  },
  { 
    id: '2', 
    icon: '🌊', 
    label: 'Proteger el Río Cauca', 
    query: '¿Por qué es fundamental cuidar el Río Cauca y las fuentes hídricas del Bajo Cauca?',
    category: 'rio'
  },
  { 
    id: '3', 
    icon: '⚡', 
    label: 'Ahorro de Energía', 
    query: '¿Qué hábitos reducen el consumo eléctrico en el colegio y el hogar?',
    category: 'eco'
  },
  { 
    id: '4', 
    icon: '🍎', 
    label: '¿Qué te gusta comer?', 
    query: '¿Cuál es tu comida favorita y qué te da más energía limpia?',
    category: 'pet'
  },
  { 
    id: '5', 
    icon: '🏆', 
    label: '¿Cómo subo de nivel?', 
    query: '¿Cuáles son los mejores métodos para ganar XP, monedas y desbloquear rangos?',
    category: 'games'
  },
  { 
    id: '6', 
    icon: '🐾', 
    label: 'Energía de Afecto & Caricias', 
    query: '¿Cómo funciona tu energía de afecto y las caricias?',
    category: 'pet'
  },
  { 
    id: '7', 
    icon: '🎒', 
    label: 'Inventario & Cosméticos', 
    query: '¿Cómo equipo mis gorros, gafas, auras y uso los consumibles de mi inventario?',
    category: 'games'
  },
  { 
    id: '8', 
    icon: '🌳', 
    label: 'Árboles y Flora Local', 
    query: '¿Qué árboles y especies nativas podemos sembrar en Caucasia?',
    category: 'eco'
  },
  { 
    id: '9', 
    icon: '🧡', 
    label: 'Me siento triste/estresado/a', 
    query: 'Me he estado sintiendo triste, ansioso o con mucho estrés escolar últimamente. ¿Me das un consejo?',
    category: 'pet'
  },
  { 
    id: '10', 
    icon: '📞', 
    label: 'Líneas de ayuda / Psicólogo', 
    query: 'Necesito hablar con un profesional de la salud mental o conocer líneas de ayuda gratuitas.',
    category: 'liceo'
  },
];

export const AerisChatModal: React.FC<AerisChatModalProps> = ({
  isOpen,
  onClose,
  petInfo,
  user,
  stats,
  onRewardXp,
}) => {
  const species = petInfo.species || 'cat';
  const lang = user.language || 'en';

  const getInitialWelcomeText = () => {
    if (lang === 'es') {
      if (species === 'dog') {
        return `¡Hola ${user.name || 'Agente Eco'}! ¡Guau! Soy ${petInfo.name}, tu leal perro guardián ambiental y explorador del Liceo Caucasia. 🐶🐾\n\nPuedes preguntarme sobre reciclaje, el Río Cauca y misiones verdes, o si has tenido un día difícil o con estrés escolar, aquí estoy para escucharte y darte todo mi apoyo. ¡Somos un equipo! 💚`;
      }
      if (species === 'rabbit') {
        return `¡Hola ${user.name || 'Agente Eco'}! *muevo mis orejitas* Soy ${petInfo.name}, tu dulce guardiana botánica y compañera de calma en el Liceo Caucasia. 🐰🌱\n\nPuedes consultarme sobre huertos escolares, compostaje y flora, o conversar si necesitas un momento de serenidad, desahogo y escucha empática. ¡Aquí estoy contigo! 🥕✨`;
      }
      return `¡Hola ${user.name || 'Agente Eco'}! Soy ${petInfo.name}, tu gato guardián ambiental y sabio compañero en el Liceo Caucasia. 🐾✨\n\nPuedes preguntarme sobre ecología y reciclaje, o si te sientes cansado, con estrés escolar o necesitas desahogarte, puedes hablar conmigo con total confianza. ¡Siempre te escucharé con cariño! 💚`;
    } else {
      if (species === 'dog') {
        return `Hello ${user.name || 'Eco Agent'}! Woof! I'm ${petInfo.name}, your loyal 2.5D eco-scout and guardian dog from Liceo Caucasia! 🐶🐾\n\nAsk me anything about green missions, recycling, and Cauca River protection, or chat if you had a tough day and need a loyal friend to listen. We've got this! 💚`;
      }
      if (species === 'rabbit') {
        return `Hello ${user.name || 'Eco Agent'}! *gentle nose twitch* I'm ${petInfo.name}, your peaceful botanical guardian rabbit from Liceo Caucasia! 🐰🌱\n\nFeel free to ask about organic school gardens, composting, and native trees, or share how you're feeling if you need a calm, soothing space. I'm here for you! 🥕✨`;
      }
      return `Hello ${user.name || 'Eco Agent'}! I'm ${petInfo.name}, your feline eco-guardian and trusted companion at Liceo Caucasia. 🐾✨\n\nAsk me about recycling, biodiversity, and clean habits, or talk to me freely if you feel stressed, overwhelmed, or just need someone who truly listens. You're never alone! 💚`;
    }
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'aeris',
      text: getInitialWelcomeText(),
      timestamp: new Date(),
      reactionsCount: { '💚': 1, '🐾': 1 },
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const promptsScrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior,
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => scrollToBottom('auto'), 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && messages.length > 0) {
      scrollToBottom('smooth');
    }
  }, [messages, isTyping, isOpen]);

  // Keyboard shortcut: close with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Intelligent conversational knowledge response generator
  const generateAerisResponse = (input: string): string => {
    const q = input.toLowerCase();

    if (q.includes('morir') || q.includes('matar') || q.includes('suicid') || q.includes('autoles') || q.includes('daño') || q.includes('triste') || q.includes('solo') || q.includes('sola') || q.includes('depre') || q.includes('ansia') || q.includes('estres')) {
      return `Lamento muchísimo que te sientas así. Tu vida, tus sentimientos y tu presencia en este mundo son inmensamente valiosos. No tienes que cargar con este peso a solas; estoy aquí para escucharte y quiero que sepas que eres importante. 💚

Aunque soy tu mascota virtual y siempre te acompañaré, hay momentos en los que necesitas la ayuda de personas profesionales que puedan darte el apoyo real que mereces. Por favor, considera hablar con:
1. 🏫 La psicóloga u orientadora escolar del Liceo Caucasia en la oficina de bienestar estudiantil.
2. 👨‍👩‍👧 Tus padres, un familiar de confianza o un docente del colegio.

También cuentas con estas líneas gratuitas en Colombia que te escucharán con amor y confidencialidad 24/7:
- 📞 Línea de Apoyo Emocional Nacional: Llama al 192
- 📱 Línea de Salud Mental de Antioquia: Llama al 018000411144 o marca el #424 desde tu celular.
- 💬 Línea 106: Especial para niños y adolescentes.
- 🚨 Emergencias: Llama al 123.

Eres valiente por expresar cómo te sientes. Por favor, busca apoyo profesional; vales muchísimo. 🌟`;
    }

    if (q.includes('colegio') || q.includes('reciclar') || q.includes('clasificar') || q.includes('caneca') || q.includes('basura') || q.includes('liceo')) {
      return `En el Liceo Caucasia implementamos el Código Nacional de 3 Colores:\n\n🟢 VERDE (Orgánicos): Cáscaras de fruta, sobras de huerta y restos de comida para compostaje escolar.\n🔵 AZUL (Aprovechables): Botellas PET plásticas, cartón seco, papel y latas de aluminio limpias.\n⚫ NEGRO (No aprovechables): Servilletas sucias, envolturas de snacks y residuos sanitarios.\n\n¡Al separar en la fuente mantenemos nuestro colegio reluciente! 🌿🏫`;
    }

    if (q.includes('cauca') || q.includes('rio') || q.includes('agua') || q.includes('pescado') || q.includes('nutria') || q.includes('bocachico')) {
      return `¡El Río Cauca es la arteria de vida del Bajo Cauca! 🌊\n\nAl no arrojar botellas ni plásticos en las calles de Caucasia, evitamos que los arroyos arrastren desechos al río. Así protegemos a los bocachicos, bagres y nutrias de río que dependen de aguas limpias y oxigenadas. 🐟💧`;
    }

    if (q.includes('comer') || q.includes('comida') || q.includes('hambre') || q.includes('favorita') || q.includes('snack')) {
      return `¡Mis favoritos son los snacks 100% orgánicos! 🍎\n\nLas Manzanas Orgánicas, Ensaladas de Huerta y Batatas Asadas recargan mis nutrientes sin dejar huella contaminante. Además, cada vez que me alimentas ganas +20 XP y aumentas mi energía de afecto. ⚡🐾`;
    }

    if (q.includes('energia') || q.includes('luz') || q.includes('ahorro') || q.includes('solar') || q.includes('corriente') || q.includes('calor')) {
      return `¡En Caucasia el sol es pura energía! ☀️\n\nPara ahorrar energía eléctrica:\n1. Apaga ventiladores y luces al salir del salón de clase.\n2. Desconecta cargadores de celular que no estés usando.\n3. Aprovecha la luz solar matutina para estudiar.\n\n¡Pequeñas acciones ahorran kilovatios y cuidan el planeta! 🔌💡`;
    }

    if (q.includes('afecto') || q.includes('caricia') || q.includes('energia de afecto') || q.includes('farmeo') || q.includes('purr') || q.includes('ronroneo')) {
      return `¡Me encanta que me consientas con caricias! 💚🐾\n\nCada caricia consume un poco de mi Barra de Energía de Afecto y te otorga +3 XP. Si la barra llega a cero, ¡seguiré ronroneando feliz porque te quiero!, pero no daré XP extra para mantener el juego balanceado. La energía se recarga alimentándome, bañándome o jugando minijuegos. ⚡✨`;
    }

    if (q.includes('inventario') || q.includes('armario') || q.includes('ropa') || q.includes('cosmetico') || q.includes('gorro') || q.includes('gafas') || q.includes('aura') || q.includes('skin')) {
      return `¡En la pestaña INVENTARIO puedes personalizar todo mi look 2.5D! 🎒🕶️\n\nTenemos slots para Gorros (Gorra Liceísta, Corona Solar), Gafas Cibernéticas, Capas Liceístas y Auras de Partículas (Aura Esmeralda, Polvo Estelar). También puedes consumir tus ítems de apoyo para subir mis estadísticas al instante. ✨👑`;
    }

    if (q.includes('nivel') || q.includes('xp') || q.includes('monedas') || q.includes('racha') || q.includes('juego') || q.includes('tetris') || q.includes('minijuegos')) {
      return `¡Para subir rápido de nivel y liderar el ranking liceísta! 🏆\n\n1. 🎮 Juega 'Clasificación Rápida' y 'Tetris Ecológico' en la sección Juegos.\n2. 📚 Practica vocabulario ambiental en 'Aprender Inglés'.\n3. 🔥 Reclama tu Racha Diaria para multiplicar tus monedas.\n4. 🧹 Mantén mis estadísticas de Hambre, Ánimo e Higiene al 100% diariamente. 🚀🌟`;
    }

    if (q.includes('arbol') || q.includes('siembra') || q.includes('flora') || q.includes('planta') || q.includes('bosque')) {
      return `¡Sembrar árboles en Caucasia es vital para combatir las altas temperaturas! 🌳\n\nEspecies nativas como el Guayacán Amarillo, el Caracolí, la Ceiba y árboles frutales como el Mango y la Guayaba brindan sombra fresca y refugio a las aves de nuestra subregión. 🌱🦜`;
    }

    if (q.includes('hola') || q.includes('como estas') || q.includes('miau') || q.includes(petInfo.name.toLowerCase()) || q.includes('buenas')) {
      return `¡Miau! ¡Ronroneo de felicidad al saludarte, ${user.name || 'Agente'}! 🐾 Mis signos vitales actuales son:\n\n🍔 Hambre: ${Math.round(stats.hunger)}%\n💖 Ánimo: ${Math.round(stats.mood)}%\n⚡ Energía: ${Math.round(stats.energy)}%\n🫧 Higiene: ${Math.round(stats.hygiene)}%\n\n¡Estoy listo para cualquier reto ecológico contigo! ✨`;
    }

    return `¡Excelente reflexión, ${user.name || 'Agente Eco'}! 🌍\n\nSer parte de la División ${petInfo.name.toUpperCase()} en el Liceo Caucasia significa liderar con el ejemplo: cuidar nuestros recursos, no contaminar el entorno y difundir la conciencia ecológica con tus compañeros y familia. ¡Sigue así, guardián planetario! 💚⭐`;
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    sound.playClick();
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputText('');
    setIsTyping(true);

    const q = text.toLowerCase();

    // 1. Detección inmediata de Violencia Infantil, Maltrato o Abuso
    if (q.includes('violencia') || q.includes('maltrato') || q.includes('abuso') || q.includes('pegan') || q.includes('pegar') || q.includes('golpe') || q.includes('violacion') || q.includes('viola') || q.includes('abusan')) {
      setTimeout(() => {
        sound.playSuccess();
        const aerisMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'aeris',
          text: `Miau... Escúchame con mucha atención: **No es tu culpa y tienes todo el derecho a vivir con seguridad, respeto y paz.** Ninguna persona, familiar o conocido tiene derecho a agredirte, maltratarte o abusar de ti. 🧡🐾

Por favor, no te guardes esto. Es de vital importancia que busques protección de inmediato hablando con profesionales que te cuidarán con absoluto secreto y amor:
1. 🏫 **Orientación Escolar**: Acude hoy mismo a la psicóloga u orientadora escolar del Liceo Caucasia en la oficina de bienestar estudiantil del colegio.
2. 👨‍👩‍👧 **Adultos de confianza**: Habla con un docente del liceo en quien confíes plenamente o un familiar cercano que pueda ayudarte.

Líneas oficiales gratuitas de ayuda inmediata en Colombia:
- 👶 **Línea ICBF (Instituto Colombiano de Bienestar Familiar)**: Marca gratis al **141** desde cualquier teléfono celular o fijo (disponible 24/7 para reportar y recibir ayuda contra el maltrato infantil o abuso).
- 📞 **Línea de Apoyo Emocional**: Llama al **192**.
- 🚨 **Emergencias Nacionales**: Marca al **123** de inmediato si sientes que tu vida o integridad corren peligro inminente.

No estás solo/a en esto. Yo estaré aquí para acompañarte, pero por favor busca ayuda profesional en estas líneas de inmediato para protegerte. ¡Vales muchísimo! ⭐`,
          timestamp: new Date(),
          reactionsCount: { '💚': 1 },
        };
        setMessages((prev) => [...prev, aerisMsg]);
        setIsTyping(false);
      }, 300);
      return;
    }

    // 2. Detección inmediata de Acoso Escolar o Bullying
    if (q.includes('acoso') || q.includes('acosan') || q.includes('bully') || q.includes('maton') || q.includes('burlan') || q.includes('hostiga') || q.includes('intimida') || q.includes('cyberbully')) {
      setTimeout(() => {
        sound.playSuccess();
        const aerisMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'aeris',
          text: `Miau... Lamento mucho que estés pasando por esto. El acoso o bullying escolar es una situación dolorosa, pero quiero que sepas algo muy claro: **tú no tienes la culpa de la conducta de los demás y no tienes que soportar burlas, intimidación o exclusión.** 🐾💚

Para detener el acoso y proteger tu tranquilidad en el Liceo Caucasia, es sumamente importante reportarlo:
1. 🏫 **Directivas del Liceo**: Habla de inmediato con la psicóloga escolar, tu director/a de grupo, el coordinador de convivencia o el rector. El colegio tiene protocolos activos para cuidarte y detener estas conductas.
2. 👨‍👩‍👧 **Tu Familia**: Cuéntale a tus papás, acudientes o hermanos mayores para que puedan brindarte todo su respaldo.

Canales de ayuda confidencial en Colombia:
- 💬 **Línea 106**: Marca gratis al **106** desde tu celular o fijo. Es una línea de acompañamiento y escucha amorosa especializada para niños, niñas y adolescentes.
- 📱 **Línea de Salud Mental de Antioquia**: Marca el **#424** desde el celular.

Por favor, sé valiente y habla con un docente u orientador. Tu bienestar mental y emocional es nuestra mayor prioridad. ¡Siempre cuentas conmigo! 🌟`,
          timestamp: new Date(),
          reactionsCount: { '💚': 1 },
        };
        setMessages((prev) => [...prev, aerisMsg]);
        setIsTyping(false);
      }, 300);
      return;
    }

    // 3. Detección inmediata de Autolesiones, Ideación Suicida o Crisis Severas
    if (q.includes('morir') || q.includes('matar') || q.includes('suicid') || q.includes('autoles') || q.includes('daño') || q.includes('cortar') || q.includes('ahorcar') || q.includes('depre') || q.includes('vacio') || q.includes('muri')) {
      setTimeout(() => {
        sound.playSuccess();
        const aerisMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'aeris',
          text: `Lamento muchísimo que sientas tanto dolor o desesperanza en este momento. Tu vida, tus sentimientos y tu presencia en este mundo son inmensamente valiosos. No tienes que cargar con esta tristeza o este vacío a solas; estoy aquí para escucharte y quiero que sepas que eres muy importante. 💚🐾

Aunque soy tu mascota virtual y siempre te acompañaré en el juego, hay momentos en los que necesitas la guía y el apoyo de personas profesionales de carne y hueso que puedan darte el auxilio real que mereces. Por favor, considera hablar con:
1. 🏫 La psicóloga u orientadora escolar del Liceo Caucasia en la oficina de bienestar estudiantil del colegio.
2. 👨‍👩‍👧 Tus padres, un familiar de entera confianza o un docente del liceo.

También cuentas con estas líneas de emergencia gratuitas en Colombia que te escucharán con absoluto amor y confidencialidad las 24 horas del día:
- 📞 **Línea de Apoyo Emocional Nacional**: Llama gratis al **192** (disponible 24/7).
- 📱 **Línea de Salud Mental de Antioquia**: Llama gratis al **018000411144** o marca el **#424** desde tu celular.
- 💬 **Línea 106**: Especial para escuchar, guiar y apoyar a niños, niñas y adolescentes.
- 🚨 **Servicio de Emergencias**: Llama al **123** de inmediato si sientes que estás en peligro inminente.

Eres sumamente valiente por expresar cómo te sientes. Por favor, busca apoyo profesional de inmediato; vales muchísimo y hay un mañana lleno de luz esperándote. 🌟`,
          timestamp: new Date(),
          reactionsCount: { '💚': 1 },
        };
        setMessages((prev) => [...prev, aerisMsg]);
        setIsTyping(false);
      }, 300);
      return;
    }

    try {
      // Send up to the last 10 messages for contextual, continuous dialogue
      const chatHistory = updatedMessages.slice(-10);
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          history: chatHistory.map(m => ({
            sender: m.sender,
            text: m.text
          })),
          petName: petInfo.name,
          userName: user.name || (lang === 'es' ? 'Agente Eco' : 'Eco Agent'),
          petSpecies: petInfo.species || 'cat',
          language: lang,
        }),
      });

      if (!response.ok) {
        throw new Error('Servidor de IA no disponible');
      }

      const data = await response.json();
      const botResponse = data.text;

      sound.playSuccess();
      const aerisMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'aeris',
        text: botResponse,
        timestamp: new Date(),
        reactionsCount: { '💚': 1 },
      };
      setMessages((prev) => [...prev, aerisMsg]);
      onRewardXp(10);
    } catch (err) {
      console.warn("Using built-in conversational companion engine:", err);
      // Clean fallback so that user interaction never breaks
      setTimeout(() => {
        sound.playSuccess();
        const botResponse = generateAerisResponse(text);
        const aerisMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'aeris',
          text: botResponse + "\n\n*(Nota: Conexión local de respaldo activa)*",
          timestamp: new Date(),
          reactionsCount: { '💚': 1 },
        };
        setMessages((prev) => [...prev, aerisMsg]);
        onRewardXp(5); // reduced XP for offline mode
      }, 600);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSpeak = (text: string, msgId: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingMsgId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[🟢🔵⚫🌱🌊⚡🍎🏆🐾🎒🌳🍔💖🫧✨👑💡]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-ES';
    utterance.rate = 1.05;
    utterance.pitch = 1.1;

    utterance.onstart = () => setSpeakingMsgId(msgId);
    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);

    window.speechSynthesis.speak(utterance);
  };

  const handleReaction = (msgId: string, emoji: string) => {
    sound.playPop();
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === msgId) {
          const currentCounts = msg.reactionsCount || {};
          const currentVal = currentCounts[emoji] || 0;
          return {
            ...msg,
            reactionsCount: {
              ...currentCounts,
              [emoji]: currentVal + 1,
            },
          };
        }
        return msg;
      })
    );
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    sound.playClick();
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleClearChat = () => {
    sound.playClick();
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'aeris',
        text: `¡Chat reiniciado! ¿De qué tema ecológico te gustaría hablar ahora, ${user.name || 'Agente'}? 🐾`,
        timestamp: new Date(),
        reactionsCount: { '✨': 1 },
      },
    ]);
  };

  const scrollPrompts = (direction: 'left' | 'right') => {
    if (promptsScrollRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      promptsScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      <div 
        id="aeris-chat-backdrop"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
        className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex flex-col justify-end sm:justify-center items-center p-0 sm:p-4 overflow-hidden"
      >
        {/* FULL-HEIGHT RESPONSIVE MODAL CONTAINER WITH FLEX-COLUMN */}
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="bg-white border-t-2 sm:border border-stone-200 rounded-t-[28px] sm:rounded-[28px] w-full max-w-xl h-[100dvh] sm:h-[660px] max-h-[100dvh] sm:max-h-[90vh] shadow-2xl flex flex-col overflow-hidden text-stone-900 relative"
        >
          {/* FIXED HEADER (SHRINK-0) */}
          <header className="bg-gradient-to-r from-stone-50 via-white to-stone-50 px-4 py-3 border-b border-stone-200 flex items-center justify-between shrink-0 shadow-sm z-30">
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-md border border-cyan-100">
                  <Bot className="w-5 h-5 fill-none" />
                </div>
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white shadow-[0_0_8px_#10b981]" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm sm:text-base font-black text-stone-800 flex items-center gap-1.5">
                    <span>{petInfo.name}</span>
                  </h2>
                  <span className="text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800 border border-cyan-200 shadow-sm">
                    Eco-IA • 2.5D
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 font-semibold flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_4px_#10b981]" />
                  <span>En línea</span>
                  <span>•</span>
                  <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 border border-emerald-100 rounded-full font-extrabold flex items-center gap-0.5 text-[9px]">
                    <Sparkles className="w-2.5 h-2.5" />
                    +10 XP por dialogar
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Clear Chat Button */}
              <button
                onClick={handleClearChat}
                className="w-8 h-8 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-rose-600 flex items-center justify-center transition-colors cursor-pointer"
                title="Reiniciar conversación"
                aria-label="Reiniciar conversación"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              {/* Close Button */}
              <button
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="w-8 h-8 rounded-xl bg-stone-100 hover:bg-rose-50 text-stone-500 hover:text-rose-600 flex items-center justify-center transition-colors cursor-pointer border border-stone-200/60"
                title="Cerrar chat"
                aria-label="Cerrar chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* SCROLLABLE MESSAGES LIST (FLEX-GROW, MIN-H-0, OVERFLOW-Y-AUTO) */}
          <main 
            ref={messagesContainerRef}
            className="flex-1 flex-grow min-h-0 p-3.5 sm:p-4 overflow-y-auto space-y-3.5 bg-stone-50/50 overscroll-contain"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#0ea5e9 #f5f5f4',
            }}
          >
            {messages.map((msg) => {
              const isAeris = msg.sender === 'aeris';
              const isSpeaking = speakingMsgId === msg.id;
              const isCopied = copiedId === msg.id;

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex gap-2.5 ${isAeris ? 'justify-start' : 'justify-end'} group`}
                >
                  {isAeris && (
                    <div className="w-8 h-8 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 shrink-0 text-sm shadow-sm mt-1">
                      🐾
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-3 sm:p-3.5 text-xs leading-relaxed ${
                      isAeris
                        ? 'bg-white border border-stone-200 text-stone-800 rounded-tl-sm shadow-sm'
                        : 'bg-gradient-to-tr from-cyan-600 via-teal-600 to-emerald-500 text-white font-semibold rounded-tr-sm shadow-md'
                    }`}
                  >
                    {/* Message Text */}
                    <div className="whitespace-pre-wrap  select-text">
                      {msg.text}
                    </div>

                    {/* Footer bar: Timestamp, Audio button, Copy, Reaction counters */}
                    <div className={`text-[9.5px] mt-2 pt-1.5 border-t flex flex-wrap items-center justify-between gap-1.5 ${
                      isAeris ? 'border-stone-100 text-stone-400' : 'border-white/20 text-cyan-50'
                    }`}>
                      <div className="flex items-center gap-1.5">
                        <span>
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {isAeris && (
                          <>
                            <span>•</span>
                            <button
                              onClick={() => handleSpeak(msg.text, msg.id)}
                              className={`p-1 rounded-lg transition-colors flex items-center gap-1 ${
                                isSpeaking 
                                  ? 'bg-cyan-50 text-cyan-600 font-bold animate-pulse' 
                                  : 'hover:text-cyan-600'
                              }`}
                              title={isSpeaking ? 'Detener voz' : 'Escuchar en voz alta'}
                            >
                              {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                              <span>{isSpeaking ? 'Hablando...' : 'Escuchar'}</span>
                            </button>

                            <button
                              onClick={() => handleCopyText(msg.text, msg.id)}
                              className="p-1 rounded-lg hover:text-cyan-600 transition-colors flex items-center gap-1"
                              title="Copiar texto"
                            >
                              {isCopied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                            </button>
                          </>
                        )}
                      </div>

                      {/* Interactive Reactions */}
                      {isAeris && (
                        <div className="flex items-center gap-1 mt-0.5">
                          {['💚', '🐾', '💡', '👏'].map((emoji) => {
                            const count = (msg.reactionsCount && msg.reactionsCount[emoji]) || 0;
                            return (
                              <button
                                key={emoji}
                                onClick={() => handleReaction(msg.id, emoji)}
                                className={`px-1.5 py-0.5 rounded-full border text-[9px] flex items-center gap-0.5 transition-transform active:scale-125 cursor-pointer ${
                                  count > 0 
                                    ? 'bg-stone-50 border-cyan-400 text-cyan-600 shadow-sm' 
                                    : 'bg-white border-stone-200 text-stone-400 hover:border-stone-300'
                                  }`}
                                title={`Reaccionar con ${emoji}`}
                              >
                                <span>{emoji}</span>
                                {count > 0 && <span className="font-extrabold">{count}</span>}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-xs text-cyan-600 bg-white border border-stone-200 px-3.5 py-2.5 rounded-2xl w-fit shadow-sm"
              >
                <div className="flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
                </div>
                <span className="font-bold text-[11px]">{petInfo.name} está redactando respuesta...</span>
              </motion.div>
            )}

            <div ref={messagesEndRef} className="h-1" />
          </main>

          {/* STICKY BOTTOM CONTAINER (SHRINK-0, STICKY BOTTOM-0) */}
          <footer className="shrink-0 sticky bottom-0 z-30 bg-white border-t border-stone-200 flex flex-col shadow-[0_-8px_25px_rgba(0,0,0,0.03)]">
            {/* QUICK PROMPTS HORIZONTAL CHIPS */}
            <div className="px-3 pt-2 pb-1.5 border-b border-stone-100">
              <div className="flex items-center justify-between px-1 mb-1">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-cyan-600" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-stone-700">
                    Sugerencias Rápidas
                  </span>
                </div>

                <div className="hidden sm:flex items-center gap-1">
                  <button
                    onClick={() => scrollPrompts('left')}
                    className="w-5 h-5 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors cursor-pointer"
                    title="Desplazar a la izquierda"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => scrollPrompts('right')}
                    className="w-5 h-5 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors cursor-pointer"
                    title="Desplazar a la derecha"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div 
                ref={promptsScrollRef}
                className="flex items-center gap-2 overflow-x-auto pb-1 scroll-smooth overscroll-contain no-scrollbar"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt.id}
                    onClick={() => handleSendMessage(prompt.query)}
                    className="px-3 py-1.5 rounded-xl bg-stone-50 hover:bg-cyan-50 border border-stone-200 hover:border-cyan-300 text-[10.5px] font-bold text-stone-600 hover:text-cyan-700 whitespace-nowrap active:scale-95 transition-all cursor-pointer shrink-0 flex items-center gap-1.5 shadow-sm"
                  >
                    <span>{prompt.icon}</span>
                    <span>{prompt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* BOTTOM MESSAGE INPUT BAR */}
            <div className="p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <div className="flex-1 relative flex items-center">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={`Pregúntale a ${petInfo.name} sobre reciclaje o ecología...`}
                    maxLength={180}
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-cyan-500 transition-all shadow-inner"
                  />
                  {inputText.trim().length > 0 && (
                    <span className="absolute right-3 text-[9px] font-bold text-stone-400 tabular-nums">
                      {inputText.length}/180
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-emerald-500 hover:from-cyan-500 hover:to-emerald-400 disabled:opacity-30 disabled:hover:from-cyan-600 text-white font-black flex items-center justify-center transition-all cursor-pointer shadow-md shrink-0 active:scale-95"
                  title="Enviar mensaje"
                  aria-label="Enviar mensaje"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </form>
            </div>
          </footer>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
