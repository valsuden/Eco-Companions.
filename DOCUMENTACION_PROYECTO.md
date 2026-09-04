# Documentación Oficial y Memoria del Proyecto: AERIS - Eco Liceista

## 1. Introducción y Visión del Proyecto
**AERIS - Eco Liceista** es un simulador de mascotas virtuales educativo y ecológico diseñado específicamente para la comunidad del **Liceo Caucasia**. El objetivo principal del proyecto es gamificar la educación ambiental, enseñando a los estudiantes sobre el cuidado del medio ambiente, la correcta clasificación de residuos y el sentido de responsabilidad mediante el cuidado de una mascota virtual (Gato, Perro o Conejo).

## 2. Historia del Proyecto y Evolución de Ideas
El proyecto nació de la necesidad de crear una herramienta interactiva que no solo entretuviera, sino que dejara un impacto positivo en los estudiantes.

**Lluvia de ideas inicial y conceptos clave:**
- *Idea inicial:* Una simple mascota virtual a la que hay que alimentar.
- *Evolución ecológica:* Se decidió que las acciones de la mascota debían estar ligadas al medio ambiente. Así nacieron los **Eco-minigames**, donde el usuario debe limpiar un parque o clasificar basura real para ganar monedas.
- *Chat Educativo (AI):* Implementar un chat adaptado a la especie de la mascota para que los estudiantes puedan interactuar y aprender curiosidades sobre la naturaleza.
- *Módulo de Inglés:* Se sugirió agregar una funcionalidad bilingüe (`LearnEnglishModal`) para que el juego sirva también como herramienta de práctica de idiomas.
- *Personalización:* Para mantener el interés a largo plazo, introdujimos una tienda con accesorios (sombreros, gafas, auras) y "skins" (estilos 2.5D).

## 3. Mecánicas Principales (Core Gameplay)
- **Sistema de Estadísticas Vitales:** La mascota tiene 4 barras de necesidades: Hambre, Estado de Ánimo, Energía e Higiene. Estas decaen con el tiempo y deben ser atendidas.
- **Economía y Progresión:** 
  - **Monedas (🪙):** Se ganan jugando minijuegos o reclamando recompensas diarias. Sirven para comprar comida y cosméticos.
  - **Experiencia (XP):** Permite subir de nivel. Se implementó un sistema "Anti-Farming" que limita cuánta XP se puede ganar simplemente acariciando a la mascota, obligando al usuario a jugar y participar en actividades ecológicas.
- **Eco-Minijuegos:**
  1. *Eco-Tetris / Clasificación Rápida:* Enseña qué residuos van en la caneca Verde (Orgánicos), Blanca (Aprovechables) y Negra (No aprovechables).
  2. *Limpieza del Parque:* Actividad de recolección de basura contrarreloj.
- **Recompensas Diarias y Rachas:** Fomenta la retención de usuarios con recompensas por entrar días consecutivos.

## 4. Arquitectura Técnica
- **Frontend:** Desarrollado con **React 18** y **TypeScript**.
- **Estilos:** Se utilizó **Tailwind CSS** con una estética *Retro Pixel Art* (fuente 'Press Start 2P') para apelar a la nostalgia y al estilo de videojuegos clásicos.
- **Almacenamiento (Persistencia):** Los datos del usuario (estadísticas, inventario, progreso) se guardan localmente en el navegador mediante `localStorage` (Offline-first).
- **Despliegue y CI/CD:** Integración continua mediante **GitHub Actions**. El proyecto está configurado para compilarse automáticamente usando **Vite** y desplegarse tanto en GitHub Pages como en Google Cloud Run.

## 5. Historial de Versiones (Changelog)

### v1.0 - El Nacimiento (MVP)
- Implementación del motor de la mascota virtual.
- Creación de estadísticas vitales (Hambre, Energía, Higiene, Ánimo).
- Sistema básico de guardado local.
- Selección de las 3 mascotas principales: Gato (Aeris), Perro (Rocco) y Conejo (Copito).

### v1.1 - La Actualización Ecológica
- Integración de los Eco-minijuegos (Tetris y Limpieza de Parque).
- Creación de la Tienda de Cosméticos y el Inventario.
- Sistema de economía implementado (Monedas y XP).
- Adición de recompensas diarias.

### v1.2 - Expansión Educativa
- Módulo de "Aprender Inglés" añadido.
- Interfaz gráfica refinada con componentes modulares.
- Sistema de notificaciones (Toasts) implementado.

### v1.3 - Optimización Móvil y Despliegue (Versión Actual)
- **Corrección de Rutas:** Ajuste en `vite.config.ts` (`base: './'`) para compatibilidad absoluta con GitHub Pages.
- **Responsive Design:** Mejoras profundas en la adaptabilidad táctil. Se bloqueó el zoom accidental en móviles (`viewport-fit=cover`, `user-scalable=no`).
- **Accesibilidad Visual:** Aumento de la fuente global a `13px` en móviles y `15px` en PC para facilitar la lectura de la tipografía pixelada.
- **Anti-Spam:** Sistema de mitigación en el botón de acariciar para balancear la obtención de XP.
- **Despliegue Automático:** Creación de `.github/workflows/deploy.yml` para despliegues dinámicos sin errores de pantalla en blanco.

## 6. Conclusión
**AERIS - Eco Liceista** ha evolucionado de ser una idea básica a convertirse en una WebApp Progresiva (PWA) completa, robusta y escalable. Su enfoque en la educación gamificada ofrece al Liceo Caucasia una plataforma innovadora donde la tecnología y la conciencia ambiental se unen para educar a las nuevas generaciones.
