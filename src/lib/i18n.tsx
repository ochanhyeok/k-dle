"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export type Locale = "en" | "es" | "ko";

const STORAGE_KEY = "k-dle-lang";

const translations = {
  en: {
    // Homepage
    "home.hero": "Daily K-Drama & K-Pop Puzzles",
    "home.subtitle": "Test your knowledge with daily challenges.\nGuess dramas, idols, lyrics, and iconic scenes.",
    "home.footer": "K-Dle is an unofficial fan project. All IP belongs to respective owners.",
    "home.about": "About",
    "home.privacy": "Privacy",
    "home.terms": "Terms",

    // Mode descriptions
    "mode.drama.desc": "Guess the K-Drama from progressive clues",
    "mode.idol.desc": "Identify the K-Pop idol from attributes",
    "mode.lyric.desc": "Name the song from translated lyrics",
    "mode.scene.desc": "Recognize the drama from scene descriptions",

    // Game subtitles (for GameHeader)
    "game.subtitle.drama": "Guess the K-Drama",
    "game.subtitle.idol": "Guess the K-Pop Idol",
    "game.subtitle.lyric": "Name the Song from Lyrics",
    "game.subtitle.scene": "Recognize the K-Drama Scene",

    // Game common
    "game.loading": "Loading...",
    "game.guessIn": "Guess the K-Drama in {n} tries",
    "game.idolGuessIn": "Guess the K-Pop idol in {n} tries",
    "game.lyricGuessIn": "Name the song from translated lyrics",
    "game.sceneGuessIn": "Recognize the K-Drama from the scene description",
    "game.placeholder.drama": "Type a K-Drama title...",
    "game.placeholder.idol": "Type an idol name...",
    "game.placeholder.lyric": "Type a song title...",
    "game.placeholder.scene": "Type a K-Drama title...",

    // Results
    "result.brilliant": "Brilliant!",
    "result.gotIt": "You got it!",
    "result.perfectEar": "Perfect ear!",
    "result.sceneMaster": "Scene master!",
    "result.betterLuck": "Better luck tomorrow!",
    "result.guessedIn": "You guessed {title} in {n} {tries}",
    "result.idolGuessedIn": "{name} ({group}) in {n} {tries}",
    "result.lyricGuessedIn": "{title} by {artist} in {n} {tries}",
    "result.sceneGuessedIn": "{title} in {n} {tries}",
    "result.answerWas": "The answer was {title} ({titleKo})",
    "result.answerWasIdol": "The answer was {name} ({group})",
    "result.answerWasLyric": "The answer was {title} by {artist}",
    "result.try": "try",
    "result.tries": "tries",
    "result.shareResult": "Share Result",
    "result.shareStats": "Share My Stats",

    // Stats
    "stats.played": "Played",
    "stats.winRate": "Win Rate",
    "stats.winPct": "Win %",
    "stats.streak": "Streak",
    "stats.max": "Max",
    "stats.title": "Statistics",
    "stats.dayStreak": "{n} day streak",
    "stats.guessDistribution": "Guess Distribution",
    "stats.streakRanks": "Streak Ranks",

    // Daily Stats
    "daily.title": "Today's Global Stats",
    "daily.loading": "Loading global stats...",
    "daily.players": "Players",
    "daily.avgGuesses": "Avg Guesses",

    // Countdown
    "countdown.nextPuzzle": "Next puzzle in",

    // Next Game
    "next.tryAnother": "Try another mode",

    // Compare
    "compare.title": "Compare",
    "compare.friend": "Friend",
    "compare.you": "You",

    // Streak
    "streak.title": "Your Daily Streak",
    "streak.start": "Play any mode to start your streak",
    "streak.rank": "Rank: {title}",
    "streak.keepGoing": "Keep going!",

    // Ranks
    "rank.newcomer": "Newcomer",
    "rank.trainee": "Trainee",
    "rank.debut": "Debut",
    "rank.risingStar": "Rising Star",
    "rank.allKill": "All-Kill",
    "rank.hallyuLegend": "Hallyu Legend",
    "rank.rising": "Rising",
    "rank.legend": "Legend",

    // How to Play
    "help.title": "How to Play",
    "help.intro": "Test your K-Drama & K-Pop knowledge with daily puzzles.",
    "help.rule1": "You have <strong>6 tries</strong> to guess each puzzle",
    "help.rule2": "New puzzles every day at midnight UTC",
    "help.rule3": "Share your results without spoilers",
    "help.rule4": "Build your streak — earn fan ranks!",
    "help.gameModes": "Game Modes",
    "help.drama.desc": "Guess the K-Drama from progressive text clues. Each wrong guess reveals a new hint — from genre to cast.",
    "help.idol.desc": "Guess the K-Pop idol. Each guess shows attribute comparisons — group, position, nationality, debut year, and more.",
    "help.lyric.desc": "Name the song from translated lyrics. One new line is revealed with each attempt.",
    "help.scene.desc": "Recognize the K-Drama from a scene description that gets more specific with each guess.",
    "help.days": "days",

    // Toast
    "toast.copied": "Copied to clipboard!",

    // Idol attrs
    "idol.name": "Name",
    "idol.gender": "Gender",
    "idol.group": "Group",
    "idol.position": "Position",
    "idol.nationality": "Nation",
    "idol.debut": "Debut",
    "idol.company": "Company",
    "idol.generation": "Gen",

    // Lyric
    "lyric.remaining": "{n} more line{s} remaining...",
    "lyric.ostHint": "Hint: This is a K-Drama OST",

    // Scene
    "scene.theScene": "The Scene",

    // 404
    "notFound.title": "Page Not Found",
    "notFound.desc": "The page you're looking for doesn't exist. Let's get you back to the puzzles!",
    "notFound.back": "Back to K-Dle",

    // Aria
    "aria.backHome": "Back to home",
    "aria.statistics": "Statistics",
    "aria.help": "Help",

    // Drama hint labels
    "hint.genre": "Genre",
    "hint.year": "Year",
    "hint.network": "Network",
    "hint.episodes": "Episodes",
    "hint.keywords": "Keywords",
    "hint.initials": "Lead actor initials",
    "hint.starring": "Starring",

    // About page
    "about.title": "About K-Dle",
    "about.tagline": "The daily guessing game for K-Drama and K-Pop fans worldwide.",
    "about.whatIs": "What is K-Dle?",
    "about.whatIsP1": "K-Dle is a free daily puzzle game inspired by Wordle, designed for fans of Korean entertainment. Every day, new puzzles challenge your knowledge of K-Dramas, K-Pop idols, song lyrics, and iconic drama scenes.",
    "about.whatIsP2": "With four unique game modes, K-Dle offers something for every type of fan — whether you binge-watch dramas, follow K-Pop groups, or know every OST by heart.",
    "about.gameModes": "Game Modes",
    "about.drama": "Guess the K-Drama from progressive text clues including genre, cast, and famous quotes.",
    "about.idol": "Identify the K-Pop idol by comparing attributes like group, position, nationality, and debut year.",
    "about.lyric": "Name the K-Pop song or K-Drama OST from translated lyrics revealed one line at a time.",
    "about.scene": "Recognize the K-Drama from scene descriptions that become more specific with each guess.",
    "about.howItWorks": "How It Works",
    "about.step1": "Choose a game mode from the homepage",
    "about.step2": "You have 6 tries to guess the correct answer",
    "about.step3": "Each wrong guess reveals more clues",
    "about.step4": "Share your results with friends — no spoilers!",
    "about.step5": "Come back every day to build your streak",
    "about.disclaimerTitle": "Disclaimer",
    "about.disclaimerText": "K-Dle is an unofficial fan project created for entertainment purposes only. It is not affiliated with, endorsed by, or sponsored by any entertainment company, record label, or broadcasting network. All K-Drama titles, K-Pop artist names, song titles, and related intellectual property belong to their respective owners. The use of these names constitutes nominative fair use within the context of a trivia game.",
    "about.links": "Links",
    "about.privacyPolicy": "Privacy Policy",
    "about.termsOfService": "Terms of Service",
    "about.contact": "Contact",
    "about.contactText": "For questions, feedback, or DMCA requests, please email us at",

    // Privacy page
    "privacy.title": "Privacy Policy",
    "privacy.lastUpdated": "Last updated: February 6, 2026",
    "privacy.s1Title": "1. Introduction",
    "privacy.s1Text": "K-Dle (\"we,\" \"our,\" or \"us\") operates the website k-dle.vercel.app (the \"Service\"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service.",
    "privacy.s2Title": "2. Data We Collect",
    "privacy.s2Text": "Local Storage Data: We store your game progress, statistics, and streak data locally on your device using browser localStorage. This data never leaves your device and is not transmitted to any server. Analytics: We may use third-party analytics services (such as Google Analytics) to collect anonymized usage data, including page views, session duration, and general geographic location. Advertising: We use Google AdSense to display advertisements. Google may use cookies and similar technologies to serve ads based on your prior visits.",
    "privacy.s3Title": "3. Cookies",
    "privacy.s3Text": "Our Service may use cookies and similar tracking technologies. Third-party services such as Google AdSense and Google Analytics use cookies to provide their services. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.",
    "privacy.s4Title": "4. Third-Party Services",
    "privacy.s4Text": "We may employ third-party companies and services, including: Google AdSense (advertising), Google Analytics (usage analytics), and Vercel (hosting). These third parties have access to limited data only to perform tasks on our behalf and are obligated not to disclose or use it for other purposes.",
    "privacy.s5Title": "5. Children's Privacy",
    "privacy.s5Text": "Our Service is intended for general audiences. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and believe your child has provided us with personal data, please contact us.",
    "privacy.s6Title": "6. Data Retention",
    "privacy.s6Text": "Game data is stored locally on your device and persists until you clear your browser data. We do not retain any personal data on our servers.",
    "privacy.s7Title": "7. Your Rights",
    "privacy.s7Text": "You can clear all locally stored game data at any time by clearing your browser's localStorage. For questions about data collected by third-party services, please refer to their respective privacy policies.",
    "privacy.s8Title": "8. Changes to This Policy",
    "privacy.s8Text": "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the \"Last updated\" date.",
    "privacy.s9Title": "9. Contact Us",
    "privacy.s9Text": "If you have any questions about this Privacy Policy, please contact us at pon07084@gmail.com.",

    // Terms page
    "terms.title": "Terms of Service",
    "terms.lastUpdated": "Last updated: February 6, 2026",
    "terms.s1Title": "1. Acceptance of Terms",
    "terms.s1Text": "By accessing and using K-Dle (the \"Service\"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.",
    "terms.s2Title": "2. Description of Service",
    "terms.s2Text": "K-Dle is a free, web-based daily puzzle game that tests your knowledge of K-Drama and K-Pop. The Service offers multiple game modes including Drama-dle, Idol-dle, Lyric-dle, and Scene-dle. New puzzles are available daily.",
    "terms.s3Title": "3. Intellectual Property",
    "terms.s3Text": "K-Dle is an unofficial fan project. All K-Drama titles, K-Pop artist names, song titles, and related intellectual property referenced in this game belong to their respective owners and copyright holders. The use of these names is for informational and entertainment purposes within the context of a trivia/quiz game and constitutes nominative fair use. No endorsement, sponsorship, or affiliation is implied. If you are a rights holder and believe that any content on this Service infringes your intellectual property rights, please contact us.",
    "terms.s4Title": "4. User Conduct",
    "terms.s4Text": "You agree not to: attempt to gain unauthorized access to the Service or its related systems; use automated scripts to access or interact with the Service; reverse-engineer or attempt to extract the source code of the Service; share daily puzzle answers on public platforms before the puzzle expires.",
    "terms.s5Title": "5. Disclaimer of Warranties",
    "terms.s5Text": "The Service is provided \"as is\" and \"as available\" without any warranties of any kind, express or implied. We do not guarantee that the Service will be uninterrupted, error-free, or free of harmful components.",
    "terms.s6Title": "6. Limitation of Liability",
    "terms.s6Text": "To the fullest extent permitted by applicable law, K-Dle shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Service.",
    "terms.s7Title": "7. Advertising",
    "terms.s7Text": "The Service may display advertisements provided by third-party advertising networks, including Google AdSense. These advertisements may use cookies and similar technologies. By using the Service, you consent to the display of advertisements.",
    "terms.s8Title": "8. DMCA / Takedown Requests",
    "terms.s8Text": "If you believe that any content on K-Dle infringes upon your copyright, please send a written notice to pon07084@gmail.com with the following information: a description of the copyrighted work, the location of the infringing content, and your contact information. We will respond to all legitimate requests promptly.",
    "terms.s9Title": "9. Changes to Terms",
    "terms.s9Text": "We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting. Your continued use of the Service after changes constitutes acceptance of the revised terms.",
    "terms.s10Title": "10. Contact",
    "terms.s10Text": "For questions about these Terms, please contact us at pon07084@gmail.com.",

    // SEO - How to Play
    "seo.howToPlay": "How to Play {mode}",
    "seo.drama": "In Drama-dle, you guess the K-Drama from progressive text clues. Each wrong guess reveals a new hint — from genre and year to cast and famous quotes. You have 6 tries to identify the correct drama.",
    "seo.idol": "In Idol-dle, you guess the K-Pop idol by comparing attributes. Each guess shows whether the group, position, nationality, debut year, company, and generation match. Narrow it down in 6 tries!",
    "seo.lyric": "In Lyric-dle, you name the K-Pop song or K-Drama OST from translated lyrics. One new line is revealed with each attempt. Can you identify the song in 6 tries?",
    "seo.scene": "In Scene-dle, you recognize the K-Drama from a scene description that gets more specific with each guess. Use your drama knowledge to identify the show in 6 tries!",
  },

  es: {
    // Homepage
    "home.hero": "Puzzles Diarios de K-Drama y K-Pop",
    "home.subtitle": "Pon a prueba tu conocimiento con desafios diarios.\nAdivina dramas, idols, letras y escenas.",
    "home.footer": "K-Dle es un proyecto de fans no oficial. Toda la PI pertenece a sus respectivos propietarios.",
    "home.about": "Acerca de",
    "home.privacy": "Privacidad",
    "home.terms": "Terminos",

    // Mode descriptions
    "mode.drama.desc": "Adivina el K-Drama con pistas progresivas",
    "mode.idol.desc": "Identifica al idol de K-Pop por sus atributos",
    "mode.lyric.desc": "Nombra la cancion por la letra traducida",
    "mode.scene.desc": "Reconoce el drama por descripciones de escenas",

    // Game subtitles
    "game.subtitle.drama": "Adivina el K-Drama",
    "game.subtitle.idol": "Adivina el Idol de K-Pop",
    "game.subtitle.lyric": "Nombra la Cancion",
    "game.subtitle.scene": "Reconoce la Escena del K-Drama",

    // Game common
    "game.loading": "Cargando...",
    "game.guessIn": "Adivina el K-Drama en {n} intentos",
    "game.idolGuessIn": "Adivina el idol de K-Pop en {n} intentos",
    "game.lyricGuessIn": "Nombra la cancion por la letra traducida",
    "game.sceneGuessIn": "Reconoce el K-Drama por la descripcion de la escena",
    "game.placeholder.drama": "Escribe un titulo de K-Drama...",
    "game.placeholder.idol": "Escribe un nombre de idol...",
    "game.placeholder.lyric": "Escribe un titulo de cancion...",
    "game.placeholder.scene": "Escribe un titulo de K-Drama...",

    // Results
    "result.brilliant": "Brillante!",
    "result.gotIt": "Lo adivinaste!",
    "result.perfectEar": "Oido perfecto!",
    "result.sceneMaster": "Maestro de escenas!",
    "result.betterLuck": "Mejor suerte manana!",
    "result.guessedIn": "Adivinaste {title} en {n} {tries}",
    "result.idolGuessedIn": "{name} ({group}) en {n} {tries}",
    "result.lyricGuessedIn": "{title} de {artist} en {n} {tries}",
    "result.sceneGuessedIn": "{title} en {n} {tries}",
    "result.answerWas": "La respuesta era {title} ({titleKo})",
    "result.answerWasIdol": "La respuesta era {name} ({group})",
    "result.answerWasLyric": "La respuesta era {title} de {artist}",
    "result.try": "intento",
    "result.tries": "intentos",
    "result.shareResult": "Compartir Resultado",
    "result.shareStats": "Compartir Estadisticas",

    // Stats
    "stats.played": "Jugados",
    "stats.winRate": "Victorias",
    "stats.winPct": "% Victoria",
    "stats.streak": "Racha",
    "stats.max": "Max",
    "stats.title": "Estadisticas",
    "stats.dayStreak": "racha de {n} dias",
    "stats.guessDistribution": "Distribucion de Intentos",
    "stats.streakRanks": "Rangos de Racha",

    // Daily Stats
    "daily.title": "Estadisticas Globales de Hoy",
    "daily.loading": "Cargando estadisticas globales...",
    "daily.players": "Jugadores",
    "daily.avgGuesses": "Prom. Intentos",

    // Countdown
    "countdown.nextPuzzle": "Siguiente puzzle en",

    // Next Game
    "next.tryAnother": "Prueba otro modo",

    // Compare
    "compare.title": "Comparar",
    "compare.friend": "Amigo",
    "compare.you": "Tu",

    // Streak
    "streak.title": "Tu Racha Diaria",
    "streak.start": "Juega cualquier modo para iniciar tu racha",
    "streak.rank": "Rango: {title}",
    "streak.keepGoing": "Sigue asi!",

    // Ranks
    "rank.newcomer": "Novato",
    "rank.trainee": "Aprendiz",
    "rank.debut": "Debut",
    "rank.risingStar": "Estrella en Ascenso",
    "rank.allKill": "All-Kill",
    "rank.hallyuLegend": "Leyenda Hallyu",
    "rank.rising": "Ascenso",
    "rank.legend": "Leyenda",

    // How to Play
    "help.title": "Como Jugar",
    "help.intro": "Pon a prueba tu conocimiento de K-Drama y K-Pop con puzzles diarios.",
    "help.rule1": "Tienes <strong>6 intentos</strong> para adivinar cada puzzle",
    "help.rule2": "Nuevos puzzles cada dia a medianoche UTC",
    "help.rule3": "Comparte tus resultados sin spoilers",
    "help.rule4": "Construye tu racha — gana rangos de fan!",
    "help.gameModes": "Modos de Juego",
    "help.drama.desc": "Adivina el K-Drama con pistas de texto progresivas. Cada intento erroneo revela una nueva pista — desde el genero hasta el elenco.",
    "help.idol.desc": "Adivina el idol de K-Pop. Cada intento muestra comparaciones de atributos — grupo, posicion, nacionalidad, ano de debut y mas.",
    "help.lyric.desc": "Nombra la cancion por la letra traducida. Se revela una nueva linea con cada intento.",
    "help.scene.desc": "Reconoce el K-Drama por una descripcion de escena que se vuelve mas especifica con cada intento.",
    "help.days": "dias",

    // Toast
    "toast.copied": "Copiado al portapapeles!",

    // Idol attrs
    "idol.name": "Nombre",
    "idol.gender": "Genero",
    "idol.group": "Grupo",
    "idol.position": "Posicion",
    "idol.nationality": "Nacion",
    "idol.debut": "Debut",
    "idol.company": "Empresa",
    "idol.generation": "Gen",

    // Lyric
    "lyric.remaining": "{n} linea{s} mas restante{s}...",
    "lyric.ostHint": "Pista: Este es un OST de K-Drama",

    // Scene
    "scene.theScene": "La Escena",

    // 404
    "notFound.title": "Pagina No Encontrada",
    "notFound.desc": "La pagina que buscas no existe. Volvamos a los puzzles!",
    "notFound.back": "Volver a K-Dle",

    // Aria
    "aria.backHome": "Volver al inicio",
    "aria.statistics": "Estadisticas",
    "aria.help": "Ayuda",

    // Drama hint labels
    "hint.genre": "Genero",
    "hint.year": "Ano",
    "hint.network": "Cadena",
    "hint.episodes": "Episodios",
    "hint.keywords": "Palabras clave",
    "hint.initials": "Iniciales del actor principal",
    "hint.starring": "Protagonistas",

    // About page
    "about.title": "Acerca de K-Dle",
    "about.tagline": "El juego diario de adivinanzas para fans de K-Drama y K-Pop en todo el mundo.",
    "about.whatIs": "Que es K-Dle?",
    "about.whatIsP1": "K-Dle es un juego de puzzles diario y gratuito inspirado en Wordle, disenado para fans del entretenimiento coreano. Cada dia, nuevos puzzles ponen a prueba tu conocimiento de K-Dramas, idols de K-Pop, letras de canciones y escenas iconicas de dramas.",
    "about.whatIsP2": "Con cuatro modos de juego unicos, K-Dle ofrece algo para cada tipo de fan, ya sea que devores dramas, sigas grupos de K-Pop o conozcas cada OST de memoria.",
    "about.gameModes": "Modos de Juego",
    "about.drama": "Adivina el K-Drama con pistas de texto progresivas que incluyen genero, elenco y frases famosas.",
    "about.idol": "Identifica al idol de K-Pop comparando atributos como grupo, posicion, nacionalidad y ano de debut.",
    "about.lyric": "Nombra la cancion de K-Pop o el OST de K-Drama a partir de letras traducidas reveladas linea por linea.",
    "about.scene": "Reconoce el K-Drama por descripciones de escenas que se vuelven mas especificas con cada intento.",
    "about.howItWorks": "Como Funciona",
    "about.step1": "Elige un modo de juego desde la pagina principal",
    "about.step2": "Tienes 6 intentos para adivinar la respuesta correcta",
    "about.step3": "Cada intento incorrecto revela mas pistas",
    "about.step4": "Comparte tus resultados con amigos, sin spoilers!",
    "about.step5": "Vuelve cada dia para construir tu racha",
    "about.disclaimerTitle": "Aviso Legal",
    "about.disclaimerText": "K-Dle es un proyecto de fans no oficial creado unicamente con fines de entretenimiento. No esta afiliado, respaldado ni patrocinado por ninguna compania de entretenimiento, sello discografico o cadena de television. Todos los titulos de K-Drama, nombres de artistas de K-Pop, titulos de canciones y propiedad intelectual relacionada pertenecen a sus respectivos propietarios. El uso de estos nombres constituye uso nominativo justo en el contexto de un juego de trivia.",
    "about.links": "Enlaces",
    "about.privacyPolicy": "Politica de Privacidad",
    "about.termsOfService": "Terminos de Servicio",
    "about.contact": "Contacto",
    "about.contactText": "Para preguntas, comentarios o solicitudes de DMCA, envie un correo electronico a",

    // Privacy page
    "privacy.title": "Politica de Privacidad",
    "privacy.lastUpdated": "Ultima actualizacion: 6 de febrero de 2026",
    "privacy.s1Title": "1. Introduccion",
    "privacy.s1Text": "K-Dle (\"nosotros\" o \"nuestro\") opera el sitio web k-dle.vercel.app (el \"Servicio\"). Esta pagina le informa sobre nuestras politicas con respecto a la recopilacion, uso y divulgacion de datos personales cuando utiliza nuestro Servicio.",
    "privacy.s2Title": "2. Datos que Recopilamos",
    "privacy.s2Text": "Datos de Almacenamiento Local: Almacenamos su progreso de juego, estadisticas y datos de racha localmente en su dispositivo usando localStorage del navegador. Estos datos nunca salen de su dispositivo. Analitica: Podemos usar servicios de analitica de terceros (como Google Analytics) para recopilar datos de uso anonimos. Publicidad: Usamos Google AdSense para mostrar anuncios. Google puede usar cookies y tecnologias similares para servir anuncios basados en sus visitas anteriores.",
    "privacy.s3Title": "3. Cookies",
    "privacy.s3Text": "Nuestro Servicio puede utilizar cookies y tecnologias de seguimiento similares. Servicios de terceros como Google AdSense y Google Analytics usan cookies para proporcionar sus servicios. Puede configurar su navegador para rechazar todas las cookies o para indicar cuando se envia una cookie.",
    "privacy.s4Title": "4. Servicios de Terceros",
    "privacy.s4Text": "Podemos emplear companias y servicios de terceros, incluyendo: Google AdSense (publicidad), Google Analytics (analitica de uso) y Vercel (alojamiento). Estos terceros tienen acceso a datos limitados solo para realizar tareas en nuestro nombre y estan obligados a no divulgarlos ni usarlos para otros fines.",
    "privacy.s5Title": "5. Privacidad de Menores",
    "privacy.s5Text": "Nuestro Servicio esta destinado a audiencias generales. No recopilamos intencionalmente informacion de identificacion personal de menores de 13 anos. Si usted es padre o tutor y cree que su hijo nos ha proporcionado datos personales, contactenos.",
    "privacy.s6Title": "6. Retencion de Datos",
    "privacy.s6Text": "Los datos del juego se almacenan localmente en su dispositivo y persisten hasta que borre los datos de su navegador. No retenemos ningun dato personal en nuestros servidores.",
    "privacy.s7Title": "7. Sus Derechos",
    "privacy.s7Text": "Puede borrar todos los datos del juego almacenados localmente en cualquier momento limpiando el localStorage de su navegador. Para preguntas sobre datos recopilados por servicios de terceros, consulte sus respectivas politicas de privacidad.",
    "privacy.s8Title": "8. Cambios en Esta Politica",
    "privacy.s8Text": "Podemos actualizar nuestra Politica de Privacidad periodicamente. Le notificaremos cualquier cambio publicando la nueva Politica de Privacidad en esta pagina y actualizando la fecha de \"Ultima actualizacion\".",
    "privacy.s9Title": "9. Contactenos",
    "privacy.s9Text": "Si tiene alguna pregunta sobre esta Politica de Privacidad, contactenos en pon07084@gmail.com.",

    // Terms page
    "terms.title": "Terminos de Servicio",
    "terms.lastUpdated": "Ultima actualizacion: 6 de febrero de 2026",
    "terms.s1Title": "1. Aceptacion de los Terminos",
    "terms.s1Text": "Al acceder y usar K-Dle (el \"Servicio\"), usted acepta y se compromete a cumplir estos Terminos de Servicio. Si no esta de acuerdo con estos terminos, por favor no use el Servicio.",
    "terms.s2Title": "2. Descripcion del Servicio",
    "terms.s2Text": "K-Dle es un juego de puzzles diario, gratuito y basado en la web que pone a prueba su conocimiento de K-Drama y K-Pop. El Servicio ofrece multiples modos de juego incluyendo Drama-dle, Idol-dle, Lyric-dle y Scene-dle. Nuevos puzzles estan disponibles diariamente.",
    "terms.s3Title": "3. Propiedad Intelectual",
    "terms.s3Text": "K-Dle es un proyecto de fans no oficial. Todos los titulos de K-Drama, nombres de artistas de K-Pop, titulos de canciones y propiedad intelectual relacionada referenciada en este juego pertenecen a sus respectivos propietarios y titulares de derechos de autor. El uso de estos nombres es con fines informativos y de entretenimiento dentro del contexto de un juego de trivia y constituye uso nominativo justo. No se implica ningun respaldo, patrocinio o afiliacion. Si usted es titular de derechos y cree que algun contenido en este Servicio infringe sus derechos de propiedad intelectual, contactenos.",
    "terms.s4Title": "4. Conducta del Usuario",
    "terms.s4Text": "Usted se compromete a no: intentar obtener acceso no autorizado al Servicio o sus sistemas relacionados; usar scripts automatizados para acceder o interactuar con el Servicio; realizar ingenieria inversa o intentar extraer el codigo fuente del Servicio; compartir respuestas de puzzles diarios en plataformas publicas antes de que expire el puzzle.",
    "terms.s5Title": "5. Descargo de Garantias",
    "terms.s5Text": "El Servicio se proporciona \"tal cual\" y \"segun disponibilidad\" sin garantias de ningun tipo, expresas o implicitas. No garantizamos que el Servicio sea ininterrumpido, libre de errores o libre de componentes daninos.",
    "terms.s6Title": "6. Limitacion de Responsabilidad",
    "terms.s6Text": "En la medida maxima permitida por la ley aplicable, K-Dle no sera responsable por danos indirectos, incidentales, especiales, consecuentes o punitivos que surjan de o esten relacionados con su uso del Servicio.",
    "terms.s7Title": "7. Publicidad",
    "terms.s7Text": "El Servicio puede mostrar anuncios proporcionados por redes publicitarias de terceros, incluyendo Google AdSense. Estos anuncios pueden usar cookies y tecnologias similares. Al usar el Servicio, usted consiente la visualizacion de anuncios.",
    "terms.s8Title": "8. DMCA / Solicitudes de Retiro",
    "terms.s8Text": "Si cree que algun contenido en K-Dle infringe sus derechos de autor, envie una notificacion escrita a pon07084@gmail.com con la siguiente informacion: una descripcion de la obra protegida, la ubicacion del contenido infractor y su informacion de contacto. Responderemos a todas las solicitudes legitimas con prontitud.",
    "terms.s9Title": "9. Cambios en los Terminos",
    "terms.s9Text": "Nos reservamos el derecho de modificar estos Terminos de Servicio en cualquier momento. Los cambios seran efectivos inmediatamente despues de su publicacion. Su uso continuado del Servicio despues de los cambios constituye la aceptacion de los terminos revisados.",
    "terms.s10Title": "10. Contacto",
    "terms.s10Text": "Para preguntas sobre estos Terminos, contactenos en pon07084@gmail.com.",

    // SEO - How to Play
    "seo.howToPlay": "Como Jugar {mode}",
    "seo.drama": "En Drama-dle, adivinas el K-Drama a partir de pistas de texto progresivas. Cada intento incorrecto revela una nueva pista, desde el genero y el ano hasta el elenco y frases famosas. Tienes 6 intentos para identificar el drama correcto.",
    "seo.idol": "En Idol-dle, adivinas el idol de K-Pop comparando atributos. Cada intento muestra si el grupo, posicion, nacionalidad, ano de debut, compania y generacion coinciden. Reducelo en 6 intentos!",
    "seo.lyric": "En Lyric-dle, nombras la cancion de K-Pop o el OST de K-Drama a partir de letras traducidas. Se revela una nueva linea con cada intento. Puedes identificar la cancion en 6 intentos?",
    "seo.scene": "En Scene-dle, reconoces el K-Drama por una descripcion de escena que se vuelve mas especifica con cada intento. Usa tu conocimiento de dramas para identificar la serie en 6 intentos!",
  },

  ko: {
    // Homepage
    "home.hero": "K-드라마 & K-Pop 데일리 퍼즐",
    "home.subtitle": "매일 새로운 도전으로 당신의 지식을 시험해보세요.\n드라마, 아이돌, 가사, 명장면을 맞혀보세요.",
    "home.footer": "K-Dle은 비공식 팬 프로젝트입니다. 모든 지적재산권은 해당 소유자에게 있습니다.",
    "home.about": "소개",
    "home.privacy": "개인정보",
    "home.terms": "이용약관",

    // Mode descriptions
    "mode.drama.desc": "단서로 K-드라마를 맞혀보세요",
    "mode.idol.desc": "속성으로 K-Pop 아이돌을 맞혀보세요",
    "mode.lyric.desc": "번역된 가사로 노래를 맞혀보세요",
    "mode.scene.desc": "장면 묘사로 드라마를 맞혀보세요",

    // Game subtitles
    "game.subtitle.drama": "K-드라마 맞히기",
    "game.subtitle.idol": "K-Pop 아이돌 맞히기",
    "game.subtitle.lyric": "가사로 노래 맞히기",
    "game.subtitle.scene": "장면으로 드라마 맞히기",

    // Game common
    "game.loading": "로딩 중...",
    "game.guessIn": "{n}번 안에 K-드라마를 맞혀보세요",
    "game.idolGuessIn": "{n}번 안에 K-Pop 아이돌을 맞혀보세요",
    "game.lyricGuessIn": "번역된 가사로 노래를 맞혀보세요",
    "game.sceneGuessIn": "장면 묘사로 K-드라마를 맞혀보세요",
    "game.placeholder.drama": "K-드라마 제목을 입력하세요...",
    "game.placeholder.idol": "아이돌 이름을 입력하세요...",
    "game.placeholder.lyric": "노래 제목을 입력하세요...",
    "game.placeholder.scene": "K-드라마 제목을 입력하세요...",

    // Results
    "result.brilliant": "대단해요!",
    "result.gotIt": "정답!",
    "result.perfectEar": "완벽한 귀!",
    "result.sceneMaster": "장면 마스터!",
    "result.betterLuck": "내일 다시 도전하세요!",
    "result.guessedIn": "{title}을(를) {n}번 만에 맞혔습니다",
    "result.idolGuessedIn": "{name} ({group}) {n}번 만에 맞혔습니다",
    "result.lyricGuessedIn": "{artist}의 {title}을(를) {n}번 만에 맞혔습니다",
    "result.sceneGuessedIn": "{title}을(를) {n}번 만에 맞혔습니다",
    "result.answerWas": "정답은 {title} ({titleKo})이었습니다",
    "result.answerWasIdol": "정답은 {name} ({group})이었습니다",
    "result.answerWasLyric": "정답은 {artist}의 {title}이었습니다",
    "result.try": "번",
    "result.tries": "번",
    "result.shareResult": "결과 공유하기",
    "result.shareStats": "통계 공유하기",

    // Stats
    "stats.played": "플레이",
    "stats.winRate": "승률",
    "stats.winPct": "승률",
    "stats.streak": "연속",
    "stats.max": "최고",
    "stats.title": "통계",
    "stats.dayStreak": "{n}일 연속",
    "stats.guessDistribution": "추측 분포",
    "stats.streakRanks": "연속 랭크",

    // Daily Stats
    "daily.title": "오늘의 글로벌 통계",
    "daily.loading": "글로벌 통계 로딩 중...",
    "daily.players": "참여자",
    "daily.avgGuesses": "평균 횟수",

    // Countdown
    "countdown.nextPuzzle": "다음 퍼즐까지",

    // Next Game
    "next.tryAnother": "다른 모드 도전하기",

    // Compare
    "compare.title": "비교",
    "compare.friend": "친구",
    "compare.you": "나",

    // Streak
    "streak.title": "데일리 연속 기록",
    "streak.start": "아무 모드나 플레이해서 연속 기록을 시작하세요",
    "streak.rank": "랭크: {title}",
    "streak.keepGoing": "계속 도전하세요!",

    // Ranks
    "rank.newcomer": "신입",
    "rank.trainee": "연습생",
    "rank.debut": "데뷔",
    "rank.risingStar": "라이징 스타",
    "rank.allKill": "올킬",
    "rank.hallyuLegend": "한류 레전드",
    "rank.rising": "라이징",
    "rank.legend": "레전드",

    // How to Play
    "help.title": "게임 방법",
    "help.intro": "매일 새로운 K-드라마 & K-Pop 퍼즐에 도전하세요.",
    "help.rule1": "각 퍼즐마다 <strong>6번</strong>의 기회가 있습니다",
    "help.rule2": "매일 자정(UTC)에 새로운 퍼즐이 나옵니다",
    "help.rule3": "스포일러 없이 결과를 공유하세요",
    "help.rule4": "연속 기록을 쌓아 팬 랭크를 올리세요!",
    "help.gameModes": "게임 모드",
    "help.drama.desc": "텍스트 단서로 K-드라마를 맞혀보세요. 틀릴 때마다 장르부터 출연진까지 새로운 힌트가 공개됩니다.",
    "help.idol.desc": "K-Pop 아이돌을 맞혀보세요. 추측할 때마다 그룹, 포지션, 국적, 데뷔 연도 등의 속성이 비교됩니다.",
    "help.lyric.desc": "번역된 가사로 노래를 맞혀보세요. 추측할 때마다 새로운 가사 한 줄이 공개됩니다.",
    "help.scene.desc": "장면 묘사로 K-드라마를 맞혀보세요. 추측할 때마다 더 구체적인 설명이 공개됩니다.",
    "help.days": "일",

    // Toast
    "toast.copied": "클립보드에 복사했습니다!",

    // Idol attrs
    "idol.name": "이름",
    "idol.gender": "성별",
    "idol.group": "그룹",
    "idol.position": "포지션",
    "idol.nationality": "국적",
    "idol.debut": "데뷔",
    "idol.company": "소속사",
    "idol.generation": "세대",

    // Lyric
    "lyric.remaining": "남은 줄: {n}줄...",
    "lyric.ostHint": "힌트: K-드라마 OST입니다",

    // Scene
    "scene.theScene": "장면",

    // 404
    "notFound.title": "페이지를 찾을 수 없습니다",
    "notFound.desc": "찾으시는 페이지가 존재하지 않습니다. 퍼즐로 돌아가볼까요?",
    "notFound.back": "K-Dle로 돌아가기",

    // Aria
    "aria.backHome": "홈으로 돌아가기",
    "aria.statistics": "통계",
    "aria.help": "도움말",

    // Drama hint labels
    "hint.genre": "장르",
    "hint.year": "연도",
    "hint.network": "방송사",
    "hint.episodes": "회차",
    "hint.keywords": "키워드",
    "hint.initials": "주연 이니셜",
    "hint.starring": "주연",

    // About page
    "about.title": "K-Dle 소개",
    "about.tagline": "전 세계 K-드라마 및 K-Pop 팬을 위한 데일리 추측 게임.",
    "about.whatIs": "K-Dle이란?",
    "about.whatIsP1": "K-Dle은 Wordle에서 영감을 받은 무료 데일리 퍼즐 게임으로, 한국 엔터테인먼트 팬을 위해 만들어졌습니다. 매일 새로운 퍼즐로 K-드라마, K-Pop 아이돌, 노래 가사, 명장면에 대한 지식을 시험합니다.",
    "about.whatIsP2": "네 가지 독특한 게임 모드로, K-Dle은 드라마를 몰아보는 팬이든, K-Pop 그룹을 팔로우하는 팬이든, 모든 OST를 외우고 있는 팬이든 모두를 위한 즐거움을 제공합니다.",
    "about.gameModes": "게임 모드",
    "about.drama": "장르, 출연진, 명대사 등 점진적 텍스트 단서로 K-드라마를 맞혀보세요.",
    "about.idol": "그룹, 포지션, 국적, 데뷔 연도 등의 속성을 비교하며 K-Pop 아이돌을 맞혀보세요.",
    "about.lyric": "한 줄씩 공개되는 번역된 가사로 K-Pop 노래 또는 K-드라마 OST를 맞혀보세요.",
    "about.scene": "추측할 때마다 더 구체적으로 변하는 장면 묘사로 K-드라마를 맞혀보세요.",
    "about.howItWorks": "이용 방법",
    "about.step1": "홈페이지에서 게임 모드를 선택하세요",
    "about.step2": "정답을 맞힐 기회는 6번입니다",
    "about.step3": "틀릴 때마다 더 많은 단서가 공개됩니다",
    "about.step4": "스포일러 없이 친구들과 결과를 공유하세요!",
    "about.step5": "매일 돌아와서 연속 기록을 쌓으세요",
    "about.disclaimerTitle": "면책 조항",
    "about.disclaimerText": "K-Dle은 오직 엔터테인먼트 목적으로 제작된 비공식 팬 프로젝트입니다. 어떤 엔터테인먼트 회사, 음반사, 방송사와도 제휴, 보증 또는 후원 관계가 없습니다. 모든 K-드라마 제목, K-Pop 아티스트 이름, 노래 제목 및 관련 지적재산권은 각 소유자에게 귀속됩니다. 이러한 이름의 사용은 트리비아 게임의 맥락에서 공정한 지명적 사용에 해당합니다.",
    "about.links": "링크",
    "about.privacyPolicy": "개인정보처리방침",
    "about.termsOfService": "이용약관",
    "about.contact": "문의",
    "about.contactText": "질문, 피드백 또는 DMCA 요청은 다음 이메일로 연락해 주세요:",

    // Privacy page
    "privacy.title": "개인정보처리방침",
    "privacy.lastUpdated": "최종 업데이트: 2026년 2월 6일",
    "privacy.s1Title": "1. 소개",
    "privacy.s1Text": "K-Dle(\"당사\")은 웹사이트 k-dle.vercel.app(\"서비스\")을 운영합니다. 이 페이지는 서비스 이용 시 개인 데이터의 수집, 사용 및 공개에 관한 당사의 정책을 안내합니다.",
    "privacy.s2Title": "2. 수집하는 데이터",
    "privacy.s2Text": "로컬 저장소 데이터: 게임 진행 상황, 통계 및 연속 기록 데이터를 브라우저의 localStorage를 사용하여 사용자의 기기에 로컬로 저장합니다. 이 데이터는 기기를 벗어나지 않습니다. 분석: Google Analytics와 같은 타사 분석 서비스를 사용하여 페이지 조회수, 세션 시간 등 익명화된 사용 데이터를 수집할 수 있습니다. 광고: Google AdSense를 사용하여 광고를 표시합니다. Google은 쿠키 및 유사 기술을 사용하여 이전 방문에 기반한 광고를 제공할 수 있습니다.",
    "privacy.s3Title": "3. 쿠키",
    "privacy.s3Text": "당사 서비스는 쿠키 및 유사한 추적 기술을 사용할 수 있습니다. Google AdSense 및 Google Analytics와 같은 타사 서비스가 쿠키를 사용합니다. 브라우저에서 모든 쿠키를 거부하거나 쿠키가 전송될 때 알림을 받도록 설정할 수 있습니다.",
    "privacy.s4Title": "4. 타사 서비스",
    "privacy.s4Text": "당사는 Google AdSense(광고), Google Analytics(사용 분석), Vercel(호스팅) 등의 타사 회사 및 서비스를 이용할 수 있습니다. 이러한 타사는 당사를 대신하여 작업을 수행하기 위해서만 제한된 데이터에 접근할 수 있으며, 이를 다른 목적으로 공개하거나 사용하지 않을 의무가 있습니다.",
    "privacy.s5Title": "5. 아동 개인정보 보호",
    "privacy.s5Text": "당사 서비스는 일반 이용자를 대상으로 합니다. 13세 미만 아동의 개인 식별 정보를 고의로 수집하지 않습니다. 보호자로서 자녀가 개인 데이터를 제공했다고 판단되시면 연락해 주세요.",
    "privacy.s6Title": "6. 데이터 보존",
    "privacy.s6Text": "게임 데이터는 사용자의 기기에 로컬로 저장되며 브라우저 데이터를 삭제할 때까지 유지됩니다. 당사 서버에는 개인 데이터를 보존하지 않습니다.",
    "privacy.s7Title": "7. 이용자의 권리",
    "privacy.s7Text": "브라우저의 localStorage를 삭제하여 언제든지 로컬에 저장된 모든 게임 데이터를 삭제할 수 있습니다. 타사 서비스가 수집한 데이터에 대한 질문은 해당 서비스의 개인정보처리방침을 참조해 주세요.",
    "privacy.s8Title": "8. 정책 변경",
    "privacy.s8Text": "당사는 수시로 개인정보처리방침을 업데이트할 수 있습니다. 변경 사항이 있을 경우 이 페이지에 새로운 개인정보처리방침을 게시하고 \"최종 업데이트\" 날짜를 수정하여 알려드립니다.",
    "privacy.s9Title": "9. 문의하기",
    "privacy.s9Text": "이 개인정보처리방침에 대해 궁금한 점이 있으시면 pon07084@gmail.com으로 연락해 주세요.",

    // Terms page
    "terms.title": "이용약관",
    "terms.lastUpdated": "최종 업데이트: 2026년 2월 6일",
    "terms.s1Title": "1. 약관 동의",
    "terms.s1Text": "K-Dle(\"서비스\")에 접속하고 이용함으로써 본 이용약관에 동의하고 이를 준수할 것에 동의합니다. 본 약관에 동의하지 않는 경우 서비스를 이용하지 마세요.",
    "terms.s2Title": "2. 서비스 설명",
    "terms.s2Text": "K-Dle은 K-드라마와 K-Pop에 대한 지식을 시험하는 무료 웹 기반 데일리 퍼즐 게임입니다. Drama-dle, Idol-dle, Lyric-dle, Scene-dle을 포함한 다양한 게임 모드를 제공합니다. 매일 새로운 퍼즐이 제공됩니다.",
    "terms.s3Title": "3. 지적재산권",
    "terms.s3Text": "K-Dle은 비공식 팬 프로젝트입니다. 이 게임에서 참조되는 모든 K-드라마 제목, K-Pop 아티스트 이름, 노래 제목 및 관련 지적재산권은 각 소유자와 저작권자에게 귀속됩니다. 이러한 이름의 사용은 트리비아/퀴즈 게임의 맥락에서 정보 제공 및 엔터테인먼트 목적이며 공정한 지명적 사용에 해당합니다. 어떤 보증, 후원 또는 제휴도 암시되지 않습니다. 권리자로서 서비스의 콘텐츠가 지적재산권을 침해한다고 판단되시면 연락해 주세요.",
    "terms.s4Title": "4. 사용자 행동",
    "terms.s4Text": "다음 행위를 하지 않기로 동의합니다: 서비스 또는 관련 시스템에 대한 무단 접근 시도; 자동화된 스크립트를 사용한 서비스 접근 또는 상호작용; 서비스의 소스 코드를 리버스 엔지니어링하거나 추출 시도; 퍼즐이 만료되기 전에 공개 플랫폼에서 일일 퍼즐 정답 공유.",
    "terms.s5Title": "5. 보증의 면책",
    "terms.s5Text": "서비스는 명시적이든 묵시적이든 어떠한 종류의 보증 없이 \"있는 그대로\" 및 \"이용 가능한 상태로\" 제공됩니다. 서비스가 중단 없이, 오류 없이 또는 유해한 구성 요소 없이 제공된다고 보장하지 않습니다.",
    "terms.s6Title": "6. 책임의 제한",
    "terms.s6Text": "관련 법률이 허용하는 최대 범위 내에서, K-Dle은 서비스 이용으로 인해 또는 이와 관련하여 발생하는 간접적, 부수적, 특별, 결과적 또는 징벌적 손해에 대해 책임지지 않습니다.",
    "terms.s7Title": "7. 광고",
    "terms.s7Text": "서비스는 Google AdSense를 포함한 타사 광고 네트워크에서 제공하는 광고를 표시할 수 있습니다. 이러한 광고는 쿠키 및 유사 기술을 사용할 수 있습니다. 서비스를 이용함으로써 광고 표시에 동의합니다.",
    "terms.s8Title": "8. DMCA / 삭제 요청",
    "terms.s8Text": "K-Dle의 콘텐츠가 저작권을 침해한다고 판단되시면 pon07084@gmail.com으로 다음 정보를 포함한 서면 통지를 보내주세요: 저작물에 대한 설명, 침해 콘텐츠의 위치, 연락처 정보. 모든 합법적인 요청에 신속하게 대응하겠습니다.",
    "terms.s9Title": "9. 약관 변경",
    "terms.s9Text": "당사는 언제든지 본 이용약관을 수정할 권리를 보유합니다. 변경 사항은 게시 즉시 효력이 발생합니다. 변경 후 서비스를 계속 이용하면 수정된 약관에 동의한 것으로 간주됩니다.",
    "terms.s10Title": "10. 문의",
    "terms.s10Text": "본 약관에 대해 궁금한 점이 있으시면 pon07084@gmail.com으로 연락해 주세요.",

    // SEO - How to Play
    "seo.howToPlay": "{mode} 플레이 방법",
    "seo.drama": "Drama-dle에서는 점진적인 텍스트 단서로 K-드라마를 맞힙니다. 틀릴 때마다 장르와 연도부터 출연진과 명대사까지 새로운 힌트가 공개됩니다. 6번의 기회 안에 정확한 드라마를 맞혀보세요.",
    "seo.idol": "Idol-dle에서는 속성을 비교하며 K-Pop 아이돌을 맞힙니다. 추측할 때마다 그룹, 포지션, 국적, 데뷔 연도, 소속사, 세대가 일치하는지 보여줍니다. 6번 안에 좁혀보세요!",
    "seo.lyric": "Lyric-dle에서는 번역된 가사로 K-Pop 노래 또는 K-드라마 OST를 맞힙니다. 추측할 때마다 새로운 가사 한 줄이 공개됩니다. 6번 안에 노래를 맞힐 수 있나요?",
    "seo.scene": "Scene-dle에서는 추측할 때마다 더 구체적으로 변하는 장면 묘사로 K-드라마를 맞힙니다. 드라마 지식을 활용하여 6번 안에 작품을 맞혀보세요!",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
export type TFunction = (key: TranslationKey, params?: Record<string, string | number>) => string;

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && (saved === "en" || saved === "es" || saved === "ko")) {
      setLocaleState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(STORAGE_KEY, newLocale);
    document.documentElement.lang = newLocale;
  }, []);

  const t = useCallback(
    (key: TranslationKey, params?: Record<string, string | number>): string => {
      let text: string = translations[locale]?.[key] ?? translations.en[key] ?? key;
      if (params) {
        for (const [k, v] of Object.entries(params)) {
          text = text.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
        }
      }
      return text;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useTranslation must be used within LanguageProvider");
  return ctx;
}

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  es: "ES",
  ko: "KO",
};
