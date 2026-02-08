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
    "result.answerLabel": "The answer was",
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
    "help.rule1_pre": "You have ",
    "help.rule1_bold": "6 tries",
    "help.rule1_post": " to guess each puzzle",
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
    "toast.linkCopied": "Link copied! Paste in chat to share",

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

    // SEO - Game page expanded content
    "seo.dramaHints": "Hints include genre, year, network, episode count, synopsis keywords, lead actor initials, famous quotes, and starring cast. Each hint narrows down the possibilities from 75 K-Dramas spanning romance, thriller, comedy, fantasy, and more.",
    "seo.dramaStrategy": "Start by analyzing the genre and year to eliminate large groups of dramas. Pay close attention to network and episode count — these often pinpoint the exact show. Famous quotes are your best friend in later rounds.",
    "seo.idolHints": "Each guess reveals color-coded comparisons across 7 attributes: group name, gender, position (vocalist, rapper, dancer), nationality, debut year, company, and generation. Green means exact match, yellow means close, and red means different.",
    "seo.idolStrategy": "Begin with a popular idol to establish baseline comparisons. Use the generation and company clues to narrow your search quickly. Position and nationality are strong differentiators when other clues overlap.",
    "seo.lyricHints": "You start with one translated lyric line. Each wrong guess reveals an additional line, up to 6 lines total. After 2 wrong guesses on OST songs, you also get a hint that it's a K-Drama OST.",
    "seo.lyricStrategy": "Focus on unique phrases or emotional themes in the lyrics. K-Pop songs often have distinctive English phrases mixed in. OST lyrics tend to be more emotional and narrative-driven compared to idol group songs.",
    "seo.sceneHints": "Scene descriptions start vague — setting and mood — and become more specific with each guess, eventually revealing character names and plot details. You have 6 descriptions total to work with.",
    "seo.sceneStrategy": "The first description sets the atmosphere. Look for unique settings or time periods. Character dynamics in later hints often make the drama obvious. Think about iconic scenes from popular K-Dramas first.",

    // Homepage expanded content
    "home.whatIsTitle": "What is K-Dle?",
    "home.whatIsText": "K-Dle is a free daily puzzle game for K-Drama and K-Pop fans worldwide. Inspired by Wordle, we bring four unique game modes that test your knowledge of Korean entertainment — from iconic drama scenes to chart-topping K-Pop hits. New puzzles are available every day at midnight, so there's always a fresh challenge waiting for you.",
    "home.whyTitle": "Why K-Drama Fans Love K-Dle",
    "home.whyP1": "Whether you've watched every episode of Crash Landing on You or can sing along to every BTS track, K-Dle has something for you. Our puzzles cover 75+ K-Dramas and 75+ K-Pop songs, spanning classics and modern hits.",
    "home.whyP2": "Challenge your friends by sharing your daily results, build your streak to earn fan ranks from Newcomer to Hallyu Legend, and compete to see who knows Korean entertainment best.",
    "home.howPlayTitle": "How to Play",
    "home.howPlayText": "Choose any of the four game modes. You get 6 tries to guess the correct answer. Each wrong guess reveals additional clues to help you narrow down the possibilities. Share your results with friends — no spoilers included! Come back every day to maintain your streak.",
    "home.moreAbout": "Learn More",

    // Contact page
    "contact.title": "Contact Us",
    "contact.tagline": "We'd love to hear from you. Send us feedback, report issues, or submit DMCA requests.",
    "contact.nameLabel": "Name",
    "contact.namePlaceholder": "Your name",
    "contact.emailLabel": "Email",
    "contact.emailPlaceholder": "your@email.com",
    "contact.messageLabel": "Message",
    "contact.messagePlaceholder": "How can we help you?",
    "contact.send": "Send Message",
    "contact.orEmail": "Or email us directly at",
    "contact.responseTime": "We typically respond within 48 hours.",
    "contact.dmca": "For DMCA / takedown requests, please include a description of the copyrighted work, the location of the infringing content, and your contact information.",
    "contact.sent": "Message sent! We'll get back to you soon.",

    // FAQ page
    "faq.title": "Frequently Asked Questions",
    "faq.q1": "What is K-Dle?",
    "faq.a1": "K-Dle is a free daily puzzle game inspired by Wordle, designed for fans of Korean entertainment. It features four game modes: Drama-dle (guess K-Dramas from clues), Idol-dle (identify K-Pop idols by attributes), Lyric-dle (name songs from translated lyrics), and Scene-dle (recognize dramas from scene descriptions).",
    "faq.q2": "How many tries do I get?",
    "faq.a2": "You get 6 tries for each game mode. Each wrong guess reveals additional clues to help you narrow down the answer.",
    "faq.q3": "When do new puzzles appear?",
    "faq.a3": "New puzzles are available every day at midnight in your local time zone. All four game modes refresh simultaneously.",
    "faq.q4": "Is K-Dle free to play?",
    "faq.a4": "Yes, K-Dle is completely free. No account registration is required. Just visit the website and start playing!",
    "faq.q5": "How many dramas and songs are in the game?",
    "faq.a5": "K-Dle features 75 K-Dramas across all difficulty levels (from global hits like Squid Game to hidden gems), 75 K-Pop songs and OSTs, 75 idol profiles, and 75 iconic scene descriptions.",
    "faq.q6": "Can I play in different languages?",
    "faq.a6": "Yes! K-Dle supports English, Spanish, and Korean. You can switch languages using the language selector in the top right corner. Game hints and clues are also translated.",
    "faq.q7": "How does the streak system work?",
    "faq.a7": "Your daily streak increases each day you play at least one game mode. Play consistently to earn fan ranks: Newcomer, Trainee, Debut, Rising Star, All-Kill, and Hallyu Legend.",
    "faq.q8": "Can I share my results?",
    "faq.a8": "Yes! After completing a puzzle, click the Share Result button. Your results are shared as emoji grids without revealing the answer, so no spoilers for your friends.",
    "faq.q9": "What happens if I miss a day?",
    "faq.a9": "If you miss a day, your current streak resets to zero. However, your total games played, win rate, and max streak are preserved in your statistics.",
    "faq.q10": "Is my data stored online?",
    "faq.a10": "No. All your game progress, statistics, and streak data are stored locally on your device using browser localStorage. Nothing is sent to any server. If you clear your browser data, your progress will be reset.",
    "faq.q11": "How are the daily puzzles chosen?",
    "faq.a11": "Puzzles are selected using a deterministic algorithm that shuffles the order differently for each game mode. This ensures variety and prevents the same content from appearing too frequently.",
    "faq.q12": "Is K-Dle affiliated with any K-Pop company or broadcaster?",
    "faq.a12": "No. K-Dle is an unofficial fan project created for entertainment purposes only. It is not affiliated with, endorsed by, or sponsored by any entertainment company, record label, or broadcasting network.",
    "faq.q13": "I found an error in the game data. How can I report it?",
    "faq.a13": "Please contact us at pon07084@gmail.com with details about the error. We appreciate your help in keeping the game accurate!",
    "faq.q14": "Can I suggest new dramas or songs to add?",
    "faq.a14": "Absolutely! We welcome suggestions. Email us at pon07084@gmail.com with your ideas. We're always looking to expand our puzzle database.",
    "faq.q15": "Does K-Dle work on mobile?",
    "faq.a15": "Yes, K-Dle is fully responsive and works great on smartphones, tablets, and desktop browsers. You can also add it to your home screen for an app-like experience.",

    // About page expanded content
    "about.whyTitle": "Why We Built K-Dle",
    "about.whyP1": "The Korean Wave (Hallyu) has taken the world by storm. Millions of fans worldwide watch K-Dramas, follow K-Pop groups, and immerse themselves in Korean culture. We created K-Dle to bring this global community together through daily puzzle challenges that celebrate the entertainment we all love.",
    "about.whyP2": "Inspired by the viral success of Wordle, K-Dle takes the simple joy of daily guessing games and combines it with the rich world of Korean entertainment. Whether you're a casual viewer or a hardcore fan, there's always something new to discover.",
    "about.featuresTitle": "Features",
    "about.feature1": "Four unique game modes covering dramas, idols, lyrics, and iconic scenes",
    "about.feature2": "75+ puzzles per mode with carefully curated content from classics to modern hits",
    "about.feature3": "Daily streak system with fan ranks from Newcomer to Hallyu Legend",
    "about.feature4": "Spoiler-free sharing — challenge your friends without giving away answers",
    "about.feature5": "Available in English, Spanish, and Korean with fully translated game content",
    "about.feature6": "No account required — play instantly on any device",
    "about.communityTitle": "Join the Community",
    "about.communityText": "Share your daily results with friends and see who knows K-Drama and K-Pop best. Build your streak, earn fan ranks, and become a Hallyu Legend. New puzzles every day at midnight — don't miss your streak!",
    "about.techTitle": "Built With Care",
    "about.techText": "K-Dle is built with modern web technologies for a fast, smooth experience on any device. No downloads required — just visit and play. Your progress is saved automatically in your browser.",

    // Emoji Voting
    "emoji.title": "How was this puzzle?",
    "emoji.totalVotes": "{n} votes",

    // Challenge
    "challenge.button": "Challenge a Friend",
    "challenge.banner": "A friend challenged you!",
    "challenge.friendSolved": "They solved it in {n} tries. Can you beat them?",
    "challenge.friendFailed": "They couldn't solve it. Can you?",
    "challenge.message": "I challenge you to {mode} #{n}! Can you beat my score?",

    // Daily Stats Percentile
    "daily.percentile": "You solved it faster than {n}% of players!",

    // Fandom
    "fandom.yourFandom": "Your fandom",
    "fandom.change": "Change",
    "fandom.selectPrompt": "Select your fandom to join Fandom Battle!",
    "fandom.selectTitle": "Choose Your Fandom",
    "fandom.loading": "Loading fandom stats...",
    "fandom.leaderboardTitle": "Fandom Battle — Today's Ranking",
    "fandom.plays": "plays",

    // Party Mode
    "party.title": "Party Mode",
    "party.subtitle": "Play with friends",
    "party.homeDesc": "Create a room and compete with friends in real-time",
    "party.description": "Create a party room, share the code with friends, and compete to see who knows K-Drama & K-Pop best!",
    "party.createRoom": "Create a Room",
    "party.createDesc": "Pick a game mode and invite your friends",
    "party.joinRoom": "Join a Room",
    "party.joinDesc": "Enter a 4-digit code from your friend",
    "party.back": "Back",
    "party.yourName": "Your Name",
    "party.namePlaceholder": "Enter your name...",
    "party.selectMode": "Game Mode",
    "party.createButton": "Create Party",
    "party.createError": "Failed to create party. Please try again.",
    "party.enterCode": "Room Code",
    "party.invalidCode": "Please enter a 4-digit code",
    "party.joinButton": "Join Party",
    "party.notFound": "Party not found. Check the code and try again.",
    "party.roomCode": "Room Code",
    "party.shareCode": "Share Invite Link",
    "party.inviteText": "Join my K-Dle party! Room code: {code}",
    "party.playNow": "Play Now",
    "party.room": "Party Room",
    "party.hostedBy": "Hosted by {name}",
    "party.waitingForPlayers": "Waiting for players to finish...",
    "party.autoRefresh": "Results refresh automatically",

    // Global Stats
    "globalStats.title": "Today's Global Stats",
    "globalStats.subtitle": "Live stats from players worldwide",
    "globalStats.description": "See how players around the world are doing on today's puzzles.",
    "globalStats.overall": "Overall Today",
    "globalStats.totalPlays": "Total Plays",
    "globalStats.activeModes": "Active Modes",
    "globalStats.noData": "No stats yet today. Be the first to play!",
    "globalStats.noPlaysYet": "No one has played this mode yet today.",
    "globalStats.playNow": "Play now",
    "globalStats.refreshNote": "Stats update in real-time as players complete puzzles.",
    "globalStats.homeDesc": "See how the world is playing today",

    // Badges
    "badge.subtitle": "Collect K-pop achievement badges",
    "badge.pageTitle": "Badge Collection",
    "badge.pageDesc": "Earn badges by playing daily puzzles, building streaks, and exploring all modes.",
    "badge.unlocked": "Badge Unlocked!",
    "badge.progress": "Progress",
    "badge.earned": "Earned",
    "badge.collection": "Badges",
    "badge.collected": "Collected",
    "badge.tier.trainee": "Trainee",
    "badge.tier.rookie": "Rookie",
    "badge.tier.star": "Star",
    "badge.tier.legend": "Legend",
    "badge.cat.streak": "Streak",
    "badge.cat.skill": "Skill",
    "badge.cat.discovery": "Discovery",
    "badge.cat.social": "Social",
    "badge.debut.name": "Debut",
    "badge.debut.desc": "Complete your first puzzle",
    "badge.comeback.name": "Comeback",
    "badge.comeback.desc": "Reach a 7-day streak",
    "badge.allkill.name": "All-Kill",
    "badge.allkill.desc": "Reach a 30-day streak",
    "badge.daesang.name": "Daesang",
    "badge.daesang.desc": "Reach a 100-day streak",
    "badge.center.name": "Center",
    "badge.center.desc": "Guess correctly on the first try",
    "badge.encore.name": "Encore",
    "badge.encore.desc": "Win 10 puzzles",
    "badge.tripleCrown.name": "Triple Crown",
    "badge.tripleCrown.desc": "Win 50 puzzles",
    "badge.maxlevel.name": "Max Level",
    "badge.maxlevel.desc": "Win 100 puzzles",
    "badge.trainee.name": "Trainee",
    "badge.trainee.desc": "Play your very first puzzle",
    "badge.multi.name": "Multi",
    "badge.multi.desc": "Try all 4 game modes",
    "badge.allrounder.name": "All-Rounder",
    "badge.allrounder.desc": "Win all 4 modes in a single day",
    "badge.explorer.name": "Explorer",
    "badge.explorer.desc": "Play 5 archive puzzles",
    "badge.challenger.name": "Challenger",
    "badge.challenger.desc": "Send a challenge link to a friend",
    "badge.fandomRep.name": "Fandom Rep",
    "badge.fandomRep.desc": "Join a fandom",
    "badge.kculture.name": "K-Culture Mania",
    "badge.kculture.desc": "Play 200 puzzles total",
    "badge.homeTitle": "Badges",
    "badge.homeDesc": "Collect K-pop achievement badges",

    // Archive
    "archive.title": "Archive",
    "archive.subtitle": "Play past puzzles",
    "archive.backToArchive": "Back to Archive",
    "archive.played": "Played",
    "archive.notPlayed": "Not played yet",
    "archive.today": "Today's Puzzle",
    "archive.archiveMode": "Archive",
    "archive.noPastPuzzles": "No past puzzles yet. Come back tomorrow!",
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
    "result.answerLabel": "La respuesta era",
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
    "help.rule1_pre": "Tienes ",
    "help.rule1_bold": "6 intentos",
    "help.rule1_post": " para adivinar cada puzzle",
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
    "toast.linkCopied": "¡Enlace copiado! Pega en el chat para compartir",

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

    // SEO - Game page expanded content
    "seo.dramaHints": "Las pistas incluyen genero, ano, cadena, numero de episodios, palabras clave de la sinopsis, iniciales del actor principal, frases famosas y elenco protagonista. Cada pista reduce las posibilidades entre 75 K-Dramas que abarcan romance, thriller, comedia, fantasia y mas.",
    "seo.dramaStrategy": "Comienza analizando el genero y el ano para eliminar grandes grupos de dramas. Presta atencion a la cadena y al numero de episodios. Las frases famosas son tu mejor aliado en las rondas finales.",
    "seo.idolHints": "Cada intento revela comparaciones codificadas por color en 7 atributos: nombre del grupo, genero, posicion (vocalista, rapero, bailarin), nacionalidad, ano de debut, compania y generacion. Verde significa coincidencia exacta, amarillo significa cercano y rojo significa diferente.",
    "seo.idolStrategy": "Comienza con un idol popular para establecer comparaciones base. Usa las pistas de generacion y compania para reducir tu busqueda rapidamente. La posicion y nacionalidad son diferenciadores fuertes.",
    "seo.lyricHints": "Comienzas con una linea de letra traducida. Cada intento incorrecto revela una linea adicional, hasta 6 lineas en total. Despues de 2 intentos fallidos en canciones OST, tambien recibes una pista de que es un OST de K-Drama.",
    "seo.lyricStrategy": "Concéntrate en frases unicas o temas emocionales en las letras. Las canciones de K-Pop a menudo tienen frases distintivas en ingles. Las letras de OST tienden a ser mas emocionales y narrativas.",
    "seo.sceneHints": "Las descripciones de escenas comienzan vagas — ambientacion y estado de animo — y se vuelven mas especificas con cada intento, eventualmente revelando nombres de personajes y detalles de la trama.",
    "seo.sceneStrategy": "La primera descripcion establece la atmosfera. Busca ambientaciones o periodos de tiempo unicos. Las dinamicas de personajes en pistas posteriores a menudo hacen obvio el drama.",

    // Homepage expanded content
    "home.whatIsTitle": "Que es K-Dle?",
    "home.whatIsText": "K-Dle es un juego de puzzles diario y gratuito para fans de K-Drama y K-Pop en todo el mundo. Inspirado en Wordle, ofrecemos cuatro modos de juego unicos que ponen a prueba tu conocimiento del entretenimiento coreano. Nuevos puzzles disponibles cada dia a medianoche.",
    "home.whyTitle": "Por que los fans de K-Drama aman K-Dle",
    "home.whyP1": "Ya sea que hayas visto cada episodio de Crash Landing on You o puedas cantar cada cancion de BTS, K-Dle tiene algo para ti. Nuestros puzzles cubren mas de 75 K-Dramas y 75 canciones de K-Pop.",
    "home.whyP2": "Desafia a tus amigos compartiendo tus resultados diarios, construye tu racha para ganar rangos de fan desde Novato hasta Leyenda Hallyu, y compite para ver quien sabe mas del entretenimiento coreano.",
    "home.howPlayTitle": "Como Jugar",
    "home.howPlayText": "Elige cualquiera de los cuatro modos de juego. Tienes 6 intentos para adivinar la respuesta correcta. Cada intento incorrecto revela pistas adicionales. Comparte tus resultados con amigos sin spoilers. Vuelve cada dia para mantener tu racha.",
    "home.moreAbout": "Saber mas",

    // Contact page
    "contact.title": "Contactanos",
    "contact.tagline": "Nos encantaria saber de ti. Envianos comentarios, reporta problemas o envia solicitudes DMCA.",
    "contact.nameLabel": "Nombre",
    "contact.namePlaceholder": "Tu nombre",
    "contact.emailLabel": "Correo electronico",
    "contact.emailPlaceholder": "tu@email.com",
    "contact.messageLabel": "Mensaje",
    "contact.messagePlaceholder": "Como podemos ayudarte?",
    "contact.send": "Enviar Mensaje",
    "contact.orEmail": "O escribenos directamente a",
    "contact.responseTime": "Normalmente respondemos en 48 horas.",
    "contact.dmca": "Para solicitudes DMCA, incluye una descripcion de la obra protegida, la ubicacion del contenido infractor y tu informacion de contacto.",
    "contact.sent": "Mensaje enviado! Te responderemos pronto.",

    // FAQ page
    "faq.title": "Preguntas Frecuentes",
    "faq.q1": "Que es K-Dle?",
    "faq.a1": "K-Dle es un juego de puzzles diario y gratuito inspirado en Wordle, disenado para fans del entretenimiento coreano. Tiene cuatro modos: Drama-dle (adivina K-Dramas), Idol-dle (identifica idols de K-Pop), Lyric-dle (nombra canciones por letras) y Scene-dle (reconoce dramas por escenas).",
    "faq.q2": "Cuantos intentos tengo?",
    "faq.a2": "Tienes 6 intentos para cada modo de juego. Cada intento incorrecto revela pistas adicionales para ayudarte a encontrar la respuesta.",
    "faq.q3": "Cuando aparecen nuevos puzzles?",
    "faq.a3": "Nuevos puzzles estan disponibles cada dia a medianoche en tu zona horaria local. Los cuatro modos de juego se actualizan simultaneamente.",
    "faq.q4": "K-Dle es gratis?",
    "faq.a4": "Si, K-Dle es completamente gratis. No se requiere registro de cuenta. Solo visita el sitio web y comienza a jugar.",
    "faq.q5": "Cuantos dramas y canciones hay en el juego?",
    "faq.a5": "K-Dle incluye 75 K-Dramas de todos los niveles de dificultad, 75 canciones de K-Pop y OSTs, 75 perfiles de idols y 75 descripciones de escenas iconicas.",
    "faq.q6": "Puedo jugar en diferentes idiomas?",
    "faq.a6": "Si! K-Dle esta disponible en ingles, espanol y coreano. Puedes cambiar de idioma usando el selector en la esquina superior derecha. Las pistas del juego tambien estan traducidas.",
    "faq.q7": "Como funciona el sistema de rachas?",
    "faq.a7": "Tu racha diaria aumenta cada dia que juegas al menos un modo. Juega consistentemente para ganar rangos de fan: Novato, Aprendiz, Debut, Estrella en Ascenso, All-Kill y Leyenda Hallyu.",
    "faq.q8": "Puedo compartir mis resultados?",
    "faq.a8": "Si! Despues de completar un puzzle, haz clic en Compartir Resultado. Tus resultados se comparten como cuadriculas de emojis sin revelar la respuesta.",
    "faq.q9": "Que pasa si pierdo un dia?",
    "faq.a9": "Si pierdes un dia, tu racha actual se reinicia a cero. Sin embargo, tus juegos totales, tasa de victorias y racha maxima se conservan en tus estadisticas.",
    "faq.q10": "Mis datos se almacenan en linea?",
    "faq.a10": "No. Todo tu progreso, estadisticas y datos de racha se almacenan localmente en tu dispositivo usando localStorage del navegador. Nada se envia a ningun servidor.",
    "faq.q11": "Como se eligen los puzzles diarios?",
    "faq.a11": "Los puzzles se seleccionan usando un algoritmo determinista que baraja el orden de manera diferente para cada modo de juego, asegurando variedad.",
    "faq.q12": "K-Dle esta afiliado a alguna compania de K-Pop?",
    "faq.a12": "No. K-Dle es un proyecto de fans no oficial creado unicamente con fines de entretenimiento. No esta afiliado a ninguna compania de entretenimiento.",
    "faq.q13": "Encontre un error en los datos del juego. Como puedo reportarlo?",
    "faq.a13": "Contactanos en pon07084@gmail.com con los detalles del error. Agradecemos tu ayuda para mantener el juego preciso.",
    "faq.q14": "Puedo sugerir nuevos dramas o canciones?",
    "faq.a14": "Por supuesto! Envianos tus ideas a pon07084@gmail.com. Siempre buscamos expandir nuestra base de datos de puzzles.",
    "faq.q15": "K-Dle funciona en movil?",
    "faq.a15": "Si, K-Dle es completamente responsivo y funciona en smartphones, tablets y navegadores de escritorio. Tambien puedes agregarlo a tu pantalla de inicio.",

    // About page expanded content
    "about.whyTitle": "Por que creamos K-Dle",
    "about.whyP1": "La Ola Coreana (Hallyu) ha conquistado el mundo. Millones de fans ven K-Dramas, siguen grupos de K-Pop y se sumergen en la cultura coreana. Creamos K-Dle para unir a esta comunidad global a traves de desafios diarios que celebran el entretenimiento que todos amamos.",
    "about.whyP2": "Inspirado en el exito viral de Wordle, K-Dle combina la alegria de los juegos de adivinanzas diarios con el rico mundo del entretenimiento coreano. Ya seas un espectador casual o un fan incondicional, siempre hay algo nuevo por descubrir.",
    "about.featuresTitle": "Caracteristicas",
    "about.feature1": "Cuatro modos de juego unicos que cubren dramas, idols, letras y escenas iconicas",
    "about.feature2": "Mas de 75 puzzles por modo con contenido curado desde clasicos hasta exitos modernos",
    "about.feature3": "Sistema de rachas diarias con rangos de fan desde Novato hasta Leyenda Hallyu",
    "about.feature4": "Compartir sin spoilers — desafia a tus amigos sin revelar respuestas",
    "about.feature5": "Disponible en ingles, espanol y coreano con contenido de juego completamente traducido",
    "about.feature6": "Sin cuenta requerida — juega al instante en cualquier dispositivo",
    "about.communityTitle": "Unete a la Comunidad",
    "about.communityText": "Comparte tus resultados diarios con amigos y descubre quien sabe mas de K-Drama y K-Pop. Construye tu racha, gana rangos de fan y conviertete en una Leyenda Hallyu. Nuevos puzzles cada dia a medianoche.",
    "about.techTitle": "Hecho con Cuidado",
    "about.techText": "K-Dle esta construido con tecnologias web modernas para una experiencia rapida y fluida en cualquier dispositivo. Sin descargas necesarias — solo visita y juega. Tu progreso se guarda automaticamente en tu navegador.",

    // Emoji Voting
    "emoji.title": "Que te parecio este puzzle?",
    "emoji.totalVotes": "{n} votos",

    // Challenge
    "challenge.button": "Desafiar a un Amigo",
    "challenge.banner": "Un amigo te desafio!",
    "challenge.friendSolved": "Lo resolvio en {n} intentos. Puedes ganarle?",
    "challenge.friendFailed": "No pudo resolverlo. Puedes tu?",
    "challenge.message": "Te desafio en {mode} #{n}! Puedes superar mi puntaje?",

    // Daily Stats Percentile
    "daily.percentile": "Lo resolviste mas rapido que el {n}% de los jugadores!",

    // Fandom
    "fandom.yourFandom": "Tu fandom",
    "fandom.change": "Cambiar",
    "fandom.selectPrompt": "Selecciona tu fandom para la Batalla de Fandoms!",
    "fandom.selectTitle": "Elige Tu Fandom",
    "fandom.loading": "Cargando estadisticas de fandom...",
    "fandom.leaderboardTitle": "Batalla de Fandoms — Ranking de Hoy",
    "fandom.plays": "jugadas",

    // Party Mode
    "party.title": "Modo Fiesta",
    "party.subtitle": "Juega con amigos",
    "party.homeDesc": "Crea una sala y compite con amigos en tiempo real",
    "party.description": "Crea una sala de fiesta, comparte el codigo con amigos y compite para ver quien sabe mas de K-Drama y K-Pop!",
    "party.createRoom": "Crear Sala",
    "party.createDesc": "Elige un modo de juego e invita a tus amigos",
    "party.joinRoom": "Unirse a Sala",
    "party.joinDesc": "Ingresa el codigo de 4 digitos de tu amigo",
    "party.back": "Atras",
    "party.yourName": "Tu Nombre",
    "party.namePlaceholder": "Ingresa tu nombre...",
    "party.selectMode": "Modo de Juego",
    "party.createButton": "Crear Fiesta",
    "party.createError": "Error al crear la fiesta. Intentalo de nuevo.",
    "party.enterCode": "Codigo de Sala",
    "party.invalidCode": "Ingresa un codigo de 4 digitos",
    "party.joinButton": "Unirse",
    "party.notFound": "Fiesta no encontrada. Verifica el codigo e intentalo de nuevo.",
    "party.roomCode": "Codigo de Sala",
    "party.shareCode": "Compartir Enlace de Invitacion",
    "party.inviteText": "Unete a mi fiesta K-Dle! Codigo: {code}",
    "party.playNow": "Jugar Ahora",
    "party.room": "Sala de Fiesta",
    "party.hostedBy": "Creada por {name}",
    "party.waitingForPlayers": "Esperando a que los jugadores terminen...",
    "party.autoRefresh": "Los resultados se actualizan automaticamente",

    // Global Stats
    "globalStats.title": "Estadisticas Globales de Hoy",
    "globalStats.subtitle": "Estadisticas en vivo de jugadores de todo el mundo",
    "globalStats.description": "Mira como les va a los jugadores de todo el mundo en los puzzles de hoy.",
    "globalStats.overall": "Resumen de Hoy",
    "globalStats.totalPlays": "Partidas Totales",
    "globalStats.activeModes": "Modos Activos",
    "globalStats.noData": "Aun no hay estadisticas hoy. Se el primero en jugar!",
    "globalStats.noPlaysYet": "Nadie ha jugado este modo hoy todavia.",
    "globalStats.playNow": "Jugar ahora",
    "globalStats.refreshNote": "Las estadisticas se actualizan en tiempo real.",
    "globalStats.homeDesc": "Mira como juega el mundo hoy",

    // Badges
    "badge.subtitle": "Colecciona insignias de K-pop",
    "badge.pageTitle": "Coleccion de Insignias",
    "badge.pageDesc": "Gana insignias jugando puzzles diarios, manteniendo rachas y explorando todos los modos.",
    "badge.unlocked": "Insignia Desbloqueada!",
    "badge.progress": "Progreso",
    "badge.earned": "Obtenida",
    "badge.collection": "Insignias",
    "badge.collected": "Coleccionadas",
    "badge.tier.trainee": "Aprendiz",
    "badge.tier.rookie": "Novato",
    "badge.tier.star": "Estrella",
    "badge.tier.legend": "Leyenda",
    "badge.cat.streak": "Racha",
    "badge.cat.skill": "Habilidad",
    "badge.cat.discovery": "Descubrimiento",
    "badge.cat.social": "Social",
    "badge.debut.name": "Debut",
    "badge.debut.desc": "Completa tu primer puzzle",
    "badge.comeback.name": "Comeback",
    "badge.comeback.desc": "Alcanza una racha de 7 dias",
    "badge.allkill.name": "All-Kill",
    "badge.allkill.desc": "Alcanza una racha de 30 dias",
    "badge.daesang.name": "Daesang",
    "badge.daesang.desc": "Alcanza una racha de 100 dias",
    "badge.center.name": "Center",
    "badge.center.desc": "Acierta al primer intento",
    "badge.encore.name": "Encore",
    "badge.encore.desc": "Gana 10 puzzles",
    "badge.tripleCrown.name": "Triple Crown",
    "badge.tripleCrown.desc": "Gana 50 puzzles",
    "badge.maxlevel.name": "Nivel Maximo",
    "badge.maxlevel.desc": "Gana 100 puzzles",
    "badge.trainee.name": "Aprendiz",
    "badge.trainee.desc": "Juega tu primer puzzle",
    "badge.multi.name": "Multi",
    "badge.multi.desc": "Prueba los 4 modos de juego",
    "badge.allrounder.name": "All-Rounder",
    "badge.allrounder.desc": "Gana los 4 modos en un solo dia",
    "badge.explorer.name": "Explorador",
    "badge.explorer.desc": "Juega 5 puzzles del archivo",
    "badge.challenger.name": "Retador",
    "badge.challenger.desc": "Envia un enlace de desafio a un amigo",
    "badge.fandomRep.name": "Rep de Fandom",
    "badge.fandomRep.desc": "Unete a un fandom",
    "badge.kculture.name": "K-Culture Mania",
    "badge.kculture.desc": "Juega 200 puzzles en total",
    "badge.homeTitle": "Insignias",
    "badge.homeDesc": "Colecciona insignias de K-pop",

    // Archive
    "archive.title": "Archivo",
    "archive.subtitle": "Juega puzzles anteriores",
    "archive.backToArchive": "Volver al Archivo",
    "archive.played": "Jugado",
    "archive.notPlayed": "Aun no jugado",
    "archive.today": "Puzzle de Hoy",
    "archive.archiveMode": "Archivo",
    "archive.noPastPuzzles": "No hay puzzles anteriores todavia. Vuelve manana!",
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
    "result.answerLabel": "정답",
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
    "help.rule1_pre": "각 퍼즐마다 ",
    "help.rule1_bold": "6번",
    "help.rule1_post": "의 기회가 있습니다",
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
    "toast.linkCopied": "링크 복사됨! 채팅에 붙여넣기 하세요",

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

    // SEO - Game page expanded content
    "seo.dramaHints": "힌트에는 장르, 연도, 방송사, 회차, 시놉시스 키워드, 주연 이니셜, 명대사, 출연진이 포함됩니다. 75개의 K-드라마 중에서 로맨스, 스릴러, 코미디, 판타지 등 다양한 장르를 아우릅니다.",
    "seo.dramaStrategy": "장르와 연도를 먼저 분석하여 대규모 그룹을 제거하세요. 방송사와 회차에 주목하면 정확한 작품을 찾는 데 도움이 됩니다. 후반 라운드에서는 명대사가 가장 강력한 단서입니다.",
    "seo.idolHints": "매 추측마다 7개 속성에 대한 색상 코드 비교가 나타납니다: 그룹명, 성별, 포지션(보컬, 래퍼, 댄서), 국적, 데뷔 연도, 소속사, 세대. 초록은 정확 일치, 노랑은 근접, 빨강은 다른 것을 의미합니다.",
    "seo.idolStrategy": "인기 있는 아이돌로 시작하여 기본 비교를 확립하세요. 세대와 소속사 단서를 활용하면 빠르게 범위를 좁힐 수 있습니다. 포지션과 국적은 다른 단서가 겹칠 때 강력한 구분자입니다.",
    "seo.lyricHints": "번역된 가사 한 줄로 시작합니다. 틀릴 때마다 추가 줄이 공개되어 최대 6줄까지 볼 수 있습니다. OST 노래의 경우 2번 틀리면 K-드라마 OST라는 추가 힌트가 나옵니다.",
    "seo.lyricStrategy": "가사 속 독특한 표현이나 감정적 주제에 집중하세요. K-Pop 노래에는 종종 영어 구절이 섞여 있습니다. OST 가사는 아이돌 그룹 노래에 비해 더 감성적이고 서사적입니다.",
    "seo.sceneHints": "장면 설명은 배경과 분위기부터 시작하여 추측할 때마다 더 구체적으로 변합니다. 후반에는 캐릭터 이름과 줄거리 세부 사항이 공개됩니다. 총 6개의 설명이 제공됩니다.",
    "seo.sceneStrategy": "첫 번째 설명으로 분위기를 파악하세요. 독특한 배경이나 시대적 배경을 찾아보세요. 후반 힌트의 캐릭터 관계가 드라마를 확실히 알려줄 때가 많습니다.",

    // Homepage expanded content
    "home.whatIsTitle": "K-Dle이란?",
    "home.whatIsText": "K-Dle은 전 세계 K-드라마 및 K-Pop 팬을 위한 무료 데일리 퍼즐 게임입니다. Wordle에서 영감을 받아, 한국 엔터테인먼트에 대한 지식을 시험하는 네 가지 독특한 게임 모드를 제공합니다. 매일 자정에 새로운 퍼즐이 준비되어 항상 새로운 도전이 기다립니다.",
    "home.whyTitle": "K-드라마 팬이 K-Dle을 사랑하는 이유",
    "home.whyP1": "사랑의 불시착을 완주했든, BTS의 모든 노래를 따라 부를 수 있든, K-Dle에는 당신을 위한 퍼즐이 있습니다. 75개 이상의 K-드라마와 75곡 이상의 K-Pop을 아우르는 퍼즐이 준비되어 있습니다.",
    "home.whyP2": "일일 결과를 공유하여 친구에게 도전하고, 연속 기록을 쌓아 신입부터 한류 레전드까지 팬 랭크를 올려보세요. 누가 한국 엔터테인먼트를 가장 잘 아는지 겨뤄보세요.",
    "home.howPlayTitle": "플레이 방법",
    "home.howPlayText": "네 가지 게임 모드 중 하나를 선택하세요. 정답을 맞힐 기회는 6번입니다. 틀릴 때마다 추가 단서가 공개됩니다. 스포일러 없이 친구들과 결과를 공유하세요! 매일 돌아와서 연속 기록을 유지하세요.",
    "home.moreAbout": "더 알아보기",

    // Contact page
    "contact.title": "문의하기",
    "contact.tagline": "여러분의 의견을 듣고 싶습니다. 피드백, 문제 신고 또는 DMCA 요청을 보내주세요.",
    "contact.nameLabel": "이름",
    "contact.namePlaceholder": "이름을 입력하세요",
    "contact.emailLabel": "이메일",
    "contact.emailPlaceholder": "your@email.com",
    "contact.messageLabel": "메시지",
    "contact.messagePlaceholder": "어떻게 도와드릴까요?",
    "contact.send": "메시지 보내기",
    "contact.orEmail": "또는 직접 이메일을 보내주세요:",
    "contact.responseTime": "보통 48시간 이내에 답변드립니다.",
    "contact.dmca": "DMCA / 삭제 요청의 경우, 저작물에 대한 설명, 침해 콘텐츠의 위치, 연락처 정보를 포함해 주세요.",
    "contact.sent": "메시지가 전송되었습니다! 곧 답변드리겠습니다.",

    // FAQ page
    "faq.title": "자주 묻는 질문",
    "faq.q1": "K-Dle이 뭔가요?",
    "faq.a1": "K-Dle은 Wordle에서 영감을 받은 무료 데일리 퍼즐 게임으로, 한국 엔터테인먼트 팬을 위해 만들어졌습니다. Drama-dle(드라마 맞히기), Idol-dle(아이돌 맞히기), Lyric-dle(가사로 노래 맞히기), Scene-dle(장면으로 드라마 맞히기) 네 가지 모드가 있습니다.",
    "faq.q2": "몇 번 시도할 수 있나요?",
    "faq.a2": "각 게임 모드마다 6번의 기회가 주어집니다. 틀릴 때마다 추가 단서가 공개되어 정답을 찾는 데 도움을 줍니다.",
    "faq.q3": "새 퍼즐은 언제 나오나요?",
    "faq.a3": "새 퍼즐은 매일 현지 시간 자정에 업데이트됩니다. 네 가지 게임 모드가 동시에 갱신됩니다.",
    "faq.q4": "K-Dle은 무료인가요?",
    "faq.a4": "네, K-Dle은 완전 무료입니다. 계정 등록도 필요 없습니다. 웹사이트를 방문하면 바로 플레이할 수 있습니다!",
    "faq.q5": "게임에 몇 개의 드라마와 노래가 있나요?",
    "faq.a5": "K-Dle에는 모든 난이도의 K-드라마 75개(오징어 게임 같은 글로벌 히트작부터 숨겨진 명작까지), K-Pop 노래 및 OST 75곡, 아이돌 프로필 75개, 명장면 묘사 75개가 있습니다.",
    "faq.q6": "다른 언어로 플레이할 수 있나요?",
    "faq.a6": "네! K-Dle은 영어, 스페인어, 한국어를 지원합니다. 오른쪽 상단의 언어 선택기로 변경할 수 있습니다. 게임 힌트와 단서도 번역됩니다.",
    "faq.q7": "연속 기록 시스템은 어떻게 작동하나요?",
    "faq.a7": "매일 하나 이상의 게임 모드를 플레이하면 연속 기록이 증가합니다. 꾸준히 플레이하면 팬 랭크를 얻을 수 있습니다: 신입, 연습생, 데뷔, 라이징 스타, 올킬, 한류 레전드.",
    "faq.q8": "결과를 공유할 수 있나요?",
    "faq.a8": "네! 퍼즐을 완료한 후 결과 공유 버튼을 클릭하세요. 결과는 정답을 공개하지 않는 이모지 그리드로 공유되어 친구들에게 스포일러가 없습니다.",
    "faq.q9": "하루를 빠뜨리면 어떻게 되나요?",
    "faq.a9": "하루를 빠뜨리면 현재 연속 기록이 0으로 초기화됩니다. 하지만 총 플레이 횟수, 승률, 최고 연속 기록은 통계에 유지됩니다.",
    "faq.q10": "제 데이터가 온라인에 저장되나요?",
    "faq.a10": "아닙니다. 모든 게임 진행, 통계, 연속 기록 데이터는 브라우저의 localStorage를 사용하여 기기에 로컬로만 저장됩니다. 서버로 전송되는 것은 없습니다. 브라우저 데이터를 삭제하면 진행 상황이 초기화됩니다.",
    "faq.q11": "매일의 퍼즐은 어떻게 선택되나요?",
    "faq.a11": "퍼즐은 각 게임 모드별로 순서를 다르게 섞는 결정론적 알고리즘으로 선택됩니다. 이를 통해 다양성을 보장하고 같은 콘텐츠가 너무 자주 나오지 않도록 합니다.",
    "faq.q12": "K-Dle은 K-Pop 회사나 방송사와 제휴되어 있나요?",
    "faq.a12": "아닙니다. K-Dle은 오직 엔터테인먼트 목적으로 제작된 비공식 팬 프로젝트입니다. 어떤 엔터테인먼트 회사, 음반사, 방송사와도 제휴 관계가 없습니다.",
    "faq.q13": "게임 데이터에서 오류를 발견했어요. 어떻게 신고하나요?",
    "faq.a13": "pon07084@gmail.com으로 오류 세부 사항을 보내주세요. 게임의 정확성을 유지하는 데 도움을 주셔서 감사합니다!",
    "faq.q14": "새로운 드라마나 노래를 추가 제안할 수 있나요?",
    "faq.a14": "물론이죠! pon07084@gmail.com으로 아이디어를 보내주세요. 퍼즐 데이터베이스를 계속 확장하고 있습니다.",
    "faq.q15": "K-Dle은 모바일에서도 작동하나요?",
    "faq.a15": "네, K-Dle은 완전 반응형이며 스마트폰, 태블릿, 데스크톱 브라우저에서 모두 잘 작동합니다. 홈 화면에 추가하면 앱처럼 사용할 수도 있습니다.",

    // About page expanded content
    "about.whyTitle": "K-Dle을 만든 이유",
    "about.whyP1": "한류는 전 세계를 강타했습니다. 수백만 팬이 K-드라마를 시청하고, K-Pop 그룹을 팔로우하며, 한국 문화에 빠져듭니다. 우리 모두가 사랑하는 엔터테인먼트를 기념하는 데일리 퍼즐 챌린지로 이 글로벌 커뮤니티를 하나로 모으기 위해 K-Dle을 만들었습니다.",
    "about.whyP2": "Wordle의 성공에서 영감을 받아, K-Dle은 매일 추측 게임의 단순한 즐거움과 한국 엔터테인먼트의 풍부한 세계를 결합합니다. 가벼운 시청자든 열성 팬이든, 항상 새로운 것을 발견할 수 있습니다.",
    "about.featuresTitle": "특징",
    "about.feature1": "드라마, 아이돌, 가사, 명장면을 아우르는 네 가지 독특한 게임 모드",
    "about.feature2": "클래식부터 최신 히트까지 꼼꼼히 선별된 모드당 75개 이상의 퍼즐",
    "about.feature3": "신입부터 한류 레전드까지 팬 랭크가 있는 데일리 연속 기록 시스템",
    "about.feature4": "스포일러 없는 공유 — 정답을 공개하지 않고 친구에게 도전",
    "about.feature5": "영어, 스페인어, 한국어 지원 및 완전 번역된 게임 콘텐츠",
    "about.feature6": "계정 불필요 — 모든 기기에서 즉시 플레이",
    "about.communityTitle": "커뮤니티에 참여하세요",
    "about.communityText": "일일 결과를 친구들과 공유하고 누가 K-드라마와 K-Pop을 가장 잘 아는지 겨뤄보세요. 연속 기록을 쌓고, 팬 랭크를 획득하고, 한류 레전드가 되세요. 매일 자정에 새로운 퍼즐 — 연속 기록을 놓치지 마세요!",
    "about.techTitle": "정성을 담아 만들었습니다",
    "about.techText": "K-Dle은 모든 기기에서 빠르고 부드러운 경험을 위해 최신 웹 기술로 제작되었습니다. 다운로드 없이 방문하면 바로 플레이할 수 있습니다. 진행 상황은 브라우저에 자동 저장됩니다.",

    // Emoji Voting
    "emoji.title": "이 퍼즐 어땠나요?",
    "emoji.totalVotes": "{n}표",

    // Challenge
    "challenge.button": "친구에게 도전장 보내기",
    "challenge.banner": "친구가 도전장을 보냈어요!",
    "challenge.friendSolved": "친구는 {n}번 만에 맞혔어요. 이길 수 있나요?",
    "challenge.friendFailed": "친구는 못 맞혔어요. 당신은 맞힐 수 있나요?",
    "challenge.message": "{mode} #{n}에 도전해보세요! 내 점수를 이길 수 있나요?",

    // Daily Stats Percentile
    "daily.percentile": "플레이어의 {n}%보다 빠르게 맞혔어요!",

    // Fandom
    "fandom.yourFandom": "내 팬덤",
    "fandom.change": "변경",
    "fandom.selectPrompt": "팬덤을 선택하고 팬덤 대결에 참여하세요!",
    "fandom.selectTitle": "팬덤 선택",
    "fandom.loading": "팬덤 통계 로딩 중...",
    "fandom.leaderboardTitle": "팬덤 대결 — 오늘의 순위",
    "fandom.plays": "참여",

    // Party Mode
    "party.title": "파티 모드",
    "party.subtitle": "친구와 함께 플레이",
    "party.homeDesc": "방을 만들고 친구들과 실시간으로 경쟁하세요",
    "party.description": "파티 방을 만들고, 코드를 친구에게 공유하고, 누가 K-드라마 & K-Pop을 가장 잘 아는지 겨뤄보세요!",
    "party.createRoom": "방 만들기",
    "party.createDesc": "게임 모드를 선택하고 친구를 초대하세요",
    "party.joinRoom": "방 참가하기",
    "party.joinDesc": "친구에게 받은 4자리 코드를 입력하세요",
    "party.back": "뒤로",
    "party.yourName": "이름",
    "party.namePlaceholder": "이름을 입력하세요...",
    "party.selectMode": "게임 모드",
    "party.createButton": "파티 만들기",
    "party.createError": "파티 생성에 실패했습니다. 다시 시도해주세요.",
    "party.enterCode": "방 코드",
    "party.invalidCode": "4자리 코드를 입력해주세요",
    "party.joinButton": "참가하기",
    "party.notFound": "파티를 찾을 수 없습니다. 코드를 확인하고 다시 시도해주세요.",
    "party.roomCode": "방 코드",
    "party.shareCode": "초대 링크 공유",
    "party.inviteText": "K-Dle 파티에 참여하세요! 방 코드: {code}",
    "party.playNow": "지금 플레이",
    "party.room": "파티 방",
    "party.hostedBy": "{name}님이 만든 방",
    "party.waitingForPlayers": "플레이어들이 끝내기를 기다리는 중...",
    "party.autoRefresh": "결과는 자동으로 새로고침됩니다",

    // Global Stats
    "globalStats.title": "오늘의 글로벌 통계",
    "globalStats.subtitle": "전 세계 플레이어 실시간 통계",
    "globalStats.description": "오늘 전 세계 플레이어들의 퍼즐 결과를 확인하세요.",
    "globalStats.overall": "오늘의 종합",
    "globalStats.totalPlays": "총 플레이",
    "globalStats.activeModes": "활성 모드",
    "globalStats.noData": "오늘 아직 통계가 없어요. 첫 번째 플레이어가 되어보세요!",
    "globalStats.noPlaysYet": "아직 아무도 이 모드를 플레이하지 않았어요.",
    "globalStats.playNow": "지금 플레이",
    "globalStats.refreshNote": "통계는 플레이어가 퍼즐을 완료할 때 실시간으로 업데이트됩니다.",
    "globalStats.homeDesc": "오늘 전 세계가 어떻게 플레이하고 있는지 확인",

    // Badges
    "badge.subtitle": "K-pop 업적 배지를 수집하세요",
    "badge.pageTitle": "배지 컬렉션",
    "badge.pageDesc": "매일 퍼즐을 풀고, 스트릭을 쌓고, 모든 모드를 탐험하며 배지를 획득하세요.",
    "badge.unlocked": "배지 획득!",
    "badge.progress": "진행도",
    "badge.earned": "획득일",
    "badge.collection": "배지",
    "badge.collected": "수집 완료",
    "badge.tier.trainee": "연습생",
    "badge.tier.rookie": "루키",
    "badge.tier.star": "스타",
    "badge.tier.legend": "레전드",
    "badge.cat.streak": "스트릭",
    "badge.cat.skill": "실력",
    "badge.cat.discovery": "탐험",
    "badge.cat.social": "소셜",
    "badge.debut.name": "데뷔",
    "badge.debut.desc": "첫 번째 퍼즐을 완료하세요",
    "badge.comeback.name": "컴백",
    "badge.comeback.desc": "7일 연속 스트릭 달성",
    "badge.allkill.name": "올킬",
    "badge.allkill.desc": "30일 연속 스트릭 달성",
    "badge.daesang.name": "대상",
    "badge.daesang.desc": "100일 연속 스트릭 달성",
    "badge.center.name": "센터",
    "badge.center.desc": "첫 번째 시도에서 정답 맞히기",
    "badge.encore.name": "앙코르",
    "badge.encore.desc": "10개 퍼즐 승리",
    "badge.tripleCrown.name": "트리플 크라운",
    "badge.tripleCrown.desc": "50개 퍼즐 승리",
    "badge.maxlevel.name": "만렙",
    "badge.maxlevel.desc": "100개 퍼즐 승리",
    "badge.trainee.name": "연습생",
    "badge.trainee.desc": "첫 번째 퍼즐 플레이",
    "badge.multi.name": "멀티",
    "badge.multi.desc": "4개 게임 모드 모두 도전",
    "badge.allrounder.name": "올라운더",
    "badge.allrounder.desc": "하루에 4개 모드 모두 승리",
    "badge.explorer.name": "탐험가",
    "badge.explorer.desc": "아카이브 퍼즐 5개 플레이",
    "badge.challenger.name": "도전자",
    "badge.challenger.desc": "친구에게 도전 링크 보내기",
    "badge.fandomRep.name": "팬덤 대표",
    "badge.fandomRep.desc": "팬덤에 가입하기",
    "badge.kculture.name": "K-Culture 마니아",
    "badge.kculture.desc": "총 200개 퍼즐 플레이",
    "badge.homeTitle": "배지",
    "badge.homeDesc": "K-pop 업적 배지를 수집하세요",

    // Archive
    "archive.title": "아카이브",
    "archive.subtitle": "과거 퍼즐 다시 풀기",
    "archive.backToArchive": "아카이브로 돌아가기",
    "archive.played": "플레이 완료",
    "archive.notPlayed": "아직 안 풀었어요",
    "archive.today": "오늘의 퍼즐",
    "archive.archiveMode": "아카이브",
    "archive.noPastPuzzles": "아직 과거 퍼즐이 없습니다. 내일 다시 오세요!",
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
