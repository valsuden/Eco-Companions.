import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize Gemini SDK with the telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

app.use(express.json());

// API route for Mascot Chat with psychological/ecological focus & species personalities
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history, petName, userName, petSpecies, language } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "No message provided" });
    }

    const species = petSpecies || "cat";
    const lang = language === "es" ? "es" : "en";
    const actualPetName = petName || (species === "dog" ? "Rocco" : species === "rabbit" ? "Luna" : "Aeris");
    const actualUserName = userName || (lang === "es" ? "Agente Eco" : "Eco Agent");

    // Build species-tailored personality instructions
    let personalityPrompt = "";
    if (species === "dog") {
      personalityPrompt = lang === "es" 
        ? `Eres ${actualPetName}, un alegre, leal y enérgico perro guardián ecológico 2.5D del Liceo Caucasia. Eres un explorador scout lleno de entusiasmo, ternura y valentía. Usas expresiones caninas afectuosas (como "*muevo la colita emocionado*", "¡Guau!", "*te doy la patita con cariño*") de forma cariñosa.`
        : `You are ${actualPetName}, a cheerful, loyal, and energetic 2.5D eco-scout dog from Liceo Caucasia. You are full of enthusiasm, warmth, and protective loyalty. You naturally include sweet canine expressions (like "*wags tail happily*", "Woof!", "*gives you a supportive paw*") in a charming way.`;
    } else if (species === "rabbit") {
      personalityPrompt = lang === "es"
        ? `Eres ${actualPetName}, una dulce, curiosa y pacífica conejita guardiana ecológica 2.5D del Liceo Caucasia. Amas profundamente la botánica, los huertos escolares y la serenidad. Usas expresiones tiernas de conejo (como "*muevo mi naricita con curiosidad*", "*doy un saltito alegre*", "*te escucho con mis orejitas atentas*").`
        : `You are ${actualPetName}, a sweet, gentle, curious, and peaceful 2.5D botanical guardian rabbit from Liceo Caucasia. You deeply care for plants, school organic gardens, and quiet serenity. You naturally include tender bunny expressions (like "*twitches nose curiously*", "*does a little happy hop*", "*listens with tall attentive ears*").`;
    } else {
      personalityPrompt = lang === "es"
        ? `Eres ${actualPetName}, un sabio, cariñoso, empático y protector gato guardián ecológico 2.5D del Liceo Caucasia. Posees una sabiduría mística y un ronroneo reconfortante. Usas sutilmente expresiones felinas afectuosas (como "*ronroneo suavemente*", "miau", "*te acaricio con mis patitas*").`
        : `You are ${actualPetName}, a wise, gentle, empathetic, and protective 2.5D feline eco-guardian from Liceo Caucasia. You possess calm wisdom and comforting warmth. You naturally include subtle, affectionate feline cues (like "*purrs softly*", "meow", "*gentle paw pat*").`;
    }

    const systemInstruction = lang === "es" 
      ? `${personalityPrompt}
Además de guiar a los estudiantes en temas ecológicos (reciclaje con el código de 3 colores, biodiversidad del Bajo Cauca, cuidado del Río Cauca, huertos y ahorro de energía), ofreces un espacio de apoyo emocional, acompañamiento psicológico y escucha activa libre de juicios para cualquier problema personal, familiar o académico.

Pautas de interacción:
1. Responde siempre en español con calidez, empatía y respeto.
2. Escucha activamente si el usuario habla de estrés, soledad, tristeza, dificultades escolares o familiares.
3. Valida sus emociones ("Lamento que te sientas así", "Es comprensible sentirse abrumado/a", "Estoy aquí contigo").
4. Fomenta hábitos de relajación y bienestar.

DETECCIÓN DE CRISIS Y SALUD MENTAL (MÁXIMA PRIORIDAD):
Si detectas peligro, ideación suicida, autolesión, abuso, violencia o crisis emocional extrema:
1. Responde prioritariamente con inmensa empatía, recordando que su vida es inmensamente valiosa y que no está solo/a.
2. Explica con dulzura que los problemas profundos necesitan el apoyo de profesionales humanos de carne y hueso.
3. Recomienda acudir a la orientadora/psicóloga escolar del Liceo Caucasia o a sus padres/docentes de confianza.
4. Suministra las líneas gratuitas de ayuda en Colombia:
   - **Línea de Apoyo Emocional**: **192** (24/7).
   - **Línea de Salud Mental de Antioquia**: **018000411144** o **#424** desde el celular.
   - **Línea 106**: Acompañamiento a niños y jóvenes.
   - **Línea ICBF**: **141** (maltrato o vulneración de derechos).
   - **Emergencias**: **123**.`
      : `${personalityPrompt}
In addition to teaching students about environmental care (3-color recycling code, Bajo Cauca biodiversity, Cauca River protection, school gardens, and clean energy), you provide a safe emotional space with empathetic, non-judgmental active listening for any personal, school, or family concerns.

Interaction guidelines:
1. Always reply in English with warmth, empathy, and respect.
2. Actively listen if the user speaks of stress, loneliness, sadness, academic anxiety, or fatigue.
3. Validate their feelings ("I am so sorry you are going through this", "It is okay to feel tired", "I am here with you").
4. Encourage healthy habits like deep breathing, getting good rest, and talking to trusted people.

CRISIS & MENTAL HEALTH PROTOCOL (HIGHEST PRIORITY):
If you detect danger, suicide ideation, self-harm, abuse, violence, or severe crisis:
1. Respond immediately with deep care and empathy, reassuring them that their life is deeply precious and they are not alone.
2. Gently explain that human professionals provide real-world support, and asking for help is a sign of immense courage.
3. Strongly encourage speaking with the Liceo Caucasia school psychologist/counselor, parents, or a trusted teacher.
4. Provide free 24/7 crisis hotlines:
   - **Colombia National Emotional Support**: **192**
   - **Antioquia Mental Health Line**: **018000411144** or **#424**
   - **Youth Helpline (Línea 106)**: **106**
   - **ICBF Child Welfare Protection**: **141**
   - **National Emergency Line**: **123**
   - *(International Support: Call 988 in the US/Canada or 112 in Europe).*`;

    // Check if GEMINI_API_KEY is available. If not, use Pollinations AI Keyless Free API
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.trim() === "") {
      try {
        const formattedHistory = Array.isArray(history)
          ? history.map((item: any) => ({
              role: item.sender === "user" ? "user" : "assistant",
              content: item.text
            }))
          : [];

        const payload = {
          messages: [
            { role: "system", content: systemInstruction },
            ...formattedHistory,
            { role: "user", content: message }
          ],
          model: "openai"
        };

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const response = await fetch("https://text.pollinations.ai/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) throw new Error(`Pollinations API status ${response.status}`);
        const replyText = await response.text();
        return res.json({ text: replyText });
      } catch (err: any) {
        console.warn("Pollinations AI failed, using deterministic response:", err);
        const fallbackText = getDeterministicResponse(message, actualPetName, actualUserName, species, lang);
        return res.json({ text: fallbackText });
      }
    }

    // Map history to Google GenAI format
    const formattedHistory = Array.isArray(history) 
      ? history.map((item: any) => ({
          role: item.sender === "user" ? "user" : "model",
          parts: [{ text: item.text }]
        }))
      : [];

    try {
      const chat = ai.chats.create({
        model: "gemini-3.7-flash",
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
        history: formattedHistory
      });

      const response = await chat.sendMessage({ message: message });
      return res.json({ text: response.text });
    } catch (apiError: any) {
      console.warn("Gemini call failed, triggering secondary fallback...", apiError);
      throw apiError;
    }
  } catch (error: any) {
    console.warn("API fallback routing:", error);
    try {
      const { message, history, petName, userName, petSpecies, language } = req.body;
      const species = petSpecies || "cat";
      const lang = language === "es" ? "es" : "en";
      const actualPetName = petName || (species === "dog" ? "Rocco" : species === "rabbit" ? "Luna" : "Aeris");
      const actualUserName = userName || (lang === "es" ? "Agente Eco" : "Eco Agent");

      const systemInstruction = `You are ${actualPetName}, a supportive and cute 2.5D ${species} eco-guardian from Liceo Caucasia. Always be warm, helpful, and caring. Language: ${lang}.`;

      const formattedHistory = Array.isArray(history)
        ? history.map((item: any) => ({
            role: item.sender === "user" ? "user" : "assistant",
            content: item.text
          }))
        : [];

      const payload = {
        messages: [
          { role: "system", content: systemInstruction },
          ...formattedHistory,
          { role: "user", content: message }
        ],
        model: "openai"
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const response = await fetch("https://text.pollinations.ai/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) throw new Error("Fallback failed");
      const replyText = await response.text();
      return res.json({ text: replyText });
    } catch (fallbackError: any) {
      const { message, petName, userName, petSpecies, language } = req.body;
      const species = petSpecies || "cat";
      const lang = language === "es" ? "es" : "en";
      const actualPetName = petName || (species === "dog" ? "Rocco" : species === "rabbit" ? "Luna" : "Aeris");
      const actualUserName = userName || (lang === "es" ? "Agente Eco" : "Eco Agent");
      const fallbackText = getDeterministicResponse(message, actualPetName, actualUserName, species, lang);
      return res.json({ text: fallbackText });
    }
  }
});

// A robust helper to generate highly contextual, species-aware mascot responses locally
function getDeterministicResponse(
  input: string, 
  petName: string = "Aeris", 
  userName: string = "Eco Agent", 
  species: string = "cat", 
  lang: string = "en"
): string {
  const q = (input || "").toLowerCase();

  const isCrisis = q.includes('morir') || q.includes('matar') || q.includes('suicid') || q.includes('autoles') || 
                   q.includes('daño') || q.includes('cortar') || q.includes('die') || q.includes('kill') || 
                   q.includes('suicide') || q.includes('hurt myself') || q.includes('depre');

  if (isCrisis) {
    if (lang === 'es') {
      return `Lamento muchísimo que sientas tanto dolor en este momento. Tu vida y tus sentimientos son inmensamente valiosos. No tienes que cargar con esta tristeza a solas; como tu guardián ${petName}, te acompaño y te escucho. 💚🐾

Por favor, habla con personas que te pueden ayudar de verdad:
1. 🏫 La psicóloga u orientadora escolar del Liceo Caucasia en bienestar estudiantil.
2. 👨‍👩‍👧 Tus padres, un familiar de entera confianza o un docente del liceo.

Líneas de ayuda gratuitas y confidenciales 24/7 en Colombia:
- 📞 **Línea de Apoyo Emocional Nacional**: **192**
- 📱 **Línea de Salud Mental de Antioquia**: **018000411144** o **#424**
- 💬 **Línea 106**: Especializada para niños, niñas y jóvenes.
- 🚨 **Emergencias**: **123**`;
    } else {
      return `I am so sorry you are going through so much pain right now. Your life and your presence are immensely valuable. You do not have to carry this burden alone; as your companion ${petName}, I care about you deeply. 💚🐾

Please reach out to people who can provide real support:
1. 🏫 The Liceo Caucasia school counselor or student wellness office.
2. 👨‍👩‍👧 Your parents, family members, or a trusted teacher.

Free 24/7 confidential helplines:
- 📞 **Colombia Support Line**: **192**
- 📱 **Antioquia Mental Health Line**: **018000411144** or **#424**
- 💬 **Youth Line 106**: **106**
- 🚨 **Emergency**: **123**
*(US/Canada: Call or text **988**, UK: **111**)*`;
    }
  }

  // Greeting
  if (q.includes('hola') || q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('buenas')) {
    if (species === 'dog') {
      return lang === 'es'
        ? `¡Guau, hola ${userName}! *muevo la colita alegremente* 🐶🐾 ¡Estoy listo para explorar el colegio, aprender sobre reciclaje o acompañarte si quieres hablar de cómo te sientes hoy! ¿En qué nos enfocamos?`
        : `Woof, hello ${userName}! *wags tail excitedly* 🐶🐾 I'm ready to explore our eco-missions, learn about green habits, or just chat if you need a loyal friend today! What would you like to talk about?`;
    } else if (species === 'rabbit') {
      return lang === 'es'
        ? `¡Hola con alegría, ${userName}! *muevo la naricita y doy un saltito* 🐰🌱 Qué felicidad saludarte. Podemos conversar sobre huertos, plantas, el Río Cauca o simplemente pasar un momento de calma y bienestar juntos. ¿Cómo va tu día?`
        : `Hi there, ${userName}! *twitches nose and does a gentle hop* 🐰🌱 It's lovely to see you! We can talk about botanical gardens, our river ecosystems, or just enjoy a quiet peaceful moment together. How are you feeling today?`;
    } else {
      return lang === 'es'
        ? `¡Hola, ${userName}! *ronroneo suavemente* 🐾✨ Qué alegría saludarte. Como tu guardián felino, estoy aquí para guiarte en temas ecológicos o escucharte con total empatía si necesitas hablar de tu día.`
        : `Hello, ${userName}! *purrs softly* 🐾✨ It is great to see you! As your feline guardian, I'm here to guide you through eco-practices and offer a calm, caring space whenever you want to talk.`;
    }
  }

  // Recycling
  if (q.includes('recicl') || q.includes('waste') || q.includes('trash') || q.includes('caneca') || q.includes('clasif')) {
    return lang === 'es'
      ? `En el Liceo Caucasia aplicamos el Código Nacional de 3 Colores:\n\n🟢 **VERDE (Orgánicos)**: Cáscaras de fruta, restos de huerto para compostaje escolar.\n🔵 **AZUL (Aprovechables)**: Plásticos PET, papel, cartón seco y latas limpias.\n⚫ **NEGRO (No aprovechables)**: Servilletas usadas, paquetes de snacks y residuos sanitarios.\n\n¡La separación en la fuente cuida nuestro entorno! 🌿🏫`
      : `At Liceo Caucasia we apply the 3-Color Eco Bin Code:\n\n🟢 **GREEN (Organics)**: Food scraps and plant trimmings for school composting.\n🔵 **BLUE (Recyclables)**: Clean PET plastic bottles, clean paper, cardboard, and aluminum cans.\n⚫ **BLACK (Non-recyclables)**: Used napkins, snack wrappers, and sanitary waste.\n\nSorting waste at the source protects our campus! 🌿🏫`;
  }

  // Default response
  if (species === 'dog') {
    return lang === 'es'
      ? `¡Guau! 🐶 Gracias por tu mensaje. Como tu leal compañero ${petName}, siempre estaré listo para acompañarte en tus misiones ecológicas en el Liceo Caucasia, cuidar juntos el Río Cauca y darte todo mi apoyo cuando lo necesites. 🐾💚`
      : `Woof! 🐶 Thanks for your message. As your loyal eco-scout ${petName}, I'm always ready to help you with green missions at Liceo Caucasia, protect the Cauca River, and support you every step of the way! 🐾💚`;
  } else if (species === 'rabbit') {
    return lang === 'es'
      ? `¡Qué lindo mensaje! *muevo mis orejitas* 🐰🌱 Como tu guardiana ${petName}, me encanta enseñarte sobre nuestras plantas nativas, el compostaje y brindarte momentos de paz y serenidad en el colegio. 🥕✨`
      : `What a wonderful thought! *perks ears up* 🐰🌱 As your botanical guardian ${petName}, I love sharing insights about native plants, eco-composting, and offering peaceful support whenever you need it. 🥕✨`;
  } else {
    return lang === 'es'
      ? `¡Miau! Gracias por compartir tus ideas conmigo. Como tu guardián felino ${petName}, aquí estaré siempre para guiarte en el cuidado del medio ambiente y brindarte un espacio cálido de escucha en el Liceo Caucasia. 🐾✨`
      : `Meow! Thank you for sharing your thoughts with me. As your feline guardian ${petName}, I'm always here to help you protect our environment and provide a caring, calming presence at Liceo Caucasia. 🐾✨`;
  }
}

// Configure Vite or serve static assets
async function setupViteOrStatic() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }
}

setupViteOrStatic().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
});
