import { useState, useMemo, useRef, useEffect } from "react";

const DATA = [
  // ═══════════════════════════════════════════════════════════════
  // SECTION 1: BEGINNER METHODS
  // ═══════════════════════════════════════════════════════════════
  {
    id: "suzuki", tier: "core", category: "Beginner Methods", composer: "Shinichi Suzuki", nationality: "Japanese", period: "20th Century",
    title: "Suzuki Violin School (Vols. 1–10)",
    difficulty: [1, 8],
    description: "The most widely used violin method worldwide. Based on Suzuki's 'mother tongue' approach—learning music through listening and imitation before reading. The ten volumes progress from 'Twinkle' variations through concerto-level repertoire (Bach A minor, Mozart concerti). The early volumes develop tone production, bow control, and basic left-hand patterns through carefully sequenced folk songs and classical pieces. Later volumes incorporate standard repertoire (Vivaldi concertos, Bach, Handel sonatas). Strengths: builds ear training and musical instinct from day one; provides a shared repertoire for group classes. Limitations: reading skills must be supplemented separately; some pedagogues criticize delayed introduction of shifting.",
    skills: "Ear training; tone production; basic bow strokes; left-hand patterns in first position (Vols. 1–3); shifting and vibrato (Vols. 4–6); advanced repertoire preparation (Vols. 7–10).",
    editions: "Summy-Birchard / Alfred Music (revised editions with CD/audio recordings by William Preucil and Hilary Hahn); International Suzuki Association authorized editions.",
    examLevel: "RCM Prep–8 (Suzuki Vols. 1–10 span the full range); ABRSM Initial–Grade 5 (Suzuki Vols. 1–10 span Initial to Grade 5 lists); ASTACAP Foundation–8"
  },
  {
    id: "doflein", tier: "core", category: "Beginner Methods", composer: "Erich & Elma Doflein", nationality: "German", period: "20th Century",
    title: "The Doflein Method (Vols. 1–5)",
    difficulty: [1, 6],
    description: "A European-standard method emphasizing music reading and theoretical understanding alongside playing. Distinguished by its use of high-quality musical literature from the outset—duets by Bartók, arrangements of folk songs, and original pedagogical pieces by contemporary composers. Each volume integrates theory, ear training, and technique. More intellectually rigorous than Suzuki; widely used in German-speaking countries and Scandinavia.",
    skills: "Music reading from the start; duet playing; theoretical understanding; progressive technical development with musical context; introduction to 20th-century musical language.",
    editions: "Schott (original and revised editions). All five volumes available individually."
  },
  {
    id: "bang", tier: "core", category: "Beginner Methods", composer: "Maia Bang", nationality: "Norwegian-American", period: "Early 20th Century",
    title: "Maia Bang Violin Method (Parts I–IV)",
    difficulty: [1, 5],
    description: "Developed by a student of Leopold Auer, this method reflects the pedagogical priorities of the Russian school as transmitted through Auer. The four parts progress systematically from first position through advanced position work. Notable for its clear, no-nonsense approach to fundamentals, logical ordering of material, and emphasis on building a solid technical foundation. Includes études, exercises, and short pieces at each level. Once widely used in American conservatories; still valuable for its clarity and Auer-school lineage.",
    skills: "Systematic position work; Auer-school bowing principles; clean intonation; progressive technical development; foundational left-hand and right-hand coordination.",
    editions: "Carl Fischer (original edition, 4 parts)."
  },
  {
    id: "trott", tier: "core", category: "Technical Exercises", subcategory: "Double Stops", composer: "Josephine Trott", nationality: "American", period: "Early 20th Century",
    title: "Melodious Double-Stops (Books 1 & 2)",
    difficulty: [3, 7],
    description: "Not a beginner method per se, but an essential early-intermediate resource. Trott's two books present double stops within melodic, musically appealing contexts. Book 1 covers thirds, sixths, and octaves at an approachable level. Book 2 is more advanced, introducing fingered octaves and tenths. These studies make the often-dreaded subject of double stops accessible and even enjoyable, building the left-hand frame and intonation sense needed for later repertoire.",
    skills: "Double-stop intonation; left-hand frame development; hearing intervals; introduction to polyphonic playing; hand strength and stretch.",
    editions: "G. Schirmer (standard edition, both books); International Music Company.",
    examLevel: "RCM 2–7; ASTACAP 3–7"
  },
  {
    id: "applebaum", tier: "core", category: "Beginner Methods", composer: "Samuel Applebaum", nationality: "American", period: "20th Century",
    title: "String Builder (Vols. 1–3) & The Way They Play series",
    difficulty: [1, 3],
    description: "String Builder is a widely used class method for beginning strings, providing a systematic, step-by-step approach suitable for heterogeneous string classes. 'The Way They Play' (multiple volumes) is a separate but invaluable interview/photo-essay series documenting the technical approaches of great violinists—useful as a reference for teachers and advanced students rather than a playing method.",
    skills: "Basic technique in class settings; ensemble awareness; reading skills; foundational tone production.",
    editions: "Belwin-Mills / Alfred Music."
  },
  {
    id: "galamian-method", tier: "core", category: "Beginner Methods", composer: "Ivan Galamian", nationality: "Armenian-American", period: "20th Century",
    title: "Principles of Violin Playing and Teaching (see also Treatises)",
    difficulty: [1, 10],
    description: "While primarily a treatise (see Treatises section), Galamian's 'Principles' also functions as a method when used with his 'Contemporary Violin Technique' scale system. The combination provides a complete technical curriculum from intermediate through professional level. Galamian's approach emphasizes systematic daily practice organized around scales, études, and repertoire, with particular attention to coordination between the two hands.",
    skills: "Complete technical system; coordination; acceleration patterns; all bow strokes; scale and arpeggio mastery.",
    editions: "Prentice-Hall (Principles); Galaxy Music/ECS Publishing (Contemporary Violin Technique, Vols. 1–2)."
  },
  {
    id: "auer-method", tier: "core", category: "Beginner Methods", composer: "Leopold Auer", nationality: "Hungarian-American", period: "Early 20th Century",
    title: "Graded Course of Violin Playing (8 vols.)",
    difficulty: [1, 7],
    description: "Auer's systematic course covers the full arc from beginner to advanced student. The eight volumes progress logically through first position, shifting, vibrato, double stops, and advanced technique. Compiled with the assistance of his students, the method reflects the pedagogical approach that produced Heifetz, Milstein, Elman, Zimbalist, and Seidel. Each volume includes exercises, études, and graded pieces.",
    skills: "Comprehensive technical development; Auer-school principles; progressive position work; bowing; musical development through graded repertoire.",
    editions: "Carl Fischer (complete set of 8 volumes)."
  },
  {
    id: "sassmannshaus", tier: "core", category: "Beginner Methods", composer: "Egon Sassmannshaus", nationality: "German-American", period: "20th/21st Century",
    title: "Early Start on the Violin (Vols. 1–4)",
    difficulty: [1, 4],
    description: "A modern method designed for very young beginners (ages 4–7), incorporating colorful illustrations, simple songs, and a carefully paced technical progression. Emphasizes natural, tension-free playing from the beginning. Widely adopted in pre-conservatory programs. The approach balances Suzuki-like ear-first learning with early note reading.",
    skills: "Very early technique; natural posture and hold; first-position patterns; basic bowing; reading readiness.",
    editions: "Bärenreiter (all volumes, with teacher guides)."
  },
  {
    id: "eta-cohen", tier: "core", category: "Beginner Methods", composer: "Eta Cohen", nationality: "British", period: "20th Century",
    title: "Violin Method (Books 1–4) & Easy Violin Duets",
    difficulty: [1, 5],
    description: "A British standard method widely used in the UK's ABRSM examination system. The four books progress from absolute beginner through intermediate level with a strong emphasis on music reading and theoretical understanding alongside technical development. Cohen's duets are excellent supplementary material for developing ensemble skills early.",
    skills: "Note reading; music theory integration; progressive technique; ensemble playing through duets.",
    editions: "Novello / Music Sales Group."
  },
  {
    id: "nelson", tier: "core", category: "Beginner Methods", composer: "Sheila Nelson", nationality: "British", period: "20th Century",
    title: "The Essential String Method (Vols. 1–4); Piece by Piece; Right from the Start",
    difficulty: [1, 5],
    description: "Nelson's materials are among the most musically imaginative beginner resources. 'Piece by Piece' pairs student parts with piano accompaniments of genuine musical interest. 'Right from the Start' introduces technique through creative, game-like activities. Widely used in British and European pedagogy.",
    skills: "Creative approach to fundamentals; ensemble skills; musical expression from the start; progressive technique.",
    editions: "Boosey & Hawkes."
  },
  {
    id: "rolland", tier: "core", category: "Beginner Methods", composer: "Paul Rolland", nationality: "Hungarian-American", period: "20th Century",
    title: "Young Strings in Action; The Teaching of Action in String Playing",
    difficulty: [1, 4],
    description: "Rolland's kinesthetic approach revolutionized string pedagogy. Based on research into natural body movement, his method emphasizes whole-body balance, freedom of motion, and the physical fundamentals that underlie healthy technique. 'The Teaching of Action in String Playing' includes instructional films (now available digitally) that remain essential viewing for teachers. His approach has profoundly influenced modern pedagogy, particularly regarding injury prevention and efficient motion.",
    skills: "Natural body movement; balanced posture; injury-free technique; whole-arm bowing; kinesthetic awareness.",
    editions: "Boosey & Hawkes (Young Strings in Action); University of Illinois (Teaching of Action, with video)."
  },

  // ═══════════════════════════════════════════════════════════════
  // SECTION 2: TECHNICAL EXERCISES (DRAMATICALLY EXPANDED)
  // ═══════════════════════════════════════════════════════════════
  // SCALE SYSTEMS
  {
    id: "flesch-scales", tier: "core", category: "Technical Exercises", subcategory: "Scale Systems", composer: "Carl Flesch", nationality: "Hungarian", period: "20th Century",
    title: "Scale System (Das Skalensystem, 1926)",
    difficulty: [5, 10],
    description: "The most widely adopted comprehensive scale routine. Covers every key in a progressive format: scales in one, two, and three octaves; arpeggios (triads, dominant 7ths, diminished 7ths); double stops in thirds, sixths, octaves, fingered octaves, and tenths; chromatic scales. Each key forms a self-contained daily unit. The system builds intonation, shifting fluency, left-hand frame consistency, and systematic bowing variety.",
    skills: "Intonation across all keys and positions; shifting; double-stop facility; arpeggio flexibility; systematic bowing development.",
    editions: "Carl Flesch, ed. Charlotte Flesch (Ries & Erler / Carl Fischer) — revised by Flesch's granddaughter, corrects errors from original printings; Carl Flesch, rev. Max Rostal (Ries & Erler) — pedagogical commentary reflecting the evolved Flesch school; Carl Fischer reprint — standard American edition; Schott — German alternative printing.",
    imslp: "https://imslp.org/wiki/Scale_System_(Flesch,_Carl)",
    examLevel: "RCM 9–10; ASTACAP 5–10"
  },
  {
    id: "flesch-urstudien", tier: "core", category: "Technical Exercises", subcategory: "Tone & Fundamentals", composer: "Carl Flesch", nationality: "Hungarian", period: "20th Century",
    title: "Urstudien (Basic Studies / Fundamental Studies)",
    difficulty: [3, 8],
    description: "Flesch's Urstudien address the most fundamental elements of violin technique: sustained tone production, basic bow strokes, and elementary left-hand patterns. They are designed as daily warm-up material and distill Flesch's approach to the building blocks of tone. The exercises include long tones with controlled bow speed and distribution, son filé (spun tone), and basic patterns for developing bow contact and sound point awareness. Less well-known than the Scale System but equally important in Flesch's pedagogical philosophy.",
    skills: "Tone production; bow control and distribution; son filé; sound-point awareness; basic left-hand patterns; daily warm-up routine.",
    editions: "Ries & Erler (original German edition); Carl Fischer (American edition)."
  },
  {
    id: "galamian-scales", tier: "core", category: "Technical Exercises", subcategory: "Scale Systems", composer: "Ivan Galamian", nationality: "Armenian-American", period: "20th Century",
    title: "Contemporary Violin Technique, Vols. 1 & 2 (1962)",
    difficulty: [5, 10],
    description: "The other dominant scale method. Volume 1 presents Galamian's theoretical framework with emphasis on 'acceleration patterns'—rhythmic groupings (2s, 3s, 4s, 6s, 8s, etc.) applied to scales for building speed and evenness. Volume 2 provides the scale and arpeggio material in all keys with extensive double-stop exercises. Distinctive for its insistence on rhythmic variety and coordination building.",
    skills: "Intonation; rhythmic precision through acceleration patterns; bow distribution; shifting; left-right coordination at speed.",
    editions: "Ivan Galamian & Frederick Neumann (Galaxy Music / ECS Publishing) — the only edition, periodically out of print.",
    examLevel: "RCM 4–10; ASTACAP 5–10"
  },
  {
    id: "hrimaly", tier: "core", category: "Technical Exercises", subcategory: "Scale Systems", composer: "Jan Hřimalý", nationality: "Czech", period: "19th Century",
    title: "Scale Studies for Violin (1895)",
    difficulty: [3, 6],
    description: "Scales and arpeggios in all major and minor keys across three octaves, with a simpler format than Flesch or Galamian. Proceeds chromatically through the keys and includes scales in thirds and sixths. Often used as preparatory material before advancing to Flesch.",
    skills: "Basic scale fluency in all keys; intonation fundamentals; early shifting; introduction to double-stop scales.",
    editions: "G. Schirmer (standard American edition); International Music Company.",
    imslp: "https://imslp.org/wiki/Scale_Studies_(H%C5%99imal%C3%BD,_Jan)",
    examLevel: "ASTACAP 2–10"
  },
  {
    id: "mogill", tier: "core", category: "Technical Exercises", subcategory: "Scale Systems", composer: "Leonard Mogill", nationality: "American", period: "20th Century",
    title: "Scale Studies in All Keys for Violin",
    difficulty: [3, 7],
    description: "A practical and well-organized scale reference that complements the Flesch and Galamian systems. Mogill was a member of the Philadelphia Orchestra, and his scale studies reflect the practical needs of a professional orchestral violinist. Clear layout and logical progressions make it a useful daily practice companion.",
    skills: "Scale and arpeggio fluency; practical intonation training; orchestral-oriented technical readiness.",
    editions: "G. Schirmer."
  },

  // LEFT-HAND TECHNIQUE
  {
    id: "schradieck", tier: "core", category: "Technical Exercises", subcategory: "Left Hand", composer: "Henry Schradieck", nationality: "German-American", period: "19th Century",
    title: "The School of Violin Technics (3 Books, 1899)",
    difficulty: [3, 8],
    description: "One of the most effective tools for left-hand agility, independence, and evenness. Book I: finger patterns in first position with progressive exercises for speed and clarity. Book II: exercises in positions II–VII. Book III: double stops. Meant to be played with a metronome at gradually increasing tempi.",
    skills: "Left-hand finger independence and agility; evenness of trill and passage work; upper-position facility (Book II); double-stop intonation and hand shape (Book III).",
    editions: "G. Schirmer (original) — standard reference edition; Carl Fischer — slightly reformatted but same content; International Music Company — available in individual books; Bosworth — European edition; Peters — German alternative.",
    imslp: "https://imslp.org/wiki/The_School_of_Violin-Technics_(Schradieck,_Henry)",
    examLevel: "RCM 4–5; ASTACAP 4–10"
  },
  {
    id: "sevcik-op1", tier: "core", category: "Technical Exercises", subcategory: "Left Hand", composer: "Otakar Ševčík", nationality: "Czech", period: "19th/20th Century",
    title: "School of Violin Technique, Op. 1 (4 Parts)",
    difficulty: [2, 9],
    description: "A monumental compendium. Part 1: first-position exercises (half/whole steps in all finger patterns). Part 2: exercises in 2nd–7th positions. Part 3: shifting between positions. Part 4: double stops. Encyclopedic—nearly every possible finger combination is exhaustively explored. Best used selectively, targeting specific weaknesses rather than played cover to cover.",
    skills: "Comprehensive left-hand development; finger patterns in all positions; interval intonation; shifting mechanics; double stops.",
    editions: "Bosworth (original Viennese edition) — individual parts available; Lauren Keiser / Masters Music (American reprint) — clean and affordable; Bärenreiter — scholarly reprint of the original engraving; Peters — German alternative; Schott — additional European option.",
    imslp: "https://imslp.org/wiki/School_of_Violin_Technique,_Op.1_(Sevc%CC%8C%C3%ADk,_Otakar)",
    examLevel: "RCM 2–10; ASTACAP 3–10"
  },
  {
    id: "sevcik-op8", tier: "core", category: "Technical Exercises", subcategory: "Left Hand – Shifting", composer: "Otakar Ševčík", nationality: "Czech", period: "19th/20th Century",
    title: "Changes of Position and Preparatory Scale Studies, Op. 8",
    difficulty: [4, 7],
    description: "A focused study on shifting mechanics. Progresses from single-position shifts (1st to 2nd, etc.) through shifts spanning the entire fingerboard. Covers intermediate shifts, chromatic shifts, and shifts with string crossings. One of the most targeted and effective shifting methods available.",
    skills: "Smooth, accurate shifting; slide technique; intermediate notes; intonation security across positions.",
    editions: "Bosworth; Lauren Keiser.",
    imslp: "https://imslp.org/wiki/Changes_of_Position_and_Preparatory_Scale_Studies,_Op.8_(Sevc%CC%8C%C3%ADk,_Otakar)",
    examLevel: "RCM 4–10; ASTACAP 5–10"
  },
  {
    id: "sevcik-op7", tier: "core", category: "Technical Exercises", subcategory: "Left Hand – Trills", composer: "Otakar Ševčík", nationality: "Czech", period: "19th/20th Century",
    title: "Preparatory Trill Studies, Op. 7",
    difficulty: [3, 7],
    description: "Systematic exercises for trill speed, evenness, and endurance. Covers trills from every finger combination in all positions, including double-stop trills. Often overlooked but extremely effective for building finger strength and independence.",
    skills: "Trill speed and evenness; finger strength; independence of weaker fingers (3rd and 4th).",
    editions: "Bosworth; International Music Company.",
    imslp: "https://imslp.org/wiki/Preparatory_Trill_Studies,_Op.7_(Sevc%CC%8C%C3%ADk,_Otakar)",
    examLevel: "RCM 4–10; ASTACAP 4–10"
  },
  {
    id: "sevcik-op9", tier: "core", category: "Technical Exercises", subcategory: "Left Hand", composer: "Otakar Ševčík", nationality: "Czech", period: "19th/20th Century",
    title: "Preparatory Studies in Double-Stopping, Op. 9",
    difficulty: [5, 8],
    description: "Focused double-stop preparatory exercises complementing the double-stop material in Op. 1, Part 4. Systematically addresses thirds, sixths, octaves, and fingered octaves with progressive difficulty. Particularly useful for building the hand-frame adjustments required for accurate double-stop intonation.",
    skills: "Double-stop intonation; hand-frame adjustment between intervals; finger independence in double-stop contexts.",
    editions: "Bosworth; Lauren Keiser.",
    examLevel: "RCM 4–10; ASTACAP 5–10"
  },
  {
    id: "sevcik-op6", tier: "core", category: "Beginner Methods", composer: "Otakar Ševčík", nationality: "Czech", period: "19th/20th Century",
    title: "Violin Method for Beginners, Op. 6",
    difficulty: [1, 3],
    description: "Ševčík's method for absolute beginners, covering the very first steps of violin playing: open strings, first-position finger placement, basic bowing, and elementary rhythms. Less commonly used today than Suzuki or Doflein but historically significant and still pedagogically sound.",
    skills: "Absolute beginner technique; first contact with the instrument; open strings; first-position patterns.",
    editions: "Bosworth."
  },
  {
    id: "dounis-op12", tier: "core", category: "Technical Exercises", subcategory: "Left Hand – Advanced", composer: "Demetrius Constantine Dounis", nationality: "Greek-American", period: "20th Century",
    title: "The Artist's Technique of Violin Playing, Op. 12",
    difficulty: [6, 10],
    description: "A concentrated system for developing virtuoso left-hand technique. Emphasizes absolute independence of the fingers, stretches, contractions, and unusual finger combinations beyond conventional patterns. Dounis was famous for rehabilitating the technique of professional violinists; these exercises have a therapeutic quality, isolating and rebuilding fundamental mechanical motions. Dense material—practice in small doses.",
    skills: "Finger independence and strength; stretches and contractions; elimination of excess tension; coordination between fingers.",
    editions: "Carl Fischer (standard edition, complete set); Stainer & Bell."
  },
  {
    id: "dounis-op15", tier: "core", category: "Technical Exercises", subcategory: "Left Hand – Advanced", composer: "Demetrius Constantine Dounis", nationality: "Greek-American", period: "20th Century",
    title: "The Absolute Independence of the Fingers, Op. 15",
    difficulty: [7, 10],
    description: "Perhaps Dounis's most celebrated work. Develops complete independence of each finger through patterns requiring one finger to hold while others move in contrary motion, extensions, and rapid alternations. Used by advanced players to overcome specific technical limitations.",
    skills: "Absolute finger independence; hand-frame stability during complex passages; elimination of sympathetic finger motion.",
    editions: "Carl Fischer."
  },
  {
    id: "dounis-op18", tier: "core", category: "Technical Exercises", subcategory: "Left Hand – Trills", composer: "Demetrius Constantine Dounis", nationality: "Greek-American", period: "20th Century",
    title: "Fundamental Trill Studies, Op. 18",
    difficulty: [7, 9],
    description: "Companion volume focusing on trill development through Dounis's characteristic approach of isolating mechanical motions. More advanced and unconventional than Ševčík's trill studies.",
    skills: "Advanced trill control; finger independence; hand balance and freedom.",
    editions: "Carl Fischer."
  },
  {
    id: "dounis-op21", tier: "core", category: "Technical Exercises", subcategory: "Left Hand – Advanced", composer: "Demetrius Constantine Dounis", nationality: "Greek-American", period: "20th Century",
    title: "The Higher Development of Thirds and Fingered Octaves, Op. 21",
    difficulty: [8, 10],
    description: "Advanced material for developing facility in the most demanding double-stop intervals: thirds and fingered octaves. Dounis's exercises go beyond conventional scale patterns to address the hand mechanics needed for these intervals at virtuoso speed and accuracy.",
    skills: "Advanced double-stop thirds; fingered octave facility; hand mechanics for virtuoso double-stop passage work.",
    editions: "Carl Fischer."
  },
  {
    id: "dounis-daily-dozen", tier: "core", category: "Technical Exercises", subcategory: "Left Hand – Advanced", composer: "Demetrius Constantine Dounis", nationality: "Greek-American", period: "20th Century",
    title: "Daily Dozen (Twelve Essential Exercises)",
    difficulty: [5, 9],
    description: "A concentrated set of twelve daily exercises distilling the core principles of Dounis's technique. Covers left-hand independence, stretches, shifts, and coordination. More approachable than the full Op. 12 system and an excellent introduction to Dounis's methods for players at the intermediate-to-advanced level.",
    skills: "Core left-hand mechanics; daily warm-up for advanced players; introduction to Dounis principles.",
    editions: "Carl Fischer."
  },

  // BOWING TECHNIQUE
  {
    id: "sevcik-op2", tier: "core", category: "Technical Exercises", subcategory: "Bowing", composer: "Otakar Ševčík", nationality: "Czech", period: "19th/20th Century",
    title: "School of Bowing Technique, Op. 2 (6 Parts)",
    difficulty: [2, 8],
    description: "The companion bowing method to Op. 1. Provides themes followed by hundreds of bowing variations. Part 1: basic strokes in lower half, upper half, and whole bow. Parts 2–5 progress through spiccato, sautillé, ricochet, staccato, and combination bowings. Part 6: advanced combinations. Exhaustive; use selectively to diagnose and correct bowing weaknesses.",
    skills: "All bow strokes; bow distribution; string crossings; off-the-string technique; combination bowings; right-hand coordination.",
    editions: "Bosworth (original, individual parts); Lauren Keiser / Masters Music (American reprint).",
    imslp: "https://imslp.org/wiki/School_of_Bowing_Technique,_Op.2_(Sevc%CC%8C%C3%ADk,_Otakar)",
    examLevel: "RCM 4–10; ASTACAP 3–10"
  },
  {
    id: "casorti", tier: "core", category: "Technical Exercises", subcategory: "Bowing", composer: "August Casorti", nationality: "Italian-German", period: "19th Century",
    title: "The Technique of Bowing, Op. 50",
    difficulty: [3, 7],
    description: "Systematic approach to all fundamental and advanced bow strokes. Progresses from basic whole-bow strokes through détaché, martelé, staccato (firm and flying), spiccato, sautillé, and ricochet. Less encyclopedic than Ševčík's Op. 2 but more digestible, with clear progressions within each stroke type.",
    skills: "Bow stroke vocabulary; bow control and distribution; string-crossing fluency; off-the-string technique.",
    editions: "Carl Fischer; International Music Company.",
    imslp: "https://imslp.org/wiki/The_Technique_of_Bowing,_Op.50_(Casorti,_August)"
  },
  {
    id: "fischer-basics", tier: "core", category: "Technical Exercises", subcategory: "Tone & Fundamentals", composer: "Simon Fischer", nationality: "British", period: "21st Century",
    title: "Basics: 300 Exercises and Practice Routines for the Violin (1997)",
    difficulty: [3, 9],
    description: "A landmark modern compendium that has become one of the most important pedagogical publications of recent decades. Fischer's 300 exercises systematically address every aspect of violin technique: right arm and bow (contact point, bow speed, pressure, distribution, string crossings, all strokes), left hand (intonation, shifting, vibrato, trills, extensions), and coordination. Each exercise is explained with Fischer's characteristically lucid prose, often accompanied by photographs and diagrams. The exercises are derived from Fischer's study with Dorothy DeLay, Galamian's methods, and his own extensive teaching experience. Used by students, professionals, and teachers worldwide as both a diagnostic tool and a daily practice resource.",
    skills: "Comprehensive technique: tone production, bow strokes, intonation, shifting, vibrato, trills, double stops, coordination, practice methodology.",
    editions: "Edition Peters (the only edition; regularly reprinted)."
  },
  {
    id: "fischer-practice", tier: "core", category: "Technical Exercises", subcategory: "Tone & Fundamentals", composer: "Simon Fischer", nationality: "British", period: "21st Century",
    title: "Practice: 250 Step-by-Step Practice Methods for the Violin (2004)",
    difficulty: [3, 9],
    description: "Fischer's companion to 'Basics,' focusing on how to practice rather than what to practice. The 250 methods address practice technique, problem-solving strategies, memorization, performance preparation, and the psychology of practicing. Each method is practical and immediately applicable. Together with 'Basics,' this forms the most comprehensive modern practice guide for violinists.",
    skills: "Practice methodology; problem diagnosis; memorization techniques; performance preparation; efficient practice habits.",
    editions: "Edition Peters."
  },
  {
    id: "fischer-scales", tier: "core", category: "Technical Exercises", subcategory: "Scale Systems", composer: "Simon Fischer", nationality: "British", period: "21st Century",
    title: "Scales (2012)",
    difficulty: [4, 9],
    description: "Fischer's scale method reimagines scale practice with an emphasis on understanding why each element is practiced and how to listen while playing scales. Includes exercises for intonation awareness, finger patterns, bow strokes, and musical shaping of scales. Complements rather than replaces Flesch and Galamian.",
    skills: "Intelligent scale practice; intonation awareness; understanding of finger patterns; musical scale playing.",
    editions: "Edition Peters."
  },
  {
    id: "fischer-warming", tier: "core", category: "Technical Exercises", subcategory: "Tone & Fundamentals", composer: "Simon Fischer", nationality: "British", period: "21st Century",
    title: "Warming Up (2020)",
    difficulty: [3, 8],
    description: "Fischer's most recent volume, presenting a systematic warm-up routine that covers all fundamental technical elements in a logical sequence. Designed to be used daily, selecting appropriate exercises from each section. Incorporates insights from decades of teaching and performing.",
    skills: "Daily warm-up routine; systematic technical maintenance; tone production; coordination.",
    editions: "Edition Peters."
  },
  {
    id: "fischer-tone", tier: "core", category: "Technical Exercises", subcategory: "Tone & Fundamentals", composer: "Simon Fischer", nationality: "British", period: "21st Century",
    title: "Tone: Experimenting with Proportions on the Violin (2021)",
    difficulty: [4, 10],
    description: "Fischer's deep exploration of tone production, examining the interplay of bow speed, pressure (weight), and contact point (sound point). The most detailed modern treatment of this fundamental subject, with exercises for developing a full palette of tone colors and dynamic range.",
    skills: "Tone production; sound-point awareness; dynamic control; tonal palette; bow speed/weight/contact relationships.",
    editions: "Edition Peters."
  },

  // SHIFTING
  {
    id: "yost", tier: "core", category: "Technical Exercises", subcategory: "Left Hand – Shifting", composer: "Gaylord Yost", nationality: "American", period: "Early 20th Century",
    title: "Exercises for the Change of Position",
    difficulty: [3, 6],
    description: "More melodic and musical shifting exercises than Ševčík's Op. 8. Presents shifts within short, tuneful phrases, making them appealing for intermediate students. Covers shifts between all commonly used positions on same finger, different fingers, and across strings.",
    skills: "Shifting accuracy and smoothness; musical application of position changes; building confidence in upper positions.",
    editions: "G. Schirmer; Carl Fischer.",
    imslp: "https://imslp.org/wiki/Exercises_for_Change_of_Position_(Yost,_Gaylord)"
  },

  // DOUBLE STOPS
  {
    id: "koergoeff", tier: "core", category: "Technical Exercises", subcategory: "Double Stops", composer: "Boris Koergoeff (Korguyev)", nationality: "Russian", period: "20th Century",
    title: "Exercises in Double Stopping",
    difficulty: [6, 9],
    description: "Standard resource for systematic double-stop development beyond the scale systems. Covers thirds, sixths, octaves, fingered octaves, and tenths with attention to intonation, hand-frame adjustment, and finger independence.",
    skills: "Double-stop intonation; left-hand frame for intervals; finger independence; endurance.",
    editions: "International Music Company; G. Schirmer.",
    imslp: "https://imslp.org/wiki/Exercises_in_Double-Stopping_(Korguyev,_Boris)"
  },
  {
    id: "polo", tier: "core", category: "Technical Exercises", subcategory: "Double Stops", composer: "Enrico Polo", nationality: "Italian", period: "Early 20th Century",
    title: "30 Studies in Double Stops",
    difficulty: [6, 8],
    description: "Polo's studies present double stops in étude form rather than as pure exercises, providing musical context for this demanding technique. Each study focuses on a particular interval type (thirds, sixths, octaves) within a piece-like framework, developing both accuracy and musical application. Polo was Arrigo Serato's teacher and a professor at the Milan Conservatory.",
    skills: "Double-stop intonation in musical context; thirds, sixths, octaves; left-hand frame in double-stop passages.",
    editions: "Ricordi (original Italian edition); International Music Company.",
    imslp: "https://imslp.org/wiki/30_Studi_a_corde_doppie_(Polo,_Enrico)",
    examLevel: "RCM 7–8"
  },

  // VIBRATO
  {
    id: "dounis-vibrato", tier: "core", category: "Technical Exercises", subcategory: "Vibrato", composer: "Demetrius Constantine Dounis", nationality: "Greek-American", period: "20th Century",
    title: "The Dounis Vibrato System (various exercises within Op. 12 & related materials)",
    difficulty: [4, 8],
    description: "Dounis developed specific exercises for developing a free, flexible vibrato, addressing arm vibrato, wrist vibrato, and finger vibrato as components of a unified motion. His approach emphasizes releasing tension and developing independent control of vibrato speed and width. These exercises are scattered across several of his publications and have been collected and systematized by later pedagogues.",
    skills: "Vibrato freedom; speed and width control; arm/wrist/finger vibrato integration; tension release.",
    editions: "Carl Fischer (within the Op. 12 collection and related publications)."
  },

  // GENERAL/COMPREHENSIVE
  {
    id: "wohlfahrt-38", tier: "core", category: "Technical Exercises", subcategory: "General", composer: "Franz Wohlfahrt", nationality: "German", period: "19th Century",
    title: "Easiest Elementary Method for Violin, Op. 38",
    difficulty: [1, 2],
    description: "Standard early-level method with short, tuneful exercises developing basic left-hand patterns in first position, simple bow strokes, and elementary reading skills. Bridge between absolute-beginner methods and étude collections.",
    skills: "First-position finger patterns; basic détaché and legato bowing; note reading; rhythmic fundamentals.",
    editions: "G. Schirmer; Peters.",
    imslp: "https://imslp.org/wiki/Easiest_Elementary_Method,_Op.38_(Wohlfahrt,_Franz)",
    examLevel: "ASTACAP Foundation–2"
  },
  {
    id: "sitt-studies", tier: "core", category: "Technical Exercises", subcategory: "General", composer: "Hans Sitt", nationality: "Czech-German", period: "19th Century",
    title: "100 Studies, Op. 32 (5 Books)",
    difficulty: [2, 6],
    description: "Sitt's five books of studies progress systematically from first-position exercises through advanced position work and double stops. Book 1: first position. Book 2: second through fifth positions. Book 3: sixth and seventh positions. Book 4: double stops. Book 5: advanced combinations. Less celebrated than Wohlfahrt or Kayser but well-crafted and useful, particularly Books 2–3 for position work.",
    skills: "Progressive position work; systematic technical development; double stops (Book 4); broad key coverage.",
    editions: "Peters; International Music Company.",
    imslp: "https://imslp.org/wiki/100_Studies,_Op.32_(Sitt,_Hans)"
  },
  {
    id: "dancla-op74", tier: "core", category: "Technical Exercises", subcategory: "General", composer: "Charles Dancla", nationality: "French", period: "19th Century",
    title: "School of Mechanism, Op. 74",
    difficulty: [4, 6],
    description: "Dancla's Op. 74 'School of Mechanism' is a systematic technical collection focusing on specific left-hand and bowing challenges. It reflects the elegance of the French school while methodically building facility in areas such as string crossings, trills, arpeggios, and double stops. More technically focused than his melodic études (Op. 84, see Etudes section), it functions as a targeted exercise collection. Dancla also wrote six 'Airs variés' on operatic themes (Op. 89) that serve as excellent student performance pieces.",
    skills: "French school mechanism; targeted left-hand exercises; bowing challenges; string crossings; trills; arpeggios.",
    editions: "G. Schirmer; International Music Company; Peters.",
    imslp: "https://imslp.org/wiki/School_of_Mechanism,_Op.74_(Dancla,_Charles)",
    examLevel: "ASTACAP 6–9"
  },
  {
    id: "whistler", tier: "core", category: "Technical Exercises", subcategory: "General", composer: "Harvey Whistler", nationality: "American", period: "20th Century",
    title: "Introducing the Positions (Vols. 1–2); Developing Double-Stops",
    difficulty: [3, 6],
    description: "Whistler's 'Introducing the Positions' is one of the most popular American resources for teaching shifting. Volume 1 covers third and fifth positions; Volume 2 covers second, fourth, sixth, and seventh positions. Clear, step-by-step approach with short exercises and pieces. 'Developing Double-Stops' provides a similar systematic introduction to double-stop playing.",
    skills: "Systematic position introduction; shifting fundamentals; double-stop basics.",
    editions: "Rubank / Hal Leonard.",
    examLevel: "ASTACAP 3–7"
  },
  {
    id: "tartini-art", tier: "core", category: "Technical Exercises", subcategory: "Tone & Fundamentals", composer: "Giuseppe Tartini", nationality: "Italian", period: "18th Century",
    title: "The Art of Bowing (L'arte dell'arco): 50 Variations on a Gavotte by Corelli",
    difficulty: [5, 8],
    description: "Fifty variations on a theme from Corelli's Op. 5, each exploring a different bowing pattern or technique. One of the earliest systematic approaches to bowing in the violin literature. The variations progress from simple to complex and remain musically engaging throughout. Still used as a bowing study and occasionally performed in concert.",
    skills: "Comprehensive bowing vocabulary; historical bow technique; musical application of varied bow strokes.",
    editions: "International Music Company; Peters; Ricordi.",
    imslp: "https://imslp.org/wiki/L%27arte_dell%27arco_(Tartini,_Giuseppe)"
  },

  // ═══════════════════════════════════════════════════════════════
  // SECTION 3: ETUDES & CAPRICES
  // ═══════════════════════════════════════════════════════════════
  {
    id: "wohlfahrt-45", tier: "core", category: "Etudes & Caprices", composer: "Franz Wohlfahrt", nationality: "German", period: "19th Century",
    title: "60 Studies for Violin, Op. 45",
    difficulty: [2, 4],
    description: "The workhorse of early pedagogy. Sixty studies progressing from first-position exercises to basic shifting and varied bowings. Musical enough to hold a young student's interest while covering essential fundamentals.",
    skills: "First-position facility; basic bowing patterns; key signatures through 3 sharps/flats; simple dynamics and phrasing.",
    editions: "G. Schirmer, ed. Gaston Blay; Peters; International Music Company.",
    imslp: "https://imslp.org/wiki/60_Studies,_Op.45_(Wohlfahrt,_Franz)",
    examLevel: "RCM 2–4; ABRSM 1–3; ASTACAP 2–5"
  },
  {
    id: "kayser", tier: "core", category: "Etudes & Caprices", composer: "Heinrich Ernst Kayser", nationality: "German", period: "19th Century",
    title: "36 Elementary and Progressive Studies, Op. 20",
    difficulty: [2, 4],
    description: "Natural companion to Wohlfahrt with greater variety of character. Later studies introduce third position and moderately complex bowings.",
    skills: "Expanded first-position technique; introduction to third position; varied articulations; elementary string crossing.",
    editions: "G. Schirmer; International Music Company; Peters.",
    imslp: "https://imslp.org/wiki/36_Elementary_and_Progressive_Studies,_Op.20_(Kayser,_Heinrich_Ernst)",
    examLevel: "RCM 3–5; ABRSM 2–4; ASTACAP 3–7"
  },
  {
    id: "beriot-60", tier: "core", category: "Etudes & Caprices", composer: "Charles de Bériot", nationality: "Belgian", period: "Romantic",
    title: "60 Easy Studies, Op. 60 (Méthode de violon, Pt. 1)",
    difficulty: [2, 4],
    description: "Melodically appealing studies reflecting the Franco-Belgian school's elegance. Cover first through third position with graceful phrasing and introduce ornaments earlier than most comparable collections.",
    skills: "Cantabile playing; ornaments; Franco-Belgian bowing style; musical expression at early stages.",
    editions: "G. Schirmer; International Music Company.",
    imslp: "https://imslp.org/wiki/M%C3%A9thode_de_violon,_Op.102_(B%C3%A9riot,_Charles-Auguste_de)"
  },
  {
    id: "mazas", tier: "core", category: "Etudes & Caprices", composer: "Jacques Féréol Mazas", nationality: "French", period: "Romantic",
    title: "Études spéciales, Op. 36 (3 Books)",
    difficulty: [4, 7],
    description: "Crucial position between Kayser and Kreutzer. Book 1 (Études spéciales): each étude targets a clear technique—string crossings, sustained legato, dotted rhythms, arpeggios, double stops. Books 2 (Études brillantes) and 3 (Études d'artistes) are progressively more demanding. Requires facility through fifth position.",
    skills: "String crossings; legato bowing; dotted rhythms; arpeggios across strings; positions 1–5; musical character.",
    editions: "International Music Company, ed. Ivan Galamian — the benchmark edition with Galamian's bowings and fingerings; G. Schirmer, ed. H. Sitt — older standard edition; Henle Verlag (Urtext) — scholarly edition based on first prints; Peters — European alternative; Schott — German edition.",
    imslp: "https://imslp.org/wiki/%C3%89tudes_sp%C3%A9ciales,_Op.36_(Mazas,_Jacques_F%C3%A9r%C3%A9ol)",
    examLevel: "RCM 5–7; ABRSM 5–6; ASTACAP 6–9"
  },
  {
    id: "kreutzer", tier: "core", category: "Etudes & Caprices", composer: "Rodolphe Kreutzer", nationality: "French", period: "Classical",
    title: "42 Studies or Caprices (c. 1796)",
    difficulty: [5, 8],
    description: "The single most universally assigned set of études. Required for virtually all conservatory admissions. Each study targets a specific technique: No. 2 (trills/turns), No. 5 (legato), No. 8 (détaché), No. 9 (staccato), Nos. 12–13 (double stops), No. 32 (octaves), No. 42 (arpeggiation). Requires facility through seventh position, functional spiccato and martelé, and basic double-stop competence.",
    skills: "Core bow strokes; double stops; trills; left-hand facility through 7th position; string crossings; varied articulations; musical phrasing.",
    editions: "International Music Company, ed. Ivan Galamian — the most influential modern edition, standard in American conservatories; Henle Verlag (Urtext), ed. Norbert Gertsch — scholarly edition based on early sources, with critical notes; Peters, ed. E. Singer — traditional European edition, widely used; Bärenreiter (Urtext) — strong scholarly option with facsimile references; G. Schirmer, ed. Singer — standard American reprint; Schott (historical German edition); Ricordi, ed. A. Principe — Italian performing edition.",
    imslp: "https://imslp.org/wiki/42_Studies_or_Caprices_(Kreutzer,_Rodolphe)",
    examLevel: "RCM 7–9 (selected); ABRSM 6–8; ASTACAP 6–10"
  },
  {
    id: "fiorillo", tier: "core", category: "Etudes & Caprices", composer: "Federigo Fiorillo", nationality: "German-Italian", period: "Classical",
    title: "36 Études or Caprices (c. 1790)",
    difficulty: [5, 7],
    description: "Often used alongside or between Kreutzer and Rode. Fiorillo's 36 études are less systematically organized than Kreutzer but offer excellent material for developing musical phrasing, varied articulations, and left-hand facility. Some studies have a concerto-like character. The set is sometimes undervalued but provides invaluable supplementary material.",
    skills: "Musical phrasing; varied bowings; position work; passage work; preparation for Rode.",
    editions: "International Music Company; G. Schirmer; Peters.",
    imslp: "https://imslp.org/wiki/36_%C3%89tudes_ou_Caprices_(Fiorillo,_Federigo)",
    examLevel: "RCM 8–9; ASTACAP 8–10"
  },
  {
    id: "rode", tier: "core", category: "Etudes & Caprices", composer: "Pierre Rode", nationality: "French", period: "Classical/Romantic",
    title: "24 Caprices en forme d'études (c. 1815)",
    difficulty: [6, 8],
    description: "More explicitly musical than Kreutzer, resembling miniature concerto movements. Cover all 24 keys, demanding refined cantabile, greater high-position facility, and emerging virtuosity. Commonly assigned after Kreutzer as preparation for Paganini and advanced concerti.",
    skills: "Cantabile and expressive playing; advanced position work; double stops; ornaments; mixed bowings; facility in all keys.",
    editions: "International Music Company, ed. Ivan Galamian — standard pedagogical edition; Henle Verlag (Urtext) — based on first edition, scholarly critical notes; Peters, ed. Sitt — traditional European edition; G. Schirmer — accessible American edition; Schott — German performing edition; Bärenreiter — scholarly alternative.",
    imslp: "https://imslp.org/wiki/24_Caprices_for_Violin,_Op.22_(Rode,_Pierre)",
    examLevel: "RCM 8–9; ASTACAP 9–10"
  },
  {
    id: "gavinies", tier: "core", category: "Etudes & Caprices", composer: "Pierre Gaviniès", nationality: "French", period: "Classical",
    title: "24 Matinées (c. 1794)",
    difficulty: [7, 9],
    description: "Among the most demanding pre-Paganini études. Require mature technique across the full range. Rich in musical content, demanding sustained concentration and stamina. Menuhin called them the most underrated works in the pedagogical literature.",
    skills: "Advanced bow technique; stamina; high-position work; complex passagework; pre-Romantic virtuosity; sustained musical intensity.",
    editions: "International Music Company, ed. Ivan Galamian — standard pedagogical edition with Galamian's fingerings and bowings; Peters — European edition; Schott — German alternative; Henle Verlag (Urtext) — scholarly edition; G. Schirmer — American standard.",
    imslp: "https://imslp.org/wiki/24_Matin%C3%A9es_(Gavini%C3%A8s,_Pierre)",
    examLevel: "RCM 10; ASTACAP 10"
  },
  {
    id: "dont-35", tier: "core", category: "Etudes & Caprices", composer: "Jakob Dont", nationality: "Austrian", period: "Romantic",
    title: "24 Etudes and Caprices, Op. 35",
    difficulty: [7, 9],
    description: "Bridges the gap between Kreutzer/Rode and Paganini. Technically challenging and musically substantive, covering advanced bow strokes, double stops, position work, and virtuosic passagework.",
    skills: "Advanced bow technique; double stops; challenging passagework; musical sophistication; preparation for Paganini.",
    editions: "Schott, ed. Max Rostal — the definitive pedagogical edition with Rostal's detailed fingerings, bowings, and interpretive notes reflecting the Flesch tradition; International Music Company, ed. Ivan Galamian — standard American teaching edition with Galamian's systematic fingerings and bowings; Henle Verlag (Urtext) — scholarly edition with critical notes and minimal editorial additions; Peters — traditional European edition; Bärenreiter (Urtext) — scholarly alternative; G. Schirmer — American standard; Carl Fischer, ed. L. Svecenski — older American edition with useful fingerings.",
    imslp: "https://imslp.org/wiki/24_Etudes_and_Caprices,_Op.35_(Dont,_Jakob)",
    examLevel: "RCM 10; ASTACAP 9–10"
  },
  {
    id: "dont-37", tier: "core", category: "Etudes & Caprices", composer: "Jakob Dont", nationality: "Austrian", period: "Romantic",
    title: "24 Preparatory Exercises, Op. 37",
    difficulty: [3, 5],
    description: "Significantly easier than Op. 35; serves as preparatory material for Kreutzer. Short, focused exercises covering shifting, string crossings, and basic bow strokes.",
    skills: "Intermediate shifting; string crossing; basic bow-stroke variety; preparation for Kreutzer.",
    editions: "G. Schirmer; International Music Company.",
    imslp: "https://imslp.org/wiki/24_Preparatory_Exercises,_Op.37_(Dont,_Jakob)",
    examLevel: "RCM 5–6; ASTACAP 5–7"
  },
  {
    id: "paganini", tier: "core", category: "Etudes & Caprices", composer: "Niccolò Paganini", nationality: "Italian", period: "Romantic",
    title: "24 Caprices for Solo Violin, Op. 1 (1817–1819)",
    difficulty: [9, 10],
    description: "The most famous and demanding caprices in the literature. Each is a complete musical miniature pushing the instrument to its limits. Highlights: No. 1 (ricochet arpeggios), No. 5 (agitato/string crossings), No. 9 ('La Chasse'), No. 13 ('Devil's Laughter,' double-stop trills), No. 16 (tenths), No. 17 (octaves/fingered octaves), No. 20 (wide intervals), No. 24 (theme and variations). Mastery of even a selection is a benchmark of professional technique.",
    skills: "Every virtuoso technique: ricochet, flying staccato, left-hand pizzicato, harmonics, extreme double stops, spiccato at speed, bariolage, wide stretches, stamina.",
    editions: "International Music Company, ed. Ivan Galamian — the standard American teaching edition, Galamian's practical fingerings used in conservatories worldwide; Peters, ed. Carl Flesch — Flesch's pedagogically oriented fingerings and bowings, an important historical document; Henle Verlag (Urtext), ed. Ernst Herttrich — premier scholarly edition, includes autograph facsimile pages; Bärenreiter (Urtext), ed. Renato de Barbieri — strong Urtext with commentary; Ricordi, ed. Salvatore Accardo — edition by the great Paganini interpreter; Wiener Urtext, ed. Endre Granat — includes access to autograph facsimile; Schott, ed. A. Wilhelmj — historically significant 19th-century edition; Dover (reprint of the Schirmer Library edition) — affordable reference.",
    imslp: "https://imslp.org/wiki/24_Caprices_for_Solo_Violin,_Op.1_(Paganini,_Niccol%C3%B2)",
    examLevel: "RCM ARCT"
  },
  {
    id: "ernst-poly", tier: "core", category: "Etudes & Caprices", composer: "Heinrich Wilhelm Ernst", nationality: "Moravian-Austrian", period: "Romantic",
    title: "Six Polyphonic Studies (c. 1862)",
    difficulty: [10, 10],
    description: "Among the most difficult works ever written for solo violin. The final study—a fantasy on Schubert's Erlkönig—demands simultaneous melody, accompaniment, and bass. Concert-level showpieces masquerading as studies.",
    skills: "Extreme polyphonic technique; multiple-voice playing; advanced double stops and chords; stamina.",
    editions: "International Music Company; Carl Fischer.",
    imslp: "https://imslp.org/wiki/6_Polyphonic_Studies_(Ernst,_Heinrich_Wilhelm)"
  },
  {
    id: "wieniawski-op10", tier: "core", category: "Etudes & Caprices", composer: "Henryk Wieniawski", nationality: "Polish", period: "Romantic",
    title: "L'École moderne: 10 Études-Caprices, Op. 10",
    difficulty: [8, 10],
    description: "Virtuoso concert pieces developing the bravura Franco-Belgian style. Each explores a specific technique—spiccato, double stops, harmonics, left-hand pizzicato—within a highly musical framework. Regularly performed in concert and competition.",
    skills: "Concert-level virtuosity; bravura style; all advanced bow strokes; double stops; harmonics; left-hand pizzicato.",
    editions: "International Music Company, ed. Josef Gingold — Gingold's edition includes practical performance suggestions from the great pedagogue; Polskie Wydawnictwo Muzyczne (PWM) — Polish critical edition of Wieniawski's works, the most authoritative source; Peters — standard European edition; G. Schirmer — American edition; Schott — German alternative.",
    imslp: "https://imslp.org/wiki/L%27%C3%89cole_moderne,_Op.10_(Wieniawski,_Henryk)",
    examLevel: "RCM 9–10"
  },
  {
    id: "beriot-op104", tier: "core", category: "Etudes & Caprices", composer: "Charles de Bériot", nationality: "Belgian", period: "Romantic",
    title: "Études brillantes, Op. 104",
    difficulty: [6, 8],
    description: "More advanced than Bériot's Op. 60. Develops concert-style virtuosity in the Franco-Belgian tradition with emphasis on brilliance of execution and elegant phrasing.",
    skills: "Brilliant passage work; elegant phrasing; concert-level bowing; Franco-Belgian style.",
    editions: "G. Schirmer.",
    imslp: "https://imslp.org/wiki/%C3%89tudes_brillantes,_Op.104_(B%C3%A9riot,_Charles-Auguste_de)"
  },
  {
    id: "vieuxtemps-op16", tier: "core", category: "Etudes & Caprices", composer: "Henri Vieuxtemps", nationality: "Belgian", period: "Romantic",
    title: "6 Concert Études, Op. 16",
    difficulty: [7, 9],
    description: "Six substantial concert études by one of the greatest virtuoso-composers of the Franco-Belgian school. Each is a demanding concert piece in its own right, requiring mature technique and musical projection. Less frequently encountered than Wieniawski's Op. 10 but of comparable quality and difficulty.",
    skills: "Concert-level virtuosity; Franco-Belgian school bowing; broad dynamic range; musical projection.",
    editions: "International Music Company; Peters; Schott.",
    imslp: "https://imslp.org/wiki/6_Concert_Etudes,_Op.16_(Vieuxtemps,_Henri)"
  },
  {
    id: "leonard-op81", tier: "core", category: "Etudes & Caprices", composer: "Hubert Léonard", nationality: "Belgian", period: "Romantic",
    title: "24 Études classiques (in the style of various composers)",
    difficulty: [6, 8],
    description: "Léonard composed these 24 études in the stylistic idiom of various composers and periods—studies 'in the style of' Corelli, Bach, Handel, Tartini, etc. This unique approach develops both technique and historical style awareness simultaneously. Léonard was Vieuxtemps's successor at the Brussels Conservatory and a central figure in the Franco-Belgian school.",
    skills: "Style awareness across periods; varied technique; historical performance practice; musical breadth.",
    editions: "G. Schirmer; International Music Company.",
    imslp: "https://imslp.org/wiki/24_%C3%89tudes_classiques_(L%C3%A9onard,_Hubert)"
  },
  {
    id: "locatelli", tier: "core", category: "Etudes & Caprices", composer: "Pietro Locatelli", nationality: "Italian", period: "Baroque",
    title: "24 Caprices (from L'Arte del Violino, Op. 3, 1733)",
    difficulty: [8, 10],
    description: "Locatelli's twelve concerti of L'Arte del Violino each contain extended solo cadenzas that function as self-contained caprices—the 24 capriccios that are the earliest virtuoso études in the violin literature, predating Paganini by nearly a century. They demand extreme position work (Locatelli routinely ventures beyond the 12th position), rapid passage work, double stops, and bariolage. Locatelli was a student of Corelli who pushed the instrument far beyond his teacher's boundaries. These caprices are increasingly performed and recorded as the historical-performance movement has brought attention to pre-Paganini virtuosity. They are indispensable for understanding the origins of violin virtuosity.",
    skills: "Extreme high-position work; pre-Paganini virtuosity; Baroque passage work; double stops; bariolage; historical virtuoso technique.",
    editions: "Schott, ed. Arend Koole (critical edition from the complete works); Peters; Ricordi; IMSLP (historical editions).",
    imslp: "https://imslp.org/wiki/L%27arte_del_violino,_Op.3_(Locatelli,_Pietro_Antonio)",
    examLevel: "RCM 10"
  },
  {
    id: "campagnoli-op18", tier: "core", category: "Etudes & Caprices", composer: "Bartolomeo Campagnoli", nationality: "Italian", period: "Classical",
    title: "7 Divertimenti for Solo Violin, Op. 18",
    difficulty: [6, 8],
    description: "Campagnoli's seven Divertimenti are substantial multi-movement works for solo violin that function as advanced études. Each Divertimento explores different techniques—double stops, arpeggios, passage work in high positions, polyphonic writing—within a musically satisfying framework. They bridge the gap between the Classical solo violin tradition (Telemann, Bach) and the Romantic era. More demanding than Rode and less extreme than Paganini, they occupy an important but often overlooked position in the étude literature.",
    skills: "Solo violin polyphony; double stops; advanced position work; Classical-era solo technique; multi-movement étude form.",
    editions: "Peters; International Music Company; Suvini Zerboni; IMSLP.",
    imslp: "https://imslp.org/wiki/7_Divertimenti,_Op.18_(Campagnoli,_Bartolomeo)"
  },
  {
    id: "dancla-op73", tier: "core", category: "Etudes & Caprices", composer: "Charles Dancla", nationality: "French", period: "Romantic",
    title: "20 Études brillantes et caractéristiques, Op. 73",
    difficulty: [5, 7],
    description: "More demanding than Dancla's Op. 84, these twenty études develop concert-style technique with the elegance characteristic of the Paris Conservatoire school. Each étude has a distinct musical character—hence 'caractéristiques'—ranging from lyrical cantabile to brilliant passage work. They serve as excellent preparation for the more demanding études of Dont Op. 35 and the Franco-Belgian concert étude tradition. Dancla's melodic gift makes these studies genuinely pleasant to practice.",
    skills: "Concert-style technique; French school elegance; varied musical character; intermediate-to-advanced bowing and left-hand development.",
    editions: "G. Schirmer; International Music Company; Peters.",
    imslp: "https://imslp.org/wiki/20_%C3%89tudes_brillantes_et_caract%C3%A9ristiques,_Op.73_(Dancla,_Charles)",
    examLevel: "RCM 9"
  },
  {
    id: "dancla-op84", tier: "core", category: "Etudes & Caprices", composer: "Charles Dancla", nationality: "French", period: "Romantic",
    title: "36 Études mélodiques et faciles, Op. 84",
    difficulty: [3, 5],
    description: "Dancla's most popular étude collection: thirty-six melodically appealing studies that develop intermediate technique within a musically satisfying French school framework. They cover shifting through fifth position, varied bowings, and moderate double stops. Often assigned alongside Mazas as alternative or supplementary material, they are distinguished by their genuine melodic charm—students tend to enjoy practicing them.",
    skills: "Melodic playing; French school style; intermediate bowings; shifting through 5th position; basic double stops; musicality.",
    editions: "G. Schirmer; International Music Company; Peters; Lemoine (original French).",
    imslp: "https://imslp.org/wiki/36_%C3%89tudes_m%C3%A9lodiques_et_tr%C3%A8s_faciles,_Op.84_(Dancla,_Charles)",
    examLevel: "ABRSM Grade 3 (Op. 84 No. 17 is a Grade 3 List C piece)"
  },
  {
    id: "wieniawski-op18", tier: "core", category: "Etudes & Caprices", composer: "Henryk Wieniawski", nationality: "Polish", period: "Romantic",
    title: "Études-Caprices, Op. 18 (for Two Violins)",
    difficulty: [7, 9],
    description: "Wieniawski's eight Études-Caprices for two violins are unique in the étude literature: virtuoso concert studies with an accompanying second violin part. The first violin part is as demanding as Op. 10, but the duo format adds ensemble dimension and harmonic context that makes the studies both more musical and more challenging (intonation must be precise against the second violin). They are performed both as études and as concert pieces, and they develop virtuoso ensemble skills rarely addressed elsewhere.",
    skills: "Virtuoso duo technique; ensemble intonation; concert-level passage work alongside another player; bravura style in chamber context.",
    editions: "Polskie Wydawnictwo Muzyczne (PWM, Polish critical edition); International Music Company; Peters.",
    imslp: "https://imslp.org/wiki/%C3%89tudes-Caprices,_Op.18_(Wieniawski,_Henryk)",
    examLevel: "RCM 9–10"
  },
  {
    id: "alard-etudes", tier: "core", category: "Etudes & Caprices", composer: "Jean-Delphin Alard", nationality: "French", period: "Romantic",
    title: "24 Études-Caprices, Op. 41",
    difficulty: [7, 9],
    description: "Alard's 24 Études-Caprices are substantial, virtuosic concert études that deserve far wider recognition. Each is dedicated to exploring a specific advanced technique—rapid arpeggios, double-stop trills, staccato, harmonics, spiccato at speed—within a musically compelling form. Alard was Sarasate's teacher at the Paris Conservatoire, and these études reflect the bravura tradition that Sarasate would carry to its apex. They occupy similar territory to Dont Op. 35 and Wieniawski Op. 10 but with a distinctly French character.",
    skills: "Advanced virtuoso technique; French school bravura; double-stop trills; harmonics; staccato; concert-level études.",
    editions: "Schott (original); available on IMSLP.",
    imslp: "https://imslp.org/wiki/24_%C3%89tudes-Caprices,_Op.41_(Alard,_Jean-Delphin)"
  },
  {
    id: "rovelli", tier: "core", category: "Etudes & Caprices", composer: "Pietro Rovelli", nationality: "Italian", period: "Classical/Romantic",
    title: "12 Caprices for Solo Violin, Op. 3 & Op. 5",
    difficulty: [7, 9],
    description: "Rovelli's caprices are ambitious solo violin works that occupy the territory between Rode and Paganini. They demand advanced position work, double stops, and considerable musical sophistication. Less well known than the major étude collections, they provide valuable supplementary material for advanced students seeking to expand their caprice repertoire beyond the standard Kreutzer–Rode–Paganini progression. Rovelli was concertmaster in Munich and a respected performer of his era.",
    skills: "Advanced solo violin technique; double stops; high-position work; pre-Paganini virtuosity; musical substance.",
    editions: "Peters; Ricordi; IMSLP.",
    imslp: "https://imslp.org/wiki/12_Caprices,_Op.3_(Rovelli,_Pietro)",
    examLevel: "RCM 10"
  },
  {
    id: "sauret", tier: "core", category: "Etudes & Caprices", composer: "Émile Sauret", nationality: "French", period: "Late Romantic",
    title: "24 Études-Caprices, Op. 64",
    difficulty: [9, 10],
    description: "Sauret's 24 Études-Caprices are among the most technically demanding études ever written, rivaling Paganini in difficulty while being more consistently musical. Sauret was one of the supreme virtuosos of the late 19th century, and these études exploit every extreme of the instrument: wide stretches, rapid passage work in the highest positions, elaborate double stops, left-hand pizzicato combined with bowing, and harmonics. They have been championed in recent years by virtuosos seeking repertoire beyond the standard Paganini Caprices. Each is a substantial concert piece in its own right.",
    skills: "Extreme virtuoso technique; every advanced device; concert-level études; extends beyond Paganini in some technical domains.",
    editions: "Simrock (original); available on IMSLP; some modern reprints.",
    imslp: "https://imslp.org/wiki/24_%C3%89tudes-caprices,_Op.64_(Sauret,_%C3%89mile)"
  },
  {
    id: "hermann-studies", tier: "core", category: "Etudes & Caprices", composer: "Friedrich Hermann", nationality: "German", period: "Romantic",
    title: "6 Concert Studies, Op. 18",
    difficulty: [7, 8],
    description: "Hermann's six concert studies are effective, well-crafted advanced études in the German tradition. Each addresses a specific technique—sustained legato, staccato, double stops, arpeggiation—with solid musical content. Hermann was concertmaster in Leipzig and a colleague of Ferdinand David. While less celebrated than the Franco-Belgian concert études, they provide excellent material for developing German school technique.",
    skills: "German school concert études; specific technical focus per study; advanced bowing and left-hand technique.",
    editions: "Peters; International Music Company."
  },
  {
    id: "dont-op38", tier: "core", category: "Etudes & Caprices", composer: "Jakob Dont", nationality: "Austrian", period: "Romantic",
    title: "Gradus ad Parnassum, Op. 38 (Progressive Studies)",
    difficulty: [4, 6],
    description: "Often overshadowed by Dont's more famous Op. 35 and Op. 37, the Gradus ad Parnassum fills the important gap between those two collections. The progressive studies develop intermediate-to-advanced technique systematically, with particular attention to bowing variety, position work, and musical phrasing. They serve as an excellent bridge from Op. 37 toward Op. 35 and can be used alongside Mazas and early Kreutzer studies.",
    skills: "Progressive intermediate technique; bowing variety; position work; musical phrasing; bridge between Op. 37 and Op. 35.",
    editions: "Peters; International Music Company.",
    imslp: "https://imslp.org/wiki/Gradus_ad_Parnassum,_Op.38_(Dont,_Jakob)"
  },
  {
    id: "ysaye-preludes", tier: "core", category: "Etudes & Caprices", composer: "Eugène Ysaÿe", nationality: "Belgian", period: "Modern",
    title: "10 Préludes for Solo Violin, Op. 35 (posthumous, c. 1928–29)",
    difficulty: [8, 9],
    description: "Less well known than the six Solo Sonatas but of comparable quality, Ysaÿe's ten Préludes are concentrated miniatures for unaccompanied violin. Each explores a specific technical or expressive idea—harmonics, double stops, muted playing, rhythmic patterns—within a compressed format. They function both as concert pieces and as advanced études. Published posthumously and only widely available since the late 20th century, they are increasingly programmed by adventurous violinists.",
    skills: "Advanced solo violin technique; concentrated expression; specific technical focus per prélude; modern solo violin idiom.",
    editions: "Schott; Henle Verlag."
  },
  {
    id: "spohr-student-concerti", tier: "core", category: "Concerti", composer: "Louis Spohr", nationality: "German", period: "Romantic",
    title: "Student Concertos Nos. 2 (Op. 2, D minor), 9 (Op. 55, D minor) & others; Didactic Works",
    difficulty: [5, 8],
    description: "Several of Spohr's fifteen violin concerti have long served pedagogical functions, particularly Nos. 2, 8, and 9, which are assigned as student concerto repertoire between Mozart and the major Romantic concerti. They develop sustained Romantic cantabile, moderate passage work, and the broad tonal concept required for larger concertos. Spohr also composed various didactic works including duets for teacher and student. While not études in the strict sense, these concertos function as large-scale technical and musical studies.",
    skills: "Romantic cantabile; sustained phrasing; moderate virtuosity; preparation for major Romantic concerti; German Romantic style.",
    editions: "Peters; International Music Company; Henle Verlag."
  },

  // ═══════════════════════════════════════════════════════════════
  // SECTION 4: TREATISES & PEDAGOGICAL TEXTS
  // ═══════════════════════════════════════════════════════════════
  {
    id: "geminiani-treatise", tier: "core", category: "Treatises", subcategory: "Baroque & Classical Treatises", composer: "Francesco Geminiani", nationality: "Italian", period: "Baroque",
    title: "The Art of Playing on the Violin, Op. 9 (1751)",
    difficulty: [1, 10],
    description: "The first comprehensive treatise on violin playing. Published in London, it covers all aspects of technique known in the mid-18th century: bowing, ornaments, position work, and musical expression. Geminiani's treatise is remarkable for its insistence on expressive playing and its detailed instructions on ornamentation, dynamics, and the 'good taste' essential to Baroque performance. It includes example exercises and pieces. Essential reading for anyone interested in historical performance practice and the foundations of violin pedagogy.",
    skills: "Historical performance practice; Baroque technique and ornamentation; understanding of 18th-century musical aesthetics.",
    editions: "Oxford University Press, ed. David Boyden (critical modern edition with commentary); facsimile editions available from Early Music sources; Dover reprint."
  },
  {
    id: "mozart-treatise", tier: "core", category: "Treatises", subcategory: "Baroque & Classical Treatises", composer: "Leopold Mozart", nationality: "Austrian", period: "Classical",
    title: "Versuch einer gründlichen Violinschule (A Treatise on the Fundamental Principles of Violin Playing, 1756)",
    difficulty: [1, 10],
    description: "Published the same year as his son Wolfgang's birth, Leopold Mozart's treatise is the most important 18th-century German-language source on violin playing. It covers holding the instrument, bowing, ornaments, position work, and musical taste. Mozart's prose is clear, witty, and opinionated. The treatise provides invaluable insight into Classical-era performance practice: articulation, bowings, dynamics, and the expectations for 'good taste' in execution. Required reading for performers and scholars of 18th-century music.",
    skills: "Classical-era performance practice; historical bowing and articulation; ornamental style; philosophical approach to musicianship.",
    editions: "Oxford University Press, trans. Editha Knocker (standard English translation with scholarly commentary); Bärenreiter (German critical edition); facsimile of the 1756 first edition available."
  },
  {
    id: "joachim-moser", tier: "core", category: "Traditional Violin Schools", composer: "Joseph Joachim & Andreas Moser", nationality: "Hungarian-German", period: "Late Romantic",
    title: "Violinschule (Violin School, 3 vols., 1902–05)",
    difficulty: [1, 10],
    description: "The three-volume method by the greatest violinist of the late 19th century and his teaching assistant. Volume 1 covers basic technique; Volume 2 presents advanced technique and musical interpretation; Volume 3 is an anthology of études and pieces with Joachim's own fingerings and bowings. This method documents the performing tradition of Brahms's circle and the German Classical school. Joachim's approach to phrasing, bowing, and musical interpretation provides essential insight into the performance practice of Romantic music.",
    skills: "Late-Romantic performance practice; Brahms/German school interpretation; comprehensive technique; musical philosophy of the Joachim tradition.",
    editions: "Simrock (original German edition, 3 volumes); English translation published by N. Simrock; Dover reprints of portions."
  },
  {
    id: "auer-treatise", tier: "core", category: "Treatises", subcategory: "Modern Pedagogy", composer: "Leopold Auer", nationality: "Hungarian-American", period: "Early 20th Century",
    title: "Violin Playing as I Teach It (1921); Violin Masterworks and Their Interpretation (1925)",
    difficulty: [1, 10],
    description: "'Violin Playing as I Teach It' is a concise, practical guide to Auer's approach: the teacher who produced Heifetz, Milstein, Elman, Zimbalist, Seidel, and others. Auer covers holding the instrument, bowing, left-hand technique, vibrato, practice methods, and stage deportment. His style is direct and opinionated. 'Violin Masterworks and Their Interpretation' discusses the major concerti and sonatas with interpretive guidance. While not as comprehensive as Flesch's 'Art of Violin Playing,' Auer's writing offers unique insight into the Russian school's aesthetic priorities: tone quality, musical expression above all, and the primacy of singing on the instrument.",
    skills: "Russian school principles; interpretive philosophy; practice methodology; tone production priorities; performance preparation.",
    editions: "Dover (reprint of both books, widely available and affordable); Frederick Stokes (original publisher)."
  },
  {
    id: "flesch-art", tier: "core", category: "Treatises", subcategory: "Modern Pedagogy", composer: "Carl Flesch", nationality: "Hungarian", period: "20th Century",
    title: "The Art of Violin Playing (Die Kunst des Violinspiels, 2 vols., 1923–28)",
    difficulty: [1, 10],
    description: "The most comprehensive and analytically rigorous treatise on violin playing ever written. Volume 1 covers technique exhaustively: every aspect of right-arm and left-hand mechanics, tone production, shifting, vibrato, double stops, bowing, and fingering principles. Volume 2 addresses interpretation: phrasing, dynamics, rubato, program building, teaching, stage fright, and the psychology of performance. Flesch's analytical mind dissected every element of violin technique with unprecedented clarity. His influence on 20th-century violin pedagogy is incalculable. Essential reading for every serious violinist and teacher.",
    skills: "Comprehensive technical analysis; interpretive principles; teaching methodology; practice philosophy; performance psychology; historical perspective.",
    editions: "Carl Fischer (English translation by Eric Rosenblith, 2 volumes); Ries & Erler (German original); Max Rostal's annotated edition includes additional commentary from Flesch's most distinguished student."
  },
  {
    id: "flesch-memoirs", tier: "core", category: "Treatises", subcategory: "Modern Pedagogy", composer: "Carl Flesch", nationality: "Hungarian", period: "20th Century",
    title: "Memoirs (1957, posthumous); The Memoirs of Carl Flesch",
    difficulty: [1, 10],
    description: "Flesch's autobiography, published posthumously, provides fascinating insights into the violin world of the late 19th and early 20th centuries. His candid assessments of contemporaries (Ysaÿe, Kreisler, Heifetz, etc.) are legendary. While not a pedagogical text per se, the memoirs illuminate the aesthetic and technical values of a golden age of violin playing.",
    skills: "Historical perspective; aesthetic values; understanding of violin traditions and schools.",
    editions: "Rockliff (original English edition); Da Capo Press (reprint); Bois de Boulogne (expanded German edition)."
  },
  {
    id: "galamian-principles", tier: "core", category: "Treatises", subcategory: "Modern Pedagogy", composer: "Ivan Galamian", nationality: "Armenian-American", period: "20th Century",
    title: "Principles of Violin Playing and Teaching (1962)",
    difficulty: [1, 10],
    description: "The most influential American treatise on violin pedagogy. Galamian's 'Principles' presents a systematic, analytical approach to every aspect of technique, organized around the concept of coordination between the two hands. His treatment of bowing mechanics (the 'spring' concept), shifting, vibrato, and practice methodology remains definitive. Less discursive than Flesch but arguably more systematic and practical. Galamian taught at Curtis and Juilliard and produced Perlman, Zukerman, Chung, Laredo, Steinhardt, and dozens of other leading violinists.",
    skills: "Systematic technical analysis; coordination principles; bowing mechanics; practice methodology; teaching philosophy.",
    editions: "Prentice-Hall / Simon & Schuster (original); Shar Products (reprint, widely available)."
  },
  {
    id: "fischer-treatise", tier: "core", category: "Treatises", subcategory: "Modern Pedagogy", composer: "Simon Fischer", nationality: "British", period: "21st Century",
    title: "The Violin Lesson (2012)",
    difficulty: [1, 10],
    description: "Fischer's collected essays and teaching articles from The Strad magazine, organized thematically. Covers technique, interpretation, practice, and performance in Fischer's characteristically detailed and practical style. Each chapter reads as a self-contained lesson on a specific topic—vibrato, intonation, bow technique, shifting—with concrete exercises and photographic illustrations. Together with 'Basics' and 'Practice,' this forms a comprehensive modern pedagogical library.",
    skills: "Broad technical and interpretive topics; practical solutions to common problems; modern pedagogy.",
    editions: "Edition Peters."
  },
  {
    id: "yankelevich-treatise", tier: "core", category: "Treatises", subcategory: "Modern Pedagogy", composer: "Yuri Yankelevich", nationality: "Russian", period: "20th Century",
    title: "Pedagogical Heritage (various writings, ed. by students)",
    difficulty: [1, 10],
    description: "Yankelevich was one of the greatest pedagogues of the Soviet school, teaching at the Moscow Conservatory and producing Tretyakov, Spivakov, Kogan (Leonid's students), and many others. His writings on position changes, vibrato, and the biomechanics of violin playing offer insights from the Soviet school's rigorous analytical tradition. Published primarily in Russian with some translations.",
    skills: "Soviet school pedagogy; biomechanical approach to technique; shifting and vibrato analysis.",
    editions: "Various Russian-language publications; some English translations in journal articles and collected volumes."
  },
  {
    id: "havas", tier: "core", category: "Treatises", subcategory: "Modern Pedagogy", composer: "Kató Havas", nationality: "Hungarian-British", period: "20th Century",
    title: "A New Approach to Violin Playing (1961); Stage Fright: Its Causes and Cures (1973)",
    difficulty: [1, 10],
    description: "Havas's 'New Approach' addresses the physical and psychological sources of tension in violin playing, offering exercises for developing freedom of movement and a natural technique. Her work on stage fright is one of the earliest serious treatments of performance anxiety in the string literature. While controversial among some traditional pedagogues, her insights into tension release and the mind-body connection have influenced many teachers.",
    skills: "Tension release; freedom of movement; performance anxiety management; psychological approach to technique.",
    editions: "Bosworth (both books)."
  },
  {
    id: "menuhin-lessons", tier: "core", category: "Treatises", subcategory: "Modern Pedagogy", composer: "Yehudi Menuhin", nationality: "American", period: "20th Century",
    title: "Violin: Six Lessons with Yehudi Menuhin (1971)",
    difficulty: [1, 10],
    description: "Based on Menuhin's BBC television series, this book presents his philosophically rich approach to violin playing. Menuhin discusses posture, bowing, and technique through the lens of yoga, Alexander Technique, and holistic body awareness. His emphasis on naturalness, balance, and the integration of body and mind offers a valuable complement to more analytically oriented treatises. Illustrated with photographs and diagrams.",
    skills: "Holistic approach to technique; body awareness; yoga and Alexander Technique integration; philosophical perspective on playing.",
    editions: "Faber and Faber (original); numerous reprints."
  },
  {
    id: "stowell-cambridge", tier: "core", category: "Treatises", subcategory: "Historical & Scholarly", composer: "Robin Stowell (ed.)", nationality: "British", period: "21st Century",
    title: "The Cambridge Companion to the Violin (1992); Violin Technique and Performance Practice in the 18th and 19th Centuries (1985)",
    difficulty: [1, 10],
    description: "Stowell's two books are essential scholarly references. 'The Cambridge Companion' is a multi-author survey covering the violin's history, repertoire, pedagogy, and performance practice. 'Violin Technique and Performance Practice' is a detailed study of historical performance, drawing on treatises from Geminiani through Joachim. Both are invaluable for understanding the evolution of violin playing and interpreting music from different periods.",
    skills: "Historical knowledge; performance practice across periods; scholarly perspective; pedagogical context.",
    editions: "Cambridge University Press."
  },
  {
    id: "boyden", tier: "core", category: "Treatises", subcategory: "Historical & Scholarly", composer: "David Boyden", nationality: "American", period: "20th Century",
    title: "The History of Violin Playing from its Origins to 1761 (1965)",
    difficulty: [1, 10],
    description: "The definitive scholarly history of violin playing from the instrument's invention through the mid-18th century. Boyden's exhaustive research covers instruments, technique, repertoire, pedagogy, and aesthetics. While primarily a historical work, it provides essential context for understanding the evolution of technique and the roots of modern playing.",
    skills: "Comprehensive historical knowledge; understanding of the evolution of technique and style; scholarly context for performance practice.",
    editions: "Oxford University Press (Clarendon Press)."
  },

  // ═══════════════════════════════════════════════════════════════
  // SECTION 5: ONLINE RESOURCES
  // ═══════════════════════════════════════════════════════════════
  {
    id: "violinmasterclass", tier: "core", category: "Online Resources", composer: "Kurt Sassmannshaus", nationality: "German-American", period: "21st Century",
    title: "ViolinMasterclass.com (now largely archived)",
    difficulty: [1, 10],
    description: "Professor Kurt Sassmannshaus's landmark website, produced at the Cincinnati College-Conservatory of Music. Features hundreds of video lessons covering technique from beginner through professional level, performed and demonstrated by Sassmannshaus and his students. Topics include scales, études (with demonstrations of Kreutzer, Rode, Dont, and Paganini caprices), shifting, vibrato, bow technique, and masterclass-style coaching on concerto repertoire. Though the full site is no longer actively maintained, much of the content remains available through archived versions and YouTube. This was one of the first and most comprehensive free online violin pedagogical resources.",
    skills: "Visual demonstration of all technical elements; masterclass-style coaching; étude performance models; comprehensive free resource.",
    editions: "Free (web archive and YouTube channel: violinmasterclass)."
  },
  {
    id: "tonebase", tier: "core", category: "Online Resources", composer: "Various Artists", nationality: "International", period: "21st Century",
    title: "Tonebase Violin",
    difficulty: [3, 10],
    description: "A premium subscription platform featuring video lessons from leading performers and pedagogues including Hilary Hahn, Augustin Hadelich, Ray Chen, Itzhak Perlman, Pamela Frank, Midori, James Ehnes, and dozens more. Content includes technique masterclasses, repertoire deep-dives, practice methodology, performance psychology, and career development. The production quality is high and the roster of teachers is extraordinary. Lessons range from intermediate technique to the most advanced repertoire. Community features include forums and practice challenges.",
    skills: "Repertoire coaching from world-class artists; technique masterclasses; practice methodology; performance preparation; career guidance.",
    editions: "Subscription platform (tonebase.co). Free tier available with limited content."
  },
  {
    id: "perlman-youtube", tier: "core", category: "Online Resources", composer: "Itzhak Perlman", nationality: "Israeli-American", period: "21st Century",
    title: "Itzhak Perlman YouTube Masterclasses & Tohu Media",
    difficulty: [5, 10],
    description: "Perlman's YouTube presence includes excerpts from his masterclasses at the Perlman Music Program and Juilliard. His coaching emphasizes musical expression, phrasing, and the art of storytelling through the instrument. His warmth, humor, and directness make complex musical ideas accessible. His Tohu Media project has produced additional educational content. Separately, many full Perlman masterclasses from festivals (Verbier, Aspen, etc.) are available on YouTube.",
    skills: "Musical interpretation; phrasing; tonal concept; stage presence; communicating through music.",
    editions: "Free (YouTube: various channels including Perlman Music Program, Tohu, and festival recordings)."
  },
  {
    id: "heifetz-masterclass", tier: "core", category: "Online Resources", composer: "Jascha Heifetz", nationality: "Russian-American", period: "20th Century",
    title: "Heifetz Master Class Videos (USC, 1962–72)",
    difficulty: [7, 10],
    description: "Historic filmed masterclasses from Heifetz's teaching years at USC. These are the only extensive recordings of the greatest violinist of the 20th century in a pedagogical setting. Heifetz's terse, demanding, and often witty teaching style reveals his priorities: intonation, rhythm, tone quality, and musical conviction. Available through various archival sources and YouTube. Essential viewing for any serious student.",
    skills: "Heifetz's approach to intonation, rhythm, and tone; historical performance practice; interpretive standards of the highest caliber.",
    editions: "Historical recordings (available on YouTube and through USC archives)."
  },
  {
    id: "delay-videos", tier: "core", category: "Online Resources", composer: "Dorothy DeLay", nationality: "American", period: "20th Century",
    title: "Dorothy DeLay Teaching Videos & Documentary ('Teaching Genius')",
    difficulty: [3, 10],
    description: "Video recordings of DeLay's Juilliard masterclasses and the documentary 'Teaching Genius' provide insight into the methods of one of the most successful violin teachers in history (students include Perlman, Chung, Midori, Sarah Chang, Gil Shaham, Hahn, Nadja Salerno-Sonnenberg). DeLay's Socratic teaching style—asking students questions rather than giving directives—and her emphasis on psychological support alongside technical development are illuminating.",
    skills: "Pedagogical methodology; Socratic teaching approach; psychological aspects of teaching; interpretive coaching.",
    editions: "Various archival sources; YouTube; 'Teaching Genius' book by Barbara Lourie Sand (Amadeus Press)."
  },
  {
    id: "vengerov-lessons", tier: "core", category: "Online Resources", composer: "Maxim Vengerov", nationality: "Russian-Israeli", period: "21st Century",
    title: "Maxim Vengerov YouTube Masterclasses & Online Teaching",
    difficulty: [5, 10],
    description: "Vengerov has been generous with online educational content, including full masterclasses, technique demonstrations, and practice tips. His combination of extraordinary virtuosity and articulate explanation makes him one of the most effective communicators among active soloists. His masterclass videos on YouTube, particularly those from the Verbier Festival and Menuhin Competition, are widely viewed and highly regarded.",
    skills: "Virtuoso technique demonstration; Russian school principles; interpretive intensity; practice approaches.",
    editions: "Free (YouTube: various channels including Verbier Festival, Menuhin Competition)."
  },
  {
    id: "eddy-brett", tier: "core", category: "Online Resources", subcategory: "Entertainment & Outreach", composer: "Eddy Chen & Brett Yang (TwoSet Violin)", nationality: "Australian", period: "21st Century",
    title: "TwoSet Violin (YouTube)",
    difficulty: [1, 10],
    description: "While primarily an entertainment and comedy channel, TwoSet Violin's enormous global reach has made classical violin accessible to millions. Their content includes instrument reviews, practice challenges, reactions to other musicians, and occasional pedagogical content. Their Ling Ling workout challenges and practice advocacy have genuinely motivated many young players. Their approach, combining humor with genuine musicianship, represents a significant cultural phenomenon in classical music outreach.",
    skills: "Classical music outreach and motivation; community building; practice motivation; general musical culture.",
    editions: "Free (YouTube: TwoSetViolin)."
  },
  {
    id: "professor-v", tier: "core", category: "Online Resources", composer: "Various", nationality: "International", period: "21st Century",
    title: "YouTube Educational Channels (ProfessorV, Violin Tutor Pro, Violin Lab, etc.)",
    difficulty: [1, 7],
    description: "A growing ecosystem of violin-focused YouTube channels provides free educational content covering beginner through advanced topics. ProfessorV (Zlata Brouwer) offers detailed technical tutorials. Violin Tutor Pro provides structured online courses. Violin Lab Channel focuses on adult beginners. These channels, while varying in quality, collectively represent an unprecedented democratization of violin pedagogy.",
    skills: "Varied technical topics; accessible instruction; visual demonstration; practice guidance.",
    editions: "Free (YouTube)."
  },
  {
    id: "imslp", tier: "core", category: "Online Resources", composer: "Community", nationality: "International", period: "21st Century",
    title: "IMSLP / Petrucci Music Library",
    difficulty: [1, 10],
    description: "The International Music Score Library Project is the largest free repository of public-domain sheet music. For violinists, it provides access to historical editions of virtually all études, technical studies, concerti, sonatas, and chamber works whose copyrights have expired. This includes original editions by Flesch, Joachim, Auer, and other historical pedagogues. While these editions lack the scholarly apparatus of modern Urtext publications, they are invaluable for reference, comparison, and access to out-of-print materials. Many facsimiles of composers' manuscripts are also available.",
    skills: "Access to historical editions; score comparison; public-domain repertoire; facsimile access.",
    editions: "Free (imslp.org)."
  },

  // ═══════════════════════════════════════════════════════════════
  // SECTION 6: SOLO REPERTOIRE (SONATAS & SOLO WORKS) — SELECTED
  // ═══════════════════════════════════════════════════════════════
  {
    id: "bach-sp", tier: "core", category: "Solo Repertoire", subcategory: "Solo Violin", composer: "Johann Sebastian Bach", nationality: "German", period: "Baroque",
    title: "Sonatas and Partitas for Solo Violin, BWV 1001–1006 (c. 1720)",
    difficulty: [7, 10],
    description: "The cornerstone of the solo violin repertoire. Three Sonatas (G minor, A minor, C major) with fugal movements of extraordinary contrapuntal complexity; three Partitas (B minor, D minor, E major) are dance suites. The Chaconne from Partita No. 2 is universally regarded as one of the greatest single movements in Western music. Demands sustained polyphonic writing, chordal passages, full fingerboard command, absolute intonation security, and endurance.",
    skills: "Polyphonic playing; chords and double stops; full fingerboard; Baroque articulation; structural awareness; spiritual depth.",
    editions: "International Music Company, ed. Ivan Galamian — the standard American pedagogical edition with Galamian's systematic fingerings, includes a facsimile of Bach's 1720 autograph manuscript; Schott, ed. Henryk Szeryng — fingerings and bowings from one of the greatest Bach interpreters of the 20th century; Bärenreiter (Urtext), ed. Peter Wollny — the standard scholarly edition based on the autograph; Henle Verlag (Urtext), ed. Klaus Rönnau, fingerings by Wolfgang Schneiderhan — excellent Urtext with tasteful fingerings; Henle Verlag, fingerings by Hilary Hahn — recent edition with Hahn's personal fingerings; Peters, ed. Joseph Joachim & Andreas Moser — historic edition reflecting the great Joachim tradition; Wiener Urtext, ed. Bettina Schwemer, fingerings by Gidon Kremer — scholarly text with unconventional fingerings; Facsimile of the autograph (Bärenreiter) — reproduction of Bach's beautifully calligraphed manuscript; Breitkopf & Härtel, ed. Eduard Herrmann — older German scholarly edition; Schott, ed. Max Rostal — Flesch-school fingerings.",
    imslp: "https://imslp.org/wiki/6_Sonatas_and_Partitas_for_Violin_Solo,_BWV_1001-1006_(Bach,_Johann_Sebastian)",
    examLevel: "ABRSM 8 (selected movements); RCM ARCT; ASTACAP 8–10"
  },
  {
    id: "telemann-fantasias", tier: "core", category: "Solo Repertoire", subcategory: "Solo Violin", composer: "Georg Philipp Telemann", nationality: "German", period: "Baroque",
    title: "12 Fantasias for Solo Violin, TWV 40:14–25",
    difficulty: [5, 7],
    description: "Charming, idiomatic works more approachable than Bach. Mix of dance movements, fugal passages, and free improvisatory sections. Excellent preparation for Bach's solo works.",
    skills: "Baroque dance character; lightness and wit; contrapuntal awareness; ornamental style.",
    editions: "Bärenreiter (Urtext); Henle Verlag (Urtext); International Music Company.",
    imslp: "https://imslp.org/wiki/12_Fantasias_for_Violin_without_Bass,_TWV_40:14-25_(Telemann,_Georg_Philipp)",
    examLevel: "RCM 7–8; ABRSM 6–7"
  },
  {
    id: "ysaye-solo", tier: "core", category: "Solo Repertoire", subcategory: "Solo Violin", composer: "Eugène Ysaÿe", nationality: "Belgian", period: "Modern",
    title: "Six Sonatas for Solo Violin, Op. 27 (1923–24)",
    difficulty: [9, 10],
    description: "The most important solo violin works of the early 20th century. Each dedicated to a contemporary violinist: No. 1 to Szigeti, No. 2 to Thibaud ('Obsession'), No. 3 to Enescu ('Ballade'), No. 4 to Kreisler, No. 5 to Crickboom, No. 6 to Quiróga. Demand complete mastery with emphasis on polyphonic playing, sustained intensity, and tonal imagination.",
    skills: "Polyphonic mastery; Bach tradition; Romantic bravura; sustained musical intensity; tonal imagination.",
    editions: "Henle Verlag (Urtext), ed. Norbert Gertsch — the best available scholarly edition with critical commentary; G. Schirmer — traditional American edition, widely available; Schott (original publisher) — historical edition; International Music Company — practical performing edition; Durand — French alternative.",
    imslp: "https://imslp.org/wiki/6_Sonatas_for_Solo_Violin,_Op.27_(Ysa%C3%BFe,_Eug%C3%A8ne)"
  },
  {
    id: "bartok-solo", tier: "core", category: "Solo Repertoire", subcategory: "Solo Violin", composer: "Béla Bartók", nationality: "Hungarian", period: "Modern",
    title: "Sonata for Solo Violin, Sz. 117 (1944)",
    difficulty: [9, 10],
    description: "Written for Menuhin, the most significant solo violin work since Ysaÿe. Demands command of all Bachian polyphonic techniques plus modernist pitch vocabulary, quarter-tones, and rhythmic complexity.",
    skills: "Polyphonic command; quarter-tones; folk-music inflections; rhythmic complexity; modernist pitch language.",
    editions: "Boosey & Hawkes (original), ed. Menuhin; Henle Verlag (Urtext) with facsimile of autograph.",
    examLevel: "ARCT (implied)"
  },

  // SONATAS
  {
    id: "corelli-op5", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Arcangelo Corelli", nationality: "Italian", period: "Baroque",
    title: "12 Sonatas for Violin and Continuo, Op. 5",
    difficulty: [4, 6],
    description: "Foundational Baroque sonatas. Nos. 1–6 are sonata da chiesa; Nos. 7–11 are sonata da camera; No. 12 is the famous 'La Folia' variations. Technical demands include sustained cantabile, moderate passage work, ornamental fluency, and continuo ensemble sensitivity.",
    skills: "Noble expression; improvised ornamentation; Baroque rhetorical style; continuo dialogue.",
    editions: "Bärenreiter (Urtext); Peters, ed. Joachim & Chrysander; Henle Verlag (Urtext).",
    imslp: "https://imslp.org/wiki/12_Violin_Sonatas,_Op.5_(Corelli,_Arcangelo)",
    examLevel: "RCM 5–7; ABRSM 5–7; ASTACAP 5–6"
  },
  {
    id: "mozart-sonatas", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Wolfgang Amadeus Mozart", nationality: "Austrian", period: "Classical",
    title: "Sonatas for Violin and Piano, K. 301–547",
    difficulty: [5, 8],
    description: "Mozart's violin sonatas evolved dramatically across his career. The great mature sonatas—K. 376, 377, 378, 379, 380, 454, 481, 526—are masterpieces of Classical chamber music. K. 454 and K. 526 are the most demanding.",
    skills: "Classical phrasing; equal-partnership ensemble playing; operatic vocal quality; subtlety of dynamics; humor and pathos.",
    editions: "Bärenreiter (Urtext, Neue Mozart-Ausgabe); Henle Verlag (Urtext); Peters (Urtext); International Music Company, ed. Francescatti.",
    imslp: "https://imslp.org/wiki/Category:Mozart,_Wolfgang_Amadeus",
    examLevel: "RCM 7–10 (varies by sonata); ABRSM 6–8"
  },
  {
    id: "beethoven-sonatas", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Ludwig van Beethoven", nationality: "German", period: "Classical/Romantic",
    title: "10 Sonatas for Violin and Piano, Op. 12, 23, 24, 30, 47, 96",
    difficulty: [6, 9],
    description: "Span Beethoven's creative evolution. The 'Spring' Sonata (Op. 24) and 'Kreutzer' Sonata (Op. 47) are best known. The Kreutzer is monumental, demanding virtuoso technique. Op. 96 is a transcendent late work of utmost subtlety.",
    skills: "Dramatic range; true piano partnership; Beethoven's structural logic; rhythmic drive; sforzando control.",
    editions: "Henle Verlag (Urtext), ed. Clive Brown — outstanding scholarly edition with comprehensive commentary, the current gold standard; Bärenreiter (Urtext), ed. Jonathan Del Mar — excellent Urtext based on meticulous source study; Peters (Urtext), ed. Max Rostal — Flesch-school fingerings and interpretive suggestions of great pedagogical value; International Music Company, ed. David Oistrakh — bowings and fingerings from the great Soviet violinist; Wiener Urtext — reliable scholarly option; Breitkopf & Härtel (Urtext) — from the Beethoven complete works.",
    imslp: "https://imslp.org/wiki/Category:Beethoven,_Ludwig_van",
    examLevel: "RCM 9–ARCT; ABRSM 7–8; ASTACAP 8–9"
  },
  {
    id: "brahms-sonatas", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Johannes Brahms", nationality: "German", period: "Romantic",
    title: "3 Sonatas for Violin and Piano, Opp. 78, 100, 108",
    difficulty: [7, 9],
    description: "Pillars of the Romantic duo-sonata literature. Op. 78 ('Rain Sonata') is autumnal; Op. 100 ('Thun') is sunny; Op. 108 in D minor is dramatic and technically demanding. All require rich tone, sophisticated double-stop voicing, and mature ensemble skills.",
    skills: "Warmth and depth of tone; Brahmsian rhythmic complexity; long-range phrasing; motivic development; intimate dialogue.",
    editions: "Henle Verlag (Urtext), ed. Clive Brown — definitive Urtext with comprehensive commentary; Bärenreiter (Urtext) — excellent scholarly alternative; Peters (Urtext) — reliable standard; Wiener Urtext, ed. Schneiderhan — fingerings by the distinguished Austrian violinist; International Music Company, ed. Szymon Goldberg — Goldberg's insightful edition; Simrock (original publisher) — historical first editions.",
    imslp: "https://imslp.org/wiki/Violin_Sonata_No.1,_Op.78_(Brahms,_Johannes)",
    examLevel: "RCM ARCT; ABRSM 8 (Op. 108 Presto agitato is Grade 8 List B); ASTACAP 10"
  },
  {
    id: "franck-sonata", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "César Franck", nationality: "Belgian-French", period: "Romantic",
    title: "Sonata in A major for Violin and Piano (1886)",
    difficulty: [8, 8],
    description: "One of the most beloved duo works. Cyclic form unifying all four movements. The finale is a luminous canon of extraordinary beauty. Demands sustained lyrical playing, broad dynamic range, and cyclic awareness.",
    skills: "Cyclic awareness; sustained mood; partnership with piano; French Romantic lyricism; spiritual intensity.",
    editions: "Henle Verlag (Urtext); Bärenreiter; Durand (original publisher); Peters.",
    imslp: "https://imslp.org/wiki/Violin_Sonata_(Franck,_C%C3%A9sar)",
    examLevel: "RCM ARCT; ASTACAP 10"
  },
  {
    id: "prokofiev-sonatas", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Sergei Prokofiev", nationality: "Russian", period: "Modern",
    title: "2 Sonatas for Violin and Piano, Opp. 80 & 94a",
    difficulty: [8, 9],
    description: "Sonata No. 1 in F minor is a dark, powerful wartime masterpiece—one of the greatest 20th-century violin sonatas. No. 2 in D major (from the Flute Sonata, arr. with Oistrakh) is lighter and more classical.",
    skills: "Op. 80: vast emotional range; sustained intensity; Russian dramatic tradition. Op. 94a: neoclassical wit; charm; transparency.",
    editions: "International Music Company, ed. David Oistrakh (Op. 80); Boosey & Hawkes / Sikorski; Henle Verlag (Urtext)."
  },
  {
    id: "debussy-sonata", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Claude Debussy", nationality: "French", period: "Modern",
    title: "Sonata for Violin and Piano in G minor, L. 140 (1917)",
    difficulty: [8, 8],
    description: "Debussy's last major completed work. Concise three-movement sonata of elusive beauty and mercurial character, combining Impressionist color with neoclassical wit.",
    skills: "Tonal color and variety; rhythmic flexibility; Impressionist atmosphere; wit and fantasy.",
    editions: "Henle Verlag (Urtext); Durand (original publisher); Bärenreiter.",
    imslp: "https://imslp.org/wiki/Violin_Sonata_(Debussy,_Claude)",
    examLevel: "ARCT"
  },
  {
    id: "ravel-sonata", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Maurice Ravel", nationality: "French", period: "Modern",
    title: "Sonata No. 2 in G major for Violin and Piano (1927)",
    difficulty: [8, 9],
    description: "Three-movement work of crystalline precision. The 'Blues' second movement is one of the earliest jazz influences in classical chamber music. The finale is a perpetual-motion tour de force.",
    skills: "Precision; tonal clarity; jazz inflections in Blues; perpetual-motion stamina; French clarity.",
    editions: "Durand (original publisher); Henle Verlag (Urtext).",
    examLevel: "ABRSM 8 (Blues-Moderato 2nd mvt from Sonata No. 2 is Grade 8 List C)"
  },
  {
    id: "enescu-sonata3", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "George Enescu", nationality: "Romanian", period: "Modern",
    title: "Sonata No. 3 in A minor, Op. 25 ('In Romanian Folk Character')",
    difficulty: [9, 10],
    description: "One of the most extraordinary works in the literature. Demands microtonal inflections, ornamental flights, and improvisatory freedom of Romanian folk fiddling within a sophisticated compositional framework.",
    skills: "Quarter-tone inflections; improvisatory freedom; Romanian folk idiom; rhapsodic expression; extreme interpretive creativity.",
    editions: "Enoch (original French publisher); Editura Muzicală București; International Music Company."
  },

  // ═══════════════════════════════════════════════════════════════
  // SECTION 7: CONCERTI (SELECTED)
  // ═══════════════════════════════════════════════════════════════,
  {
    id: "beethoven-concerto", tier: "core", category: "Concerti", composer: "Ludwig van Beethoven", nationality: "German", period: "Classical/Romantic",
    title: "Violin Concerto in D major, Op. 61 (1806)",
    difficulty: [8, 9],
    description: "The greatest violin concerto of the Classical era. Demands the utmost musical maturity. The choice of cadenza is a major interpretive decision. Cadenzas by Kreisler (most popular), Joachim, Auer, Schnittke, Schneiderhan, and Kremer.",
    skills: "Absolute perfection of intonation, tone, and phrasing; musical maturity; cadenza selection.",
    editions: "Henle Verlag (Urtext), ed. Jonathan Del Mar; Bärenreiter (Urtext); Peters (Urtext), ed. Max Rostal; International Music Company, ed. Auer.",
    imslp: "https://imslp.org/wiki/Violin_Concerto_in_D_major,_Op.61_(Beethoven,_Ludwig_van)",
    examLevel: "RCM ARCT"
  },
  {
    id: "mendelssohn-concerto", tier: "core", category: "Concerti", composer: "Felix Mendelssohn", nationality: "German", period: "Romantic",
    title: "Violin Concerto in E minor, Op. 64 (1844)",
    difficulty: [8, 8],
    description: "Perhaps the most popular violin concerto ever written. Revolutionary form: immediate soloist entry, integrated cadenza, movements played attacca. Demands brilliant technique, effortless lyricism, and fleet spiccato.",
    skills: "Brilliant technique; singing tone; spiccato; integrated formal awareness.",
    editions: "Bärenreiter (Urtext), ed. R. Larry Todd & Cl. Brown — scholarly edition, also includes the early version; Henle Verlag (Urtext), ed. Ernst Herttrich — standard Urtext; Peters (Urtext) — reliable European edition; International Music Company, ed. Zino Francescatti — Francescatti's lyrical fingerings; International Music Company, ed. Ivan Galamian — Galamian's systematic approach; Breitkopf & Härtel — from the Mendelssohn complete works; Schott — German performing edition.",
    imslp: "https://imslp.org/wiki/Violin_Concerto_in_E_minor,_Op.64_(Mendelssohn,_Felix)",
    examLevel: "RCM 10; ABRSM 8; ASTACAP 10"
  },
  {
    id: "bruch-concerto", tier: "core", category: "Concerti", composer: "Max Bruch", nationality: "German", period: "Romantic",
    title: "Violin Concerto No. 1 in G minor, Op. 26 (1868)",
    difficulty: [7, 8],
    description: "One of the most passionate and melodically generous concerti. The Adagio is among the most beautiful slow movements in the repertoire. Ideal first major Romantic concerto.",
    skills: "Passionate expression; broad cantabile; clean passage work; rhythmic energy.",
    editions: "Henle Verlag (Urtext); International Music Company, ed. Galamian; Peters; Simrock (original).",
    imslp: "https://imslp.org/wiki/Violin_Concerto_No.1_in_G_minor,_Op.26_(Bruch,_Max)",
    examLevel: "RCM 9–10; ABRSM 8; ASTACAP 10"
  },
  {
    id: "brahms-concerto", tier: "core", category: "Concerti", composer: "Johannes Brahms", nationality: "German", period: "Romantic",
    title: "Violin Concerto in D major, Op. 77 (1878)",
    difficulty: [9, 9],
    description: "Symphonic in scope. Demands technical prowess to match a massive orchestra and musical depth for Brahms's complex motivic development. The Adagio features the famous oboe solo over which the violin sings. Cadenza tradition: Joachim (original, most common), Busoni, Auer, Milstein, Kennedy.",
    skills: "Orchestral-scale projection; Brahmsian complexity; rich tone; Hungarian Rondo in finale.",
    editions: "Henle Verlag (Urtext), ed. Clive Brown — definitive Urtext with unparalleled source commentary; Bärenreiter (Urtext) — from the Brahms complete works edition; Peters (Urtext) — reliable alternative; International Music Company, ed. Josef Gingold — includes his own cadenza and Ysaÿe's markings; Simrock (original publisher) — historical first edition; Schott — German performing edition; Breitkopf & Härtel — orchestral materials.",
    imslp: "https://imslp.org/wiki/Violin_Concerto_in_D_major,_Op.77_(Brahms,_Johannes)",
    examLevel: "RCM 9"
  },
  {
    id: "tchaikovsky-concerto", tier: "core", category: "Concerti", composer: "Pyotr Ilyich Tchaikovsky", nationality: "Russian", period: "Romantic",
    title: "Violin Concerto in D major, Op. 35 (1878)",
    difficulty: [9, 9],
    description: "The quintessential Romantic virtuoso concerto. Vast, passionate first movement; tender Canzonetta; whirlwind Russian dance finale. Demands brilliant technique and an abundance of Russian soul.",
    skills: "Brilliant technique; massive tone production; Russian expressiveness; rapid scales and arpeggios; double stops.",
    editions: "Henle Verlag (Urtext), ed. Polina Vajdman — scholarly edition restoring Tchaikovsky's original intentions before Auer's revisions; International Music Company, ed. David Oistrakh — the most authoritative Russian performance tradition; Peters, ed. Leopold Auer — Auer's famous revision, historically significant though now considered inauthentic in places; Bärenreiter (Urtext) — based on composer's autograph; P. Jurgenson (original publisher) / Muzyka — Russian editions; Schott — German performing edition.",
    imslp: "https://imslp.org/wiki/Violin_Concerto_in_D_major,_Op.35_(Tchaikovsky,_Pyotr)",
    examLevel: "ARCT; ABRSM 8 (Canzonetta 2nd mvt is Grade 8 List B)"
  },
  {
    id: "sibelius-concerto", tier: "core", category: "Concerti", composer: "Jean Sibelius", nationality: "Finnish", period: "Late Romantic/Modern",
    title: "Violin Concerto in D minor, Op. 47 (1903–05)",
    difficulty: [9, 10],
    description: "The last great Romantic concerto. Written by a composer who had aspired to be a concert violinist; supremely idiomatic yet fiendishly difficult. Demands exceptional power, stamina, and tonal projection.",
    skills: "Power and projection; stamina; Nordic character; extreme technical demands.",
    editions: "Breitkopf & Härtel (Sibelius Complete Works, includes 1903 original version); International Music Company; Henle Verlag (Urtext).",
    examLevel: "RCM 9 (listed as Level 9)"
  },
  {
    id: "barber-concerto", tier: "core", category: "Concerti", composer: "Samuel Barber", nationality: "American", period: "Neoclassical/Romantic",
    title: "Violin Concerto, Op. 14 (1939)",
    difficulty: [8, 9],
    description: "One of the most beloved 20th-century concerti. Lyrical first movement, achingly beautiful Andante, ferociously virtuosic perpetual-motion finale. Perfect balance of emotional depth and technical brilliance.",
    skills: "Lyrical singing; emotional depth; perpetual-motion stamina in finale; American Romantic idiom.",
    editions: "G. Schirmer (original publisher).",
    examLevel: "RCM 10"
  },
  {
    id: "berg-concerto", tier: "core", category: "Concerti", composer: "Alban Berg", nationality: "Austrian", period: "Second Viennese School",
    title: "Violin Concerto ('To the Memory of an Angel,' 1935)",
    difficulty: [9, 10],
    description: "One of the great emotional experiences in music. Twelve-tone row used with deeply lyrical and tonal effect. Quotes Bach chorale 'Es ist genug.' Demands absolute command of twelve-tone intonation, tonal beauty in atonal contexts, and profound emotional depth.",
    skills: "Twelve-tone intonation; tonal beauty in atonal contexts; emotional depth; orchestral awareness.",
    editions: "Universal Edition (original and only critical edition)."
  },

  // ═══════════════════════════════════════════════════════════════
  // SECTION 8: CHAMBER MUSIC (SELECTED)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "bartok-duos", tier: "core", category: "Chamber Music", composer: "Béla Bartók", nationality: "Hungarian", period: "Modern",
    title: "44 Duos for Two Violins, Sz. 98 (1931)",
    difficulty: [3, 7],
    description: "Folk-inspired miniatures of extraordinary variety. Widely used pedagogically; later duos are concert-worthy.",
    skills: "Folk idiom; rhythmic precision; ensemble intonation; varied character.",
    editions: "Boosey & Hawkes; Universal Edition (original); Henle Verlag (Urtext).",
    imslp: "https://imslp.org/wiki/44_Duos_for_2_Violins,_Sz.98_(Bart%C3%B3k,_B%C3%A9la)"
  },
  {
    id: "beethoven-trios", tier: "core", category: "Chamber Music", composer: "Ludwig van Beethoven", nationality: "German", period: "Classical/Romantic",
    title: "Piano Trios Op. 1; Op. 70 ('Ghost' & No. 2); Op. 97 ('Archduke')",
    difficulty: [7, 9],
    description: "From youthful exuberance (Op. 1) through the supernatural 'Ghost' (Op. 70/1) to the majestic 'Archduke' (Op. 97), the grandest of all piano trios.",
    skills: "Chamber balance; rhythmic precision; dramatic range; sustained ensemble concentration.",
    editions: "Henle Verlag (Urtext); Bärenreiter; Peters."
  },
  {
    id: "beethoven-quartets", tier: "core", category: "Chamber Music", composer: "Ludwig van Beethoven", nationality: "German", period: "Classical/Romantic",
    title: "16 String Quartets + Große Fuge",
    difficulty: [7, 10],
    description: "The most important body of string quartets. Early quartets (Op. 18): Classical masterpieces. Middle (Op. 59 'Razumovsky,' Op. 74 'Harp,' Op. 95 'Serioso'): expand the form dramatically. Late (Opp. 127, 130–135): among the most profound works in Western music.",
    skills: "Complete range of chamber music skills; ensemble leadership and support; interpretive depth; stamina (late quartets).",
    editions: "Henle Verlag (Urtext); Bärenreiter (Urtext), ed. Jonathan Del Mar; Peters."
  },
  {
    id: "schubert-quintet", tier: "core", category: "Chamber Music", composer: "Franz Schubert", nationality: "Austrian", period: "Romantic",
    title: "String Quintet in C major, D. 956",
    difficulty: [8, 8],
    description: "Many consider this the single greatest work of chamber music. The slow movement is of almost unbearable beauty.",
    skills: "Sustained lyrical playing; ensemble blend; emotional depth; Schubertian harmonic sensitivity.",
    editions: "Bärenreiter (Urtext); Henle Verlag; Peters."
  },
  {
    id: "ravel-trio", tier: "core", category: "Chamber Music", composer: "Maurice Ravel", nationality: "French", period: "Modern",
    title: "Piano Trio in A minor (1914)",
    difficulty: [8, 9],
    description: "A kaleidoscopic work of extraordinary refinement: Basque rhythms, Malay pantun form, perpetual motion, and a luminous passacaglia.",
    skills: "Rhythmic precision; tonal refinement; French clarity; ensemble subtlety; varied character.",
    editions: "Durand (original); Henle Verlag."
  },

  // ═══════════════════════════════════════════════════════════════
  // SECTION 9: ORCHESTRAL EXCERPTS
  // ═══════════════════════════════════════════════════════════════,

  // ═══════════════════════════════════════════════════════════════
  // SECTION 10: SHOWPIECES & SHORTER WORKS (SELECTED)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "sarasate-zigeuner", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Pablo de Sarasate", nationality: "Spanish", period: "Romantic",
    title: "Zigeunerweisen, Op. 20",
    difficulty: [9, 9],
    description: "The ultimate showpiece. Every virtuoso technique: harmonics, left-hand pizzicato, spiccato at speed, singing cantabile in the Lento, and dazzling speed in the finale.",
    skills: "Complete virtuoso technique; contrasting characters; showmanship.",
    editions: "International Music Company; G. Schirmer; Peters.",
    imslp: "https://imslp.org/wiki/Zigeunerweisen,_Op.20_(Sarasate,_Pablo_de)",
    examLevel: "ARCT; ASTACAP 10"
  },
  {
    id: "ravel-tzigane", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Maurice Ravel", nationality: "French", period: "Modern",
    title: "Tzigane (1924)",
    difficulty: [9, 10],
    description: "A tour de force: the opening solo cadenza is a sustained rhapsody demanding harmonics, double stops, left-hand pizzicato, and brilliant passage work. The orchestral (or piano) entry launches a virtuosic Hungarian-style dance.",
    skills: "Extended solo cadenza; every virtuoso technique; Hungarian style; stamina; projection.",
    editions: "Durand (original); International Music Company.",
    imslp: "https://imslp.org/wiki/Tzigane_(Ravel,_Maurice)",
    examLevel: "ARCT"
  },
  {
    id: "chausson-poeme", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Ernest Chausson", nationality: "French", period: "Romantic",
    title: "Poème, Op. 25 (1896)",
    difficulty: [8, 8],
    description: "An achingly beautiful single-movement work for violin and orchestra. Demands sustained lyricism, broad dynamic range, and orchestral-scale projection. One of the most emotionally profound showpieces.",
    skills: "Sustained lyricism; tonal projection; emotional depth; broad dynamic range.",
    editions: "International Music Company; Durand; Peters.",
    imslp: "https://imslp.org/wiki/Po%C3%A8me,_Op.25_(Chausson,_Ernest)"
  },

  // ═══════════════════════════════════════════════════════════════
  // TRADITIONAL VIOLIN SCHOOLS (HISTORICAL METHODS)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "baillot-method", tier: "core", category: "Traditional Violin Schools", composer: "Pierre Baillot, Pierre Rode & Rodolphe Kreutzer", nationality: "French", period: "Classical",
    title: "Méthode de violon (Paris Conservatoire Method, 1803)",
    difficulty: [1, 8],
    description: "The official method of the newly founded Paris Conservatoire, written jointly by its three leading violin professors. This is the foundational document of the French violin school, codifying the principles of bow technique, left-hand mechanics, and musical expression that would dominate European pedagogy for decades. The method covers every aspect of technique in systematic detail, from holding the instrument through advanced position work. Baillot later expanded his own contribution into his magisterial 'L'Art du Violon' (1834). Historically indispensable for understanding Classical-era French performance practice.",
    skills: "Historical French school technique; Classical bowing and articulation; comprehensive technical foundation; ornamental practice; musical taste of the period.",
    editions: "Facsimile reprints (various publishers); Minkoff Reprint (scholarly facsimile); available on IMSLP."
  },
  {
    id: "baillot-art", tier: "core", category: "Traditional Violin Schools", composer: "Pierre Baillot", nationality: "French", period: "Classical/Romantic",
    title: "L'Art du Violon (The Art of the Violin, 1834)",
    difficulty: [1, 10],
    description: "Baillot's magnum opus, expanding the 1803 Conservatoire method into one of the most comprehensive violin treatises of the 19th century. L'Art du Violon covers every aspect of technique and musical interpretation, with extensive discussion of expression, taste, bowings, ornaments, and the philosophy of musical performance. It includes numerous musical examples and exercises. Baillot was perhaps the most intellectual of the great French violinists, and his writing is reflective, detailed, and deeply concerned with the art of musical expression. Essential for understanding Romantic-era French violin playing.",
    skills: "Comprehensive Romantic French technique; musical expression; historical bowing; ornaments; philosophical approach to performance.",
    editions: "Facsimile: Minkoff Reprint; English translation by Louise Goldberg (Northwestern University Press, 1991)—the definitive modern scholarly edition with extensive commentary."
  },
  {
    id: "spohr-school", tier: "core", category: "Traditional Violin Schools", composer: "Louis Spohr", nationality: "German", period: "Romantic",
    title: "Violinschule (Violin School, 1832)",
    difficulty: [1, 9],
    description: "Spohr's comprehensive method represents the early-Romantic German school. It covers every aspect of technique in exhaustive detail, including original exercises and études composed by Spohr himself. Historically significant as a bridge between the Classical approach of Leopold Mozart and the mature Romanticism of Joachim. Spohr's detailed instructions on portamento, vibrato, and expressive devices are particularly valuable for understanding early 19th-century performing style. His advocacy for the chin rest (which he helped popularize) and his specific approach to bowing shaped German violin playing for generations.",
    skills: "Early-Romantic German technique; portamento and vibrato style; comprehensive method; historical performance practice; chin rest technique.",
    editions: "Robert Lienau (German reprint); English translation available; facsimile of 1832 edition available through various scholarly sources and IMSLP."
  },
  {
    id: "beriot-method", tier: "core", category: "Traditional Violin Schools", composer: "Charles de Bériot", nationality: "Belgian", period: "Romantic",
    title: "Méthode de violon (Violin Method, 3 Parts, 1858)",
    difficulty: [1, 8],
    description: "Bériot's three-part method is the foundational document of the Franco-Belgian school. Part 1 covers elementary technique with the graceful, melodic études of Op. 60. Part 2 introduces intermediate techniques including position work, vibrato, and double stops. Part 3 addresses advanced technique and musical interpretation. Bériot's method is distinguished by its emphasis on elegance, cantabile, and the vocal model of violin playing. He was the teacher of Vieuxtemps, who in turn taught Ysaÿe, making this method the root of one of the most important pedagogical lineages in violin history.",
    skills: "Franco-Belgian school foundations; cantabile playing; elegant phrasing; vocal approach to the instrument; ornamental style; progressive technical development.",
    editions: "Schott (original publisher); G. Schirmer (partial reprints); available on IMSLP."
  },
  {
    id: "alard-school", tier: "core", category: "Traditional Violin Schools", composer: "Jean-Delphin Alard", nationality: "French", period: "Romantic",
    title: "École du violon (Violin School), Op. 40",
    difficulty: [1, 9],
    description: "Alard's comprehensive method was the standard at the Paris Conservatoire during the mid-19th century. Alard succeeded Baillot as professor and taught Sarasate, among others. His method progresses systematically from beginner through virtuoso technique, incorporating original études and exercises at each level. The later sections include demanding material for double stops, advanced bowing, and high-position work. Less well known outside France than it deserves, it provides essential context for the French school's development between Baillot and the modern era.",
    skills: "French school technique; systematic progression; double stops; advanced bowing; high-position work; 19th-century French style.",
    editions: "Schott (original); available on IMSLP."
  },
  {
    id: "david-school", tier: "core", category: "Traditional Violin Schools", composer: "Ferdinand David", nationality: "German", period: "Romantic",
    title: "Violinschule (Violin School, 2 vols.); Die hohe Schule des Violinspiels (The High School of Violin Playing)",
    difficulty: [1, 9],
    description: "David was concertmaster of the Leipzig Gewandhaus and the dedicatee and first performer of the Mendelssohn Concerto. His Violinschule is a comprehensive method reflecting the Leipzig German school. 'Die hohe Schule des Violinspiels' (The High School) is a celebrated anthology of advanced works from the 17th–19th centuries, edited with David's own bowings and fingerings. The anthology remains a valuable source for lesser-known Baroque and Classical solo works and provides insight into mid-19th-century German performing practice.",
    skills: "German school technique; Leipzig tradition; advanced repertoire anthology; historical bowings and fingerings; Mendelssohn-era performance practice.",
    editions: "Breitkopf & Härtel (original); Peters (Die hohe Schule); IMSLP (historical editions)."
  },
  {
    id: "laoureux-method", tier: "core", category: "Traditional Violin Schools", composer: "Nicolas Laoureux", nationality: "Belgian-French", period: "19th/20th Century",
    title: "Méthode pratique et progressive du violon (Practical and Progressive Violin Method, 4 Parts)",
    difficulty: [1, 6],
    description: "Laoureux's four-part method was once among the most widely used in Continental European pedagogy, particularly in France, Belgium, Italy, and Latin America. The method is meticulously organized, progressing from absolute beginner through intermediate technique with clear, step-by-step instructions. Part 1 covers first position; Part 2 introduces positions 2–5; Part 3 covers positions 6–7 and double stops; Part 4 addresses advanced bowings and interpretation. The études and exercises are well-crafted and musically satisfying. Though less commonly encountered in English-speaking countries, it remains in active use in many European and South American conservatories.",
    skills: "Systematic progressive technique; French/Belgian school foundations; clear position-by-position development; bowing fundamentals; musical development.",
    editions: "Henry Lemoine (original French publisher, all 4 parts still in print); available on IMSLP."
  },
  {
    id: "campagnoli-method", tier: "core", category: "Traditional Violin Schools", composer: "Bartolomeo Campagnoli", nationality: "Italian", period: "Classical",
    title: "Metodo per violino (Violin Method, Op. 21, 1797); 7 Divertimenti, Op. 18",
    difficulty: [1, 8],
    description: "Campagnoli's method is an important late-18th-century Italian school. The Op. 21 method covers all aspects of technique with particular attention to the Italian singing style and left-hand facility. His 7 Divertimenti for solo violin, Op. 18, are excellent intermediate-to-advanced études that anticipate the technical demands of the Romantic era. Campagnoli was one of the last great representatives of the Italian school before the center of gravity shifted permanently to France and Germany.",
    skills: "Italian school technique; Classical-era singing style; left-hand facility; solo violin writing; late 18th-century practice.",
    editions: "Peters (Op. 18); various historical reprints of Op. 21; IMSLP."
  },
  {
    id: "dancla-school", tier: "core", category: "Traditional Violin Schools", composer: "Charles Dancla", nationality: "French", period: "Romantic",
    title: "Méthode élémentaire et progressive (Elementary and Progressive Method); 6 Airs variés, Op. 89",
    difficulty: [2, 7],
    description: "Dancla's method reflects the elegance and melodic charm of the mid-19th-century Paris Conservatoire school. His teaching method progresses through the fundamentals with attractive musical material. The 6 Airs variés on operatic themes (Op. 89) are particularly valuable as student performance pieces: each takes a well-known opera aria and presents it with increasingly virtuosic variations, developing technique within a musically compelling framework. They bridge the gap between études and concert repertoire for intermediate students.",
    skills: "French school elegance; melodic playing; operatic variation form; intermediate performance repertoire; gradual technical development.",
    editions: "G. Schirmer (Airs variés); International Music Company; Lemoine (original method); IMSLP."
  },
  {
    id: "dont-method", tier: "core", category: "Traditional Violin Schools", composer: "Jakob Dont", nationality: "Austrian", period: "Romantic",
    title: "Method (Wiener Violinschule); Preparatory Exercises, Op. 37; Etudes & Caprices, Op. 35",
    difficulty: [2, 9],
    description: "Dont's contributions span from preparatory exercises to virtuoso caprices, making him one of the most important pedagogical figures of the Viennese school. His Op. 37 (covered in Etudes section) serves as the ideal preparation for Kreutzer; his Op. 35 (also in Etudes) bridges to Paganini. Together they form a coherent pedagogical arc rooted in the Viennese tradition. Dont studied with both Böhm and Czerny and was a professor at the Vienna Conservatory.",
    skills: "Viennese school technique; systematic progression from intermediate through virtuoso; bowing; double stops; musical sophistication.",
    editions: "Peters; International Music Company, ed. Galamian; G. Schirmer; Henle Verlag."
  },
  {
    id: "wohlfahrt-school", tier: "core", category: "Traditional Violin Schools", composer: "Franz Wohlfahrt", nationality: "German", period: "19th Century",
    title: "Complete Violin Method (Opp. 38, 45, 74); Wohlfart as a Pedagogical System",
    difficulty: [1, 5],
    description: "Wohlfahrt's multiple opus numbers form a coherent pedagogical arc that has been central to German-tradition violin teaching for over a century. Op. 38 (Easiest Elementary Method) provides the very first steps; Op. 45 (60 Studies) is the workhorse of early-intermediate pedagogy; Op. 74 (further studies) extends into middle-intermediate territory. Used together, these volumes provide a complete technical foundation from beginner through the threshold of Kayser and Mazas. Wohlfahrt's studies are melodically appealing and pedagogically logical, though some modern teachers find them stylistically narrow.",
    skills: "Complete early technical foundation; German school fundamentals; first position through third; basic bowings; progressive difficulty; reading skills.",
    editions: "G. Schirmer; Peters; International Music Company; Carl Fischer."
  },
  {
    id: "kreutzer-rode-system", tier: "core", category: "Traditional Violin Schools", composer: "Kreutzer, Rode & Baillot (Paris Conservatoire tradition)", nationality: "French", period: "Classical",
    title: "The Paris Conservatoire Étude Tradition: Kreutzer 42 Studies → Rode 24 Caprices → Gaviniès 24 Matinées",
    difficulty: [5, 9],
    description: "The sequence of Kreutzer → Rode → Gaviniès forms the backbone of the French school's étude progression and remains the standard pedagogical arc worldwide. This is not a single publication but rather a pedagogical tradition: Kreutzer's 42 Studies establish all fundamental advanced techniques; Rode's 24 Caprices develop musical sophistication and facility in all keys; Gaviniès's 24 Matinées prepare for the virtuoso demands of Paganini and concert repertoire. This progression was codified at the Paris Conservatoire and has been adopted by virtually every school of violin playing since.",
    skills: "Complete intermediate-to-advanced technique; the standard pedagogical progression; French school traditions; preparation for virtuoso repertoire.",
    editions: "See individual entries for Kreutzer, Rode, and Gaviniès in the Etudes & Caprices section."
  },

  // ═══════════════════════════════════════════════════════════════
  // NEW TREATISES
  // ═══════════════════════════════════════════════════════════════
  {
    id: "capet-treatise", tier: "core", category: "Treatises", subcategory: "Modern Pedagogy", composer: "Lucien Capet", nationality: "French", period: "Early 20th Century",
    title: "La Technique supérieure de l'archet (Superior Bowing Technique, 1916)",
    difficulty: [6, 10],
    description: "Capet's treatise on bowing is one of the most important and original contributions to violin pedagogy. A legendary quartet leader and teacher at the Paris Conservatoire, Capet developed a systematic analysis of bowing mechanics that remains unequaled in its depth and specificity. The treatise covers contact point, bow speed, pressure, distribution, and the production of every gradation of tone color through the manipulation of these variables. Capet's concept of the 'guided bow'—where the arm weight is channeled through the stick with precise control—has influenced generations of French and international players. The exercises are demanding and require an already advanced technique. Capet's students included Ivan Galamian, making this treatise a direct ancestor of the dominant American school.",
    skills: "Advanced bowing mechanics; tone production through bow variables; contact point theory; bow speed/weight relationships; French school bowing at its most refined.",
    editions: "Éditions Salabert (French original); English translation by Margaret Schmidt (Encore Music Publishers)—includes Capet's original diagrams and exercises."
  },
  {
    id: "szigeti-treatise", tier: "core", category: "Treatises", subcategory: "Modern Pedagogy", composer: "Joseph Szigeti", nationality: "Hungarian-American", period: "20th Century",
    title: "Szigeti on the Violin (1969); A Violinist's Notebook (1964)",
    difficulty: [1, 10],
    description: "'Szigeti on the Violin' is a deeply personal and intellectually stimulating book by one of the 20th century's most thoughtful violinists. Unlike the systematic treatises of Flesch or Galamian, Szigeti's writing is discursive and philosophical, ranging across topics including interpretation, fingering philosophy, neglected repertoire, and the ethics of performance. His advocacy for contemporary music and lesser-known masterworks expanded the repertoire of many violinists. 'A Violinist's Notebook' provides detailed fingering and interpretive suggestions for specific works. Both books reflect a uniquely cultivated musical mind.",
    skills: "Interpretive philosophy; fingering logic; repertoire knowledge; intellectual approach to musicianship; advocacy for contemporary music.",
    editions: "Dover (Szigeti on the Violin, reprint, widely available); Gerald Duckworth (original); A Violinist's Notebook (various)."
  },
  {
    id: "gerle-treatise", tier: "core", category: "Treatises", subcategory: "Modern Pedagogy", composer: "Robert Gerle", nationality: "Hungarian-American", period: "20th Century",
    title: "The Art of Bowing Practice (1991); The Art of Practising the Violin (1983)",
    difficulty: [3, 10],
    description: "Gerle's two books are among the most practical modern guides for violinists. 'The Art of Bowing Practice' provides a systematic approach to developing all bow strokes through carefully sequenced exercises, with clear explanations of the mechanics involved. 'The Art of Practising the Violin' addresses the broader question of how to practice effectively, covering mental preparation, physical technique, and musical development. Gerle was a student of Hubay and Weiner in Budapest and taught at the University of Maryland. His writing is clear, unpretentious, and immediately useful.",
    skills: "Practical bowing development; practice methodology; systematic stroke development; efficient practice habits.",
    editions: "Stainer & Bell (both books)."
  },
  {
    id: "courvoisier-treatise", tier: "core", category: "Treatises", subcategory: "Historical & Scholarly", composer: "Carl Courvoisier", nationality: "Swiss-German", period: "Late 19th Century",
    title: "The Technics of Violin Playing (1895)",
    difficulty: [1, 10],
    description: "Courvoisier studied with Joachim and his treatise provides detailed insight into the technical and interpretive practices of the Joachim school. His writing covers bowing, left-hand technique, vibrato, and musical expression with particular emphasis on the physiological basis of violin playing. While less well known than the major treatises, it is a valuable primary source for understanding the German school at its late-Romantic peak and complements the Joachim/Moser Violinschule.",
    skills: "Joachim school technique; physiological approach to playing; late-Romantic German performance practice; historical perspective.",
    editions: "Various reprints; available on IMSLP and through archive.org."
  },
  {
    id: "yampolsky-treatise", tier: "core", category: "Treatises", subcategory: "Modern Pedagogy", composer: "Izrail Yampolsky", nationality: "Russian", period: "20th Century",
    title: "The Principles of Violin Fingering (1967)",
    difficulty: [5, 10],
    description: "Yampolsky's treatise is the most thorough and analytical study of violin fingering ever published. A professor at the Moscow Conservatory and one of the great minds of Soviet pedagogy, Yampolsky examines fingering as a musical and expressive tool, not merely a mechanical convenience. He analyzes the fingering choices of great violinists and demonstrates how fingering affects timbre, phrasing, and musical expression. Required reading for anyone who takes fingering seriously as an interpretive act.",
    skills: "Fingering as expressive tool; analytical approach to fingering choices; understanding of timbre and position relationships; Soviet school fingering principles.",
    editions: "Oxford University Press (English translation by Alan Lumsden); available secondhand."
  },
  {
    id: "brown-practice", tier: "core", category: "Treatises", subcategory: "Historical & Scholarly", composer: "Clive Brown", nationality: "British", period: "21st Century",
    title: "Classical and Romantic Performing Practice 1750–1900 (1999)",
    difficulty: [1, 10],
    description: "Brown's magisterial study is the most comprehensive modern examination of historical string performance practice. Drawing on treatises, annotated scores, and early recordings, he reconstructs the bowing, vibrato, portamento, articulation, and ornamental practices of the Classical and Romantic periods. Essential for any performer seeking to understand how music from Mozart through Brahms was originally played, and how modern practices diverge from historical ones. The sections on vibrato usage and portamento are particularly eye-opening.",
    skills: "Historical performance practice; understanding of vibrato and portamento traditions; informed interpretation of Classical and Romantic music; scholarly perspective.",
    editions: "Oxford University Press (Clarendon Press)."
  },
  {
    id: "neumann-ornaments", tier: "core", category: "Treatises", subcategory: "Historical & Scholarly", composer: "Frederick Neumann", nationality: "German-American", period: "20th Century",
    title: "Ornamentation in Baroque and Post-Baroque Music (1978); Ornamentation and Improvisation in Mozart (1986)",
    difficulty: [1, 10],
    description: "Neumann's two books are the most exhaustive scholarly treatments of musical ornamentation. 'Ornamentation in Baroque and Post-Baroque Music' examines trills, mordents, turns, appoggiaturas, and other ornaments across national styles, drawing on treatises from C.P.E. Bach to Leopold Mozart and beyond. 'Ornamentation and Improvisation in Mozart' applies this scholarship specifically to Mozart's music. While controversial among some scholars (his arguments about trill execution challenged conventional wisdom), Neumann's research is indispensable for any performer grappling with ornamental decisions.",
    skills: "Ornamental practice across periods; trill execution; appoggiatura rules; national style differences; scholarly basis for interpretive decisions.",
    editions: "Princeton University Press (both books)."
  },

  // ═══════════════════════════════════════════════════════════════
  // REPERTOIRE COLLECTIONS & ANTHOLOGIES
  // ═══════════════════════════════════════════════════════════════
  {
    id: "barber-solos", tier: "core", category: "Repertoire Collections", composer: "Barbara Barber (compiler)", nationality: "American", period: "21st Century",
    title: "Solos for Young Violinists (Vols. 1–6)",
    difficulty: [1, 7],
    description: "One of the most popular and well-curated graded repertoire collections in current use. Barbara Barber, a distinguished American pedagogue, compiled six volumes of performance pieces organized by progressive difficulty, from late beginner through early advanced. Each volume contains a mix of standard repertoire pieces, concerto movements, character pieces, and show pieces with piano accompaniment. The selection is musically appealing and pedagogically sound, exposing students to a range of styles and periods. Comes with companion CDs. Widely used for recitals, competitions, and festivals.",
    skills: "Progressive performance repertoire; recital preparation; style variety; accompaniment skills; stage experience at every level.",
    editions: "Summy-Birchard / Alfred Music (all 6 volumes with piano accompaniment and CDs)."
  },
  {
    id: "flesch-etudenstudien", tier: "core", category: "Repertoire Collections", composer: "Carl Flesch (compiler)", nationality: "Hungarian", period: "20th Century",
    title: "Etüdenstudien (Études Studies / Studies on Études)",
    difficulty: [5, 9],
    description: "Flesch's Etüdenstudien is a unique and invaluable pedagogical resource: a systematic commentary on all the major violin études from Kreutzer through Paganini. For each étude, Flesch provides analytical notes, practice strategies, alternative fingerings and bowings, and guidance on how to extract maximum technical benefit from the material. It transforms the standard étude collections from mere exercises into sophisticated tools for technical and musical development. This work encapsulates Flesch's extraordinary analytical approach to technique and is an essential companion volume to the études themselves.",
    skills: "Étude practice methodology; analytical approach to technical study; alternative fingerings and bowings; understanding of étude literature; Flesch school practice philosophy.",
    editions: "Ries & Erler (German original); Peters (selections); some portions available on IMSLP."
  },
  {
    id: "whistler-kreutzer", tier: "core", category: "Repertoire Collections", composer: "Harvey Whistler (compiler)", nationality: "American", period: "20th Century",
    title: "Preparing for Kreutzer (2 vols.)",
    difficulty: [4, 6],
    description: "Whistler's two-volume 'Preparing for Kreutzer' is a carefully designed bridge between intermediate études (Wohlfahrt, Kayser) and the Kreutzer 42 Studies. Volume 1 presents selected études from lesser-known but pedagogically excellent collections by Sitt, Hofmann, Mazas, Dancla, and others, ordered to systematically build the specific skills needed for Kreutzer. Volume 2 continues with more demanding material. The genius of the collection is its sequencing: each étude addresses a specific technique that appears in the Kreutzer studies, so that by the time a student begins Kreutzer, they have already encountered every fundamental challenge in an easier context.",
    skills: "Systematic preparation for Kreutzer; bridging intermediate and advanced technique; curated étude progression; targeted skill building.",
    editions: "Rubank / Hal Leonard (both volumes)."
  },
  {
    id: "david-hohe-schule", tier: "core", category: "Repertoire Collections", composer: "Ferdinand David (compiler)", nationality: "German", period: "Romantic",
    title: "Die hohe Schule des Violinspiels (The High School of Violin Playing, 2 vols.)",
    difficulty: [6, 9],
    description: "David's celebrated anthology collects advanced works from the 17th through 19th centuries, edited with his own bowings and fingerings. The two volumes include sonatas, concerto movements, and character pieces by Corelli, Tartini, Nardini, Locatelli, Bach, Handel, Porpora, and many others. It remains one of the best sources for lesser-known Baroque and Classical solo works, and David's editorial markings provide invaluable insight into mid-19th-century German performing practice. Many of these works are otherwise difficult to find in practical performing editions.",
    skills: "Advanced historical repertoire; Baroque and Classical solo works; German Romantic-era editorial practice; broad repertoire knowledge.",
    editions: "Peters (original publisher); Breitkopf & Härtel; IMSLP (historical editions)."
  },
  {
    id: "herrmann-concert", tier: "core", category: "Repertoire Collections", composer: "Various (ed. Eduard Herrmann)", nationality: "German", period: "Romantic",
    title: "Concert and Contest Collection; Concert Pieces for Violin",
    difficulty: [4, 7],
    description: "Herrmann's anthologies of concert and contest pieces were once staples of American violin pedagogy. They collect shorter concert works, transcriptions, and movements from sonatas and concerti suitable for intermediate-to-advanced students, all with piano accompaniment. While partially superseded by Barber's 'Solos for Young Violinists,' they remain useful for their different repertoire selection and historical interest.",
    skills: "Intermediate-to-advanced performance repertoire; concert preparation; varied styles.",
    editions: "G. Schirmer; Carl Fischer."
  },
  {
    id: "moffat-collections", tier: "core", category: "Repertoire Collections", composer: "Various (ed. Alfred Moffat)", nationality: "British", period: "Early 20th Century",
    title: "Old Masters for Young Players; Meisterstücke (Masterpieces) for Violin",
    difficulty: [3, 7],
    description: "Moffat's collections bring together Baroque and Classical works (Corelli, Handel, Vivaldi, Tartini, Nardini, and others) in practical performing editions with piano realizations of the continuo parts. 'Old Masters for Young Players' makes this repertoire accessible to intermediate students. While the continuo realizations reflect early 20th-century taste rather than modern historical practice, the collections remain popular for introducing students to pre-Classical repertoire.",
    skills: "Baroque and Classical repertoire access; early music exposure; intermediate performance pieces.",
    editions: "Simrock / Boosey & Hawkes; various reprints."
  },
  {
    id: "suzuki-repertoire", tier: "core", category: "Repertoire Collections", composer: "Various (Suzuki repertoire supplements)", nationality: "International", period: "21st Century",
    title: "Suzuki-Aligned Repertoire: Position Pieces (Barber); Scales for Young Violinists (Barber); First Repertoire for Violin (de Keyser)",
    difficulty: [1, 5],
    description: "A constellation of supplementary materials designed to complement the Suzuki method. Barbara Barber's 'Scales for Young Violinists' provides a scale system aligned with Suzuki volume levels. Her 'Position Pieces' introduces shifting through tuneful studies. Paul de Keyser's 'First Repertoire for Violin' provides additional performance pieces at early Suzuki levels. These supplements address gaps in the Suzuki curriculum—particularly reading skills, position work, and scale technique—without abandoning the Suzuki repertoire framework.",
    skills: "Suzuki curriculum supplements; scale technique; position introduction; reading skills; additional repertoire.",
    editions: "Alfred Music (Barber titles); Faber Music (de Keyser)."
  },
  {
    id: "applebaum-chamber", tier: "core", category: "Repertoire Collections", composer: "Samuel Applebaum (compiler)", nationality: "American", period: "20th Century",
    title: "Duets for Strings (3 vols.); Beautiful Music for Two Violins (4 vols.)",
    difficulty: [1, 5],
    description: "Applebaum's duo collections are among the most widely used ensemble materials for young violinists. 'Duets for Strings' provides ensemble music for string classes. 'Beautiful Music for Two Violins' collects attractive duets arranged from orchestral, operatic, and folk sources, graded from beginner through intermediate. Playing duets develops intonation, rhythm, and listening skills that solo practice alone cannot build.",
    skills: "Ensemble intonation; duet playing; listening skills; rhythmic coordination; social musicianship.",
    editions: "Belwin-Mills / Alfred Music."
  },
  {
    id: "sassmannshaus-tradition", tier: "core", category: "Repertoire Collections", composer: "Kurt Sassmannshaus (compiler)", nationality: "German-American", period: "21st Century",
    title: "The Sassmannshaus Tradition: Concert Repertoire for the Young Violinist",
    difficulty: [2, 6],
    description: "Kurt Sassmannshaus (son of Egon, who authored 'Early Start on the Violin') compiled graded repertoire selections that reflect the European conservatory tradition. These collections emphasize musically substantial works over lightweight pedagogical pieces, introducing students to real repertoire at the earliest possible stage. The editorial approach reflects the standards of the Cincinnati College-Conservatory, where Sassmannshaus built one of America's premier pre-college programs.",
    skills: "Conservatory-tradition repertoire; early exposure to substantial music; European pedagogical standards.",
    editions: "Bärenreiter."
  },
  {
    id: "probespiel", tier: "core", category: "Repertoire Collections", composer: "Various (ed. Ortel & Borwitzky)", nationality: "German", period: "20th Century",
    title: "Orchester-Probespiel (Orchestra Audition) for Violin",
    difficulty: [7, 10],
    description: "The standard orchestral audition excerpt collection, compiled from the repertoire of the Berlin Philharmonic and other leading German orchestras. Contains the most commonly requested first and second violin excerpts organized by composer, including Beethoven symphonies, Brahms symphonies, Strauss tone poems (Don Juan, Heldenleben, Till Eulenspiegel), Mozart symphonies, Mendelssohn Midsummer Night's Dream, Smetana Bartered Bride, and dozens more. An essential purchase for anyone preparing for professional orchestral auditions.",
    skills: "Orchestral audition preparation; excerpt mastery; ensemble awareness; professional standards.",
    editions: "Edition Peters (the standard edition).",
    examLevel: "RCM 7–ARCT (orchestral excerpts required from Grade 7)"
  },
,
  {
    id: "flesch-tone-prod", tier: "core", category: "Treatises", subcategory: "Modern Pedagogy", composer: "Carl Flesch", nationality: "Hungarian", period: "20th Century",
    title: "Problems of Tone Production in Violin Playing (Ton-Erzeugungsprobleme)",
    difficulty: [4, 10],
    description: "A focused treatise-exercise hybrid addressing the specific mechanics of tone production. Flesch analyzes the interplay of bow speed, pressure (weight), contact point, and the amount of bow hair used, providing exercises for developing each variable independently and in combination. Less well known than his Scale System or Art of Violin Playing, this work distills his most essential insights about the right arm into practical exercises. It is the most systematic pre-Fischer treatment of tone production and remains an important resource for any violinist seeking to expand their tonal palette.",
    skills: "Tone production mechanics; bow speed/weight/contact point relationships; right-arm control; tonal variety; sound-point awareness.",
    editions: "Ries & Erler (German original); Carl Fischer (American edition).",
    imslp: "https://imslp.org/wiki/Problems_of_Tone_Production_in_Violin_Playing_(Flesch,_Carl)"
  },
  {
    id: "violinland", tier: "core", category: "Beginner Methods", composer: "Shirley Givens", nationality: "American", period: "20th Century",
    title: "Adventures in Violinland (Books A–2C)",
    difficulty: [0, 2],
    description: "A charming pre-reading method designed for the youngest beginners (ages 3–6). The series uses colorful illustrations, games, and a story-based approach to introduce the very first elements of violin playing before formal note reading begins. Book A covers holding the violin and bow; subsequent books introduce open strings, first tapes, and simple melodies. Pioneering in its use of the Suzuki-era philosophy of starting very young, while providing a more structured written framework than pure Suzuki. Particularly effective for Suzuki teachers seeking supplementary materials and for group pre-twinkle classes.",
    skills: "Pre-reading violin introduction; first physical contact with the instrument; rhythm games; very early bow and left-hand fundamentals; age 3–6 appropriate.",
    editions: "Summy-Birchard / Alfred Music (complete series)."
  },
  {
    id: "ray-chen", tier: "core", category: "Online Resources", subcategory: "Artist Channels", composer: "Ray Chen", nationality: "Taiwanese-Australian", period: "21st Century",
    title: "Ray Chen YouTube Channel & Social Media",
    difficulty: [1, 10],
    description: "Ray Chen has built one of the largest classical music social media followings worldwide. His YouTube channel combines performance clips, practice vlogs, instrument demonstrations (including his Stradivarius), and accessible commentary on the classical music world. His communication style is relaxed and contemporary, making classical violin accessible to younger and non-traditional audiences. He has produced content on practice tips, stage fright, and the life of a touring soloist. A significant force in classical music outreach.",
    skills: "Classical music outreach; practice motivation; performance clips; instrument knowledge; contemporary approach to classical music.",
    editions: "Free (YouTube: Ray Chen; also active on Instagram and TikTok)."
  },
  {
    id: "hadelich", tier: "core", category: "Online Resources", subcategory: "Artist Channels", composer: "Augustin Hadelich", nationality: "German-Italian-American", period: "21st Century",
    title: "Augustin Hadelich YouTube Channel & Masterclasses",
    difficulty: [5, 10],
    description: "Hadelich's YouTube presence includes complete performance recordings, masterclass excerpts, and interviews discussing his approach to repertoire and technique. His playing is notable for its extraordinary tonal beauty, technical precision, and musical intelligence. Masterclass footage from festivals and conservatories shows his thoughtful, detail-oriented coaching style. Particularly valuable for his discussions of contemporary repertoire and less-standard concertos (Adès, Ligeti, Dutilleux) alongside the standard canon.",
    skills: "Repertoire interpretation; tonal concept; contemporary repertoire insights; masterclass coaching.",
    editions: "Free (YouTube: Augustin Hadelich)."
  },
  {
    id: "biber-passacaglia", tier: "core", category: "Solo Repertoire", subcategory: "Solo Violin", composer: "Heinrich Ignaz Franz von Biber", nationality: "Austrian", period: "Baroque",
    title: "Passacaglia in G minor for Solo Violin (from the Rosary Sonatas)",
    difficulty: [7, 9],
    description: "The concluding movement of Biber's Rosary Sonatas cycle, a monumental passacaglia over a descending four-note ground bass. One of the greatest solo violin works of the Baroque, demanding sustained intensity and invention over 65 variations.",
    editions: "Bärenreiter (Urtext); Henle Verlag",
    imslp: "https://imslp.org/wiki/Violin_Sonata_No.16_in_G_minor_(Biber,_Heinrich_Ignaz_Franz_von)"
  },
  {
    id: "hindemith-solo", tier: "core", category: "Solo Repertoire", subcategory: "Solo Violin", composer: "Paul Hindemith", nationality: "German", period: "Modern",
    title: "Sonata for Solo Violin, Op. 31/1 & Op. 31/2 (1924)",
    difficulty: [7, 9],
    description: "Two solo sonatas from Hindemith's most productive period. Op. 31/1 is in five movements; Op. 31/2 is in four. Both combine neoclassical forms with expressionist harmony and demand polyphonic command. Less frequently performed than Bartók or Ysaÿe but of comparable quality.",
    editions: "Schott (original publisher)",
    examLevel: "VMC Level 6; ASTACAP 10"
  },
  {
    id: "prokofiev-solo", tier: "core", category: "Solo Repertoire", subcategory: "Solo Violin", composer: "Sergei Prokofiev", nationality: "Russian", period: "Modern",
    title: "Sonata for Solo Violin, Op. 115 (1947)",
    difficulty: [6, 7],
    description: "A relatively accessible late work in three short movements. Originally conceived for unison violins, it works beautifully as a solo piece. Charming and witty, with folk-like themes.",
    editions: "Boosey & Hawkes; International Music Company",
    examLevel: "VMC Level 6; RCM 10"
  },
  {
    id: "schnittke-solo", tier: "core", category: "Solo Repertoire", subcategory: "Solo Violin", composer: "Alfred Schnittke", nationality: "Russian", period: "Modern",
    title: "Sonata No. 1 for Solo Violin (Quasi una sonata, 1968); Sonata for Solo Violin (1963)",
    difficulty: [8, 10],
    description: "Schnittke's solo violin works explore extreme contrasts between tonality and atonality, lyricism and violence. The 1968 'Quasi una sonata' was later arranged for violin and piano.",
    editions: "Sikorski"
  },
  {
    id: "takemitsu-alone", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Tōru Takemitsu", nationality: "Japanese", period: "Modern",
    title: "A Way a Lone (1981); Nostalghia (1987, violin and strings)",
    difficulty: [7, 9],
    description: "'A Way a Lone' for string quartet and 'Nostalghia' for violin and string orchestra exemplify Takemitsu's shimmering, resonant sound-world. Violin writing emphasizes sustained tones, microtonal shadings, and exquisite tonal color within a sparse texture.",
    editions: "Schott Japan"
  },
  {
    id: "part-fratres", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Arvo Pärt", nationality: "Estonian", period: "Modern",
    title: "Fratres (1977/various arrangements incl. violin and piano)",
    difficulty: [6, 8],
    description: "Pärt's tintinnabuli-style masterpiece exists in many versions; the violin and piano arrangement is among the most performed. Built on a repeating sequence with expanding range and dynamics. Demands sustained intensity, pure intonation, and an ability to project spiritual stillness.",
    editions: "Universal Edition"
  },
  {
    id: "part-spiegel", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Arvo Pärt", nationality: "Estonian", period: "Modern",
    title: "Spiegel im Spiegel (1978, violin and piano)",
    difficulty: [3, 5],
    description: "One of the most performed contemporary classical works. Extremely slow, meditative, and tintinnabuli in style. Technically accessible but musically demanding—requires absolute tonal control, patience, and the ability to sustain long phrases at pianissimo.",
    editions: "Universal Edition",
    examLevel: "RCM 5–6"
  },
  {
    id: "glass-vln", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Philip Glass", nationality: "American", period: "Modern",
    title: "Sonata for Violin and Piano (2008); Echorus (1995, 2 violins and string orch.)",
    difficulty: [6, 8],
    description: "Glass's late violin sonata combines his signature repetitive structures with genuine lyricism. Echorus is a double violin concerto of hypnotic beauty. Both demand rhythmic precision and comfort with minimalist patterning.",
    editions: "Chester Music / Dunvagen"
  },
  {
    id: "beach-romance", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Amy Beach", nationality: "American", period: "Romantic",
    title: "Romance, Op. 23 (1893); Violin Sonata, Op. 34 (1896)",
    difficulty: [6, 8],
    description: "Beach's Romance is a lush, passionate miniature. The Sonata is a substantial four-movement work of considerable power and sophistication—one of the finest American violin sonatas of the 19th century. Both reflect Beach's mastery of Romantic idiom with a distinctive voice.",
    editions: "Masters Music; G. Schirmer; Da Capo Press",
    examLevel: "ABRSM 8 (Romance Op. 23 is Grade 8 List B)"
  },
  {
    id: "still-suite", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "William Grant Still", nationality: "American", period: "Modern",
    title: "Suite for Violin and Piano (1943); Pastorela (1946)",
    difficulty: [5, 7],
    description: "Still, the first major African-American symphonist, composed the Suite in three movements blending blues, spirituals, and classical forms. Pastorela is a charming shorter work. Both deserve far wider performance.",
    editions: "William Grant Still Music; Flagstaff Publishing"
  },
  {
    id: "ives-sonatas", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Charles Ives", nationality: "American", period: "Modern",
    title: "4 Violin Sonatas (1903–1916)",
    difficulty: [7, 9],
    description: "Ives's four violin sonatas are extraordinary American originals, blending hymn tunes, ragtime, and polytonality with philosophical depth. No. 2 is the most accessible; No. 4 ('Children's Day at the Camp Meeting') is the most famous. They demand comfort with bitonal passages and metric complexity.",
    editions: "Associated Music Publishers / G. Schirmer; Peer International"
  },
  {
    id: "cage-6melodies", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "John Cage", nationality: "American", period: "Modern",
    title: "Six Melodies for Violin and Keyboard (1950); Freeman Etudes (1977–90)",
    difficulty: [5, 10],
    description: "The Six Melodies are gentle, spare works using Cage's early gamut technique—surprisingly accessible and beautiful. The Freeman Etudes are among the most difficult works ever written for any instrument, using star charts to determine every parameter. The complete set of 32 etudes pushes beyond all conventional technical limits.",
    editions: "Edition Peters"
  },
  {
    id: "vivaldi-seasons", tier: "core", category: "Concerti", composer: "Antonio Vivaldi", nationality: "Italian", period: "Baroque",
    title: "The Four Seasons, Op. 8 Nos. 1–4 (1725)",
    difficulty: [6, 7],
    description: "The most famous violin concerti in existence. Programmatic works depicting the seasons with extraordinary invention. Technically demanding with bariolage, rapid passage work, and sustained lyricism.",
    editions: "Ricordi (critical edition); Bärenreiter; Peters; Henle Verlag",
    imslp: "https://imslp.org/wiki/The_Four_Seasons_(Vivaldi,_Antonio)",
    examLevel: "RCM 8–9; ABRSM 8 (Spring 1st mvt is Grade 8 List A); ASTACAP 7–9"
  },
  {
    id: "vieuxtemps-4", tier: "core", category: "Concerti", composer: "Henri Vieuxtemps", nationality: "Belgian", period: "Romantic",
    title: "Violin Concerto No. 4 in D minor, Op. 31 (1849/50)",
    difficulty: [8, 9],
    description: "Vieuxtemps's most popular concerto. A brilliant work in the Franco-Belgian tradition with a singing Adagio religioso and a dazzling finale. Berlioz praised it extravagantly.",
    editions: "Henle Verlag (Urtext); International Music Company; Peters; Schott",
    imslp: "https://imslp.org/wiki/Violin_Concerto_No.4,_Op.31_(Vieuxtemps,_Henri)",
    examLevel: "ARCT"
  },
  {
    id: "vieuxtemps-5", tier: "core", category: "Concerti", composer: "Henri Vieuxtemps", nationality: "Belgian", period: "Romantic",
    title: "Violin Concerto No. 5 in A minor, Op. 37 ('Grétry', 1861)",
    difficulty: [7, 8],
    description: "More compact than No. 4, with a famous Adagio and a brilliant alla Zingara finale. A staple of the advanced student repertoire.",
    editions: "Henle Verlag; International Music Company; Peters",
    imslp: "https://imslp.org/wiki/Violin_Concerto_No.5,_Op.37_(Vieuxtemps,_Henri)",
    examLevel: "RCM 9"
  },
  {
    id: "paganini-1", tier: "core", category: "Concerti", composer: "Niccolò Paganini", nationality: "Italian", period: "Romantic",
    title: "Violin Concerto No. 1 in D major, Op. 6 (1817)",
    difficulty: [9, 10],
    description: "The most famous of Paganini's concerti, usually performed in Wilhelmj's D major edition. Demands every virtuoso technique. The first movement is enormous; the Rondo alla Campanella finale inspired Liszt.",
    editions: "International Music Company; Ricordi; Henle Verlag (Urtext)",
    imslp: "https://imslp.org/wiki/Violin_Concerto_No.1,_Op.6_(Paganini,_Niccolò)",
    examLevel: "ARCT"
  },
  {
    id: "glazunov", tier: "core", category: "Concerti", composer: "Alexander Glazunov", nationality: "Russian", period: "Late Romantic",
    title: "Violin Concerto in A minor, Op. 82 (1904)",
    difficulty: [8, 9],
    description: "A single-movement concerto of exceptional lyricism and brilliance, composed for Auer. Connects late-Romantic Russian lyricism with early-20th-century virtuosity. The cadenza is integrated into the structure.",
    editions: "International Music Company, ed. Milstein; Boosey & Hawkes; Peters",
    examLevel: "RCM 9"
  },
  {
    id: "khachaturian", tier: "core", category: "Concerti", composer: "Aram Khachaturian", nationality: "Armenian-Soviet", period: "Modern",
    title: "Violin Concerto in D minor (1940)",
    difficulty: [8, 9],
    description: "A colorful, exuberant concerto full of Armenian folk character. Written for Oistrakh. The slow movement is hauntingly beautiful; the finale is a whirlwind of dance rhythms.",
    editions: "International Music Company, ed. Oistrakh; Sikorski",
    examLevel: "RCM 10"
  },
  {
    id: "elgar", tier: "core", category: "Concerti", composer: "Edward Elgar", nationality: "British", period: "Late Romantic",
    title: "Violin Concerto in B minor, Op. 61 (1910)",
    difficulty: [9, 10],
    description: "One of the longest and most emotionally intense of all violin concerti. Dedicated to Kreisler, who premiered it. Demands enormous stamina, projecting tone, and sustained musical concentration.",
    editions: "Novello (original publisher); Bärenreiter (Urtext); International Music Company"
  },
  {
    id: "walton", tier: "core", category: "Concerti", composer: "William Walton", nationality: "British", period: "Modern",
    title: "Violin Concerto (1939, rev. 1943)",
    difficulty: [9, 9],
    description: "Written for Heifetz, this concerto combines Mediterranean lyricism (composed in Amalfi) with virtuosic brilliance. The Scherzo is fiendishly difficult. Underperformed but a masterpiece.",
    editions: "Oxford University Press"
  },
  {
    id: "goldmark", tier: "core", category: "Concerti", composer: "Karl Goldmark", nationality: "Hungarian-Austrian", period: "Romantic",
    title: "Violin Concerto No. 1 in A minor, Op. 28 (1877)",
    difficulty: [7, 8],
    description: "A warmly Romantic concerto that was immensely popular in the late 19th century. The slow movement is especially beautiful. Good preparation for larger Romantic concerti.",
    editions: "International Music Company; Peters; Schott",
    imslp: "https://imslp.org/wiki/Violin_Concerto_No.1,_Op.28_(Goldmark,_Karl)",
    examLevel: "RCM 9"
  },
  {
    id: "bruch-scottish", tier: "core", category: "Concerti", composer: "Max Bruch", nationality: "German", period: "Romantic",
    title: "Scottish Fantasy, Op. 46 (1880)",
    difficulty: [8, 9],
    description: "Four movements based on Scottish folk melodies, with harp obbligato. More episodic than the G minor Concerto but equally lyrical. Demands sustained cantabile and a rich tone.",
    editions: "International Music Company; Peters; Simrock",
    imslp: "https://imslp.org/wiki/Scottish_Fantasy,_Op.46_(Bruch,_Max)",
    examLevel: "ARCT"
  },
  {
    id: "saint-saens-3", tier: "core", category: "Concerti", composer: "Camille Saint-Saëns", nationality: "French", period: "Romantic",
    title: "Violin Concerto No. 3 in B minor, Op. 61 (1880)",
    difficulty: [8, 9],
    description: "Saint-Saëns's finest violin concerto, combining French elegance with genuine passion. The Barcarolle-like slow movement is beautiful; the finale is brilliant and Spanish-tinged.",
    editions: "Durand (original); International Music Company; Henle Verlag",
    imslp: "https://imslp.org/wiki/Violin_Concerto_No.3,_Op.61_(Saint-Saëns,_Camille)",
    examLevel: "ARCT"
  },
  {
    id: "dvorak-concerto", tier: "core", category: "Concerti", composer: "Antonín Dvořák", nationality: "Czech", period: "Romantic",
    title: "Violin Concerto in A minor, Op. 53 (1879–82)",
    difficulty: [8, 9],
    description: "Richly orchestrated with Slavonic dance rhythms throughout. Revised with Joachim. Demands projecting tone, broad lyricism, and rhythmic vitality.",
    editions: "Bärenreiter (Urtext); International Music Company; Peters",
    imslp: "https://imslp.org/wiki/Violin_Concerto,_Op.53_(Dvořák,_Antonín)",
    examLevel: "ARCT"
  },
  {
    id: "nielsen", tier: "core", category: "Concerti", composer: "Carl Nielsen", nationality: "Danish", period: "Modern",
    title: "Violin Concerto, Op. 33 (1911)",
    difficulty: [8, 9],
    description: "A powerful, individual concerto in two large movements. Nielsen's progressive tonality creates a restless energy. Growing in popularity as one of the finest early-20th-century concerti.",
    editions: "Wilhelm Hansen"
  },
  {
    id: "szymanowski-1", tier: "core", category: "Concerti", composer: "Karol Szymanowski", nationality: "Polish", period: "Modern",
    title: "Violin Concerto No. 1, Op. 35 (1916)",
    difficulty: [9, 10],
    description: "A shimmering, ecstatic single-movement concerto influenced by Debussy and Scriabin. Demands extraordinary color, delicacy, and virtuosity. One of the most beautiful 20th-century concerti.",
    editions: "Universal Edition; PWM"
  },
  {
    id: "adams-vln", tier: "core", category: "Concerti", composer: "John Adams", nationality: "American", period: "Modern",
    title: "Violin Concerto (1993)",
    difficulty: [9, 10],
    description: "A major post-minimalist concerto in three movements. The outer movements are propulsive and rhythmically complex; the central Chaconne is hauntingly beautiful. Has entered the standard repertoire rapidly.",
    editions: "Boosey & Hawkes"
  },
  {
    id: "haydn-quartets", tier: "core", category: "Chamber Music", subcategory: "String Quartet", composer: "Joseph Haydn", nationality: "Austrian", period: "Classical",
    title: "String Quartets (68 works, esp. Opp. 20, 33, 76)",
    difficulty: [5, 8],
    description: "The father of the string quartet. Op. 20 ('Sun'), Op. 33 ('Russian'), Op. 76 ('Erdödy,' including the 'Emperor'). Essential for any serious quartet player.",
    editions: "Henle Verlag (Urtext); Peters; Bärenreiter"
  },
  {
    id: "mozart-quartets", tier: "core", category: "Chamber Music", subcategory: "String Quartet", composer: "Wolfgang Amadeus Mozart", nationality: "Austrian", period: "Classical",
    title: "String Quartets (23 works, esp. 'Haydn' Quartets K. 387–465)",
    difficulty: [6, 8],
    description: "The six 'Haydn' Quartets and three 'Prussian' Quartets are supreme achievements. K. 465 'Dissonance' is the most famous.",
    editions: "Bärenreiter (Urtext); Henle Verlag"
  },
  {
    id: "schubert-quartet14", tier: "core", category: "Chamber Music", subcategory: "String Quartet", composer: "Franz Schubert", nationality: "Austrian", period: "Romantic",
    title: "String Quartet No. 14 'Death and the Maiden,' D. 810",
    difficulty: [7, 8],
    description: "One of the most emotionally intense chamber works. The second-movement variations on 'Death and the Maiden' are devastating.",
    editions: "Bärenreiter (Urtext); Henle Verlag; Peters"
  },
  {
    id: "debussy-quartet", tier: "core", category: "Chamber Music", subcategory: "String Quartet", composer: "Claude Debussy", nationality: "French", period: "Modern",
    title: "String Quartet in G minor, Op. 10 (1893)",
    difficulty: [7, 8],
    description: "A landmark work transforming the quartet genre with Impressionist textures and cyclic form.",
    editions: "Henle Verlag (Urtext); Durand (original)"
  },
  {
    id: "ravel-quartet", tier: "core", category: "Chamber Music", subcategory: "String Quartet", composer: "Maurice Ravel", nationality: "French", period: "Modern",
    title: "String Quartet in F major (1903)",
    difficulty: [7, 8],
    description: "Ravel's only quartet, written in response to Debussy's. Crystalline precision and inventive textures.",
    editions: "Henle Verlag; Durand"
  },
  {
    id: "bartok-quartets", tier: "core", category: "Chamber Music", subcategory: "String Quartet", composer: "Béla Bartók", nationality: "Hungarian", period: "Modern",
    title: "6 String Quartets (1909–1939)",
    difficulty: [8, 10],
    description: "Perhaps the most important quartet cycle of the 20th century. From late-Romantic intensity (No. 1) through folk-infused modernism (Nos. 3–4) to the conciliatory No. 6.",
    editions: "Boosey & Hawkes; Henle Verlag (Urtext)"
  },
  {
    id: "shostakovich-quartets", tier: "core", category: "Chamber Music", subcategory: "String Quartet", composer: "Dmitri Shostakovich", nationality: "Russian", period: "Modern",
    title: "15 String Quartets (1938–1974)",
    difficulty: [7, 10],
    description: "An extraordinary autobiographical cycle. No. 8 (Op. 110) most frequently performed; the late quartets (Nos. 13–15) confront mortality.",
    editions: "DSCH Publishers / Sikorski; Boosey & Hawkes"
  },
  {
    id: "brahms-sextets", tier: "core", category: "Chamber Music", subcategory: "String Sextet", composer: "Johannes Brahms", nationality: "German", period: "Romantic",
    title: "String Sextets Opp. 18 & 36",
    difficulty: [7, 8],
    description: "Gorgeously rich-toned sextets. Op. 18 is among Brahms's most accessible masterpieces.",
    editions: "Henle Verlag (Urtext); Bärenreiter; Peters"
  },
  {
    id: "schubert-quintet-c", tier: "core", category: "Chamber Music", subcategory: "String Quintet (2 cellos)", composer: "Franz Schubert", nationality: "Austrian", period: "Romantic",
    title: "String Quintet in C major, D. 956 (with 2 cellos)",
    difficulty: [8, 8],
    description: "Many consider this the greatest chamber work ever written. The slow movement is of almost unbearable beauty.",
    editions: "Bärenreiter (Urtext); Henle Verlag; Peters"
  },
  {
    id: "mozart-quintets", tier: "core", category: "Chamber Music", subcategory: "String Quintet (2 violas)", composer: "Wolfgang Amadeus Mozart", nationality: "Austrian", period: "Classical",
    title: "String Quintets K. 515, 516, 593, 614 (with 2 violas)",
    difficulty: [7, 8],
    description: "Mozart considered his quintets his finest chamber works. K. 516 in G minor is profoundly emotional.",
    editions: "Bärenreiter (Urtext); Henle Verlag"
  },
  {
    id: "dvorak-american", tier: "core", category: "Chamber Music", subcategory: "String Quartet", composer: "Antonín Dvořák", nationality: "Czech", period: "Romantic",
    title: "String Quartet No. 12 'American,' Op. 96",
    difficulty: [6, 7],
    description: "One of the most popular quartets. Pentatonic melodies inspired by America. Accessible and rewarding.",
    editions: "Bärenreiter (Urtext); Peters; Henle"
  },
  {
    id: "schumann-quintet", tier: "core", category: "Chamber Music", subcategory: "Piano Quintet", composer: "Robert Schumann", nationality: "German", period: "Romantic",
    title: "Piano Quintet in E-flat, Op. 44",
    difficulty: [7, 8],
    description: "A revolutionary work that established the piano quintet as a genre. Passionate, orchestral in scope. The violin leads much of the thematic material.",
    editions: "Henle Verlag (Urtext); Peters; Breitkopf & Härtel"
  },
  {
    id: "dvorak-piano-quintet", tier: "core", category: "Chamber Music", subcategory: "Piano Quintet", composer: "Antonín Dvořák", nationality: "Czech", period: "Romantic",
    title: "Piano Quintet No. 2 in A major, Op. 81",
    difficulty: [7, 8],
    description: "One of the greatest piano quintets, combining Slavonic dance rhythms with Brahmsian structure. The Dumka slow movement is ravishing.",
    editions: "Bärenreiter (Urtext); Peters"
  },
  {
    id: "brahms-piano-quintet", tier: "core", category: "Chamber Music", subcategory: "Piano Quintet", composer: "Johannes Brahms", nationality: "German", period: "Romantic",
    title: "Piano Quintet in F minor, Op. 34",
    difficulty: [8, 9],
    description: "Stormy, powerful, and symphonic in scope. Originally a string quintet, then a two-piano sonata, before finding its definitive form.",
    editions: "Henle Verlag (Urtext); Peters; Bärenreiter"
  },
  {
    id: "franck-quintet", tier: "core", category: "Chamber Music", subcategory: "Piano Quintet", composer: "César Franck", nationality: "Belgian-French", period: "Romantic",
    title: "Piano Quintet in F minor (1879)",
    difficulty: [7, 8],
    description: "Intensely passionate, with cyclic form. Premiered controversially with Saint-Saëns at the piano.",
    editions: "Henle Verlag; Durand"
  },
  {
    id: "chausson-concert", tier: "core", category: "Chamber Music", subcategory: "Violin, Piano & String Quartet", composer: "Ernest Chausson", nationality: "French", period: "Romantic",
    title: "Concert for Violin, Piano, and String Quartet, Op. 21",
    difficulty: [8, 9],
    description: "A unique and magnificent work blending concerto and chamber elements. The violin part is brilliant and lyrical.",
    editions: "Durand (original); International Music Company"
  },
  {
    id: "schoenberg-vn", tier: "core", category: "Chamber Music", subcategory: "String Sextet", composer: "Arnold Schoenberg", nationality: "Austrian", period: "Modern",
    title: "Verklärte Nacht (Transfigured Night), Op. 4 (string sextet version)",
    difficulty: [8, 9],
    description: "Programmatic string sextet of tremendous emotional power, pre-atonal Schoenberg at his most expressive.",
    editions: "Universal Edition; International Music Company"
  },
  {
    id: "messiaen-quatuor", tier: "core", category: "Chamber Music", subcategory: "Violin, Clarinet, Cello & Piano", composer: "Olivier Messiaen", nationality: "French", period: "Modern",
    title: "Quatuor pour la fin du temps (1941)",
    difficulty: [8, 9],
    description: "Written in a POW camp for violin, clarinet, cello, and piano. The eighth movement for violin and piano is transcendent.",
    editions: "Durand (original publisher)"
  },
  {
    id: "beethoven-trios-full", tier: "core", category: "Chamber Music", subcategory: "Piano Trio", composer: "Ludwig van Beethoven", nationality: "German", period: "Classical/Romantic",
    title: "Piano Trios Op. 1; Op. 70 ('Ghost' & No. 2); Op. 97 ('Archduke')",
    difficulty: [7, 9],
    description: "From youthful exuberance (Op. 1) to the majestic 'Archduke' (Op. 97), the grandest of all piano trios.",
    editions: "Henle Verlag (Urtext); Bärenreiter; Peters"
  },
  {
    id: "schubert-trios", tier: "core", category: "Chamber Music", subcategory: "Piano Trio", composer: "Franz Schubert", nationality: "Austrian", period: "Romantic",
    title: "Piano Trios Op. 99 (B-flat) and Op. 100 (E-flat)",
    difficulty: [7, 8],
    description: "Among Schubert's greatest achievements. The Op. 100 slow movement was used in Kubrick's Barry Lyndon.",
    editions: "Bärenreiter (Urtext); Henle Verlag; Peters"
  },
  {
    id: "ravel-trio-full", tier: "core", category: "Chamber Music", subcategory: "Piano Trio", composer: "Maurice Ravel", nationality: "French", period: "Modern",
    title: "Piano Trio in A minor (1914)",
    difficulty: [8, 9],
    description: "Kaleidoscopic work of extraordinary refinement: Basque rhythms, Malay pantun form, perpetual motion, luminous passacaglia.",
    editions: "Durand (original); Henle Verlag"
  },
  {
    id: "shostakovich-trio", tier: "core", category: "Chamber Music", subcategory: "Piano Trio", composer: "Dmitri Shostakovich", nationality: "Russian", period: "Modern",
    title: "Piano Trio No. 2 in E minor, Op. 67 (1944)",
    difficulty: [8, 9],
    description: "Wartime masterpiece. The finale's Jewish-dance theme over a 'dance of death' ostinato is devastating.",
    editions: "DSCH Publishers / Sikorski; Boosey & Hawkes"
  },
  {
    id: "mendelssohn-trio", tier: "core", category: "Chamber Music", subcategory: "Piano Trio", composer: "Felix Mendelssohn", nationality: "German", period: "Romantic",
    title: "Piano Trios Op. 49 (D minor) and Op. 66 (C minor)",
    difficulty: [7, 8],
    description: "The D minor Trio is one of the most popular chamber works of the Romantic era. Passionate and brilliant.",
    editions: "Henle Verlag (Urtext); Peters; Bärenreiter"
  },
  {
    id: "waxman-carmen", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Franz Waxman", nationality: "German-American", period: "Modern",
    title: "Carmen Fantasie (1946)",
    difficulty: [9, 10],
    description: "A showstopping concert paraphrase on Bizet's opera themes, composed for the film 'Humoresque.' Demands every virtuoso technique.",
    editions: "G. Schirmer",
    examLevel: "ARCT (implied by difficulty)"
  },
  {
    id: "massenet-meditation", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Jules Massenet", nationality: "French", period: "Romantic",
    title: "Meditation from Thaïs",
    difficulty: [5, 6],
    description: "One of the most famous violin melodies. Excellent for developing sustained cantabile, vibrato control, and emotional expression.",
    editions: "International Music Company; G. Schirmer; Peters",
    examLevel: "RCM 7; ABRSM 6; ASTACAP 7"
  },
  {
    id: "elgar-salut", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Edward Elgar", nationality: "British", period: "Romantic",
    title: "Salut d'amour, Op. 12",
    difficulty: [4, 5],
    description: "A charming salon piece for developing warmth of tone and elegant phrasing.",
    editions: "Novello; International Music Company",
    examLevel: "RCM 5; ABRSM 4; ASTACAP 6"
  },
  {
    id: "bartok-romanian", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Béla Bartók", nationality: "Hungarian", period: "Modern",
    title: "Romanian Folk Dances, Sz. 56 (arr. Székely)",
    difficulty: [5, 6],
    description: "Six short folk-inspired dances of varied character. The Székely arrangement for violin and piano is standard.",
    editions: "Boosey & Hawkes; Universal Edition",
    examLevel: "RCM 7; ABRSM 6; ASTACAP 9"
  },
  {
    id: "sarasate-carmen", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Pablo de Sarasate", nationality: "Spanish", period: "Romantic",
    title: "Carmen Fantasy, Op. 25",
    difficulty: [8, 9],
    description: "Brilliant paraphrase on Bizet's themes. Demands varied character, spiccato, double stops, and bravura.",
    editions: "International Music Company; G. Schirmer; Peters",
    examLevel: "RCM 9"
  },
  {
    id: "wieniawski-legend", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Henryk Wieniawski", nationality: "Polish", period: "Romantic",
    title: "Légende, Op. 17",
    difficulty: [7, 7],
    description: "A beautiful lyrical showpiece developing sustained cantabile and expressive vibrato.",
    editions: "PWM; International Music Company; Peters",
    examLevel: "RCM 10; ASTACAP 8"
  },
  {
    id: "wieniawski-scherzo", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Henryk Wieniawski", nationality: "Polish", period: "Romantic",
    title: "Scherzo-Tarantelle, Op. 16",
    difficulty: [8, 9],
    description: "Whirlwind showpiece demanding brilliant spiccato, double stops, and controlled abandon.",
    editions: "PWM; International Music Company; Peters",
    examLevel: "ARCT"
  },
  {
    id: "monti-csardas", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Vittorio Monti", nationality: "Italian", period: "Romantic",
    title: "Csárdás (c. 1904)",
    difficulty: [6, 7],
    description: "Beloved encore piece with slow lassan and fast friss sections. Tests cantabile and rapid passage work.",
    editions: "International Music Company; Carl Fischer",
    examLevel: "RCM 7; ABRSM 8 (Grade 8 List C); ASTACAP 7"
  },
  {
    id: "novacek-perpetuum", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Ottokar Nováček", nationality: "Hungarian", period: "Romantic",
    title: "Perpetuum Mobile, Op. 5/4",
    difficulty: [7, 8],
    description: "A dazzling spiccato showpiece from his String Quartet. Standard encore and competition piece.",
    editions: "International Music Company; G. Schirmer",
    examLevel: "RCM 10; ASTACAP 10"
  },
  {
    id: "bazzini-ronde", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Antonio Bazzini", nationality: "Italian", period: "Romantic",
    title: "La Ronde des Lutins (Dance of the Goblins), Op. 25",
    difficulty: [8, 9],
    description: "A scintillating scherzo demanding fleet spiccato, harmonics, and left-hand pizzicato. Classic virtuoso encore.",
    editions: "International Music Company; Ricordi",
    examLevel: "ARCT (implied)"
  },
  {
    id: "vieuxtemps-ballade", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Henri Vieuxtemps", nationality: "Belgian", period: "Romantic",
    title: "Ballade and Polonaise, Op. 38",
    difficulty: [8, 8],
    description: "Lyrical Ballade followed by a brilliant Polonaise in the Franco-Belgian tradition.",
    editions: "International Music Company; Peters; Schott"
  },
  {
    id: "sarasate-intro-tarantella", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Pablo de Sarasate", nationality: "Spanish", period: "Romantic",
    title: "Introduction and Tarantella, Op. 43",
    difficulty: [7, 8],
    description: "Perpetual motion in the Tarantella demands fleet spiccato and stamina.",
    editions: "International Music Company; G. Schirmer",
    examLevel: "ARCT"
  },
  {
    id: "barry-intonation", tier: "core", category: "Treatises", subcategory: "Modern Pedagogy", composer: "Barry Ross", nationality: "American", period: "21st Century",
    title: "A Violinist's Guide for Exquisite Intonation (2006, rev. 2020)",
    difficulty: [3, 10],
    description: "A groundbreaking modern study of intonation that goes far beyond 'play in tune.' Ross examines the physics of intonation (Pythagorean, just, equal temperament), the practical differences between expressive and harmonic intonation, and how context determines pitch choices. Includes systematic exercises for training the ear to hear and produce fine gradations of pitch. One of the most important modern contributions to the pedagogy of intonation, addressing a subject that most treatises treat superficially. Essential reading for any serious student or teacher grappling with why certain notes need to be higher or lower in different harmonic contexts.",
    skills: "Intonation systems (Pythagorean, just, equal temperament); expressive vs. harmonic intonation; ear training; pitch discrimination; context-dependent pitch choices.",
    editions: "Self-published / available through the author's website and major retailers."
  }
,
  {
    id: "orch-excerpts-site", tier: "core", category: "Online Resources", subcategory: "Reference Sites", composer: "Community", nationality: "International", period: "21st Century",
    title: "OrchestraExcerpts.com",
    difficulty: [5, 10],
    description: "A comprehensive free website cataloging standard orchestral audition excerpts for all instruments. For violin, it provides the specific passages requested at major orchestra auditions, organized by composer and work. Each excerpt page includes the relevant measures, common audition requirements, and links to recordings. An essential resource for anyone preparing for orchestral auditions.",
    skills: "Audition preparation; excerpt identification; standard repertoire for auditions.",
    editions: "Free (orchestraexcerpts.com)."
  },
  {
    id: "wright-yt", tier: "core", category: "Online Resources", subcategory: "Artist Channels", composer: "Audrey Wright", nationality: "British", period: "21st Century",
    title: "Audrey Wright YouTube Channel",
    difficulty: [3, 9],
    description: "Orchestral violinist and YouTube educator. Her channel provides detailed excerpt tutorials, audition advice, and practice strategies from a working orchestral musician's perspective. Particularly useful for students preparing for youth orchestra auditions and early professional auditions.",
    skills: "Excerpt tutorials; audition preparation; orchestral practice strategies.",
    editions: "Free (YouTube: Audrey Wright)."
  },
  {
    id: "kim-yt", tier: "core", category: "Online Resources", subcategory: "Artist Channels", composer: "Yongji Kim", nationality: "South Korean", period: "21st Century",
    title: "Yongji Kim YouTube Channel",
    difficulty: [5, 10],
    description: "Educational YouTube content on orchestral playing and excerpt preparation from a professional orchestral musician's perspective.",
    skills: "Orchestral excerpt preparation; professional orchestral playing insights.",
    editions: "Free (YouTube)."
  },
  {
    id: "bendix-balgley-yt", tier: "core", category: "Online Resources", subcategory: "Artist Channels", composer: "Noah Bendix-Balgley", nationality: "American", period: "21st Century",
    title: "Noah Bendix-Balgley YouTube Channel",
    difficulty: [5, 10],
    description: "Concertmaster of the Berlin Philharmonic since 2014. His YouTube channel offers in-depth tutorials on orchestral excerpts, solo repertoire, audition preparation, and the life of a professional orchestral musician at the highest level. Particularly valuable for his insider perspective on what audition panels are listening for.",
    skills: "Elite-level excerpt coaching; audition preparation; concertmaster perspective; solo repertoire insights.",
    editions: "Free (YouTube: Noah Bendix-Balgley)."
  },
  {
    id: "carnegie-yt", tier: "core", category: "Online Resources", subcategory: "Institutional Channels", composer: "Carnegie Hall", nationality: "American", period: "21st Century",
    title: "Carnegie Hall YouTube Channel & Masterclasses",
    difficulty: [5, 10],
    description: "Carnegie Hall's YouTube channel features complete masterclasses, recitals, and educational content from the world's most prestigious concert hall. Violin-specific content includes masterclasses by visiting artists and Weill Music Institute programming. An invaluable free resource for high-level musical education.",
    skills: "Masterclass coaching; performance clips; educational programming.",
    editions: "Free (YouTube: Carnegie Hall)."
  },
  {
    id: "pmf-yt", tier: "core", category: "Online Resources", subcategory: "Institutional Channels", composer: "Pacific Music Festival", nationality: "Japanese/International", period: "21st Century",
    title: "Pacific Music Festival (PMF) YouTube Channel",
    difficulty: [5, 10],
    description: "PMF, founded by Leonard Bernstein in Sapporo, Japan, is one of the world's leading international music festivals and academies. Their YouTube channel features rehearsal footage, masterclasses, and performances by faculty and fellows, offering insight into orchestral training at the highest level.",
    skills: "Orchestral training; festival masterclasses; international music education.",
    editions: "Free (YouTube: PacificMusicFestival)."
  },
  {
    id: "kurganov-yt", tier: "core", category: "Online Resources", subcategory: "Artist Channels", composer: "Daniel Kurganov", nationality: "Russian-American", period: "21st Century",
    title: "Daniel Kurganov YouTube Channel",
    difficulty: [5, 10],
    description: "Violinist and educator whose YouTube channel provides detailed, thoughtful tutorials on violin technique, practice methodology, and repertoire interpretation. Known for clear explanations and a systematic approach to common technical challenges.",
    skills: "Technique tutorials; practice methodology; repertoire interpretation; systematic problem-solving.",
    editions: "Free (YouTube: Daniel Kurganov)."
  },
  {
    id: "karajan-akademie-yt", tier: "core", category: "Online Resources", subcategory: "Institutional Channels", composer: "Karajan-Akademie der Berliner Philharmoniker", nationality: "German", period: "21st Century",
    title: "Karajan Academy of the Berlin Philharmonic YouTube",
    difficulty: [7, 10],
    description: "The Karajan Academy is the Berlin Philharmonic's training program for young professional musicians. Their YouTube content offers rare insight into the training and standards of the world's most prestigious orchestra, including coaching sessions and performances by academy fellows and BPO members.",
    skills: "Elite orchestral training; Berlin Philharmonic standards; coaching methodology.",
    editions: "Free (YouTube: Karajan-Akademie)."
  },
  {
    id: "hahn-yt", tier: "core", category: "Online Resources", subcategory: "Artist Channels", composer: "Hilary Hahn", nationality: "American", period: "21st Century",
    title: "Hilary Hahn YouTube Channel & Social Media",
    difficulty: [3, 10],
    description: "One of the leading violinists of her generation. Her YouTube and Instagram presence includes practice clips, behind-the-scenes content, #100daysofpractice challenges, and performance videos. Her openness about the daily discipline of practice has inspired thousands of students. Commissioned 27 new encores from living composers.",
    skills: "Practice motivation; performance clips; contemporary music advocacy; daily practice discipline.",
    editions: "Free (YouTube: Hilary Hahn)."
  },
  {
    id: "cole-yt", tier: "core", category: "Online Resources", subcategory: "Artist Channels", composer: "Nathan Cole", nationality: "American", period: "21st Century",
    title: "Nathan Cole YouTube Channel (Natesviolin)",
    difficulty: [5, 10],
    description: "First Associate Concertmaster of the Los Angeles Philharmonic. His YouTube channel is one of the best resources for orchestral violin, covering excerpts, audition preparation, section playing, and general violin technique. His detailed breakdowns of standard excerpts are particularly valuable for audition candidates. Also co-hosts the 'Stand Partners for Life' podcast with his wife, violinist Akiko Tarumoto.",
    skills: "Orchestral excerpt mastery; audition preparation; section playing; professional orchestral life.",
    editions: "Free (YouTube: Natesviolin)."
  },
  {
    id: "stringpedagogy", tier: "core", category: "Online Resources", subcategory: "Reference Sites", composer: "Mimi Zweig", nationality: "American", period: "21st Century",
    title: "StringPedagogy.com (Mimi Zweig)",
    difficulty: [1, 10],
    description: "An extensive online resource created by Mimi Zweig, Distinguished Professor of Music at Indiana University and one of America's leading string pedagogues. The site includes a comprehensive graded repertoire list, teaching videos organized by technical topic (bow hold, left hand, shifting, vibrato, etc.), and reference materials for teachers. The repertoire list is one of the most detailed available, organized by level and with annotations on pedagogical value. The video library demonstrates Zweig's teaching with real students at various levels. An invaluable free resource for teachers and self-directed students seeking a structured curriculum.",
    skills: "Graded repertoire reference; pedagogical video library; teaching methodology; comprehensive curriculum design; technique demonstrations with students.",
    editions: "Free (stringpedagogy.com). Membership required for full video access."
  },
  {
    id: "rcm-online", tier: "core", category: "Online Resources", subcategory: "Exam & Syllabus Resources", composer: "Royal Conservatory of Music", nationality: "Canadian", period: "21st Century",
    title: "RCM Violin Syllabus & Resources",
    difficulty: [1, 10],
    description: "The Royal Conservatory of Music (Toronto) publishes one of the most widely used graded examination systems in North America. The violin syllabus defines ten preparatory-through-ARCT levels, each specifying required repertoire (Lists A, B, C), technical requirements (scales, arpeggios, double stops at each level), études, and sight-reading standards. The RCM system provides a clear, externally validated progression that many private teachers use as their curricular backbone. The syllabus is available online and is updated periodically. RCM also publishes the Celebration Series repertoire books and the Four Seasons of Violin pedagogy resources.",
    skills: "Graded curriculum framework; exam repertoire lists; technical requirement benchmarks; sight-reading standards; validated progression from beginner to ARCT diploma.",
    editions: "Free syllabus (rcmusic.com/examinations). Celebration Series books published by Frederick Harris Music."
  },
  {
    id: "abrsm-online", tier: "core", category: "Online Resources", subcategory: "Exam & Syllabus Resources", composer: "Associated Board of the Royal Schools of Music", nationality: "British", period: "21st Century",
    title: "ABRSM Violin Syllabus & Resources",
    difficulty: [1, 10],
    description: "The ABRSM (Associated Board of the Royal Schools of Music) is the world's largest music examination board, operating in over 90 countries. Their violin syllabus defines Grades 1–8 plus diploma levels (DipABRSM, LRSM, FRSM), each with three lists of set pieces, scales and arpeggios, sight-reading, and aural tests. The grading system is the international standard in the UK, much of Asia, and the Commonwealth. The current syllabus (from 2024) is available online. ABRSM also publishes graded exam pieces anthologies with piano accompaniment, making their repertoire selections readily accessible. Their grading is generally considered slightly different from RCM — an ABRSM Grade 8 roughly corresponds to RCM Level 9–10.",
    skills: "International grading standard; exam repertoire lists; scales and arpeggios by grade; sight-reading and aural benchmarks; validated progression from Grade 1 to diploma.",
    editions: "Free syllabus (abrsm.org). Exam pieces published by ABRSM Publishing."
  }
,
  {
    id: "handel-sonatas", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "George Frideric Handel", nationality: "German-British", period: "Baroque",
    title: "Violin Sonatas, HWV 361–371",
    difficulty: [5, 7],
    description: "Handel's violin sonatas combine Italian lyricism with German contrapuntal substance. The slow movements offer fine Baroque cantabile. Fast movements require clean passage work and rhythmic vitality.",
    skills: "Sustained melodic line; continuo dialogue; Baroque phrasing and ornamentation; nobility of expression.",
    editions: "Bärenreiter (Urtext, Hallische Händel-Ausgabe); Henle Verlag (Urtext); Peters, ed. Joachim; G. Schirmer, ed. Adolf Busch.",
    imslp: "https://imslp.org/wiki/Category:Handel,_George_Frideric",
    examLevel: "ABRSM 6–8; RCM 7–9; ASTACAP 5–7"
  },
  {
    id: "vitali-chaconne", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Tomaso Antonio Vitali (attrib.)", nationality: "Italian", period: "Baroque",
    title: "Chaconne in G minor (arr. various)",
    difficulty: [7, 8],
    description: "A grand, emotionally intense chaconne, traditionally attributed to Vitali though its authorship is disputed. The various arrangements (Charlier, David, Léonard) add Romantic harmonies to the Baroque structure. Demands sustained intensity, double stops, and broad dynamic range. A standard recital and competition piece.",
    skills: "Sustained intensity; double stops; broad dynamic range; chaconne form; expressive depth.",
    editions: "International Music Company; G. Schirmer; Peters.",
    imslp: "https://imslp.org/wiki/Chaconne_in_G_minor_(Vitali,_Tomaso_Antonio)",
    examLevel: "RCM 9–10; ABRSM 8; ASTACAP 9"
  },
  {
    id: "tartini-devil", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Giuseppe Tartini", nationality: "Italian", period: "Baroque",
    title: "Sonata in G minor ('Devil's Trill', c. 1740s)",
    difficulty: [8, 9],
    description: "The most famous violin sonata of the pre-Classical era. Legend holds that Tartini dreamed the Devil played a sonata of extraordinary beauty, and upon waking wrote this work as an attempt to recapture what he heard. The final movement features sustained double-stop trills of great difficulty. Usually performed with Kreisler's cadenza.",
    skills: "Double-stop trills; Baroque ornamentation; sustained intensity; cadenza (usually Kreisler's).",
    editions: "International Music Company; Peters; Henle Verlag (Urtext).",
    imslp: "https://imslp.org/wiki/Violin_Sonata_in_G_minor,_B.g5_(Tartini,_Giuseppe)",
    examLevel: "RCM ARCT"
  },
  {
    id: "grieg-sonatas", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Edvard Grieg", nationality: "Norwegian", period: "Romantic",
    title: "3 Sonatas for Violin and Piano, Opp. 8, 13, 45",
    difficulty: [6, 8],
    description: "Grieg's three violin sonatas chart his growth from youthful Romanticism (Op. 8) through mature lyricism (Op. 13) to folk-infused mastery (Op. 45 in C minor). The third is most frequently performed with its dramatic sweep, Norwegian dance rhythms, and virtuosic writing.",
    skills: "Nordic folk character; rhythmic vigor; lyrical warmth; dramatic contrasts; Grieg's harmonic color.",
    editions: "Henle Verlag (Urtext); Peters (Urtext, Grieg Complete Works); International Music Company.",
    examLevel: "RCM ARCT; ABRSM 8; ASTACAP 8–9"
  },
  {
    id: "faure-sonatas", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Gabriel Fauré", nationality: "French", period: "Romantic/Modern",
    title: "2 Sonatas for Violin and Piano, Opp. 13 & 108",
    difficulty: [7, 8],
    description: "Fauré's First Sonata in A major is a radiant, passionate early work—one of the great French Romantic masterpieces. The Second Sonata in E minor is more austere, reflecting the spare late style.",
    skills: "French elegance; rhythmic suppleness; tonal refinement; Fauré's unique harmonic language.",
    editions: "Henle Verlag (Urtext); Durand/Hamelle (original); Peters.",
    examLevel: "ARCT (Op. 13); ASTACAP 10"
  },
  {
    id: "strauss-sonata", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Richard Strauss", nationality: "German", period: "Late Romantic",
    title: "Sonata in E-flat major, Op. 18 (1887)",
    difficulty: [8, 9],
    description: "Strauss's only violin sonata—youthfully exuberant, orchestral in scale. Enormous demands on both players. Requires huge, projecting tone, virtuosic passage work, and sustained high-position playing.",
    skills: "Projecting tone; passage work at fingerboard extremes; double stops; orchestral dynamic range.",
    editions: "Henle Verlag (Urtext); Universal Edition (original); International Music Company.",
    examLevel: "ARCT"
  },
  {
    id: "janacek-sonata", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Leoš Janáček", nationality: "Czech", period: "Modern",
    title: "Sonata for Violin and Piano (1914–21)",
    difficulty: [7, 8],
    description: "A passionate, speech-inflected work reflecting World War I's upheaval. Four short movements with Janáček's signature short-breathed phrases, folk-derived melodic cells, and sudden emotional eruptions.",
    skills: "Speech-like phrasing; emotional intensity; folk inflections; abrupt dynamic contrasts.",
    editions: "Editio Supraphon / Bärenreiter (Urtext); Henle Verlag."
  },
  {
    id: "messiaen-theme", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Olivier Messiaen", nationality: "French", period: "Modern",
    title: "Thème et Variations (1932)",
    difficulty: [8, 8],
    description: "Messiaen's early work introduces his modes of limited transposition within a relatively accessible framework. A compact, luminous piece and an excellent entry point into Messiaen's world.",
    skills: "Messiaen's harmonic language; luminous tone; rhythmic precision; French clarity.",
    editions: "Alphonse Leduc (original publisher)."
  },
  {
    id: "mozart-sinfonia", tier: "core", category: "Concerti", composer: "Wolfgang Amadeus Mozart", nationality: "Austrian", period: "Classical",
    title: "Sinfonia Concertante in E-flat, K. 364 (Violin & Viola)",
    difficulty: [8, 8],
    description: "A double concerto for violin and viola that is among Mozart's supreme achievements. The interplay between the two soloists is deeply moving, particularly in the slow movement. Demands perfect Classical style and extraordinary ensemble sensitivity.",
    skills: "Classical style; duo-soloist ensemble; viola partnership; sustained lyricism.",
    editions: "Bärenreiter (Urtext, NMA); Henle Verlag; International Music Company.",
    imslp: "https://imslp.org/wiki/Sinfonia_Concertante_for_Violin,_Viola_and_Orchestra,_K.364/320d_(Mozart,_Wolfgang_Amadeus)"
  },
  {
    id: "kabalevsky", tier: "core", category: "Concerti", composer: "Dmitri Kabalevsky", nationality: "Russian", period: "Modern",
    title: "Violin Concerto in C major, Op. 48 (1948)",
    difficulty: [6, 7],
    description: "A bright, optimistic student concerto widely used in Russian and international pedagogy. Three compact movements with clean passage work, lyrical writing, and a lively finale. Excellent preparation for larger Romantic concerti.",
    skills: "Clean passage work; Russian lyrical style; concerto form; moderate virtuosity.",
    editions: "International Music Company; Boosey & Hawkes; Sikorski.",
    examLevel: "RCM 8–9; ASTACAP 9"
  }
,
  {
    id: "adams-atomic-ex", tier: "core", category: "Orchestral Excerpts", composer: "John Adams",
    title: "Doctor Atomic Symphony, Mvt. I — Violin 1 (mm. 66–113)",
    difficulty: [8, 9],
    description: "Doctor Atomic Symphony, Mvt. I — Violin 1: mm. 66–113",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/john-adams-doctor-atomic-symphony-violin-excerpt/"
  },
  {
    id: "bach-matthew-erbarme-ex", tier: "core", category: "Orchestral Excerpts", composer: "J.S. Bach",
    title: "St. Matthew Passion, Aria No. 47 'Erbarme dich' — Concertmaster Solo (Complete aria solo)",
    difficulty: [7, 8],
    description: "St. Matthew Passion, Aria No. 47 'Erbarme dich' — Concertmaster Solo: Complete aria solo",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/bach-st-matthews-passion-concertmaster-excerpt/"
  },
  {
    id: "bach-bmass-laudamus-ex", tier: "core", category: "Orchestral Excerpts", composer: "J.S. Bach",
    title: "B minor Mass, 'Laudamus Te' — Concertmaster Solo (Complete solo)",
    difficulty: [7, 8],
    description: "B minor Mass, 'Laudamus Te' — Concertmaster Solo: Complete solo",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/bach-b-minor-mass-laudamus/"
  },
  {
    id: "bach-matthew-gebt-ex", tier: "core", category: "Orchestral Excerpts", composer: "J.S. Bach",
    title: "St. Matthew Passion, 'Gebt mir meinem Jesum wieder' — Violin 1 (Aria accompaniment)",
    difficulty: [6, 7],
    description: "St. Matthew Passion, 'Gebt mir meinem Jesum wieder' — Violin 1: Aria accompaniment",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/bach-st-matthews-passion-gebt-mir-meinem-jesum-wiecer/"
  },
  {
    id: "bartok-cfo-1a-ex", tier: "core", category: "Orchestral Excerpts", composer: "Béla Bartók",
    title: "Concerto for Orchestra, Mvt. I — Violin 1 (mm. 55–63)",
    difficulty: [8, 9],
    description: "Concerto for Orchestra, Mvt. I — Violin 1: mm. 55–63",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/bartok-concerto-for-orchestra-violin-excerpt/"
  },
  {
    id: "bartok-cfo-1b-ex", tier: "core", category: "Orchestral Excerpts", composer: "Béla Bartók",
    title: "Concerto for Orchestra, Mvt. I — Violin 1 (mm. 76–135)",
    difficulty: [8, 9],
    description: "Concerto for Orchestra, Mvt. I — Violin 1: mm. 76–135",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/bartok-concerto-for-orchestra-violin-excerpt2/"
  },
  {
    id: "bartok-cfo-1c-ex", tier: "core", category: "Orchestral Excerpts", composer: "Béla Bartók",
    title: "Concerto for Orchestra, Mvt. I — Violin 1 (mm. 476–end)",
    difficulty: [8, 9],
    description: "Concerto for Orchestra, Mvt. I — Violin 1: mm. 476–end",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/bartok-concerto-for-orchestra-mvt-1/"
  },
  {
    id: "bartok-cfo-5a-ex", tier: "core", category: "Orchestral Excerpts", composer: "Béla Bartók",
    title: "Concerto for Orchestra, Mvt. V — Violin 1 (mm. 21–86)",
    difficulty: [8, 9],
    description: "Concerto for Orchestra, Mvt. V — Violin 1: mm. 21–86",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/bartok-concerto-for-orchestra-violin-excerpt-mvt/"
  },
  {
    id: "bartok-cfo-5b-ex", tier: "core", category: "Orchestral Excerpts", composer: "Béla Bartók",
    title: "Concerto for Orchestra, Mvt. V — Violin 1 (mm. 88–144)",
    difficulty: [8, 9],
    description: "Concerto for Orchestra, Mvt. V — Violin 1: mm. 88–144",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/bartok-concerto-for-orchestra-mvt-v-mm-88-144/"
  },
  {
    id: "bartok-cfo-5c-ex", tier: "core", category: "Orchestral Excerpts", composer: "Béla Bartók",
    title: "Concerto for Orchestra, Mvt. V — Violin 2 (mm. 265–325)",
    difficulty: [8, 9],
    description: "Concerto for Orchestra, Mvt. V — Violin 2: mm. 265–325",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/bartok-concerto-for-orchestra-mvt-v-mm-265-325-2nd-vln/"
  },
  {
    id: "bartok-cfo-5d-ex", tier: "core", category: "Orchestral Excerpts", composer: "Béla Bartók",
    title: "Concerto for Orchestra, Mvt. V — Violin 1 (mm. 394–436)",
    difficulty: [8, 9],
    description: "Concerto for Orchestra, Mvt. V — Violin 1: mm. 394–436",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/bartok-concerto-for-orchestra-violin-excerpt5/"
  },
  {
    id: "beethoven-1a-ex", tier: "core", category: "Orchestral Excerpts", composer: "Ludwig van Beethoven",
    title: "Symphony No. 1, Mvt. I — Violin 1 (Beginning–Reh. B)",
    difficulty: [6, 7],
    description: "Symphony No. 1, Mvt. I — Violin 1: Beginning–Reh. B",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/beethoven-symphony-1-violin-excerpt/"
  },
  {
    id: "beethoven-1b-ex", tier: "core", category: "Orchestral Excerpts", composer: "Ludwig van Beethoven",
    title: "Symphony No. 1, Mvt. III — Violin 1 (Complete Scherzo)",
    difficulty: [6, 7],
    description: "Symphony No. 1, Mvt. III — Violin 1: Complete Scherzo",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/beethoven-symphony-1-violin-excerpt-2/"
  },
  {
    id: "beethoven-3a-ex", tier: "core", category: "Orchestral Excerpts", composer: "Ludwig van Beethoven",
    title: "Symphony No. 3, Mvt. I — Violin 1 (mm. 55–73 & 571–585)",
    difficulty: [7, 8],
    description: "Symphony No. 3, Mvt. I — Violin 1: mm. 55–73 & 571–585",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/beethoven-symphony-3-violin-excerpt/"
  },
  {
    id: "beethoven-3b-ex", tier: "core", category: "Orchestral Excerpts", composer: "Ludwig van Beethoven",
    title: "Symphony No. 3, Scherzo — Violin 1 (Beginning–2nd ending)",
    difficulty: [7, 8],
    description: "Symphony No. 3, Scherzo — Violin 1: Beginning–2nd ending",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/beethoven-symphony-3-violin-excerpt-3/"
  },
  {
    id: "beethoven-6-2nd-ex", tier: "core", category: "Orchestral Excerpts", composer: "Ludwig van Beethoven",
    title: "Symphony No. 6, Mvt. IV — Violin 2 (mm. 1–19)",
    difficulty: [6, 7],
    description: "Symphony No. 6, Mvt. IV — Violin 2: mm. 1–19",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/beethoven-6-violin-excerpt/"
  },
  {
    id: "beethoven-7a-ex", tier: "core", category: "Orchestral Excerpts", composer: "Ludwig van Beethoven",
    title: "Symphony No. 7, Mvt. I — Violin 1 (mm. 83–138)",
    difficulty: [7, 8],
    description: "Symphony No. 7, Mvt. I — Violin 1: mm. 83–138",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/beethoven-symphony-7-violin-excerpt/"
  },
  {
    id: "beethoven-7b-ex", tier: "core", category: "Orchestral Excerpts", composer: "Ludwig van Beethoven",
    title: "Symphony No. 7, Mvt. II — Violin 1 (mm. 51–100)",
    difficulty: [7, 8],
    description: "Symphony No. 7, Mvt. II — Violin 1: mm. 51–100",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/beethoven-symphony-no-7-violin-excerpt/"
  },
  {
    id: "beethoven-9a-ex", tier: "core", category: "Orchestral Excerpts", composer: "Ludwig van Beethoven",
    title: "Symphony No. 9, Mvt. III — Violin 1 (mm. 99–114)",
    difficulty: [7, 8],
    description: "Symphony No. 9, Mvt. III — Violin 1: mm. 99–114",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/beethoven-symphony-9-mvt-iii/"
  },
  {
    id: "beethoven-9b-ex", tier: "core", category: "Orchestral Excerpts", composer: "Ludwig van Beethoven",
    title: "Symphony No. 9, Mvt. II — Violin 2 (2nd violin part)",
    difficulty: [7, 8],
    description: "Symphony No. 9, Mvt. II — Violin 2: 2nd violin part",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/beethoven-symphony-9-2nd-violin-excerpt/"
  },
  {
    id: "beethoven-leonora-ex", tier: "core", category: "Orchestral Excerpts", composer: "Ludwig van Beethoven",
    title: "Leonora Overture No. 3 — Violin 1 (Presto section)",
    difficulty: [7, 8],
    description: "Leonora Overture No. 3 — Violin 1: Presto section",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/beethoven-leonora-overture-violin-excerpt/"
  },
  {
    id: "beethoven-missa-ex", tier: "core", category: "Orchestral Excerpts", composer: "Ludwig van Beethoven",
    title: "Missa Solemnis, Sanctus — Concertmaster Solo (Benedictus solo)",
    difficulty: [8, 9],
    description: "Missa Solemnis, Sanctus — Concertmaster Solo: Benedictus solo",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/beethoven-missa-solemnis-sanctus-concertmaster-solo/"
  },
  {
    id: "berg-lulu-ex", tier: "core", category: "Orchestral Excerpts", composer: "Alban Berg",
    title: "Lulu, Act III — Concertmaster (Cadenza)",
    difficulty: [9, 10],
    description: "Lulu, Act III — Concertmaster: Cadenza",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/berg-lulu-concertmaster-cadenza/"
  },
  {
    id: "brahms-pc1-ex", tier: "core", category: "Orchestral Excerpts", composer: "Johannes Brahms",
    title: "Piano Concerto No. 1, Mvt. III — Violin 2 (mm. 238–274)",
    difficulty: [7, 8],
    description: "Piano Concerto No. 1, Mvt. III — Violin 2: mm. 238–274",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/brahms-piano-concerto-1-violin-excerpt/"
  },
  {
    id: "brahms-1a-ex", tier: "core", category: "Orchestral Excerpts", composer: "Johannes Brahms",
    title: "Symphony No. 1, Mvt. I — Violin 1 (Page I)",
    difficulty: [7, 8],
    description: "Symphony No. 1, Mvt. I — Violin 1: Page I",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/brahms-symphony-1-violin-excerpt/"
  },
  {
    id: "brahms-1b-ex", tier: "core", category: "Orchestral Excerpts", composer: "Johannes Brahms",
    title: "Symphony No. 1, Mvt. II — Concertmaster Solo (Reh. E–End)",
    difficulty: [8, 8],
    description: "Symphony No. 1, Mvt. II — Concertmaster Solo: Reh. E–End",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/brahms-symphony-1-mvt-ii-concertmaster-solo-reh-e-end/"
  },
  {
    id: "brahms-2a-ex", tier: "core", category: "Orchestral Excerpts", composer: "Johannes Brahms",
    title: "Symphony No. 2, Mvt. I — Violin 1 (mm. 17–66)",
    difficulty: [7, 8],
    description: "Symphony No. 2, Mvt. I — Violin 1: mm. 17–66",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/brahms-symphony-no-2-violin-excerpt/"
  },
  {
    id: "brahms-2b-ex", tier: "core", category: "Orchestral Excerpts", composer: "Johannes Brahms",
    title: "Symphony No. 2, Mvt. I — Violin 1 (mm. 101–155)",
    difficulty: [7, 8],
    description: "Symphony No. 2, Mvt. I — Violin 1: mm. 101–155",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/brahms-symphony-2-violin-excerpt/"
  },
  {
    id: "brahms-2c-ex", tier: "core", category: "Orchestral Excerpts", composer: "Johannes Brahms",
    title: "Symphony No. 2, Mvt. II — Violin 1 (mm. 51–55)",
    difficulty: [7, 7],
    description: "Symphony No. 2, Mvt. II — Violin 1: mm. 51–55",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/brahms-symphony-2-violin-excerpt-mvt-2/"
  },
  {
    id: "brahms-2d-ex", tier: "core", category: "Orchestral Excerpts", composer: "Johannes Brahms",
    title: "Symphony No. 2, Mvt. III — Violin 1 (Two excerpts)",
    difficulty: [7, 8],
    description: "Symphony No. 2, Mvt. III — Violin 1: Two excerpts",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/brahms-symphony-2-violin-excerpts-3/"
  },
  {
    id: "brahms-2e-ex", tier: "core", category: "Orchestral Excerpts", composer: "Johannes Brahms",
    title: "Symphony No. 2, Mvt. IV — Violin 1 (mm. 1–60)",
    difficulty: [7, 8],
    description: "Symphony No. 2, Mvt. IV — Violin 1: mm. 1–60",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/brahms-symphony-2-violin-excerpts-mvt-4/"
  },
  {
    id: "brahms-2f-ex", tier: "core", category: "Orchestral Excerpts", composer: "Johannes Brahms",
    title: "Symphony No. 2, Mvt. IV — Violin 1 (Three excerpts)",
    difficulty: [7, 8],
    description: "Symphony No. 2, Mvt. IV — Violin 1: Three excerpts",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/brahms-symphony-2-audition-test-pieces/"
  },
  {
    id: "brahms-3a-ex", tier: "core", category: "Orchestral Excerpts", composer: "Johannes Brahms",
    title: "Symphony No. 3, Mvt. I — Violin 1 (Beg.–Reh. B)",
    difficulty: [7, 8],
    description: "Symphony No. 3, Mvt. I — Violin 1: Beg.–Reh. B",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/brahms-symphony-3-violin-excerpt/"
  },
  {
    id: "brahms-3b-ex", tier: "core", category: "Orchestral Excerpts", composer: "Johannes Brahms",
    title: "Symphony No. 3, Mvt. I — Violin 1 (mm. 57–90)",
    difficulty: [7, 8],
    description: "Symphony No. 3, Mvt. I — Violin 1: mm. 57–90",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/brahms-symphony-3-mvt-i-m-57-90/"
  },
  {
    id: "brahms-3c-ex", tier: "core", category: "Orchestral Excerpts", composer: "Johannes Brahms",
    title: "Symphony No. 3, Mvt. I — Violin 1 (mm. 183–212)",
    difficulty: [7, 8],
    description: "Symphony No. 3, Mvt. I — Violin 1: mm. 183–212",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/brahms-symphony-3-mvt-i-mm183-212/"
  },
  {
    id: "brahms-3d-ex", tier: "core", category: "Orchestral Excerpts", composer: "Johannes Brahms",
    title: "Symphony No. 3, Mvt. II — Violin 1 (mm. 62–80)",
    difficulty: [7, 8],
    description: "Symphony No. 3, Mvt. II — Violin 1: mm. 62–80",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/brahms-symphony-3-mvt-ii-mm-62-80/"
  },
  {
    id: "brahms-3e-ex", tier: "core", category: "Orchestral Excerpts", composer: "Johannes Brahms",
    title: "Symphony No. 3, Mvt. III — Violin 1 (mm. 12–41)",
    difficulty: [7, 8],
    description: "Symphony No. 3, Mvt. III — Violin 1: mm. 12–41",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/brahms-symphony-3-mvt-iii-mm-12-41/"
  },
  {
    id: "brahms-3f-ex", tier: "core", category: "Orchestral Excerpts", composer: "Johannes Brahms",
    title: "Symphony No. 3, Mvt. IV — Violin 1 (mm. 30–105)",
    difficulty: [7, 8],
    description: "Symphony No. 3, Mvt. IV — Violin 1: mm. 30–105",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/4165-2/"
  },
  {
    id: "brahms-3g-ex", tier: "core", category: "Orchestral Excerpts", composer: "Johannes Brahms",
    title: "Symphony No. 3, Mvt. IV — Violin 1 (mm. 149–172)",
    difficulty: [7, 8],
    description: "Symphony No. 3, Mvt. IV — Violin 1: mm. 149–172",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/brahms-symphony-3-mvt-iv-mm-149-172/"
  },
  {
    id: "brahms-4a-ex", tier: "core", category: "Orchestral Excerpts", composer: "Johannes Brahms",
    title: "Symphony No. 4, Mvt. I — Violin 1 (Page I (opening))",
    difficulty: [8, 9],
    description: "Symphony No. 4, Mvt. I — Violin 1: Page I (opening)",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/brahms-symphony-4-violin-excerpt-3/"
  },
  {
    id: "brahms-4b-ex", tier: "core", category: "Orchestral Excerpts", composer: "Johannes Brahms",
    title: "Symphony No. 4, Mvt. I — Violin 1 (mm. 392–end)",
    difficulty: [8, 9],
    description: "Symphony No. 4, Mvt. I — Violin 1: mm. 392–end",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/brahms-symphony-4-violin-excerpt-2/"
  },
  {
    id: "brahms-4c-ex", tier: "core", category: "Orchestral Excerpts", composer: "Johannes Brahms",
    title: "Symphony No. 4, Mvt. II — Violin 1 (mm. 30–40)",
    difficulty: [7, 7],
    description: "Symphony No. 4, Mvt. II — Violin 1: mm. 30–40",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/brahms-symphony-4-mvt-ii/"
  },
  {
    id: "brahms-4d-ex", tier: "core", category: "Orchestral Excerpts", composer: "Johannes Brahms",
    title: "Symphony No. 4, Mvt. II — Violin 1 (mm. 74–102)",
    difficulty: [7, 8],
    description: "Symphony No. 4, Mvt. II — Violin 1: mm. 74–102",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/brahms-symphony-4-violin-excerpt/"
  },
  {
    id: "brahms-4e-ex", tier: "core", category: "Orchestral Excerpts", composer: "Johannes Brahms",
    title: "Symphony No. 4, Mvt. III — Violin 1 (Beginning–Reh. B)",
    difficulty: [8, 9],
    description: "Symphony No. 4, Mvt. III — Violin 1: Beginning–Reh. B",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/brahms-symphony-no-4-violin-excerpt-mvt-iii/"
  },
  {
    id: "brahms-4f-ex", tier: "core", category: "Orchestral Excerpts", composer: "Johannes Brahms",
    title: "Symphony No. 4, Mvt. IV — Violin 1 (mm. 33–80)",
    difficulty: [8, 9],
    description: "Symphony No. 4, Mvt. IV — Violin 1: mm. 33–80",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/brahms-symphony-4-violin-audition-excerpt/"
  },
  {
    id: "brahms-4g-ex", tier: "core", category: "Orchestral Excerpts", composer: "Johannes Brahms",
    title: "Symphony No. 4, Mvt. IV — Violin 1 (mm. 169–199)",
    difficulty: [8, 9],
    description: "Symphony No. 4, Mvt. IV — Violin 1: mm. 169–199",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/brahms-symphony-4-mvt-iv-mm-169-199/"
  },
  {
    id: "bruckner-9-2nd-ex", tier: "core", category: "Orchestral Excerpts", composer: "Anton Bruckner",
    title: "Symphony No. 9, Mvt. III — Violin 2 (mm. 57–65)",
    difficulty: [7, 8],
    description: "Symphony No. 9, Mvt. III — Violin 2: mm. 57–65",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/bruckner-symphony-9-2nd-violin-excerpt/"
  },
  {
    id: "copland-3-ex", tier: "core", category: "Orchestral Excerpts", composer: "Aaron Copland",
    title: "Symphony No. 3, Mvt. IV — Violin 1 (Reh. 90–98)",
    difficulty: [7, 8],
    description: "Symphony No. 3, Mvt. IV — Violin 1: Reh. 90–98",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/view-the-copland-symphony-3-violin-excerpt-from-mvt-4/"
  },
  {
    id: "debussy-mer-1-ex", tier: "core", category: "Orchestral Excerpts", composer: "Claude Debussy",
    title: "La Mer — Violin 1 (Reh. 19–20)",
    difficulty: [8, 9],
    description: "La Mer — Violin 1: Reh. 19–20",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/debussy-la-mer-violin-excerpt-1/"
  },
  {
    id: "debussy-mer-2-ex", tier: "core", category: "Orchestral Excerpts", composer: "Claude Debussy",
    title: "La Mer — Violin 1 (Reh. 33–38)",
    difficulty: [8, 9],
    description: "La Mer — Violin 1: Reh. 33–38",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/debussy-la-mer-violin-excerpt-2/"
  },
  {
    id: "debussy-mer-3-ex", tier: "core", category: "Orchestral Excerpts", composer: "Claude Debussy",
    title: "La Mer — Violin 1 (Reh. 47–48)",
    difficulty: [8, 9],
    description: "La Mer — Violin 1: Reh. 47–48",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/debussy-la-mer-violin-excerpt-3/"
  },
  {
    id: "debussy-faun-ex", tier: "core", category: "Orchestral Excerpts", composer: "Claude Debussy",
    title: "Prélude à l'après-midi d'un faune — Violin 1 (Solo/section passages)",
    difficulty: [7, 8],
    description: "Prélude à l'après-midi d'un faune — Violin 1: Solo/section passages",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/debussy-prelude-to-the-afternoon-excerpt/"
  },
  {
    id: "dvorak-cello-cm-ex", tier: "core", category: "Orchestral Excerpts", composer: "Antonín Dvořák",
    title: "Cello Concerto, Mvt. III — Concertmaster Solo (Reh. 11–12)",
    difficulty: [7, 8],
    description: "Cello Concerto, Mvt. III — Concertmaster Solo: Reh. 11–12",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/dvorak-cello-concerto-concertmaster-excerpt/"
  },
  {
    id: "dvorak-7-ex", tier: "core", category: "Orchestral Excerpts", composer: "Antonín Dvořák",
    title: "Symphony No. 7, Mvt. I — Violin 1 (Reh. D–H)",
    difficulty: [7, 8],
    description: "Symphony No. 7, Mvt. I — Violin 1: Reh. D–H",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/violin-dvorak-symphony-no-7-mvt-i-violin-excerpt/"
  },
  {
    id: "dvorak-8-cm-ex", tier: "core", category: "Orchestral Excerpts", composer: "Antonín Dvořák",
    title: "Symphony No. 8, Mvt. II — Concertmaster Solo (Complete solo)",
    difficulty: [7, 8],
    description: "Symphony No. 8, Mvt. II — Concertmaster Solo: Complete solo",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/dvorak-symphony-8-concertmaster-excerpt/"
  },
  {
    id: "dvorak-serenade-ex", tier: "core", category: "Orchestral Excerpts", composer: "Antonín Dvořák",
    title: "Serenade in E major, Op. 22, Mvt. II — Violin 1 (Beginning–5m after [D])",
    difficulty: [6, 7],
    description: "Serenade in E major, Op. 22, Mvt. II — Violin 1: Beginning–5m after [D]",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/dvorak-serenade-op-22-mvt-ii-beginning-5m-d/"
  },
  {
    id: "elgar-enigma-2nd-ex", tier: "core", category: "Orchestral Excerpts", composer: "Edward Elgar",
    title: "Enigma Variations, Var. No. 2 — Violin 2 (Complete variation)",
    difficulty: [6, 7],
    description: "Enigma Variations, Var. No. 2 — Violin 2: Complete variation",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/elgar-enigma-variations-violin-excerpt/"
  },
  {
    id: "gershwin-porgy-ex", tier: "core", category: "Orchestral Excerpts", composer: "George Gershwin",
    title: "Porgy and Bess, Introduction — Violin 1 (Beginning–7m of C)",
    difficulty: [7, 8],
    description: "Porgy and Bess, Introduction — Violin 1: Beginning–7m of C",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/gershwin-porgy-bess-introduction/"
  },
  {
    id: "gounod-faust-ex", tier: "core", category: "Orchestral Excerpts", composer: "Charles Gounod",
    title: "Faust, Act III, Cavatine — Concertmaster Solo (Complete cavatine solo)",
    difficulty: [7, 8],
    description: "Faust, Act III, Cavatine — Concertmaster Solo: Complete cavatine solo",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/gounod-faust-act-iii-cavatine/"
  },
  {
    id: "grofe-canyon-ex", tier: "core", category: "Orchestral Excerpts", composer: "Ferde Grofé",
    title: "Grand Canyon Suite, Mvt. III 'On the Trail' — Concertmaster Solo (Complete solo)",
    difficulty: [7, 8],
    description: "Grand Canyon Suite, Mvt. III 'On the Trail' — Concertmaster Solo: Complete solo",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/grofe-grand-canyon-violin-excerpt/"
  },
  {
    id: "haydn-6-ex", tier: "core", category: "Orchestral Excerpts", composer: "Joseph Haydn",
    title: "Symphony No. 6 'Le Matin', Mvt. II — Concertmaster Solo (mm. 18–43)",
    difficulty: [6, 7],
    description: "Symphony No. 6 'Le Matin', Mvt. II — Concertmaster Solo: mm. 18–43",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/haydn-symphony-6-le-matin-mvt-ii-mm-18-43/"
  },
  {
    id: "haydn-103-ex", tier: "core", category: "Orchestral Excerpts", composer: "Joseph Haydn",
    title: "Symphony No. 103 'Drumroll', Mvt. II — Concertmaster Solo (mm. 85–107)",
    difficulty: [6, 7],
    description: "Symphony No. 103 'Drumroll', Mvt. II — Concertmaster Solo: mm. 85–107",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/haydn-symphony-103-mvt-ii-violin-solo-mm-85-107/"
  },
  {
    id: "mahler-1-4-ex", tier: "core", category: "Orchestral Excerpts", composer: "Gustav Mahler",
    title: "Symphony No. 1, Mvt. IV — Violin 1 (Reh. 16–19)",
    difficulty: [7, 8],
    description: "Symphony No. 1, Mvt. IV — Violin 1: Reh. 16–19",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/mahler-symphony-1-mvt-4-reh-16-19/"
  },
  {
    id: "mahler-4-1-ex", tier: "core", category: "Orchestral Excerpts", composer: "Gustav Mahler",
    title: "Symphony No. 4, Mvt. I — Violin 1 (Reh. 11–12)",
    difficulty: [7, 8],
    description: "Symphony No. 4, Mvt. I — Violin 1: Reh. 11–12",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/violin-mahler-symphony-4-mvt-i-reh-11-12/"
  },
  {
    id: "mahler-4-4-ex", tier: "core", category: "Orchestral Excerpts", composer: "Gustav Mahler",
    title: "Symphony No. 4, Mvt. IV — Violin 1 (4m after #12–4m before #13)",
    difficulty: [7, 8],
    description: "Symphony No. 4, Mvt. IV — Violin 1: 4m after #12–4m before #13",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/violin-mahler-symphony-no-4-mvt-iv-replace-audio/"
  },
  {
    id: "mahler-5-1-ex", tier: "core", category: "Orchestral Excerpts", composer: "Gustav Mahler",
    title: "Symphony No. 5, Mvt. I — Violin 1 (Reh. 7–11)",
    difficulty: [8, 9],
    description: "Symphony No. 5, Mvt. I — Violin 1: Reh. 7–11",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/mahler-symphony-5-mvt-1-reh-7-11/"
  },
  {
    id: "mahler-5-3-ex", tier: "core", category: "Orchestral Excerpts", composer: "Gustav Mahler",
    title: "Symphony No. 5, Mvt. III — Violin 1 (13 after Reh. 30–End)",
    difficulty: [8, 9],
    description: "Symphony No. 5, Mvt. III — Violin 1: 13 after Reh. 30–End",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/mahler-symphony-no-5-violin-excerpt/"
  },
  {
    id: "mahler-5-4-ex", tier: "core", category: "Orchestral Excerpts", composer: "Gustav Mahler",
    title: "Symphony No. 5, Mvt. IV (Adagietto) — Violin 1 (Beg.–5m before #2)",
    difficulty: [8, 8],
    description: "Symphony No. 5, Mvt. IV (Adagietto) — Violin 1: Beg.–5m before #2",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/mahler-symphony-5-mvt-iv-adagietto-beg-til-2/"
  },
  {
    id: "mahler-9-1a-ex", tier: "core", category: "Orchestral Excerpts", composer: "Gustav Mahler",
    title: "Symphony No. 9, Mvt. I — Violin 1 (m. 223–Reh. 13)",
    difficulty: [8, 9],
    description: "Symphony No. 9, Mvt. I — Violin 1: m. 223–Reh. 13",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/mahler-symphony-no-9-mvt-9-m-223-until-reh-13/"
  },
  {
    id: "mahler-9-1b-ex", tier: "core", category: "Orchestral Excerpts", composer: "Gustav Mahler",
    title: "Symphony No. 9, Mvt. I — Violin 2 (mm. 346–375)",
    difficulty: [8, 9],
    description: "Symphony No. 9, Mvt. I — Violin 2: mm. 346–375",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/mahler-symphony-9-2nd-violin-excerpt/"
  },
  {
    id: "mahler-9-4-ex", tier: "core", category: "Orchestral Excerpts", composer: "Gustav Mahler",
    title: "Symphony No. 9, Mvt. IV — Violin 2 (mm. 1–28)",
    difficulty: [8, 8],
    description: "Symphony No. 9, Mvt. IV — Violin 2: mm. 1–28",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/mahler-symphony-9-mvt-iv-mm-1-28-2nd-vln-2/"
  },
  {
    id: "massenet-werther-ex", tier: "core", category: "Orchestral Excerpts", composer: "Jules Massenet",
    title: "Werther, Act III — Violin 1 (2m before 140–10m after 141)",
    difficulty: [7, 8],
    description: "Werther, Act III — Violin 1: 2m before 140–10m after 141",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/werther-violin-excerpt/"
  },
  {
    id: "mendelssohn-mnd-ov-ex", tier: "core", category: "Orchestral Excerpts", composer: "Felix Mendelssohn",
    title: "A Midsummer Night's Dream, Overture — Violin 1 (mm. 6–81)",
    difficulty: [8, 8],
    description: "A Midsummer Night's Dream, Overture — Violin 1: mm. 6–81",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/violin-mendelssohn-midsummer-nights-dream-overture/"
  },
  {
    id: "mendelssohn-mnd-sc-ex", tier: "core", category: "Orchestral Excerpts", composer: "Felix Mendelssohn",
    title: "A Midsummer Night's Dream, Scherzo — Violin 1 (mm. 17–99)",
    difficulty: [8, 8],
    description: "A Midsummer Night's Dream, Scherzo — Violin 1: mm. 17–99",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/mendelssohn-midsummers-night-dream-violin-excerpt/"
  },
  {
    id: "mendelssohn-4-ex", tier: "core", category: "Orchestral Excerpts", composer: "Felix Mendelssohn",
    title: "Symphony No. 4, Mvt. I — Violin 1 (mm. 1–110)",
    difficulty: [7, 8],
    description: "Symphony No. 4, Mvt. I — Violin 1: mm. 1–110",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/mendelssohn-symphony-4-violin-excerpt/"
  },
  {
    id: "mozart-dongiovanni-ex", tier: "core", category: "Orchestral Excerpts", composer: "Wolfgang Amadeus Mozart",
    title: "Don Giovanni, Overture — Violin 1 (Molto allegro–Reh. D)",
    difficulty: [7, 8],
    description: "Don Giovanni, Overture — Violin 1: Molto allegro–Reh. D",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/violin-mozart-overture-to-don-giovanni-molto-allegro-d/"
  },
  {
    id: "mozart-flute-ov-ex", tier: "core", category: "Orchestral Excerpts", composer: "Wolfgang Amadeus Mozart",
    title: "Die Zauberflöte, Overture — Violin 1 & 2 (mm. 16–60)",
    difficulty: [7, 8],
    description: "Die Zauberflöte, Overture — Violin 1 & 2: mm. 16–60",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/mozart-magic-flute-violin-excerpt/"
  },
  {
    id: "mozart-flute-act1-ex", tier: "core", category: "Orchestral Excerpts", composer: "Wolfgang Amadeus Mozart",
    title: "Die Zauberflöte, Act I Introduction — Violin 1 (Introduction)",
    difficulty: [6, 7],
    description: "Die Zauberflöte, Act I Introduction — Violin 1: Introduction",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/mozart-magic-flute-act-introduction/"
  },
  {
    id: "mozart-flute-act2-ex", tier: "core", category: "Orchestral Excerpts", composer: "Wolfgang Amadeus Mozart",
    title: "Die Zauberflöte, Act II Terzett — Violin 1 (No. 16 Terzett)",
    difficulty: [6, 7],
    description: "Die Zauberflöte, Act II Terzett — Violin 1: No. 16 Terzett",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/mozart-magic-flute-act-ii-16-terzetto/"
  },
  {
    id: "mozart-figaro-2nd-ex", tier: "core", category: "Orchestral Excerpts", composer: "Wolfgang Amadeus Mozart",
    title: "Le nozze di Figaro, Overture — Violin 2 (Page 1)",
    difficulty: [7, 8],
    description: "Le nozze di Figaro, Overture — Violin 2: Page 1",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/mozart-marriage-of-figaro-2nd-violin-excerpt/"
  },
  {
    id: "mozart-figaro-act1-ex", tier: "core", category: "Orchestral Excerpts", composer: "Wolfgang Amadeus Mozart",
    title: "Le nozze di Figaro, Act I No. 5 — Violin 2 (mm. 1–36)",
    difficulty: [6, 7],
    description: "Le nozze di Figaro, Act I No. 5 — Violin 2: mm. 1–36",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/mozart-marriage-of-figaro-act-i-no-5-mm-1-36/"
  },
  {
    id: "mozart-35a-ex", tier: "core", category: "Orchestral Excerpts", composer: "Wolfgang Amadeus Mozart",
    title: "Symphony No. 35, Mvt. I — Violin 1 (mm. 1–66)",
    difficulty: [6, 7],
    description: "Symphony No. 35, Mvt. I — Violin 1: mm. 1–66",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/mozart-symphony-35-mvt-mm1-96-b/"
  },
  {
    id: "mozart-35b-ex", tier: "core", category: "Orchestral Excerpts", composer: "Wolfgang Amadeus Mozart",
    title: "Symphony No. 35, Mvt. II — Violin 1 (mm. 1–35)",
    difficulty: [6, 7],
    description: "Symphony No. 35, Mvt. II — Violin 1: mm. 1–35",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/mozart-symphony-35-mvt-ii-mm-1-35/"
  },
  {
    id: "mozart-35-2nd-ex", tier: "core", category: "Orchestral Excerpts", composer: "Wolfgang Amadeus Mozart",
    title: "Symphony No. 35, Mvt. IV — Violin 2 (Two excerpts)",
    difficulty: [6, 7],
    description: "Symphony No. 35, Mvt. IV — Violin 2: Two excerpts",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/mozart-symphony-35-2nd-violin-excerpt/"
  },
  {
    id: "mozart-39a-ex", tier: "core", category: "Orchestral Excerpts", composer: "Wolfgang Amadeus Mozart",
    title: "Symphony No. 39, Mvt. I — Violin 1 (mm. 1–16)",
    difficulty: [6, 7],
    description: "Symphony No. 39, Mvt. I — Violin 1: mm. 1–16",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/mozart-symphony-39-violin-excerpt/"
  },
  {
    id: "mozart-39b-ex", tier: "core", category: "Orchestral Excerpts", composer: "Wolfgang Amadeus Mozart",
    title: "Symphony No. 39, Mvt. I — Violin 1 (Allegro–Reh. C)",
    difficulty: [7, 8],
    description: "Symphony No. 39, Mvt. I — Violin 1: Allegro–Reh. C",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/mozart-39-violin-audition-excerpt/"
  },
  {
    id: "mozart-39c-ex", tier: "core", category: "Orchestral Excerpts", composer: "Wolfgang Amadeus Mozart",
    title: "Symphony No. 39, Mvt. II — Violin 1 (mm. 1–27)",
    difficulty: [6, 7],
    description: "Symphony No. 39, Mvt. II — Violin 1: mm. 1–27",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/mozart-symphony-39-movement-2/"
  },
  {
    id: "mozart-39d-ex", tier: "core", category: "Orchestral Excerpts", composer: "Wolfgang Amadeus Mozart",
    title: "Symphony No. 39, Mvt. II — Violin 1 (mm. 96–126)",
    difficulty: [6, 7],
    description: "Symphony No. 39, Mvt. II — Violin 1: mm. 96–126",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/mozart-symphony-39-mvt-ii-96-126/"
  },
  {
    id: "mozart-39e-ex", tier: "core", category: "Orchestral Excerpts", composer: "Wolfgang Amadeus Mozart",
    title: "Symphony No. 39, Mvt. IV — Violin 1 (Beginning–Reh. B)",
    difficulty: [7, 8],
    description: "Symphony No. 39, Mvt. IV — Violin 1: Beginning–Reh. B",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/mozart-symphony-39-mvt-iv/"
  },
  {
    id: "mozart-41a-2nd-ex", tier: "core", category: "Orchestral Excerpts", composer: "Wolfgang Amadeus Mozart",
    title: "Symphony No. 41, Mvt. IV — Violin 2 (Beg.–m. 157)",
    difficulty: [7, 8],
    description: "Symphony No. 41, Mvt. IV — Violin 2: Beg.–m. 157",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/mozart-symphony-41-mvt-iv-beginning-m-157-2nd-vln/"
  },
  {
    id: "mozart-41b-2nd-ex", tier: "core", category: "Orchestral Excerpts", composer: "Wolfgang Amadeus Mozart",
    title: "Symphony No. 41, Mvt. IV — Violin 2 (mm. 272–313)",
    difficulty: [7, 8],
    description: "Symphony No. 41, Mvt. IV — Violin 2: mm. 272–313",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/mozart-41-2nd-violin-excerpt/"
  },
  {
    id: "mozart-vc4-ex", tier: "core", category: "Orchestral Excerpts", composer: "Wolfgang Amadeus Mozart",
    title: "Violin Concerto No. 4, Mvt. I — Violin 1 (Exposition)",
    difficulty: [7, 8],
    description: "Violin Concerto No. 4, Mvt. I — Violin 1: Exposition",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/mozart-violin-concerto-4-mvt-exposition/"
  },
  {
    id: "prokofiev-classical-1-ex", tier: "core", category: "Orchestral Excerpts", composer: "Sergei Prokofiev",
    title: "Symphony No. 1 (Classical), Mvt. I — Violin 1 (Beginning–Reh. H)",
    difficulty: [7, 8],
    description: "Symphony No. 1 (Classical), Mvt. I — Violin 1: Beginning–Reh. H",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/prokofiev-classical-symphony-mvt-i-page-1/"
  },
  {
    id: "prokofiev-classical-2-ex", tier: "core", category: "Orchestral Excerpts", composer: "Sergei Prokofiev",
    title: "Symphony No. 1 (Classical), Mvt. II — Violin 1 (Reh. A–C)",
    difficulty: [7, 8],
    description: "Symphony No. 1 (Classical), Mvt. II — Violin 1: Reh. A–C",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/prokofiev-classical-symphony-violin-excerpt-mvt-ii-2/"
  },
  {
    id: "prokofiev-romeo-death-ex", tier: "core", category: "Orchestral Excerpts", composer: "Sergei Prokofiev",
    title: "Romeo and Juliet, 'Death of Tybalt' — Violin 1 (Reh. 70–74)",
    difficulty: [8, 8],
    description: "Romeo and Juliet, 'Death of Tybalt' — Violin 1: Reh. 70–74",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/prokofiev-romeo-and-juliet-violin-excerp/"
  },
  {
    id: "prokofiev-5-1-ex", tier: "core", category: "Orchestral Excerpts", composer: "Sergei Prokofiev",
    title: "Symphony No. 5, Mvt. I — Violin 1 (Reh. 22–1m before 23)",
    difficulty: [7, 8],
    description: "Symphony No. 5, Mvt. I — Violin 1: Reh. 22–1m before 23",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/prokofiev-symphony-5-mvt-i-reh-22-until-1m-before-reh-23/"
  },
  {
    id: "prokofiev-5-3-ex", tier: "core", category: "Orchestral Excerpts", composer: "Sergei Prokofiev",
    title: "Symphony No. 5, Mvt. III — Violin 1 (Reh. 72–2m after 73)",
    difficulty: [7, 8],
    description: "Symphony No. 5, Mvt. III — Violin 1: Reh. 72–2m after 73",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/prokofiev-symphony-no-5-mvt-iii-reh-72-until-2m-after-reh-73/"
  },
  {
    id: "puccini-butterfly-1a-ex", tier: "core", category: "Orchestral Excerpts", composer: "Giacomo Puccini",
    title: "Madame Butterfly, Act I — Violin 1 (Beginning–5m after [3])",
    difficulty: [7, 8],
    description: "Madame Butterfly, Act I — Violin 1: Beginning–5m after [3]",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/violin-puccini-madame-butterfly-beginning-5m-3/"
  },
  {
    id: "puccini-butterfly-1b-ex", tier: "core", category: "Orchestral Excerpts", composer: "Giacomo Puccini",
    title: "Madame Butterfly, Act I — Violin 1 (Reh. 39–41)",
    difficulty: [7, 8],
    description: "Madame Butterfly, Act I — Violin 1: Reh. 39–41",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/puccini-madame-butterfly-act-reh-39-41/"
  },
  {
    id: "puccini-butterfly-1c-ex", tier: "core", category: "Orchestral Excerpts", composer: "Giacomo Puccini",
    title: "Madame Butterfly, Act I — Violin 1 (Reh. 128–2m after 132)",
    difficulty: [7, 8],
    description: "Madame Butterfly, Act I — Violin 1: Reh. 128–2m after 132",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/puccini-madame-butterfly-act-reh-128-2m-132/"
  },
  {
    id: "puccini-butterfly-3-ex", tier: "core", category: "Orchestral Excerpts", composer: "Giacomo Puccini",
    title: "Madame Butterfly, Prelude to Act III — Violin 1 (Reh. 10–13)",
    difficulty: [7, 8],
    description: "Madame Butterfly, Prelude to Act III — Violin 1: Reh. 10–13",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/puccini-violin-excerpt/"
  },
  {
    id: "puccini-turandot-ex", tier: "core", category: "Orchestral Excerpts", composer: "Giacomo Puccini",
    title: "Turandot, Act I — Violin 1 (Reh. 3–7)",
    difficulty: [7, 8],
    description: "Turandot, Act I — Violin 1: Reh. 3–7",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/puccini-turandot-violin-excerpt/"
  },
  {
    id: "rach-2-fugue-ex", tier: "core", category: "Orchestral Excerpts", composer: "Sergei Rachmaninov",
    title: "Symphony No. 2, Mvt. II — Violin 2 (Fugue)",
    difficulty: [7, 8],
    description: "Symphony No. 2, Mvt. II — Violin 2: Fugue",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/rachmaninov-symphony-2-violin-excerpt/"
  },
  {
    id: "rach-dances-ex", tier: "core", category: "Orchestral Excerpts", composer: "Sergei Rachmaninov",
    title: "Symphonic Dances, Mvt. I — Violin 1 (3m after Reh. 6–Reh. 8)",
    difficulty: [7, 8],
    description: "Symphonic Dances, Mvt. I — Violin 1: 3m after Reh. 6–Reh. 8",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/rachmaninoff-symphonic-dances-mvt-3m-reh-6-reh-8/"
  },
  {
    id: "rk-scheh-1-ex", tier: "core", category: "Orchestral Excerpts", composer: "Nikolai Rimsky-Korsakov",
    title: "Scheherazade, Mvt. I — Concertmaster Solo (3 solos)",
    difficulty: [8, 9],
    description: "Scheherazade, Mvt. I — Concertmaster Solo: 3 solos",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/scheherezade-concertmaster-excerpts/"
  },
  {
    id: "rk-scheh-2-ex", tier: "core", category: "Orchestral Excerpts", composer: "Nikolai Rimsky-Korsakov",
    title: "Scheherazade, Mvt. II — Concertmaster Solo (Solo passage)",
    difficulty: [8, 9],
    description: "Scheherazade, Mvt. II — Concertmaster Solo: Solo passage",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/scheherazade-concertmaster-solo/"
  },
  {
    id: "rk-scheh-3-ex", tier: "core", category: "Orchestral Excerpts", composer: "Nikolai Rimsky-Korsakov",
    title: "Scheherazade, Mvt. III — Concertmaster Solo (Solo passage)",
    difficulty: [8, 9],
    description: "Scheherazade, Mvt. III — Concertmaster Solo: Solo passage",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/scheherazade-audition-excerpt/"
  },
  {
    id: "rk-scheh-4-ex", tier: "core", category: "Orchestral Excerpts", composer: "Nikolai Rimsky-Korsakov",
    title: "Scheherazade, Mvt. IV — Concertmaster Solo (3 solos)",
    difficulty: [8, 9],
    description: "Scheherazade, Mvt. IV — Concertmaster Solo: 3 solos",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/scheherazade-violin-solo/"
  },
  {
    id: "rk-capriccio-3-ex", tier: "core", category: "Orchestral Excerpts", composer: "Nikolai Rimsky-Korsakov",
    title: "Capriccio Espagnol, Mvt. III — Concertmaster Solo (Solo cadenza)",
    difficulty: [8, 9],
    description: "Capriccio Espagnol, Mvt. III — Concertmaster Solo: Solo cadenza",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/rimsky-korsakov-capriccio-espagnol-mvt-iii-concertmaster-solo/"
  },
  {
    id: "rk-capriccio-4-ex", tier: "core", category: "Orchestral Excerpts", composer: "Nikolai Rimsky-Korsakov",
    title: "Capriccio Espagnol, Mvt. IV — Concertmaster Solo (Solo cadenza)",
    difficulty: [8, 9],
    description: "Capriccio Espagnol, Mvt. IV — Concertmaster Solo: Solo cadenza",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/rimsky-korsakov-capriccio-espagnol-mvt-iv-concertmaster-solo/"
  },
  {
    id: "rossini-armida-ex", tier: "core", category: "Orchestral Excerpts", composer: "Gioachino Rossini",
    title: "Armida, Act III Duet — Concertmaster Solo (No. 13 solo)",
    difficulty: [7, 8],
    description: "Armida, Act III Duet — Concertmaster Solo: No. 13 solo",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/rossini-armida-act-iii-no-13-duet-concertmaster-solo/"
  },
  {
    id: "schubert-2-ex", tier: "core", category: "Orchestral Excerpts", composer: "Franz Schubert",
    title: "Symphony No. 2, Mvt. I — Violin 1 (mm. 11–64)",
    difficulty: [6, 7],
    description: "Symphony No. 2, Mvt. I — Violin 1: mm. 11–64",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/schubert-symphony-2-mvt-1-mm11-64/"
  },
  {
    id: "schubert-4-2nd-ex", tier: "core", category: "Orchestral Excerpts", composer: "Franz Schubert",
    title: "Symphony No. 4, Mvt. IV — Violin 2 (mm. 63–114)",
    difficulty: [6, 7],
    description: "Symphony No. 4, Mvt. IV — Violin 2: mm. 63–114",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/schubert-symphony-4-violin-excerpt/"
  },
  {
    id: "schumann-2a-ex", tier: "core", category: "Orchestral Excerpts", composer: "Robert Schumann",
    title: "Symphony No. 2, Scherzo — Violin 1 (Page 1)",
    difficulty: [7, 8],
    description: "Symphony No. 2, Scherzo — Violin 1: Page 1",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/schumann-symphony-2-scherzo-2/"
  },
  {
    id: "schumann-2b-ex", tier: "core", category: "Orchestral Excerpts", composer: "Robert Schumann",
    title: "Symphony No. 2, Scherzo — Violin 1 (Coda)",
    difficulty: [7, 8],
    description: "Symphony No. 2, Scherzo — Violin 1: Coda",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/schumann-scherzo-coda/"
  },
  {
    id: "shostakovich-5a-ex", tier: "core", category: "Orchestral Excerpts", composer: "Dmitri Shostakovich",
    title: "Symphony No. 5, Mvt. I — Violin 1 (Reh. 9–13)",
    difficulty: [7, 8],
    description: "Symphony No. 5, Mvt. I — Violin 1: Reh. 9–13",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/shostakovich-symphony-5-violin-excerpt/"
  },
  {
    id: "shostakovich-5b-ex", tier: "core", category: "Orchestral Excerpts", composer: "Dmitri Shostakovich",
    title: "Symphony No. 5, Mvt. I — Violin 1 (Reh. 32–36)",
    difficulty: [7, 8],
    description: "Symphony No. 5, Mvt. I — Violin 1: Reh. 32–36",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/shostakovich-symphony-5-violin-excerpt-2/"
  },
  {
    id: "shostakovich-nose-ex", tier: "core", category: "Orchestral Excerpts", composer: "Dmitri Shostakovich",
    title: "The Nose — Concertmaster (2 solos)",
    difficulty: [8, 9],
    description: "The Nose — Concertmaster: 2 solos",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/shostakovich-nose-2-concertmaster-solo/"
  },
  {
    id: "smetana-bride-2nd-ex", tier: "core", category: "Orchestral Excerpts", composer: "Bedřich Smetana",
    title: "The Bartered Bride, Overture — Violin 2 (Complete overture)",
    difficulty: [8, 8],
    description: "The Bartered Bride, Overture — Violin 2: Complete overture",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/bartered-bride-violin-excerpt/"
  },
  {
    id: "jstrauss-fledermaus-ex", tier: "core", category: "Orchestral Excerpts", composer: "Johann Strauss II",
    title: "Die Fledermaus, Overture — Violin 1 (2 excerpts)",
    difficulty: [6, 7],
    description: "Die Fledermaus, Overture — Violin 1: 2 excerpts",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/die-fledermaus-overture-violin-excerpts/"
  },
  {
    id: "rstrauss-zarath-cm-ex", tier: "core", category: "Orchestral Excerpts", composer: "Richard Strauss",
    title: "Also sprach Zarathustra — Concertmaster Solo (Reh. 26–31)",
    difficulty: [8, 9],
    description: "Also sprach Zarathustra — Concertmaster Solo: Reh. 26–31",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/r-strauss-also-sprach-zarathustra-concertmaster-solo-reh-26-31/"
  },
  {
    id: "rstrauss-alpine-2nda-ex", tier: "core", category: "Orchestral Excerpts", composer: "Richard Strauss",
    title: "Alpine Symphony — Violin 2 (Reh. 130–134)",
    difficulty: [7, 8],
    description: "Alpine Symphony — Violin 2: Reh. 130–134",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/strauss-alpine-symphony-excerpt/"
  },
  {
    id: "rstrauss-alpine-2ndb-ex", tier: "core", category: "Orchestral Excerpts", composer: "Richard Strauss",
    title: "Alpine Symphony — Violin 2 (Reh. 138–142)",
    difficulty: [7, 8],
    description: "Alpine Symphony — Violin 2: Reh. 138–142",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/r-strauss-alpine-symphony-reh-138-142-2nd-vln/"
  },
  {
    id: "rstrauss-burger-ex", tier: "core", category: "Orchestral Excerpts", composer: "Richard Strauss",
    title: "Der Bürger als Edelmann, No. 4 — Concertmaster (Complete solo)",
    difficulty: [7, 8],
    description: "Der Bürger als Edelmann, No. 4 — Concertmaster: Complete solo",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/r-strauss-der-burger-als-edelmann-concertmaster-excerpt/"
  },
  {
    id: "rstrauss-rosen-1-ex", tier: "core", category: "Orchestral Excerpts", composer: "Richard Strauss",
    title: "Der Rosenkavalier, Act I — Violin 1 (Beginning–Reh. 8)",
    difficulty: [8, 9],
    description: "Der Rosenkavalier, Act I — Violin 1: Beginning–Reh. 8",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/r-strauss-der-rosenkavalier-introduction-act-beginning-reh-8/"
  },
  {
    id: "rstrauss-rosen-2a-ex", tier: "core", category: "Orchestral Excerpts", composer: "Richard Strauss",
    title: "Der Rosenkavalier, Act II — Violin 2 (Reh. 22–24)",
    difficulty: [7, 8],
    description: "Der Rosenkavalier, Act II — Violin 2: Reh. 22–24",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/strauss-der-rosenkavalier-violin-excerpt/"
  },
  {
    id: "rstrauss-rosen-2b-ex", tier: "core", category: "Orchestral Excerpts", composer: "Richard Strauss",
    title: "Der Rosenkavalier, Act II — Violin 1 (Reh. 98–99)",
    difficulty: [8, 8],
    description: "Der Rosenkavalier, Act II — Violin 1: Reh. 98–99",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/strauss-der-rosenkavalier-excerpt/"
  },
  {
    id: "rstrauss-rosen-cm-ex", tier: "core", category: "Orchestral Excerpts", composer: "Richard Strauss",
    title: "Der Rosenkavalier — Concertmaster (3 solos)",
    difficulty: [8, 9],
    description: "Der Rosenkavalier — Concertmaster: 3 solos",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/r-strauss-der-rosenkavalier-3-concertmaster-excerpts/"
  },
  {
    id: "rstrauss-donjuan-1-ex", tier: "core", category: "Orchestral Excerpts", composer: "Richard Strauss",
    title: "Don Juan, Op. 20 — Violin 1 (Page I (opening))",
    difficulty: [9, 9],
    description: "Don Juan, Op. 20 — Violin 1: Page I (opening)",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/strauss-don-juan-violin-excerpt/"
  },
  {
    id: "rstrauss-donjuan-2-ex", tier: "core", category: "Orchestral Excerpts", composer: "Richard Strauss",
    title: "Don Juan, Op. 20 — Violin 1 (Reh. Q–U)",
    difficulty: [9, 9],
    description: "Don Juan, Op. 20 — Violin 1: Reh. Q–U",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/strauss-don-juan-op-20-reh-q-u/"
  },
  {
    id: "rstrauss-held-ex", tier: "core", category: "Orchestral Excerpts", composer: "Richard Strauss",
    title: "Ein Heldenleben — Concertmaster Solo (Extended solo)",
    difficulty: [9, 10],
    description: "Ein Heldenleben — Concertmaster Solo: Extended solo",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/ein-heldenleben-concertmaster-excerpt/"
  },
  {
    id: "rstrauss-salome-ex", tier: "core", category: "Orchestral Excerpts", composer: "Richard Strauss",
    title: "Salome — Violin 1 (Three excerpts)",
    difficulty: [8, 9],
    description: "Salome — Violin 1: Three excerpts",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/r-strauss-salome-2-excerpts/"
  },
  {
    id: "rstrauss-till-ex2", tier: "core", category: "Orchestral Excerpts", composer: "Richard Strauss",
    title: "Till Eulenspiegel — Violin 1 (Reh. 29–32)",
    difficulty: [8, 9],
    description: "Till Eulenspiegel — Violin 1: Reh. 29–32",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/r-strauss-till-eulenspiegel-reh-29-32/"
  },
  {
    id: "stravinsky-concD-2nda-ex", tier: "core", category: "Orchestral Excerpts", composer: "Igor Stravinsky",
    title: "Concerto in D for Strings, Mvt. I — Violin 2 (Reh. 5–17)",
    difficulty: [7, 8],
    description: "Concerto in D for Strings, Mvt. I — Violin 2: Reh. 5–17",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/stravinsky-audition-excerpt/"
  },
  {
    id: "stravinsky-concD-2ndb-ex", tier: "core", category: "Orchestral Excerpts", composer: "Igor Stravinsky",
    title: "Concerto in D for Strings, Mvt. I — Violin 2 (Reh. 38–44)",
    difficulty: [7, 8],
    description: "Concerto in D for Strings, Mvt. I — Violin 2: Reh. 38–44",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/stravinsky-violin-excerpt/"
  },
  {
    id: "stravinsky-pulcinella-ex", tier: "core", category: "Orchestral Excerpts", composer: "Igor Stravinsky",
    title: "Pulcinella Suite, Tarantella — Violin 2 Solo (Reh. 54–62)",
    difficulty: [7, 8],
    description: "Pulcinella Suite, Tarantella — Violin 2 Solo: Reh. 54–62",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/stravinsky-pulcinella-suite-mvt-iv-tarantella-2nd-violin-solo-part/"
  },
  {
    id: "stravinsky-rite-ex", tier: "core", category: "Orchestral Excerpts", composer: "Igor Stravinsky",
    title: "Rite of Spring — Violin 1 (Reh. 72–79)",
    difficulty: [8, 9],
    description: "Rite of Spring — Violin 1: Reh. 72–79",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/stravinsky-rite-of-spring-violin-excerpt/"
  },
  {
    id: "tchaikovsky-nut-a-ex", tier: "core", category: "Orchestral Excerpts", composer: "Pyotr Ilyich Tchaikovsky",
    title: "Nutcracker, Overture — Violin 1 (Reh. C–D)",
    difficulty: [6, 7],
    description: "Nutcracker, Overture — Violin 1: Reh. C–D",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/nutcracker-violin-excerpt/"
  },
  {
    id: "tchaikovsky-nut-b-ex", tier: "core", category: "Orchestral Excerpts", composer: "Pyotr Ilyich Tchaikovsky",
    title: "Nutcracker, Overture — Violin 1 (Last 49 measures)",
    difficulty: [6, 7],
    description: "Nutcracker, Overture — Violin 1: Last 49 measures",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/tchaikovsky-nutcracker-overture/"
  },
  {
    id: "tchaikovsky-4a-ex", tier: "core", category: "Orchestral Excerpts", composer: "Pyotr Ilyich Tchaikovsky",
    title: "Symphony No. 4, Mvt. I — Violin 1 (Reh. H–L)",
    difficulty: [8, 9],
    description: "Symphony No. 4, Mvt. I — Violin 1: Reh. H–L",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/tchaikovsky-symphony-4-violin-excerpt/"
  },
  {
    id: "tchaikovsky-4b-ex", tier: "core", category: "Orchestral Excerpts", composer: "Pyotr Ilyich Tchaikovsky",
    title: "Symphony No. 4, Mvt. I — Violin 1 (Reh. V–end)",
    difficulty: [8, 9],
    description: "Symphony No. 4, Mvt. I — Violin 1: Reh. V–end",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/tchaikovsky-symphony-4-audition-excerpt/"
  },
  {
    id: "tchaikovsky-5a-ex", tier: "core", category: "Orchestral Excerpts", composer: "Pyotr Ilyich Tchaikovsky",
    title: "Symphony No. 5, Mvt. II — Violin 1 (B–9 before D)",
    difficulty: [7, 8],
    description: "Symphony No. 5, Mvt. II — Violin 1: B–9 before D",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/violin-tchaikovsky-symphony-no-5-mvt-ii-b-until-9-before-d/"
  },
  {
    id: "tchaikovsky-5b-ex", tier: "core", category: "Orchestral Excerpts", composer: "Pyotr Ilyich Tchaikovsky",
    title: "Symphony No. 5, Mvt. IV — Violin 1 (504–8 before Ee)",
    difficulty: [7, 8],
    description: "Symphony No. 5, Mvt. IV — Violin 1: 504–8 before Ee",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/tchaikovsky-5-mvt-4/"
  },
  {
    id: "tchaikovsky-swan-ex", tier: "core", category: "Orchestral Excerpts", composer: "Pyotr Ilyich Tchaikovsky",
    title: "Swan Lake, Suite No. 4 — Concertmaster Solo (Complete solo)",
    difficulty: [7, 8],
    description: "Swan Lake, Suite No. 4 — Concertmaster Solo: Complete solo",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/swan-lake-violin-excerpt/"
  },
  {
    id: "verdi-doncarlo-ex", tier: "core", category: "Orchestral Excerpts", composer: "Giuseppe Verdi",
    title: "Don Carlo, Act V — Violin 1 (Act V excerpt)",
    difficulty: [7, 8],
    description: "Don Carlo, Act V — Violin 1: Act V excerpt",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/verdi-don-carlo-act-v/"
  },
  {
    id: "verdi-falstaff-1-ex", tier: "core", category: "Orchestral Excerpts", composer: "Giuseppe Verdi",
    title: "Falstaff, Act I Part I — Violin 1 (Reh. 13–14)",
    difficulty: [7, 8],
    description: "Falstaff, Act I Part I — Violin 1: Reh. 13–14",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/verdi-falstaff-violin-excerpt/"
  },
  {
    id: "verdi-falstaff-2-ex", tier: "core", category: "Orchestral Excerpts", composer: "Giuseppe Verdi",
    title: "Falstaff, Act II Part II — Violin 1 (Reh. 47–48)",
    difficulty: [7, 8],
    description: "Falstaff, Act II Part II — Violin 1: Reh. 47–48",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/verdi-falstaff-act-ii-scene-ii-reh-47-48/"
  },
  {
    id: "verdi-traviata-ex", tier: "core", category: "Orchestral Excerpts", composer: "Giuseppe Verdi",
    title: "La Traviata, Act III Prelude — Violin 1 (Complete prelude)",
    difficulty: [6, 7],
    description: "La Traviata, Act III Prelude — Violin 1: Complete prelude",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/verdi-la-traviata-act-iii-prelude-page-1/"
  },
  {
    id: "verdi-ballo-ex", tier: "core", category: "Orchestral Excerpts", composer: "Giuseppe Verdi",
    title: "Un Ballo in Maschera — Violin 1 (Reh. 36 for 8m.)",
    difficulty: [7, 8],
    description: "Un Ballo in Maschera — Violin 1: Reh. 36 for 8m.",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/verdi-un-ballo-maschera-act-iii-reh-36/"
  },
  {
    id: "weber-oberon-ex", tier: "core", category: "Orchestral Excerpts", composer: "Carl Maria von Weber",
    title: "Overture to Oberon — Violin 1 (Two excerpts)",
    difficulty: [7, 8],
    description: "Overture to Oberon — Violin 1: Two excerpts",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/oberon-overture-violin-excerpt/"
  },
  {
    id: "wagner-siegfried-ex", tier: "core", category: "Orchestral Excerpts", composer: "Richard Wagner",
    title: "Siegfried, Act I Scene 3 — Violin 1 ([97]–[98])",
    difficulty: [7, 8],
    description: "Siegfried, Act I Scene 3 — Violin 1: [97]–[98]",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/violin-wagner-siegfried-act-scene-3-97-2m-98/"
  },
  {
    id: "wagner-tristan-ex", tier: "core", category: "Orchestral Excerpts", composer: "Richard Wagner",
    title: "Tristan und Isolde — Violin 1 (4 excerpts)",
    difficulty: [8, 9],
    description: "Tristan und Isolde — Violin 1: 4 excerpts",
    editions: "Standard orchestral parts.",
    orchestraExcerptsUrl: "http://orchestraexcerpts.com/violin-wagner-tristan-isolde-4-excerpts/"
  }
,
  {
    id: "kuchler-op11", tier: "core", category: "Concerti", composer: "Küchler",
    title: "Concertino in G Major, Op. 11",
    difficulty: [2, 2],
    description: "Beginner concertino in first position. Standard early student piece.",
    editions: "Various standard editions."
  },
  {
    id: "kuchler-op15", tier: "core", category: "Concerti", composer: "Küchler",
    title: "Concerto in the Style of Vivaldi, Op. 15",
    difficulty: [3, 3],
    description: "First-position concerto mimicking Vivaldi's style. Popular student piece.",
    editions: "Various standard editions.",
    examLevel: "ABRSM 3 (Allegro assai from Concertino in D Op. 15 is Grade 3 List A)"
  },
  {
    id: "fiocco-allegro", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Fiocco",
    title: "Allegro in G major",
    difficulty: [3, 3],
    description: "Bright, tuneful Baroque-style piece. Standard student recital work.",
    editions: "Various standard editions."
  },
  {
    id: "millies-mozart", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Millies",
    title: "Concerto in D Major in the Style of Mozart",
    difficulty: [3, 3],
    description: "First-position concerto imitating Mozart's style. Good student introduction to Classical style.",
    editions: "Various standard editions."
  },
  {
    id: "jenkins-elves", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Jenkins",
    title: "Elves' Dance",
    difficulty: [3, 3],
    description: "Charming character piece in first position. Standard student recital piece.",
    editions: "Various standard editions."
  },
  {
    id: "mollenhauer-infant", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Mollenhauer",
    title: "The Infant Paganini",
    difficulty: [3, 3],
    description: "Virtuosic-sounding student piece. Motivating for young players.",
    editions: "Various standard editions."
  },
  {
    id: "mollenhauer-boy", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Mollenhauer",
    title: "The Boy Paganini",
    difficulty: [4, 4],
    description: "Slightly more advanced than 'Infant.' Good student showpiece.",
    editions: "Various standard editions."
  },
  {
    id: "severn-polish", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Severn",
    title: "Polish Dance",
    difficulty: [3, 3],
    description: "Lively character piece. Standard student recital and competition piece.",
    editions: "Various standard editions."
  },
  {
    id: "portnoff-emin", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Portnoff",
    title: "Concertino in E minor, Op. 13",
    difficulty: [2, 2],
    description: "Short student concertino. Good introduction to minor keys.",
    editions: "Various standard editions."
  },
  {
    id: "portnoff-amin", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Portnoff",
    title: "Concertino in A minor, Op. 14",
    difficulty: [3, 3],
    description: "Slightly more advanced than Op. 13. Standard student piece.",
    editions: "Various standard editions."
  },
  {
    id: "kroll-donkey", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Kroll",
    title: "Donkey Doodle",
    difficulty: [2, 2],
    description: "Humorous student piece. Fun recital work for young players.",
    editions: "Various standard editions."
  },
  {
    id: "trott-puppet", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Trott",
    title: "The Puppet-Show",
    difficulty: [2, 2],
    description: "Character piece for early students. Appealing musical content.",
    editions: "Various standard editions."
  },
  {
    id: "dvorak-sonatina", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Dvořák",
    title: "Sonatina, Op. 100",
    difficulty: [4, 4],
    description: "Charming four-movement work using American-inspired melodies. Standard intermediate student piece. The Larghetto is particularly beautiful.",
    editions: "Various standard editions.",
    examLevel: "RCM 8; ASTACAP 6"
  },
  {
    id: "rach-vocalise", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Rachmaninov",
    title: "Vocalise, Op. 34/14",
    difficulty: [4, 4],
    description: "One of the most beloved melodies in music. Develops sustained cantabile and vibrato control.",
    editions: "Various standard editions."
  },
  {
    id: "debussy-flaxen", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Debussy",
    title: "Girl with the Flaxen Hair (arr.)",
    difficulty: [4, 4],
    description: "Impressionist miniature arranged for violin. Develops tonal color and delicacy.",
    editions: "Various standard editions."
  },
  {
    id: "bloch-nigun", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Ernest Bloch",
    title: "Nigun (from Baal Shem)",
    difficulty: [6, 6],
    description: "Intensely emotional, rhapsodic work inspired by Hasidic improvisation. Demands passionate cantabile and dramatic projection.",
    editions: "Various standard editions.",
    examLevel: "RCM 10; ASTACAP 9"
  },
  {
    id: "falla-suite", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Manuel de Falla",
    title: "Suite populaire espagnole",
    difficulty: [6, 6],
    description: "Six Spanish folk-inspired movements. Demands rhythmic vitality and Spanish character.",
    editions: "Various standard editions."
  },
  {
    id: "sinding-suite", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Christian Sinding",
    title: "Suite in A minor, Op. 10",
    difficulty: [6, 6],
    description: "Four-movement work popular in Scandinavian pedagogy. The Presto finale is a standard encore.",
    editions: "Various standard editions.",
    examLevel: "RCM 10"
  },
  {
    id: "stravinsky-duo", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Igor Stravinsky",
    title: "Duo Concertante",
    difficulty: [6, 6],
    description: "Neoclassical work of great refinement. Five movements exploring different textures.",
    editions: "Various standard editions.",
    examLevel: "ARCT"
  },
  {
    id: "stravinsky-suite-it", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Igor Stravinsky",
    title: "Suite italienne (from Pulcinella)",
    difficulty: [6, 6],
    description: "Charming neoclassical arrangements. Good introduction to Stravinsky's lighter style.",
    editions: "Various standard editions.",
    examLevel: "ARCT; ABRSM 8 (Introduzione & Serenata are Grade 8 List A)"
  },
  {
    id: "szymanowski-mythes", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Karol Szymanowski",
    title: "Mythes, Op. 30",
    difficulty: [6, 6],
    description: "Three impressionistic tone poems of extraordinary beauty. 'The Fountain of Arethusa' is the most famous.",
    editions: "Various standard editions.",
    examLevel: "ARCT"
  },
  {
    id: "szymanowski-noct-tar", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Karol Szymanowski",
    title: "Nocturne and Tarantelle",
    difficulty: [6, 6],
    description: "Atmospheric Nocturne followed by a virtuosic Tarantelle. Important Polish repertoire.",
    editions: "Various standard editions.",
    examLevel: "ARCT"
  },
  {
    id: "copland-sonata", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Aaron Copland",
    title: "Sonata for Violin and Piano (1943)",
    difficulty: [6, 6],
    description: "Spacious, American work. Clean, open textures with hymn-like themes. Important American sonata.",
    editions: "Various standard editions."
  },
  {
    id: "schubert-fantasy", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Franz Schubert",
    title: "Fantasy in C major, D. 934",
    difficulty: [7, 7],
    description: "Vast, virtuosic single-movement work (~30 min). Demands bravura technique and sustained concentration.",
    editions: "Various standard editions."
  },
  {
    id: "schubert-rondeau", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Franz Schubert",
    title: "Rondeau brillant in B minor, Op. 70",
    difficulty: [7, 7],
    description: "Brilliant showpiece. Clean passage work and Schubertian lyricism.",
    editions: "Various standard editions."
  },
  {
    id: "schubert-duo", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Franz Schubert",
    title: "Duo Sonata in A major, D. 574",
    difficulty: [7, 7],
    description: "Beautiful, substantial sonata. Lyrical and technically demanding.",
    editions: "Various standard editions."
  },
  {
    id: "schumann-sonatas", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Robert Schumann",
    title: "Sonatas, Op. 105 & 121",
    difficulty: [7, 7],
    description: "Two passionate Romantic sonatas. Op. 105 in A minor is more compact; Op. 121 in D minor is grander.",
    editions: "Various standard editions."
  },
  {
    id: "suk-4pieces", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Josef Suk",
    title: "Four Pieces, Op. 17",
    difficulty: [7, 7],
    description: "Charming Czech miniatures. Beautiful melodic writing.",
    editions: "Various standard editions.",
    examLevel: "ABRSM 8 (Op. 17 No. 3 is Grade 8 List B)"
  },
  {
    id: "gershwin-porgy-heifetz", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Gershwin–Heifetz",
    title: "Selections from Porgy and Bess",
    difficulty: [7, 7],
    description: "Heifetz's celebrated arrangements. Demanding and crowd-pleasing.",
    editions: "Various standard editions."
  },
  {
    id: "copland-hoedown", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Copland–arr.",
    title: "Hoe Down from Rodeo",
    difficulty: [7, 7],
    description: "Energetic American showpiece arrangement.",
    editions: "Various standard editions.",
    examLevel: "RCM 10; ASTACAP 10"
  },
  {
    id: "rimsky-bumblebee", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Rimsky-Korsakov",
    title: "Flight of the Bumblebee (arr.)",
    difficulty: [7, 7],
    description: "The famous perpetual-motion showpiece. Tests rapid, even chromatic scales.",
    editions: "Various standard editions."
  },
  {
    id: "dinicu-hora", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Dinicu–Heifetz",
    title: "Hora Staccato",
    difficulty: [8, 8],
    description: "Rapid staccato showpiece. Heifetz's famous arrangement demands brilliant articulation.",
    editions: "Various standard editions.",
    examLevel: "ARCT"
  },
  {
    id: "elgar-capricieuse", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Edward Elgar",
    title: "La Capricieuse, Op. 17",
    difficulty: [8, 8],
    description: "Elegant salon piece. Light, brilliant, with charm.",
    editions: "Various standard editions."
  },
  {
    id: "paganini-moto", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Niccolò Paganini",
    title: "Moto Perpetuo, Op. 11",
    difficulty: [8, 8],
    description: "Relentless perpetual motion. Tests even spiccato at extreme speed.",
    editions: "Various standard editions.",
    examLevel: "ARCT"
  },
  {
    id: "paganini-moses", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Niccolò Paganini",
    title: "Moses Fantasy (Variations on G string)",
    difficulty: [8, 8],
    description: "Variations played entirely on the G string. Extreme position work.",
    editions: "Various standard editions."
  },
  {
    id: "paganini-cantabile", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Niccolò Paganini",
    title: "Cantabile & Waltz; Sonata in E minor",
    difficulty: [8, 8],
    description: "Charming short pieces. The Sonata is a substantial student work.",
    editions: "Various standard editions."
  },
  {
    id: "wieniawski-op15", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Henryk Wieniawski",
    title: "Original Theme with Variations, Op. 15",
    difficulty: [8, 8],
    description: "Virtuosic variation set. Standard competition piece.",
    editions: "Various standard editions."
  },
  {
    id: "wieniawski-pol-d", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Henryk Wieniawski",
    title: "Polonaise brillante in D major, Op. 4",
    difficulty: [8, 8],
    description: "Grand festive showpiece. Demands broad tone and double stops.",
    editions: "Various standard editions.",
    examLevel: "ARCT"
  },
  {
    id: "wieniawski-pol-a", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Henryk Wieniawski",
    title: "Polonaise brillante in A major, Op. 21",
    difficulty: [8, 8],
    description: "Another brilliant polonaise. Standard competition repertoire.",
    editions: "Various standard editions.",
    examLevel: "ARCT"
  },
  {
    id: "sarasate-zapateado", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Pablo de Sarasate",
    title: "Zapateado, Op. 23/2",
    difficulty: [8, 8],
    description: "Virtuosic Spanish dance. Rapid spiccato and rhythmic drive.",
    editions: "Various standard editions.",
    examLevel: "ARCT"
  },
  {
    id: "sarasate-caprice", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Pablo de Sarasate",
    title: "Caprice Basque, Op. 24",
    difficulty: [6, 6],
    description: "Virtuosic showpiece with Basque character.",
    editions: "Various standard editions."
  },
  {
    id: "sarasate-habanera", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Pablo de Sarasate",
    title: "Habanera, Op. 21/2",
    difficulty: [6, 6],
    description: "Sensuous dance. Rubato and tonal color.",
    editions: "Various standard editions.",
    examLevel: "ARCT; ABRSM 7 (Playera Op. 23 is Grade 7 List B)"
  },
  {
    id: "sarasate-romanza", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Pablo de Sarasate",
    title: "Romanza Andaluza, Op. 22/1",
    difficulty: [6, 6],
    description: "Lyrical Spanish miniature.",
    editions: "Various standard editions."
  },
  {
    id: "tchaikovsky-3pieces", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Pyotr Ilyich Tchaikovsky",
    title: "3 Pieces, Op. 42 (Meditation, Scherzo, Mélodie)",
    difficulty: [5, 5],
    description: "Three contrasting character pieces. The Meditation is especially beautiful.",
    editions: "Various standard editions."
  },
  {
    id: "tchaikovsky-serenade-mel", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Pyotr Ilyich Tchaikovsky",
    title: "Sérénade mélancolique, Op. 26",
    difficulty: [5, 5],
    description: "Poignant, lyrical single-movement work. Develops Russian cantabile.",
    editions: "Various standard editions.",
    examLevel: "RCM 10"
  },
  {
    id: "tchaikovsky-valse", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Pyotr Ilyich Tchaikovsky",
    title: "Valse-Scherzo, Op. 34",
    difficulty: [9, 9],
    description: "Brilliant virtuoso waltz. Demanding passage work and rhythmic sparkle.",
    editions: "Various standard editions.",
    examLevel: "ARCT"
  },
  {
    id: "paganini-ipalpiti", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Niccolò Paganini",
    title: "I Palpiti, Op. 13",
    difficulty: [10, 10],
    description: "Variations of extreme difficulty on an operatic theme. Peak virtuosity.",
    editions: "Various standard editions."
  },
  {
    id: "ries-perpetuum", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Ferdinand Ries",
    title: "Perpetuum Mobile, Op. 34/5",
    difficulty: [5, 5],
    description: "Energetic perpetual-motion piece. Good intermediate showpiece.",
    editions: "Various standard editions."
  },
  {
    id: "leclair-sonata-d", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Jean-Marie Leclair",
    title: "Sonata in D major, Op. 9/3",
    difficulty: [6, 6],
    description: "Fine Baroque sonata combining French and Italian styles.",
    editions: "Various standard editions."
  },
  {
    id: "saint-saens-sonata1", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Camille Saint-Saëns",
    title: "Sonata in D minor, No. 1, Op. 75",
    difficulty: [6, 6],
    description: "Substantial Romantic sonata. Cyclical form and brilliant finale.",
    editions: "Various standard editions."
  },
  {
    id: "tartini-didone", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Giuseppe Tartini",
    title: "Sonata 'Didone abbandonata', Op. 1/10",
    difficulty: [5, 5],
    description: "Dramatic Baroque sonata with operatic character.",
    editions: "Various standard editions.",
    examLevel: "RCM 9; ASTACAP 7"
  },
  {
    id: "dvorak-romance-f", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Antonín Dvořák",
    title: "Romance in F minor, Op. 11",
    difficulty: [8, 8],
    description: "Lyrical orchestral work often performed with piano. Beautiful cantabile.",
    editions: "Various standard editions.",
    examLevel: "RCM 10"
  },
  {
    id: "beriot-9", tier: "core", category: "Concerti", composer: "Charles de Bériot",
    title: "Concerto No. 9 in A minor, Op. 104",
    difficulty: [5, 5],
    description: "Standard intermediate concerto from the Franco-Belgian school. Elegant writing with moderate virtuosity.",
    editions: "Various standard editions.",
    examLevel: "RCM 9; ASTACAP 8"
  },
  {
    id: "beriot-scene", tier: "core", category: "Concerti", composer: "Charles de Bériot",
    title: "Scène de Ballet, Op. 100",
    difficulty: [5, 5],
    description: "Charming ballet-inspired showpiece. Elegant and accessible.",
    editions: "Various standard editions."
  },
  {
    id: "viotti-22", tier: "core", category: "Concerti", composer: "Giovanni Battista Viotti",
    title: "Concerto No. 22 in A minor",
    difficulty: [7, 7],
    description: "Important Classical concerto bridging Viotti and the Romantic era. Standard intermediate-advanced repertoire.",
    editions: "Various standard editions.",
    examLevel: "RCM 10; ASTACAP 9"
  },
  {
    id: "viotti-23", tier: "core", category: "Concerti", composer: "Giovanni Battista Viotti",
    title: "Concerto No. 23 in G major",
    difficulty: [7, 7],
    description: "Companion to No. 22. Brilliant and Classical in style.",
    editions: "Various standard editions.",
    examLevel: "RCM 9; ASTACAP 7"
  },
  {
    id: "beethoven-romance-g", tier: "core", category: "Concerti", composer: "Ludwig van Beethoven",
    title: "Romance in G major, Op. 40",
    difficulty: [6, 6],
    description: "Beloved short orchestral work. Lyrical and accessible. Standard student piece.",
    editions: "Various standard editions.",
    examLevel: "RCM 10 (Op. 40); ASTACAP 9"
  },
  {
    id: "beethoven-romance-f", tier: "core", category: "Concerti", composer: "Ludwig van Beethoven",
    title: "Romance in F major, Op. 50",
    difficulty: [6, 6],
    description: "Companion to Op. 40. Equally beautiful and slightly more demanding.",
    editions: "Various standard editions.",
    examLevel: "RCM 9 (Op. 50); ASTACAP 8"
  },
  {
    id: "kreisler-vivaldi-c", tier: "core", category: "Concerti", composer: "Kreisler (in the style of Vivaldi)",
    title: "Concerto in C major",
    difficulty: [6, 6],
    description: "Kreisler's charming pastiche. Standard intermediate concerto.",
    editions: "Various standard editions."
  },
  {
    id: "mendelssohn-dmin", tier: "core", category: "Concerti", composer: "Felix Mendelssohn",
    title: "Concerto in D minor (1822, youthful)",
    difficulty: [7, 7],
    description: "Mendelssohn's teenage concerto. Charming and well-crafted. Good pre-Op. 64 preparation.",
    editions: "Various standard editions."
  },
  {
    id: "mendelssohn-double-vp", tier: "core", category: "Concerti", composer: "Felix Mendelssohn",
    title: "Double Concerto in D minor for Violin and Piano",
    difficulty: [7, 7],
    description: "Unusual concerto for violin and piano as dual soloists. Brilliant and rarely performed.",
    editions: "Various standard editions."
  },
  {
    id: "vaughanwilliams-lark", tier: "core", category: "Concerti", composer: "Ralph Vaughan Williams",
    title: "The Lark Ascending (1914/20)",
    difficulty: [7, 7],
    description: "One of the most beloved English works. Pastoral, improvisatory character. Demands sustained lyricism and folk-like freedom.",
    editions: "Various standard editions.",
    examLevel: "ARCT"
  },
  {
    id: "bartok-rhapsody1", tier: "core", category: "Concerti", composer: "Béla Bartók",
    title: "Rhapsody No. 1 for Violin and Orchestra",
    difficulty: [7, 7],
    description: "Folk-inspired two-part work (Lassan-Friss). Rhythmic vitality and folk character.",
    editions: "Various standard editions.",
    examLevel: "ARCT"
  },
  {
    id: "bartok-rhapsody2", tier: "core", category: "Concerti", composer: "Béla Bartók",
    title: "Rhapsody No. 2 for Violin and Orchestra",
    difficulty: [7, 7],
    description: "Similar structure to No. 1 but more virtuosic. Important 20th-century repertoire.",
    editions: "Various standard editions."
  },
  {
    id: "beethoven-triple", tier: "core", category: "Concerti", composer: "Ludwig van Beethoven",
    title: "Triple Concerto, Op. 56",
    difficulty: [7, 7],
    description: "Concerto for violin, cello, and piano. The violin part is less dominant than in a solo concerto.",
    editions: "Various standard editions."
  },
  {
    id: "bartok-concerto1", tier: "core", category: "Concerti", composer: "Béla Bartók",
    title: "Violin Concerto No. 1 (1908, posthumous)",
    difficulty: [7, 7],
    description: "Early, post-Romantic work. Two movements: slow and fast. Lush and passionate.",
    editions: "Various standard editions."
  },
  {
    id: "bruch-2", tier: "core", category: "Concerti", composer: "Max Bruch",
    title: "Concerto No. 2 in D minor, Op. 44",
    difficulty: [8, 8],
    description: "Less famous than No. 1 but powerful. Rich orchestration and passionate writing.",
    editions: "Various standard editions."
  },
  {
    id: "spohr-8", tier: "core", category: "Concerti", composer: "Louis Spohr",
    title: "Concerto No. 8 in A minor, Op. 47 ('Gesangsszene')",
    difficulty: [8, 8],
    description: "Unique single-movement concerto cast as an operatic scena. Original and expressive.",
    editions: "Various standard editions."
  },
  {
    id: "brahms-double", tier: "core", category: "Concerti", composer: "Johannes Brahms",
    title: "Double Concerto in A minor, Op. 102",
    difficulty: [9, 9],
    description: "Concerto for violin and cello. Brahms's final orchestral work. Grand and autumnal.",
    editions: "Various standard editions.",
    examLevel: "RCM 9"
  },
  {
    id: "penderecki-vc", tier: "core", category: "Concerti", composer: "Krzysztof Penderecki",
    title: "Violin Concerto No. 1 (1976–77)",
    difficulty: [8, 8],
    description: "Intense, expressionist concerto. Extended techniques and extreme demands. Important late-20th-century work.",
    editions: "Various standard editions.",
    examLevel: "ARCT"
  },
  {
    id: "szymanowski-2", tier: "core", category: "Concerti", composer: "Karol Szymanowski",
    title: "Violin Concerto No. 2, Op. 61 (1933)",
    difficulty: [9, 9],
    description: "More folk-influenced than No. 1. Polish mountaineer rhythms. Virtuosic and colorful.",
    editions: "Various standard editions."
  },
  {
    id: "bartok-concerto2", tier: "core", category: "Concerti", composer: "Béla Bartók",
    title: "Violin Concerto No. 2 (1938)",
    difficulty: [10, 10],
    description: "One of the greatest 20th-century concerti. Monumental three-movement work of profound complexity.",
    editions: "Various standard editions.",
    examLevel: "ARCT (listed as VMC Level 10)"
  },
  {
    id: "paganini-2", tier: "core", category: "Concerti", composer: "Niccolò Paganini",
    title: "Concerto No. 2 in B minor, Op. 7 ('La Campanella')",
    difficulty: [10, 10],
    description: "The 'Bell' Concerto. Famous Rondo finale inspired Liszt. Extreme virtuosity.",
    editions: "Various standard editions."
  },
  {
    id: "wieniawski-1-conc", tier: "core", category: "Concerti", composer: "Henryk Wieniawski",
    title: "Concerto No. 1 in F-sharp minor, Op. 14",
    difficulty: [10, 10],
    description: "More ambitious and demanding than No. 2. Extended virtuosic writing.",
    editions: "Various standard editions."
  },
  {
    id: "hummel-suite", tier: "core", category: "Solo Repertoire", subcategory: "Solo Violin", composer: "Bertold Hummel",
    title: "Suite for Solo Violin, Op. 78",
    difficulty: [9, 9],
    description: "Modern solo suite by the German composer. Demanding and musically substantial.",
    editions: "Various standard editions."
  },
  {
    id: "ernst-lastrose", tier: "core", category: "Solo Repertoire", subcategory: "Solo Violin", composer: "Heinrich Wilhelm Ernst",
    title: "The Last Rose of Summer (Variations)",
    difficulty: [10, 10],
    description: "Extreme polyphonic variations on the Irish folk tune. Among the most difficult solo violin works.",
    editions: "Various standard editions."
  },
  {
    id: "paganini-nelcor", tier: "core", category: "Solo Repertoire", subcategory: "Solo Violin", composer: "Niccolò Paganini",
    title: "Nel cor più non mi sento (Variations)",
    difficulty: [10, 10],
    description: "Variations of extreme difficulty on Paisiello's aria. Left-hand pizzicato, harmonics, every virtuoso device.",
    editions: "Various standard editions."
  },
  {
    id: "paganini-godsave", tier: "core", category: "Solo Repertoire", subcategory: "Solo Violin", composer: "Niccolò Paganini",
    title: "God Save the King (Variations)",
    difficulty: [10, 10],
    description: "Patriotic variations of extreme virtuosity.",
    editions: "Various standard editions."
  },
  {
    id: "wieniawski-godsave", tier: "core", category: "Solo Repertoire", subcategory: "Solo Violin", composer: "Henryk Wieniawski",
    title: "Variations on God Save the Queen",
    difficulty: [10, 10],
    description: "Brilliant patriotic variations in the Franco-Belgian bravura tradition.",
    editions: "Various standard editions."
  }
,
  {
    id: "haydn-c-concerto", tier: "core", category: "Concerti", composer: "Joseph Haydn", nationality: "Austrian", period: "Classical",
    title: "Violin Concerto No. 1 in C Major, Hob. VIIa:1 (c. 1765)",
    difficulty: [6, 7],
    description: "Haydn's first violin concerto is an elegant Classical work predating his mature symphonic style. Three compact movements with clean passage work and a lyrical slow movement. Standard intermediate-advanced student concerto.",
    editions: "Henle Verlag (Urtext); Peters; International Music Company.",
    examLevel: "RCM 9; ASTACAP 8"
  },
  {
    id: "haydn-g-concerto", tier: "core", category: "Concerti", composer: "Joseph Haydn", nationality: "Austrian", period: "Classical",
    title: "Violin Concerto No. 2 in G Major, Hob. VIIa:4 (c. 1769)",
    difficulty: [5, 6],
    description: "A graceful Classical concerto frequently assigned to intermediate students. Three movements with moderate technical demands, clean passage work, and opportunities for elegant phrasing. Good preparation for Mozart concerti.",
    editions: "Henle Verlag (Urtext); Peters; Bärenreiter.",
    examLevel: "RCM 8; ABRSM 7–8 (Hob. VIIa:4: 3rd mvt Grade 7 List A; 1st mvt Grade 8 List A); ASTACAP 6–8"
  },
  {
    id: "stamitz-concerto-g", tier: "syllabus", category: "Concerti", composer: "Carl Stamitz", nationality: "German-Czech", period: "Classical",
    title: "Violin Concerto in G Major",
    difficulty: [6, 7],
    description: "A pleasant Mannheim-school concerto useful as an intermediate student work. Clean Classical passage work and galant phrasing.",
    editions: "Peters; International Music Company.",
    examLevel: "RCM 7"
  },
  {
    id: "marcello-concerto-d", tier: "syllabus", category: "Concerti", composer: "Alessandro Marcello", nationality: "Italian", period: "Baroque",
    title: "Concerto in D Major (arr. for violin)",
    difficulty: [5, 6],
    description: "Originally a concerto for oboe, widely performed in arrangements for violin. Three movements with clean Baroque passage work. Popular student concerto.",
    editions: "Various standard editions.",
    examLevel: "RCM 7"
  },
  {
    id: "beriot-1", tier: "syllabus", category: "Concerti", composer: "Charles de Bériot", nationality: "Belgian", period: "Romantic",
    title: "Violin Concerto No. 1 in D Major, Op. 16",
    difficulty: [7, 8],
    description: "Bériot's first concerto established the Franco-Belgian concerto tradition. Elegant, singing melody with moderate virtuosity. Less frequently performed than No. 9 but musically rewarding.",
    editions: "International Music Company; Peters; Schott.",
    examLevel: "RCM 9"
  },
  {
    id: "beriot-7", tier: "syllabus", category: "Concerti", composer: "Charles de Bériot", nationality: "Belgian", period: "Romantic",
    title: "Violin Concerto No. 7 in G Major, Op. 76",
    difficulty: [7, 8],
    description: "A graceful, lyrical concerto from the Franco-Belgian school. Excellent for developing elegance and projection in a concerto context. Standard RCM Grade 9 repertoire.",
    editions: "International Music Company; Peters.",
    examLevel: "RCM 9"
  },
  {
    id: "rode-concerto-7", tier: "syllabus", category: "Concerti", composer: "Pierre Rode", nationality: "French", period: "Classical/Romantic",
    title: "Violin Concerto No. 7 in A Minor, Op. 9",
    difficulty: [7, 8],
    description: "One of Rode's most performed concerti. Clean Classical-Romantic passage work with lyrical slow movement. Important French school repertoire bridging Viotti and the Romantic era.",
    editions: "International Music Company; Peters.",
    imslp: "https://imslp.org/wiki/Violin_Concerto_No.7,_Op.9_(Rode,_Pierre)",
    examLevel: "RCM 9"
  },
  {
    id: "rode-concerto-8", tier: "syllabus", category: "Concerti", composer: "Pierre Rode", nationality: "French", period: "Classical/Romantic",
    title: "Violin Concerto No. 8 in E Minor, Op. 13",
    difficulty: [7, 8],
    description: "Perhaps the most substantial of Rode's concerti. Dramatic E minor opening, lyrical Adagio, and brilliant finale. Beethoven wrote his last violin sonata (Op. 96) for Rode.",
    editions: "International Music Company; Peters.",
    examLevel: "RCM 9"
  },
  {
    id: "kreutzer-concerto-13", tier: "syllabus", category: "Concerti", composer: "Rodolphe Kreutzer", nationality: "French", period: "Classical/Romantic",
    title: "Violin Concerto No. 13 in D Major",
    difficulty: [7, 8],
    description: "The most frequently performed of Kreutzer's 19 violin concerti. A clean, well-crafted work from the French school. Kreutzer is better known for his 42 études, but his concerti are worthy intermediate-advanced repertoire.",
    editions: "International Music Company; Peters.",
    examLevel: "RCM 9; ASTACAP 8"
  },
  {
    id: "conus-concerto", tier: "core", category: "Concerti", composer: "Julius Conus", nationality: "Russian", period: "Late Romantic",
    title: "Violin Concerto in E Minor (1898)",
    difficulty: [8, 9],
    description: "A single-movement concerto of sweeping Russian Romanticism. Heifetz's recording made it famous. Combines passionate lyricism with virtuosic passage work in a compact form. Standard competition and recital piece.",
    editions: "International Music Company; G. Schirmer.",
    examLevel: "ARCT"
  },
  {
    id: "butterfly-lovers", tier: "core", category: "Concerti", composer: "He Zhanhao & Chen Gang", nationality: "Chinese", period: "Modern",
    title: "Butterfly Lovers Violin Concerto (梁祝, 1959)",
    difficulty: [8, 9],
    description: "The most famous Chinese orchestral work, based on a Chinese legend analogous to Romeo and Juliet. Combines Western orchestral technique with Chinese pentatonic melody and erhu-like violin writing. Enormously popular in East Asia and increasingly performed worldwide. Demands lyrical singing tone, portamento, and the ability to evoke Chinese musical idiom on a Western instrument.",
    editions: "People's Music Publishing House (Beijing); various international editions.",
    examLevel: "ARCT"
  },
  {
    id: "spohr-concerto-2", tier: "syllabus", category: "Concerti", composer: "Louis Spohr", nationality: "German", period: "Romantic",
    title: "Violin Concerto No. 2 in D Minor, Op. 2 (1804)",
    difficulty: [7, 8],
    description: "An early concerto showing Spohr's gift for sustained melody and clean Classical-Romantic passage work. Less frequently performed than No. 8 but good student repertoire.",
    editions: "Peters; International Music Company; Henle Verlag.",
    examLevel: "RCM 10"
  },
  {
    id: "bacewicz-concertino", tier: "syllabus", category: "Concerti", composer: "Grażyna Bacewicz", nationality: "Polish", period: "Modern",
    title: "Concertino for Violin and Orchestra (1945)",
    difficulty: [5, 6],
    description: "A compact, neoclassical concertino by the most important Polish woman composer of the 20th century. Bacewicz was herself a distinguished concert violinist. Three short movements with folk-influenced rhythms and clean writing. Growing in popularity as a student concerto.",
    editions: "PWM (Polish Music Publishers).",
    examLevel: "RCM 5; ABRSM 4 (Prelude from Easy Pieces Book 1 is Grade 4 List A)"
  },
  {
    id: "mozart-k304", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Wolfgang Amadeus Mozart", nationality: "Austrian", period: "Classical",
    title: "Sonata in E Minor, K. 304 (1778)",
    difficulty: [6, 7],
    description: "The only Mozart violin sonata in a minor key, and one of the most emotionally intense. Two movements of extraordinary depth — written shortly after the death of Mozart's mother. The E minor tonality is rare in Mozart and gives this work a special poignancy. Essential Classical repertoire.",
    editions: "Henle Verlag (Urtext); Bärenreiter (NMA); Peters; International Music Company.",
    examLevel: "RCM 7; ABRSM 7 (1st mvt is Grade 7 List A); ASTACAP 8"
  },
  {
    id: "bartok-sonatina-vp", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Béla Bartók", nationality: "Hungarian", period: "Modern",
    title: "Sonatina for Violin and Piano (transc. Gertler, 1931)",
    difficulty: [6, 7],
    description: "Transcription of Bartók's piano Sonatina (originally based on Romanian folk dances). Three short movements of contrasting character: Dudelsackpfeifer (Bagpipers), Bärentanz (Bear Dance), Finale. More accessible than the two numbered sonatas. Standard intermediate repertoire.",
    editions: "Boosey & Hawkes; Universal Edition.",
    examLevel: "RCM 8"
  },
  {
    id: "martinu-sonatina", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Bohuslav Martinů", nationality: "Czech", period: "Modern",
    title: "Sonatina for Violin and Piano, H. 262 (1937)",
    difficulty: [5, 6],
    description: "A charming three-movement work combining Czech folk inflections with neoclassical clarity. More accessible than Martinů's larger violin sonatas. Clean textures, rhythmic vitality, and attractive melodies.",
    editions: "Leduc (original); Bärenreiter (Martinů Complete Works).",
    examLevel: "RCM 6; ABRSM 4–5 (Martinů Intermezzo is Grade 4 List B; Sonatine mvt 1 is Grade 5 List C)"
  },
  {
    id: "hindemith-sonata-eb", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Paul Hindemith", nationality: "German", period: "Modern",
    title: "Sonata in E-flat Major for Violin and Piano, Op. 11/1 (1918)",
    difficulty: [7, 8],
    description: "An early work showing Hindemith's transition from late Romanticism to his mature neoclassical style. More lyrical and accessible than the later sonatas. Four movements with rich, warm writing.",
    editions: "Schott (original publisher).",
    examLevel: "RCM 9"
  },
  {
    id: "hindemith-sonata-c", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Paul Hindemith", nationality: "German", period: "Modern",
    title: "Sonata in C Major for Violin and Piano (1939)",
    difficulty: [7, 8],
    description: "Hindemith's mature violin sonata, written in America. Four movements of contrapuntal complexity and rhythmic drive. The slow movement is deeply expressive. A cornerstone of 20th-century violin-piano literature.",
    editions: "Schott (original publisher).",
    examLevel: "RCM 10"
  },
  {
    id: "respighi-sonata-b", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Ottorino Respighi", nationality: "Italian", period: "Modern",
    title: "Sonata in B Minor for Violin and Piano (1917)",
    difficulty: [8, 9],
    description: "A passionate, large-scale sonata rarely heard in concert but of considerable quality. Three movements combining late-Romantic Italian lyricism with post-Impressionist harmony. Respighi studied violin with Sarasate's pupil Federico Sarti and briefly with Rimsky-Korsakov.",
    editions: "Bote & Bock; Ricordi.",
    examLevel: "ARCT"
  },
  {
    id: "dvorak-sonata-f", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Antonín Dvořák", nationality: "Czech", period: "Romantic",
    title: "Sonata in F Major, Op. 57 (1880)",
    difficulty: [7, 8],
    description: "Less famous than the Sonatina but a substantial, rewarding work. Three movements with Dvořák's characteristic warmth, Czech dance rhythms, and lyrical invention. Deserves wider performance.",
    editions: "Bärenreiter (Urtext); Peters; International Music Company.",
    examLevel: "ARCT"
  },
  {
    id: "achron-hebrew", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Joseph Achron", nationality: "Lithuanian-American", period: "Early 20th Century",
    title: "Hebrew Melody, Op. 33 (1911)",
    difficulty: [7, 8],
    description: "A passionate, rhapsodic miniature based on a traditional Jewish liturgical melody. Made famous by Heifetz's recording. Demands intense cantabile, rubato, and emotional projection. Standard recital encore and competition piece.",
    editions: "Carl Fischer; G. Schirmer.",
    examLevel: "RCM 9"
  },
  {
    id: "svendsen-romance", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Johan Svendsen", nationality: "Norwegian", period: "Romantic",
    title: "Romance in G Major, Op. 26 (1881)",
    difficulty: [6, 7],
    description: "A warm, lyrical Norwegian Romantic miniature. One of the most performed Scandinavian violin works alongside Grieg's sonatas. Demands sustained cantabile and tonal beauty without extreme technical demands.",
    editions: "International Music Company; Peters; Hansen.",
    examLevel: "RCM 9"
  },
  {
    id: "smetana-homeland", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Bedřich Smetana", nationality: "Czech", period: "Romantic",
    title: "From the Homeland (Z domoviny), 2 Duets for Violin and Piano (1880)",
    difficulty: [6, 7],
    description: "Two deeply personal pieces written after Smetana had become completely deaf. The first is lyrical and nostalgic; the second is a lively polka. Intensely Czech in character. Important for understanding Czech Romantic style.",
    editions: "Bärenreiter (Urtext); Supraphon; Peters.",
    examLevel: "RCM 8 (1st movement); ABRSM 7 (No. 1 is Grade 7 List B); ASTACAP 8"
  },
  {
    id: "korngold-gartenszene", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Erich Wolfgang Korngold", nationality: "Austrian-American", period: "Late Romantic/Modern",
    title: "Gartenszene from Much Ado About Nothing, Op. 11 (1919)",
    difficulty: [6, 7],
    description: "A gentle, luminous piece from Korngold's incidental music, written when the composer was just 22. Korngold's lush, late-Romantic harmonic language is immediately appealing. Growing in popularity as a recital piece.",
    editions: "Schott.",
    examLevel: "RCM 8"
  },
  {
    id: "godowsky-altwien", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Leopold Godowsky (arr. Heifetz)", nationality: "Lithuanian-American", period: "Early 20th Century",
    title: "Alt-Wien (Old Vienna), arr. Heifetz",
    difficulty: [7, 8],
    description: "Heifetz's charming arrangement of Godowsky's nostalgic Viennese waltz miniature. Demands elegant rubato, sweetness of tone, and Viennese style. A classic encore piece.",
    editions: "Carl Fischer.",
    examLevel: "RCM 9"
  },
  {
    id: "albeniz-arr", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Isaac Albéniz (arr. Kreisler)", nationality: "Spanish", period: "Romantic",
    title: "Tango, Op. 165/2; Malagueña from España, Op. 165/3 (arr. Kreisler)",
    difficulty: [6, 7],
    description: "Kreisler's beloved arrangements of Albéniz's Spanish piano pieces. The Tango is languid and sensuous; the Malagueña is brilliant. Standard encore pieces demanding Spanish character and rubato.",
    editions: "Carl Fischer; Schott.",
    examLevel: "RCM 9; ABRSM 8 (Tango Op. 165/2 arr. Kreisler is Grade 8 List B)"
  },
  {
    id: "moszkowski-guitarre", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Moritz Moszkowski", nationality: "Polish-German", period: "Romantic",
    title: "Guitarre, Op. 45/2",
    difficulty: [7, 8],
    description: "A brilliant salon piece imitating guitar strumming with left-hand pizzicato and harmonics. Popular encore piece demanding rhythmic sparkle and charm.",
    editions: "International Music Company; Peters.",
    examLevel: "RCM 10"
  },
  {
    id: "zarzycki-mazurka", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Aleksander Zarzycki", nationality: "Polish", period: "Romantic",
    title: "Mazurka in G Major, Op. 26",
    difficulty: [7, 8],
    description: "A charming Polish dance piece in the tradition of Wieniawski. Rhythmic vitality and national character. Popular competition and recital encore.",
    editions: "International Music Company; PWM.",
    examLevel: "ARCT"
  },
  {
    id: "kroll-banjo", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "William Kroll", nationality: "American", period: "20th Century",
    title: "Banjo and Fiddle (1945)",
    difficulty: [7, 8],
    description: "A virtuosic Americana showpiece imitating banjo strumming with left-hand pizzicato. Heifetz made it famous as an encore. Fun, crowd-pleasing, and technically demanding.",
    editions: "Carl Fischer.",
    examLevel: "RCM 10; ASTACAP 10"
  },
  {
    id: "hubay-hejre", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Jenő Hubay", nationality: "Hungarian", period: "Romantic",
    title: "Hejre Kati, Op. 32 (Scènes de la Csárda No. 4, c. 1882)",
    difficulty: [8, 8],
    description: "The most famous of Hubay's Scènes de la Csárda — a brilliant Hungarian showpiece with a slow, expressive lassan and a fiery, virtuosic friss. Standard encore and competition piece demanding Hungarian Gypsy character, double stops, and rapid passage work.",
    editions: "International Music Company; Peters; EMB.",
    examLevel: "RCM 9; ABRSM 7 (Bolero from Cinq morceaux Op. 51 is Grade 7 List C); ASTACAP 8"
  },
  {
    id: "piazzolla-grandtango", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Astor Piazzolla", nationality: "Argentine", period: "Modern",
    title: "Le Grand Tango (1982, arr. for violin and piano)",
    difficulty: [8, 9],
    description: "Originally for cello and piano, now widely performed in violin arrangements. A passionate, rhythmically complex tango nuevo in three connected sections. Demands tango character, rhythmic precision, and dramatic intensity. Piazzolla's most substantial chamber work.",
    editions: "Editions Henry Lemoine; Tonos.",
    examLevel: "ARCT"
  },
  {
    id: "berlioz-reverie", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Hector Berlioz", nationality: "French", period: "Romantic",
    title: "Rêverie et caprice, Op. 8 (1841)",
    difficulty: [7, 8],
    description: "Berlioz's only work for solo violin and orchestra (usually performed with piano). A lyrical Rêverie followed by a brilliant Caprice. Originally intended for the opera Benvenuto Cellini. Demands French elegance and moderate virtuosity.",
    editions: "International Music Company; Bärenreiter.",
    examLevel: "ARCT"
  },
  {
    id: "webern-4pieces", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Anton Webern", nationality: "Austrian", period: "Modern",
    title: "Four Pieces for Violin and Piano, Op. 7 (1910)",
    difficulty: [8, 9],
    description: "Four ultra-compressed atonal miniatures, none longer than a minute. Webern's earliest mature chamber work. Each piece explores extreme registral, dynamic, and timbral contrasts with remarkable economy. Essential Second Viennese School repertoire. Demands absolute control of harmonics, mutes, sul ponticello, and extreme pianissimo.",
    editions: "Universal Edition.",
    examLevel: "RCM 10; ASTACAP 10"
  },
  {
    id: "bax-legend", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Arnold Bax", nationality: "British", period: "Modern",
    title: "Legend for Violin and Piano (1915)",
    difficulty: [7, 8],
    description: "A rhapsodic, Celtic-influenced work of rich harmonic color. Bax's violin writing combines English pastoral lyricism with Impressionist harmonic language. One of the finest British violin works of its era.",
    editions: "Murdoch, Murdoch & Co.; Chester Music.",
    examLevel: "RCM 10"
  },
  {
    id: "eckhardt-caprices", tier: "core", category: "Etudes & Caprices", composer: "Sophie-Carmen Eckhardt-Gramatté", nationality: "Russian-Canadian", period: "Modern",
    title: "Ten Caprices for Solo Violin (1924–34)",
    difficulty: [9, 10],
    description: "Ten substantial unaccompanied caprices of extreme technical and musical difficulty. Eckhardt-Gramatté was a virtuoso violinist and one of Canada's most important modernist composers. The Caprices demand the full range of advanced technique — polyphony, extreme position work, every bow stroke — within a distinctive, expressionist harmonic language. Growing in recognition as significant 20th-century solo violin literature.",
    editions: "Canadian Music Centre; Waterloo Music.",
    examLevel: "RCM 9 (Caprice 1); RCM 10 (Caprices 2–3); ARCT (Caprices 5–10)"
  },
  {
    id: "bacewicz-pieces", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Grażyna Bacewicz", nationality: "Polish", period: "Modern",
    title: "Humoreska (1953); Polish Caprice (1949)",
    difficulty: [7, 8],
    description: "Two short character pieces by the distinguished Polish violinist-composer. The Humoreska is witty and rhythmically inventive; the Polish Caprice draws on folk dance rhythms. Both reflect Bacewicz's intimate knowledge of the instrument.",
    editions: "PWM (Polish Music Publishers).",
    examLevel: "RCM 9; ABRSM 8 (Polish Caprice is Grade 8 List C)"
  },
  {
    id: "dancla-op118", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Charles Dancla", nationality: "French", period: "Romantic",
    title: "Airs variés, Op. 118 (4 airs on themes of Bellini, Donizetti, Pacini, Weigl)",
    difficulty: [5, 7],
    description: "Four sets of variations on popular opera melodies — standard student repertoire appearing in Barber's 'Solos for Young Violinists' anthologies. Each air presents a tuneful theme followed by increasingly elaborate variations developing passage work, double stops, and bow technique. More pedagogically structured than the better-known Op. 89 Airs variés, making them excellent stepping stones between intermediate études and real concert repertoire.",
    skills: "Theme-and-variation form; developing passage work; singing tone on operatic melodies; moderate double stops; bow distribution.",
    editions: "International Music Company; Carl Fischer; included in Barber, Solos for Young Violinists (Summy-Birchard / Alfred).",
    examLevel: "RCM 8; ABRSM 7 (Dancla Air varié Op. 89/4 is Grade 7 List B — related series)"
  },
  {
    id: "fschubert-bee", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "François Schubert", nationality: "German (Dresden)", period: "Romantic",
    title: "L'Abeille (The Bee / Die Biene), Op. 13/9 (c. 1855)",
    difficulty: [5, 6],
    description: "Not by Franz Schubert the Viennese composer — this is by François Schubert (1808–1878), a Dresden violinist and composer. A buzzing perpetual-motion miniature imitating a bee in flight, using rapid spiccato and string crossings. One of the most popular student showpieces of the 19th century and still frequently assigned. Excellent for developing even, controlled spiccato at moderate speed.",
    skills: "Rapid spiccato; even string crossing; light bow control; perpetual motion at moderate tempo.",
    editions: "International Music Company; Carl Fischer.",
    examLevel: "RCM 8; ASTACAP 7"
  },
  {
    id: "stravinsky-concerto-d", tier: "core", category: "Concerti", composer: "Igor Stravinsky", nationality: "Russian-American", period: "Modern",
    title: "Violin Concerto in D Major (1931)",
    difficulty: [9, 9],
    description: "Stravinsky's only violin concerto, written in collaboration with Samuel Dushkin. A neoclassical masterpiece in four movements. The opening 'passport chord' (a striking dissonance) recurs throughout. Demands rhythmic precision, clarity, and comfort with Stravinsky's angular melodic writing. An essential 20th-century concerto.",
    editions: "Schott (original); Boosey & Hawkes.",
    examLevel: "RCM 9"
  },
  {
    id: "wieniawski-concerto-2", tier: "core", category: "Concerti", composer: "Henryk Wieniawski", nationality: "Polish", period: "Romantic",
    title: "Violin Concerto No. 2 in D Minor, Op. 22 (1862)",
    difficulty: [8, 9],
    description: "One of the most beloved Romantic violin concerti. Three movements of passionate lyricism and brilliant virtuosity. The opening theme is one of the most recognizable in the violin repertoire; the second movement Romance is deeply beautiful; the finale alla zingara sparkles with Gypsy energy. A pillar of the standard repertoire.",
    editions: "International Music Company, ed. Francescatti; Henle Verlag (Urtext); Peters; PWM.",
    examLevel: "ARCT; ABRSM 7 (Romance 2nd mvt is Grade 7 List B); ASTACAP 10"
  }
,
  {
    id: "telemann-loure-g", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Georg Philipp Telemann", nationality: "German", period: "Baroque",
    title: "Loure from Suite in G, TWV 11:21",
    difficulty: [3, 3],
    description: "A stately French dance movement from one of Telemann's many suites. Clean Baroque phrasing with moderate demands.",
    editions: "Various standard editions.",
    examLevel: "ABRSM 3"
  },
  {
    id: "mascitti-gavotta", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Michele Mascitti", nationality: "Italian", period: "Baroque",
    title: "Gavotta from Sonata in E minor, Op. 2/10",
    difficulty: [3, 3],
    description: "A charming Italian Baroque dance movement. Mascitti was an Italian violinist active in Paris.",
    editions: "ABRSM exam publication.",
    examLevel: "ABRSM 3"
  },
  {
    id: "dancla-op86", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Charles Dancla", nationality: "French", period: "Romantic",
    title: "Rédowa de Wallerstein from Le mélodiste, Op. 86",
    difficulty: [3, 3],
    description: "A tuneful character piece from Dancla's pedagogical collection. Light, dance-like, good for developing musical character at early levels.",
    editions: "ABRSM exam publication; Schott.",
    examLevel: "ABRSM 3"
  },
  {
    id: "papini-theme-var", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Guido Papini", nationality: "Italian", period: "Romantic",
    title: "Theme and Variations",
    difficulty: [3, 3],
    description: "A student-level theme and variations by the Italian violinist-pedagogue. Develops ability to shape a melody through increasingly ornamented repetitions.",
    editions: "ABRSM exam publication.",
    examLevel: "ABRSM 3"
  },
  {
    id: "a-veracini-g-minor", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Antonio Veracini", nationality: "Italian", period: "Baroque",
    title: "Vivace from Sonata in G minor, Op. 3/7",
    difficulty: [4, 4],
    description: "Energetic Baroque movement. Antonio Veracini (uncle of the more famous Francesco Maria) was a respected Florentine violinist.",
    editions: "ABRSM exam publication.",
    examLevel: "ABRSM 4"
  },
  {
    id: "price-deserted", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Florence Price", nationality: "American", period: "Early 20th Century",
    title: "The Deserted Garden",
    difficulty: [4, 4],
    description: "A gentle, atmospheric miniature by the first African-American woman to have a symphony performed by a major orchestra. Price's music blends Romantic lyricism with African-American musical traditions.",
    editions: "G. Schirmer; Hildegard Publishing.",
    examLevel: "ABRSM 4"
  },
  {
    id: "bridge-springsong", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Frank Bridge", nationality: "British", period: "Early 20th Century",
    title: "Spring Song, H. 104",
    difficulty: [4, 4],
    description: "A lyrical English miniature by the teacher of Benjamin Britten. Warm, tonal, and appealing. Part of Bridge's gift for atmospheric short pieces.",
    editions: "Thames Publishing; Faber Music.",
    examLevel: "ABRSM 4"
  },
  {
    id: "lagye-danse", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Bériot de Lagye", nationality: "Belgian", period: "Romantic",
    title: "Danse espagnole, Op. 102",
    difficulty: [4, 4],
    description: "A lively Spanish-character dance piece. Good for developing rhythmic vitality at the intermediate-student level.",
    editions: "ABRSM exam publication.",
    examLevel: "ABRSM 4"
  },
  {
    id: "corrette-giga", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Michel Corrette", nationality: "French", period: "Baroque",
    title: "Giga from Sonata in D, Op. 25/5",
    difficulty: [5, 5],
    description: "A lively French Baroque gigue. Corrette was a prolific French composer and organist. Clean passage work with French-Baroque character.",
    editions: "Various Baroque anthologies.",
    examLevel: "ABRSM 5"
  },
  {
    id: "loeillet-giga", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Jean-Baptiste Loeillet", nationality: "Belgian", period: "Baroque",
    title: "Giga from Sonata in G minor, Op. 5/6",
    difficulty: [5, 5],
    description: "An energetic Baroque gigue by the Brussels-born, London-based composer. Clean passage work and rhythmic drive.",
    editions: "Various Baroque anthologies; Musica Rara.",
    examLevel: "ABRSM 5"
  },
  {
    id: "senaille-allegro", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Jean-Baptiste Senaillé", nationality: "French", period: "Baroque",
    title: "Allegro from Sonata No. 4 in D minor",
    difficulty: [5, 5],
    description: "A vigorous French Baroque sonata movement. Senaillé was one of the first French violinists to absorb the Italian style, studying with one of Corelli's pupils.",
    editions: "Various Baroque anthologies; Schott.",
    examLevel: "ABRSM 5"
  },
  {
    id: "leclair-op2-11", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Jean-Marie Leclair", nationality: "French", period: "Baroque",
    title: "Allegro from Sonata in B minor, Op. 2/11",
    difficulty: [5, 5],
    description: "Leclair is the founder of the French violin school. This sonata movement combines French elegance with Italian virtuosity.",
    editions: "International Music Company; Peters; Henle Verlag.",
    examLevel: "ABRSM 5"
  },
  {
    id: "andree-romance", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Elfrida Andrée", nationality: "Swedish", period: "Romantic",
    title: "Romance (from Two Romances)",
    difficulty: [5, 5],
    description: "A lyrical miniature by the pioneering Swedish woman composer and organist. Warm Romantic style.",
    editions: "Musikaliska Konstföreningen; ABRSM exam publication.",
    examLevel: "ABRSM 5"
  },
  {
    id: "tailleferre-sonatine", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Germaine Tailleferre", nationality: "French", period: "Modern",
    title: "Moderato (1st mvt from Sonatine for Violin and Piano, 1973)",
    difficulty: [5, 5],
    description: "Tailleferre was the only female member of Les Six. This late Sonatine is elegant, clear-textured, and neoclassical — characteristic of her refined style.",
    editions: "Durand.",
    examLevel: "ABRSM 5"
  },
  {
    id: "shostakovich-elegie", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Dmitri Shostakovich", nationality: "Russian", period: "Modern",
    title: "Elegie (arr. Fortunatov for violin and piano)",
    difficulty: [5, 5],
    description: "An arrangement of one of Shostakovich's most poignant slow movements. Dark, lyrical, and deeply expressive within accessible technical demands.",
    editions: "ABRSM exam publication; Sikorski.",
    examLevel: "ABRSM 5"
  },
  {
    id: "kodaly-intermezzo", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Zoltán Kodály", nationality: "Hungarian", period: "Modern",
    title: "Intermezzo from Háry János (arr. for violin and piano)",
    difficulty: [5, 5],
    description: "A charming arrangement from Kodály's folk-opera. Hungarian folk character with accessible technique.",
    editions: "Universal Edition; Boosey & Hawkes.",
    examLevel: "ABRSM 5"
  },
  {
    id: "bonporti-giga", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Francesco Antonio Bonporti", nationality: "Italian", period: "Baroque",
    title: "Giga from Invention in B-flat, Op. 10/5",
    difficulty: [6, 6],
    description: "Bonporti's 'Inventions' are elegant Italian Baroque works. This gigue is lively and clean-textured.",
    editions: "Various Baroque anthologies.",
    examLevel: "ABRSM 6"
  },
  {
    id: "geminiani-sonata-c", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Francesco Geminiani", nationality: "Italian", period: "Baroque",
    title: "Affettuoso & Allegro from Sonata in C, Op. 4/3",
    difficulty: [6, 6],
    description: "Two movements from a sonata by Corelli's most distinguished student. The Affettuoso is warmly lyrical; the Allegro is brilliantly passage-work-driven.",
    editions: "Various Baroque anthologies; Peters.",
    examLevel: "ABRSM 6"
  },
  {
    id: "jstamitz-sonata-d", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Johann Stamitz", nationality: "Czech-German", period: "Classical",
    title: "Minuetto from Sonata in D, Op. 6/5",
    difficulty: [6, 6],
    description: "An elegant Classical minuet by the founder of the Mannheim school. Clean, galant phrasing.",
    editions: "Various Classical anthologies.",
    examLevel: "ABRSM 6"
  },
  {
    id: "fm-veracini-giga", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Francesco Maria Veracini", nationality: "Italian", period: "Baroque",
    title: "Giga from Sonata Accademica in E minor, Op. 2/8",
    difficulty: [6, 6],
    description: "A vigorous gigue from Veracini's important set of twelve Sonatas Accademiche. Veracini was one of the most brilliant Italian Baroque violinists.",
    editions: "Peters; Bärenreiter.",
    examLevel: "ABRSM 6"
  },
  {
    id: "burleigh-southland", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Harry T. Burleigh", nationality: "American", period: "Early 20th Century",
    title: "Andante from Southland Sketches (1916)",
    difficulty: [6, 6],
    description: "A lyrical movement by the pioneering African-American composer who championed the spiritual as an art form. Warm, singing melodic writing influenced by both European Romanticism and African-American folk traditions.",
    editions: "Ricordi; Hildegard Publishing.",
    examLevel: "ABRSM 6"
  },
  {
    id: "pejacevic-romance", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Dora Pejačević", nationality: "Croatian", period: "Late Romantic",
    title: "Romance for Violin and Piano",
    difficulty: [6, 6],
    description: "A warmly lyrical work by the most significant Croatian woman composer of the early 20th century. Rich, late-Romantic harmonic language with genuine emotional depth.",
    editions: "Breitkopf & Härtel; Ars Croatica.",
    examLevel: "ABRSM 6"
  },
  {
    id: "lboulanger-nocturne", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Lili Boulanger", nationality: "French", period: "Modern",
    title: "Nocturne for Violin and Piano (1911)",
    difficulty: [6, 6],
    description: "A luminous early work by the prodigiously gifted younger sister of Nadia Boulanger. Lili won the Prix de Rome at 19 and died at 24. This Nocturne is a precious surviving work of shimmering beauty.",
    editions: "Durand.",
    examLevel: "ABRSM 6"
  },
  {
    id: "debussy-enbateau", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Claude Debussy", nationality: "French", period: "Modern",
    title: "En bateau from Petite Suite (arr. for violin and piano)",
    difficulty: [6, 6],
    description: "A gentle, rocking barcarolle from Debussy's youthful Petite Suite. Atmospheric and Impressionistic, developing tonal color and delicacy.",
    editions: "Durand; various arrangements.",
    examLevel: "ABRSM 6"
  },
  {
    id: "melbonis-andante", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Mel Bonis", nationality: "French", period: "Romantic/Modern",
    title: "Andante religioso from Trois pièces",
    difficulty: [6, 6],
    description: "A contemplative piece by the underappreciated French woman composer (pen name of Mélanie Bonis). A student of Franck at the Paris Conservatoire. Growing in recognition.",
    editions: "Leduc; Furore Verlag.",
    examLevel: "ABRSM 6"
  },
  {
    id: "brightsheng-dream", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Bright Sheng", nationality: "Chinese-American", period: "Modern",
    title: "Dream Song from Three Fantasies",
    difficulty: [6, 6],
    description: "A contemplative, Chinese-inflected miniature by the Shanghai-born, American-based composer. Blends Western and Chinese musical aesthetics with refinement.",
    editions: "G. Schirmer.",
    examLevel: "ABRSM 6"
  },
  {
    id: "viardot-berceuse", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Pauline Viardot", nationality: "French", period: "Romantic",
    title: "Berceuse from Six morceaux",
    difficulty: [6, 6],
    description: "A gentle lullaby by the legendary mezzo-soprano, composer, and salon hostess — friend of Turgenev, Schumann, and Brahms. Her compositions are increasingly performed.",
    editions: "Breitkopf & Härtel; Furore Verlag.",
    examLevel: "ABRSM 6"
  },
  {
    id: "elgar-chanson", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Edward Elgar", nationality: "British", period: "Romantic",
    title: "Chanson de nuit, Op. 15/1 (1897)",
    difficulty: [6, 6],
    description: "A gentle, nocturnal serenade — companion to Chanson de matin. Warm English Romanticism with broad, singing melody. More substantial than Salut d'amour.",
    editions: "Novello; International Music Company.",
    examLevel: "ABRSM 6"
  },
  {
    id: "shostakovich-romanze", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Dmitri Shostakovich", nationality: "Russian", period: "Modern",
    title: "Romanze in D for Violin and Piano",
    difficulty: [6, 6],
    description: "A warm, lyrical miniature. Less well known than Shostakovich's major works but genuinely appealing. Growing in popularity through syllabus inclusion.",
    editions: "DSCH Publishers / Sikorski.",
    examLevel: "ABRSM 6"
  },
  {
    id: "barns-canzonetta", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Ethel Barns", nationality: "British", period: "Romantic",
    title: "Canzonetta from Quatre morceaux",
    difficulty: [6, 6],
    description: "A singing miniature by the British violinist-composer (wife of Charles Phillips). Her violin works reflect intimate knowledge of the instrument.",
    editions: "ABRSM exam publication.",
    examLevel: "ABRSM 6"
  },
  {
    id: "albinoni-sonata-bb", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Tomaso Albinoni", nationality: "Italian", period: "Baroque",
    title: "Allegro assai from Sonata in B-flat, Op. 6/12",
    difficulty: [7, 7],
    description: "A brilliant Baroque sonata movement. Albinoni's violin sonatas are less well known than his oboe concerti but contain excellent writing.",
    editions: "Ricordi; various Baroque anthologies.",
    examLevel: "ABRSM 7"
  },
  {
    id: "saintgeorges-sonata", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Chevalier de Saint-Georges", nationality: "French", period: "Classical",
    title: "Allegro from Sonata No. 3 in G minor, Op. 1b",
    difficulty: [7, 7],
    description: "Joseph Bologne, Chevalier de Saint-Georges, was the first major Classical composer of African descent — a virtuoso violinist, champion fencer, and colonel in the French Revolution. His sonatas combine Italian brilliance with French elegance.",
    editions: "Fuzeau (facsimile); various modern editions.",
    examLevel: "ABRSM 7"
  },
  {
    id: "melbonis-allegretto", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Mel Bonis", nationality: "French", period: "Romantic/Modern",
    title: "Allegretto non troppo, Op. 84",
    difficulty: [7, 7],
    description: "An elegant, moderately paced piece by the French woman composer. Clean textures with late-Romantic harmonic charm.",
    editions: "Leduc; Furore Verlag.",
    examLevel: "ABRSM 7"
  },
  {
    id: "beach-lento", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Amy Beach", nationality: "American", period: "Romantic",
    title: "Lento espressivo, Op. 125",
    difficulty: [7, 7],
    description: "A late work by the first major American woman composer. Warm, emotionally direct, and deeply felt — characteristic of Beach's personal late style.",
    editions: "G. Schirmer.",
    examLevel: "ABRSM 7"
  },
  {
    id: "chaminade-andantino", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Cécile Chaminade", nationality: "French", period: "Romantic",
    title: "Andantino from Trois morceaux, Op. 31",
    difficulty: [7, 7],
    description: "A graceful miniature by the most commercially successful woman composer of the Romantic era. Elegant and charming.",
    editions: "Enoch; various reprints.",
    examLevel: "ABRSM 7"
  },
,
  {
    id: "sibelius-romance-78", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Jean Sibelius", nationality: "Finnish", period: "Late Romantic/Modern",
    title: "Romance, Op. 78/2",
    difficulty: [7, 7],
    description: "A lyrical miniature from Sibelius's set of Four Pieces Op. 78. Nordic character with the distinctive Sibelian melodic voice — spare, atmospheric, and deeply felt.",
    editions: "Breitkopf & Härtel.",
    examLevel: "ABRSM 7"
  },
  {
    id: "coleridgetaylor-cavatina", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Samuel Coleridge-Taylor", nationality: "British", period: "Romantic",
    title: "Cavatina from Suite de Pièces, Op. 3",
    difficulty: [7, 7],
    description: "A warm, singing piece by the great Anglo-African composer — son of a Sierra Leonean father and English mother. Coleridge-Taylor was hugely famous in his lifetime; his violin works combine European Romanticism with a distinctive lyrical voice.",
    editions: "Novello; Mapleson.",
    examLevel: "ABRSM 7"
  },
  {
    id: "dancla-op89-4", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Charles Dancla", nationality: "French", period: "Romantic",
    title: "Air varié on a Theme by Donizetti, Op. 89/4",
    difficulty: [7, 7],
    description: "The fourth of Dancla's famous six Airs variés on operatic themes (Op. 89). A student-concerto substitute: tuneful theme with progressively brilliant variations. Standard French-school student repertoire.",
    editions: "International Music Company; Carl Fischer; Peters.",
    examLevel: "ABRSM 7"
  },
  {
    id: "glazunov-meditation", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Alexander Glazunov", nationality: "Russian", period: "Late Romantic",
    title: "Meditation, Op. 32",
    difficulty: [7, 7],
    description: "A reflective, lyrical miniature by the composer of the Violin Concerto. Rich Russian Romantic harmony with singing melody.",
    editions: "International Music Company; Belaieff.",
    examLevel: "ABRSM 7"
  },
  {
    id: "arensky-serenade", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Anton Arensky", nationality: "Russian", period: "Romantic",
    title: "Sérénade from Four Pieces, Op. 30",
    difficulty: [7, 7],
    description: "A charming salon serenade. Arensky was Rachmaninov's teacher. Light, elegant, and melodically appealing.",
    editions: "International Music Company; Peters.",
    examLevel: "ABRSM 7"
  },
  {
    id: "price-elfentanz", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Florence Price", nationality: "American", period: "Modern",
    title: "Elfentanz (Elf Dance)",
    difficulty: [7, 7],
    description: "A light, scherzo-like miniature by the pioneering African-American woman composer. Dance-like character with clean, delicate writing.",
    editions: "G. Schirmer; Hildegard Publishing.",
    examLevel: "ABRSM 7"
  },
  {
    id: "grainger-molly", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Percy Grainger (arr. Kreisler)", nationality: "Australian-American", period: "Early 20th Century",
    title: "Molly on the Shore (arr. Kreisler for violin and piano)",
    difficulty: [7, 7],
    description: "Kreisler's arrangement of Grainger's exuberant Irish reel setting. Rhythmically infectious and technically sparkling. Classic encore.",
    editions: "Schott; G. Schirmer.",
    examLevel: "ABRSM 7"
  },
  {
    id: "sarasate-playera", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Pablo de Sarasate", nationality: "Spanish", period: "Romantic",
    title: "Playera, Op. 23/1 (from Spanische Tänze)",
    difficulty: [7, 7],
    description: "A languorous Spanish dance in the cante jondo style — slow, expressive, and deeply Spanish. Companion to the Zapateado (Op. 23/2). Demands rubato, tonal color, and Spanish character.",
    editions: "International Music Company; G. Schirmer; Peters.",
    examLevel: "ABRSM 7; ASTACAP 8"
  },
  {
    id: "nardini-concerto-e", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Pietro Nardini", nationality: "Italian", period: "Classical",
    title: "Allegro moderato from Concerto in E minor",
    difficulty: [8, 8],
    description: "Nardini was Tartini's most famous student, renowned for his beautiful tone. This concerto movement combines Classical elegance with singing Italian melody.",
    editions: "International Music Company; Peters.",
    examLevel: "ABRSM 8"
  },
  {
    id: "coleridgetaylor-african", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Samuel Coleridge-Taylor", nationality: "British", period: "Romantic",
    title: "African Dance No. 2, Op. 58",
    difficulty: [8, 8],
    description: "A rhythmically energetic dance piece by the great Anglo-African composer. More virtuosic than the Cavatina, with driving rhythms and passionate melodic writing.",
    editions: "Novello; Mapleson.",
    examLevel: "ABRSM 8"
  },
  {
    id: "saintsaens-elegie", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Camille Saint-Saëns", nationality: "French", period: "Romantic",
    title: "Élégie, Op. 143 (1915)",
    difficulty: [8, 8],
    description: "A late, contemplative work — Saint-Saëns wrote it at age 80 during World War I. Profoundly expressive within restrained, classical proportions.",
    editions: "Durand.",
    examLevel: "ABRSM 8"
  },
  {
    id: "lboulanger-matin", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Lili Boulanger", nationality: "French", period: "Modern",
    title: "D'un matin de printemps (1918)",
    difficulty: [8, 8],
    description: "A luminous, effervescent work — one of the last pieces by the prodigiously gifted Lili Boulanger, who died at 24. Exists in versions for violin, flute trio, and orchestra. Shimmering and joyful.",
    editions: "Durand.",
    examLevel: "ABRSM 8"
  },
  {
    id: "esmail-varsha", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Reena Esmail", nationality: "American", period: "21st Century",
    title: "Varsha (2017)",
    difficulty: [8, 8],
    description: "A contemporary work by the Indian-American composer known for blending Hindustani and Western classical traditions. 'Varsha' means monsoon rain. Atmospheric and rhythmically inventive.",
    editions: "Reena Esmail Music.",
    examLevel: "ABRSM 8"
  },
  {
    id: "drdla-mazurka", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "František Drdla", nationality: "Czech", period: "Romantic",
    title: "Mazurka No. 2, Op. 23",
    difficulty: [8, 8],
    description: "A brilliant salon mazurka by the Czech violinist-composer (also known for Souvenir). Rhythmic sparkle and Slavic character.",
    editions: "International Music Company; Carl Fischer.",
    examLevel: "ABRSM 8"
  },
  {
    id: "chenyi-fisherman", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Chen Yi", nationality: "Chinese-American", period: "Modern",
    title: "Fisherman's Song for Violin and Piano",
    difficulty: [8, 8],
    description: "A contemporary work by the distinguished Chinese-American composer, blending Chinese folk melody with Western technique. Evocative and atmospheric.",
    editions: "Theodore Presser.",
    examLevel: "ABRSM 8"
  },
  {
    id: "finzi-concerto", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Gerald Finzi", nationality: "British", period: "Modern",
    title: "Hornpipe Rondo from Violin Concerto (completed Palmer)",
    difficulty: [8, 8],
    description: "The finale of Finzi's unfinished Violin Concerto, completed by Jeremy Dale Roberts and Philip Thomas. Lively, folk-influenced English pastoral style.",
    editions: "Boosey & Hawkes.",
    examLevel: "ABRSM 8"
  },
  {
    id: "tenhave-allegro", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Willem ten Have", nationality: "Dutch", period: "Late Romantic",
    title: "Allegro brillant, Op. 19",
    difficulty: [8, 8],
    description: "A virtuosic showpiece by the Dutch violinist. Clean, brilliant passage work in the Franco-Belgian tradition. Popular in the early 20th century, now returning via syllabus inclusion.",
    editions: "International Music Company; Peters.",
    examLevel: "ABRSM 8; RCM 8; ASTACAP 7"
  },
  {
    id: "weinzweig-concerto", tier: "syllabus", category: "Concerti", composer: "John Weinzweig", nationality: "Canadian", period: "Modern",
    title: "Violin Concerto (1954)",
    difficulty: [8, 9],
    description: "Canada's first twelve-tone composer. This concerto is a landmark of Canadian music — serial technique applied with lyrical warmth. Important for Canadian students at advanced levels.",
    editions: "Canadian Music Centre.",
    examLevel: "ARCT"
  },
  {
    id: "coulthard-duo", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Jean Coulthard", nationality: "Canadian", period: "Modern",
    title: "Duo Sonata for Violin and Piano",
    difficulty: [8, 8],
    description: "A substantial work by one of British Columbia's most distinguished composers. Post-Romantic style with Impressionist harmonic color.",
    editions: "Canadian Music Centre.",
    examLevel: "ARCT"
  },
  {
    id: "somers-sonata2", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Harry Somers", nationality: "Canadian", period: "Modern",
    title: "Sonata No. 2 for Violin and Piano (1955)",
    difficulty: [8, 9],
    description: "A powerful, dramatic work by one of Canada's most important mid-century composers. Angular, intense, and demanding.",
    editions: "Canadian Music Centre.",
    examLevel: "ARCT"
  },
  {
    id: "respighi-sonata-vp", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Ottorino Respighi", nationality: "Italian", period: "Modern",
    title: "Sonata in B Minor for Violin and Piano (1917)",
    difficulty: [8, 9],
    description: "A passionate, large-scale sonata combining late-Romantic Italian lyricism with post-Impressionist harmony.",
    editions: "Bote & Bock; Ricordi.",
    examLevel: "ARCT"
  },
  {
    id: "adaskin-canzona", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Murray Adaskin", nationality: "Canadian", period: "Modern",
    title: "Canzona and Rondo for Violin and Piano",
    difficulty: [7, 8],
    description: "A lyrical Canadian work in two connected movements. Adaskin was a significant figure in Canadian musical life — violinist, composer, and educator.",
    editions: "Canadian Music Centre.",
    examLevel: "RCM 10"
  },
  {
    id: "willan-sonata1", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Healey Willan", nationality: "Canadian (British-born)", period: "Modern",
    title: "Sonata No. 1 in E Minor for Violin and Piano (1921)",
    difficulty: [7, 8],
    description: "A substantial Romantic sonata by the 'Dean of Canadian composers.' Willan's style is rooted in the English cathedral tradition with Brahmsian harmonic richness.",
    editions: "Oxford University Press; Canadian Music Centre.",
    examLevel: "RCM 9"
  },
  {
    id: "eckhardt-caprices-full", tier: "syllabus", category: "Solo Repertoire", subcategory: "Solo Violin", composer: "Sophie-Carmen Eckhardt-Gramatté", nationality: "Russian-Canadian", period: "Modern",
    title: "Ten Caprices for Solo Violin (complete set, 1924–34)",
    difficulty: [9, 10],
    description: "The most significant Canadian contribution to the solo violin etude literature. Ten substantial unaccompanied caprices of extreme difficulty demanding full advanced technique within a distinctive modernist harmonic language.",
    editions: "Canadian Music Centre; Waterloo Music.",
    examLevel: "RCM 9 (No. 1); RCM 10 (Nos. 2–3); ARCT (Nos. 5–10)"
  },
  {
    id: "dvorak-sonata-vp", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Antonín Dvořák", nationality: "Czech", period: "Romantic",
    title: "Sonata in F Major, Op. 57 (1880)",
    difficulty: [7, 8],
    description: "Less famous than the Sonatina but a substantial, rewarding three-movement work with Dvořák's characteristic warmth, Czech dance rhythms, and lyrical invention.",
    editions: "Bärenreiter (Urtext); Peters; International Music Company.",
    examLevel: "ARCT"
  }
,
  {
    id: "jardanyi-concertino", tier: "syllabus", category: "Concerti", composer: "Pál Járdányi", nationality: "Hungarian", period: "Modern",
    title: "Concertino for Violin and Orchestra",
    difficulty: [5, 5],
    description: "A compact, folk-influenced concertino by the Hungarian composer and folk-music scholar. Attractive and well-crafted student concerto.",
    editions: "EMB (Editio Musica Budapest).",
    examLevel: "RCM 5"
  },
  {
    id: "pepusch-sonata3", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Johann Christoph Pepusch", nationality: "German-British", period: "Baroque",
    title: "Sonatas from Op. 1 (Nos. 3 & 5 in G Major) and 6 Sonate da camera (Nos. 1, 4, 6)",
    difficulty: [4, 6],
    description: "Baroque sonatas by the German-born, London-based composer best known for The Beggar's Opera. Clean, well-crafted writing in the Corellian tradition. Multiple sonatas appear across RCM Grades 5–6.",
    editions: "Various Baroque anthologies; Schott.",
    examLevel: "RCM 5–6"
  },
  {
    id: "scarlatti-sonatas-vln", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Alessandro Scarlatti", nationality: "Italian", period: "Baroque",
    title: "Violin Sonatas (No. 2 in E Minor K. 81; No. 5 in G Major K. 91)",
    difficulty: [5, 5],
    description: "Short, elegant Baroque sonatas. These are keyboard works arranged for violin and piano — Scarlatti's characteristic rapid passage work translates well to the violin.",
    editions: "Various standard editions; ABRSM/RCM publications.",
    examLevel: "RCM 5"
  },
  {
    id: "defesch-sonata-g", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Willem de Fesch", nationality: "Dutch", period: "Baroque",
    title: "Sonata in G Major, Op. 8/4",
    difficulty: [5, 5],
    description: "A pleasant Baroque sonata by the Dutch violinist-composer active in Antwerp and London. Clean, Corellian style.",
    editions: "Various Baroque anthologies.",
    examLevel: "RCM 5"
  },
  {
    id: "vanhal-sonata", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Johann Baptist Vanhal", nationality: "Czech-Austrian", period: "Classical",
    title: "Sonata No. 1 (from Easy Classical Sonatas)",
    difficulty: [5, 5],
    description: "A simple, elegant Classical sonata by the Bohemian-born Viennese composer. Vanhal was a contemporary of Haydn and Mozart.",
    editions: "Various Classical anthologies.",
    examLevel: "RCM 5"
  },
  {
    id: "weber-sonatas-op10b", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Carl Maria von Weber", nationality: "German", period: "Classical/Romantic",
    title: "Sonatas from Op. 10b (Nos. 1–6, originally for Piano)",
    difficulty: [5, 7],
    description: "Weber's violin sonatas, originally piano works, appear across multiple RCM grades. The Air Polonais (No. 2, 3rd mvt) is Grade 5; others at Grades 7. Charming, tuneful, and good for developing Classical-Romantic style.",
    editions: "Peters; various editions.",
    examLevel: "RCM 5–7"
  },
  {
    id: "komorowski-concerto2", tier: "syllabus", category: "Concerti", composer: "Ignacy Feliks Komorowski", nationality: "Polish", period: "Classical",
    title: "Concerto No. 2 in A Major (3rd mvt)",
    difficulty: [6, 6],
    description: "A student concerto by the Polish Classical-era violinist. Clean passage work with moderate demands. RCM Grade 6 List A.",
    editions: "PWM.",
    examLevel: "RCM 6"
  },
  {
    id: "kymlicka-concertino", tier: "syllabus", category: "Concerti", composer: "Milan Kymlicka", nationality: "Czech-Canadian", period: "Modern",
    title: "Concertino Grosso",
    difficulty: [6, 6],
    description: "A student concertino by the Czech-Canadian composer. Accessible modern writing for intermediate students.",
    editions: "Canadian Music Centre.",
    examLevel: "RCM 6"
  },
  {
    id: "tessarini-concerto", tier: "syllabus", category: "Concerti", composer: "Carlo Tessarini", nationality: "Italian", period: "Baroque",
    title: "Concerto in G Major, Op. 1/3 (1st mvt)",
    difficulty: [6, 6],
    description: "A simple, elegant Baroque concerto by the Italian violinist active in Venice, Rome, and across Europe. Clean passage work with Vivaldi's influence.",
    editions: "Various Baroque editions.",
    examLevel: "RCM 6"
  },
  {
    id: "willan-sonata2", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Healey Willan", nationality: "Canadian (British-born)", period: "Modern",
    title: "Sonata No. 2 in E Major for Violin and Piano (1923)",
    difficulty: [6, 6],
    description: "A lyrical Romantic sonata by the 'Dean of Canadian composers.' Warm, English cathedral-tradition harmonic language with gentle lyricism.",
    editions: "Oxford University Press; Canadian Music Centre.",
    examLevel: "RCM 6"
  },
  {
    id: "farmer-hope", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Thomas Farmer", nationality: "English", period: "Baroque",
    title: "Hope Told a Flattering Tale",
    difficulty: [6, 7],
    description: "A charming English Baroque piece by a Restoration-era violinist who played in Charles II's court. Tuneful and elegant.",
    editions: "RCM publication.",
    examLevel: "RCM 7"
  },
  {
    id: "benda-sonata-am", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Franz Benda", nationality: "Czech-German", period: "Classical",
    title: "Sonata in A Minor (Tempo di Minuetto)",
    difficulty: [6, 7],
    description: "A graceful Classical sonata movement by Frederick the Great's concertmaster. Clean, galant phrasing with moderate demands.",
    editions: "Various Classical anthologies.",
    examLevel: "RCM 7"
  },
  {
    id: "mendelssohn-sonata-f", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Felix Mendelssohn", nationality: "German", period: "Romantic",
    title: "Sonata in F Major (1820, 1st mvt)",
    difficulty: [6, 7],
    description: "A youthful sonata written when Mendelssohn was 11. Already showing remarkable craft and melodic gift. An attractive student piece.",
    editions: "Various editions; Peters.",
    examLevel: "RCM 7"
  },
  {
    id: "jcbach-sonata-d", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Johann Christian Bach", nationality: "German-British", period: "Classical",
    title: "Sonata in D Major, Op. 16/1",
    difficulty: [6, 7],
    description: "An elegant galant sonata by the 'London Bach' — youngest son of J.S. Bach. Influenced Mozart's early style. Clean, graceful Classical writing.",
    editions: "Peters; Henle Verlag.",
    examLevel: "RCM 7"
  },
  {
    id: "komarowski-concerto1", tier: "syllabus", category: "Concerti", composer: "Anatoly Komarowski", nationality: "Russian", period: "Modern",
    title: "Concerto No. 1 in E Minor (1st mvt)",
    difficulty: [6, 7],
    description: "A student concerto widely used in Russian pedagogy. Clean, well-structured, with lyrical writing. Good preparation for major Romantic concerti.",
    editions: "International Music Company; Sikorski.",
    examLevel: "RCM 8"
  },
  {
    id: "benda-concerto-g", tier: "syllabus", category: "Concerti", composer: "Johann Georg Benda", nationality: "Czech-German", period: "Classical",
    title: "Concerto in G Major (arr. Dushkin, 1st mvt)",
    difficulty: [6, 7],
    description: "A Classical concerto arranged by the violinist Samuel Dushkin (who later collaborated with Stravinsky). Clean passage work with galant charm.",
    editions: "Various editions.",
    examLevel: "RCM 8"
  },
  {
    id: "dancla-op118-airs", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Charles Dancla", nationality: "French", period: "Romantic",
    title: "Airs variés, Op. 118 (4 airs on themes of Bellini, Donizetti, Pacini, Weigl)",
    difficulty: [5, 7],
    description: "Four sets of theme-and-variations on operatic melodies — excellent for developing passage work, double stops, and bow technique within an appealing musical framework.",
    editions: "International Music Company; Carl Fischer.",
    examLevel: "RCM 8"
  },
  {
    id: "adaskin-solo-sonata", tier: "syllabus", category: "Solo Repertoire", subcategory: "Solo Violin", composer: "Murray Adaskin", nationality: "Canadian", period: "Modern",
    title: "Sonata No. 1 for Solo Violin",
    difficulty: [6, 7],
    description: "An unaccompanied sonata by the significant Canadian violinist-composer. Moderate modernist language accessible to advanced students.",
    editions: "Canadian Music Centre.",
    examLevel: "RCM 8"
  },
  {
    id: "albinoni-sonatas-op6", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Tomaso Albinoni", nationality: "Italian", period: "Baroque",
    title: "Sonatas from Op. 6 (D Major Op. 6/7; G Minor Op. 6/2; B-flat Op. 6/12)",
    difficulty: [6, 7],
    description: "Albinoni's violin sonatas are less known than his oboe concerti but contain attractive Baroque writing. Multiple sonatas appear across ABRSM and RCM grades.",
    editions: "Ricordi; various Baroque anthologies.",
    examLevel: "RCM 8; ABRSM 7"
  },
  {
    id: "elsner-sonata", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Józef Elsner", nationality: "Polish", period: "Classical",
    title: "Sonata in F Major, Op. 10/1",
    difficulty: [6, 8],
    description: "A Classical sonata by Chopin's teacher at the Warsaw Conservatory. Clean, well-crafted Polish Classical writing. Different movements appear at RCM Grades 8 and 9.",
    editions: "PWM.",
    examLevel: "RCM 8–9"
  },
  {
    id: "vivaldi-sonata-op2", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Antonio Vivaldi", nationality: "Italian", period: "Baroque",
    title: "Sonata Op. 2/7",
    difficulty: [6, 7],
    description: "One of Vivaldi's twelve violin sonatas Op. 2. Less famous than the concerti but excellent Baroque writing with characteristic Vivaldian energy.",
    editions: "Ricordi; Peters; various Baroque anthologies.",
    examLevel: "RCM 8"
  },
  {
    id: "glazunov-albumblatt", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Alexander Glazunov", nationality: "Russian", period: "Late Romantic",
    title: "Albumblatt (Album Leaf)",
    difficulty: [6, 7],
    description: "A lyrical Russian Romantic miniature. Warm, singing melody with rich harmonic support. Charming recital piece.",
    editions: "Belaieff; International Music Company.",
    examLevel: "RCM 8"
  },
  {
    id: "kulesha-dance", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Gary Kulesha", nationality: "Canadian", period: "Modern",
    title: "Song and Dance — Dance",
    difficulty: [6, 7],
    description: "A lively movement by the Canadian composer and conductor. Rhythmically engaging modern writing for intermediate-advanced students.",
    editions: "Canadian Music Centre.",
    examLevel: "RCM 8"
  },
  {
    id: "levkovich-lullaby", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Boris Levkovich", nationality: "Canadian", period: "Modern",
    title: "Lullaby",
    difficulty: [5, 6],
    description: "A gentle, lyrical miniature. Accessible modern writing with warm, tonal harmonic language.",
    editions: "Canadian Music Centre.",
    examLevel: "RCM 8"
  },
  {
    id: "perrault-solitude", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Michel Perrault", nationality: "Canadian", period: "Modern",
    title: "Solitude",
    difficulty: [6, 7],
    description: "A contemplative work by the Canadian composer. Atmospheric and expressive.",
    editions: "Canadian Music Centre.",
    examLevel: "RCM 8"
  },
  {
    id: "rode-air-varie", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Pierre Rode", nationality: "French", period: "Classical/Romantic",
    title: "Air varié",
    difficulty: [7, 8],
    description: "A theme-and-variations showpiece by the great French violinist. Elegant themes with progressively virtuosic variations in the French Classical-Romantic style.",
    editions: "International Music Company; Peters.",
    examLevel: "RCM 9"
  },
  {
    id: "giron-sonata4", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Arsenio Girón", nationality: "Guatemalan-Canadian", period: "Modern",
    title: "Sonata IV for Violin and Piano; Sonata breve; Five Episodes; Violin Sonata II",
    difficulty: [7, 9],
    description: "Girón is a significant Latin American-Canadian composer whose violin works appear extensively across RCM Grades 9, 10, and ARCT. His music blends Latin American rhythmic vitality with European modernist technique.",
    editions: "Canadian Music Centre.",
    examLevel: "RCM 9–ARCT"
  },
  {
    id: "mcintyre-sonata", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "David McIntyre", nationality: "Canadian", period: "Modern",
    title: "Sonata No. 1 for Violin and Piano",
    difficulty: [7, 8],
    description: "A Canadian sonata of moderate difficulty and contemporary idiom.",
    editions: "Canadian Music Centre.",
    examLevel: "RCM 9"
  },
  {
    id: "paganini-sonata-e", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Niccolò Paganini", nationality: "Italian", period: "Romantic",
    title: "Sonata in E Minor, Op. 3/12",
    difficulty: [7, 8],
    description: "A substantial late sonata from Paganini's set of six. More musically serious than some of his display pieces, with genuine compositional craft.",
    editions: "International Music Company; Ricordi.",
    examLevel: "RCM 9"
  },
  {
    id: "adaskin-sonatine-baroque", tier: "syllabus", category: "Solo Repertoire", subcategory: "Solo Violin", composer: "Murray Adaskin", nationality: "Canadian", period: "Modern",
    title: "Sonatine baroque for Solo Violin",
    difficulty: [7, 8],
    description: "A neoclassical solo work combining Baroque formal models with modern harmonic language. Adaskin's violin background (student of Kathleen Parlow) informs the idiomatic writing.",
    editions: "Canadian Music Centre.",
    examLevel: "RCM 9"
  },
  {
    id: "vivaldi-rv10-respighi", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Antonio Vivaldi (transc. Respighi)", nationality: "Italian", period: "Baroque",
    title: "Sonata in D Major, RV 10 (transcription by Respighi)",
    difficulty: [7, 8],
    description: "Respighi's luxurious transcription of a Vivaldi sonata — the piano part is richly elaborated beyond simple continuo realization, creating an appealing Baroque-Romantic hybrid.",
    editions: "Ricordi.",
    examLevel: "RCM 9"
  },
  {
    id: "holt-suite2", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Patricia Blomfield Holt", nationality: "Canadian", period: "Modern",
    title: "Suite No. 2 for Violin and Piano",
    difficulty: [7, 8],
    description: "A multi-movement suite by the Canadian violinist-composer. Accessible modern idiom.",
    editions: "Canadian Music Centre.",
    examLevel: "RCM 9"
  },
  {
    id: "gratton-danse", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Hector Gratton", nationality: "Canadian", period: "Modern",
    title: "Quatrième danse canadienne",
    difficulty: [7, 8],
    description: "A Canadian folk-inspired dance piece. Rhythmic vitality with national character.",
    editions: "Canadian Music Centre.",
    examLevel: "RCM 9"
  },
  {
    id: "stravinsky-ballad", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Igor Stravinsky", nationality: "Russian-American", period: "Modern",
    title: "Ballad from The Fairy's Kiss (arr. for violin and piano)",
    difficulty: [7, 8],
    description: "A lyrical arrangement from Stravinsky's Tchaikovsky-homage ballet. Warm, tonal, and surprisingly Romantic for Stravinsky.",
    editions: "Boosey & Hawkes.",
    examLevel: "RCM 9"
  },
  {
    id: "buczynski-sonata", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Walter Buczynski", nationality: "Canadian", period: "Modern",
    title: "Sonata for Violin and Piano (1979)",
    difficulty: [8, 8],
    description: "A substantial Canadian sonata with modernist harmonic language. Buczynski taught at the University of Toronto.",
    editions: "Canadian Music Centre.",
    examLevel: "RCM 10"
  },
  {
    id: "vallerand-sonata", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Jean Vallerand", nationality: "Canadian", period: "Modern",
    title: "Sonata for Violin and Piano (1950)",
    difficulty: [8, 8],
    description: "A mid-century Canadian sonata by the Montreal-based composer, critic, and educator. Post-Romantic idiom with French-Canadian character.",
    editions: "Canadian Music Centre.",
    examLevel: "RCM 10"
  },
  {
    id: "archer-prelude", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Violet Archer", nationality: "Canadian", period: "Modern",
    title: "Prelude and Allegro for Violin and Piano",
    difficulty: [7, 8],
    description: "A two-movement work by one of Alberta's most distinguished composers. Archer studied with Bartók in New York. Clean, neoclassical style.",
    editions: "Canadian Music Centre.",
    examLevel: "RCM 10"
  },
  {
    id: "baker-flight", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Michael Conway Baker", nationality: "Canadian", period: "Modern",
    title: "Flight of Aphrodite, Op. 99",
    difficulty: [7, 8],
    description: "A lyrical, accessible Canadian work. Baker is one of Canada's most-performed living composers, known for tonal, audience-friendly music.",
    editions: "Canadian Music Centre.",
    examLevel: "RCM 10"
  },
  {
    id: "chan-soulmate", tier: "syllabus", category: "Solo Repertoire", subcategory: "Solo Violin", composer: "Chan Ka Nin", nationality: "Canadian", period: "Modern",
    title: "Soulmate for Solo Violin",
    difficulty: [7, 8],
    description: "A contemporary unaccompanied work by the Hong Kong-born Canadian composer. Chan's music blends Asian and Western sensibilities.",
    editions: "Canadian Music Centre.",
    examLevel: "RCM 10"
  },
  {
    id: "lau-joy", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Kevin Lau", nationality: "Canadian", period: "21st Century",
    title: "Joy for Violin and Piano",
    difficulty: [7, 8],
    description: "A contemporary Canadian work. Lau is an emerging Toronto-based composer whose music has been performed by major Canadian orchestras.",
    editions: "Canadian Music Centre.",
    examLevel: "RCM 10"
  },
  {
    id: "mozetich-affairs", tier: "syllabus", category: "Concerti", composer: "Marjan Mozetich", nationality: "Canadian (Italian-born)", period: "Modern",
    title: "Affairs of the Heart (Concerto for Violin and Orchestra, 1997)",
    difficulty: [8, 9],
    description: "A lyrical, neo-Romantic concerto that has become one of the most performed Canadian orchestral works. Accessible, tonal, and emotionally direct. Also available as a violin-piano reduction.",
    editions: "Canadian Music Centre.",
    examLevel: "ARCT"
  },
  {
    id: "mozetich-esprit", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Marjan Mozetich", nationality: "Canadian (Italian-born)", period: "Modern",
    title: "L'esprit chantant",
    difficulty: [8, 8],
    description: "A singing, lyrical work characteristic of Mozetich's accessible neo-Romantic style.",
    editions: "Canadian Music Centre.",
    examLevel: "ARCT"
  },
  {
    id: "dolin-sonata", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Samuel Dolin", nationality: "Canadian", period: "Modern",
    title: "Sonata for Violin and Piano",
    difficulty: [8, 9],
    description: "A substantial Canadian sonata by the Toronto-based composer and co-founder of the Canadian League of Composers.",
    editions: "Canadian Music Centre.",
    examLevel: "ARCT"
  },
  {
    id: "macdonald-phoenix", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Andrew Paul MacDonald", nationality: "Canadian", period: "Modern",
    title: "Violin Sonata No. 2 ('The Phoenix')",
    difficulty: [8, 9],
    description: "A programmatic Canadian sonata inspired by the phoenix myth. MacDonald's music is lyrical and dramatically effective.",
    editions: "Canadian Music Centre.",
    examLevel: "ARCT"
  },
  {
    id: "morawetz-duo", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Oskar Morawetz", nationality: "Canadian (Czech-born)", period: "Modern",
    title: "Duo for Violin and Piano; Sonata No. 1 (1956)",
    difficulty: [8, 9],
    description: "Works by one of Canada's most respected mid-century composers. Born in Prague, fled to Canada in 1940. His music combines Czech lyricism with modernist technique.",
    editions: "Canadian Music Centre.",
    examLevel: "ARCT"
  },
  {
    id: "raum-works", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Elizabeth Raum", nationality: "Canadian", period: "Modern",
    title: "Sonata; Les ombres; Prayer and Dance of Praise",
    difficulty: [7, 9],
    description: "Several violin works by the Canadian oboist-composer appear across RCM Grades 10 and ARCT. Accessible modern idiom with lyrical warmth.",
    editions: "Canadian Music Centre.",
    examLevel: "RCM 10; ARCT"
  },
  {
    id: "andrzejowski-burleska", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Marek Andrzejowski", nationality: "Polish-Canadian", period: "Modern",
    title: "Burleska",
    difficulty: [7, 8],
    description: "A lively, humorous concert piece by the Polish-Canadian violinist-composer.",
    editions: "Canadian Music Centre.",
    examLevel: "ARCT"
  },
  {
    id: "brott-invocation", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Alexander Brott", nationality: "Canadian", period: "Modern",
    title: "Invocation and Dance",
    difficulty: [8, 8],
    description: "A two-part work by the distinguished Montreal violinist-conductor-composer. Brott founded the McGill Chamber Orchestra and I Musici de Montreal.",
    editions: "Canadian Music Centre.",
    examLevel: "ARCT"
  },
  {
    id: "kabalevsky-rondo", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Dmitri Kabalevsky", nationality: "Russian", period: "Modern",
    title: "Rondo, Op. 69",
    difficulty: [7, 8],
    description: "A brilliant, energetic rondo by the Soviet composer known for accessible pedagogical music. More virtuosic than the concerto. Clean, driving rhythms.",
    editions: "International Music Company; Sikorski.",
    examLevel: "ARCT"
  },
  {
    id: "papineau-caprices", tier: "syllabus", category: "Solo Repertoire", subcategory: "Solo Violin", composer: "Jean Papineau-Couture", nationality: "Canadian", period: "Modern",
    title: "Trois caprices for Solo Violin",
    difficulty: [8, 9],
    description: "Three modernist caprices by one of Quebec's most significant mid-century composers. Demanding contemporary solo writing.",
    editions: "Canadian Music Centre.",
    examLevel: "ARCT"
  },
  {
    id: "pentland-vista", tier: "syllabus", category: "Solo Repertoire", subcategory: "Solo Violin", composer: "Barbara Pentland", nationality: "Canadian", period: "Modern",
    title: "Vista for Solo Violin",
    difficulty: [8, 9],
    description: "An unaccompanied work by one of the pioneers of modernism in Canadian music. Pentland studied with Copland and taught at UBC.",
    editions: "Canadian Music Centre.",
    examLevel: "ARCT"
  },
  {
    id: "robinovitch-meditation", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Sid Robinovitch", nationality: "Canadian", period: "Modern",
    title: "Meditation for Violin and Piano",
    difficulty: [7, 8],
    description: "A contemplative work by the Canadian composer.",
    editions: "Canadian Music Centre.",
    examLevel: "ARCT"
  },
  {
    id: "gruber-4pieces", tier: "syllabus", category: "Solo Repertoire", subcategory: "Solo Violin", composer: "H.K. Gruber", nationality: "Austrian", period: "Modern",
    title: "Four Pieces for Solo Violin",
    difficulty: [9, 10],
    description: "Four substantial unaccompanied pieces by the Austrian composer known for his theatrical, post-modern style. Demanding contemporary technique.",
    editions: "Boosey & Hawkes.",
    examLevel: "ARCT"
  },
  {
    id: "hetu-works", tier: "syllabus", category: "Solo Repertoire", subcategory: "Solo Violin", composer: "Jacques Hétu", nationality: "Canadian", period: "Modern",
    title: "Rondo varié, Op. 25; Variations, Op. 11 (for solo violin)",
    difficulty: [8, 9],
    description: "Two unaccompanied works by one of Quebec's leading modernist composers. Hétu's music combines serial technique with lyrical expression.",
    editions: "Canadian Music Centre.",
    examLevel: "ARCT"
  },
  {
    id: "ledroit-wandering", tier: "syllabus", category: "Solo Repertoire", subcategory: "Solo Violin", composer: "Paul Ledroit", nationality: "Canadian", period: "Modern",
    title: "Wandering the Threshold of Delirium for Solo Violin",
    difficulty: [8, 9],
    description: "An evocatively titled contemporary Canadian work for unaccompanied violin.",
    editions: "Canadian Music Centre.",
    examLevel: "ARCT"
  },
  {
    id: "prevost-improvisations", tier: "syllabus", category: "Solo Repertoire", subcategory: "Solo Violin", composer: "André Prévost", nationality: "Canadian", period: "Modern",
    title: "Improvisations I pour Violon Seul",
    difficulty: [8, 9],
    description: "A substantial unaccompanied work by the Montreal-born composer. Prévost studied with Messiaen and Dutilleux in Paris.",
    editions: "Canadian Music Centre.",
    examLevel: "ARCT"
  }
,
  {
    id: "martinu-intermezzos", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Bohuslav Martinů", nationality: "Czech", period: "Modern",
    title: "Four Intermezzos, H. 261 (No. 3: Andante)",
    difficulty: [4, 5],
    description: "Short, atmospheric miniatures. No. 3 (Andante) appears on ABRSM Grade 4 List B. Martinů's characteristic Czech warmth within clean neoclassical textures.",
    editions: "Bärenreiter.",
    examLevel: "ABRSM 4"
  },
  {
    id: "richter-moderato", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Marga Richter", nationality: "American", period: "Modern",
    title: "Moderato from Three Pieces for Violin and Piano",
    difficulty: [6, 6],
    description: "A contemplative piece by the New York-based woman composer. Richter's music is tonal and emotionally direct.",
    editions: "Carl Fischer.",
    examLevel: "ABRSM 6"
  },
  {
    id: "trott-spanish", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Josephine Trott", nationality: "American", period: "Early 20th Century",
    title: "In a Spanish Garden",
    difficulty: [6, 6],
    description: "An atmospheric character piece by the American violinist-pedagogue best known for Melodious Double-Stops. Spanish-flavored, warm, and appealing.",
    editions: "G. Schirmer.",
    examLevel: "ABRSM 6"
  },
  {
    id: "barns-morceau", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Ethel Barns", nationality: "British", period: "Romantic",
    title: "Morceau from Two Compositions",
    difficulty: [7, 7],
    description: "A lyrical concert piece by the British violinist-composer. Barns was a professional violinist who performed widely in London.",
    editions: "ABRSM exam publication.",
    examLevel: "ABRSM 7"
  },
  {
    id: "dauvergne-allegro", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Antoine Dauvergne", nationality: "French", period: "Baroque/Classical",
    title: "Allegro from Sonata in E, Op. 2/11",
    difficulty: [8, 8],
    description: "A brilliant movement by the French composer who directed the Paris Opéra. Dauvergne bridges the Baroque and Classical eras in French music.",
    editions: "Various Baroque anthologies.",
    examLevel: "ABRSM 8"
  },
  {
    id: "kammel-sonata", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Antonín Kammel", nationality: "Czech-British", period: "Classical",
    title: "Tempo giusto from Sonata in A, Op. 10/2",
    difficulty: [8, 8],
    description: "A clean Classical sonata movement by the Bohemian violinist active in London. Kammel was a student of Tartini who became part of the Bach-Abel concert series circle.",
    editions: "Various Classical anthologies.",
    examLevel: "ABRSM 8"
  },
  {
    id: "schreivogel-sonata", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Friedrich Schreivogel", nationality: "Austrian", period: "Classical",
    title: "Larghetto & Vivace from Sonata in E-flat",
    difficulty: [8, 8],
    description: "Two movements from a Classical-era sonata. A less-known but well-crafted work from the Viennese Classical tradition.",
    editions: "ABRSM exam publication.",
    examLevel: "ABRSM 8"
  },
  {
    id: "talbot-november", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Joby Talbot", nationality: "British", period: "21st Century",
    title: "November: Eleven (from Ink Dark Moon)",
    difficulty: [8, 8],
    description: "A contemporary British work from the award-winning film and ballet composer. Atmospheric and rhythmically inventive, reflecting Talbot's distinctive voice.",
    editions: "Chester Music.",
    examLevel: "ABRSM 8"
  },
  {
    id: "grime-romance", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Helen Grime", nationality: "British", period: "21st Century",
    title: "Romance for Violin and Piano",
    difficulty: [8, 8],
    description: "A contemporary work by one of Britain's leading young composers. Grime's music is praised for its textural imagination and emotional directness.",
    editions: "Chester Music.",
    examLevel: "ABRSM 8"
  },
  {
    id: "mulsant-chant", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Florentine Mulsant", nationality: "French", period: "21st Century",
    title: "Chant from Suite pour violon, Op. 50",
    difficulty: [8, 8],
    description: "A lyrical movement by the contemporary French woman composer. Mulsant's music is rooted in the French tradition of Messiaen and Dutilleux.",
    editions: "Music Publisher (France).",
    examLevel: "ABRSM 8"
  },
  {
    id: "ravel-sonata2-blues", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Maurice Ravel", nationality: "French", period: "Modern",
    title: "Blues (Moderato) from Violin Sonata No. 2 in G major (1927, 2nd mvt)",
    difficulty: [8, 8],
    description: "The jazz-influenced second movement of Ravel's final violin sonata. Blue notes, banjo-like pizzicato, and syncopated rhythms within Ravel's crystalline style. One of the earliest classical works to incorporate jazz idiom seriously.",
    editions: "Durand.",
    examLevel: "ABRSM 8"
  }
,
  {
    id: "rcm-bizet-carmen", tier: "syllabus", category: "Orchestral Excerpts", composer: "Georges Bizet",
    title: "Carmen Suite No. 1, Les Toréadors — Violin 1 (mm. 1–101)",
    difficulty: [5, 6],
    description: "Brilliant, rhythmic passage work. One of the most recognizable orchestral openings. Tests clean articulation and ensemble precision.",
    editions: "Standard orchestral/chamber parts.",
    examLevel: "RCM 7"
  },
  {
    id: "rcm-elgar-serenade", tier: "syllabus", category: "Orchestral Excerpts", composer: "Edward Elgar",
    title: "Serenade for Strings, Op. 20 — Violin 1 (1st & 2nd mvts)",
    difficulty: [5, 6],
    description: "Warm English Romantic string writing. The Larghetto is lyrical; the Allegro piacevole requires light, clean articulation.",
    editions: "Standard orchestral/chamber parts.",
    examLevel: "RCM 7"
  },
  {
    id: "rcm-handel-messiah", tier: "syllabus", category: "Orchestral Excerpts", composer: "George Frideric Handel",
    title: "Messiah, Overture — Violin 1 (complete)",
    difficulty: [5, 6],
    description: "French-style Baroque overture with dotted rhythms and a fugal Allegro moderato. Tests Baroque articulation and rhythmic clarity.",
    editions: "Standard orchestral/chamber parts.",
    examLevel: "RCM 7"
  },
  {
    id: "rcm-haydn-bird", tier: "syllabus", category: "Orchestral Excerpts", composer: "Joseph Haydn",
    title: "String Quartet 'The Bird', Op. 33/3 — Violin 1 (1st mvt, mm. 1–59)",
    difficulty: [5, 6],
    description: "Elegant Classical quartet writing with the characteristic 'bird-call' ornaments that give the quartet its nickname.",
    editions: "Standard orchestral/chamber parts.",
    examLevel: "RCM 7"
  },
  {
    id: "rcm-haydn-49", tier: "syllabus", category: "Orchestral Excerpts", composer: "Joseph Haydn",
    title: "Symphony No. 49 'La passione' — Violin 1 (2nd mvt, mm. 1–51)",
    difficulty: [5, 6],
    description: "Sturm und Drang–period Haydn. Dramatic minor-key writing with emotional intensity unusual for its era.",
    editions: "Standard orchestral/chamber parts.",
    examLevel: "RCM 7"
  },
  {
    id: "rcm-mendelssohn-qt12", tier: "syllabus", category: "Orchestral Excerpts", composer: "Felix Mendelssohn",
    title: "String Quartet Op. 12, Canzonetta — Violin 1 (mm. 1–49)",
    difficulty: [5, 6],
    description: "A light, scherzo-like movement requiring delicate spiccato and elfin character — similar to the Midsummer Night's Dream Scherzo in miniature.",
    editions: "Standard orchestral/chamber parts.",
    examLevel: "RCM 7"
  },
  {
    id: "rcm-mozart-29", tier: "syllabus", category: "Orchestral Excerpts", composer: "Wolfgang Amadeus Mozart",
    title: "Symphony No. 29 — Violin 1 (1st mvt, mm. 1–77)",
    difficulty: [5, 6],
    description: "Clean, elegant Classical passage work from one of Mozart's finest early symphonies. Tests even articulation and Classical phrasing.",
    editions: "Standard orchestral/chamber parts.",
    examLevel: "RCM 7"
  },
  {
    id: "rcm-bach-brandenburg3", tier: "syllabus", category: "Orchestral Excerpts", composer: "J.S. Bach",
    title: "Brandenburg Concerto No. 3 — Violin 1 (3rd mvt excerpt)",
    difficulty: [6, 7],
    description: "Brilliant Baroque passage work in perpetual-motion style. Tests clean, even articulation at tempo and Baroque phrasing.",
    editions: "Standard orchestral/chamber parts.",
    examLevel: "RCM 8"
  },
  {
    id: "rcm-beethoven-2", tier: "syllabus", category: "Orchestral Excerpts", composer: "Ludwig van Beethoven",
    title: "Symphony No. 2 — Violin 1 (3rd & 4th mvts excerpt)",
    difficulty: [6, 7],
    description: "The Scherzo's rhythmic precision and the finale's rapid passage work. Early Beethoven with Classical clarity.",
    editions: "Standard orchestral/chamber parts.",
    examLevel: "RCM 8"
  },
  {
    id: "rcm-grieg-holberg", tier: "syllabus", category: "Orchestral Excerpts", composer: "Edvard Grieg",
    title: "Holberg Suite, Op. 40 — Violin 1 (1st & 4th mvts excerpt)",
    difficulty: [6, 7],
    description: "The Praeludium is brilliant and rhythmically driven; the Air is sustained and lyrical. Baroque forms with Romantic Norwegian harmony.",
    editions: "Standard orchestral/chamber parts.",
    examLevel: "RCM 8"
  },
  {
    id: "rcm-haydn-94", tier: "syllabus", category: "Orchestral Excerpts", composer: "Joseph Haydn",
    title: "Symphony No. 94 'Surprise' — Violin 1 (2nd mvt excerpt)",
    difficulty: [6, 7],
    description: "The famous theme-and-variations movement. Tests ability to shape a melody through increasingly elaborate variations with dynamic control.",
    editions: "Standard orchestral/chamber parts.",
    examLevel: "RCM 8"
  },
  {
    id: "rcm-mozart-qt421", tier: "syllabus", category: "Orchestral Excerpts", composer: "Wolfgang Amadeus Mozart",
    title: "String Quartet K. 421 — Violin 1 (1st & 3rd mvts excerpt)",
    difficulty: [6, 7],
    description: "One of the great 'Haydn' Quartets. Dramatic D minor first movement and elegant Menuetto. Tests Classical quartet style.",
    editions: "Standard orchestral/chamber parts.",
    examLevel: "RCM 8"
  },
  {
    id: "rcm-mozart-25", tier: "syllabus", category: "Orchestral Excerpts", composer: "Wolfgang Amadeus Mozart",
    title: "Symphony No. 25 — Violin 1 (1st mvt, mm. 1–83)",
    difficulty: [6, 7],
    description: "The famous G minor symphony opening (used in Amadeus). Urgent Sturm und Drang character with syncopations and clean passage work.",
    editions: "Standard orchestral/chamber parts.",
    examLevel: "RCM 8"
  },
  {
    id: "rcm-saintsaens-carnival", tier: "syllabus", category: "Orchestral Excerpts", composer: "Camille Saint-Saëns",
    title: "Carnival of the Animals, Finale — Violin 1 (mm. 53–92)",
    difficulty: [6, 7],
    description: "Brilliant passage work quoting themes from earlier movements. Tests fleet articulation and rhythmic precision.",
    editions: "Standard orchestral/chamber parts.",
    examLevel: "RCM 8"
  },
  {
    id: "rcm-britten-ypg", tier: "syllabus", category: "Orchestral Excerpts", composer: "Benjamin Britten",
    title: "Young Person's Guide to the Orchestra — Violin 1 (Variation M)",
    difficulty: [7, 8],
    description: "The violin variation from Britten's orchestral showcase. Brilliant, virtuosic writing that demonstrates the violin's range and agility.",
    editions: "Standard orchestral/chamber parts.",
    examLevel: "RCM 9"
  },
  {
    id: "rcm-dvorak-serenade", tier: "syllabus", category: "Orchestral Excerpts", composer: "Antonín Dvořák",
    title: "Serenade in E Major, Op. 22 — Violin 1 (2nd mvt excerpt)",
    difficulty: [6, 7],
    description: "Lyrical, warm Czech Romantic string writing. Sustained melodic playing with rich harmonic support.",
    editions: "Standard orchestral/chamber parts.",
    examLevel: "RCM 9"
  },
  {
    id: "rcm-haydn-104", tier: "syllabus", category: "Orchestral Excerpts", composer: "Joseph Haydn",
    title: "Symphony No. 104 'London' — Violin 1 (1st & 2nd mvts excerpt)",
    difficulty: [6, 7],
    description: "Haydn's final symphony. The introduction is dramatic; the Allegro spiritoso requires clean, fleet passage work. The Andante is lyrical.",
    editions: "Standard orchestral/chamber parts.",
    examLevel: "RCM 9"
  },
  {
    id: "rcm-rossini-gazza", tier: "syllabus", category: "Orchestral Excerpts", composer: "Gioachino Rossini",
    title: "La gazza ladra, Overture — Violin 1 (excerpt)",
    difficulty: [7, 8],
    description: "The famous overture with its snare-drum opening. The violin writing demands clean, rapid passage work and crescendo control in Rossini's signature style.",
    editions: "Standard orchestral/chamber parts.",
    examLevel: "RCM 9"
  },
  {
    id: "rcm-berlioz-fantastique", tier: "syllabus", category: "Orchestral Excerpts", composer: "Hector Berlioz",
    title: "Symphonie fantastique — Violin 1 (1st & 2nd mvts excerpt)",
    difficulty: [7, 8],
    description: "The idée fixe (recurring theme) in the first movement; the waltz in the second. Berlioz's revolutionary orchestration demands tonal color and rhythmic flexibility.",
    editions: "Standard orchestral/chamber parts.",
    examLevel: "RCM 10"
  },
  {
    id: "rcm-dvorak-american-qt", tier: "syllabus", category: "Orchestral Excerpts", composer: "Antonín Dvořák",
    title: "String Quartet 'American', Op. 96 — Violin 1 (1st mvt excerpt)",
    difficulty: [6, 7],
    description: "The famous opening theme and development of one of the most popular quartets. Pentatonic melodies with Czech-American warmth.",
    editions: "Standard orchestral/chamber parts.",
    examLevel: "RCM 10"
  },
  {
    id: "rcm-tchaikovsky-serenade", tier: "syllabus", category: "Orchestral Excerpts", composer: "Pyotr Ilyich Tchaikovsky",
    title: "Serenade for Strings, Op. 48 — Violin 1 (1st mvt excerpt)",
    difficulty: [7, 8],
    description: "The majestic opening chorale and the Allegro non troppo. Rich Russian string writing demanding section unity and tonal warmth.",
    editions: "Standard orchestral/chamber parts.",
    examLevel: "RCM 10"
  },
  {
    id: "rcm-schoenberg-vn", tier: "syllabus", category: "Orchestral Excerpts", composer: "Arnold Schoenberg",
    title: "Verklärte Nacht — Violin 1 (mm. 278–318)",
    difficulty: [8, 9],
    description: "From the passionate climax of Schoenberg's pre-atonal string sextet/orchestra masterpiece. Demands intensity, high-position command, and tonal richness.",
    editions: "Standard orchestral/chamber parts.",
    examLevel: "ARCT"
  },
  {
    id: "rcm-schubert-qt14", tier: "syllabus", category: "Orchestral Excerpts", composer: "Franz Schubert",
    title: "String Quartet 'Death and the Maiden', D. 810 — Violin 1 (1st & 4th mvts excerpt)",
    difficulty: [7, 8],
    description: "Two of the most dramatic quartet movements in the repertoire. The first movement's tremolo opening and the tarantella-finale's relentless drive.",
    editions: "Standard orchestral/chamber parts.",
    examLevel: "ARCT"
  },
  {
    id: "rcm-strauss-bourgeois", tier: "syllabus", category: "Orchestral Excerpts", composer: "Richard Strauss",
    title: "Le Bourgeois Gentilhomme Suite — Violin 1 (4th mvt excerpt)",
    difficulty: [7, 8],
    description: "Elegant, witty chamber-orchestral writing from Strauss's collaboration with Hofmannsthal. Clean Classical pastiche with Straussian warmth.",
    editions: "Standard orchestral/chamber parts.",
    examLevel: "ARCT"
  },
  {
    id: "rcm-tchaikovsky-swan-cm", tier: "syllabus", category: "Orchestral Excerpts", composer: "Pyotr Ilyich Tchaikovsky",
    title: "Swan Lake Suite — Concertmaster Solo (4th mvt)",
    difficulty: [7, 8],
    description: "One of the standard concertmaster solos. Lyrical, expressive, and exposed. Tests sustained cantabile and confidence as a soloist within the orchestra.",
    editions: "Standard orchestral/chamber parts.",
    examLevel: "ARCT"
  }
,
  {
    id: "kreisler-cf-vol1", tier: "core", category: "Repertoire Collections", composer: "Fritz Kreisler (ed. Eric Wen)", nationality: "Austrian-American", period: "Early 20th Century",
    title: "The Fritz Kreisler Collection, Vol. 1 (Carl Fischer ATF115)",
    difficulty: [5, 8],
    description: "The first and most essential volume of the definitive Carl Fischer edition, compiled and edited by Eric Wen. Contains 22 pieces: seven of Kreisler's most famous originals (Liebesleid, Liebesfreud, Schön Rosmarin, Caprice Viennois, Tambourin Chinois, Rondino on a theme by Beethoven, etc.), pastiches in the style of Tartini, Couperin, Francoeur, and Pugnani (including the Praeludium and Allegro and Sicilienne and Rigaudon), seven transcriptions (Gluck, Mozart, Falla, etc.), and cadenzas for the Beethoven, Brahms, and Paganini concerti. ASTA Grades 4–6. The single most important volume of short violin pieces in existence.",
    skills: "Varied styles; elegant phrasing; Viennese rubato and portamento; moderate virtuosity; bow control; cadenza style.",
    editions: "Carl Fischer (ATF115). Also available individually from Schott and Charles Foley.",
    examLevel: "RCM 5–8; ABRSM 5–7 (varies by piece)"
  },
  {
    id: "kreisler-cf-vol2", tier: "core", category: "Repertoire Collections", composer: "Fritz Kreisler (ed. Eric Wen)", nationality: "Austrian-American", period: "Early 20th Century",
    title: "The Fritz Kreisler Collection, Vol. 2 (Carl Fischer ATF124)",
    difficulty: [5, 8],
    description: "The second volume continues with a rich mix of pastiches, transcriptions, and originals. Contains 35 pieces including: Andantino, Scherzo, Tempo di Minuetto, La Chasse, Preghiera, Allegretto (in the style of various composers); transcriptions of Brahms Hungarian Dance No. 17, Dvořák Slavonic Dances Nos. 1 & 3, Dvořák Songs My Mother Taught Me, Rimsky-Korsakov Hymn to the Sun & Song of India, Tchaikovsky Andante cantabile & Humoresque, Chanson sans paroles; and originals including Gypsy Caprice, The Old Refrain, Midnight Bells (Heuberger), Berceuse romantique, Marche miniature viennoise, and Syncopation. ASTA Grades 4–6.",
    skills: "Transcription style; varied national characters (Hungarian, Slavonic, Russian, Viennese); lyrical playing; moderate virtuosity.",
    editions: "Carl Fischer (ATF124).",
    examLevel: "RCM 5–8 (varies by piece)"
  },
  {
    id: "kreisler-cf-vol3", tier: "core", category: "Repertoire Collections", composer: "Fritz Kreisler (ed. Eric Wen)", nationality: "Austrian-American", period: "Early 20th Century",
    title: "The Fritz Kreisler Collection, Vol. 3: The Masters Collection (Carl Fischer)",
    difficulty: [6, 9],
    description: "Subtitled 'The Masters Collection,' this volume focuses on Kreisler's arrangements of works by the great violinist-composers: Corelli, Tartini, and Paganini. Contains twelve Kreisler arrangements from these three composers, plus three previously unpublished La Folia Variations (Corelli). The Corelli and Tartini pieces were originally for solo violin with figured bass; Kreisler's piano realizations are characteristically rich and idiomatic. The La Folia Variations constitute a substantial concert work. Essential for understanding how the Baroque and Classical violin traditions were transmitted through Romantic-era editorial practice.",
    skills: "Baroque-through-Romantic styles; Corelli/Tartini/Paganini idiom through Kreisler's lens; theme-and-variation form; double stops; bravura.",
    editions: "Carl Fischer.",
    examLevel: "RCM 7–9 (varies)"
  },
  {
    id: "kreisler-cf-vol4", tier: "core", category: "Repertoire Collections", composer: "Fritz Kreisler (ed. Eric Wen)", nationality: "Austrian-American", period: "Early 20th Century",
    title: "The Fritz Kreisler Collection, Vol. 4 (Carl Fischer BF11)",
    difficulty: [5, 7],
    description: "A volume of pastiche pieces 'in the style of' various composers — Vivaldi, Stamitz, Porpora, Couperin — alongside original character pieces: Toy Soldiers' March, Malagueña, Episode, and Romance. These demonstrate Kreisler's genius for absorbing and replicating historical styles so convincingly that they were accepted as genuine discoveries for decades. Lighter in character than Vols. 1–3, these pieces are excellent for developing stylistic versatility and charm at the intermediate level.",
    skills: "Style imitation; varied national and period characters; elegant phrasing; charm; intermediate-level technique.",
    editions: "Carl Fischer (BF11).",
    examLevel: "RCM 5–7"
  },
  {
    id: "kreisler-cf-vol5", tier: "core", category: "Repertoire Collections", composer: "Fritz Kreisler (ed. Eric Wen)", nationality: "Austrian-American", period: "Early 20th Century",
    title: "The Fritz Kreisler Collection, Vol. 5 (Carl Fischer)",
    difficulty: [3, 7],
    description: "Eight original pieces and arrangements with a pedagogical emphasis: includes fingerings for simplified versions in first or first-and-third positions for some pieces, as well as markings for more advanced players. This makes Vol. 5 uniquely useful for teachers who want to introduce Kreisler's music to younger or less advanced students. The dual-fingering approach allows a student to grow with the same piece — playing the simplified version first, then graduating to the full version.",
    skills: "Accessible Kreisler at student levels; graded fingerings; introduction to Kreisler style for younger players.",
    editions: "Carl Fischer.",
    examLevel: "RCM 3–7 (with simplified fingerings from RCM 3)"
  }
,
  {
    id: "kreisler-praeludium", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Fritz Kreisler", nationality: "Austrian-American", period: "Early 20th Century",
    title: "Praeludium and Allegro (in the style of Pugnani)",
    difficulty: [5, 6],
    description: "The most frequently performed of all Kreisler pieces. A noble, sustained Praeludium followed by a brilliant Allegro with clean passage work and double stops. Originally attributed to Pugnani. Standard intermediate recital piece and competition staple. In Carl Fischer Collection Vol. 1.",
    editions: "Carl Fischer (Fritz Kreisler Collection); Schott; Charles Foley.",
    examLevel: "RCM 5–6; ABRSM 5; ASTACAP 9"
  },
  {
    id: "kreisler-sicilienne", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Fritz Kreisler", nationality: "Austrian-American", period: "Early 20th Century",
    title: "Sicilienne and Rigaudon (in the style of Francoeur)",
    difficulty: [5, 6],
    description: "Two contrasting movements: a gentle, lilting Sicilienne followed by a vigorous Rigaudon. Originally attributed to Francoeur. One of the most popular Kreisler pieces for intermediate students. In Carl Fischer Collection Vol. 1.",
    editions: "Carl Fischer (Fritz Kreisler Collection); Schott; Charles Foley.",
    examLevel: "RCM 5; ASTACAP 8"
  },
  {
    id: "kreisler-liebesleid", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Fritz Kreisler", nationality: "Austrian-American", period: "Early 20th Century",
    title: "Liebesleid (Love's Sorrow)",
    difficulty: [5, 6],
    description: "A wistful Viennese waltz — one of the most beloved violin encores. Demands rubato, tonal warmth, and Viennese style. Paired with Liebesfreud as complementary works. In Carl Fischer Collection Vol. 1.",
    editions: "Carl Fischer (Fritz Kreisler Collection); Schott; Charles Foley.",
    examLevel: "RCM 6–7; ASTACAP 7"
  },
  {
    id: "kreisler-liebesfreud", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Fritz Kreisler", nationality: "Austrian-American", period: "Early 20th Century",
    title: "Liebesfreud (Love's Joy)",
    difficulty: [5, 6],
    description: "The joyful companion to Liebesleid. A sparkling, exuberant Viennese waltz. Slightly more technically demanding than Liebesleid. In Carl Fischer Collection Vol. 1.",
    editions: "Carl Fischer (Fritz Kreisler Collection); Schott; Charles Foley.",
    examLevel: "RCM 6–7; ASTACAP 9"
  },
  {
    id: "kreisler-schoenrosmarin", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Fritz Kreisler", nationality: "Austrian-American", period: "Early 20th Century",
    title: "Schön Rosmarin",
    difficulty: [5, 5],
    description: "A delicate, graceful miniature. One of the first Kreisler pieces many students learn. Demands lightness and charm. In Carl Fischer Collection Vol. 1.",
    editions: "Carl Fischer (Fritz Kreisler Collection); Schott; Charles Foley.",
    examLevel: "RCM 5–6; ASTACAP 9"
  },
  {
    id: "kreisler-capriceviennois", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Fritz Kreisler", nationality: "Austrian-American", period: "Early 20th Century",
    title: "Caprice Viennois, Op. 2",
    difficulty: [7, 7],
    description: "The most extended and virtuosic of Kreisler's original pieces. A sweeping Viennese waltz-fantasy demanding elegance, rubato, double stops, and brilliant passage work. Standard recital piece. In Carl Fischer Collection Vol. 1.",
    editions: "Carl Fischer (Fritz Kreisler Collection); Schott; Charles Foley.",
    examLevel: "RCM 7; ABRSM 7; ASTACAP 10"
  },
  {
    id: "kreisler-tambourin", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Fritz Kreisler", nationality: "Austrian-American", period: "Early 20th Century",
    title: "Tambourin Chinois, Op. 3",
    difficulty: [6, 6],
    description: "An exotic, rhythmically vivacious character piece. Rapid staccato and playful dynamic contrasts. Popular recital piece. In Carl Fischer Collection Vol. 1.",
    editions: "Carl Fischer (Fritz Kreisler Collection); Schott; Charles Foley.",
    examLevel: "RCM 6; ASTACAP 10"
  },
  {
    id: "kreisler-rondino", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Fritz Kreisler", nationality: "Austrian-American", period: "Early 20th Century",
    title: "Rondino on a Theme by Beethoven",
    difficulty: [4, 5],
    description: "A charming, gentle miniature based on a Beethoven theme. One of the most accessible Kreisler pieces, suitable for early intermediate students. In Carl Fischer Collection Vol. 1.",
    editions: "Carl Fischer (Fritz Kreisler Collection); Schott; Charles Foley.",
    examLevel: "RCM 4; ASTACAP 6"
  },
  {
    id: "kreisler-andantino", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Fritz Kreisler", nationality: "Austrian-American", period: "Early 20th Century",
    title: "Andantino (in the style of Padre Martini)",
    difficulty: [5, 6],
    description: "A serene, singing piece of great beauty. Originally attributed to the 18th-century theorist Padre Martini. Demands sustained cantabile. In Carl Fischer Collection Vol. 1.",
    editions: "Carl Fischer (Fritz Kreisler Collection); Schott; Charles Foley.",
    examLevel: "ABRSM 6"
  },
  {
    id: "kreisler-corelli-var", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Fritz Kreisler", nationality: "Austrian-American", period: "Early 20th Century",
    title: "Variations on a Theme by Corelli (La Folia)",
    difficulty: [7, 8],
    description: "A brilliant set of variations on the famous La Folia theme. The most substantial and virtuosic of Kreisler's arrangements — a concert showpiece with double stops, rapid passage work, and dramatic contrasts. In Carl Fischer Collection Vol. 3.",
    editions: "Carl Fischer (Fritz Kreisler Collection); Schott; Charles Foley.",
    examLevel: "RCM 7–8"
  },
  {
    id: "kreisler-lagitana", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Fritz Kreisler", nationality: "Austrian-American", period: "Early 20th Century",
    title: "La Gitana",
    difficulty: [6, 7],
    description: "A fiery Spanish-Gypsy character piece. Demands rhythmic vitality, portamento, and dramatic contrasts. In Carl Fischer Collection Vol. 1 or Vol. 2.",
    editions: "Carl Fischer (Fritz Kreisler Collection); Schott; Charles Foley.",
    examLevel: "RCM 7"
  }
,
  {
    id: "doflein-method", tier: "core", category: "Beginner Methods", composer: "Erich & Elma Doflein", nationality: "German", period: "20th Century",
    title: "The Doflein Method: The Violinist's Progress (Vols. 1–5, Schott)",
    difficulty: [0, 7],
    description: "The most important European alternative to Suzuki. Five volumes progress from absolute beginner through intermediate-advanced level. Distinguished by its musicality-first approach: real musical pieces (folk songs, Baroque dances, duets) from the earliest stages rather than dry exercises. Heavily used in German-speaking countries, Scandinavia, and Japan. Each volume integrates technique, reading, and musical development. The duet writing is particularly valuable for developing ensemble skills and intonation from the start.",
    skills: "Progressive technical development; music reading from the start; duet playing; European pedagogical tradition; musical expression integrated with technique.",
    editions: "Schott (original and only publisher).",
    examLevel: "ASTACAP Foundation–7; VMC 1–5"
  },
  {
    id: "oconnor-method", tier: "core", category: "Beginner Methods", composer: "Mark O'Connor", nationality: "American", period: "21st Century",
    title: "O'Connor Violin Method (Books 1–5+)",
    difficulty: [0, 6],
    description: "The most significant American alternative method, rooted in American musical traditions — fiddle tunes, folk, blues, ragtime, jazz — rather than the European classical canon. O'Connor (three-time CMA Musician of the Year, Grammy winner) designed the method to develop the same technical skills as traditional methods but through American repertoire. Students learn shifting, double stops, and bow techniques through reels, hoedowns, and blues. Increasingly adopted by teachers seeking to diversify their curriculum or engage students through American roots music. Includes piano accompaniments and backing tracks.",
    skills: "Standard violin technique through American idiom; fiddle styles; improvisation introduction; rhythmic vitality; cultural breadth.",
    editions: "Mark O'Connor Publications (available through Hal Leonard).",
    examLevel: "ASTACAP 1–6"
  },
  {
    id: "dvorak-romantic-pieces", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Antonín Dvořák", nationality: "Czech", period: "Romantic",
    title: "4 Romantic Pieces, Op. 75 (1887)",
    difficulty: [6, 7],
    description: "Four contrasting miniatures originally for violin and piano, among Dvořák's most charming chamber works. The Allegro moderato is warm and singing; the Allegro maestoso is noble; the Allegro appassionato is fiery; the Larghetto is deeply tender. Frequently performed in recital — individually or as a set. Excellent for developing varied character and Czech musical idiom at the intermediate-advanced level.",
    skills: "Varied character; Czech Romantic style; cantabile; rhythmic vitality; dynamic range.",
    editions: "Bärenreiter (Urtext); Peters; International Music Company.",
    examLevel: "ASTACAP 8; RCM 8"
  },
  {
    id: "villa-lobos-cisne", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Heitor Villa-Lobos", nationality: "Brazilian", period: "Modern",
    title: "O Canto do Cisne Negro (Song of the Black Swan, 1917)",
    difficulty: [6, 7],
    description: "A hauntingly beautiful, melancholic work by Brazil's greatest composer. The violin sings a long, sustained melody over a gently rocking piano accompaniment. Demands sustained cantabile, tonal beauty, and the ability to project a simple melody with depth and emotion. An excellent introduction to Latin American classical music.",
    skills: "Sustained cantabile; tonal beauty; simple melody with emotional depth; Latin American classical idiom.",
    editions: "Editions Max Eschig; Masters Music.",
    examLevel: "ASTACAP 7"
  },
  {
    id: "honegger-solo-sonata", tier: "core", category: "Solo Repertoire", subcategory: "Solo Violin", composer: "Arthur Honegger", nationality: "Swiss-French", period: "Modern",
    title: "Sonata for Solo Violin (1940)",
    difficulty: [8, 9],
    description: "A substantial single-movement work by the Les Six member, written during the German occupation of Paris. Intense, concentrated, and deeply serious. Combines neoclassical formal clarity with expressionist harmonic language. Less frequently performed than Bartók or Hindemith solo works but of comparable quality. A significant addition to the 20th-century solo violin literature.",
    skills: "Polyphonic playing; sustained intensity; neoclassical form; expressionist harmony; advanced left-hand technique.",
    editions: "Salabert.",
    examLevel: "ASTACAP 10"
  },
  {
    id: "zukofsky-scales", tier: "core", category: "Technical Exercises", subcategory: "Scale Systems", composer: "Paul Zukofsky", nationality: "American", period: "Modern",
    title: "All-Interval Scale Book (1977)",
    difficulty: [8, 10],
    description: "A radical reimagining of scale practice by the legendary new-music violinist. Instead of traditional major/minor scales, Zukofsky systematically works through all possible intervals in all positions, developing complete chromatic fluency and comfort with atonal pitch relationships. Essential for any violinist seriously engaging with 20th/21st-century repertoire. Complements rather than replaces Flesch and Galamian — it trains the ear and hand for music where traditional tonal patterns don't apply.",
    skills: "Chromatic fluency; atonal interval recognition; all-interval facility; contemporary music preparation; advanced ear training.",
    editions: "G. Schirmer.",
    examLevel: "ASTACAP 9–10"
  },
  {
    id: "bohm-pieces", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Carl Bohm", nationality: "German", period: "Romantic",
    title: "Introduction and Polonaise; Moto Perpetuo; Sarabande in G minor",
    difficulty: [4, 6],
    description: "Carl Bohm's student pieces appear in virtually every pedagogical collection (Barber Solos for Young Violinists, 37 Pieces You Like to Play, ASTA CAP). The Introduction and Polonaise develops broad, singing tone and brilliant passage work. The Moto Perpetuo builds even détaché/spiccato. The Sarabande develops sustained cantabile. Standard teaching repertoire at intermediate levels.",
    skills: "Singing tone; moderate passage work; varied character; student-level showmanship.",
    editions: "Carl Fischer; included in Barber Solos for Young Violinists.",
    examLevel: "ASTACAP 3–6"
  },
  {
    id: "persichetti-masques", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Vincent Persichetti", nationality: "American", period: "Modern",
    title: "Masques, Op. 99 (1966)",
    difficulty: [5, 6],
    description: "A set of short character pieces by the important American modernist. Each 'mask' has a distinct personality. Accessible contemporary idiom — a good introduction to 20th-century American violin writing. Play three or more for examination.",
    skills: "Contemporary American idiom; varied character; moderate modernist technique.",
    editions: "Elkan-Vogel / Theodore Presser.",
    examLevel: "ASTACAP 5"
  },
  {
    id: "martinu-madrigal", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Bohuslav Martinů", nationality: "Czech", period: "Modern",
    title: "5 Madrigal Stanzas for Violin and Piano, H. 297 (1943)",
    difficulty: [7, 7],
    description: "Five short movements of refined, neoclassical beauty. Written during Martinů's American exile. Clean textures, folk-influenced rhythms, and characteristic Czech warmth within a modernist framework.",
    skills: "Neoclassical style; Czech modernism; clean textures; rhythmic vitality.",
    editions: "Associated Music Publishers / G. Schirmer.",
    examLevel: "ASTACAP 7"
  },
  {
    id: "rode-concerto-6", tier: "syllabus", category: "Concerti", composer: "Pierre Rode", nationality: "French", period: "Classical/Romantic",
    title: "Violin Concerto No. 6 in B-flat Major",
    difficulty: [7, 8],
    description: "A clean, well-crafted Classical-Romantic concerto from the French school. Less frequently performed than Nos. 7 and 8 but of comparable quality. Good student concerto material.",
    editions: "Peters; International Music Company.",
    examLevel: "ASTACAP 8"
  },
  {
    id: "harbison-songs", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "John Harbison", nationality: "American", period: "Modern",
    title: "4 Songs of Solitude (1985)",
    difficulty: [8, 9],
    description: "Four contemplative pieces by the Pulitzer Prize-winning American composer. Lyrical, introspective, and beautifully crafted. Important contemporary American violin repertoire.",
    editions: "Associated Music Publishers.",
    examLevel: "ASTACAP 10"
  },
  {
    id: "bolcom-sonata2", tier: "syllabus", category: "Solo Repertoire", subcategory: "Sonatas", composer: "William Bolcom", nationality: "American", period: "Modern",
    title: "Sonata No. 2 for Violin and Piano (1978)",
    difficulty: [8, 9],
    description: "A substantial American sonata by the Pulitzer Prize winner and pianist-composer. Bolcom's eclectic style blends classical form with ragtime, jazz, and popular influences.",
    editions: "Edward B. Marks / Hal Leonard.",
    examLevel: "ASTACAP 10"
  },
  {
    id: "ibert-caprilena", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Jacques Ibert", nationality: "French", period: "Modern",
    title: "Caprilena for Solo Violin",
    difficulty: [8, 8],
    description: "A brief, brilliant unaccompanied showpiece by the French composer known for his orchestral wit. Demands clean, rapid passage work and French esprit.",
    editions: "Alphonse Leduc.",
    examLevel: "ASTACAP 10"
  },
  {
    id: "drdla-carmen", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "František Drdla", nationality: "Czech", period: "Romantic",
    title: "Fantasia on Carmen, Op. 66",
    difficulty: [7, 8],
    description: "A lighter Carmen fantasy than Waxman's or Sarasate's, but charming and effective. Drdla (also known for his Mazurka and Souvenir) was a Czech violinist-composer of salon music.",
    editions: "Universal Edition.",
    examLevel: "ASTACAP 9"
  },
  {
    id: "milhaud-printemps", tier: "syllabus", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Darius Milhaud", nationality: "French", period: "Modern",
    title: "Le Printemps, Op. 18 (1914)",
    difficulty: [7, 8],
    description: "An early work by the Les Six member. Light, pastoral, and polytonal. French charm with Milhaud's characteristic harmonic spice.",
    editions: "Durand.",
    examLevel: "ASTACAP 10"
  }
,
  {
    id: "seitz-2", tier: "core", category: "Concerti", composer: "Friedrich Seitz", nationality: "German", period: "Romantic",
    title: "Student Concerto No. 2 in G Major, Op. 13",
    difficulty: [3, 3],
    description: "The easiest of the Seitz concerti and often the first concerto a student plays. Three short movements in G major. Develops basic concerto form awareness, simple passage work, and melodic projection with piano accompaniment.",
    editions: "Bosworth; G. Schirmer.",
    examLevel: "RCM 3; ABRSM 3; ASTACAP 3"
  },
  {
    id: "seitz-5", tier: "core", category: "Concerti", composer: "Friedrich Seitz", nationality: "German", period: "Romantic",
    title: "Student Concerto No. 5 in D Major, Op. 22",
    difficulty: [3, 4],
    description: "One of the most popular student concerti. Three movements in D major. The first movement introduces broader passage work than No. 2; the Adagio develops sustained cantabile; the Rondo is cheerful and rhythmically engaging. A Suzuki Book 4 staple.",
    editions: "Bosworth; G. Schirmer.",
    examLevel: "RCM 3–4; ABRSM 3–4; ASTACAP 3–4"
  },
  {
    id: "seitz-1", tier: "core", category: "Concerti", composer: "Friedrich Seitz", nationality: "German", period: "Romantic",
    title: "Student Concerto No. 1 in D Major, Op. 15 (originally published as No. 4)",
    difficulty: [4, 4],
    description: "More technically demanding than Nos. 2 and 5. Broader range, more elaborate passage work, and greater dynamic contrast. Often used as a bridge between the easier Seitz concerti and the Vivaldi/Bach concerti.",
    editions: "Bosworth; G. Schirmer.",
    examLevel: "RCM 4–5; ABRSM 4; ASTACAP 4–5"
  },
  {
    id: "seitz-3", tier: "core", category: "Concerti", composer: "Friedrich Seitz", nationality: "German", period: "Romantic",
    title: "Student Concerto No. 3 in G Minor, Op. 12",
    difficulty: [4, 5],
    description: "The most musically substantial of the Seitz concerti and the only one in a minor key. More emotional range and technical demand than Nos. 2 or 5. Good preparation for Vivaldi A minor.",
    editions: "Bosworth; G. Schirmer.",
    examLevel: "RCM 4–5; ABRSM 4–5; ASTACAP 4–5"
  },
  {
    id: "seitz-4", tier: "syllabus", category: "Concerti", composer: "Friedrich Seitz", nationality: "German", period: "Romantic",
    title: "Student Concerto No. 4 in D Major, Op. 15 (alternative numbering)",
    difficulty: [4, 4],
    description: "Note: numbering of Seitz concerti varies between publishers. This entry covers whichever concerto is listed as No. 4 in your edition — typically identical to No. 1 (Op. 15) in other editions. Check opus numbers to confirm.",
    editions: "Bosworth; G. Schirmer.",
    examLevel: "RCM 4–5; ASTACAP 4–5"
  },
  {
    id: "rieding-op35", tier: "core", category: "Concerti", composer: "Oskar Rieding", nationality: "German", period: "Romantic",
    title: "Concertino in B Minor, Op. 35",
    difficulty: [3, 3],
    description: "The most popular Rieding concertino and a Suzuki Book 2–3 staple. A single movement in concertino form with an atmospheric B minor opening, expressive melody, and a bright conclusion. Often a student's first piece in a minor key with real emotional depth.",
    editions: "Bosworth; G. Schirmer.",
    examLevel: "RCM 3; ABRSM 3; ASTACAP 3"
  },
  {
    id: "rieding-op34", tier: "core", category: "Concerti", composer: "Oskar Rieding", nationality: "German", period: "Romantic",
    title: "Concerto in G Major, Op. 34",
    difficulty: [2, 3],
    description: "One of the easiest student concerti, playable entirely in first position. Bright, cheerful G major. A good first experience of playing with piano accompaniment in concerto format.",
    editions: "Bosworth.",
    examLevel: "RCM 2–3; ASTACAP 2–3"
  },
  {
    id: "rieding-op36", tier: "core", category: "Concerti", composer: "Oskar Rieding", nationality: "German", period: "Romantic",
    title: "Concerto in D Major, Op. 36",
    difficulty: [2, 3],
    description: "Another first-position concerto, slightly different in character from Op. 34. Cheerful, singing, and well-crafted. Together with Op. 34 and Op. 35, these three Rieding concerti form the backbone of very early concerto study.",
    editions: "Bosworth.",
    examLevel: "RCM 2–3; ASTACAP 2–3"
  },
  {
    id: "accolay", tier: "core", category: "Concerti", composer: "Jean-Baptiste Accolay", nationality: "Belgian", period: "Romantic",
    title: "Violin Concerto No. 1 in A Minor",
    difficulty: [5, 6],
    description: "The most popular transitional concerto between student and standard repertoire. A single-movement work with a dramatic minor-key opening, lyrical central episode, and brilliant coda. Demands broader emotional range, more confident shifting, and moderate passage work. A rite of passage for many students. Often the first piece requiring real musical maturity.",
    editions: "International Music Company; G. Schirmer; Bosworth.",
    examLevel: "RCM 6–7; ABRSM 6; ASTACAP 6"
  },
  {
    id: "saint-saens-intro", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Camille Saint-Saëns", nationality: "French", period: "Romantic",
    title: "Introduction and Rondo Capriccioso, Op. 28 (1863)",
    difficulty: [7, 8],
    description: "One of the most popular violin showpieces ever written, composed for Sarasate. A brooding Introduction in A minor leads to a sparkling Rondo in A major. Demands singing tone in the Introduction, then brilliant, fleet-fingered virtuosity in the Rondo with its tricky spiccato passages and dazzling coda. Standard competition piece at every level from student to professional.",
    skills: "Singing tone; sparkling spiccato; fleet passage work; trills; brilliant coda; French elegance.",
    editions: "International Music Company; Durand (original); Henle Verlag.",
    imslp: "https://imslp.org/wiki/Introduction_and_Rondo_Capriccioso,_Op.28_(Saint-Saëns,_Camille)",
    examLevel: "RCM 9–10; ABRSM 8; ASTACAP 10"
  },
  {
    id: "saint-saens-havanaise", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Camille Saint-Saëns", nationality: "French", period: "Romantic",
    title: "Havanaise, Op. 83 (1887)",
    difficulty: [7, 8],
    description: "A sensuous, languid habanera that builds to fiery brilliance. Also written for Sarasate. The opening demands rubato, tonal color, and the ability to sustain a mood; the central episodes are increasingly virtuosic; the return to the habanera rhythm is magical. Slightly more musically demanding than the Introduction & Rondo — the rubato and color requirements are subtler.",
    skills: "Rubato; tonal color; habanera rhythm; gradual build to virtuosity; French sensuality.",
    editions: "International Music Company; Durand; Henle Verlag.",
    imslp: "https://imslp.org/wiki/Havanaise,_Op.83_(Saint-Saëns,_Camille)",
    examLevel: "RCM 9–10; ABRSM 8"
  },
  {
    id: "bach-1041", tier: "core", category: "Concerti", composer: "Johann Sebastian Bach", nationality: "German", period: "Baroque",
    title: "Violin Concerto No. 1 in A Minor, BWV 1041",
    difficulty: [5, 6],
    description: "The more introspective of the two solo concerti. The first movement is concentrated and driving; the Andante is one of Bach's most beautiful slow movements — a long, sustained melody over a repeating bass; the finale is vigorous and dance-like. Often played slightly earlier than BWV 1042 due to its somewhat more contained technical demands.",
    skills: "Baroque articulation; sustained cantabile (Andante); passage work; ornamentation; rhythmic drive.",
    editions: "Bärenreiter (Urtext); Henle Verlag; Peters (ed. Joachim); International Music Company (ed. Galamian).",
    imslp: "https://imslp.org/wiki/Violin_Concerto_in_A_minor,_BWV_1041_(Bach,_Johann_Sebastian)",
    examLevel: "RCM 7; ABRSM 6; ASTACAP 7"
  },
  {
    id: "bach-1042", tier: "core", category: "Concerti", composer: "Johann Sebastian Bach", nationality: "German", period: "Baroque",
    title: "Violin Concerto No. 2 in E Major, BWV 1042",
    difficulty: [5, 6],
    description: "The more brilliant and extroverted of the two solo concerti. The first movement features bold passage work and string crossings; the Adagio is profound and ornamented; the finale is jubilant. Slightly more technically demanding than BWV 1041 overall. A Suzuki Book 7 staple.",
    skills: "Baroque articulation; brilliant passage work; string crossings; ornamentation; tonal projection.",
    editions: "Bärenreiter (Urtext); Henle Verlag; Peters (ed. Joachim); International Music Company (ed. Galamian).",
    imslp: "https://imslp.org/wiki/Violin_Concerto_in_E_major,_BWV_1042_(Bach,_Johann_Sebastian)",
    examLevel: "RCM 7–8; ABRSM 6–7; ASTACAP 7–8"
  },
  {
    id: "bach-1043", tier: "core", category: "Concerti", composer: "Johann Sebastian Bach", nationality: "German", period: "Baroque",
    title: "Double Violin Concerto in D Minor, BWV 1043",
    difficulty: [5, 6],
    description: "One of the greatest works for two violins and orchestra. The two solo parts weave together in imitative counterpoint. The Largo ma non tanto is one of the most sublime slow movements in all music — two voices singing together in perfect dialogue. Demands clean ensemble sensitivity between soloists. David and Igor Oistrakh's recording is legendary. Often played earlier than the solo concerti since each part is somewhat easier individually.",
    skills: "Ensemble dialogue; imitative counterpoint; matching tone and articulation with partner; Baroque style.",
    editions: "Bärenreiter (Urtext); Henle Verlag; Peters; International Music Company.",
    imslp: "https://imslp.org/wiki/Concerto_for_2_Violins_in_D_minor,_BWV_1043_(Bach,_Johann_Sebastian)",
    examLevel: "RCM 6–7; ABRSM 6; ASTACAP 7"
  },
  {
    id: "mozart-k216", tier: "core", category: "Concerti", composer: "Wolfgang Amadeus Mozart", nationality: "Austrian", period: "Classical",
    title: "Violin Concerto No. 3 in G Major, K. 216 (1775)",
    difficulty: [6, 7],
    description: "The most frequently performed Mozart concerto and the one most students learn first. Sunny, elegant, and perfectly proportioned. The first movement is joyful and brilliant; the Adagio is serene and singing; the Rondeau features a famous contrasting episode (the Strasbourg). Multiple cadenza options: Joachim, Flesch, Franko, Sam Franko, Ysaÿe.",
    skills: "Classical style; clean passage work; elegant phrasing; crystalline tone; cadenza preparation.",
    editions: "Bärenreiter (Urtext, NMA); Henle Verlag; International Music Company (ed. Galamian); Peters (ed. Joachim).",
    imslp: "https://imslp.org/wiki/Violin_Concerto_No.3_in_G_major,_K.216_(Mozart,_Wolfgang_Amadeus)",
    examLevel: "RCM 8–9; ABRSM 7; ASTACAP 9"
  },
  {
    id: "mozart-k218", tier: "core", category: "Concerti", composer: "Wolfgang Amadeus Mozart", nationality: "Austrian", period: "Classical",
    title: "Violin Concerto No. 4 in D Major, K. 218 (1775)",
    difficulty: [7, 7],
    description: "Brilliant, martial, and sunny. The first movement opens with a military-style theme; the Andante cantabile is warmly lyrical; the Rondeau (Andante grazioso) includes a famous contrasting section marked 'alla francese'. Slightly more technically demanding than K. 216. Less frequently played than Nos. 3 and 5 but equally fine.",
    skills: "Classical brilliance; martial character; elegant dance rhythms; cadenza preparation.",
    editions: "Bärenreiter (Urtext, NMA); Henle Verlag; International Music Company (ed. Galamian); Peters.",
    imslp: "https://imslp.org/wiki/Violin_Concerto_No.4_in_D_major,_K.218_(Mozart,_Wolfgang_Amadeus)",
    examLevel: "RCM 9; ABRSM 7–8; ASTACAP 10"
  },
  {
    id: "mozart-k219", tier: "core", category: "Concerti", composer: "Wolfgang Amadeus Mozart", nationality: "Austrian", period: "Classical",
    title: "Violin Concerto No. 5 in A Major, K. 219 'Turkish' (1775)",
    difficulty: [7, 7],
    description: "The most popular Mozart concerto after K. 216 and the most dramatically varied. The first movement's surprise — the soloist interrupts the orchestral tutti with a dreamy Adagio before launching into the Allegro — is unique. The Adagio is expansive and richly ornamented. The Rondeau features the famous 'Turkish' episode in A minor with its col legno and exotic character. Often considered the summit of Mozart's violin concerti.",
    skills: "Dramatic contrast; operatic surprise; ornamental Adagio; 'Turkish' character; col legno; cadenza.",
    editions: "Bärenreiter (Urtext, NMA); Henle Verlag; International Music Company (ed. Galamian); Peters.",
    imslp: "https://imslp.org/wiki/Violin_Concerto_No.5_in_A_major,_K.219_(Mozart,_Wolfgang_Amadeus)",
    examLevel: "RCM 9–10; ABRSM 8; ASTACAP 10"
  },
  {
    id: "mozart-k211", tier: "core", category: "Concerti", composer: "Wolfgang Amadeus Mozart", nationality: "Austrian", period: "Classical",
    title: "Violin Concerto No. 2 in D Major, K. 211 (1775)",
    difficulty: [5, 6],
    description: "The earliest of Mozart's concerto masterpieces. Less frequently performed than Nos. 3–5 but elegant and well-crafted. More modest in scale, making it a useful stepping stone before tackling K. 216. The Andante is charming; the Rondeau is cheerful.",
    skills: "Classical elegance; clean articulation; simple ornamentation; introduction to Mozart concerto style.",
    editions: "Bärenreiter (Urtext, NMA); Henle Verlag; International Music Company.",
    imslp: "https://imslp.org/wiki/Violin_Concerto_No.2_in_D_major,_K.211_(Mozart,_Wolfgang_Amadeus)",
    examLevel: "RCM 7–8; ABRSM 6; ASTACAP 7"
  },
  {
    id: "spohr-concerto-8", tier: "core", category: "Concerti", composer: "Louis Spohr", nationality: "German", period: "Romantic",
    title: "Violin Concerto No. 8 in A Minor, Op. 47 'Gesangsszene' (1816)",
    difficulty: [7, 8],
    description: "The most original of Spohr's fifteen concerti. Cast as a single-movement operatic 'vocal scene' (Gesangsszene), it abandons traditional concerto form for a through-composed dramatic narrative. Recitative passages alternate with aria-like cantabile. A fascinating Romantic hybrid. ASTA CAP Level 10 repertoire.",
    skills: "Operatic recitative style; sustained Romantic cantabile; dramatic narrative; German Romantic style.",
    editions: "Peters; International Music Company; Henle Verlag.",
    examLevel: "RCM 10; ASTACAP 10"
  },
  {
    id: "spohr-concerto-9", tier: "core", category: "Concerti", composer: "Louis Spohr", nationality: "German", period: "Romantic",
    title: "Violin Concerto No. 9 in D Minor, Op. 55 (1820)",
    difficulty: [7, 8],
    description: "A standard student-to-advanced concerto. More conventional in form than No. 8 but well-crafted and effective. Good preparation for the larger Romantic concerti (Mendelssohn, Bruch). Develops sustained Romantic phrasing and moderate virtuosity.",
    editions: "Peters; International Music Company.",
    examLevel: "RCM 9–10; ASTACAP 9"
  },
  {
    id: "spohr-concerto-7", tier: "syllabus", category: "Concerti", composer: "Louis Spohr", nationality: "German", period: "Romantic",
    title: "Violin Concerto No. 7 in E Minor, Op. 38 (1814)",
    difficulty: [7, 8],
    description: "A mature Romantic concerto. Less often played than Nos. 8 and 9 but of comparable quality.",
    editions: "Peters.",
    examLevel: "ASTACAP 9"
  },
  {
    id: "shostakovich-concerto-1", tier: "core", category: "Concerti", composer: "Dmitri Shostakovich", nationality: "Russian", period: "Modern",
    title: "Violin Concerto No. 1 in A Minor, Op. 77/99 (1947–48, premiered 1955)",
    difficulty: [9, 10],
    description: "One of the towering concerti of the 20th century. Written for David Oistrakh but withheld until after Stalin's death. Four movements: Nocturne (dark, brooding), Scherzo (savage, demonic), Passacaglia (monumental, with the most demanding cadenza in the concerto repertoire), and Burlesque (wild, driven finale). Demands virtuoso technique, enormous stamina, and interpretive depth. The Passacaglia cadenza alone is a major test piece.",
    skills: "Enormous stamina; monumental cadenza; demonic Scherzo; dark lyricism; rhythmic precision; wide emotional range.",
    editions: "DSCH Publishers / Sikorski; International Music Company (ed. Oistrakh); Boosey & Hawkes."
  },
  {
    id: "shostakovich-concerto-2", tier: "core", category: "Concerti", composer: "Dmitri Shostakovich", nationality: "Russian", period: "Modern",
    title: "Violin Concerto No. 2 in C-sharp Minor, Op. 129 (1967)",
    difficulty: [9, 10],
    description: "More intimate and autumnal than No. 1. Also written for Oistrakh. Three movements of increasing complexity. The opening Moderato is reflective; the Adagio is deeply poignant; the finale combines brilliant passage work with a haunting horn call. Less frequently performed than No. 1 but equally profound. Late Shostakovich at his most personal.",
    skills: "Interpretive depth; late-Shostakovich harmonic language; poignant lyricism; virtuoso finale.",
    editions: "DSCH Publishers / Sikorski; Boosey & Hawkes."
  }
,
  {
    id: "rieding-op21", tier: "core", category: "Concerti", composer: "Oskar Rieding", nationality: "German", period: "Romantic",
    title: "Concertino in A Minor, Op. 21 'Hungarian' (Im ungarischen Stil)",
    difficulty: [3, 4],
    description: "The most dramatic and passionate of the student-level Rieding works. The Hungarian style gives it a distinctive energy — strong accents, sweeping melodies, and rhythmic vitality. Introduces students to minor-key expressiveness and theatrical character earlier than most student concerti. Requires shifting to third position in some editions.",
    editions: "Bosworth; International Music Company.",
    examLevel: "RCM 4; ASTACAP 5; VMC 3"
  },
  {
    id: "rieding-op24", tier: "core", category: "Concerti", composer: "Oskar Rieding", nationality: "German", period: "Romantic",
    title: "Concertino in G Major, Op. 24",
    difficulty: [3, 4],
    description: "A cheerful, lyrical concertino in three short movements. Slightly more developed than Op. 34, with broader phrasing and a singing Andante middle movement. Playable in first position with optional shifts. Standard Bosworth/Bärenreiter student concertino.",
    editions: "Bosworth; Bärenreiter (ed. Sassmannshaus).",
    examLevel: "RCM 3–4; ASTACAP 5; VMC 3"
  },
  {
    id: "rieding-op25", tier: "core", category: "Concerti", composer: "Oskar Rieding", nationality: "German", period: "Romantic",
    title: "Concertino in D Major, Op. 25",
    difficulty: [3, 4],
    description: "Three movements in bright D major: an Allegro moderato with lively passage work, a lyrical Adagio that develops sustained cantabile, and a spirited Allegro vivace. One of the most complete concertino experiences at this level — teaches the student about contrast between movements and the discipline of a multi-movement work.",
    editions: "Bosworth; Bärenreiter (ed. Sassmannshaus).",
    examLevel: "RCM 3–4; ASTACAP 5; VMC 3"
  },
  {
    id: "rieding-op7", tier: "core", category: "Concerti", composer: "Oskar Rieding", nationality: "German", period: "Romantic",
    title: "Concerto in E Minor, Op. 7",
    difficulty: [5, 5],
    description: "The most advanced of the Rieding concerti and the only one that truly approaches standard concerto scale. Requires comfortable shifting through at least fifth position, broader dynamic range, and more developed passage work than the concertinos. A useful stepping stone between the easier Rieding works and the Accolay/Haydn level. Listed on ASTA CAP Level 7.",
    editions: "Bosworth.",
    examLevel: "ASTACAP 7; VMC 4"
  }
,
  {
    id: "prokofiev-concerto-1", tier: "core", category: "Concerti", composer: "Sergei Prokofiev", nationality: "Russian", period: "Modern",
    title: "Violin Concerto No. 1 in D Major, Op. 19 (1917)",
    difficulty: [8, 9],
    description: "One of the great 20th-century concerti. Premiered by Marcel Darrieux, later championed by Szigeti. Opens with a dreamy, high-register melody that floats above the orchestra — one of the most magical openings in the repertoire. The Scherzo is savage and motoric. The finale returns to the lyrical world of the opening. The concerto's unusual structure (slow–fast–slow) and its blend of lyricism with biting modernism make it endlessly fascinating. Demands beautiful tone in the stratosphere, rhythmic precision in the Scherzo, and the ability to sustain a mood.",
    skills: "High-position lyricism; savage Scherzo; rhythmic precision; tonal beauty; unusual structure; 20th-century idiom.",
    editions: "Boosey & Hawkes (original); International Music Company; Sikorski.",
    examLevel: "RCM ARCT; ASTACAP 10"
  },
  {
    id: "prokofiev-concerto-2", tier: "core", category: "Concerti", composer: "Sergei Prokofiev", nationality: "Russian", period: "Modern",
    title: "Violin Concerto No. 2 in G Minor, Op. 63 (1935)",
    difficulty: [8, 9],
    description: "Written during Prokofiev's years in Paris, premiered by Robert Soetens. More lyrical and neoclassical than No. 1. The opening theme is one of Prokofiev's most beautiful melodies. The second movement is a graceful Andante assai with a Spanish-tinged middle section. The finale is a brilliant, dance-like Allegro ben marcato with driving rhythms. Slightly more conventionally structured than No. 1 but equally demanding. Heifetz's recording is legendary.",
    skills: "Singing tone; neoclassical elegance; rhythmic drive; brilliant finale; Spanish color in Andante; lyrical phrasing.",
    editions: "Boosey & Hawkes; International Music Company; Sikorski.",
    examLevel: "RCM ARCT; ASTACAP 10"
  }
,
  {
    id: "korngold-concerto", tier: "core", category: "Concerti", composer: "Erich Wolfgang Korngold", nationality: "Austrian-American", period: "Late Romantic/Modern",
    title: "Violin Concerto in D Major, Op. 35 (1945)",
    difficulty: [9, 10],
    description: "One of the most popular 20th-century concerti. Written in Hollywood using themes from Korngold's film scores (Another Dawn, Juarez, The Prince and the Pauper, Anthony Adverse). Premiered by Heifetz with the St. Louis Symphony. Unabashedly Romantic in an era of modernism — lush, lyrical, and brilliantly scored. The first movement soars; the Romance is achingly beautiful; the finale is brilliant and witty. Demands a huge, warm tone, effortless high-position playing, and the ability to project over a large orchestra. Has become a repertoire staple since its rediscovery in the 1990s.",
    skills: "Huge warm tone; high-position lyricism; lush Romantic phrasing; brilliant finale; projection over large orchestra.",
    editions: "Schott (original and primary publisher).",
    examLevel: "RCM ARCT"
  }
,
  {
    id: "bartok-sonata-1", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Béla Bartók", nationality: "Hungarian", period: "Modern",
    title: "Sonata No. 1 for Violin and Piano, Sz. 75 (1921)",
    difficulty: [9, 10],
    description: "One of the most important violin sonatas of the 20th century. Three massive movements of extraordinary intensity. The first is rhapsodic, improvisatory, and Hungarian in character; the Adagio is deeply expressive; the finale is a wild, dance-driven Allegro. Premiered by Jelly d'Arányi and Bartók himself. Demands advanced contemporary technique, stamina, and the ability to sustain a large-scale structure. More overtly Hungarian than Sonata No. 2.",
    skills: "Extreme stamina; advanced contemporary technique; Hungarian folk idiom; complex rhythms; large-scale structure; ensemble with piano.",
    editions: "Boosey & Hawkes; Universal Edition.",
    examLevel: "RCM ARCT"
  },
  {
    id: "bartok-sonata-2", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Béla Bartók", nationality: "Hungarian", period: "Modern",
    title: "Sonata No. 2 for Violin and Piano, Sz. 76 (1922)",
    difficulty: [9, 10],
    description: "Two movements: a slow, mysterious opening (Molto moderato) followed by a fast, exhilarating Allegretto. More compact and concentrated than Sonata No. 1. The two-movement structure is unconventional, and the relationship between violin and piano is exceptionally inventive — sometimes dialoguing, sometimes clashing. Also premiered by d'Arányi and Bartók. A masterpiece of 20th-century chamber music.",
    skills: "Contemporary technique; unconventional form; inventive violin-piano dialogue; complex rhythms; folk-derived material.",
    editions: "Boosey & Hawkes; Universal Edition.",
    examLevel: "RCM ARCT"
  },
  {
    id: "poulenc-sonata", tier: "core", category: "Solo Repertoire", subcategory: "Sonatas", composer: "Francis Poulenc", nationality: "French", period: "Modern",
    title: "Sonata for Violin and Piano, FP 119 (1942–43, dedicated to the memory of Federico García Lorca)",
    difficulty: [8, 9],
    description: "Poulenc's only violin sonata, dedicated to the memory of Lorca. Three movements that alternate between typical Poulenc charm and a darker, more violent undercurrent — the shadow of the Spanish Civil War and the occupation of France. The Intermezzo is deceptively simple; the Presto tragico is fierce and unrelenting. An essential 20th-century French sonata alongside Debussy, Ravel, and Fauré.",
    skills: "French style; alternating charm and violence; lyrical playing; Presto stamina; dark expressiveness.",
    editions: "Chester Music / Éditions Max Eschig.",
    examLevel: "RCM ARCT"
  },
  {
    id: "schoenberg-phantasy", tier: "core", category: "Solo Repertoire", subcategory: "Concert Pieces", composer: "Arnold Schoenberg", nationality: "Austrian-American", period: "Modern",
    title: "Phantasy for Violin with Piano Accompaniment, Op. 47 (1949)",
    difficulty: [9, 10],
    description: "Schoenberg's last instrumental work and his only piece for violin and piano. A single continuous movement in twelve-tone technique. The title 'with Piano Accompaniment' (rather than 'and Piano') reflects the violin's dominant role. Written for Adolf Koldofsky. Demands complete comfort with atonal idiom, advanced contemporary technique, and the ability to project a coherent musical narrative through serial language. Important for understanding the Second Viennese School violin tradition.",
    skills: "Twelve-tone technique; atonal navigation; advanced contemporary technique; serial narrative; Second Viennese School style.",
    editions: "C.F. Peters."
  }
];

const VIOLINISTS = [
  { id: "corelli", name: "Arcangelo Corelli", dates: "1653–1713", nationality: "Italian", era: "Baroque", bio: "Founder of the Italian violin school. His Op. 5 sonatas defined Baroque violin style. Teacher of Geminiani and Locatelli." },
  { id: "tartini", name: "Giuseppe Tartini", dates: "1692–1770", nationality: "Italian", era: "Baroque", bio: "Virtuoso, composer of the \'Devil\'s Trill\' Sonata, and founder of a major school in Padua. Developed bowing theory and wrote an important treatise on ornaments." },
  { id: "geminiani", name: "Francesco Geminiani", dates: "1687–1762", nationality: "Italian", era: "Baroque", bio: "Corelli\'s most distinguished student. Published the first comprehensive violin treatise (1751). Active in London and Dublin." },
  { id: "locatelli", name: "Pietro Locatelli", dates: "1695–1764", nationality: "Italian", era: "Baroque", bio: "Student of Corelli. His L\'Arte del Violino (1733) pushed violin technique beyond all previous limits with its extraordinary cadenza-caprices." },
  { id: "viotti", name: "Giovanni Battista Viotti", dates: "1755–1824", nationality: "Italian/French", era: "Classical", bio: "Father of the French violin school. His 29 violin concertos bridge the Classical and early Romantic eras. Teacher (directly or indirectly) of Rode, Kreutzer, and Baillot." },
  { id: "baillot", name: "Pierre Baillot", dates: "1771–1842", nationality: "French", era: "Classical/Romantic", bio: "Co-author of the Paris Conservatoire Method (1803) and author of L\'Art du Violon (1834). The intellectual leader of the French school." },
  { id: "paganini-v", name: "Niccolò Paganini", dates: "1782–1840", nationality: "Italian", era: "Romantic", bio: "The most legendary virtuoso in violin history. His 24 Caprices and concertos redefined the instrument\'s possibilities. His performances were so extraordinary that rumors of supernatural pacts circulated." },
  { id: "spohr-v", name: "Louis Spohr", dates: "1784–1859", nationality: "German", era: "Romantic", bio: "Leading German violinist-composer of the early Romantic era. Composed 15 violin concerti and wrote an influential Violinschule (1832). Popularized the chin rest." },
  { id: "ernst-v", name: "Heinrich Wilhelm Ernst", dates: "1814–1865", nationality: "Moravian", era: "Romantic", bio: "Perhaps the greatest virtuoso between Paganini and Wieniawski. His Polyphonic Studies and Erlkönig fantasy are among the most difficult solo works ever written." },
  { id: "david-v", name: "Ferdinand David", dates: "1810–1873", nationality: "German", era: "Romantic", bio: "Gewandhaus concertmaster; dedicatee and first performer of the Mendelssohn Concerto. Edited \'Die hohe Schule.\' Central figure in the Leipzig school." },
  { id: "joachim-v", name: "Joseph Joachim", dates: "1831–1907", nationality: "Hungarian-German", era: "Romantic", bio: "The greatest violinist of the late 19th century. Close collaborator with Brahms (who dedicated the Violin Concerto to him). His editions and cadenzas remain standard. Founded the Joachim Quartet." },
  { id: "vieuxtemps-v", name: "Henri Vieuxtemps", dates: "1820–1881", nationality: "Belgian", era: "Romantic", bio: "Central figure of the Franco-Belgian school between Bériot and Ysaÿe. Composed seven violin concerti, of which Nos. 4 and 5 remain in the standard repertoire." },
  { id: "wieniawski-v", name: "Henryk Wieniawski", dates: "1835–1880", nationality: "Polish", era: "Romantic", bio: "Legendary virtuoso and composer. His concerti, études, and shorter works are pillars of the repertoire. Professor at the Brussels Conservatory (succeeding Vieuxtemps)." },
  { id: "sarasate-v", name: "Pablo de Sarasate", dates: "1844–1908", nationality: "Spanish", era: "Romantic", bio: "One of the most acclaimed virtuosos of the 19th century. Saint-Saëns, Lalo, Bruch, and Dvořák wrote works for him. His Zigeunerweisen and Carmen Fantasy are eternal showpieces." },
  { id: "ysaye-v", name: "Eugène Ysaÿe", dates: "1858–1931", nationality: "Belgian", era: "Romantic/Modern", bio: "The supreme violinist of the late Romantic era. His Six Solo Sonatas (Op. 27) are monuments of the repertoire. Students included Enescu, Kreisler, Thibaud, and (indirectly through his influence) the entire modern Belgian school." },
  { id: "kreisler-v", name: "Fritz Kreisler", dates: "1875–1962", nationality: "Austrian-American", era: "Early 20th Century", bio: "Beloved for his warmth, charm, and inimitable style. His short pieces and arrangements are recital staples. Famous for attributing his own compositions to fictitious Baroque composers." },
  { id: "enescu-v", name: "George Enescu", dates: "1881–1955", nationality: "Romanian", era: "Modern", bio: "Composer, violinist, pianist, conductor, and teacher of extraordinary breadth. His Third Violin Sonata is one of the most demanding works in the literature. Teacher of Menuhin." },
  { id: "thibaud-v", name: "Jacques Thibaud", dates: "1880–1953", nationality: "French", era: "Early 20th Century", bio: "Elegant representative of the French school. Member of the legendary Cortot-Thibaud-Casals trio. Dedicatee of Ysaÿe\'s Second Solo Sonata." },
  { id: "hubay-v", name: "Jenő Hubay", dates: "1858–1937", nationality: "Hungarian", era: "Romantic", bio: "Major pedagogue who led the Budapest Academy. Students included Szigeti, Végh, Székely, and Telmanyi. Composed operatic violin concerti." },
  { id: "auer-v", name: "Leopold Auer", dates: "1845–1930", nationality: "Hungarian-American", era: "Romantic/Modern", bio: "Perhaps the most successful violin teacher in history. Students included Heifetz, Milstein, Elman, Zimbalist, Seidel, Eddy Brown, and Kathleen Parlow. Professor in St. Petersburg, then New York." },
  { id: "flesch-v", name: "Carl Flesch", dates: "1873–1944", nationality: "Hungarian", era: "20th Century", bio: "The most analytically rigorous pedagogue in violin history. His Scale System, Art of Violin Playing, and Etüdenstudien are foundational texts. Students included Rostal, Hassid, Neveu, Goldberg, and Szeryng." },
  { id: "heifetz", name: "Jascha Heifetz", dates: "1901–1987", nationality: "Russian-American", era: "20th Century", bio: "Widely considered the greatest violinist of the 20th century. Student of Auer. His recordings set standards of technical perfection that remain reference points. Taught at USC from 1962." },
  { id: "milstein", name: "Nathan Milstein", dates: "1904–1992", nationality: "Russian-American", era: "20th Century", bio: "Student of Auer and Ysaÿe. Renowned for his aristocratic elegance, pure tone, and legendary Bach performances. Active until his late 80s. Composed the famous Paganiniana." },
  { id: "elman", name: "Mischa Elman", dates: "1891–1967", nationality: "Russian-American", era: "20th Century", bio: "Student of Auer. Famous for his extraordinarily warm, sweet tone—the \'Elman tone\' became a standard of beauty. A child prodigy who maintained a major career for over 50 years." },
  { id: "zimbalist-v", name: "Efrem Zimbalist", dates: "1889–1985", nationality: "Russian-American", era: "20th Century", bio: "Student of Auer. Distinguished soloist and later director of the Curtis Institute (1941–1968). His influence on American violin pedagogy through Curtis was enormous." },
  { id: "menuhin-v", name: "Yehudi Menuhin", dates: "1916–1999", nationality: "American-British", era: "20th Century", bio: "One of the great child prodigies. Student of Enescu and Persinger. Recorded the Elgar Concerto at age 16 with the composer conducting. Later explored yoga, Alexander Technique, and cross-cultural collaboration. Founded a school in Surrey." },
  { id: "oistrakh-d", name: "David Oistrakh", dates: "1908–1974", nationality: "Russian", era: "20th Century", bio: "The foremost Soviet violinist. Shostakovich wrote both violin concerti for him; Prokofiev\'s Sonata No. 1 was premiered by him. His recordings of Russian repertoire remain definitive. Professor at the Moscow Conservatory." },
  { id: "kogan-l", name: "Leonid Kogan", dates: "1924–1982", nationality: "Russian", era: "20th Century", bio: "Alongside Oistrakh, the leading Soviet violinist of his generation. Winner of the Queen Elisabeth Competition (1951). Legendary for his technical perfection and interpretive intensity. Died during a concert tour." },
  { id: "stern", name: "Isaac Stern", dates: "1920–2001", nationality: "Russian-American", era: "20th Century", bio: "Dominant figure in American musical life for half a century. Saved Carnegie Hall from demolition. Champion of new music. Discovered and mentored Perlman, Zukerman, and Mintz." },
  { id: "szeryng-v", name: "Henryk Szeryng", dates: "1918–1988", nationality: "Polish-Mexican", era: "20th Century", bio: "Student of Flesch. Renowned for his Bach interpretations and his Schott edition of the Solo Sonatas and Partitas. Polyglot diplomat and musician of extraordinary culture." },
  { id: "grumiaux", name: "Arthur Grumiaux", dates: "1921–1986", nationality: "Belgian", era: "20th Century", bio: "Supreme representative of the Franco-Belgian tradition in the mid-20th century. His Mozart, Beethoven, and Bach recordings are legendary for their purity and elegance." },
  { id: "francescatti", name: "Zino Francescatti", dates: "1902–1991", nationality: "French", era: "20th Century", bio: "The last great representative of the traditional French school. Known for his brilliant tone and elegant style. Recorded extensively for Columbia Records." },
  { id: "neveu", name: "Ginette Neveu", dates: "1919–1949", nationality: "French", era: "20th Century", bio: "Student of Flesch. Won the Wieniawski Competition at 15, defeating Oistrakh. Her Brahms Concerto recording is legendary. Tragically killed in a plane crash at age 30." },
  { id: "hassid", name: "Josef Hassid", dates: "1923–1950", nationality: "Polish", era: "20th Century", bio: "Student of Flesch. Perhaps the most astonishing natural talent of the 20th century. His few recordings made as a teenager reveal extraordinary gifts. Died in a mental institution at 26." },
  { id: "rabin", name: "Michael Rabin", dates: "1936–1972", nationality: "American", era: "20th Century", bio: "One of the most phenomenal violin prodigies in history. Debuted with major orchestras as a teenager with a technique of staggering brilliance and ease. His recordings of the Paganini and Wieniawski concerti are legendary for their effortless virtuosity and tonal beauty. Career and health declined in his late 20s; he died at 35 from a fall. His early recordings remain among the most thrilling violin playing ever captured." },
  { id: "ricci", name: "Ruggiero Ricci", dates: "1918–2012", nationality: "American", era: "20th Century", bio: "One of the great virtuosos of the 20th century, famed above all for his Paganini. First violinist to record all 24 Paganini Caprices (1947) and to perform the six Paganini concerti. Child prodigy who debuted at age 10. A fearless, commanding performer with a massive tone and bravura technique. His career spanned over seven decades. Wrote the foreword to Margaret Campbell's The Great Violinists. Featured prominently in the documentary Art of the Violin." },
  { id: "shumsky", name: "Oscar Shumsky", dates: "1917–2000", nationality: "American", era: "20th Century", bio: "Often called the violinist's violinist. Child prodigy who studied with Zimbalist at Curtis and performed the Mendelssohn Concerto under Stokowski at age 8. His recordings (especially of Bach, Brahms, and Mozart) are prized for their exceptional tone, musical intelligence, and effortless technique. Chose to avoid the concert circuit grind, spending much of his career in chamber music, teaching (at Curtis, Juilliard, and Yale), and as NBC Symphony concertmaster. His late-career solo recordings, made in his 60s and 70s, revealed a master who had been hiding in plain sight." },
  { id: "fuchs", name: "Joseph Fuchs", dates: "1899–1997", nationality: "American", era: "20th Century", bio: "One of the most important American violin pedagogues of the 20th century. Studied with Kneisel. Concertmaster of the Cleveland Orchestra under Sokoloff, then devoted himself to solo and chamber music and teaching at Juilliard for over 50 years (1946–1997). Premiered works by Piston, Sessions, and Ben-Haim. His longevity was remarkable — he performed publicly past age 90. A pillar of the Juilliard faculty who shaped generations of American violinists." },
  { id: "galimir", name: "Felix Galimir", dates: "1910–1999", nationality: "Austrian-American", era: "20th Century", bio: "Distinguished chamber musician, pedagogue, and new-music advocate. Founded the Galimir Quartet in Vienna, which premiered works by Berg, Webern, and Ravel. Fled Austria in 1938. Taught at Juilliard, Curtis, and Mannes for decades. His chamber music coaching was legendary — students included members of the Guarneri, Emerson, and Orion quartets. An irreplaceable link between the Second Viennese School and American string playing." },
  { id: "kaler", name: "Ilya Kaler", dates: "b. 1963", nationality: "Russian-American", era: "20th/21st Century", bio: "The only violinist to win gold medals at all three of the major international violin competitions: Paganini (1981), Sibelius (1985), and Tchaikovsky (1986). Studied with Yankelevich and Tretyakov at the Moscow Conservatory. His recordings of the complete Paganini Caprices and the Brahms and Tchaikovsky concerti are acclaimed for their technical perfection and musical depth. Professor at the Eastman School of Music and DePaul University. A virtuoso of the highest caliber who chose teaching over the touring circuit." },
  { id: "goldstein-b", name: "Boris Goldstein", dates: "1922–1987", nationality: "Russian-German", era: "20th Century", bio: "Brilliant Soviet violinist who won prizes at the Wieniawski and Ysaÿe competitions in the 1930s. A prodigious talent whose career was restricted by Soviet authorities (partly due to his Jewish background). His few surviving recordings reveal extraordinary gifts. Featured in the documentary Art of the Violin. Later emigrated to Germany where he taught." },
  { id: "capet", name: "Lucien Capet", dates: "1873–1928", nationality: "French", era: "20th Century", bio: "Founder of the Capet Quartet and author of La technique supérieure de l'archet (Superior Bowing Technique), one of the most important bowing treatises ever written. His analytical approach to bow technique influenced Galamian and through him the entire American school. A key figure in the transmission of the French tradition to the modern era." },
  { id: "goldberg-s", name: "Szymon Goldberg", dates: "1909–1993", nationality: "Polish-American", era: "20th Century", bio: "Student of Flesch. Concertmaster of the Berlin Philharmonic at age 20 under Furtwängler. Later a distinguished chamber musician, conductor, and teacher." },
  { id: "rostal", name: "Max Rostal", dates: "1905–1991", nationality: "Austrian-British", era: "20th Century", bio: "Flesch\'s most distinguished student-pedagogue. His revised editions of Flesch\'s works and his own teaching at the GSM in London and Cologne were hugely influential. Students included Chung and Edith Peinemann." },
  { id: "galamian-v", name: "Ivan Galamian", dates: "1903–1981", nationality: "Armenian-American", era: "20th Century", bio: "The most influential American violin pedagogue. Studied with Capet. Taught at Curtis and Juilliard. Students included Perlman, Zukerman, Chung, Laredo, Steinhardt, Znaider, and dozens of major soloists." },
  { id: "delay-v", name: "Dorothy DeLay", dates: "1917–2002", nationality: "American", era: "20th Century", bio: "Galamian\'s colleague and successor at Juilliard. Her Socratic teaching style and psychological insight produced Perlman, Midori, Sarah Chang, Gil Shaham, Hahn, Nadja Salerno-Sonnenberg, and many others." },
  { id: "gingold-v", name: "Josef Gingold", dates: "1909–1995", nationality: "American", era: "20th Century", bio: "Student of Ysaÿe. Concertmaster of Cleveland under Szell. Legendary pedagogue at Indiana University. His editions and three-volume orchestral excerpts compilation are standard references." },
  { id: "perlman", name: "Itzhak Perlman", dates: "b. 1945", nationality: "Israeli-American", era: "20th Century", bio: "Student of Galamian and DeLay. One of the most beloved musicians of the modern era. His warmth, charisma, and golden tone made him a global icon. Recordings of virtually the entire standard repertoire." },
  { id: "zukerman", name: "Pinchas Zukerman", dates: "b. 1948", nationality: "Israeli-Canadian", era: "20th Century", bio: "Student of Galamian. Equally acclaimed as violinist and violist. Known for his large, warm sound and passionate interpretive style. Also active as conductor." },
  { id: "chung-km", name: "Kyung-Wha Chung", dates: "b. 1948", nationality: "South Korean", era: "20th Century", bio: "Student of Galamian. One of the first Asian soloists to achieve international stardom. Her Bruch, Beethoven, and Elgar recordings are legendary. Career interrupted by hand injury." },
  { id: "midori-v", name: "Midori", dates: "b. 1971", nationality: "Japanese-American", era: "21st Century", bio: "Student of DeLay. Astonishing child prodigy; her Tanglewood debut breaking a string twice is legendary. Now a distinguished artist, educator, and humanitarian." },
  { id: "hahn-v", name: "Hilary Hahn", dates: "b. 1979", nationality: "American", era: "21st Century", bio: "Student of Klara Berkovich and Jascha Brodsky at Curtis. One of the leading violinists of her generation. Champion of new music (commissioned 27 encores). Her Bach and Brahms recordings are reference-quality." },
  { id: "chang", name: "Sarah Chang", dates: "b. 1980", nationality: "American", era: "21st Century", bio: "Student of DeLay. Debuted with the New York Philharmonic at age 8. Dazzling virtuoso career from childhood. Known for dramatic, passionate performances." },
  { id: "shaham", name: "Gil Shaham", dates: "b. 1971", nationality: "Israeli-American", era: "21st Century", bio: "One of the most recorded violinists of his generation. Known for his brilliant technique, sweet tone, and versatile repertoire. Frequent performer of Barber, Prokofiev, and Romantic concerti." },
  { id: "vengerov-v", name: "Maxim Vengerov", dates: "b. 1974", nationality: "Russian-Israeli", era: "21st Century", bio: "Extraordinary virtuoso and communicator. Grammy winner. Career interrupted by shoulder injury; now also active as conductor and teacher. His masterclass videos are among the most viewed online." },
  { id: "mutter", name: "Anne-Sophie Mutter", dates: "b. 1963", nationality: "German", era: "21st Century", bio: "Protégée of Karajan. One of the most prominent violinists alive. Premiered works by Lutosławski, Dutilleux, Previn, Penderecki, and Gubaidulina. Founder of the Mutter Virtuosi." },
  { id: "bell", name: "Joshua Bell", dates: "b. 1967", nationality: "American", era: "21st Century", bio: "Student of Gingold. Known for his communicative performances and cultural crossover appeal. Performed incognito in the Washington Metro for a famous Washington Post experiment. Music director of ASMF." },
  { id: "kavakos", name: "Leonidas Kavakos", dates: "b. 1967", nationality: "Greek", era: "21st Century", bio: "Won the Sibelius Competition (1985). Acclaimed for his intellectual depth and tonal beauty. His recordings of the complete Bach Sonatas and Partitas and Beethoven Sonatas are critically lauded." },
  { id: "kremer", name: "Gidon Kremer", dates: "b. 1947", nationality: "Latvian", era: "20th/21st Century", bio: "Student of Oistrakh. Champion of contemporary music. Founded the Kremerata Baltica chamber orchestra. His unconventional interpretations and new-music advocacy have been enormously influential." },
  { id: "ehnes", name: "James Ehnes", dates: "b. 1976", nationality: "Canadian", era: "21st Century", bio: "One of the most technically polished violinists of his generation. Grammy-winning recordings of Paganini Caprices, Walton, and Bartók. Known for his modesty and musical intelligence." },
  { id: "janine-jansen", name: "Janine Jansen", dates: "b. 1978", nationality: "Dutch", era: "21st Century", bio: "One of the most prominent European soloists. Known for her intensity, tonal richness, and chamber-music sensibility in concerto performances." },
  { id: "ray-chen-v", name: "Ray Chen", dates: "b. 1989", nationality: "Taiwanese-Australian", era: "21st Century", bio: "Queen Elisabeth Competition winner (2009). Major social media presence making classical violin accessible to millions. Plays the \'Joachim\' Stradivarius." },
  { id: "hadelich-v", name: "Augustin Hadelich", dates: "b. 1984", nationality: "German-Italian-American", era: "21st Century", bio: "Grammy-winning artist known for extraordinary tonal beauty and versatility. Overcame severe burns from a childhood accident. Champion of contemporary repertoire including Ligeti and Adès concerti." },
  { id: "yankelevich-v", name: "Yuri Yankelevich", dates: "1909–1973", nationality: "Russian", era: "20th Century", bio: "Legendary Moscow Conservatory pedagogue. Students included Tretyakov, Spivakov, and many Soviet competition winners. Known for his biomechanical approach to technique." },
  { id: "dounis-v", name: "Demetrius Constantine Dounis", dates: "1886–1954", nationality: "Greek-American", era: "20th Century", bio: "Revolutionary pedagogue famous for rehabilitating the technique of professional violinists. His exercises for finger independence and freedom from tension remain essential." },
  { id: "nadien", name: "David Nadien", dates: "1926–2014", nationality: "American", era: "20th Century", bio: "Concertmaster of the New York Philharmonic (1966–1970). Renowned studio musician and soloist with a gorgeous, effortless tone." },
  { id: "berlin-cm", name: "Berlin Philharmonic Concertmasters", dates: "Various", nationality: "International", era: "20th/21st Century", bio: "The Berlin Philharmonic\'s concertmaster chair is among the most prestigious in the world. Distinguished holders include Toru Yasunaga (1979–1997), Rainer Kussmaul, Guy Braunstein (2000–2013), Daishin Kashimoto (from 2009), and Noah Bendix-Balgley (from 2014). Bendix-Balgley maintains an active YouTube channel with educational content on orchestral playing, audition preparation, and solo repertoire." },
  { id: "cerovsek", name: "Corey Cerovsek", dates: "b. 1972", nationality: "Canadian", era: "21st Century", bio: "Child prodigy; soloist and chamber musician with extraordinary intellectual breadth (also holds degrees in mathematics and physics)." },
  { id: "guarneri-qt", name: "Guarneri String Quartet", dates: "1964–2009", nationality: "American", era: "20th Century", bio: "One of the greatest string quartets of all time. Members: Arnold Steinhardt (1st violin), John Dalley (2nd violin), Michael Tree (viola), David Soyer (cello). Known for their passionate, spontaneous performances and integral Beethoven cycle." },
  { id: "steinhardt", name: "Arnold Steinhardt", dates: "b. 1937", nationality: "American", era: "20th Century", bio: "First violinist of the Guarneri Quartet for 45 years. Student of Galamian and Gingold. Author of several books on music and quartet life. Distinguished teacher." },
  { id: "tokyo-qt", name: "Tokyo String Quartet", dates: "1969–2013", nationality: "Japanese/American", era: "20th/21st Century", bio: "One of the most polished and refined quartets. Known for their beautiful tone, precise intonation, and elegant interpretations. Members included Koichiro Harada, Kikuei Ikeda, and Martin Beaver." },
  { id: "borodin-qt", name: "Borodin String Quartet", dates: "1945–present", nationality: "Russian", era: "20th/21st Century", bio: "The preeminent Russian string quartet across seven decades. Their recordings of the complete Shostakovich quartets are definitive. Multiple generations of membership." },
  { id: "juilliard-qt", name: "Juilliard String Quartet", dates: "1946–present", nationality: "American", era: "20th/21st Century", bio: "The longest-running American quartet. Founded by Robert Mann. Premiered numerous major works including Bartók\'s Third and Carter\'s quartets. A pillar of American chamber music." },
  { id: "budapest-qt", name: "Budapest String Quartet", dates: "1917–1967", nationality: "Hungarian/American", era: "20th Century", bio: "The dominant American quartet of the mid-20th century. Their Beethoven cycle recordings are landmarks. Members included Josef Roisman and Alexander Schneider." },
  { id: "emerson-qt", name: "Emerson String Quartet", dates: "1976–2023", nationality: "American", era: "20th/21st Century", bio: "Won nine Grammy Awards. Known for their virtuosity and wide-ranging repertoire. Complete recordings of Beethoven, Bartók, Shostakovich, and Mendelssohn quartets." },
  { id: "huberman", name: "Bronisław Huberman", dates: "1882–1947", nationality: "Polish", era: "20th Century", bio: "Legendary virtuoso and humanitarian. Founded the Palestine Philharmonic (now Israel Philharmonic), saving dozens of Jewish musicians from the Holocaust. His recordings reveal a fiercely individual artist." },
  { id: "busch", name: "Adolf Busch", dates: "1891–1952", nationality: "German-Swiss", era: "20th Century", bio: "Austere, noble musician. Left Germany in protest against Nazism. His Bach and Beethoven recordings are revered. Founded the Busch Quartet and Marlboro Festival (with Rudolf Serkin, his son-in-law)." },
  { id: "schneiderhan", name: "Wolfgang Schneiderhan", dates: "1915–2002", nationality: "Austrian", era: "20th Century", bio: "Concertmaster of the Vienna Philharmonic; distinguished soloist. His Mozart and Beethoven recordings with the Vienna school aesthetic are classic." },
  { id: "suk-v", name: "Josef Suk", dates: "1929–2011", nationality: "Czech", era: "20th Century", bio: "Grandson of the composer. Leading Czech violinist of the second half of the 20th century. His Dvořák recordings are considered definitive." },
  { id: "accardo-v", name: "Salvatore Accardo", dates: "b. 1941", nationality: "Italian", era: "20th/21st Century", bio: "Foremost Italian violinist. Won the Paganini Competition at 17. His complete Paganini Caprices recording is a benchmark. Founded the Accardo Quartet and various festivals." },
  { id: "szigeti", name: "Joseph Szigeti", dates: "1892–1973", nationality: "Hungarian-American", era: "20th Century", bio: "One of the most intellectually distinguished violinists of the 20th century. Student of Hubay. Champion of contemporary music — premiered works by Bartók (Rhapsody No. 1, contrasts), Prokofiev, Bloch, and others. His recordings of Bach, Beethoven, and Brahms are revered for their depth and integrity despite an occasionally rough tone in later years. His book With Strings Attached is an essential memoir. A musician of uncompromising artistic standards." },
  { id: "kavafian-ani", name: "Ani Kavafian", dates: "b. 1948", nationality: "Turkish-American (Armenian descent)", era: "20th/21st Century", bio: "Distinguished American violinist and pedagogue. Studied with Galamian at Juilliard. Member of the Chamber Music Society of Lincoln Center for decades. Professor at Yale School of Music. Known for her refined musicianship, warm tone, and exceptional chamber music skills. Sister of Ida Kavafian." },
  { id: "kavafian-ida", name: "Ida Kavafian", dates: "b. 1952", nationality: "Turkish-American (Armenian descent)", era: "20th/21st Century", bio: "Distinguished American violinist and violist. Studied with Galamian at Juilliard. Founding member of the Tashi ensemble and member of the Chamber Music Society of Lincoln Center. Faculty at the Curtis Institute. Acclaimed equally on violin and viola — a rare dual mastery. Sister of Ani Kavafian." },
  { id: "ferras", name: "Christian Ferras", dates: "1933–1982", nationality: "French", era: "20th Century", bio: "Brilliant French violinist, student of Enescu. His recordings of the Beethoven, Brahms, and Berg concerti with Karajan are legendary. Close artistic partnership with pianist Pierre Barbizet. Career cut short by personal struggles." },
  { id: "meyers", name: "Ann Akiko Meyers", dates: "b. 1970", nationality: "American", era: "21st Century", bio: "Student of DeLay and Gingold. Champion of American and contemporary music. First violinist to record the complete catalogue of a living composer (Mason Bates). Plays the 1741 \'Vieuxtemps\' Guarneri del Gesù." },
  { id: "julia-fischer", name: "Julia Fischer", dates: "b. 1983", nationality: "German", era: "21st Century", bio: "One of the most acclaimed violinists of her generation, also an accomplished pianist. Won the Yehudi Menuhin Competition at age 11. Known for her exceptional technical command, intellectual depth, and beautiful tone. Her recordings of Bach, Mozart, and the Romantic concerti are critically celebrated. Professor at the Hochschule für Musik und Theater München." },
  { id: "seidel", name: "Toscha Seidel", dates: "1899–1962", nationality: "Russian-American", era: "20th Century", bio: "Student of Auer, one of the most gifted of the legendary generation that included Heifetz, Milstein, and Elman. Child prodigy who debuted in Carnegie Hall at 19. His career was overshadowed by Heifetz but his recordings reveal an extraordinary natural talent with a gorgeous, warm tone. Later became a prominent Hollywood studio musician." },
  { id: "takacs-qt", name: "Takács Quartet", dates: "1975–present", nationality: "Hungarian/International", era: "20th/21st Century", bio: "Founded in Budapest, now based at the University of Colorado Boulder. One of the most acclaimed active string quartets, renowned for their recordings of the complete Beethoven, Bartók, and Schubert quartets. Known for their tonal warmth, rhythmic vitality, and interpretive depth." },
  { id: "cleveland-cm", name: "Cleveland Orchestra Concertmasters", dates: "Various", nationality: "International", era: "20th/21st Century", bio: "Distinguished holders include Josef Gingold (1947–1960, under Szell), Daniel Majeske (1969–1993), and William Preucil (1995–2018). The Cleveland Orchestra\'s legendary precision owes much to these leaders." },
  { id: "chicago-cm", name: "Chicago Symphony Concertmasters", dates: "Various", nationality: "International", era: "20th/21st Century", bio: "Notable holders include Samuel Magad (1968–1997) and Robert Chen (from 1999). The CSO\'s brass-and-strings balance is shaped significantly by the concertmaster\'s leadership." },
  { id: "vienna-cm", name: "Vienna Philharmonic Concertmasters", dates: "Various", nationality: "Austrian/International", era: "20th/21st Century", bio: "Distinguished holders include Willi Boskovsky (also famous as New Year\'s Concert conductor), Walter Barylli, Gerhart Hetzel, Werner Hink, Rainer Honeck, and Volkhard Steude. The Viennese tradition demands a distinctive singing tone and rubato style." },
  { id: "philly-cm", name: "Philadelphia Orchestra Concertmasters", dates: "Various", nationality: "International", era: "20th/21st Century", bio: "Notable holders include Alexander Hilsberg, Anshel Brusilow, Norman Carol (1966–1994, under Ormandy and Muti), and David Kim (from 1999). The \'Philadelphia Sound\' depends heavily on the concertmaster\'s tonal concept." },
  { id: "alban-berg-qt", name: "Alban Berg Quartet", dates: "1970–2008", nationality: "Austrian", era: "20th/21st Century", bio: "Founded at the Vienna Academy. Renowned for their recordings of the complete Beethoven, Berg, Bartók, and Brahms quartets. Led by Günter Pichler. Known for their Viennese warmth and interpretive intelligence." },
  { id: "amadeus-qt", name: "Amadeus Quartet", dates: "1947–1987", nationality: "British (Austrian-born)", era: "20th Century", bio: "Norbert Brainin (1st violin), Siegmund Nissel (2nd violin), Peter Schidlof (viola), Martin Lovett (cello). One of the longest-running quartets with unchanged membership (40 years). Definitive recordings of Mozart, Beethoven, Schubert, and Brahms." },
  { id: "hagen-qt", name: "Hagen Quartet", dates: "1981–present", nationality: "Austrian", era: "20th/21st Century", bio: "Salzburg-based quartet of siblings (Lukas, Angelika, Veronika Hagen) plus Rainer Schmidt. Noted for their dynamic, sometimes provocative interpretations and their complete Beethoven cycle." },
  { id: "quatuor-ebene", name: "Quatuor Ébène", dates: "1999–present", nationality: "French", era: "21st Century", bio: "One of the most exciting young quartets, known for genre-crossing projects blending classical, jazz, and pop. Their Beethoven cycle was acclaimed. Led by Pierre Colombet and Gabriel Le Magadure." },
  { id: "haendel-ida", name: "Ida Haendel", dates: "1928–2020", nationality: "Polish-British-Canadian", era: "20th Century", bio: "One of the last great violinists from the pre-war European tradition. Child prodigy who studied with Flesch and Enescu. Her recordings of Sibelius, Brahms, and Elgar are revered. Performed publicly into her 80s. Awarded CBE for services to music. Known for an intensely personal, passionate performing style." },
  { id: "mullova", name: "Viktoria Mullova", dates: "b. 1959", nationality: "Russian-British", era: "20th/21st Century", bio: "One of the most distinguished living violinists. Defected from the Soviet Union in 1983. Definitive recordings of Bach, Beethoven, and Schubert. Known for purity of tone, intellectual depth, and adventurous programming including period instruments." },
  { id: "repin", name: "Vadim Repin", dates: "b. 1971", nationality: "Russian", era: "21st Century", bio: "Won the Queen Elisabeth Competition at 17. One of the foremost Russian soloists. Known for brilliant technique, tonal warmth, and commanding stage presence." },
  { id: "kennedy", name: "Nigel Kennedy", dates: "b. 1956", nationality: "British", era: "20th/21st Century", bio: "His 1989 Vivaldi Four Seasons recording became the best-selling classical album ever (over 2 million copies). Student of DeLay. Controversial crossover figure whose impact on classical music reach is undeniable." },
  { id: "batiashvili", name: "Lisa Batiashvili", dates: "b. 1979", nationality: "Georgian-German", era: "21st Century", bio: "One of the top active soloists worldwide. Born in Tbilisi, trained in Germany. Known for a large, warm sound and deeply considered interpretations. Deutsche Grammophon exclusive artist." },
  { id: "faust", name: "Isabelle Faust", dates: "b. 1972", nationality: "German", era: "21st Century", bio: "Among the most critically acclaimed living violinists. Her Bach Sonatas and Partitas and Beethoven recordings are reference-quality. Known for intellectual rigor and historically informed approach. Plays the 1704 Sleeping Beauty Stradivarius." },
  { id: "capucon", name: "Renaud Capuçon", dates: "b. 1976", nationality: "French", era: "21st Century", bio: "Preeminent French violinist of his generation. Known for refined tone, elegant phrasing, and deep commitment to chamber music. Artistic director of the Sommets Musicaux de Gstaad." },
  { id: "benedetti", name: "Nicola Benedetti", dates: "b. 1987", nationality: "Scottish-Italian", era: "21st Century", bio: "Won BBC Young Musician at 16. Dame Commander (DBE). Grammy winner. Major music education advocate. Wynton Marsalis wrote a concerto for her." },
  { id: "morini", name: "Erika Morini", dates: "1904–1995", nationality: "Austrian-American", era: "20th Century", bio: "First major woman concert violinist of the 20th century. Debuted in Berlin at 12. Her few recordings reveal extraordinary refinement and warmth. Played the 1727 Davidoff Stradivarius (stolen after her death, never recovered)." },
  { id: "gitlis", name: "Ivry Gitlis", dates: "1922–2020", nationality: "Israeli-French", era: "20th/21st Century", bio: "Legendary, iconoclastic violinist of Yemenite-Jewish origin. Studied with Enescu and Thibaud. Famous for intensely personal, improvisatory style. Performed into his 90s. UNESCO Goodwill Ambassador." },
  { id: "kubelik", name: "Jan Kubelík", dates: "1880–1940", nationality: "Czech", era: "20th Century", bio: "One of the supreme virtuosos of the early 20th century. Technique compared to Paganini. Composed six violin concerti. Father of conductor Rafael Kubelík." },
  { id: "powell", name: "Maud Powell", dates: "1867–1920", nationality: "American", era: "Romantic/Modern", bio: "First internationally recognized American woman concert violinist. Premiered the Dvořák, Sibelius, and Tchaikovsky concerti in America. Tirelessly toured bringing classical music to remote American communities. A trailblazer." },
  { id: "kagan", name: "Oleg Kagan", dates: "1946–1990", nationality: "Russian", era: "20th Century", bio: "Brilliant Soviet violinist, student of David Oistrakh. Chamber partnership with Sviatoslav Richter produced treasured recordings. Died of cancer at 43 at the height of his powers." },
  { id: "campoli", name: "Alfredo Campoli", dates: "1906–1991", nationality: "Italian-British", era: "20th Century", bio: "Leading British violinist of the mid-20th century. Born in Rome, raised in London. Notable recordings of Elgar and the Romantic concerti. Sweet, singing tone." },
  { id: "krasner", name: "Louis Krasner", dates: "1903–1995", nationality: "Ukrainian-American", era: "20th Century", bio: "Of immense historical significance: commissioned and premiered both the Alban Berg Violin Concerto (1936) and the Schoenberg Violin Concerto (1940)." },
  { id: "kopatchinskaja", name: "Patricia Kopatchinskaja", dates: "b. 1977", nationality: "Moldovan-Swiss", era: "21st Century", bio: "One of the most distinctive living performers. Known for playing barefoot, theatrical presentations, and fearless advocacy of contemporary music. Champions Kurtág, Ligeti, and living composers." },
  { id: "lin-cl", name: "Cho-Liang Lin", dates: "b. 1960", nationality: "Taiwanese-American", era: "20th/21st Century", bio: "Distinguished soloist and pedagogue. Studied with DeLay at Juilliard. One of the first Asian violinists to build a major international career. Professor at Rice and Juilliard." },
  { id: "ibragimova", name: "Alina Ibragimova", dates: "b. 1985", nationality: "Russian-British", era: "21st Century", bio: "One of the most acclaimed violinists of her generation. Complete Bach Sonatas and Partitas received universal acclaim. Co-artistic director of the Chipping Campden Festival." },
  { id: "huang-frank", name: "Frank Huang", dates: "b. 1978", nationality: "Chinese-American", era: "21st Century", bio: "Concertmaster of the New York Philharmonic since 2015. One of the most prominent concertmaster positions in the world." },
  { id: "dicterow", name: "Glenn Dicterow", dates: "b. 1948", nationality: "American", era: "20th/21st Century", bio: "Concertmaster of the New York Philharmonic 1980–2014, the longest tenure in that orchestra. Now teaches at USC and Manhattan School." },
  { id: "frang", name: "Vilde Frang", dates: "b. 1986", nationality: "Norwegian", era: "21st Century", bio: "One of the most prominent young soloists. Warner Classics recording artist. Mentored by Anne-Sophie Mutter through the Mutter Virtuosi." },
  { id: "martzy", name: "Johanna Martzy", dates: "1924–1979", nationality: "Romanian-Hungarian", era: "20th Century", bio: "Cult-status violinist. Her few recordings (Bach, Mendelssohn, Brahms) are revered by connoisseurs. Career cut short by arm problems and early death. EMI recordings command extraordinary collector prices." },
  { id: "devito", name: "Gioconda de Vito", dates: "1907–1994", nationality: "Italian", era: "20th Century", bio: "Foremost Italian woman violinist of the 20th century. Recordings of Brahms, Bach, and Beethoven treasured for warmth and singing quality. Retired at the height of her career in 1961." },
  { id: "bridgetower", name: "George Bridgetower", dates: "1778–1860", nationality: "British (Afro-European)", era: "Classical", bio: "First major Black concert violinist in Europe. Beethoven composed the Kreutzer Sonata Op. 47 for him and they premiered it together in 1803. Beethoven rededicated it to Kreutzer after a personal dispute. A significant historical figure." },
  { id: "mintz", name: "Shlomo Mintz", dates: "b. 1957", nationality: "Israeli", era: "20th/21st Century", bio: "Distinguished Israeli violinist and conductor. Acclaimed Mendelssohn and Bruch recordings. Founder of the Shlomo Mintz International Violin Competition." },
  { id: "oliveira", name: "Elmar Oliveira", dates: "b. 1950", nationality: "American (Brazilian descent)", era: "20th/21st Century", bio: "First American to win Gold Medal at the Tchaikovsky Competition (1978). Champion of American repertoire." },
  { id: "goosby", name: "Randall Goosby", dates: "b. 1996", nationality: "American", era: "21st Century", bio: "Prominent young American violinist. First major-label solo album on Decca at 24. Champion of music by Black composers. Youngest person admitted to the Perlman Music Program at age 8." },
  { id: "duenas", name: "María Dueñas", dates: "b. 2002", nationality: "Spanish", era: "21st Century", bio: "Won the Menuhin Competition at 18 (2021). Deutsche Grammophon artist. One of the most exciting young talents in the classical world." },
  { id: "josefowicz", name: "Leila Josefowicz", dates: "b. 1977", nationality: "Canadian-American", era: "21st Century", bio: "Leading champion of contemporary violin concerti. MacArthur Fellow. Definitive interpreter of John Adams Violin Concerto. Has premiered works by Salonen, Matthews, and Francesconi." },
  { id: "laredo", name: "Jaime Laredo", dates: "b. 1941", nationality: "Bolivian-American", era: "20th/21st Century", bio: "Won Queen Elisabeth Competition at 17 (1959). Distinguished soloist, chamber musician, violist, and conductor. Long Marlboro Festival association." },
  { id: "barton-pine", name: "Rachel Barton Pine", dates: "b. 1974", nationality: "American", era: "21st Century", bio: "Major American violinist who overcame a devastating 1995 train accident. Champion of diversity through her Music by Black Composers project. Wide-ranging repertoire from Baroque to metal." },
  { id: "salerno-sonnenberg", name: "Nadja Salerno-Sonnenberg", dates: "b. 1961", nationality: "Italian-American", era: "20th/21st Century", bio: "Student of DeLay. Naumburg Competition winner (1981). Intensely dramatic, passionate performer. Music director of the New Century Chamber Orchestra." },
  { id: "kuusisto", name: "Pekka Kuusisto", dates: "b. 1976", nationality: "Finnish", era: "21st Century", bio: "Innovative Finnish violinist known for genre-crossing, improvisation, and folk music alongside classical. Won Sibelius Competition at 18. Artistic director of the Norwegian Chamber Orchestra." },
  { id: "hope", name: "Daniel Hope", dates: "b. 1974", nationality: "South African-British-German", era: "21st Century", bio: "Distinguished soloist, author, broadcaster, and artistic director. Former Beaux Arts Trio member. Music director of Zurich Chamber Orchestra. Television presenter and author." },
  { id: "garrett", name: "David Garrett", dates: "b. 1980", nationality: "German-American", era: "21st Century", bio: "Former child prodigy (studied with Haendel and Perlman). Transitioned to crossover career. One of the highest-selling instrumental recording artists worldwide. Controversial within classical circles but technically formidable." },
  { id: "lozakovich", name: "Daniel Lozakovich", dates: "b. 2001", nationality: "Russian-Swedish", era: "21st Century", bio: "Signed with Deutsche Grammophon at 15, the youngest ever. Early recordings of Bach and Tchaikovsky demonstrate remarkable maturity." },
  { id: "skride", name: "Baiba Skride", dates: "b. 1981", nationality: "Latvian", era: "21st Century", bio: "Won Queen Elisabeth Competition (2001). One of the most accomplished Baltic violinists. All three Skride sisters are professional musicians." },
  { id: "gluzman", name: "Vadim Gluzman", dates: "b. 1973", nationality: "Ukrainian-Israeli", era: "21st Century", bio: "Distinguished soloist who plays the 1690 ex-Leopold Auer Stradivarius (previously owned by Heifetz teacher Auer). Known for powerful, rich tone." },
  { id: "frank-p", name: "Pamela Frank", dates: "b. 1967", nationality: "American", era: "21st Century", bio: "Distinguished American violinist. Studied with Gingold, DeLay, and Goldberg. Career interrupted by hand dystonia; returned as performer and major pedagogue at Curtis Institute." },
  { id: "oistrakh-i", name: "Igor Oistrakh", dates: "1931–2021", nationality: "Russian", era: "20th/21st Century", bio: "Son of David Oistrakh. Won Wieniawski Competition (1952). Father and son recorded the Bach Double Concerto in one of the most famous violin recordings ever made." },
  { id: "kolisch", name: "Rudolf Kolisch", dates: "1896–1978", nationality: "Austrian-American", era: "20th Century", bio: "Schoenberg brother-in-law. Played left-handed. Founded Kolisch Quartet, which premiered many Second Viennese School works. Pioneer of performing quartets from memory." },
  { id: "hirschhorn", name: "Philippe Hirschhorn", dates: "1946–1996", nationality: "Latvian-Belgian", era: "20th Century", bio: "Won Queen Elisabeth Competition (1967). Violinist of extraordinary fire and intensity. Career cut short by illness; died at 49. Few but treasured recordings." },
  { id: "jackiw", name: "Stefan Jackiw", dates: "b. 1985", nationality: "Korean-American", era: "21st Century", bio: "Prominent American violinist. NEC and Harvard trained. Known for technical polish, tonal beauty, and thoughtful musicianship." },
  { id: "khachatryan", name: "Sergey Khachatryan", dates: "b. 1985", nationality: "Armenian", era: "21st Century", bio: "Won Queen Elisabeth Competition at 15, youngest ever at the time (2000). Known for intense, deeply felt interpretations. Outstanding Sibelius and Khachaturian recordings." },
  { id: "carmignola", name: "Giuliano Carmignola", dates: "b. 1951", nationality: "Italian", era: "20th/21st Century", bio: "Leading Italian violinist in historically informed performance. His Vivaldi recordings with Venice Baroque Orchestra transformed how the concerti are heard." },
  { id: "koh", name: "Jennifer Koh", dates: "b. 1976", nationality: "American", era: "21st Century", bio: "Prominent American violinist and new-music advocate. Founded the Shared Madness commissioning project. Tchaikovsky Competition winner." },
  { id: "steinbacher", name: "Arabella Steinbacher", dates: "b. 1981", nationality: "German (Japanese-German)", era: "21st Century", bio: "Distinguished German violinist. Studied with Ana Chumachenco. Beautiful tone and elegant musicianship. Pentatone recording artist." },
  { id: "montgomery-j", name: "Jessie Montgomery", dates: "b. 1981", nationality: "American", era: "21st Century", bio: "Violinist and one of the most performed living American classical composers. Catalyst Quartet member. Composer-in-Residence of the Chicago Symphony. Dual performer-creator role reflects a new 21st-century model." }
];

const CATEGORIES = [
  "Beginner Methods", "Traditional Violin Schools", "Technical Exercises", "Etudes & Caprices",
  "Repertoire Collections", "Treatises", "Online Resources", "Solo Repertoire", "Concerti",
  "Chamber Music", "Orchestral Excerpts"
];

const PERIODS = ["Baroque", "Classical", "Romantic", "Modern", "21st Century", "Early 20th Century", "Late Romantic", "Classical/Romantic", "Late Romantic/Modern", "Second Viennese School", "Neoclassical/Romantic", "19th Century", "19th/20th Century", "20th Century", "18th Century"];

const SUBCATEGORIES = [...new Set(DATA.filter(d => d.subcategory).map(d => d.subcategory))];

const diffLabel = (d) => {
  if (!d) return "";
  const avg = (d[0] + d[1]) / 2;
  if (avg <= 2) return "Beginner";
  if (avg <= 4) return "Early Intermediate";
  if (avg <= 6) return "Intermediate";
  if (avg <= 8) return "Advanced";
  return "Virtuoso";
};

const diffColor = (d) => {
  if (!d) return "#888";
  const avg = (d[0] + d[1]) / 2;
  if (avg <= 2) return "#4a9c6d";
  if (avg <= 4) return "#6aaa5e";
  if (avg <= 6) return "#c49a2a";
  if (avg <= 8) return "#c46a2a";
  return "#b33a3a";
};

const catIcon = (cat) => "";

const LEVELS = [
  { level: 0, label: "Pre-Twinkle",
    positions: "None",
    bowStrokes: "Whole bow on open strings, stopped-bow staccato, pre-détaché",
    leftHand: "No left-hand fingers yet",
    vibrato: "None", shifting: "None",
    representative: "Adventures in Violinland; Sassmannshaus Early Start Vol. 1",
    syllabi: "RCM Prep; ABRSM Initial" },
  { level: 1, label: "Late Beginner",
    positions: "First position (simple finger patterns)",
    bowStrokes: "Détaché, staccato, martelé, basic retake, simple legato (2-note slurs), elementary collé",
    leftHand: "Simple finger patterns in first position; basic dynamics",
    vibrato: "None", shifting: "None",
    representative: "Suzuki Vols. 1–2; Sassmannshaus Early Start Vol. 2; Wohlfahrt Op. 38",
    syllabi: "RCM Prep–1; ABRSM Initial–1; VMC 1" },
  { level: 2, label: "Early Elementary",
    positions: "First position (all finger patterns)",
    bowStrokes: "All previous + collé, hooked bowings, portato, elementary flying & biting staccato, elementary spiccato, elementary string crossings, developing resonance & bow distribution",
    leftHand: "All finger patterns; double stops with open strings; simple harmonics",
    vibrato: "Introduction / rudimentary", shifting: "None",
    representative: "Suzuki Vols. 2–3; Wohlfahrt Op. 45 (early); Seitz Student Concerti; Rieding Opp. 34–36; Küchler Op. 11",
    syllabi: "RCM 2–3; ABRSM 2–3; VMC 2" },
  { level: 3, label: "Elementary",
    positions: "1st and 3rd positions",
    bowStrokes: "All previous + basic flying & biting staccato, basic jeté, developing spiccato, triple stops, elementary independence of right arm/wrist/fingers, nuance with the 3 elements (speed, weight, contact point)",
    leftHand: "Shifting 1st↔3rd; double stops with two fingers; three- and four-voice chords",
    vibrato: "Elementary — arm or wrist developing on long notes", shifting: "1st ↔ 3rd position",
    representative: "Suzuki Vols. 4–6; Vivaldi A minor Op. 3/6; Vivaldi G major Op. 3/3; Wohlfahrt Op. 45 (middle–late); Kreutzer (early studies 2–5)",
    syllabi: "RCM 3–4; ABRSM 3–4; VMC 3" },
  { level: 4, label: "Late Elementary",
    positions: "1st through 5th",
    bowStrokes: "All previous + basic sautillé, basic ricochet, basic bariolage, jeté secure, developing independence of arm/wrist/fingers",
    leftHand: "Smooth continuous vibrato; all five positions; chromatic patterns developing",
    vibrato: "Continuous vibrato expected", shifting: "Between positions 1–5",
    representative: "Suzuki Vols. 7–8; Bach Concerti BWV 1041/1042/1043; Accolay Concerto; Haydn G major Concerto; Kayser Op. 20; Dont Op. 37; Schubert Sonatinas",
    syllabi: "RCM 4–5; ABRSM 4–5; VMC 4" },
  { level: 5, label: "Early Intermediate",
    positions: "Through 5th, introduction to higher",
    bowStrokes: "All previous developing; spiccato secure, sautillé at moderate speed, collé fluent, bow distribution deliberate",
    leftHand: "Introduction to higher positions; developing double stops (3rds, 6ths); extensions",
    vibrato: "Functional continuous with some variety", shifting: "Through 5th; beginning higher positions",
    representative: "Suzuki Vols. 9–10; Bériot Concerto No. 9; Kabalevsky Concerto; Mozart K. 211; Kreutzer (middle studies); Dancla Airs variés; Kreisler short pieces",
    syllabi: "RCM 5–6; ABRSM 5; VMC 5" },
  { level: 6, label: "Intermediate",
    positions: "Through 7th position",
    bowStrokes: "All basic strokes secure; sautillé at moderate tempi, ricochet developing, bariolage, string crossings fluent",
    leftHand: "Double stops in 3rds, 6ths; octaves developing; all standard positions through 7th",
    vibrato: "Varied — arm and wrist with dynamic control", shifting: "All standard positions; chromatic shifting",
    representative: "Mozart K. 216, K. 218; Vivaldi Four Seasons; Beethoven Romances; Bach Partita BWV 1006 (excl. Chaconne); Kreutzer (advanced studies); Fiorillo Caprices",
    syllabi: "RCM 6–7; ABRSM 6; VMC 6" },
  { level: 7, label: "Late Intermediate",
    positions: "Full fingerboard",
    bowStrokes: "Ricochet in bariolage, extreme bow distributions, complete legato in strong crossings and at frog, advanced retakes, all strokes fluent",
    leftHand: "Full fingerboard command; double stops including octaves; fingered octaves beginning",
    vibrato: "Mature palette; finger vibrato developing", shifting: "All positions including high positions",
    representative: "Mozart K. 219; Sinfonia Concertante K. 364; Bruch Concerto No. 1; Mendelssohn D minor Concerto; Rode Caprices; Dont Op. 35; Gaviniès Études",
    syllabi: "RCM 7–8; ABRSM 7; VMC 7" },
  { level: 8, label: "Early Advanced",
    positions: "Complete fingerboard command",
    bowStrokes: "Bite from above the string, irregular attacks, rapid biting & flying staccato, all strokes at or near concert tempo",
    leftHand: "Fingered octaves; tenths developing; advanced double stops; left-hand pizzicato beginning",
    vibrato: "Full palette — arm, wrist, finger, with dynamic and color control", shifting: "Fluent everywhere; fingered octaves developing",
    representative: "Mendelssohn Concerto Op. 64; Lalo Symphonie espagnole; Wieniawski Concerto No. 2; Prokofiev Concerti; Saint-Saëns No. 3; Barber Concerto; Bruch Scottish Fantasy",
    syllabi: "RCM 8–9; ABRSM 8; VMC 8" },
  { level: 9, label: "Advanced",
    positions: "Total command",
    bowStrokes: "All strokes at concert tempo including combined techniques; left-hand pizzicato with simultaneous bowing; all special effects",
    leftHand: "Fingered octaves, tenths fluent; all double-stop intervals; polyphonic playing",
    vibrato: "Complete mastery", shifting: "Instantaneous; all intervals",
    representative: "Paganini 24 Caprices; Brahms/Tchaikovsky/Sibelius/Beethoven Concerti; Bach Sonatas & Partitas (complete incl. Chaconne & Fugues); Ysaÿe Solo Sonatas",
    syllabi: "RCM 9–10; ABRSM Diploma; VMC 9" },
  { level: 10, label: "Virtuoso / Professional",
    positions: "Total",
    bowStrokes: "Total command including extended techniques (sul ponticello, col legno, quarter-tones, snap pizzicato, harmonics with bowing, etc.)",
    leftHand: "No technical limitations; extended techniques as required by contemporary repertoire",
    vibrato: "Total", shifting: "Total",
    representative: "Ernst Polyphonic Studies; Paganini Concerti; Bartók Concerto No. 2 & Solo Sonata; Berg/Ligeti Concerti; Wieniawski Concerto No. 1; complete Paganini Caprices at concert tempo",
    syllabi: "RCM ARCT; VMC 10" },
];

export default function ViolinReference() {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [diffRange, setDiffRange] = useState([1, 10]);
  const [expandedId, setExpandedId] = useState(null);
  const [expandedEditions, setExpandedEditions] = useState({});
  const [sortBy, setSortBy] = useState("category");
  const [headerCollapsed, setHeaderCollapsed] = useState(false);
  const [showViolinists, setShowViolinists] = useState(false);
  const [showLevelGuide, setShowLevelGuide] = useState(false);
  const [showSyllabus, setShowSyllabus] = useState(false);
  const [violinistSearch, setViolinistSearch] = useState("");
  const [violinistEra, setViolinistEra] = useState("All");
  const [violinistSort, setViolinistSort] = useState("alpha");
  const searchRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const toggleHeader = () => setHeaderCollapsed(prev => !prev);

  const filtered = useMemo(() => {
    const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const q = norm(search);
    return DATA.filter(item => {
      if (selectedCat !== "All" && item.category !== selectedCat) return false;
      if (!showSyllabus && item.tier === "syllabus") return false;
      if (item.difficulty) {
        if (item.difficulty[1] < diffRange[0] || item.difficulty[0] > diffRange[1]) return false;
      }
      if (!q) return true;
      return (
        norm(item.title).includes(q) ||
        norm(item.composer).includes(q) ||
        norm(item.description).includes(q) ||
        (item.skills && norm(item.skills).includes(q)) ||
        (item.nationality && norm(item.nationality).includes(q)) ||
        (item.subcategory && norm(item.subcategory).includes(q)) ||
        (item.editions && norm(item.editions).includes(q)) ||
        (item.examLevel && norm(item.examLevel).includes(q))
      );
    }).sort((a, b) => {
      if (sortBy === "difficulty") {
        const da = a.difficulty ? a.difficulty[0] : 0;
        const db = b.difficulty ? b.difficulty[0] : 0;
        return da - db;
      }
      if (sortBy === "composer") return a.composer.localeCompare(b.composer);
      const ci = CATEGORIES.indexOf(a.category) - CATEGORIES.indexOf(b.category);
      if (ci !== 0) return ci;
      return a.composer.localeCompare(b.composer);
    });
  }, [search, selectedCat, diffRange, sortBy, showSyllabus]);

  const VIOLINIST_ERAS = ["All", "Baroque & Classical", "Romantic", "20th Century", "Contemporary", "Ensembles"];

  const getViolinistGroup = (v) => {
    const n = v.name.toLowerCase();
    if (n.includes("quartet") || n.includes("concertmaster") || n.includes("orchestra")) return "Ensembles";
    const m = v.dates.match(/(\d{4})/);
    if (!m) return "Ensembles";
    const yr = parseInt(m[1]);
    if (yr < 1770) return "Baroque & Classical";
    if (yr < 1880) return "Romantic";
    if (yr < 1960) return "20th Century";
    return "Contemporary";
  };

  const getBirthYear = (v) => {
    const m = v.dates.match(/(\d{4})/);
    return m ? parseInt(m[1]) : 9999;
  };

  const filteredViolinists = useMemo(() => {
    const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const q = norm(violinistSearch);
    let result = VIOLINISTS.filter(v => {
      if (violinistEra !== "All" && getViolinistGroup(v) !== violinistEra) return false;
      if (!q) return true;
      return norm(v.name).includes(q) || norm(v.bio).includes(q) || norm(v.nationality).includes(q) || norm(v.era).includes(q);
    });
    if (violinistSort === "chrono") {
      result.sort((a, b) => getBirthYear(a) - getBirthYear(b));
    } else {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }
    return result;
  }, [violinistSearch, violinistEra, violinistSort]);

  const violinistEraCounts = useMemo(() => {
    const counts = { All: VIOLINISTS.length };
    VIOLINIST_ERAS.slice(1).forEach(e => { counts[e] = VIOLINISTS.filter(v => getViolinistGroup(v) === e).length; });
    return counts;
  }, []);

  const catCounts = useMemo(() => {
    const src = showSyllabus ? DATA : DATA.filter(d => d.tier !== "syllabus");
    const counts = { All: src.length };
    CATEGORIES.forEach(c => { counts[c] = src.filter(d => d.category === c).length; });
    return counts;
  }, [showSyllabus]);

  return (
    <div style={{
      fontFamily: "'Crimson Pro', 'Georgia', serif",
      background: "#faf8f4",
      minHeight: "100vh",
      color: "#2c2419"
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=JetBrains+Mono:wght@400&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />

      {/* COLLAPSIBLE TOOLBAR — header + search + filters */}
      <div style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        maxHeight: headerCollapsed ? 0 : "70vh",
        overflowY: headerCollapsed ? "hidden" : "auto",
        overflowX: "hidden",
        transition: "max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      }}>
        {/* HEADER */}
        <div style={{
          background: "linear-gradient(135deg, #1a1510 0%, #2c2419 50%, #3d2e1e 100%)",
          color: "#f5efe6",
          padding: "32px 24px 24px",
          borderBottom: "3px solid #c49a2a",
        }}>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <div style={{ fontSize: 13, fontFamily: "'DM Sans', sans-serif", letterSpacing: 3, textTransform: "uppercase", color: "#c49a2a", marginBottom: 8 }}>
              Comprehensive Reference Guide
            </div>
            <h1 style={{ fontSize: 36, fontWeight: 300, margin: "0 0 6px", letterSpacing: -0.5, lineHeight: 1.15 }}>
              Violin Repertoire, Studies & Pedagogy
            </h1>
            <p style={{ fontSize: 15, fontFamily: "'DM Sans', sans-serif", color: "#b8a88a", margin: 0, fontWeight: 400 }}>
              {DATA.length} entries — Exercises, Études, Repertoire, Treatises, Methods & Online Resources
            </p>
            <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
              <button onClick={() => { setShowLevelGuide(!showLevelGuide); setShowViolinists(false); }} style={{
                padding: "6px 14px", fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                background: showLevelGuide ? "#c49a2a" : "transparent", color: showLevelGuide ? "#1a1510" : "#c49a2a",
                border: "1px solid #c49a2a", borderRadius: 4, cursor: "pointer", transition: "all 0.2s",
                display: "inline-flex", alignItems: "center", gap: 6
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
                {showLevelGuide ? "Back to Reference" : "Level Guide"}
              </button>
              <button onClick={() => { setShowViolinists(!showViolinists); setShowLevelGuide(false); }} style={{
                padding: "6px 14px", fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                background: showViolinists ? "#c49a2a" : "transparent", color: showViolinists ? "#1a1510" : "#c49a2a",
                border: "1px solid #c49a2a", borderRadius: 4, cursor: "pointer", transition: "all 0.2s",
                display: "inline-flex", alignItems: "center", gap: 6
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a6.5 6.5 0 0113 0"/></svg>
                {showViolinists ? "Back to Reference" : `Great Violinists (${VIOLINISTS.length})`}
              </button>
            </div>
          </div>
        </div>

        {/* SEARCH + FILTERS — hidden when in Level Guide or Violinists view */}
        {!showLevelGuide && !showViolinists && <div style={{ background: "#faf8f4", padding: "16px 24px 12px", borderBottom: "1px solid #e0d8cc" }}>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <div style={{ position: "relative" }}>
              <input
                ref={searchRef}
                type="text"
                placeholder="Search by title, composer, skill, nationality, edition..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 16px 14px 44px",
                  fontSize: 16,
                  fontFamily: "'DM Sans', sans-serif",
                  border: "2px solid #d4cbbf",
                  borderRadius: 8,
                  background: "#fff",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s"
                }}
                onFocus={e => e.target.style.borderColor = "#c49a2a"}
                onBlur={e => e.target.style.borderColor = "#d4cbbf"}
              />
              <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontSize: 18, opacity: 0.4 }}>🔍</span>
              {search && (
                <button onClick={() => setSearch("")} style={{
                  position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", fontSize: 18, cursor: "pointer", opacity: 0.4, padding: 4
                }}>✕</button>
              )}
            </div>

            {/* FILTERS ROW */}
            <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap", flex: 1, minWidth: 0 }}>
                {["All", ...CATEGORIES].map(cat => (
                  <button key={cat} onClick={() => setSelectedCat(cat)} style={{
                    padding: "5px 10px",
                    fontSize: 12,
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: selectedCat === cat ? 600 : 400,
                    background: selectedCat === cat ? "#2c2419" : "#f0ebe3",
                    color: selectedCat === cat ? "#f5efe6" : "#5c4f3d",
                    border: "1px solid " + (selectedCat === cat ? "#2c2419" : "#d4cbbf"),
                    borderRadius: 4,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 0.15s"
                  }}>
                    {cat === "All" ? `All (${catCounts.All})` : `${cat} (${catCounts[cat] || 0})`}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 10, alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>
                <span style={{ color: "#7a6e5d" }}>Difficulty:</span>
                <input type="range" min={1} max={10} value={diffRange[0]} onChange={e => setDiffRange([+e.target.value, Math.max(+e.target.value, diffRange[1])])} style={{ width: 80, accentColor: "#c49a2a" }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, minWidth: 36, textAlign: "center" }}>{diffRange[0]}–{diffRange[1]}</span>
                <input type="range" min={1} max={10} value={diffRange[1]} onChange={e => setDiffRange([Math.min(diffRange[0], +e.target.value), +e.target.value])} style={{ width: 80, accentColor: "#c49a2a" }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#7a6e5d" }}>
                <span>Sort:</span>
                {["category", "composer", "difficulty"].map(s => (
                  <button key={s} onClick={() => setSortBy(s)} style={{
                    padding: "3px 8px", fontSize: 12, fontFamily: "'DM Sans', sans-serif",
                    background: sortBy === s ? "#c49a2a" : "transparent",
                    color: sortBy === s ? "#fff" : "#7a6e5d",
                    border: "1px solid " + (sortBy === s ? "#c49a2a" : "#ccc"),
                    borderRadius: 3, cursor: "pointer", textTransform: "capitalize"
                  }}>{s}</button>
                ))}
              </div>
              <label style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontFamily: "'DM Sans', sans-serif",
                color: "#7a6e5d", cursor: "pointer", whiteSpace: "nowrap", userSelect: "none" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 16, height: 16, borderRadius: 3, border: "2px solid #c49a2a",
                  background: showSyllabus ? "#c49a2a" : "transparent", transition: "all 0.15s", flexShrink: 0 }}>
                  {showSyllabus && <span style={{ width: 6, height: 9, borderRight: "2px solid #fff", borderBottom: "2px solid #fff", transform: "rotate(45deg)", marginBottom: 2 }}/>}
                </span>
                <input type="checkbox" checked={showSyllabus} onChange={e => setShowSyllabus(e.target.checked)} style={{ display: "none" }} />
                Syllabus pieces
              </label>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#999", marginLeft: "auto" }}>
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </div>
            </div>
          </div>
        </div>}
      </div>

      {/* TOGGLE BUTTON — always visible, fixed top-right */}
      <button
        onClick={toggleHeader}
        title={headerCollapsed ? "Show toolbar" : "Hide toolbar"}
        style={{
          position: "fixed",
          top: 12,
          right: 16,
          zIndex: 50,
          width: 38,
          height: 38,
          borderRadius: "50%",
          border: headerCollapsed ? "2px solid #c49a2a" : "2px solid rgba(196,154,42,0.6)",
          background: headerCollapsed ? "#c49a2a" : "rgba(196,154,42,0.9)",
          color: headerCollapsed ? "#1a1510" : "#1a1510",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          transition: "all 0.3s ease, transform 0.3s ease",
          boxShadow: headerCollapsed ? "0 2px 12px rgba(196,154,42,0.4)" : "0 2px 10px rgba(0,0,0,0.3)",
          transform: headerCollapsed ? "rotate(180deg)" : "rotate(0deg)",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = headerCollapsed ? "rotate(180deg) scale(1.12)" : "scale(1.12)"; e.currentTarget.style.boxShadow = "0 3px 16px rgba(196,154,42,0.5)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = headerCollapsed ? "rotate(180deg)" : "rotate(0deg)"; e.currentTarget.style.boxShadow = headerCollapsed ? "0 2px 12px rgba(196,154,42,0.4)" : "0 2px 10px rgba(0,0,0,0.3)"; }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 10L8 5L13 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>

        {showLevelGuide ? (
          <div style={{ paddingTop: 16, paddingBottom: 60 }}>
            <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>
              <p style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 20, fontFamily: "'DM Sans', sans-serif", color: "#5c4f3d" }}>
                Levels 0–10 define the technical prerequisites expected at each stage. Use these to gauge where a piece or study sits in the learning progression.
              </p>
              {LEVELS.map(lv => (
                <div key={lv.level} style={{ padding: "14px 0", borderBottom: "1px solid #ece6da" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                    <span style={{
                      display: "inline-block", width: 28, height: 28, lineHeight: "28px", textAlign: "center",
                      borderRadius: "50%", fontSize: 13, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
                      background: lv.level <= 2 ? "#4a9c6d" : lv.level <= 4 ? "#6aaa5e" : lv.level <= 6 ? "#c49a2a" : lv.level <= 8 ? "#c46a2a" : "#b33a3a",
                      color: "#fff"
                    }}>{lv.level}</span>
                    <span style={{ fontSize: 18, fontWeight: 600, fontFamily: "'Crimson Pro', Georgia, serif" }}>{lv.label}</span>
                  </div>
                  <div style={{ marginTop: 8, display: "grid", gridTemplateColumns: "110px 1fr", gap: "5px 12px", fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: "#5c4f3d" }}>
                    <span style={{ fontWeight: 600, color: "#7a6e5d" }}>Positions:</span><span>{lv.positions}</span>
                    <span style={{ fontWeight: 600, color: "#7a6e5d" }}>Right arm:</span><span>{lv.bowStrokes}</span>
                    <span style={{ fontWeight: 600, color: "#7a6e5d" }}>Left hand:</span><span>{lv.leftHand}</span>
                    <span style={{ fontWeight: 600, color: "#7a6e5d" }}>Vibrato:</span><span>{lv.vibrato}</span>
                    <span style={{ fontWeight: 600, color: "#7a6e5d" }}>Shifting:</span><span>{lv.shifting}</span>
                    <span style={{ fontWeight: 600, color: "#7a6e5d" }}>Repertoire:</span><span style={{ fontStyle: "italic" }}>{lv.representative}</span>
                    <span style={{ fontWeight: 600, color: "#7a6e5d" }}>Syllabi:</span><span style={{ fontSize: 12, color: "#8b7a60" }}>{lv.syllabi}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : showViolinists ? (
          <div style={{ paddingTop: 16, paddingBottom: 60 }}>
            <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>
              <div style={{ position: "relative", marginBottom: 12 }}>
                <input type="text" placeholder="Search violinists by name, nationality, era..."
                  value={violinistSearch} onChange={e => setViolinistSearch(e.target.value)}
                  style={{ width: "100%", padding: "12px 16px 12px 40px", fontSize: 15, fontFamily: "'DM Sans', sans-serif",
                    border: "2px solid #d4cbbf", borderRadius: 8, background: "#fff", outline: "none", boxSizing: "border-box" }}
                  onFocus={e => e.target.style.borderColor = "#c49a2a"}
                  onBlur={e => e.target.style.borderColor = "#d4cbbf"} />
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, opacity: 0.4 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </span>
              </div>

              {/* Era filter chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                {VIOLINIST_ERAS.map(era => (
                  <button key={era} onClick={() => setViolinistEra(era)} style={{
                    padding: "4px 10px", fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                    background: violinistEra === era ? "#c49a2a" : "transparent",
                    color: violinistEra === era ? "#fff" : "#7a6e5d",
                    border: "1px solid " + (violinistEra === era ? "#c49a2a" : "#d4cbbf"),
                    borderRadius: 20, cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap"
                  }}>
                    {era === "All" ? `All (${violinistEraCounts.All})` : `${era} (${violinistEraCounts[era] || 0})`}
                  </button>
                ))}
              </div>

              {/* Sort + count row */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#7a6e5d" }}>
                  <span>Sort:</span>
                  {[["alpha", "A–Z"], ["chrono", "Chronological"]].map(([val, label]) => (
                    <button key={val} onClick={() => setViolinistSort(val)} style={{
                      padding: "3px 8px", fontSize: 11, fontFamily: "'DM Sans', sans-serif",
                      background: violinistSort === val ? "#c49a2a" : "transparent",
                      color: violinistSort === val ? "#fff" : "#7a6e5d",
                      border: "1px solid " + (violinistSort === val ? "#c49a2a" : "#ccc"),
                      borderRadius: 3, cursor: "pointer"
                    }}>{label}</button>
                  ))}
                </div>
                <span style={{ fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: "#999", marginLeft: "auto" }}>
                  {filteredViolinists.length} violinist{filteredViolinists.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Violinist list with group headers */}
              {filteredViolinists.map((v, i) => {
                const group = getViolinistGroup(v);
                const prevGroup = i > 0 ? getViolinistGroup(filteredViolinists[i - 1]) : null;
                const showGroupHeader = violinistSort === "chrono" && violinistEra === "All" && group !== prevGroup;
                return (
                  <div key={v.id}>
                    {showGroupHeader && (
                      <div style={{
                        fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
                        letterSpacing: 2, textTransform: "uppercase", color: "#c49a2a",
                        padding: "16px 0 6px", borderBottom: "1px solid #e0d8cc", marginBottom: 6,
                        marginTop: i > 0 ? 12 : 0
                      }}>{group}</div>
                    )}
                    <div style={{ padding: "10px 0", borderBottom: "1px solid #ece6da" }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 17, fontWeight: 600, fontFamily: "'Crimson Pro', Georgia, serif" }}>{v.name}</span>
                        <span style={{ fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: "#999" }}>{v.dates}</span>
                        <span style={{ fontSize: 12, fontFamily: "'DM Sans', sans-serif", color: "#b8a88a" }}>{v.nationality}</span>
                      </div>
                      <p style={{ fontSize: 14, lineHeight: 1.6, margin: "4px 0 0", fontFamily: "'DM Sans', sans-serif", color: "#5c4f3d" }}>{v.bio}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
        <div style={{ paddingTop: 16, paddingBottom: 60 }}>
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#999" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🎻</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15 }}>No entries match your search and filters.</div>
            </div>
          )}
          {filtered.map((item, i) => {
            const isOpen = expandedId === item.id;
            const prevCat = i > 0 ? filtered[i - 1].category : null;
            const showCatHeader = sortBy === "category" && item.category !== prevCat;
            return (
              <div key={item.id}>
                {showCatHeader && (
                  <div style={{
                    fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
                    letterSpacing: 2, textTransform: "uppercase", color: "#c49a2a",
                    padding: "20px 0 8px", borderBottom: "1px solid #e0d8cc", marginBottom: 8, marginTop: i > 0 ? 16 : 0
                  }}>
                    {item.category}
                  </div>
                )}
                <div
                  onClick={() => setExpandedId(isOpen ? null : item.id)}
                  style={{
                    background: isOpen ? "#fff" : "transparent",
                    border: isOpen ? "1px solid #d4cbbf" : "1px solid transparent",
                    borderRadius: 6,
                    padding: "12px 16px",
                    marginBottom: 4,
                    cursor: "pointer",
                    transition: "all 0.15s",
                    boxShadow: isOpen ? "0 2px 8px rgba(0,0,0,0.06)" : "none"
                  }}
                  onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = "#f5f0e8"; }}
                  onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = "transparent"; }}
                >
                  {/* COLLAPSED VIEW */}
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.3 }}>{item.title}</span>
                        {item.difficulty && (
                          <span style={{
                            fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
                            background: diffColor(item.difficulty) + "18",
                            color: diffColor(item.difficulty),
                            padding: "2px 8px", borderRadius: 3, whiteSpace: "nowrap",
                            border: `1px solid ${diffColor(item.difficulty)}33`
                          }}>
                            {item.difficulty[0]}–{item.difficulty[1]} · {diffLabel(item.difficulty)}
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: "#7a6e5d", marginTop: 3, display: "flex", gap: 12, flexWrap: "wrap" }}>
                        <span>{item.composer}</span>
                        {item.nationality && <span style={{ opacity: 0.6 }}>{item.nationality}</span>}
                        {item.period && <span style={{ opacity: 0.6 }}>{item.period}</span>}
                        {item.subcategory && <span style={{ fontStyle: "italic", opacity: 0.6 }}>{item.subcategory}</span>}
                      </div>
                    </div>
                    <span style={{ fontSize: 14, color: "#bbb", flexShrink: 0, marginTop: 4, transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "none" }}>▼</span>
                  </div>

                  {/* EXPANDED VIEW */}
                  {isOpen && (
                    <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #ece6da" }} onClick={e => e.stopPropagation()}>
                      <p style={{ fontSize: 15.5, lineHeight: 1.7, margin: "0 0 12px", color: "#3d3225" }}>{item.description}</p>

                      {item.auditionStandard && (
                        <span style={{ display: "inline-block", fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
                          background: "#b33a3a18", color: "#b33a3a", border: "1px solid #b33a3a33", padding: "2px 8px",
                          borderRadius: 3, marginBottom: 12 }}>Standard Audition Excerpt</span>
                      )}

                      {item.barRanges && (
                        <div style={{ marginBottom: 16 }}>
                          <div style={{ fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: "#8b6914", marginBottom: 6 }}>Bar Ranges</div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {item.barRanges.map((br, bi) => (
                              <span key={bi} style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", background: "#f0ebe3",
                                padding: "3px 8px", borderRadius: 3, color: "#5c4f3d", border: "1px solid #e0d8cc" }}>{br}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {item.orchestraExcerptsUrl && (
                        <div style={{ marginBottom: 12 }}>
                          <a href={item.orchestraExcerptsUrl} target="_blank" rel="noopener noreferrer" style={{
                            fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: "#8b6914", textDecoration: "none",
                            display: "inline-flex", alignItems: "center", gap: 5
                          }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                            View on OrchestraExcerpts.com
                          </a>
                        </div>
                      )}

                      {item.skills && (
                        <div style={{ marginBottom: 16 }}>
                          <div style={{ fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: "#c49a2a", marginBottom: 6 }}>Skills Developed</div>
                          <p style={{ fontSize: 14.5, lineHeight: 1.65, margin: 0, fontFamily: "'DM Sans', sans-serif", color: "#5c4f3d" }}>{item.skills}</p>
                        </div>
                      )}

                      {item.examLevel && (
                        <div style={{ marginBottom: 16 }}>
                          <details style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            <summary style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: "#8b6914", cursor: "pointer", marginBottom: 4 }}>Exam Syllabus Level</summary>
                            <p style={{ fontSize: 13, lineHeight: 1.5, margin: "6px 0 0 0", color: "#7a6e5d", paddingLeft: 12, borderLeft: "2px solid #c49a2a33" }}>{item.examLevel}</p>
                          </details>
                        </div>
                      )}

                      {item.editions && (() => {
                        const edList = item.editions.split("; ").filter(Boolean);
                        const showAll = expandedEditions[item.id

];
                        const visible = showAll ? edList : edList.slice(0, 2);
                        const hasMore = edList.length > 2;
                        return (
                        <div style={{
                          background: "#f5f0e8",
                          borderRadius: 6,
                          padding: "12px 16px",
                          borderLeft: "3px solid #c49a2a"
                        }}>
                          <div style={{ fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: "#c49a2a", marginBottom: 8 }}>Recommended Editions</div>
                          {visible.map((ed, ei) => (
                            <div key={ei} style={{ fontSize: 14, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif", color: "#5c4f3d", marginBottom: ei < visible.length - 1 ? 6 : 0, paddingLeft: 12, borderLeft: ei === 0 ? "2px solid #c49a2a55" : "2px solid transparent" }}>
                              {ed.trim()}
                            </div>
                          ))}
                          {hasMore && (
                            <button onClick={() => setExpandedEditions(prev => ({ ...prev, [item.id]: !prev[item.id] }))} style={{
                              background: "none", border: "none", cursor: "pointer", padding: "6px 0 0",
                              fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: "#c49a2a",
                              display: "flex", alignItems: "center", gap: 4
                            }}>
                              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ transition: "transform 0.2s", transform: showAll ? "rotate(180deg)" : "rotate(0deg)" }}>
                                <path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              {showAll ? "Show fewer" : `Show ${edList.length - 2} more edition${edList.length - 2 > 1 ? "s" : ""}`}
                            </button>
                          )}
                          {item.imslp && (
                            <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid #e0d8cc" }}>
                              <a href={item.imslp} target="_blank" rel="noopener noreferrer" style={{
                                fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: "#8b6914", textDecoration: "none",
                                display: "inline-flex", alignItems: "center", gap: 5
                              }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                                View on IMSLP (free public-domain editions)
                              </a>
                            </div>
                          )}
                        </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        )}
      </div>

      <div style={{
        background: "#2c2419", color: "#b8a88a", textAlign: "center",
        padding: "20px", fontSize: 13, fontFamily: "'DM Sans', sans-serif"
      }}>
        Comprehensive Violin Repertoire & Studies Guide — {DATA.length} entries · v1.0.0
      </div>
    </div>
  );
}
