import { useState, useMemo, useRef, useEffect } from "react";

const DATA = [
  // ═══════════════════════════════════════════════════════════════
  // SECTION 1: BEGINNER METHODS
  // ═══════════════════════════════════════════════════════════════
  {
    id: "suzuki", category: "Beginner Methods", composer: "Shinichi Suzuki", nationality: "Japanese", period: "20th Century",
    title: "Suzuki Violin School (Vols. 1–10)",
    difficulty: [1, 8],
    description: "The most widely used violin method worldwide. Based on Suzuki's 'mother tongue' approach—learning music through listening and imitation before reading. The ten volumes progress from 'Twinkle' variations through concerto-level repertoire (Bach A minor, Mozart concerti). The early volumes develop tone production, bow control, and basic left-hand patterns through carefully sequenced folk songs and classical pieces. Later volumes incorporate standard repertoire (Vivaldi concertos, Bach, Handel sonatas). Strengths: builds ear training and musical instinct from day one; provides a shared repertoire for group classes. Limitations: reading skills must be supplemented separately; some pedagogues criticize delayed introduction of shifting.",
    skills: "Ear training; tone production; basic bow strokes; left-hand patterns in first position (Vols. 1–3); shifting and vibrato (Vols. 4–6); advanced repertoire preparation (Vols. 7–10).",
    editions: "Summy-Birchard / Alfred Music (revised editions with CD/audio recordings by William Preucil and Hilary Hahn); International Suzuki Association authorized editions."
  },
  {
    id: "doflein", category: "Beginner Methods", composer: "Erich & Elma Doflein", nationality: "German", period: "20th Century",
    title: "The Doflein Method (Vols. 1–5)",
    difficulty: [1, 6],
    description: "A European-standard method emphasizing music reading and theoretical understanding alongside playing. Distinguished by its use of high-quality musical literature from the outset—duets by Bartók, arrangements of folk songs, and original pedagogical pieces by contemporary composers. Each volume integrates theory, ear training, and technique. More intellectually rigorous than Suzuki; widely used in German-speaking countries and Scandinavia.",
    skills: "Music reading from the start; duet playing; theoretical understanding; progressive technical development with musical context; introduction to 20th-century musical language.",
    editions: "Schott (original and revised editions). All five volumes available individually."
  },
  {
    id: "bang", category: "Beginner Methods", composer: "Maia Bang", nationality: "Norwegian-American", period: "Early 20th Century",
    title: "Maia Bang Violin Method (Parts I–IV)",
    difficulty: [1, 5],
    description: "Developed by a student of Leopold Auer, this method reflects the pedagogical priorities of the Russian school as transmitted through Auer. The four parts progress systematically from first position through advanced position work. Notable for its clear, no-nonsense approach to fundamentals, logical ordering of material, and emphasis on building a solid technical foundation. Includes études, exercises, and short pieces at each level. Once widely used in American conservatories; still valuable for its clarity and Auer-school lineage.",
    skills: "Systematic position work; Auer-school bowing principles; clean intonation; progressive technical development; foundational left-hand and right-hand coordination.",
    editions: "Carl Fischer (original edition, 4 parts)."
  },
  {
    id: "trott", category: "Technical Exercises", subcategory: "Double Stops", composer: "Josephine Trott", nationality: "American", period: "Early 20th Century",
    title: "Melodious Double-Stops (Books 1 & 2)",
    difficulty: [3, 7],
    description: "Not a beginner method per se, but an essential early-intermediate resource. Trott's two books present double stops within melodic, musically appealing contexts. Book 1 covers thirds, sixths, and octaves at an approachable level. Book 2 is more advanced, introducing fingered octaves and tenths. These studies make the often-dreaded subject of double stops accessible and even enjoyable, building the left-hand frame and intonation sense needed for later repertoire.",
    skills: "Double-stop intonation; left-hand frame development; hearing intervals; introduction to polyphonic playing; hand strength and stretch.",
    editions: "G. Schirmer (standard edition, both books); International Music Company."
  },
  {
    id: "applebaum", category: "Beginner Methods", composer: "Samuel Applebaum", nationality: "American", period: "20th Century",
    title: "String Builder (Vols. 1–3) & The Way They Play series",
    difficulty: [1, 3],
    description: "String Builder is a widely used class method for beginning strings, providing a systematic, step-by-step approach suitable for heterogeneous string classes. 'The Way They Play' (multiple volumes) is a separate but invaluable interview/photo-essay series documenting the technical approaches of great violinists—useful as a reference for teachers and advanced students rather than a playing method.",
    skills: "Basic technique in class settings; ensemble awareness; reading skills; foundational tone production.",
    editions: "Belwin-Mills / Alfred Music."
  },
  {
    id: "galamian-method", category: "Beginner Methods", composer: "Ivan Galamian", nationality: "Armenian-American", period: "20th Century",
    title: "Principles of Violin Playing and Teaching (see also Treatises)",
    difficulty: [1, 10],
    description: "While primarily a treatise (see Treatises section), Galamian's 'Principles' also functions as a method when used with his 'Contemporary Violin Technique' scale system. The combination provides a complete technical curriculum from intermediate through professional level. Galamian's approach emphasizes systematic daily practice organized around scales, études, and repertoire, with particular attention to coordination between the two hands.",
    skills: "Complete technical system; coordination; acceleration patterns; all bow strokes; scale and arpeggio mastery.",
    editions: "Prentice-Hall (Principles); Galaxy Music/ECS Publishing (Contemporary Violin Technique, Vols. 1–2)."
  },
  {
    id: "auer-method", category: "Beginner Methods", composer: "Leopold Auer", nationality: "Hungarian-American", period: "Early 20th Century",
    title: "Graded Course of Violin Playing (8 vols.)",
    difficulty: [1, 7],
    description: "Auer's systematic course covers the full arc from beginner to advanced student. The eight volumes progress logically through first position, shifting, vibrato, double stops, and advanced technique. Compiled with the assistance of his students, the method reflects the pedagogical approach that produced Heifetz, Milstein, Elman, Zimbalist, and Seidel. Each volume includes exercises, études, and graded pieces.",
    skills: "Comprehensive technical development; Auer-school principles; progressive position work; bowing; musical development through graded repertoire.",
    editions: "Carl Fischer (complete set of 8 volumes)."
  },
  {
    id: "sassmannshaus", category: "Beginner Methods", composer: "Egon Sassmannshaus", nationality: "German-American", period: "20th/21st Century",
    title: "Early Start on the Violin (Vols. 1–4)",
    difficulty: [1, 4],
    description: "A modern method designed for very young beginners (ages 4–7), incorporating colorful illustrations, simple songs, and a carefully paced technical progression. Emphasizes natural, tension-free playing from the beginning. Widely adopted in pre-conservatory programs. The approach balances Suzuki-like ear-first learning with early note reading.",
    skills: "Very early technique; natural posture and hold; first-position patterns; basic bowing; reading readiness.",
    editions: "Bärenreiter (all volumes, with teacher guides)."
  },
  {
    id: "eta-cohen", category: "Beginner Methods", composer: "Eta Cohen", nationality: "British", period: "20th Century",
    title: "Violin Method (Books 1–4) & Easy Violin Duets",
    difficulty: [1, 5],
    description: "A British standard method widely used in the UK's ABRSM examination system. The four books progress from absolute beginner through intermediate level with a strong emphasis on music reading and theoretical understanding alongside technical development. Cohen's duets are excellent supplementary material for developing ensemble skills early.",
    skills: "Note reading; music theory integration; progressive technique; ensemble playing through duets.",
    editions: "Novello / Music Sales Group."
  },
  {
    id: "nelson", category: "Beginner Methods", composer: "Sheila Nelson", nationality: "British", period: "20th Century",
    title: "The Essential String Method (Vols. 1–4); Piece by Piece; Right from the Start",
    difficulty: [1, 5],
    description: "Nelson's materials are among the most musically imaginative beginner resources. 'Piece by Piece' pairs student parts with piano accompaniments of genuine musical interest. 'Right from the Start' introduces technique through creative, game-like activities. Widely used in British and European pedagogy.",
    skills: "Creative approach to fundamentals; ensemble skills; musical expression from the start; progressive technique.",
    editions: "Boosey & Hawkes."
  },
  {
    id: "rolland", category: "Beginner Methods", composer: "Paul Rolland", nationality: "Hungarian-American", period: "20th Century",
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
    id: "flesch-scales", category: "Technical Exercises", subcategory: "Scale Systems", composer: "Carl Flesch", nationality: "Hungarian", period: "20th Century",
    title: "Scale System (Das Skalensystem, 1926)",
    difficulty: [5, 10],
    description: "The most widely adopted comprehensive scale routine. Covers every key in a progressive format: scales in one, two, and three octaves; arpeggios (triads, dominant 7ths, diminished 7ths); double stops in thirds, sixths, octaves, fingered octaves, and tenths; chromatic scales. Each key forms a self-contained daily unit. The system builds intonation, shifting fluency, left-hand frame consistency, and systematic bowing variety.",
    skills: "Intonation across all keys and positions; shifting; double-stop facility; arpeggio flexibility; systematic bowing development.",
    editions: "Carl Flesch, ed. Charlotte Flesch (Ries & Erler / Carl Fischer) — revised by Flesch's granddaughter, corrects errors from original printings; Carl Flesch, rev. Max Rostal (Ries & Erler) — pedagogical commentary reflecting the evolved Flesch school; Carl Fischer reprint — standard American edition; Schott — German alternative printing.",
    imslp: "https://imslp.org/wiki/Scale_System_(Flesch%2C_Carl)"
  },
  {
    id: "flesch-urstudien", category: "Technical Exercises", subcategory: "Tone & Fundamentals", composer: "Carl Flesch", nationality: "Hungarian", period: "20th Century",
    title: "Urstudien (Basic Studies / Fundamental Studies)",
    difficulty: [3, 8],
    description: "Flesch's Urstudien address the most fundamental elements of violin technique: sustained tone production, basic bow strokes, and elementary left-hand patterns. They are designed as daily warm-up material and distill Flesch's approach to the building blocks of tone. The exercises include long tones with controlled bow speed and distribution, son filé (spun tone), and basic patterns for developing bow contact and sound point awareness. Less well-known than the Scale System but equally important in Flesch's pedagogical philosophy.",
    skills: "Tone production; bow control and distribution; son filé; sound-point awareness; basic left-hand patterns; daily warm-up routine.",
    editions: "Ries & Erler (original German edition); Carl Fischer (American edition)."
  },
  {
    id: "galamian-scales", category: "Technical Exercises", subcategory: "Scale Systems", composer: "Ivan Galamian", nationality: "Armenian-American", period: "20th Century",
    title: "Contemporary Violin Technique, Vols. 1 & 2 (1962)",
    difficulty: [5, 10],
    description: "The other dominant scale method. Volume 1 presents Galamian's theoretical framework with emphasis on 'acceleration patterns'—rhythmic groupings (2s, 3s, 4s, 6s, 8s, etc.) applied to scales for building speed and evenness. Volume 2 provides the scale and arpeggio material in all keys with extensive double-stop exercises. Distinctive for its insistence on rhythmic variety and coordination building.",
    skills: "Intonation; rhythmic precision through acceleration patterns; bow distribution; shifting; left-right coordination at speed.",
    editions: "Ivan Galamian & Frederick Neumann (Galaxy Music / ECS Publishing) — the only edition, periodically out of print."
  },
  {
    id: "hrimaly", category: "Technical Exercises", subcategory: "Scale Systems", composer: "Jan Hřimalý", nationality: "Czech", period: "19th Century",
    title: "Scale Studies for Violin (1895)",
    difficulty: [3, 6],
    description: "Scales and arpeggios in all major and minor keys across three octaves, with a simpler format than Flesch or Galamian. Proceeds chromatically through the keys and includes scales in thirds and sixths. Often used as preparatory material before advancing to Flesch.",
    skills: "Basic scale fluency in all keys; intonation fundamentals; early shifting; introduction to double-stop scales.",
    editions: "G. Schirmer (standard American edition); International Music Company.",
    imslp: "https://imslp.org/wiki/Scale_Studies_(H%C5%99imal%C3%BD%2C_Jan)"
  },
  {
    id: "mogill", category: "Technical Exercises", subcategory: "Scale Systems", composer: "Leonard Mogill", nationality: "American", period: "20th Century",
    title: "Scale Studies in All Keys for Violin",
    difficulty: [3, 7],
    description: "A practical and well-organized scale reference that complements the Flesch and Galamian systems. Mogill was a member of the Philadelphia Orchestra, and his scale studies reflect the practical needs of a professional orchestral violinist. Clear layout and logical progressions make it a useful daily practice companion.",
    skills: "Scale and arpeggio fluency; practical intonation training; orchestral-oriented technical readiness.",
    editions: "G. Schirmer."
  },

  // LEFT-HAND TECHNIQUE
  {
    id: "schradieck", category: "Technical Exercises", subcategory: "Left Hand", composer: "Henry Schradieck", nationality: "German-American", period: "19th Century",
    title: "The School of Violin Technics (3 Books, 1899)",
    difficulty: [3, 8],
    description: "One of the most effective tools for left-hand agility, independence, and evenness. Book I: finger patterns in first position with progressive exercises for speed and clarity. Book II: exercises in positions II–VII. Book III: double stops. Meant to be played with a metronome at gradually increasing tempi.",
    skills: "Left-hand finger independence and agility; evenness of trill and passage work; upper-position facility (Book II); double-stop intonation and hand shape (Book III).",
    editions: "G. Schirmer (original) — standard reference edition; Carl Fischer — slightly reformatted but same content; International Music Company — available in individual books; Bosworth — European edition; Peters — German alternative.",
    imslp: "https://imslp.org/wiki/The_School_of_Violin-Technics_(Schradieck%2C_Henry)"
  },
  {
    id: "sevcik-op1", category: "Technical Exercises", subcategory: "Left Hand", composer: "Otakar Ševčík", nationality: "Czech", period: "19th/20th Century",
    title: "School of Violin Technique, Op. 1 (4 Parts)",
    difficulty: [2, 9],
    description: "A monumental compendium. Part 1: first-position exercises (half/whole steps in all finger patterns). Part 2: exercises in 2nd–7th positions. Part 3: shifting between positions. Part 4: double stops. Encyclopedic—nearly every possible finger combination is exhaustively explored. Best used selectively, targeting specific weaknesses rather than played cover to cover.",
    skills: "Comprehensive left-hand development; finger patterns in all positions; interval intonation; shifting mechanics; double stops.",
    editions: "Bosworth (original Viennese edition) — individual parts available; Lauren Keiser / Masters Music (American reprint) — clean and affordable; Bärenreiter — scholarly reprint of the original engraving; Peters — German alternative; Schott — additional European option.",
    imslp: "https://imslp.org/wiki/School_of_Violin_Technique%2C_Op.1_(Sevc%CC%8C%C3%ADk%2C_Otakar)"
  },
  {
    id: "sevcik-op8", category: "Technical Exercises", subcategory: "Left Hand – Shifting", composer: "Otakar Ševčík", nationality: "Czech", period: "19th/20th Century",
    title: "Changes of Position and Preparatory Scale Studies, Op. 8",
    difficulty: [4, 7],
    description: "A focused study on shifting mechanics. Progresses from single-position shifts (1st to 2nd, etc.) through shifts spanning the entire fingerboard. Covers intermediate shifts, chromatic shifts, and shifts with string crossings. One of the most targeted and effective shifting methods available.",
    skills: "Smooth, accurate shifting; slide technique; intermediate notes; intonation security across positions.",
    editions: "Bosworth; Lauren Keiser.",
    imslp: "https://imslp.org/wiki/Changes_of_Position_and_Preparatory_Scale_Studies%2C_Op.8_(Sevc%CC%8C%C3%ADk%2C_Otakar)"
  },
  {
    id: "sevcik-op7", category: "Technical Exercises", subcategory: "Left Hand – Trills", composer: "Otakar Ševčík", nationality: "Czech", period: "19th/20th Century",
    title: "Preparatory Trill Studies, Op. 7",
    difficulty: [3, 7],
    description: "Systematic exercises for trill speed, evenness, and endurance. Covers trills from every finger combination in all positions, including double-stop trills. Often overlooked but extremely effective for building finger strength and independence.",
    skills: "Trill speed and evenness; finger strength; independence of weaker fingers (3rd and 4th).",
    editions: "Bosworth; International Music Company.",
    imslp: "https://imslp.org/wiki/Preparatory_Trill_Studies%2C_Op.7_(Sevc%CC%8C%C3%ADk%2C_Otakar)"
  },
  {
    id: "sevcik-op9", category: "Technical Exercises", subcategory: "Left Hand", composer: "Otakar Ševčík", nationality: "Czech", period: "19th/20th Century",
    title: "Preparatory Studies in Double-Stopping, Op. 9",
    difficulty: [5, 8],
    description: "Focused double-stop preparatory exercises complementing the double-stop material in Op. 1, Part 4. Systematically addresses thirds, sixths, octaves, and fingered octaves with progressive difficulty. Particularly useful for building the hand-frame adjustments required for accurate double-stop intonation.",
    skills: "Double-stop intonation; hand-frame adjustment between intervals; finger independence in double-stop contexts.",
    editions: "Bosworth; Lauren Keiser."
  },
  {
    id: "sevcik-op6", category: "Beginner Methods", composer: "Otakar Ševčík", nationality: "Czech", period: "19th/20th Century",
    title: "Violin Method for Beginners, Op. 6",
    difficulty: [1, 3],
    description: "Ševčík's method for absolute beginners, covering the very first steps of violin playing: open strings, first-position finger placement, basic bowing, and elementary rhythms. Less commonly used today than Suzuki or Doflein but historically significant and still pedagogically sound.",
    skills: "Absolute beginner technique; first contact with the instrument; open strings; first-position patterns.",
    editions: "Bosworth."
  },
  {
    id: "dounis-op12", category: "Technical Exercises", subcategory: "Left Hand – Advanced", composer: "Demetrius Constantine Dounis", nationality: "Greek-American", period: "20th Century",
    title: "The Artist's Technique of Violin Playing, Op. 12",
    difficulty: [6, 10],
    description: "A concentrated system for developing virtuoso left-hand technique. Emphasizes absolute independence of the fingers, stretches, contractions, and unusual finger combinations beyond conventional patterns. Dounis was famous for rehabilitating the technique of professional violinists; these exercises have a therapeutic quality, isolating and rebuilding fundamental mechanical motions. Dense material—practice in small doses.",
    skills: "Finger independence and strength; stretches and contractions; elimination of excess tension; coordination between fingers.",
    editions: "Carl Fischer (standard edition, complete set); Stainer & Bell."
  },
  {
    id: "dounis-op15", category: "Technical Exercises", subcategory: "Left Hand – Advanced", composer: "Demetrius Constantine Dounis", nationality: "Greek-American", period: "20th Century",
    title: "The Absolute Independence of the Fingers, Op. 15",
    difficulty: [7, 10],
    description: "Perhaps Dounis's most celebrated work. Develops complete independence of each finger through patterns requiring one finger to hold while others move in contrary motion, extensions, and rapid alternations. Used by advanced players to overcome specific technical limitations.",
    skills: "Absolute finger independence; hand-frame stability during complex passages; elimination of sympathetic finger motion.",
    editions: "Carl Fischer."
  },
  {
    id: "dounis-op18", category: "Technical Exercises", subcategory: "Left Hand – Trills", composer: "Demetrius Constantine Dounis", nationality: "Greek-American", period: "20th Century",
    title: "Fundamental Trill Studies, Op. 18",
    difficulty: [7, 9],
    description: "Companion volume focusing on trill development through Dounis's characteristic approach of isolating mechanical motions. More advanced and unconventional than Ševčík's trill studies.",
    skills: "Advanced trill control; finger independence; hand balance and freedom.",
    editions: "Carl Fischer."
  },
  {
    id: "dounis-op21", category: "Technical Exercises", subcategory: "Left Hand – Advanced", composer: "Demetrius Constantine Dounis", nationality: "Greek-American", period: "20th Century",
    title: "The Higher Development of Thirds and Fingered Octaves, Op. 21",
    difficulty: [8, 10],
    description: "Advanced material for developing facility in the most demanding double-stop intervals: thirds and fingered octaves. Dounis's exercises go beyond conventional scale patterns to address the hand mechanics needed for these intervals at virtuoso speed and accuracy.",
    skills: "Advanced double-stop thirds; fingered octave facility; hand mechanics for virtuoso double-stop passage work.",
    editions: "Carl Fischer."
  },
  {
    id: "dounis-daily-dozen", category: "Technical Exercises", subcategory: "Left Hand – Advanced", composer: "Demetrius Constantine Dounis", nationality: "Greek-American", period: "20th Century",
    title: "Daily Dozen (Twelve Essential Exercises)",
    difficulty: [5, 9],
    description: "A concentrated set of twelve daily exercises distilling the core principles of Dounis's technique. Covers left-hand independence, stretches, shifts, and coordination. More approachable than the full Op. 12 system and an excellent introduction to Dounis's methods for players at the intermediate-to-advanced level.",
    skills: "Core left-hand mechanics; daily warm-up for advanced players; introduction to Dounis principles.",
    editions: "Carl Fischer."
  },

  // BOWING TECHNIQUE
  {
    id: "sevcik-op2", category: "Technical Exercises", subcategory: "Bowing", composer: "Otakar Ševčík", nationality: "Czech", period: "19th/20th Century",
    title: "School of Bowing Technique, Op. 2 (6 Parts)",
    difficulty: [2, 8],
    description: "The companion bowing method to Op. 1. Provides themes followed by hundreds of bowing variations. Part 1: basic strokes in lower half, upper half, and whole bow. Parts 2–5 progress through spiccato, sautillé, ricochet, staccato, and combination bowings. Part 6: advanced combinations. Exhaustive; use selectively to diagnose and correct bowing weaknesses.",
    skills: "All bow strokes; bow distribution; string crossings; off-the-string technique; combination bowings; right-hand coordination.",
    editions: "Bosworth (original, individual parts); Lauren Keiser / Masters Music (American reprint).",
    imslp: "https://imslp.org/wiki/School_of_Bowing_Technique%2C_Op.2_(Sevc%CC%8C%C3%ADk%2C_Otakar)"
  },
  {
    id: "casorti", category: "Technical Exercises", subcategory: "Bowing", composer: "August Casorti", nationality: "Italian-German", period: "19th Century",
    title: "The Technique of Bowing, Op. 50",
    difficulty: [3, 7],
    description: "Systematic approach to all fundamental and advanced bow strokes. Progresses from basic whole-bow strokes through détaché, martelé, staccato (firm and flying), spiccato, sautillé, and ricochet. Less encyclopedic than Ševčík's Op. 2 but more digestible, with clear progressions within each stroke type.",
    skills: "Bow stroke vocabulary; bow control and distribution; string-crossing fluency; off-the-string technique.",
    editions: "Carl Fischer; International Music Company.",
    imslp: "https://imslp.org/wiki/The_Technique_of_Bowing%2C_Op.50_(Casorti%2C_August)"
  },
  {
    id: "fischer-basics", category: "Technical Exercises", subcategory: "Tone & Fundamentals", composer: "Simon Fischer", nationality: "British", period: "21st Century",
    title: "Basics: 300 Exercises and Practice Routines for the Violin (1997)",
    difficulty: [3, 9],
    description: "A landmark modern compendium that has become one of the most important pedagogical publications of recent decades. Fischer's 300 exercises systematically address every aspect of violin technique: right arm and bow (contact point, bow speed, pressure, distribution, string crossings, all strokes), left hand (intonation, shifting, vibrato, trills, extensions), and coordination. Each exercise is explained with Fischer's characteristically lucid prose, often accompanied by photographs and diagrams. The exercises are derived from Fischer's study with Dorothy DeLay, Galamian's methods, and his own extensive teaching experience. Used by students, professionals, and teachers worldwide as both a diagnostic tool and a daily practice resource.",
    skills: "Comprehensive technique: tone production, bow strokes, intonation, shifting, vibrato, trills, double stops, coordination, practice methodology.",
    editions: "Edition Peters (the only edition; regularly reprinted)."
  },
  {
    id: "fischer-practice", category: "Technical Exercises", subcategory: "Tone & Fundamentals", composer: "Simon Fischer", nationality: "British", period: "21st Century",
    title: "Practice: 250 Step-by-Step Practice Methods for the Violin (2004)",
    difficulty: [3, 9],
    description: "Fischer's companion to 'Basics,' focusing on how to practice rather than what to practice. The 250 methods address practice technique, problem-solving strategies, memorization, performance preparation, and the psychology of practicing. Each method is practical and immediately applicable. Together with 'Basics,' this forms the most comprehensive modern practice guide for violinists.",
    skills: "Practice methodology; problem diagnosis; memorization techniques; performance preparation; efficient practice habits.",
    editions: "Edition Peters."
  },
  {
    id: "fischer-scales", category: "Technical Exercises", subcategory: "Scale Systems", composer: "Simon Fischer", nationality: "British", period: "21st Century",
    title: "Scales (2012)",
    difficulty: [4, 9],
    description: "Fischer's scale method reimagines scale practice with an emphasis on understanding why each element is practiced and how to listen while playing scales. Includes exercises for intonation awareness, finger patterns, bow strokes, and musical shaping of scales. Complements rather than replaces Flesch and Galamian.",
    skills: "Intelligent scale practice; intonation awareness; understanding of finger patterns; musical scale playing.",
    editions: "Edition Peters."
  },
  {
    id: "fischer-warming", category: "Technical Exercises", subcategory: "Tone & Fundamentals", composer: "Simon Fischer", nationality: "British", period: "21st Century",
    title: "Warming Up (2020)",
    difficulty: [3, 8],
    description: "Fischer's most recent volume, presenting a systematic warm-up routine that covers all fundamental technical elements in a logical sequence. Designed to be used daily, selecting appropriate exercises from each section. Incorporates insights from decades of teaching and performing.",
    skills: "Daily warm-up routine; systematic technical maintenance; tone production; coordination.",
    editions: "Edition Peters."
  },
  {
    id: "fischer-tone", category: "Technical Exercises", subcategory: "Tone & Fundamentals", composer: "Simon Fischer", nationality: "British", period: "21st Century",
    title: "Tone: Experimenting with Proportions on the Violin (2021)",
    difficulty: [4, 10],
    description: "Fischer's deep exploration of tone production, examining the interplay of bow speed, pressure (weight), and contact point (sound point). The most detailed modern treatment of this fundamental subject, with exercises for developing a full palette of tone colors and dynamic range.",
    skills: "Tone production; sound-point awareness; dynamic control; tonal palette; bow speed/weight/contact relationships.",
    editions: "Edition Peters."
  },

  // SHIFTING
  {
    id: "yost", category: "Technical Exercises", subcategory: "Left Hand – Shifting", composer: "Gaylord Yost", nationality: "American", period: "Early 20th Century",
    title: "Exercises for the Change of Position",
    difficulty: [3, 6],
    description: "More melodic and musical shifting exercises than Ševčík's Op. 8. Presents shifts within short, tuneful phrases, making them appealing for intermediate students. Covers shifts between all commonly used positions on same finger, different fingers, and across strings.",
    skills: "Shifting accuracy and smoothness; musical application of position changes; building confidence in upper positions.",
    editions: "G. Schirmer; Carl Fischer.",
    imslp: "https://imslp.org/wiki/Exercises_for_Change_of_Position_(Yost%2C_Gaylord)"
  },

  // DOUBLE STOPS
  {
    id: "koergoeff", category: "Technical Exercises", subcategory: "Double Stops", composer: "Boris Koergoeff (Korguyev)", nationality: "Russian", period: "20th Century",
    title: "Exercises in Double Stopping",
    difficulty: [6, 9],
    description: "Standard resource for systematic double-stop development beyond the scale systems. Covers thirds, sixths, octaves, fingered octaves, and tenths with attention to intonation, hand-frame adjustment, and finger independence.",
    skills: "Double-stop intonation; left-hand frame for intervals; finger independence; endurance.",
    editions: "International Music Company; G. Schirmer.",
    imslp: "https://imslp.org/wiki/Exercises_in_Double-Stopping_(Korguyev%2C_Boris)"
  },
  {
    id: "polo", category: "Technical Exercises", subcategory: "Double Stops", composer: "Enrico Polo", nationality: "Italian", period: "Early 20th Century",
    title: "30 Studies in Double Stops",
    difficulty: [6, 8],
    description: "Polo's studies present double stops in étude form rather than as pure exercises, providing musical context for this demanding technique. Each study focuses on a particular interval type (thirds, sixths, octaves) within a piece-like framework, developing both accuracy and musical application. Polo was Arrigo Serato's teacher and a professor at the Milan Conservatory.",
    skills: "Double-stop intonation in musical context; thirds, sixths, octaves; left-hand frame in double-stop passages.",
    editions: "Ricordi (original Italian edition); International Music Company.",
    imslp: "https://imslp.org/wiki/30_Studi_a_corde_doppie_(Polo%2C_Enrico)"
  },

  // VIBRATO
  {
    id: "dounis-vibrato", category: "Technical Exercises", subcategory: "Vibrato", composer: "Demetrius Constantine Dounis", nationality: "Greek-American", period: "20th Century",
    title: "The Dounis Vibrato System (various exercises within Op. 12 & related materials)",
    difficulty: [4, 8],
    description: "Dounis developed specific exercises for developing a free, flexible vibrato, addressing arm vibrato, wrist vibrato, and finger vibrato as components of a unified motion. His approach emphasizes releasing tension and developing independent control of vibrato speed and width. These exercises are scattered across several of his publications and have been collected and systematized by later pedagogues.",
    skills: "Vibrato freedom; speed and width control; arm/wrist/finger vibrato integration; tension release.",
    editions: "Carl Fischer (within the Op. 12 collection and related publications)."
  },

  // GENERAL/COMPREHENSIVE
  {
    id: "wohlfahrt-38", category: "Technical Exercises", subcategory: "General", composer: "Franz Wohlfahrt", nationality: "German", period: "19th Century",
    title: "Easiest Elementary Method for Violin, Op. 38",
    difficulty: [1, 2],
    description: "Standard early-level method with short, tuneful exercises developing basic left-hand patterns in first position, simple bow strokes, and elementary reading skills. Bridge between absolute-beginner methods and étude collections.",
    skills: "First-position finger patterns; basic détaché and legato bowing; note reading; rhythmic fundamentals.",
    editions: "G. Schirmer; Peters.",
    imslp: "https://imslp.org/wiki/Easiest_Elementary_Method%2C_Op.38_(Wohlfahrt%2C_Franz)"
  },
  {
    id: "sitt-studies", category: "Technical Exercises", subcategory: "General", composer: "Hans Sitt", nationality: "Czech-German", period: "19th Century",
    title: "100 Studies, Op. 32 (5 Books)",
    difficulty: [2, 6],
    description: "Sitt's five books of studies progress systematically from first-position exercises through advanced position work and double stops. Book 1: first position. Book 2: second through fifth positions. Book 3: sixth and seventh positions. Book 4: double stops. Book 5: advanced combinations. Less celebrated than Wohlfahrt or Kayser but well-crafted and useful, particularly Books 2–3 for position work.",
    skills: "Progressive position work; systematic technical development; double stops (Book 4); broad key coverage.",
    editions: "Peters; International Music Company.",
    imslp: "https://imslp.org/wiki/100_Studies%2C_Op.32_(Sitt%2C_Hans)"
  },
  {
    id: "dancla-op74", category: "Technical Exercises", subcategory: "General", composer: "Charles Dancla", nationality: "French", period: "19th Century",
    title: "School of Mechanism, Op. 74",
    difficulty: [4, 6],
    description: "Dancla's Op. 74 'School of Mechanism' is a systematic technical collection focusing on specific left-hand and bowing challenges. It reflects the elegance of the French school while methodically building facility in areas such as string crossings, trills, arpeggios, and double stops. More technically focused than his melodic études (Op. 84, see Etudes section), it functions as a targeted exercise collection. Dancla also wrote six 'Airs variés' on operatic themes (Op. 89) that serve as excellent student performance pieces.",
    skills: "French school mechanism; targeted left-hand exercises; bowing challenges; string crossings; trills; arpeggios.",
    editions: "G. Schirmer; International Music Company; Peters.",
    imslp: "https://imslp.org/wiki/School_of_Mechanism%2C_Op.74_(Dancla%2C_Charles)"
  },
  {
    id: "whistler", category: "Technical Exercises", subcategory: "General", composer: "Harvey Whistler", nationality: "American", period: "20th Century",
    title: "Introducing the Positions (Vols. 1–2); Developing Double-Stops",
    difficulty: [3, 6],
    description: "Whistler's 'Introducing the Positions' is one of the most popular American resources for teaching shifting. Volume 1 covers third and fifth positions; Volume 2 covers second, fourth, sixth, and seventh positions. Clear, step-by-step approach with short exercises and pieces. 'Developing Double-Stops' provides a similar systematic introduction to double-stop playing.",
    skills: "Systematic position introduction; shifting fundamentals; double-stop basics.",
    editions: "Rubank / Hal Leonard."
  },
  {
    id: "tartini-art", category: "Technical Exercises", subcategory: "Tone & Fundamentals", composer: "Giuseppe Tartini", nationality: "Italian", period: "18th Century",
    title: "The Art of Bowing (L'arte dell'arco): 50 Variations on a Gavotte by Corelli",
    difficulty: [5, 8],
    description: "Fifty variations on a theme from Corelli's Op. 5, each exploring a different bowing pattern or technique. One of the earliest systematic approaches to bowing in the violin literature. The variations progress from simple to complex and remain musically engaging throughout. Still used as a bowing study and occasionally performed in concert.",
    skills: "Comprehensive bowing vocabulary; historical bow technique; musical application of varied bow strokes.",
    editions: "International Music Company; Peters; Ricordi.",
    imslp: "https://imslp.org/wiki/L%27arte_dell%27arco_(Tartini%2C_Giuseppe)"
  },

  // ═══════════════════════════════════════════════════════════════
  // SECTION 3: ETUDES & CAPRICES
  // ═══════════════════════════════════════════════════════════════
  {
    id: "wohlfahrt-45", category: "Etudes & Caprices", composer: "Franz Wohlfahrt", nationality: "German", period: "19th Century",
    title: "60 Studies for Violin, Op. 45",
    difficulty: [2, 4],
    description: "The workhorse of early pedagogy. Sixty studies progressing from first-position exercises to basic shifting and varied bowings. Musical enough to hold a young student's interest while covering essential fundamentals.",
    skills: "First-position facility; basic bowing patterns; key signatures through 3 sharps/flats; simple dynamics and phrasing.",
    editions: "G. Schirmer, ed. Gaston Blay; Peters; International Music Company.",
    imslp: "https://imslp.org/wiki/60_Studies%2C_Op.45_(Wohlfahrt%2C_Franz)"
  },
  {
    id: "kayser", category: "Etudes & Caprices", composer: "Heinrich Ernst Kayser", nationality: "German", period: "19th Century",
    title: "36 Elementary and Progressive Studies, Op. 20",
    difficulty: [2, 4],
    description: "Natural companion to Wohlfahrt with greater variety of character. Later studies introduce third position and moderately complex bowings.",
    skills: "Expanded first-position technique; introduction to third position; varied articulations; elementary string crossing.",
    editions: "G. Schirmer; International Music Company; Peters.",
    imslp: "https://imslp.org/wiki/36_Elementary_and_Progressive_Studies%2C_Op.20_(Kayser%2C_Heinrich_Ernst)"
  },
  {
    id: "beriot-60", category: "Etudes & Caprices", composer: "Charles de Bériot", nationality: "Belgian", period: "Romantic",
    title: "60 Easy Studies, Op. 60 (Méthode de violon, Pt. 1)",
    difficulty: [2, 4],
    description: "Melodically appealing studies reflecting the Franco-Belgian school's elegance. Cover first through third position with graceful phrasing and introduce ornaments earlier than most comparable collections.",
    skills: "Cantabile playing; ornaments; Franco-Belgian bowing style; musical expression at early stages.",
    editions: "G. Schirmer; International Music Company.",
    imslp: "https://imslp.org/wiki/M%C3%A9thode_de_violon%2C_Op.102_(B%C3%A9riot%2C_Charles-Auguste_de)"
  },
  {
    id: "mazas", category: "Etudes & Caprices", composer: "Jacques Féréol Mazas", nationality: "French", period: "Romantic",
    title: "Études spéciales, Op. 36 (3 Books)",
    difficulty: [4, 7],
    description: "Crucial position between Kayser and Kreutzer. Book 1 (Études spéciales): each étude targets a clear technique—string crossings, sustained legato, dotted rhythms, arpeggios, double stops. Books 2 (Études brillantes) and 3 (Études d'artistes) are progressively more demanding. Requires facility through fifth position.",
    skills: "String crossings; legato bowing; dotted rhythms; arpeggios across strings; positions 1–5; musical character.",
    editions: "International Music Company, ed. Ivan Galamian — the benchmark edition with Galamian's bowings and fingerings; G. Schirmer, ed. H. Sitt — older standard edition; Henle Verlag (Urtext) — scholarly edition based on first prints; Peters — European alternative; Schott — German edition.",
    imslp: "https://imslp.org/wiki/%C3%89tudes_sp%C3%A9ciales%2C_Op.36_(Mazas%2C_Jacques_F%C3%A9r%C3%A9ol)"
  },
  {
    id: "kreutzer", category: "Etudes & Caprices", composer: "Rodolphe Kreutzer", nationality: "French", period: "Classical",
    title: "42 Studies or Caprices (c. 1796)",
    difficulty: [5, 8],
    description: "The single most universally assigned set of études. Required for virtually all conservatory admissions. Each study targets a specific technique: No. 2 (trills/turns), No. 5 (legato), No. 8 (détaché), No. 9 (staccato), Nos. 12–13 (double stops), No. 32 (octaves), No. 42 (arpeggiation). Requires facility through seventh position, functional spiccato and martelé, and basic double-stop competence.",
    skills: "Core bow strokes; double stops; trills; left-hand facility through 7th position; string crossings; varied articulations; musical phrasing.",
    editions: "International Music Company, ed. Ivan Galamian — the most influential modern edition, standard in American conservatories; Henle Verlag (Urtext), ed. Norbert Gertsch — scholarly edition based on early sources, with critical notes; Peters, ed. E. Singer — traditional European edition, widely used; Bärenreiter (Urtext) — strong scholarly option with facsimile references; G. Schirmer, ed. Singer — standard American reprint; Schott (historical German edition); Ricordi, ed. A. Principe — Italian performing edition.",
    imslp: "https://imslp.org/wiki/42_Studies_or_Caprices_(Kreutzer%2C_Rodolphe)"
  },
  {
    id: "fiorillo", category: "Etudes & Caprices", composer: "Federigo Fiorillo", nationality: "German-Italian", period: "Classical",
    title: "36 Études or Caprices (c. 1790)",
    difficulty: [5, 7],
    description: "Often used alongside or between Kreutzer and Rode. Fiorillo's 36 études are less systematically organized than Kreutzer but offer excellent material for developing musical phrasing, varied articulations, and left-hand facility. Some studies have a concerto-like character. The set is sometimes undervalued but provides invaluable supplementary material.",
    skills: "Musical phrasing; varied bowings; position work; passage work; preparation for Rode.",
    editions: "International Music Company; G. Schirmer; Peters.",
    imslp: "https://imslp.org/wiki/36_%C3%89tudes_ou_Caprices_(Fiorillo%2C_Federigo)"
  },
  {
    id: "rode", category: "Etudes & Caprices", composer: "Pierre Rode", nationality: "French", period: "Classical/Romantic",
    title: "24 Caprices en forme d'études (c. 1815)",
    difficulty: [6, 8],
    description: "More explicitly musical than Kreutzer, resembling miniature concerto movements. Cover all 24 keys, demanding refined cantabile, greater high-position facility, and emerging virtuosity. Commonly assigned after Kreutzer as preparation for Paganini and advanced concerti.",
    skills: "Cantabile and expressive playing; advanced position work; double stops; ornaments; mixed bowings; facility in all keys.",
    editions: "International Music Company, ed. Ivan Galamian — standard pedagogical edition; Henle Verlag (Urtext) — based on first edition, scholarly critical notes; Peters, ed. Sitt — traditional European edition; G. Schirmer — accessible American edition; Schott — German performing edition; Bärenreiter — scholarly alternative.",
    imslp: "https://imslp.org/wiki/24_Caprices_for_Violin%2C_Op.22_(Rode%2C_Pierre)"
  },
  {
    id: "gavinies", category: "Etudes & Caprices", composer: "Pierre Gaviniès", nationality: "French", period: "Classical",
    title: "24 Matinées (c. 1794)",
    difficulty: [7, 9],
    description: "Among the most demanding pre-Paganini études. Require mature technique across the full range. Rich in musical content, demanding sustained concentration and stamina. Menuhin called them the most underrated works in the pedagogical literature.",
    skills: "Advanced bow technique; stamina; high-position work; complex passagework; pre-Romantic virtuosity; sustained musical intensity.",
    editions: "International Music Company, ed. Ivan Galamian — standard pedagogical edition with Galamian's fingerings and bowings; Peters — European edition; Schott — German alternative; Henle Verlag (Urtext) — scholarly edition; G. Schirmer — American standard.",
    imslp: "https://imslp.org/wiki/24_Matin%C3%A9es_(Gavini%C3%A8s%2C_Pierre)"
  },
  {
    id: "dont-35", category: "Etudes & Caprices", composer: "Jakob Dont", nationality: "Austrian", period: "Romantic",
    title: "24 Etudes and Caprices, Op. 35",
    difficulty: [7, 9],
    description: "Bridges the gap between Kreutzer/Rode and Paganini. Technically challenging and musically substantive, covering advanced bow strokes, double stops, position work, and virtuosic passagework.",
    skills: "Advanced bow technique; double stops; challenging passagework; musical sophistication; preparation for Paganini.",
    editions: "International Music Company, ed. Ivan Galamian — the standard teaching edition with Galamian's fingerings and bowings; Henle Verlag (Urtext) — scholarly edition with critical notes; Schott — clean European edition, historically important; Peters — traditional edition; G. Schirmer — American standard; Bärenreiter — scholarly alternative; Carl Fischer, ed. L. Svecenski — older American edition with useful fingerings.",
    imslp: "https://imslp.org/wiki/24_Etudes_and_Caprices%2C_Op.35_(Dont%2C_Jakob)"
  },
  {
    id: "dont-37", category: "Etudes & Caprices", composer: "Jakob Dont", nationality: "Austrian", period: "Romantic",
    title: "24 Preparatory Exercises, Op. 37",
    difficulty: [3, 5],
    description: "Significantly easier than Op. 35; serves as preparatory material for Kreutzer. Short, focused exercises covering shifting, string crossings, and basic bow strokes.",
    skills: "Intermediate shifting; string crossing; basic bow-stroke variety; preparation for Kreutzer.",
    editions: "G. Schirmer; International Music Company.",
    imslp: "https://imslp.org/wiki/24_Preparatory_Exercises%2C_Op.37_(Dont%2C_Jakob)"
  },
  {
    id: "paganini", category: "Etudes & Caprices", composer: "Niccolò Paganini", nationality: "Italian", period: "Romantic",
    title: "24 Caprices for Solo Violin, Op. 1 (1817–1819)",
    difficulty: [9, 10],
    description: "The most famous and demanding caprices in the literature. Each is a complete musical miniature pushing the instrument to its limits. Highlights: No. 1 (ricochet arpeggios), No. 5 (agitato/string crossings), No. 9 ('La Chasse'), No. 13 ('Devil's Laughter,' double-stop trills), No. 16 (tenths), No. 17 (octaves/fingered octaves), No. 20 (wide intervals), No. 24 (theme and variations). Mastery of even a selection is a benchmark of professional technique.",
    skills: "Every virtuoso technique: ricochet, flying staccato, left-hand pizzicato, harmonics, extreme double stops, spiccato at speed, bariolage, wide stretches, stamina.",
    editions: "Henle Verlag (Urtext), ed. Ernst Herttrich — premier scholarly edition based on the 1820 Ricordi first edition, includes autograph facsimile pages; Peters, ed. Carl Flesch — Flesch's pedagogically oriented fingerings and bowings, an important historical document; International Music Company, ed. Ivan Galamian — standard American teaching edition with Galamian's practical fingerings; Bärenreiter (Urtext), ed. Renato de Barbieri — strong Urtext with commentary; Ricordi, ed. Salvatore Accardo — edition by the great Paganini interpreter; Wiener Urtext, ed. Endre Granat — includes access to autograph facsimile; Schott, ed. A. Wilhelmj — historically significant 19th-century edition; Dover (reprint of the Schirmer Library edition) — affordable reference.",
    imslp: "https://imslp.org/wiki/24_Caprices_for_Solo_Violin%2C_Op.1_(Paganini%2C_Niccol%C3%B2)"
  },
  {
    id: "ernst-poly", category: "Etudes & Caprices", composer: "Heinrich Wilhelm Ernst", nationality: "Moravian-Austrian", period: "Romantic",
    title: "Six Polyphonic Studies (c. 1862)",
    difficulty: [10, 10],
    description: "Among the most difficult works ever written for solo violin. The final study—a fantasy on Schubert's Erlkönig—demands simultaneous melody, accompaniment, and bass. Concert-level showpieces masquerading as studies.",
    skills: "Extreme polyphonic technique; multiple-voice playing; advanced double stops and chords; stamina.",
    editions: "International Music Company; Carl Fischer.",
    imslp: "https://imslp.org/wiki/6_Polyphonic_Studies_(Ernst%2C_Heinrich_Wilhelm)"
  },
  {
    id: "wieniawski-op10", category: "Etudes & Caprices", composer: "Henryk Wieniawski", nationality: "Polish", period: "Romantic",
    title: "L'École moderne: 10 Études-Caprices, Op. 10",
    difficulty: [8, 10],
    description: "Virtuoso concert pieces developing the bravura Franco-Belgian style. Each explores a specific technique—spiccato, double stops, harmonics, left-hand pizzicato—within a highly musical framework. Regularly performed in concert and competition.",
    skills: "Concert-level virtuosity; bravura style; all advanced bow strokes; double stops; harmonics; left-hand pizzicato.",
    editions: "International Music Company, ed. Josef Gingold — Gingold's edition includes practical performance suggestions from the great pedagogue; Polskie Wydawnictwo Muzyczne (PWM) — Polish critical edition of Wieniawski's works, the most authoritative source; Peters — standard European edition; G. Schirmer — American edition; Schott — German alternative.",
    imslp: "https://imslp.org/wiki/L%27%C3%89cole_moderne%2C_Op.10_(Wieniawski%2C_Henryk)"
  },
  {
    id: "beriot-op104", category: "Etudes & Caprices", composer: "Charles de Bériot", nationality: "Belgian", period: "Romantic",
    title: "Études brillantes, Op. 104",
    difficulty: [6, 8],
    description: "More advanced than Bériot's Op. 60. Develops concert-style virtuosity in the Franco-Belgian tradition with emphasis on brilliance of execution and elegant phrasing.",
    skills: "Brilliant passage work; elegant phrasing; concert-level bowing; Franco-Belgian style.",
    editions: "G. Schirmer.",
    imslp: "https://imslp.org/wiki/%C3%89tudes_brillantes%2C_Op.104_(B%C3%A9riot%2C_Charles-Auguste_de)"
  },
  {
    id: "vieuxtemps-op16", category: "Etudes & Caprices", composer: "Henri Vieuxtemps", nationality: "Belgian", period: "Romantic",
    title: "6 Concert Études, Op. 16",
    difficulty: [7, 9],
    description: "Six substantial concert études by one of the greatest virtuoso-composers of the Franco-Belgian school. Each is a demanding concert piece in its own right, requiring mature technique and musical projection. Less frequently encountered than Wieniawski's Op. 10 but of comparable quality and difficulty.",
    skills: "Concert-level virtuosity; Franco-Belgian school bowing; broad dynamic range; musical projection.",
    editions: "International Music Company; Peters; Schott.",
    imslp: "https://imslp.org/wiki/6_Concert_Etudes%2C_Op.16_(Vieuxtemps%2C_Henri)"
  },
  {
    id: "leonard-op81", category: "Etudes & Caprices", composer: "Hubert Léonard", nationality: "Belgian", period: "Romantic",
    title: "24 Études classiques (in the style of various composers)",
    difficulty: [6, 8],
    description: "Léonard composed these 24 études in the stylistic idiom of various composers and periods—studies 'in the style of' Corelli, Bach, Handel, Tartini, etc. This unique approach develops both technique and historical style awareness simultaneously. Léonard was Vieuxtemps's successor at the Brussels Conservatory and a central figure in the Franco-Belgian school.",
    skills: "Style awareness across periods; varied technique; historical performance practice; musical breadth.",
    editions: "G. Schirmer; International Music Company.",
    imslp: "https://imslp.org/wiki/24_%C3%89tudes_classiques_(L%C3%A9onard%2C_Hubert)"
  },
  {
    id: "locatelli", category: "Etudes & Caprices", composer: "Pietro Locatelli", nationality: "Italian", period: "Baroque",
    title: "24 Caprices (from L'Arte del Violino, Op. 3, 1733)",
    difficulty: [8, 10],
    description: "Locatelli's twelve concerti of L'Arte del Violino each contain extended solo cadenzas that function as self-contained caprices—the 24 capriccios that are the earliest virtuoso études in the violin literature, predating Paganini by nearly a century. They demand extreme position work (Locatelli routinely ventures beyond the 12th position), rapid passage work, double stops, and bariolage. Locatelli was a student of Corelli who pushed the instrument far beyond his teacher's boundaries. These caprices are increasingly performed and recorded as the historical-performance movement has brought attention to pre-Paganini virtuosity. They are indispensable for understanding the origins of violin virtuosity.",
    skills: "Extreme high-position work; pre-Paganini virtuosity; Baroque passage work; double stops; bariolage; historical virtuoso technique.",
    editions: "Schott, ed. Arend Koole (critical edition from the complete works); Peters; Ricordi; IMSLP (historical editions).",
    imslp: "https://imslp.org/wiki/L%27arte_del_violino%2C_Op.3_(Locatelli%2C_Pietro_Antonio)"
  },
  {
    id: "campagnoli-op18", category: "Etudes & Caprices", composer: "Bartolomeo Campagnoli", nationality: "Italian", period: "Classical",
    title: "7 Divertimenti for Solo Violin, Op. 18",
    difficulty: [6, 8],
    description: "Campagnoli's seven Divertimenti are substantial multi-movement works for solo violin that function as advanced études. Each Divertimento explores different techniques—double stops, arpeggios, passage work in high positions, polyphonic writing—within a musically satisfying framework. They bridge the gap between the Classical solo violin tradition (Telemann, Bach) and the Romantic era. More demanding than Rode and less extreme than Paganini, they occupy an important but often overlooked position in the étude literature.",
    skills: "Solo violin polyphony; double stops; advanced position work; Classical-era solo technique; multi-movement étude form.",
    editions: "Peters; International Music Company; Suvini Zerboni; IMSLP.",
    imslp: "https://imslp.org/wiki/7_Divertimenti%2C_Op.18_(Campagnoli%2C_Bartolomeo)"
  },
  {
    id: "dancla-op73", category: "Etudes & Caprices", composer: "Charles Dancla", nationality: "French", period: "Romantic",
    title: "20 Études brillantes et caractéristiques, Op. 73",
    difficulty: [5, 7],
    description: "More demanding than Dancla's Op. 84, these twenty études develop concert-style technique with the elegance characteristic of the Paris Conservatoire school. Each étude has a distinct musical character—hence 'caractéristiques'—ranging from lyrical cantabile to brilliant passage work. They serve as excellent preparation for the more demanding études of Dont Op. 35 and the Franco-Belgian concert étude tradition. Dancla's melodic gift makes these studies genuinely pleasant to practice.",
    skills: "Concert-style technique; French school elegance; varied musical character; intermediate-to-advanced bowing and left-hand development.",
    editions: "G. Schirmer; International Music Company; Peters.",
    imslp: "https://imslp.org/wiki/20_%C3%89tudes_brillantes_et_caract%C3%A9ristiques%2C_Op.73_(Dancla%2C_Charles)"
  },
  {
    id: "dancla-op84", category: "Etudes & Caprices", composer: "Charles Dancla", nationality: "French", period: "Romantic",
    title: "36 Études mélodiques et faciles, Op. 84",
    difficulty: [3, 5],
    description: "Dancla's most popular étude collection: thirty-six melodically appealing studies that develop intermediate technique within a musically satisfying French school framework. They cover shifting through fifth position, varied bowings, and moderate double stops. Often assigned alongside Mazas as alternative or supplementary material, they are distinguished by their genuine melodic charm—students tend to enjoy practicing them.",
    skills: "Melodic playing; French school style; intermediate bowings; shifting through 5th position; basic double stops; musicality.",
    editions: "G. Schirmer; International Music Company; Peters; Lemoine (original French).",
    imslp: "https://imslp.org/wiki/36_%C3%89tudes_m%C3%A9lodiques_et_tr%C3%A8s_faciles%2C_Op.84_(Dancla%2C_Charles)"
  },
  {
    id: "wieniawski-op18", category: "Etudes & Caprices", composer: "Henryk Wieniawski", nationality: "Polish", period: "Romantic",
    title: "Études-Caprices, Op. 18 (for Two Violins)",
    difficulty: [7, 9],
    description: "Wieniawski's eight Études-Caprices for two violins are unique in the étude literature: virtuoso concert studies with an accompanying second violin part. The first violin part is as demanding as Op. 10, but the duo format adds ensemble dimension and harmonic context that makes the studies both more musical and more challenging (intonation must be precise against the second violin). They are performed both as études and as concert pieces, and they develop virtuoso ensemble skills rarely addressed elsewhere.",
    skills: "Virtuoso duo technique; ensemble intonation; concert-level passage work alongside another player; bravura style in chamber context.",
    editions: "Polskie Wydawnictwo Muzyczne (PWM, Polish critical edition); International Music Company; Peters.",
    imslp: "https://imslp.org/wiki/%C3%89tudes-Caprices%2C_Op.18_(Wieniawski%2C_Henryk)"
  },
  {
    id: "alard-etudes", category: "Etudes & Caprices", composer: "Jean-Delphin Alard", nationality: "French", period: "Romantic",
    title: "24 Études-Caprices, Op. 41",
    difficulty: [7, 9],
    description: "Alard's 24 Études-Caprices are substantial, virtuosic concert études that deserve far wider recognition. Each is dedicated to exploring a specific advanced technique—rapid arpeggios, double-stop trills, staccato, harmonics, spiccato at speed—within a musically compelling form. Alard was Sarasate's teacher at the Paris Conservatoire, and these études reflect the bravura tradition that Sarasate would carry to its apex. They occupy similar territory to Dont Op. 35 and Wieniawski Op. 10 but with a distinctly French character.",
    skills: "Advanced virtuoso technique; French school bravura; double-stop trills; harmonics; staccato; concert-level études.",
    editions: "Schott (original); available on IMSLP.",
    imslp: "https://imslp.org/wiki/24_%C3%89tudes-Caprices%2C_Op.41_(Alard%2C_Jean-Delphin)"
  },
  {
    id: "rovelli", category: "Etudes & Caprices", composer: "Pietro Rovelli", nationality: "Italian", period: "Classical/Romantic",
    title: "12 Caprices for Solo Violin, Op. 3 & Op. 5",
    difficulty: [7, 9],
    description: "Rovelli's caprices are ambitious solo violin works that occupy the territory between Rode and Paganini. They demand advanced position work, double stops, and considerable musical sophistication. Less well known than the major étude collections, they provide valuable supplementary material for advanced students seeking to expand their caprice repertoire beyond the standard Kreutzer–Rode–Paganini progression. Rovelli was concertmaster in Munich and a respected performer of his era.",
    skills: "Advanced solo violin technique; double stops; high-position work; pre-Paganini virtuosity; musical substance.",
    editions: "Peters; Ricordi; IMSLP.",
    imslp: "https://imslp.org/wiki/12_Caprices%2C_Op.3_(Rovelli%2C_Pietro)"
  },
  {
    id: "sauret", category: "Etudes & Caprices", composer: "Émile Sauret", nationality: "French", period: "Late Romantic",
    title: "24 Études-Caprices, Op. 64",
    difficulty: [9, 10],
    description: "Sauret's 24 Études-Caprices are among the most technically demanding études ever written, rivaling Paganini in difficulty while being more consistently musical. Sauret was one of the supreme virtuosos of the late 19th century, and these études exploit every extreme of the instrument: wide stretches, rapid passage work in the highest positions, elaborate double stops, left-hand pizzicato combined with bowing, and harmonics. They have been championed in recent years by virtuosos seeking repertoire beyond the standard Paganini Caprices. Each is a substantial concert piece in its own right.",
    skills: "Extreme virtuoso technique; every advanced device; concert-level études; extends beyond Paganini in some technical domains.",
    editions: "Simrock (original); available on IMSLP; some modern reprints.",
    imslp: "https://imslp.org/wiki/24_%C3%89tudes-caprices%2C_Op.64_(Sauret%2C_%C3%89mile)"
  },
  {
    id: "hermann-studies", category: "Etudes & Caprices", composer: "Friedrich Hermann", nationality: "German", period: "Romantic",
    title: "6 Concert Studies, Op. 18",
    difficulty: [7, 8],
    description: "Hermann's six concert studies are effective, well-crafted advanced études in the German tradition. Each addresses a specific technique—sustained legato, staccato, double stops, arpeggiation—with solid musical content. Hermann was concertmaster in Leipzig and a colleague of Ferdinand David. While less celebrated than the Franco-Belgian concert études, they provide excellent material for developing German school technique.",
    skills: "German school concert études; specific technical focus per study; advanced bowing and left-hand technique.",
    editions: "Peters; International Music Company."
  },
  {
    id: "dont-op38", category: "Etudes & Caprices", composer: "Jakob Dont", nationality: "Austrian", period: "Romantic",
    title: "Gradus ad Parnassum, Op. 38 (Progressive Studies)",
    difficulty: [4, 6],
    description: "Often overshadowed by Dont's more famous Op. 35 and Op. 37, the Gradus ad Parnassum fills the important gap between those two collections. The progressive studies develop intermediate-to-advanced technique systematically, with particular attention to bowing variety, position work, and musical phrasing. They serve as an excellent bridge from Op. 37 toward Op. 35 and can be used alongside Mazas and early Kreutzer studies.",
    skills: "Progressive intermediate technique; bowing variety; position work; musical phrasing; bridge between Op. 37 and Op. 35.",
    editions: "Peters; International Music Company.",
    imslp: "https://imslp.org/wiki/Gradus_ad_Parnassum%2C_Op.38_(Dont%2C_Jakob)"
  },
  {
    id: "ysaye-preludes", category: "Etudes & Caprices", composer: "Eugène Ysaÿe", nationality: "Belgian", period: "Modern",
    title: "10 Préludes for Solo Violin, Op. 35 (posthumous, c. 1928–29)",
    difficulty: [8, 9],
    description: "Less well known than the six Solo Sonatas but of comparable quality, Ysaÿe's ten Préludes are concentrated miniatures for unaccompanied violin. Each explores a specific technical or expressive idea—harmonics, double stops, muted playing, rhythmic patterns—within a compressed format. They function both as concert pieces and as advanced études. Published posthumously and only widely available since the late 20th century, they are increasingly programmed by adventurous violinists.",
    skills: "Advanced solo violin technique; concentrated expression; specific technical focus per prélude; modern solo violin idiom.",
    editions: "Schott; Henle Verlag."
  },
  {
    id: "spohr-student-concerti", category: "Concerti", composer: "Louis Spohr", nationality: "German", period: "Romantic",
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
    id: "geminiani-treatise", category: "Treatises", subcategory: "Baroque & Classical Treatises", composer: "Francesco Geminiani", nationality: "Italian", period: "Baroque",
    title: "The Art of Playing on the Violin, Op. 9 (1751)",
    difficulty: [1, 10],
    description: "The first comprehensive treatise on violin playing. Published in London, it covers all aspects of technique known in the mid-18th century: bowing, ornaments, position work, and musical expression. Geminiani's treatise is remarkable for its insistence on expressive playing and its detailed instructions on ornamentation, dynamics, and the 'good taste' essential to Baroque performance. It includes example exercises and pieces. Essential reading for anyone interested in historical performance practice and the foundations of violin pedagogy.",
    skills: "Historical performance practice; Baroque technique and ornamentation; understanding of 18th-century musical aesthetics.",
    editions: "Oxford University Press, ed. David Boyden (critical modern edition with commentary); facsimile editions available from Early Music sources; Dover reprint."
  },
  {
    id: "mozart-treatise", category: "Treatises", subcategory: "Baroque & Classical Treatises", composer: "Leopold Mozart", nationality: "Austrian", period: "Classical",
    title: "Versuch einer gründlichen Violinschule (A Treatise on the Fundamental Principles of Violin Playing, 1756)",
    difficulty: [1, 10],
    description: "Published the same year as his son Wolfgang's birth, Leopold Mozart's treatise is the most important 18th-century German-language source on violin playing. It covers holding the instrument, bowing, ornaments, position work, and musical taste. Mozart's prose is clear, witty, and opinionated. The treatise provides invaluable insight into Classical-era performance practice: articulation, bowings, dynamics, and the expectations for 'good taste' in execution. Required reading for performers and scholars of 18th-century music.",
    skills: "Classical-era performance practice; historical bowing and articulation; ornamental style; philosophical approach to musicianship.",
    editions: "Oxford University Press, trans. Editha Knocker (standard English translation with scholarly commentary); Bärenreiter (German critical edition); facsimile of the 1756 first edition available."
  },
  {
    id: "joachim-moser", category: "Traditional Violin Schools", composer: "Joseph Joachim & Andreas Moser", nationality: "Hungarian-German", period: "Late Romantic",
    title: "Violinschule (Violin School, 3 vols., 1902–05)",
    difficulty: [1, 10],
    description: "The three-volume method by the greatest violinist of the late 19th century and his teaching assistant. Volume 1 covers basic technique; Volume 2 presents advanced technique and musical interpretation; Volume 3 is an anthology of études and pieces with Joachim's own fingerings and bowings. This method documents the performing tradition of Brahms's circle and the German Classical school. Joachim's approach to phrasing, bowing, and musical interpretation provides essential insight into the performance practice of Romantic music.",
    skills: "Late-Romantic performance practice; Brahms/German school interpretation; comprehensive technique; musical philosophy of the Joachim tradition.",
    editions: "Simrock (original German edition, 3 volumes); English translation published by N. Simrock; Dover reprints of portions."
  },
  {
    id: "auer-treatise", category: "Treatises", subcategory: "Modern Pedagogy", composer: "Leopold Auer", nationality: "Hungarian-American", period: "Early 20th Century",
    title: "Violin Playing as I Teach It (1921); Violin Masterworks and Their Interpretation (1925)",
    difficulty: [1, 10],
    description: "'Violin Playing as I Teach It' is a concise, practical guide to Auer's approach: the teacher who produced Heifetz, Milstein, Elman, Zimbalist, Seidel, and others. Auer covers holding the instrument, bowing, left-hand technique, vibrato, practice methods, and stage deportment. His style is direct and opinionated. 'Violin Masterworks and Their Interpretation' discusses the major concerti and sonatas with interpretive guidance. While not as comprehensive as Flesch's 'Art of Violin Playing,' Auer's writing offers unique insight into the Russian school's aesthetic priorities: tone quality, musical expression above all, and the primacy of singing on the instrument.",
    skills: "Russian school principles; interpretive philosophy; practice methodology; tone production priorities; performance preparation.",
    editions: "Dover (reprint of both books, widely available and affordable); Frederick Stokes (original publisher)."
  },
  {
    id: "flesch-art", category: "Treatises", subcategory: "Modern Pedagogy", composer: "Carl Flesch", nationality: "Hungarian", period: "20th Century",
    title: "The Art of Violin Playing (Die Kunst des Violinspiels, 2 vols., 1923–28)",
    difficulty: [1, 10],
    description: "The most comprehensive and analytically rigorous treatise on violin playing ever written. Volume 1 covers technique exhaustively: every aspect of right-arm and left-hand mechanics, tone production, shifting, vibrato, double stops, bowing, and fingering principles. Volume 2 addresses interpretation: phrasing, dynamics, rubato, program building, teaching, stage fright, and the psychology of performance. Flesch's analytical mind dissected every element of violin technique with unprecedented clarity. His influence on 20th-century violin pedagogy is incalculable. Essential reading for every serious violinist and teacher.",
    skills: "Comprehensive technical analysis; interpretive principles; teaching methodology; practice philosophy; performance psychology; historical perspective.",
    editions: "Carl Fischer (English translation by Eric Rosenblith, 2 volumes); Ries & Erler (German original); Max Rostal's annotated edition includes additional commentary from Flesch's most distinguished student."
  },
  {
    id: "flesch-memoirs", category: "Treatises", subcategory: "Modern Pedagogy", composer: "Carl Flesch", nationality: "Hungarian", period: "20th Century",
    title: "Memoirs (1957, posthumous); The Memoirs of Carl Flesch",
    difficulty: [1, 10],
    description: "Flesch's autobiography, published posthumously, provides fascinating insights into the violin world of the late 19th and early 20th centuries. His candid assessments of contemporaries (Ysaÿe, Kreisler, Heifetz, etc.) are legendary. While not a pedagogical text per se, the memoirs illuminate the aesthetic and technical values of a golden age of violin playing.",
    skills: "Historical perspective; aesthetic values; understanding of violin traditions and schools.",
    editions: "Rockliff (original English edition); Da Capo Press (reprint); Bois de Boulogne (expanded German edition)."
  },
  {
    id: "galamian-principles", category: "Treatises", subcategory: "Modern Pedagogy", composer: "Ivan Galamian", nationality: "Armenian-American", period: "20th Century",
    title: "Principles of Violin Playing and Teaching (1962)",
    difficulty: [1, 10],
    description: "The most influential American treatise on violin pedagogy. Galamian's 'Principles' presents a systematic, analytical approach to every aspect of technique, organized around the concept of coordination between the two hands. His treatment of bowing mechanics (the 'spring' concept), shifting, vibrato, and practice methodology remains definitive. Less discursive than Flesch but arguably more systematic and practical. Galamian taught at Curtis and Juilliard and produced Perlman, Zukerman, Chung, Laredo, Steinhardt, and dozens of other leading violinists.",
    skills: "Systematic technical analysis; coordination principles; bowing mechanics; practice methodology; teaching philosophy.",
    editions: "Prentice-Hall / Simon & Schuster (original); Shar Products (reprint, widely available)."
  },
  {
    id: "fischer-treatise", category: "Treatises", subcategory: "Modern Pedagogy", composer: "Simon Fischer", nationality: "British", period: "21st Century",
    title: "The Violin Lesson (2012)",
    difficulty: [1, 10],
    description: "Fischer's collected essays and teaching articles from The Strad magazine, organized thematically. Covers technique, interpretation, practice, and performance in Fischer's characteristically detailed and practical style. Each chapter reads as a self-contained lesson on a specific topic—vibrato, intonation, bow technique, shifting—with concrete exercises and photographic illustrations. Together with 'Basics' and 'Practice,' this forms a comprehensive modern pedagogical library.",
    skills: "Broad technical and interpretive topics; practical solutions to common problems; modern pedagogy.",
    editions: "Edition Peters."
  },
  {
    id: "yankelevich-treatise", category: "Treatises", subcategory: "Modern Pedagogy", composer: "Yuri Yankelevich", nationality: "Russian", period: "20th Century",
    title: "Pedagogical Heritage (various writings, ed. by students)",
    difficulty: [1, 10],
    description: "Yankelevich was one of the greatest pedagogues of the Soviet school, teaching at the Moscow Conservatory and producing Tretyakov, Spivakov, Kogan (Leonid's students), and many others. His writings on position changes, vibrato, and the biomechanics of violin playing offer insights from the Soviet school's rigorous analytical tradition. Published primarily in Russian with some translations.",
    skills: "Soviet school pedagogy; biomechanical approach to technique; shifting and vibrato analysis.",
    editions: "Various Russian-language publications; some English translations in journal articles and collected volumes."
  },
  {
    id: "havas", category: "Treatises", subcategory: "Modern Pedagogy", composer: "Kató Havas", nationality: "Hungarian-British", period: "20th Century",
    title: "A New Approach to Violin Playing (1961); Stage Fright: Its Causes and Cures (1973)",
    difficulty: [1, 10],
    description: "Havas's 'New Approach' addresses the physical and psychological sources of tension in violin playing, offering exercises for developing freedom of movement and a natural technique. Her work on stage fright is one of the earliest serious treatments of performance anxiety in the string literature. While controversial among some traditional pedagogues, her insights into tension release and the mind-body connection have influenced many teachers.",
    skills: "Tension release; freedom of movement; performance anxiety management; psychological approach to technique.",
    editions: "Bosworth (both books)."
  },
  {
    id: "menuhin-lessons", category: "Treatises", subcategory: "Modern Pedagogy", composer: "Yehudi Menuhin", nationality: "American", period: "20th Century",
    title: "Violin: Six Lessons with Yehudi Menuhin (1971)",
    difficulty: [1, 10],
    description: "Based on Menuhin's BBC television series, this book presents his philosophically rich approach to violin playing. Menuhin discusses posture, bowing, and technique through the lens of yoga, Alexander Technique, and holistic body awareness. His emphasis on naturalness, balance, and the integration of body and mind offers a valuable complement to more analytically oriented treatises. Illustrated with photographs and diagrams.",
    skills: "Holistic approach to technique; body awareness; yoga and Alexander Technique integration; philosophical perspective on playing.",
    editions: "Faber and Faber (original); numerous reprints."
  },
  {
    id: "stowell-cambridge", category: "Treatises", subcategory: "Historical & Scholarly", composer: "Robin Stowell (ed.)", nationality: "British", period: "21st Century",
    title: "The Cambridge Companion to the Violin (1992); Violin Technique and Performance Practice in the 18th and 19th Centuries (1985)",
    difficulty: [1, 10],
    description: "Stowell's two books are essential scholarly references. 'The Cambridge Companion' is a multi-author survey covering the violin's history, repertoire, pedagogy, and performance practice. 'Violin Technique and Performance Practice' is a detailed study of historical performance, drawing on treatises from Geminiani through Joachim. Both are invaluable for understanding the evolution of violin playing and interpreting music from different periods.",
    skills: "Historical knowledge; performance practice across periods; scholarly perspective; pedagogical context.",
    editions: "Cambridge University Press."
  },
  {
    id: "boyden", category: "Treatises", subcategory: "Historical & Scholarly", composer: "David Boyden", nationality: "American", period: "20th Century",
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
    id: "violinmasterclass", category: "Online Resources", composer: "Kurt Sassmannshaus", nationality: "German-American", period: "21st Century",
    title: "ViolinMasterclass.com (now largely archived)",
    difficulty: [1, 10],
    description: "Professor Kurt Sassmannshaus's landmark website, produced at the Cincinnati College-Conservatory of Music. Features hundreds of video lessons covering technique from beginner through professional level, performed and demonstrated by Sassmannshaus and his students. Topics include scales, études (with demonstrations of Kreutzer, Rode, Dont, and Paganini caprices), shifting, vibrato, bow technique, and masterclass-style coaching on concerto repertoire. Though the full site is no longer actively maintained, much of the content remains available through archived versions and YouTube. This was one of the first and most comprehensive free online violin pedagogical resources.",
    skills: "Visual demonstration of all technical elements; masterclass-style coaching; étude performance models; comprehensive free resource.",
    editions: "Free (web archive and YouTube channel: violinmasterclass)."
  },
  {
    id: "tonebase", category: "Online Resources", composer: "Various Artists", nationality: "International", period: "21st Century",
    title: "Tonebase Violin",
    difficulty: [3, 10],
    description: "A premium subscription platform featuring video lessons from leading performers and pedagogues including Hilary Hahn, Augustin Hadelich, Ray Chen, Itzhak Perlman, Pamela Frank, Midori, James Ehnes, and dozens more. Content includes technique masterclasses, repertoire deep-dives, practice methodology, performance psychology, and career development. The production quality is high and the roster of teachers is extraordinary. Lessons range from intermediate technique to the most advanced repertoire. Community features include forums and practice challenges.",
    skills: "Repertoire coaching from world-class artists; technique masterclasses; practice methodology; performance preparation; career guidance.",
    editions: "Subscription platform (tonebase.co). Free tier available with limited content."
  },
  {
    id: "perlman-youtube", category: "Online Resources", composer: "Itzhak Perlman", nationality: "Israeli-American", period: "21st Century",
    title: "Itzhak Perlman YouTube Masterclasses & Tohu Media",
    difficulty: [5, 10],
    description: "Perlman's YouTube presence includes excerpts from his masterclasses at the Perlman Music Program and Juilliard. His coaching emphasizes musical expression, phrasing, and the art of storytelling through the instrument. His warmth, humor, and directness make complex musical ideas accessible. His Tohu Media project has produced additional educational content. Separately, many full Perlman masterclasses from festivals (Verbier, Aspen, etc.) are available on YouTube.",
    skills: "Musical interpretation; phrasing; tonal concept; stage presence; communicating through music.",
    editions: "Free (YouTube: various channels including Perlman Music Program, Tohu, and festival recordings)."
  },
  {
    id: "heifetz-masterclass", category: "Online Resources", composer: "Jascha Heifetz", nationality: "Russian-American", period: "20th Century",
    title: "Heifetz Master Class Videos (USC, 1962–72)",
    difficulty: [7, 10],
    description: "Historic filmed masterclasses from Heifetz's teaching years at USC. These are the only extensive recordings of the greatest violinist of the 20th century in a pedagogical setting. Heifetz's terse, demanding, and often witty teaching style reveals his priorities: intonation, rhythm, tone quality, and musical conviction. Available through various archival sources and YouTube. Essential viewing for any serious student.",
    skills: "Heifetz's approach to intonation, rhythm, and tone; historical performance practice; interpretive standards of the highest caliber.",
    editions: "Historical recordings (available on YouTube and through USC archives)."
  },
  {
    id: "delay-videos", category: "Online Resources", composer: "Dorothy DeLay", nationality: "American", period: "20th Century",
    title: "Dorothy DeLay Teaching Videos & Documentary ('Teaching Genius')",
    difficulty: [3, 10],
    description: "Video recordings of DeLay's Juilliard masterclasses and the documentary 'Teaching Genius' provide insight into the methods of one of the most successful violin teachers in history (students include Perlman, Chung, Midori, Sarah Chang, Gil Shaham, Hahn, Nadja Salerno-Sonnenberg). DeLay's Socratic teaching style—asking students questions rather than giving directives—and her emphasis on psychological support alongside technical development are illuminating.",
    skills: "Pedagogical methodology; Socratic teaching approach; psychological aspects of teaching; interpretive coaching.",
    editions: "Various archival sources; YouTube; 'Teaching Genius' book by Barbara Lourie Sand (Amadeus Press)."
  },
  {
    id: "vengerov-lessons", category: "Online Resources", composer: "Maxim Vengerov", nationality: "Russian-Israeli", period: "21st Century",
    title: "Maxim Vengerov YouTube Masterclasses & Online Teaching",
    difficulty: [5, 10],
    description: "Vengerov has been generous with online educational content, including full masterclasses, technique demonstrations, and practice tips. His combination of extraordinary virtuosity and articulate explanation makes him one of the most effective communicators among active soloists. His masterclass videos on YouTube, particularly those from the Verbier Festival and Menuhin Competition, are widely viewed and highly regarded.",
    skills: "Virtuoso technique demonstration; Russian school principles; interpretive intensity; practice approaches.",
    editions: "Free (YouTube: various channels including Verbier Festival, Menuhin Competition)."
  },
  {
    id: "eddy-brett", category: "Online Resources", composer: "Eddy Chen & Brett Yang (TwoSet Violin)", nationality: "Australian", period: "21st Century",
    title: "TwoSet Violin (YouTube)",
    difficulty: [1, 10],
    description: "While primarily an entertainment and comedy channel, TwoSet Violin's enormous global reach has made classical violin accessible to millions. Their content includes instrument reviews, practice challenges, reactions to other musicians, and occasional pedagogical content. Their Ling Ling workout challenges and practice advocacy have genuinely motivated many young players. Their approach, combining humor with genuine musicianship, represents a significant cultural phenomenon in classical music outreach.",
    skills: "Classical music outreach and motivation; community building; practice motivation; general musical culture.",
    editions: "Free (YouTube: TwoSetViolin)."
  },
  {
    id: "professor-v", category: "Online Resources", composer: "Various", nationality: "International", period: "21st Century",
    title: "YouTube Educational Channels (ProfessorV, Violin Tutor Pro, Violin Lab, etc.)",
    difficulty: [1, 7],
    description: "A growing ecosystem of violin-focused YouTube channels provides free educational content covering beginner through advanced topics. ProfessorV (Zlata Brouwer) offers detailed technical tutorials. Violin Tutor Pro provides structured online courses. Violin Lab Channel focuses on adult beginners. These channels, while varying in quality, collectively represent an unprecedented democratization of violin pedagogy.",
    skills: "Varied technical topics; accessible instruction; visual demonstration; practice guidance.",
    editions: "Free (YouTube)."
  },
  {
    id: "imslp", category: "Online Resources", composer: "Community", nationality: "International", period: "21st Century",
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
    id: "bach-sp", category: "Solo Repertoire", composer: "Johann Sebastian Bach", nationality: "German", period: "Baroque",
    title: "Sonatas and Partitas for Solo Violin, BWV 1001–1006 (c. 1720)",
    difficulty: [7, 10],
    description: "The cornerstone of the solo violin repertoire. Three Sonatas (G minor, A minor, C major) with fugal movements of extraordinary contrapuntal complexity; three Partitas (B minor, D minor, E major) are dance suites. The Chaconne from Partita No. 2 is universally regarded as one of the greatest single movements in Western music. Demands sustained polyphonic writing, chordal passages, full fingerboard command, absolute intonation security, and endurance.",
    skills: "Polyphonic playing; chords and double stops; full fingerboard; Baroque articulation; structural awareness; spiritual depth.",
    editions: "Bärenreiter (Urtext), ed. Peter Wollny — the standard scholarly edition based on Bach's 1720 autograph; Henle Verlag (Urtext), ed. Klaus Rönnau, fingerings by Wolfgang Schneiderhan — excellent Urtext with tasteful fingerings; Henle Verlag, fingerings by Hilary Hahn — recent edition with Hahn's personal fingerings; Peters, ed. Joseph Joachim & Andreas Moser — historic edition reflecting the great Joachim tradition; International Music Company, ed. Ivan Galamian — practical performing edition with Galamian's signature fingerings; Wiener Urtext, ed. Bettina Schwemer, fingerings by Gidon Kremer — scholarly text with Kremer's unconventional fingerings; Facsimile of the autograph (Bärenreiter) — reproduction of Bach's beautifully calligraphed manuscript; Breitkopf & Härtel, ed. Eduard Herrmann — older German scholarly edition; Schott, ed. Max Rostal — Flesch-school fingerings.",
    imslp: "https://imslp.org/wiki/6_Sonatas_and_Partitas_for_Violin_Solo%2C_BWV_1001-1006_(Bach%2C_Johann_Sebastian)"
  },
  {
    id: "telemann-fantasias", category: "Solo Repertoire", composer: "Georg Philipp Telemann", nationality: "German", period: "Baroque",
    title: "12 Fantasias for Solo Violin, TWV 40:14–25",
    difficulty: [5, 7],
    description: "Charming, idiomatic works more approachable than Bach. Mix of dance movements, fugal passages, and free improvisatory sections. Excellent preparation for Bach's solo works.",
    skills: "Baroque dance character; lightness and wit; contrapuntal awareness; ornamental style.",
    editions: "Bärenreiter (Urtext); Henle Verlag (Urtext); International Music Company.",
    imslp: "https://imslp.org/wiki/12_Fantasias_for_Violin_without_Bass%2C_TWV_40:14-25_(Telemann%2C_Georg_Philipp)"
  },
  {
    id: "ysaye-solo", category: "Solo Repertoire", composer: "Eugène Ysaÿe", nationality: "Belgian", period: "Modern",
    title: "Six Sonatas for Solo Violin, Op. 27 (1923–24)",
    difficulty: [9, 10],
    description: "The most important solo violin works of the early 20th century. Each dedicated to a contemporary violinist: No. 1 to Szigeti, No. 2 to Thibaud ('Obsession'), No. 3 to Enescu ('Ballade'), No. 4 to Kreisler, No. 5 to Crickboom, No. 6 to Quiróga. Demand complete mastery with emphasis on polyphonic playing, sustained intensity, and tonal imagination.",
    skills: "Polyphonic mastery; Bach tradition; Romantic bravura; sustained musical intensity; tonal imagination.",
    editions: "Henle Verlag (Urtext), ed. Norbert Gertsch — the best available scholarly edition with critical commentary; G. Schirmer — traditional American edition, widely available; Schott (original publisher) — historical edition; International Music Company — practical performing edition; Durand — French alternative.",
    imslp: "https://imslp.org/wiki/6_Sonatas_for_Solo_Violin%2C_Op.27_(Ysa%C3%BFe%2C_Eug%C3%A8ne)"
  },
  {
    id: "bartok-solo", category: "Solo Repertoire", composer: "Béla Bartók", nationality: "Hungarian", period: "Modern",
    title: "Sonata for Solo Violin, Sz. 117 (1944)",
    difficulty: [9, 10],
    description: "Written for Menuhin, the most significant solo violin work since Ysaÿe. Demands command of all Bachian polyphonic techniques plus modernist pitch vocabulary, quarter-tones, and rhythmic complexity.",
    skills: "Polyphonic command; quarter-tones; folk-music inflections; rhythmic complexity; modernist pitch language.",
    editions: "Boosey & Hawkes (original), ed. Menuhin; Henle Verlag (Urtext) with facsimile of autograph."
  },

  // SONATAS
  {
    id: "corelli-op5", category: "Solo Repertoire", composer: "Arcangelo Corelli", nationality: "Italian", period: "Baroque",
    title: "12 Sonatas for Violin and Continuo, Op. 5",
    difficulty: [4, 6],
    description: "Foundational Baroque sonatas. Nos. 1–6 are sonata da chiesa; Nos. 7–11 are sonata da camera; No. 12 is the famous 'La Folia' variations. Technical demands include sustained cantabile, moderate passage work, ornamental fluency, and continuo ensemble sensitivity.",
    skills: "Noble expression; improvised ornamentation; Baroque rhetorical style; continuo dialogue.",
    editions: "Bärenreiter (Urtext); Peters, ed. Joachim & Chrysander; Henle Verlag (Urtext).",
    imslp: "https://imslp.org/wiki/12_Violin_Sonatas%2C_Op.5_(Corelli%2C_Arcangelo)"
  },
  {
    id: "mozart-sonatas", category: "Solo Repertoire", composer: "Wolfgang Amadeus Mozart", nationality: "Austrian", period: "Classical",
    title: "Sonatas for Violin and Piano, K. 301–547",
    difficulty: [5, 8],
    description: "Mozart's violin sonatas evolved dramatically across his career. The great mature sonatas—K. 376, 377, 378, 379, 380, 454, 481, 526—are masterpieces of Classical chamber music. K. 454 and K. 526 are the most demanding.",
    skills: "Classical phrasing; equal-partnership ensemble playing; operatic vocal quality; subtlety of dynamics; humor and pathos.",
    editions: "Bärenreiter (Urtext, Neue Mozart-Ausgabe); Henle Verlag (Urtext); Peters (Urtext); International Music Company, ed. Francescatti.",
    imslp: "https://imslp.org/wiki/Category:Mozart%2C_Wolfgang_Amadeus"
  },
  {
    id: "beethoven-sonatas", category: "Solo Repertoire", composer: "Ludwig van Beethoven", nationality: "German", period: "Classical/Romantic",
    title: "10 Sonatas for Violin and Piano, Op. 12, 23, 24, 30, 47, 96",
    difficulty: [6, 9],
    description: "Span Beethoven's creative evolution. The 'Spring' Sonata (Op. 24) and 'Kreutzer' Sonata (Op. 47) are best known. The Kreutzer is monumental, demanding virtuoso technique. Op. 96 is a transcendent late work of utmost subtlety.",
    skills: "Dramatic range; true piano partnership; Beethoven's structural logic; rhythmic drive; sforzando control.",
    editions: "Henle Verlag (Urtext), ed. Clive Brown — outstanding scholarly edition with comprehensive commentary, the current gold standard; Bärenreiter (Urtext), ed. Jonathan Del Mar — excellent Urtext based on meticulous source study; Peters (Urtext), ed. Max Rostal — Flesch-school fingerings and interpretive suggestions of great pedagogical value; International Music Company, ed. David Oistrakh — bowings and fingerings from the great Soviet violinist; Wiener Urtext — reliable scholarly option; Breitkopf & Härtel (Urtext) — from the Beethoven complete works.",
    imslp: "https://imslp.org/wiki/Category:Beethoven%2C_Ludwig_van"
  },
  {
    id: "brahms-sonatas", category: "Solo Repertoire", composer: "Johannes Brahms", nationality: "German", period: "Romantic",
    title: "3 Sonatas for Violin and Piano, Opp. 78, 100, 108",
    difficulty: [7, 9],
    description: "Pillars of the Romantic duo-sonata literature. Op. 78 ('Rain Sonata') is autumnal; Op. 100 ('Thun') is sunny; Op. 108 in D minor is dramatic and technically demanding. All require rich tone, sophisticated double-stop voicing, and mature ensemble skills.",
    skills: "Warmth and depth of tone; Brahmsian rhythmic complexity; long-range phrasing; motivic development; intimate dialogue.",
    editions: "Henle Verlag (Urtext), ed. Clive Brown — definitive Urtext with comprehensive commentary; Bärenreiter (Urtext) — excellent scholarly alternative; Peters (Urtext) — reliable standard; Wiener Urtext, ed. Schneiderhan — fingerings by the distinguished Austrian violinist; International Music Company, ed. Szymon Goldberg — Goldberg's insightful edition; Simrock (original publisher) — historical first editions.",
    imslp: "https://imslp.org/wiki/Violin_Sonata_No.1%2C_Op.78_(Brahms%2C_Johannes)"
  },
  {
    id: "franck-sonata", category: "Solo Repertoire", composer: "César Franck", nationality: "Belgian-French", period: "Romantic",
    title: "Sonata in A major for Violin and Piano (1886)",
    difficulty: [8, 8],
    description: "One of the most beloved duo works. Cyclic form unifying all four movements. The finale is a luminous canon of extraordinary beauty. Demands sustained lyrical playing, broad dynamic range, and cyclic awareness.",
    skills: "Cyclic awareness; sustained mood; partnership with piano; French Romantic lyricism; spiritual intensity.",
    editions: "Henle Verlag (Urtext); Bärenreiter; Durand (original publisher); Peters.",
    imslp: "https://imslp.org/wiki/Violin_Sonata_(Franck%2C_C%C3%A9sar)"
  },
  {
    id: "prokofiev-sonatas", category: "Solo Repertoire", composer: "Sergei Prokofiev", nationality: "Russian", period: "Modern",
    title: "2 Sonatas for Violin and Piano, Opp. 80 & 94a",
    difficulty: [8, 9],
    description: "Sonata No. 1 in F minor is a dark, powerful wartime masterpiece—one of the greatest 20th-century violin sonatas. No. 2 in D major (from the Flute Sonata, arr. with Oistrakh) is lighter and more classical.",
    skills: "Op. 80: vast emotional range; sustained intensity; Russian dramatic tradition. Op. 94a: neoclassical wit; charm; transparency.",
    editions: "International Music Company, ed. David Oistrakh (Op. 80); Boosey & Hawkes / Sikorski; Henle Verlag (Urtext)."
  },
  {
    id: "debussy-sonata", category: "Solo Repertoire", composer: "Claude Debussy", nationality: "French", period: "Modern",
    title: "Sonata for Violin and Piano in G minor, L. 140 (1917)",
    difficulty: [8, 8],
    description: "Debussy's last major completed work. Concise three-movement sonata of elusive beauty and mercurial character, combining Impressionist color with neoclassical wit.",
    skills: "Tonal color and variety; rhythmic flexibility; Impressionist atmosphere; wit and fantasy.",
    editions: "Henle Verlag (Urtext); Durand (original publisher); Bärenreiter.",
    imslp: "https://imslp.org/wiki/Violin_Sonata_(Debussy%2C_Claude)"
  },
  {
    id: "ravel-sonata", category: "Solo Repertoire", composer: "Maurice Ravel", nationality: "French", period: "Modern",
    title: "Sonata No. 2 in G major for Violin and Piano (1927)",
    difficulty: [8, 9],
    description: "Three-movement work of crystalline precision. The 'Blues' second movement is one of the earliest jazz influences in classical chamber music. The finale is a perpetual-motion tour de force.",
    skills: "Precision; tonal clarity; jazz inflections in Blues; perpetual-motion stamina; French clarity.",
    editions: "Durand (original publisher); Henle Verlag (Urtext)."
  },
  {
    id: "enescu-sonata3", category: "Solo Repertoire", composer: "George Enescu", nationality: "Romanian", period: "Modern",
    title: "Sonata No. 3 in A minor, Op. 25 ('In Romanian Folk Character')",
    difficulty: [9, 10],
    description: "One of the most extraordinary works in the literature. Demands microtonal inflections, ornamental flights, and improvisatory freedom of Romanian folk fiddling within a sophisticated compositional framework.",
    skills: "Quarter-tone inflections; improvisatory freedom; Romanian folk idiom; rhapsodic expression; extreme interpretive creativity.",
    editions: "Enoch (original French publisher); Editura Muzicală București; International Music Company."
  },

  // ═══════════════════════════════════════════════════════════════
  // SECTION 7: CONCERTI (SELECTED)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "bach-concerti", category: "Concerti", composer: "Johann Sebastian Bach", nationality: "German", period: "Baroque",
    title: "Violin Concerti in A minor BWV 1041, E major BWV 1042; Double Concerto in D minor BWV 1043",
    difficulty: [5, 6],
    description: "Core repertoire. The A minor is introspective; the E major brilliant. The Double Concerto demands clean ensemble dialogue between soloists. All require clean Baroque articulation and basic ornamentation.",
    skills: "Baroque articulation; passage work; ornamentation; ensemble sensitivity.",
    editions: "Bärenreiter (Urtext); Henle Verlag; Peters, ed. Joachim; International Music Company, ed. Galamian.",
    imslp: "https://imslp.org/wiki/Violin_Concerto_in_A_minor%2C_BWV_1041_(Bach%2C_Johann_Sebastian)"
  },
  {
    id: "mozart-concerti", category: "Concerti", composer: "Wolfgang Amadeus Mozart", nationality: "Austrian", period: "Classical",
    title: "Violin Concerti Nos. 3–5, K. 216, 218, 219",
    difficulty: [6, 7],
    description: "The three greatest Mozart violin concerti. No. 3 in G is the most popular. No. 4 is brilliant and sunny. No. 5 ('Turkish') features the famous episode in the finale. All require impeccable Classical style. Multiple cadenza options exist from Joachim, Flesch, Franko, and others.",
    skills: "Classical style; clean passagework; crystalline tone; effortless elegance; cadenza preparation.",
    editions: "Bärenreiter (Urtext, Neue Mozart-Ausgabe); Henle Verlag (Urtext); International Music Company, ed. Galamian; Peters, ed. Joachim.",
    imslp: "https://imslp.org/wiki/Violin_Concerto_No.3_in_G_major%2C_K.216_(Mozart%2C_Wolfgang_Amadeus)"
  },
  {
    id: "beethoven-concerto", category: "Concerti", composer: "Ludwig van Beethoven", nationality: "German", period: "Classical/Romantic",
    title: "Violin Concerto in D major, Op. 61 (1806)",
    difficulty: [8, 9],
    description: "The greatest violin concerto of the Classical era. Demands the utmost musical maturity. The choice of cadenza is a major interpretive decision. Cadenzas by Kreisler (most popular), Joachim, Auer, Schnittke, Schneiderhan, and Kremer.",
    skills: "Absolute perfection of intonation, tone, and phrasing; musical maturity; cadenza selection.",
    editions: "Henle Verlag (Urtext), ed. Jonathan Del Mar; Bärenreiter (Urtext); Peters (Urtext), ed. Max Rostal; International Music Company, ed. Auer.",
    imslp: "https://imslp.org/wiki/Violin_Concerto_in_D_major%2C_Op.61_(Beethoven%2C_Ludwig_van)"
  },
  {
    id: "mendelssohn-concerto", category: "Concerti", composer: "Felix Mendelssohn", nationality: "German", period: "Romantic",
    title: "Violin Concerto in E minor, Op. 64 (1844)",
    difficulty: [8, 8],
    description: "Perhaps the most popular violin concerto ever written. Revolutionary form: immediate soloist entry, integrated cadenza, movements played attacca. Demands brilliant technique, effortless lyricism, and fleet spiccato.",
    skills: "Brilliant technique; singing tone; spiccato; integrated formal awareness.",
    editions: "Bärenreiter (Urtext), ed. R. Larry Todd & Cl. Brown — scholarly edition, also includes the early version; Henle Verlag (Urtext), ed. Ernst Herttrich — standard Urtext; Peters (Urtext) — reliable European edition; International Music Company, ed. Zino Francescatti — Francescatti's lyrical fingerings; International Music Company, ed. Ivan Galamian — Galamian's systematic approach; Breitkopf & Härtel — from the Mendelssohn complete works; Schott — German performing edition.",
    imslp: "https://imslp.org/wiki/Violin_Concerto_in_E_minor%2C_Op.64_(Mendelssohn%2C_Felix)"
  },
  {
    id: "bruch-concerto", category: "Concerti", composer: "Max Bruch", nationality: "German", period: "Romantic",
    title: "Violin Concerto No. 1 in G minor, Op. 26 (1868)",
    difficulty: [7, 8],
    description: "One of the most passionate and melodically generous concerti. The Adagio is among the most beautiful slow movements in the repertoire. Ideal first major Romantic concerto.",
    skills: "Passionate expression; broad cantabile; clean passage work; rhythmic energy.",
    editions: "Henle Verlag (Urtext); International Music Company, ed. Galamian; Peters; Simrock (original).",
    imslp: "https://imslp.org/wiki/Violin_Concerto_No.1_in_G_minor%2C_Op.26_(Bruch%2C_Max)"
  },
  {
    id: "brahms-concerto", category: "Concerti", composer: "Johannes Brahms", nationality: "German", period: "Romantic",
    title: "Violin Concerto in D major, Op. 77 (1878)",
    difficulty: [9, 9],
    description: "Symphonic in scope. Demands technical prowess to match a massive orchestra and musical depth for Brahms's complex motivic development. The Adagio features the famous oboe solo over which the violin sings. Cadenza tradition: Joachim (original, most common), Busoni, Auer, Milstein, Kennedy.",
    skills: "Orchestral-scale projection; Brahmsian complexity; rich tone; Hungarian Rondo in finale.",
    editions: "Henle Verlag (Urtext), ed. Clive Brown — definitive Urtext with unparalleled source commentary; Bärenreiter (Urtext) — from the Brahms complete works edition; Peters (Urtext) — reliable alternative; International Music Company, ed. Josef Gingold — includes his own cadenza and Ysaÿe's markings; Simrock (original publisher) — historical first edition; Schott — German performing edition; Breitkopf & Härtel — orchestral materials.",
    imslp: "https://imslp.org/wiki/Violin_Concerto_in_D_major%2C_Op.77_(Brahms%2C_Johannes)"
  },
  {
    id: "tchaikovsky-concerto", category: "Concerti", composer: "Pyotr Ilyich Tchaikovsky", nationality: "Russian", period: "Romantic",
    title: "Violin Concerto in D major, Op. 35 (1878)",
    difficulty: [9, 9],
    description: "The quintessential Romantic virtuoso concerto. Vast, passionate first movement; tender Canzonetta; whirlwind Russian dance finale. Demands brilliant technique and an abundance of Russian soul.",
    skills: "Brilliant technique; massive tone production; Russian expressiveness; rapid scales and arpeggios; double stops.",
    editions: "Henle Verlag (Urtext), ed. Polina Vajdman — scholarly edition restoring Tchaikovsky's original intentions before Auer's revisions; International Music Company, ed. David Oistrakh — the most authoritative Russian performance tradition; Peters, ed. Leopold Auer — Auer's famous revision, historically significant though now considered inauthentic in places; Bärenreiter (Urtext) — based on composer's autograph; P. Jurgenson (original publisher) / Muzyka — Russian editions; Schott — German performing edition.",
    imslp: "https://imslp.org/wiki/Violin_Concerto_in_D_major%2C_Op.35_(Tchaikovsky%2C_Pyotr)"
  },
  {
    id: "sibelius-concerto", category: "Concerti", composer: "Jean Sibelius", nationality: "Finnish", period: "Late Romantic/Modern",
    title: "Violin Concerto in D minor, Op. 47 (1903–05)",
    difficulty: [9, 10],
    description: "The last great Romantic concerto. Written by a composer who had aspired to be a concert violinist; supremely idiomatic yet fiendishly difficult. Demands exceptional power, stamina, and tonal projection.",
    skills: "Power and projection; stamina; Nordic character; extreme technical demands.",
    editions: "Breitkopf & Härtel (Sibelius Complete Works, includes 1903 original version); International Music Company; Henle Verlag (Urtext)."
  },
  {
    id: "barber-concerto", category: "Concerti", composer: "Samuel Barber", nationality: "American", period: "Neoclassical/Romantic",
    title: "Violin Concerto, Op. 14 (1939)",
    difficulty: [8, 9],
    description: "One of the most beloved 20th-century concerti. Lyrical first movement, achingly beautiful Andante, ferociously virtuosic perpetual-motion finale. Perfect balance of emotional depth and technical brilliance.",
    skills: "Lyrical singing; emotional depth; perpetual-motion stamina in finale; American Romantic idiom.",
    editions: "G. Schirmer (original publisher)."
  },
  {
    id: "berg-concerto", category: "Concerti", composer: "Alban Berg", nationality: "Austrian", period: "Second Viennese School",
    title: "Violin Concerto ('To the Memory of an Angel,' 1935)",
    difficulty: [9, 10],
    description: "One of the great emotional experiences in music. Twelve-tone row used with deeply lyrical and tonal effect. Quotes Bach chorale 'Es ist genug.' Demands absolute command of twelve-tone intonation, tonal beauty in atonal contexts, and profound emotional depth.",
    skills: "Twelve-tone intonation; tonal beauty in atonal contexts; emotional depth; orchestral awareness.",
    editions: "Universal Edition (original and only critical edition)."
  },
  {
    id: "shostakovich-concerti", category: "Concerti", composer: "Dmitri Shostakovich", nationality: "Russian", period: "Modern",
    title: "Violin Concerti Nos. 1, Op. 77/99 and No. 2, Op. 129",
    difficulty: [9, 10],
    description: "No. 1 is among the most towering 20th-century concerti. Written for Oistrakh: Nocturne, Scherzo, Passacaglia (with monumental cadenza), Burlesque. No. 2 is more intimate and autumnal. Both demand virtuoso technique, enormous stamina, and interpretive depth.",
    skills: "Enormous stamina; interpretive depth; rhythmic precision; wide emotional range.",
    editions: "DSCH Publishers / Sikorski; International Music Company, ed. David Oistrakh; Boosey & Hawkes."
  },

  // ═══════════════════════════════════════════════════════════════
  // SECTION 8: CHAMBER MUSIC (SELECTED)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "bartok-duos", category: "Chamber Music", composer: "Béla Bartók", nationality: "Hungarian", period: "Modern",
    title: "44 Duos for Two Violins, Sz. 98 (1931)",
    difficulty: [3, 7],
    description: "Folk-inspired miniatures of extraordinary variety. Widely used pedagogically; later duos are concert-worthy.",
    skills: "Folk idiom; rhythmic precision; ensemble intonation; varied character.",
    editions: "Boosey & Hawkes; Universal Edition (original); Henle Verlag (Urtext).",
    imslp: "https://imslp.org/wiki/44_Duos_for_2_Violins%2C_Sz.98_(Bart%C3%B3k%2C_B%C3%A9la)"
  },
  {
    id: "beethoven-trios", category: "Chamber Music", composer: "Ludwig van Beethoven", nationality: "German", period: "Classical/Romantic",
    title: "Piano Trios Op. 1; Op. 70 ('Ghost' & No. 2); Op. 97 ('Archduke')",
    difficulty: [7, 9],
    description: "From youthful exuberance (Op. 1) through the supernatural 'Ghost' (Op. 70/1) to the majestic 'Archduke' (Op. 97), the grandest of all piano trios.",
    skills: "Chamber balance; rhythmic precision; dramatic range; sustained ensemble concentration.",
    editions: "Henle Verlag (Urtext); Bärenreiter; Peters."
  },
  {
    id: "beethoven-quartets", category: "Chamber Music", composer: "Ludwig van Beethoven", nationality: "German", period: "Classical/Romantic",
    title: "16 String Quartets + Große Fuge",
    difficulty: [7, 10],
    description: "The most important body of string quartets. Early quartets (Op. 18): Classical masterpieces. Middle (Op. 59 'Razumovsky,' Op. 74 'Harp,' Op. 95 'Serioso'): expand the form dramatically. Late (Opp. 127, 130–135): among the most profound works in Western music.",
    skills: "Complete range of chamber music skills; ensemble leadership and support; interpretive depth; stamina (late quartets).",
    editions: "Henle Verlag (Urtext); Bärenreiter (Urtext), ed. Jonathan Del Mar; Peters."
  },
  {
    id: "schubert-quintet", category: "Chamber Music", composer: "Franz Schubert", nationality: "Austrian", period: "Romantic",
    title: "String Quintet in C major, D. 956",
    difficulty: [8, 8],
    description: "Many consider this the single greatest work of chamber music. The slow movement is of almost unbearable beauty.",
    skills: "Sustained lyrical playing; ensemble blend; emotional depth; Schubertian harmonic sensitivity.",
    editions: "Bärenreiter (Urtext); Henle Verlag; Peters."
  },
  {
    id: "ravel-trio", category: "Chamber Music", composer: "Maurice Ravel", nationality: "French", period: "Modern",
    title: "Piano Trio in A minor (1914)",
    difficulty: [8, 9],
    description: "A kaleidoscopic work of extraordinary refinement: Basque rhythms, Malay pantun form, perpetual motion, and a luminous passacaglia.",
    skills: "Rhythmic precision; tonal refinement; French clarity; ensemble subtlety; varied character.",
    editions: "Durand (original); Henle Verlag."
  },

  // ═══════════════════════════════════════════════════════════════
  // SECTION 9: ORCHESTRAL EXCERPTS
  // ═══════════════════════════════════════════════════════════════
  {
    id: "don-juan", category: "Orchestral Excerpts", composer: "Richard Strauss", nationality: "German", period: "Late Romantic",
    title: "Don Juan, Op. 20 — First Violin",
    difficulty: [9, 9],
    description: "The most frequently requested orchestral audition excerpt. Virtuosic passage work; sustained high-position playing; enormous dynamic range. Clean, brilliant execution at tempo is the benchmark for first violin auditions worldwide.",
    skills: "Virtuosic passage work; high positions; dynamic control; rhythmic precision.",
    editions: "Orchestra Probespiel (Peters); Orchestral Excerpts (International Music Company)."
  },
  {
    id: "heldenleben", category: "Orchestral Excerpts", composer: "Richard Strauss", nationality: "German", period: "Late Romantic",
    title: "Ein Heldenleben, Op. 40 — Concertmaster Solo",
    difficulty: [9, 10],
    description: "One of the great orchestral violin solos. Extended, lyrical, and virtuosic; demands the range of a concerto soloist within an orchestral context.",
    skills: "Solo projection within orchestra; lyrical and virtuosic; broad emotional range.",
    editions: "Orchestra Probespiel (Peters); Orchestral Excerpts (International Music Company)."
  },
  {
    id: "scheherazade", category: "Orchestral Excerpts", composer: "Nikolai Rimsky-Korsakov", nationality: "Russian", period: "Romantic",
    title: "Scheherazade, Op. 35 — Concertmaster Solo",
    difficulty: [8, 9],
    description: "Extended solo for concertmaster. Lyrical, ornamental, and improvisatory; one of the great orchestral solos. Demands singing tone, rubato, and confidence as a soloist within the orchestral setting.",
    skills: "Solo projection; ornamental playing; rubato; lyrical expression.",
    editions: "Orchestra Probespiel (Peters); Orchestral Excerpts (International Music Company)."
  },
  {
    id: "midsummer", category: "Orchestral Excerpts", composer: "Felix Mendelssohn", nationality: "German", period: "Romantic",
    title: "A Midsummer Night's Dream, Scherzo — First & Second Violin",
    difficulty: [8, 8],
    description: "Light, rapid spiccato at pianissimo. Tests control, evenness, and coordination within the section. One of the most commonly requested excerpts for both first and second violin.",
    skills: "Pianissimo spiccato; evenness; section coordination; lightness.",
    editions: "Orchestra Probespiel (Peters)."
  },
  {
    id: "bartered-bride", category: "Orchestral Excerpts", composer: "Bedřich Smetana", nationality: "Czech", period: "Romantic",
    title: "The Bartered Bride, Overture — First Violin",
    difficulty: [8, 8],
    description: "Rapid pianissimo passage work requiring fleet, clean articulation. A standard audition excerpt testing speed, evenness, and dynamic control at soft dynamics.",
    skills: "Fleet articulation at pianissimo; clean scales; dynamic control; speed.",
    editions: "Orchestra Probespiel (Peters)."
  },

  // ═══════════════════════════════════════════════════════════════
  // SECTION 10: SHOWPIECES & SHORTER WORKS (SELECTED)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "sarasate-zigeuner", category: "Showpieces", composer: "Pablo de Sarasate", nationality: "Spanish", period: "Romantic",
    title: "Zigeunerweisen, Op. 20",
    difficulty: [9, 9],
    description: "The ultimate showpiece. Every virtuoso technique: harmonics, left-hand pizzicato, spiccato at speed, singing cantabile in the Lento, and dazzling speed in the finale.",
    skills: "Complete virtuoso technique; contrasting characters; showmanship.",
    editions: "International Music Company; G. Schirmer; Peters.",
    imslp: "https://imslp.org/wiki/Zigeunerweisen%2C_Op.20_(Sarasate%2C_Pablo_de)"
  },
  {
    id: "ravel-tzigane", category: "Showpieces", composer: "Maurice Ravel", nationality: "French", period: "Modern",
    title: "Tzigane (1924)",
    difficulty: [9, 10],
    description: "A tour de force: the opening solo cadenza is a sustained rhapsody demanding harmonics, double stops, left-hand pizzicato, and brilliant passage work. The orchestral (or piano) entry launches a virtuosic Hungarian-style dance.",
    skills: "Extended solo cadenza; every virtuoso technique; Hungarian style; stamina; projection.",
    editions: "Durand (original); International Music Company.",
    imslp: "https://imslp.org/wiki/Tzigane_(Ravel%2C_Maurice)"
  },
  {
    id: "chausson-poeme", category: "Showpieces", composer: "Ernest Chausson", nationality: "French", period: "Romantic",
    title: "Poème, Op. 25 (1896)",
    difficulty: [8, 8],
    description: "An achingly beautiful single-movement work for violin and orchestra. Demands sustained lyricism, broad dynamic range, and orchestral-scale projection. One of the most emotionally profound showpieces.",
    skills: "Sustained lyricism; tonal projection; emotional depth; broad dynamic range.",
    editions: "International Music Company; Durand; Peters.",
    imslp: "https://imslp.org/wiki/Po%C3%A8me%2C_Op.25_(Chausson%2C_Ernest)"
  },
  {
    id: "kreisler-pieces", category: "Showpieces", composer: "Fritz Kreisler", nationality: "Austrian-American", period: "Early 20th Century",
    title: "Praeludium and Allegro; Liebesleid; Liebesfreud; Schön Rosmarin; and other short pieces",
    difficulty: [5, 8],
    description: "Kreisler's short pieces are staples of the recital encore repertoire. The Praeludium and Allegro is a beloved recital opener demanding broad tone and clean passage work. The Viennese miniatures (Liebesleid, Liebesfreud, Schön Rosmarin, etc.) require elegance, rubato, and old-world charm. His arrangements of works 'in the style of' earlier composers are also widely performed.",
    skills: "Viennese charm; rubato; elegant phrasing; varied character; tonal warmth.",
    editions: "Carl Fischer (collected editions); G. Schirmer; International Music Company."
  },
  {
    id: "saint-saens-intro", category: "Showpieces", composer: "Camille Saint-Saëns", nationality: "French", period: "Romantic",
    title: "Introduction and Rondo Capriccioso, Op. 28; Havanaise, Op. 83",
    difficulty: [7, 8],
    description: "Two of the most popular competition and recital pieces. The Introduction and Rondo Capriccioso demands singing tone in the Introduction and sparkling virtuosity in the Rondo. The Havanaise is sensuous and dance-like, requiring rubato and tonal color.",
    skills: "Singing tone; sparkling virtuosity; rubato; tonal color; elegant passage work.",
    editions: "International Music Company; Durand (original); Henle Verlag.",
    imslp: "https://imslp.org/wiki/Introduction_and_Rondo_Capriccioso%2C_Op.28_(Saint-Sa%C3%ABns%2C_Camille)"
  },

  // ═══════════════════════════════════════════════════════════════
  // TRADITIONAL VIOLIN SCHOOLS (HISTORICAL METHODS)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "baillot-method", category: "Traditional Violin Schools", composer: "Pierre Baillot, Pierre Rode & Rodolphe Kreutzer", nationality: "French", period: "Classical",
    title: "Méthode de violon (Paris Conservatoire Method, 1803)",
    difficulty: [1, 8],
    description: "The official method of the newly founded Paris Conservatoire, written jointly by its three leading violin professors. This is the foundational document of the French violin school, codifying the principles of bow technique, left-hand mechanics, and musical expression that would dominate European pedagogy for decades. The method covers every aspect of technique in systematic detail, from holding the instrument through advanced position work. Baillot later expanded his own contribution into his magisterial 'L'Art du Violon' (1834). Historically indispensable for understanding Classical-era French performance practice.",
    skills: "Historical French school technique; Classical bowing and articulation; comprehensive technical foundation; ornamental practice; musical taste of the period.",
    editions: "Facsimile reprints (various publishers); Minkoff Reprint (scholarly facsimile); available on IMSLP."
  },
  {
    id: "baillot-art", category: "Traditional Violin Schools", composer: "Pierre Baillot", nationality: "French", period: "Classical/Romantic",
    title: "L'Art du Violon (The Art of the Violin, 1834)",
    difficulty: [1, 10],
    description: "Baillot's magnum opus, expanding the 1803 Conservatoire method into one of the most comprehensive violin treatises of the 19th century. L'Art du Violon covers every aspect of technique and musical interpretation, with extensive discussion of expression, taste, bowings, ornaments, and the philosophy of musical performance. It includes numerous musical examples and exercises. Baillot was perhaps the most intellectual of the great French violinists, and his writing is reflective, detailed, and deeply concerned with the art of musical expression. Essential for understanding Romantic-era French violin playing.",
    skills: "Comprehensive Romantic French technique; musical expression; historical bowing; ornaments; philosophical approach to performance.",
    editions: "Facsimile: Minkoff Reprint; English translation by Louise Goldberg (Northwestern University Press, 1991)—the definitive modern scholarly edition with extensive commentary."
  },
  {
    id: "spohr-school", category: "Traditional Violin Schools", composer: "Louis Spohr", nationality: "German", period: "Romantic",
    title: "Violinschule (Violin School, 1832)",
    difficulty: [1, 9],
    description: "Spohr's comprehensive method represents the early-Romantic German school. It covers every aspect of technique in exhaustive detail, including original exercises and études composed by Spohr himself. Historically significant as a bridge between the Classical approach of Leopold Mozart and the mature Romanticism of Joachim. Spohr's detailed instructions on portamento, vibrato, and expressive devices are particularly valuable for understanding early 19th-century performing style. His advocacy for the chin rest (which he helped popularize) and his specific approach to bowing shaped German violin playing for generations.",
    skills: "Early-Romantic German technique; portamento and vibrato style; comprehensive method; historical performance practice; chin rest technique.",
    editions: "Robert Lienau (German reprint); English translation available; facsimile of 1832 edition available through various scholarly sources and IMSLP."
  },
  {
    id: "beriot-method", category: "Traditional Violin Schools", composer: "Charles de Bériot", nationality: "Belgian", period: "Romantic",
    title: "Méthode de violon (Violin Method, 3 Parts, 1858)",
    difficulty: [1, 8],
    description: "Bériot's three-part method is the foundational document of the Franco-Belgian school. Part 1 covers elementary technique with the graceful, melodic études of Op. 60. Part 2 introduces intermediate techniques including position work, vibrato, and double stops. Part 3 addresses advanced technique and musical interpretation. Bériot's method is distinguished by its emphasis on elegance, cantabile, and the vocal model of violin playing. He was the teacher of Vieuxtemps, who in turn taught Ysaÿe, making this method the root of one of the most important pedagogical lineages in violin history.",
    skills: "Franco-Belgian school foundations; cantabile playing; elegant phrasing; vocal approach to the instrument; ornamental style; progressive technical development.",
    editions: "Schott (original publisher); G. Schirmer (partial reprints); available on IMSLP."
  },
  {
    id: "alard-school", category: "Traditional Violin Schools", composer: "Jean-Delphin Alard", nationality: "French", period: "Romantic",
    title: "École du violon (Violin School), Op. 40",
    difficulty: [1, 9],
    description: "Alard's comprehensive method was the standard at the Paris Conservatoire during the mid-19th century. Alard succeeded Baillot as professor and taught Sarasate, among others. His method progresses systematically from beginner through virtuoso technique, incorporating original études and exercises at each level. The later sections include demanding material for double stops, advanced bowing, and high-position work. Less well known outside France than it deserves, it provides essential context for the French school's development between Baillot and the modern era.",
    skills: "French school technique; systematic progression; double stops; advanced bowing; high-position work; 19th-century French style.",
    editions: "Schott (original); available on IMSLP."
  },
  {
    id: "david-school", category: "Traditional Violin Schools", composer: "Ferdinand David", nationality: "German", period: "Romantic",
    title: "Violinschule (Violin School, 2 vols.); Die hohe Schule des Violinspiels (The High School of Violin Playing)",
    difficulty: [1, 9],
    description: "David was concertmaster of the Leipzig Gewandhaus and the dedicatee and first performer of the Mendelssohn Concerto. His Violinschule is a comprehensive method reflecting the Leipzig German school. 'Die hohe Schule des Violinspiels' (The High School) is a celebrated anthology of advanced works from the 17th–19th centuries, edited with David's own bowings and fingerings. The anthology remains a valuable source for lesser-known Baroque and Classical solo works and provides insight into mid-19th-century German performing practice.",
    skills: "German school technique; Leipzig tradition; advanced repertoire anthology; historical bowings and fingerings; Mendelssohn-era performance practice.",
    editions: "Breitkopf & Härtel (original); Peters (Die hohe Schule); IMSLP (historical editions)."
  },
  {
    id: "laoureux-method", category: "Traditional Violin Schools", composer: "Nicolas Laoureux", nationality: "Belgian-French", period: "19th/20th Century",
    title: "Méthode pratique et progressive du violon (Practical and Progressive Violin Method, 4 Parts)",
    difficulty: [1, 6],
    description: "Laoureux's four-part method was once among the most widely used in Continental European pedagogy, particularly in France, Belgium, Italy, and Latin America. The method is meticulously organized, progressing from absolute beginner through intermediate technique with clear, step-by-step instructions. Part 1 covers first position; Part 2 introduces positions 2–5; Part 3 covers positions 6–7 and double stops; Part 4 addresses advanced bowings and interpretation. The études and exercises are well-crafted and musically satisfying. Though less commonly encountered in English-speaking countries, it remains in active use in many European and South American conservatories.",
    skills: "Systematic progressive technique; French/Belgian school foundations; clear position-by-position development; bowing fundamentals; musical development.",
    editions: "Henry Lemoine (original French publisher, all 4 parts still in print); available on IMSLP."
  },
  {
    id: "campagnoli-method", category: "Traditional Violin Schools", composer: "Bartolomeo Campagnoli", nationality: "Italian", period: "Classical",
    title: "Metodo per violino (Violin Method, Op. 21, 1797); 7 Divertimenti, Op. 18",
    difficulty: [1, 8],
    description: "Campagnoli's method is an important late-18th-century Italian school. The Op. 21 method covers all aspects of technique with particular attention to the Italian singing style and left-hand facility. His 7 Divertimenti for solo violin, Op. 18, are excellent intermediate-to-advanced études that anticipate the technical demands of the Romantic era. Campagnoli was one of the last great representatives of the Italian school before the center of gravity shifted permanently to France and Germany.",
    skills: "Italian school technique; Classical-era singing style; left-hand facility; solo violin writing; late 18th-century practice.",
    editions: "Peters (Op. 18); various historical reprints of Op. 21; IMSLP."
  },
  {
    id: "dancla-school", category: "Traditional Violin Schools", composer: "Charles Dancla", nationality: "French", period: "Romantic",
    title: "Méthode élémentaire et progressive (Elementary and Progressive Method); 6 Airs variés, Op. 89",
    difficulty: [2, 7],
    description: "Dancla's method reflects the elegance and melodic charm of the mid-19th-century Paris Conservatoire school. His teaching method progresses through the fundamentals with attractive musical material. The 6 Airs variés on operatic themes (Op. 89) are particularly valuable as student performance pieces: each takes a well-known opera aria and presents it with increasingly virtuosic variations, developing technique within a musically compelling framework. They bridge the gap between études and concert repertoire for intermediate students.",
    skills: "French school elegance; melodic playing; operatic variation form; intermediate performance repertoire; gradual technical development.",
    editions: "G. Schirmer (Airs variés); International Music Company; Lemoine (original method); IMSLP."
  },
  {
    id: "dont-method", category: "Traditional Violin Schools", composer: "Jakob Dont", nationality: "Austrian", period: "Romantic",
    title: "Method (Wiener Violinschule); Preparatory Exercises, Op. 37; Etudes & Caprices, Op. 35",
    difficulty: [2, 9],
    description: "Dont's contributions span from preparatory exercises to virtuoso caprices, making him one of the most important pedagogical figures of the Viennese school. His Op. 37 (covered in Etudes section) serves as the ideal preparation for Kreutzer; his Op. 35 (also in Etudes) bridges to Paganini. Together they form a coherent pedagogical arc rooted in the Viennese tradition. Dont studied with both Böhm and Czerny and was a professor at the Vienna Conservatory.",
    skills: "Viennese school technique; systematic progression from intermediate through virtuoso; bowing; double stops; musical sophistication.",
    editions: "Peters; International Music Company, ed. Galamian; G. Schirmer; Henle Verlag."
  },
  {
    id: "wohlfahrt-school", category: "Traditional Violin Schools", composer: "Franz Wohlfahrt", nationality: "German", period: "19th Century",
    title: "Complete Violin Method (Opp. 38, 45, 74); Wohlfart as a Pedagogical System",
    difficulty: [1, 5],
    description: "Wohlfahrt's multiple opus numbers form a coherent pedagogical arc that has been central to German-tradition violin teaching for over a century. Op. 38 (Easiest Elementary Method) provides the very first steps; Op. 45 (60 Studies) is the workhorse of early-intermediate pedagogy; Op. 74 (further studies) extends into middle-intermediate territory. Used together, these volumes provide a complete technical foundation from beginner through the threshold of Kayser and Mazas. Wohlfahrt's studies are melodically appealing and pedagogically logical, though some modern teachers find them stylistically narrow.",
    skills: "Complete early technical foundation; German school fundamentals; first position through third; basic bowings; progressive difficulty; reading skills.",
    editions: "G. Schirmer; Peters; International Music Company; Carl Fischer."
  },
  {
    id: "kreutzer-rode-system", category: "Traditional Violin Schools", composer: "Kreutzer, Rode & Baillot (Paris Conservatoire tradition)", nationality: "French", period: "Classical",
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
    id: "capet-treatise", category: "Treatises", subcategory: "Modern Pedagogy", composer: "Lucien Capet", nationality: "French", period: "Early 20th Century",
    title: "La Technique supérieure de l'archet (Superior Bowing Technique, 1916)",
    difficulty: [6, 10],
    description: "Capet's treatise on bowing is one of the most important and original contributions to violin pedagogy. A legendary quartet leader and teacher at the Paris Conservatoire, Capet developed a systematic analysis of bowing mechanics that remains unequaled in its depth and specificity. The treatise covers contact point, bow speed, pressure, distribution, and the production of every gradation of tone color through the manipulation of these variables. Capet's concept of the 'guided bow'—where the arm weight is channeled through the stick with precise control—has influenced generations of French and international players. The exercises are demanding and require an already advanced technique. Capet's students included Ivan Galamian, making this treatise a direct ancestor of the dominant American school.",
    skills: "Advanced bowing mechanics; tone production through bow variables; contact point theory; bow speed/weight relationships; French school bowing at its most refined.",
    editions: "Éditions Salabert (French original); English translation by Margaret Schmidt (Encore Music Publishers)—includes Capet's original diagrams and exercises."
  },
  {
    id: "szigeti-treatise", category: "Treatises", subcategory: "Modern Pedagogy", composer: "Joseph Szigeti", nationality: "Hungarian-American", period: "20th Century",
    title: "Szigeti on the Violin (1969); A Violinist's Notebook (1964)",
    difficulty: [1, 10],
    description: "'Szigeti on the Violin' is a deeply personal and intellectually stimulating book by one of the 20th century's most thoughtful violinists. Unlike the systematic treatises of Flesch or Galamian, Szigeti's writing is discursive and philosophical, ranging across topics including interpretation, fingering philosophy, neglected repertoire, and the ethics of performance. His advocacy for contemporary music and lesser-known masterworks expanded the repertoire of many violinists. 'A Violinist's Notebook' provides detailed fingering and interpretive suggestions for specific works. Both books reflect a uniquely cultivated musical mind.",
    skills: "Interpretive philosophy; fingering logic; repertoire knowledge; intellectual approach to musicianship; advocacy for contemporary music.",
    editions: "Dover (Szigeti on the Violin, reprint, widely available); Gerald Duckworth (original); A Violinist's Notebook (various)."
  },
  {
    id: "gerle-treatise", category: "Treatises", subcategory: "Modern Pedagogy", composer: "Robert Gerle", nationality: "Hungarian-American", period: "20th Century",
    title: "The Art of Bowing Practice (1991); The Art of Practising the Violin (1983)",
    difficulty: [3, 10],
    description: "Gerle's two books are among the most practical modern guides for violinists. 'The Art of Bowing Practice' provides a systematic approach to developing all bow strokes through carefully sequenced exercises, with clear explanations of the mechanics involved. 'The Art of Practising the Violin' addresses the broader question of how to practice effectively, covering mental preparation, physical technique, and musical development. Gerle was a student of Hubay and Weiner in Budapest and taught at the University of Maryland. His writing is clear, unpretentious, and immediately useful.",
    skills: "Practical bowing development; practice methodology; systematic stroke development; efficient practice habits.",
    editions: "Stainer & Bell (both books)."
  },
  {
    id: "courvoisier-treatise", category: "Treatises", subcategory: "Historical & Scholarly", composer: "Carl Courvoisier", nationality: "Swiss-German", period: "Late 19th Century",
    title: "The Technics of Violin Playing (1895)",
    difficulty: [1, 10],
    description: "Courvoisier studied with Joachim and his treatise provides detailed insight into the technical and interpretive practices of the Joachim school. His writing covers bowing, left-hand technique, vibrato, and musical expression with particular emphasis on the physiological basis of violin playing. While less well known than the major treatises, it is a valuable primary source for understanding the German school at its late-Romantic peak and complements the Joachim/Moser Violinschule.",
    skills: "Joachim school technique; physiological approach to playing; late-Romantic German performance practice; historical perspective.",
    editions: "Various reprints; available on IMSLP and through archive.org."
  },
  {
    id: "yampolsky-treatise", category: "Treatises", subcategory: "Modern Pedagogy", composer: "Izrail Yampolsky", nationality: "Russian", period: "20th Century",
    title: "The Principles of Violin Fingering (1967)",
    difficulty: [5, 10],
    description: "Yampolsky's treatise is the most thorough and analytical study of violin fingering ever published. A professor at the Moscow Conservatory and one of the great minds of Soviet pedagogy, Yampolsky examines fingering as a musical and expressive tool, not merely a mechanical convenience. He analyzes the fingering choices of great violinists and demonstrates how fingering affects timbre, phrasing, and musical expression. Required reading for anyone who takes fingering seriously as an interpretive act.",
    skills: "Fingering as expressive tool; analytical approach to fingering choices; understanding of timbre and position relationships; Soviet school fingering principles.",
    editions: "Oxford University Press (English translation by Alan Lumsden); available secondhand."
  },
  {
    id: "brown-practice", category: "Treatises", subcategory: "Historical & Scholarly", composer: "Clive Brown", nationality: "British", period: "21st Century",
    title: "Classical and Romantic Performing Practice 1750–1900 (1999)",
    difficulty: [1, 10],
    description: "Brown's magisterial study is the most comprehensive modern examination of historical string performance practice. Drawing on treatises, annotated scores, and early recordings, he reconstructs the bowing, vibrato, portamento, articulation, and ornamental practices of the Classical and Romantic periods. Essential for any performer seeking to understand how music from Mozart through Brahms was originally played, and how modern practices diverge from historical ones. The sections on vibrato usage and portamento are particularly eye-opening.",
    skills: "Historical performance practice; understanding of vibrato and portamento traditions; informed interpretation of Classical and Romantic music; scholarly perspective.",
    editions: "Oxford University Press (Clarendon Press)."
  },
  {
    id: "neumann-ornaments", category: "Treatises", subcategory: "Historical & Scholarly", composer: "Frederick Neumann", nationality: "German-American", period: "20th Century",
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
    id: "barber-solos", category: "Repertoire Collections", composer: "Barbara Barber (compiler)", nationality: "American", period: "21st Century",
    title: "Solos for Young Violinists (Vols. 1–6)",
    difficulty: [1, 7],
    description: "One of the most popular and well-curated graded repertoire collections in current use. Barbara Barber, a distinguished American pedagogue, compiled six volumes of performance pieces organized by progressive difficulty, from late beginner through early advanced. Each volume contains a mix of standard repertoire pieces, concerto movements, character pieces, and show pieces with piano accompaniment. The selection is musically appealing and pedagogically sound, exposing students to a range of styles and periods. Comes with companion CDs. Widely used for recitals, competitions, and festivals.",
    skills: "Progressive performance repertoire; recital preparation; style variety; accompaniment skills; stage experience at every level.",
    editions: "Summy-Birchard / Alfred Music (all 6 volumes with piano accompaniment and CDs)."
  },
  {
    id: "flesch-etudenstudien", category: "Repertoire Collections", composer: "Carl Flesch (compiler)", nationality: "Hungarian", period: "20th Century",
    title: "Etüdenstudien (Études Studies / Studies on Études)",
    difficulty: [5, 9],
    description: "Flesch's Etüdenstudien is a unique and invaluable pedagogical resource: a systematic commentary on all the major violin études from Kreutzer through Paganini. For each étude, Flesch provides analytical notes, practice strategies, alternative fingerings and bowings, and guidance on how to extract maximum technical benefit from the material. It transforms the standard étude collections from mere exercises into sophisticated tools for technical and musical development. This work encapsulates Flesch's extraordinary analytical approach to technique and is an essential companion volume to the études themselves.",
    skills: "Étude practice methodology; analytical approach to technical study; alternative fingerings and bowings; understanding of étude literature; Flesch school practice philosophy.",
    editions: "Ries & Erler (German original); Peters (selections); some portions available on IMSLP."
  },
  {
    id: "whistler-kreutzer", category: "Repertoire Collections", composer: "Harvey Whistler (compiler)", nationality: "American", period: "20th Century",
    title: "Preparing for Kreutzer (2 vols.)",
    difficulty: [4, 6],
    description: "Whistler's two-volume 'Preparing for Kreutzer' is a carefully designed bridge between intermediate études (Wohlfahrt, Kayser) and the Kreutzer 42 Studies. Volume 1 presents selected études from lesser-known but pedagogically excellent collections by Sitt, Hofmann, Mazas, Dancla, and others, ordered to systematically build the specific skills needed for Kreutzer. Volume 2 continues with more demanding material. The genius of the collection is its sequencing: each étude addresses a specific technique that appears in the Kreutzer studies, so that by the time a student begins Kreutzer, they have already encountered every fundamental challenge in an easier context.",
    skills: "Systematic preparation for Kreutzer; bridging intermediate and advanced technique; curated étude progression; targeted skill building.",
    editions: "Rubank / Hal Leonard (both volumes)."
  },
  {
    id: "david-hohe-schule", category: "Repertoire Collections", composer: "Ferdinand David (compiler)", nationality: "German", period: "Romantic",
    title: "Die hohe Schule des Violinspiels (The High School of Violin Playing, 2 vols.)",
    difficulty: [6, 9],
    description: "David's celebrated anthology collects advanced works from the 17th through 19th centuries, edited with his own bowings and fingerings. The two volumes include sonatas, concerto movements, and character pieces by Corelli, Tartini, Nardini, Locatelli, Bach, Handel, Porpora, and many others. It remains one of the best sources for lesser-known Baroque and Classical solo works, and David's editorial markings provide invaluable insight into mid-19th-century German performing practice. Many of these works are otherwise difficult to find in practical performing editions.",
    skills: "Advanced historical repertoire; Baroque and Classical solo works; German Romantic-era editorial practice; broad repertoire knowledge.",
    editions: "Peters (original publisher); Breitkopf & Härtel; IMSLP (historical editions)."
  },
  {
    id: "herrmann-concert", category: "Repertoire Collections", composer: "Various (ed. Eduard Herrmann)", nationality: "German", period: "Romantic",
    title: "Concert and Contest Collection; Concert Pieces for Violin",
    difficulty: [4, 7],
    description: "Herrmann's anthologies of concert and contest pieces were once staples of American violin pedagogy. They collect shorter concert works, transcriptions, and movements from sonatas and concerti suitable for intermediate-to-advanced students, all with piano accompaniment. While partially superseded by Barber's 'Solos for Young Violinists,' they remain useful for their different repertoire selection and historical interest.",
    skills: "Intermediate-to-advanced performance repertoire; concert preparation; varied styles.",
    editions: "G. Schirmer; Carl Fischer."
  },
  {
    id: "moffat-collections", category: "Repertoire Collections", composer: "Various (ed. Alfred Moffat)", nationality: "British", period: "Early 20th Century",
    title: "Old Masters for Young Players; Meisterstücke (Masterpieces) for Violin",
    difficulty: [3, 7],
    description: "Moffat's collections bring together Baroque and Classical works (Corelli, Handel, Vivaldi, Tartini, Nardini, and others) in practical performing editions with piano realizations of the continuo parts. 'Old Masters for Young Players' makes this repertoire accessible to intermediate students. While the continuo realizations reflect early 20th-century taste rather than modern historical practice, the collections remain popular for introducing students to pre-Classical repertoire.",
    skills: "Baroque and Classical repertoire access; early music exposure; intermediate performance pieces.",
    editions: "Simrock / Boosey & Hawkes; various reprints."
  },
  {
    id: "suzuki-repertoire", category: "Repertoire Collections", composer: "Various (Suzuki repertoire supplements)", nationality: "International", period: "21st Century",
    title: "Suzuki-Aligned Repertoire: Position Pieces (Barber); Scales for Young Violinists (Barber); First Repertoire for Violin (de Keyser)",
    difficulty: [1, 5],
    description: "A constellation of supplementary materials designed to complement the Suzuki method. Barbara Barber's 'Scales for Young Violinists' provides a scale system aligned with Suzuki volume levels. Her 'Position Pieces' introduces shifting through tuneful studies. Paul de Keyser's 'First Repertoire for Violin' provides additional performance pieces at early Suzuki levels. These supplements address gaps in the Suzuki curriculum—particularly reading skills, position work, and scale technique—without abandoning the Suzuki repertoire framework.",
    skills: "Suzuki curriculum supplements; scale technique; position introduction; reading skills; additional repertoire.",
    editions: "Alfred Music (Barber titles); Faber Music (de Keyser)."
  },
  {
    id: "applebaum-chamber", category: "Repertoire Collections", composer: "Samuel Applebaum (compiler)", nationality: "American", period: "20th Century",
    title: "Duets for Strings (3 vols.); Beautiful Music for Two Violins (4 vols.)",
    difficulty: [1, 5],
    description: "Applebaum's duo collections are among the most widely used ensemble materials for young violinists. 'Duets for Strings' provides ensemble music for string classes. 'Beautiful Music for Two Violins' collects attractive duets arranged from orchestral, operatic, and folk sources, graded from beginner through intermediate. Playing duets develops intonation, rhythm, and listening skills that solo practice alone cannot build.",
    skills: "Ensemble intonation; duet playing; listening skills; rhythmic coordination; social musicianship.",
    editions: "Belwin-Mills / Alfred Music."
  },
  {
    id: "sassmannshaus-tradition", category: "Repertoire Collections", composer: "Kurt Sassmannshaus (compiler)", nationality: "German-American", period: "21st Century",
    title: "The Sassmannshaus Tradition: Concert Repertoire for the Young Violinist",
    difficulty: [2, 6],
    description: "Kurt Sassmannshaus (son of Egon, who authored 'Early Start on the Violin') compiled graded repertoire selections that reflect the European conservatory tradition. These collections emphasize musically substantial works over lightweight pedagogical pieces, introducing students to real repertoire at the earliest possible stage. The editorial approach reflects the standards of the Cincinnati College-Conservatory, where Sassmannshaus built one of America's premier pre-college programs.",
    skills: "Conservatory-tradition repertoire; early exposure to substantial music; European pedagogical standards.",
    editions: "Bärenreiter."
  },
  {
    id: "probespiel", category: "Repertoire Collections", composer: "Various (ed. Ortel & Borwitzky)", nationality: "German", period: "20th Century",
    title: "Orchester-Probespiel (Orchestra Audition) for Violin",
    difficulty: [7, 10],
    description: "The standard orchestral audition excerpt collection, compiled from the repertoire of the Berlin Philharmonic and other leading German orchestras. Contains the most commonly requested first and second violin excerpts organized by composer, including Beethoven symphonies, Brahms symphonies, Strauss tone poems (Don Juan, Heldenleben, Till Eulenspiegel), Mozart symphonies, Mendelssohn Midsummer Night's Dream, Smetana Bartered Bride, and dozens more. An essential purchase for anyone preparing for professional orchestral auditions.",
    skills: "Orchestral audition preparation; excerpt mastery; ensemble awareness; professional standards.",
    editions: "Edition Peters (the standard edition)."
  },
];

const CATEGORIES = [
  "Beginner Methods", "Traditional Violin Schools", "Technical Exercises", "Etudes & Caprices",
  "Repertoire Collections", "Treatises", "Online Resources", "Solo Repertoire", "Concerti",
  "Chamber Music", "Orchestral Excerpts", "Showpieces"
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

const catIcon = (cat) => {
  const icons = {
    "Beginner Methods": "📖", "Traditional Violin Schools": "🏛️", "Technical Exercises": "🎯",
    "Etudes & Caprices": "📝", "Repertoire Collections": "📀", "Treatises": "📚",
    "Online Resources": "💻", "Solo Repertoire": "🎻", "Concerti": "🎵",
    "Chamber Music": "🎶", "Orchestral Excerpts": "🎼", "Showpieces": "✨"
  };
  return icons[cat] || "📄";
};

export default function ViolinReference() {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [diffRange, setDiffRange] = useState([1, 10]);
  const [expandedId, setExpandedId] = useState(null);
  const [expandedEditions, setExpandedEditions] = useState({});
  const [sortBy, setSortBy] = useState("category");
  const [headerCollapsed, setHeaderCollapsed] = useState(false);
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
        (item.editions && norm(item.editions).includes(q))
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
  }, [search, selectedCat, diffRange, sortBy]);

  const catCounts = useMemo(() => {
    const counts = { All: DATA.length };
    CATEGORIES.forEach(c => { counts[c] = DATA.filter(d => d.category === c).length; });
    return counts;
  }, []);

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
          </div>
        </div>

        {/* SEARCH + FILTERS */}
        <div style={{ background: "#faf8f4", padding: "16px 24px 12px", borderBottom: "1px solid #e0d8cc" }}>
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
                    {cat === "All" ? `All (${catCounts.All})` : `${catIcon(cat)} ${cat} (${catCounts[cat] || 0})`}
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
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#999", marginLeft: "auto" }}>
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </div>
            </div>
          </div>
        </div>
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

        {/* RESULTS */}
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
                    {catIcon(item.category)} {item.category}
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
                      <p style={{ fontSize: 15.5, lineHeight: 1.7, margin: "0 0 16px", color: "#3d3225" }}>{item.description}</p>

                      {item.skills && (
                        <div style={{ marginBottom: 16 }}>
                          <div style={{ fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: "#c49a2a", marginBottom: 6 }}>Skills Developed</div>
                          <p style={{ fontSize: 14.5, lineHeight: 1.65, margin: 0, fontFamily: "'DM Sans', sans-serif", color: "#5c4f3d" }}>{item.skills}</p>
                        </div>
                      )}

                      {item.editions && (() => {
                        const edList = item.editions.split("; ").filter(Boolean);
                        const showAll = expandedEditions[item.id];
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
      </div>

      <div style={{
        background: "#2c2419", color: "#b8a88a", textAlign: "center",
        padding: "20px", fontSize: 13, fontFamily: "'DM Sans', sans-serif"
      }}>
        Comprehensive Violin Repertoire & Studies Guide — {DATA.length} entries
      </div>
    </div>
  );
}
