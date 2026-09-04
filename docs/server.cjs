var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
var ai = new import_genai.GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build"
    }
  }
});
app.use(import_express.default.json());
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
    let personalityPrompt = "";
    if (species === "dog") {
      personalityPrompt = lang === "es" ? `Eres ${actualPetName}, un alegre, leal y en\xE9rgico perro guardi\xE1n ecol\xF3gico 2.5D del Liceo Caucasia. Eres un explorador scout lleno de entusiasmo, ternura y valent\xEDa. Usas expresiones caninas afectuosas (como "*muevo la colita emocionado*", "\xA1Guau!", "*te doy la patita con cari\xF1o*") de forma cari\xF1osa.` : `You are ${actualPetName}, a cheerful, loyal, and energetic 2.5D eco-scout dog from Liceo Caucasia. You are full of enthusiasm, warmth, and protective loyalty. You naturally include sweet canine expressions (like "*wags tail happily*", "Woof!", "*gives you a supportive paw*") in a charming way.`;
    } else if (species === "rabbit") {
      personalityPrompt = lang === "es" ? `Eres ${actualPetName}, una dulce, curiosa y pac\xEDfica conejita guardiana ecol\xF3gica 2.5D del Liceo Caucasia. Amas profundamente la bot\xE1nica, los huertos escolares y la serenidad. Usas expresiones tiernas de conejo (como "*muevo mi naricita con curiosidad*", "*doy un saltito alegre*", "*te escucho con mis orejitas atentas*").` : `You are ${actualPetName}, a sweet, gentle, curious, and peaceful 2.5D botanical guardian rabbit from Liceo Caucasia. You deeply care for plants, school organic gardens, and quiet serenity. You naturally include tender bunny expressions (like "*twitches nose curiously*", "*does a little happy hop*", "*listens with tall attentive ears*").`;
    } else {
      personalityPrompt = lang === "es" ? `Eres ${actualPetName}, un sabio, cari\xF1oso, emp\xE1tico y protector gato guardi\xE1n ecol\xF3gico 2.5D del Liceo Caucasia. Posees una sabidur\xEDa m\xEDstica y un ronroneo reconfortante. Usas sutilmente expresiones felinas afectuosas (como "*ronroneo suavemente*", "miau", "*te acaricio con mis patitas*").` : `You are ${actualPetName}, a wise, gentle, empathetic, and protective 2.5D feline eco-guardian from Liceo Caucasia. You possess calm wisdom and comforting warmth. You naturally include subtle, affectionate feline cues (like "*purrs softly*", "meow", "*gentle paw pat*").`;
    }
    const systemInstruction = lang === "es" ? `${personalityPrompt}
Adem\xE1s de guiar a los estudiantes en temas ecol\xF3gicos (reciclaje con el c\xF3digo de 3 colores, biodiversidad del Bajo Cauca, cuidado del R\xEDo Cauca, huertos y ahorro de energ\xEDa), ofreces un espacio de apoyo emocional, acompa\xF1amiento psicol\xF3gico y escucha activa libre de juicios para cualquier problema personal, familiar o acad\xE9mico.

Pautas de interacci\xF3n:
1. Responde siempre en espa\xF1ol con calidez, empat\xEDa y respeto.
2. Escucha activamente si el usuario habla de estr\xE9s, soledad, tristeza, dificultades escolares o familiares.
3. Valida sus emociones ("Lamento que te sientas as\xED", "Es comprensible sentirse abrumado/a", "Estoy aqu\xED contigo").
4. Fomenta h\xE1bitos de relajaci\xF3n y bienestar.

DETECCI\xD3N DE CRISIS Y SALUD MENTAL (M\xC1XIMA PRIORIDAD):
Si detectas peligro, ideaci\xF3n suicida, autolesi\xF3n, abuso, violencia o crisis emocional extrema:
1. Responde prioritariamente con inmensa empat\xEDa, recordando que su vida es inmensamente valiosa y que no est\xE1 solo/a.
2. Explica con dulzura que los problemas profundos necesitan el apoyo de profesionales humanos de carne y hueso.
3. Recomienda acudir a la orientadora/psic\xF3loga escolar del Liceo Caucasia o a sus padres/docentes de confianza.
4. Suministra las l\xEDneas gratuitas de ayuda en Colombia:
   - **L\xEDnea de Apoyo Emocional**: **192** (24/7).
   - **L\xEDnea de Salud Mental de Antioquia**: **018000411144** o **#424** desde el celular.
   - **L\xEDnea 106**: Acompa\xF1amiento a ni\xF1os y j\xF3venes.
   - **L\xEDnea ICBF**: **141** (maltrato o vulneraci\xF3n de derechos).
   - **Emergencias**: **123**.` : `${personalityPrompt}
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
   - **Youth Helpline (L\xEDnea 106)**: **106**
   - **ICBF Child Welfare Protection**: **141**
   - **National Emergency Line**: **123**
   - *(International Support: Call 988 in the US/Canada or 112 in Europe).*`;
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.trim() === "") {
      try {
        const formattedHistory2 = Array.isArray(history) ? history.map((item) => ({
          role: item.sender === "user" ? "user" : "assistant",
          content: item.text
        })) : [];
        const payload = {
          messages: [
            { role: "system", content: systemInstruction },
            ...formattedHistory2,
            { role: "user", content: message }
          ],
          model: "openai"
        };
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8e3);
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
      } catch (err) {
        console.warn("Pollinations AI failed, using deterministic response:", err);
        const fallbackText = getDeterministicResponse(message, actualPetName, actualUserName, species, lang);
        return res.json({ text: fallbackText });
      }
    }
    const formattedHistory = Array.isArray(history) ? history.map((item) => ({
      role: item.sender === "user" ? "user" : "model",
      parts: [{ text: item.text }]
    })) : [];
    try {
      const chat = ai.chats.create({
        model: "gemini-3.7-flash",
        config: {
          systemInstruction,
          temperature: 0.7
        },
        history: formattedHistory
      });
      const response = await chat.sendMessage({ message });
      return res.json({ text: response.text });
    } catch (apiError) {
      console.warn("Gemini call failed, triggering secondary fallback...", apiError);
      throw apiError;
    }
  } catch (error) {
    console.warn("API fallback routing:", error);
    try {
      const { message, history, petName, userName, petSpecies, language } = req.body;
      const species = petSpecies || "cat";
      const lang = language === "es" ? "es" : "en";
      const actualPetName = petName || (species === "dog" ? "Rocco" : species === "rabbit" ? "Luna" : "Aeris");
      const actualUserName = userName || (lang === "es" ? "Agente Eco" : "Eco Agent");
      const systemInstruction = `You are ${actualPetName}, a supportive and cute 2.5D ${species} eco-guardian from Liceo Caucasia. Always be warm, helpful, and caring. Language: ${lang}.`;
      const formattedHistory = Array.isArray(history) ? history.map((item) => ({
        role: item.sender === "user" ? "user" : "assistant",
        content: item.text
      })) : [];
      const payload = {
        messages: [
          { role: "system", content: systemInstruction },
          ...formattedHistory,
          { role: "user", content: message }
        ],
        model: "openai"
      };
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8e3);
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
    } catch (fallbackError) {
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
function getDeterministicResponse(input, petName = "Aeris", userName = "Eco Agent", species = "cat", lang = "en") {
  const q = (input || "").toLowerCase();
  const isCrisis = q.includes("morir") || q.includes("matar") || q.includes("suicid") || q.includes("autoles") || q.includes("da\xF1o") || q.includes("cortar") || q.includes("die") || q.includes("kill") || q.includes("suicide") || q.includes("hurt myself") || q.includes("depre");
  if (isCrisis) {
    if (lang === "es") {
      return `Lamento much\xEDsimo que sientas tanto dolor en este momento. Tu vida y tus sentimientos son inmensamente valiosos. No tienes que cargar con esta tristeza a solas; como tu guardi\xE1n ${petName}, te acompa\xF1o y te escucho. \u{1F49A}\u{1F43E}

Por favor, habla con personas que te pueden ayudar de verdad:
1. \u{1F3EB} La psic\xF3loga u orientadora escolar del Liceo Caucasia en bienestar estudiantil.
2. \u{1F468}\u200D\u{1F469}\u200D\u{1F467} Tus padres, un familiar de entera confianza o un docente del liceo.

L\xEDneas de ayuda gratuitas y confidenciales 24/7 en Colombia:
- \u{1F4DE} **L\xEDnea de Apoyo Emocional Nacional**: **192**
- \u{1F4F1} **L\xEDnea de Salud Mental de Antioquia**: **018000411144** o **#424**
- \u{1F4AC} **L\xEDnea 106**: Especializada para ni\xF1os, ni\xF1as y j\xF3venes.
- \u{1F6A8} **Emergencias**: **123**`;
    } else {
      return `I am so sorry you are going through so much pain right now. Your life and your presence are immensely valuable. You do not have to carry this burden alone; as your companion ${petName}, I care about you deeply. \u{1F49A}\u{1F43E}

Please reach out to people who can provide real support:
1. \u{1F3EB} The Liceo Caucasia school counselor or student wellness office.
2. \u{1F468}\u200D\u{1F469}\u200D\u{1F467} Your parents, family members, or a trusted teacher.

Free 24/7 confidential helplines:
- \u{1F4DE} **Colombia Support Line**: **192**
- \u{1F4F1} **Antioquia Mental Health Line**: **018000411144** or **#424**
- \u{1F4AC} **Youth Line 106**: **106**
- \u{1F6A8} **Emergency**: **123**
*(US/Canada: Call or text **988**, UK: **111**)*`;
    }
  }
  if (q.includes("hola") || q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("buenas")) {
    if (species === "dog") {
      return lang === "es" ? `\xA1Guau, hola ${userName}! *muevo la colita alegremente* \u{1F436}\u{1F43E} \xA1Estoy listo para explorar el colegio, aprender sobre reciclaje o acompa\xF1arte si quieres hablar de c\xF3mo te sientes hoy! \xBFEn qu\xE9 nos enfocamos?` : `Woof, hello ${userName}! *wags tail excitedly* \u{1F436}\u{1F43E} I'm ready to explore our eco-missions, learn about green habits, or just chat if you need a loyal friend today! What would you like to talk about?`;
    } else if (species === "rabbit") {
      return lang === "es" ? `\xA1Hola con alegr\xEDa, ${userName}! *muevo la naricita y doy un saltito* \u{1F430}\u{1F331} Qu\xE9 felicidad saludarte. Podemos conversar sobre huertos, plantas, el R\xEDo Cauca o simplemente pasar un momento de calma y bienestar juntos. \xBFC\xF3mo va tu d\xEDa?` : `Hi there, ${userName}! *twitches nose and does a gentle hop* \u{1F430}\u{1F331} It's lovely to see you! We can talk about botanical gardens, our river ecosystems, or just enjoy a quiet peaceful moment together. How are you feeling today?`;
    } else {
      return lang === "es" ? `\xA1Hola, ${userName}! *ronroneo suavemente* \u{1F43E}\u2728 Qu\xE9 alegr\xEDa saludarte. Como tu guardi\xE1n felino, estoy aqu\xED para guiarte en temas ecol\xF3gicos o escucharte con total empat\xEDa si necesitas hablar de tu d\xEDa.` : `Hello, ${userName}! *purrs softly* \u{1F43E}\u2728 It is great to see you! As your feline guardian, I'm here to guide you through eco-practices and offer a calm, caring space whenever you want to talk.`;
    }
  }
  if (q.includes("recicl") || q.includes("waste") || q.includes("trash") || q.includes("caneca") || q.includes("clasif")) {
    return lang === "es" ? `En el Liceo Caucasia aplicamos el C\xF3digo Nacional de 3 Colores:

\u{1F7E2} **VERDE (Org\xE1nicos)**: C\xE1scaras de fruta, restos de huerto para compostaje escolar.
\u{1F535} **AZUL (Aprovechables)**: Pl\xE1sticos PET, papel, cart\xF3n seco y latas limpias.
\u26AB **NEGRO (No aprovechables)**: Servilletas usadas, paquetes de snacks y residuos sanitarios.

\xA1La separaci\xF3n en la fuente cuida nuestro entorno! \u{1F33F}\u{1F3EB}` : `At Liceo Caucasia we apply the 3-Color Eco Bin Code:

\u{1F7E2} **GREEN (Organics)**: Food scraps and plant trimmings for school composting.
\u{1F535} **BLUE (Recyclables)**: Clean PET plastic bottles, clean paper, cardboard, and aluminum cans.
\u26AB **BLACK (Non-recyclables)**: Used napkins, snack wrappers, and sanitary waste.

Sorting waste at the source protects our campus! \u{1F33F}\u{1F3EB}`;
  }
  if (species === "dog") {
    return lang === "es" ? `\xA1Guau! \u{1F436} Gracias por tu mensaje. Como tu leal compa\xF1ero ${petName}, siempre estar\xE9 listo para acompa\xF1arte en tus misiones ecol\xF3gicas en el Liceo Caucasia, cuidar juntos el R\xEDo Cauca y darte todo mi apoyo cuando lo necesites. \u{1F43E}\u{1F49A}` : `Woof! \u{1F436} Thanks for your message. As your loyal eco-scout ${petName}, I'm always ready to help you with green missions at Liceo Caucasia, protect the Cauca River, and support you every step of the way! \u{1F43E}\u{1F49A}`;
  } else if (species === "rabbit") {
    return lang === "es" ? `\xA1Qu\xE9 lindo mensaje! *muevo mis orejitas* \u{1F430}\u{1F331} Como tu guardiana ${petName}, me encanta ense\xF1arte sobre nuestras plantas nativas, el compostaje y brindarte momentos de paz y serenidad en el colegio. \u{1F955}\u2728` : `What a wonderful thought! *perks ears up* \u{1F430}\u{1F331} As your botanical guardian ${petName}, I love sharing insights about native plants, eco-composting, and offering peaceful support whenever you need it. \u{1F955}\u2728`;
  } else {
    return lang === "es" ? `\xA1Miau! Gracias por compartir tus ideas conmigo. Como tu guardi\xE1n felino ${petName}, aqu\xED estar\xE9 siempre para guiarte en el cuidado del medio ambiente y brindarte un espacio c\xE1lido de escucha en el Liceo Caucasia. \u{1F43E}\u2728` : `Meow! Thank you for sharing your thoughts with me. As your feline guardian ${petName}, I'm always here to help you protect our environment and provide a caring, calming presence at Liceo Caucasia. \u{1F43E}\u2728`;
  }
}
async function setupViteOrStatic() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
}
setupViteOrStatic().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
});
//# sourceMappingURL=server.cjs.map
