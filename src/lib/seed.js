const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "../../.env") });

const GATES = [
  // ==================== DAILY LIFE ====================
  {
    theme: "daily_life",
    type: "sentence",
    title: "Weekend Routine",
    npc_text: "Hi! What do you usually do on weekends?",
    prefix: null,
    check_regex: "usually|always|often|sometimes|go|play|watch|do",
    correct_answer: null,
    sentence: null,
    correct_explain: "Great! You used the simple present tense correctly to talk about your routine or habitual weekend activities.",
    wrong_explain: "Make sure to use the simple present tense (e.g. 'I usually play', 'I go') when describing weekend routines.",
    remedial_prompt: "On weekends, I usually ______ (play) games with my friends.",
    remedial_options: JSON.stringify(["play", "plays", "am playing", "played"]),
    remedial_correct: "play",
    category: "tenses",
    sort_order: 1
  },
  {
    theme: "daily_life",
    type: "scramble",
    title: "Present Continuous Scramble",
    npc_text: null,
    prefix: null,
    check_regex: null,
    correct_answer: "we are watching a movie right now",
    sentence: null,
    correct_explain: "Excellent! You structured the present continuous sentence correctly for an ongoing action.",
    wrong_explain: "The correct sentence is 'we are watching a movie right now' (Subject + am/is/are + verb-ing + time marker).",
    remedial_prompt: "Right now, we ______ a movie.",
    remedial_options: JSON.stringify(["watch", "is watching", "are watching", "watched"]),
    remedial_correct: "are watching",
    category: "tenses",
    sort_order: 2
  },
  {
    theme: "daily_life",
    type: "correction",
    title: "Subject-Verb Error",
    npc_text: null,
    prefix: null,
    check_regex: null,
    correct_answer: "She doesn't like drinking tea in the morning.",
    sentence: "She don't like drinking tea in the morning.",
    correct_explain: "Correct! 'She' is third-person singular, so it requires 'doesn't' instead of 'don't'.",
    wrong_explain: "The subject 'She' is singular, so the negative form should be 'doesn't like' rather than 'don't like'.",
    remedial_prompt: "She ______ (not like) coffee.",
    remedial_options: JSON.stringify(["don't like", "doesn't like", "isn't like", "not likes"]),
    remedial_correct: "doesn't like",
    category: "subject_verb_agreement",
    sort_order: 3
  },
  {
    theme: "daily_life",
    type: "sentence",
    title: "Past Activities",
    npc_text: "Hey there! What did you do yesterday evening?",
    prefix: null,
    check_regex: "cooked|watched|played|studied|went|did|slept|relaxed",
    correct_answer: null,
    sentence: null,
    correct_explain: "Well done! You correctly used simple past verbs (e.g. cooked, went, watched) to describe yesterday's actions.",
    wrong_explain: "Ensure you use the simple past tense (e.g. 'I cooked dinner' or 'I went out') for completed past actions.",
    remedial_prompt: "Yesterday evening, I ______ (cook) dinner.",
    remedial_options: JSON.stringify(["cook", "cooking", "cooked", "have cooked"]),
    remedial_correct: "cooked",
    category: "tenses",
    sort_order: 4
  },
  {
    theme: "daily_life",
    type: "scramble",
    title: "Question Formation Scramble",
    npc_text: null,
    prefix: null,
    check_regex: null,
    correct_answer: "do you like to drink coffee",
    sentence: null,
    correct_explain: "Correct! The question order is Aux (Do) + Subject (you) + Verb (like) + Inf (to drink) + Obj (coffee).",
    wrong_explain: "The correct question is: 'do you like to drink coffee'.",
    remedial_prompt: "______ you like tea?",
    remedial_options: JSON.stringify(["Do", "Does", "Are", "Is"]),
    remedial_correct: "Do",
    category: "question_formation",
    sort_order: 5
  },
  {
    theme: "daily_life",
    type: "correction",
    title: "Subject Plural Verb",
    npc_text: null,
    prefix: null,
    check_regex: null,
    correct_answer: "My parents are going to visit me tomorrow.",
    sentence: "My parents is going to visit me tomorrow.",
    correct_explain: "Spot on! 'My parents' is a plural subject, so it must be paired with 'are' instead of 'is'.",
    wrong_explain: "The subject 'My parents' is plural, so it requires the plural auxiliary verb 'are' (are going to).",
    remedial_prompt: "My friends ______ coming to my house.",
    remedial_options: JSON.stringify(["is", "are", "am", "be"]),
    remedial_correct: "are",
    category: "subject_verb_agreement",
    sort_order: 6
  },
  {
    theme: "daily_life",
    type: "sentence",
    title: "Friend's Action",
    npc_text: "Tell me about your friend. What is he or she doing at the moment?",
    prefix: null,
    check_regex: "is playing|is studying|is working|is sleeping|is watching",
    correct_answer: null,
    sentence: null,
    correct_explain: "Great! You used the present continuous tense (is + verb-ing) correctly to state what someone is doing right now.",
    wrong_explain: "Use the present continuous tense (e.g. 'She is studying' or 'He is playing') for actions happening at the moment.",
    remedial_prompt: "At the moment, he ______ (read) a book.",
    remedial_options: JSON.stringify(["reads", "is reading", "are reading", "readed"]),
    remedial_correct: "is reading",
    category: "tenses",
    sort_order: 7
  },
  {
    theme: "daily_life",
    type: "scramble",
    title: "Sister's Dogs Scramble",
    npc_text: null,
    prefix: null,
    check_regex: null,
    correct_answer: "my sister has two cute dogs",
    sentence: null,
    correct_explain: "Exactly! You successfully structured the possessive description.",
    wrong_explain: "The correct sequence is: 'my sister has two cute dogs'.",
    remedial_prompt: "My brother has a cat. This cat is ______ (belong to him).",
    remedial_options: JSON.stringify(["his", "him", "he", "himself"]),
    remedial_correct: "his",
    category: "pronouns",
    sort_order: 8
  },
  {
    theme: "daily_life",
    type: "correction",
    title: "Countable-Uncountable Error",
    npc_text: null,
    prefix: null,
    check_regex: null,
    correct_answer: "Can you give me some advice about this?",
    sentence: "Can you give me an advice about this?",
    correct_explain: "Excellent! 'Advice' is uncountable, so we use 'some advice' or just 'advice', never 'an advice' or 'advices'.",
    wrong_explain: "'Advice' is an uncountable noun. Do not use the indefinite article 'an' before it.",
    remedial_prompt: "He gave me some useful ______.",
    remedial_options: JSON.stringify(["advice", "advices", "an advice", "some advices"]),
    remedial_correct: "advice",
    category: "plural_singular_countable_uncountable",
    sort_order: 9
  },
  {
    theme: "daily_life",
    type: "sentence",
    title: "Household Help",
    npc_text: "So, who do you live with, and how do you help them around the house?",
    prefix: null,
    check_regex: "them|him|her|my family|parents",
    correct_answer: null,
    sentence: null,
    correct_explain: "Nice job! You correctly used object pronouns (like 'them' or 'her') or appropriate object nouns.",
    wrong_explain: "Make sure you use an object pronoun like 'them' or 'her' when stating who you help.",
    remedial_prompt: "I live with my parents and I help ______ every day.",
    remedial_options: JSON.stringify(["they", "them", "their", "theirs"]),
    remedial_correct: "them",
    category: "pronouns",
    sort_order: 10
  },

  // ==================== TRAVEL ====================
  {
    theme: "travel",
    type: "sentence",
    title: "Hotel Booking",
    npc_text: "Welcome to the Grand Horizon Hotel! How can I help you with your booking?",
    prefix: null,
    check_regex: "would like|want to|like to|book|check in|have a reservation",
    correct_answer: null,
    sentence: null,
    correct_explain: "Polite and correct! You used 'would like to' or polite modal expressions to state your travel request.",
    wrong_explain: "Use polite phrasing like 'I would like to book a room' or 'I want to check in' to interact with hotel staff.",
    remedial_prompt: "Excuse me, ______ I check in now?",
    remedial_options: JSON.stringify(["should", "may", "will", "must"]),
    remedial_correct: "may",
    category: "modal_verbs",
    sort_order: 1
  },
  {
    theme: "travel",
    type: "scramble",
    title: "Upgrade Room Scramble",
    npc_text: null,
    prefix: null,
    check_regex: null,
    correct_answer: "could we upgrade our room please",
    sentence: null,
    correct_explain: "Perfect! You structured a polite request using 'Could we...' and 'please'.",
    wrong_explain: "The correct sequence is: 'could we upgrade our room please'.",
    remedial_prompt: "______ you help me with my bags, please?",
    remedial_options: JSON.stringify(["Could", "Should", "Must", "May"]),
    remedial_correct: "Could",
    category: "modal_verbs",
    sort_order: 2
  },
  {
    theme: "travel",
    type: "correction",
    title: "Preposition of Place Error",
    npc_text: null,
    prefix: null,
    check_regex: null,
    correct_answer: "The train station is at the end of this street.",
    sentence: "The train station is in the end of this street.",
    correct_explain: "Spot on! We use 'at the end of' for specific points or locations.",
    wrong_explain: "Use the preposition 'at' for specific points (at the end of the street).",
    remedial_prompt: "Meet me ______ the airport lobby.",
    remedial_options: JSON.stringify(["in", "on", "at", "under"]),
    remedial_correct: "at",
    category: "prepositions",
    sort_order: 3
  },
  {
    theme: "travel",
    type: "sentence",
    title: "Asking Directions",
    npc_text: "Excuse me, I'm lost. Can you tell me how to get to the nearest metro station?",
    prefix: null,
    check_regex: "go|turn|straight|left|right|at|next to|walk",
    correct_answer: null,
    sentence: null,
    correct_explain: "Great directions! You used action verbs and prepositions of place/movement accurately.",
    wrong_explain: "Give clear directions using prepositions of place/direction (e.g. 'go straight', 'turn left at').",
    remedial_prompt: "Go straight and turn left ______ the traffic lights.",
    remedial_options: JSON.stringify(["in", "on", "at", "under"]),
    remedial_correct: "at",
    category: "prepositions",
    sort_order: 4
  },
  {
    theme: "travel",
    type: "scramble",
    title: "Flight Departure Scramble",
    npc_text: null,
    prefix: null,
    check_regex: null,
    correct_answer: "when will the next flight depart",
    sentence: null,
    correct_explain: "Well done! You correctly formed a future question starting with 'when will'.",
    wrong_explain: "The correct sequence is: 'when will the next flight depart'.",
    remedial_prompt: "What time ______ the bus arrive?",
    remedial_options: JSON.stringify(["do", "does", "is", "has"]),
    remedial_correct: "does",
    category: "question_formation",
    sort_order: 5
  },
  {
    theme: "travel",
    type: "correction",
    title: "Preposition of Time Error",
    npc_text: null,
    prefix: null,
    check_regex: null,
    correct_answer: "We are going to visit Paris in July next year.",
    sentence: "We are going to visit Paris on July next year.",
    correct_explain: "Perfect! We use the preposition 'in' with months (in July, in December).",
    wrong_explain: "Use 'in' for months, years, and seasons (in July). Use 'on' for specific dates and days.",
    remedial_prompt: "My flight is scheduled ______ Friday.",
    remedial_options: JSON.stringify(["in", "on", "at", "for"]),
    remedial_correct: "on",
    category: "prepositions",
    sort_order: 6
  },
  {
    theme: "travel",
    type: "sentence",
    title: "Baggage Delay",
    npc_text: "Attention passenger, we are experiencing some baggage delays. What will you do if your suitcase is lost?",
    prefix: null,
    check_regex: "will|would|claim|complain|report|wait|ask",
    correct_answer: null,
    sentence: null,
    correct_explain: "Excellent conditional response! You correctly matched 'if' clause with a future verb 'will'.",
    wrong_explain: "Respond using a conditional or future verb (e.g. 'I will contact the staff' or 'I will wait').",
    remedial_prompt: "If my suitcase is lost, I ______ file a complaint immediately.",
    remedial_options: JSON.stringify(["will", "would", "am", "going to"]),
    remedial_correct: "will",
    category: "modal_verbs",
    sort_order: 7
  },
  {
    theme: "travel",
    type: "scramble",
    title: "Room Booking Scramble",
    npc_text: null,
    prefix: null,
    check_regex: null,
    correct_answer: "i would like to book a double room",
    sentence: null,
    correct_explain: "Exactly! You successfully structured a polite booking statement.",
    wrong_explain: "The correct sequence is: 'i would like to book a double room'.",
    remedial_prompt: "We ______ like two tickets for the museum, please.",
    remedial_options: JSON.stringify(["would", "will", "can", "should"]),
    remedial_correct: "would",
    category: "modal_verbs",
    sort_order: 8
  },
  {
    theme: "travel",
    type: "correction",
    title: "Superlative Double Marking",
    npc_text: null,
    prefix: null,
    check_regex: null,
    correct_answer: "Excuse me, where is the cheapest hotel around here?",
    sentence: "Excuse me, where is the most cheapest hotel around here?",
    correct_explain: "Correct! We don't combine 'most' with short adjectives that already end in '-est' (cheapest).",
    wrong_explain: "Do not use 'most' with '-est' adjectives. Use 'cheapest', not 'most cheapest'.",
    remedial_prompt: "This is the ______ hotel in the city.",
    remedial_options: JSON.stringify(["cheapest", "most cheapest", "more cheap", "cheaper"]),
    remedial_correct: "cheapest",
    category: "comparative_superlative",
    sort_order: 9
  },
  {
    theme: "travel",
    type: "sentence",
    title: "Customs Entry",
    npc_text: "Hello, did you have a good flight, and how long are you planning to stay in our country?",
    prefix: null,
    check_regex: "for|staying|plan to|intend to|days|weeks|months",
    correct_answer: null,
    sentence: null,
    correct_explain: "Well expressed! You used 'for' followed by a duration (e.g. 'for one week') correctly.",
    wrong_explain: "Use 'for' followed by a duration of time (e.g., 'for ten days') to specify how long you are staying.",
    remedial_prompt: "I am going to stay here ______ two weeks.",
    remedial_options: JSON.stringify(["for", "since", "during", "at"]),
    remedial_correct: "for",
    category: "prepositions",
    sort_order: 10
  },

  // ==================== INTERVIEW / PROFESSIONAL ====================
  {
    theme: "interview",
    type: "sentence",
    title: "Introduce Yourself",
    npc_text: "Welcome to the interview! Can you tell me a little bit about yourself?",
    prefix: null,
    check_regex: "have worked|have been|graduated|am|experience|years",
    correct_answer: null,
    sentence: null,
    correct_explain: "Excellent! Present perfect ('have worked') is perfect for stating your career history or duration of experience.",
    wrong_explain: "Introduce yourself using simple present or present perfect (e.g., 'I have worked in tech for two years').",
    remedial_prompt: "For the past three years, I ______ (work) as a software engineer.",
    remedial_options: JSON.stringify(["worked", "have worked", "working", "work"]),
    remedial_correct: "have worked",
    category: "tenses",
    sort_order: 1
  },
  {
    theme: "interview",
    type: "scramble",
    title: "Graduation Scramble",
    npc_text: null,
    prefix: null,
    check_regex: null,
    correct_answer: "i graduated from university in computer science",
    sentence: null,
    correct_explain: "Perfect! You structured a clear past tense sentence about your education.",
    wrong_explain: "The correct sequence is: 'i graduated from university in computer science'.",
    remedial_prompt: "I ______ (graduate) from college last year.",
    remedial_options: JSON.stringify(["graduated", "graduate", "have graduated", "was graduate"]),
    remedial_correct: "graduated",
    category: "tenses",
    sort_order: 2
  },
  {
    theme: "interview",
    type: "correction",
    title: "Tense Conflict",
    npc_text: null,
    prefix: null,
    check_regex: null,
    correct_answer: "I managed many projects when I was at my previous company.",
    sentence: "I have managed many projects when I was at my previous company.",
    correct_explain: "Exactly! Since you specify a finished time in the past ('when I was...'), you must use simple past ('managed') instead of present perfect.",
    wrong_explain: "Use simple past 'managed' instead of present perfect because of the past time clause 'when I was at my previous company'.",
    remedial_prompt: "Last year, our team ______ (develop) a new mobile application.",
    remedial_options: JSON.stringify(["develops", "developed", "has developed", "developing"]),
    remedial_correct: "developed",
    category: "tenses",
    sort_order: 3
  },
  {
    theme: "interview",
    type: "sentence",
    title: "Interest & Goals",
    npc_text: "Why are you interested in this position, and how does it fit your career goals?",
    prefix: null,
    check_regex: "will|want to|hope to|would like|help|grow|align",
    correct_answer: null,
    sentence: null,
    correct_explain: "Great answer! You expressed future goals and alignment with standard auxiliary verbs or modals.",
    wrong_explain: "State your interest and career alignment using supportive modal verbs (e.g. 'This will help me build...').",
    remedial_prompt: "I believe this position ______ help me grow my leadership skills.",
    remedial_options: JSON.stringify(["will", "would", "must", "should"]),
    remedial_correct: "will",
    category: "modal_verbs",
    sort_order: 4
  },
  {
    theme: "interview",
    type: "scramble",
    title: "Email Follow-up Scramble",
    npc_text: null,
    prefix: null,
    check_regex: null,
    correct_answer: "i am writing to follow up on my interview",
    sentence: null,
    correct_explain: "Excellent! This is a standard and polite sentence for a professional email.",
    wrong_explain: "The correct sequence is: 'i am writing to follow up on my interview'.",
    remedial_prompt: "I am writing to ______ (apply) for the manager position.",
    remedial_options: JSON.stringify(["apply", "applying", "applied", "applies"]),
    remedial_correct: "apply",
    category: "tenses",
    sort_order: 5
  },
  {
    theme: "interview",
    type: "correction",
    title: "Double Comparative Error",
    npc_text: null,
    prefix: null,
    check_regex: null,
    correct_answer: "I am better at coding than my colleagues.",
    sentence: "I am more better at coding than my colleagues.",
    correct_explain: "Spot on! 'Better' is already the comparative form of 'good', so adding 'more' is grammatically incorrect.",
    wrong_explain: "Do not combine 'more' with 'better'. 'Better' is already comparative.",
    remedial_prompt: "She is a ______ communicator than I am.",
    remedial_options: JSON.stringify(["gooder", "better", "more better", "best"]),
    remedial_correct: "better",
    category: "comparative_superlative",
    sort_order: 6
  },
  {
    theme: "interview",
    type: "sentence",
    title: "Challenge Handled",
    npc_text: "Can you describe a challenging situation at work and how you handled it?",
    prefix: null,
    check_regex: "solved|managed|resolved|faced|fixed|handled|communicated",
    correct_answer: null,
    sentence: null,
    correct_explain: "Good narrative! You correctly kept all actions in the simple past tense (e.g. solved, was, did) to describe past events.",
    wrong_explain: "Keep past narratives in the simple past tense (e.g. 'I solved the issue by talking to the team').",
    remedial_prompt: "When the system crashed, I ______ (solve) the problem immediately.",
    remedial_options: JSON.stringify(["solve", "solved", "solving", "has solved"]),
    remedial_correct: "solved",
    category: "tenses",
    sort_order: 7
  },
  {
    theme: "interview",
    type: "scramble",
    title: "Email Closing Scramble",
    npc_text: null,
    prefix: null,
    check_regex: null,
    correct_answer: "i look forward to hearing from you",
    sentence: null,
    correct_explain: "Perfect! 'look forward to' requires a gerund ('hearing') as its object.",
    wrong_explain: "The correct sequence is: 'i look forward to hearing from you'.",
    remedial_prompt: "We look forward to ______ (work) with your company.",
    remedial_options: JSON.stringify(["work", "working", "worked", "works"]),
    remedial_correct: "working",
    category: "prepositions",
    sort_order: 8
  },
  {
    theme: "interview",
    type: "correction",
    title: "Present Perfect with Past Time Marker",
    npc_text: null,
    prefix: null,
    check_regex: null,
    correct_answer: "Our team achieved all the targets last quarter.",
    sentence: "Our team have achieved all the targets last quarter.",
    correct_explain: "Correct! We use the simple past ('achieved') instead of present perfect when there is a specific past time marker ('last quarter').",
    wrong_explain: "Do not use present perfect with past time markers like 'last quarter'. Use simple past 'achieved'.",
    remedial_prompt: "Last month, the company ______ (open) a new branch.",
    remedial_options: JSON.stringify(["open", "opened", "has opened", "was open"]),
    remedial_correct: "opened",
    category: "tenses",
    sort_order: 9
  },
  {
    theme: "interview",
    type: "sentence",
    title: "Why Hire You?",
    npc_text: "What are your main strengths, and why should we hire you over other candidates?",
    prefix: null,
    check_regex: "because|most|qualified|motivated|am|experience|skills|strongest",
    correct_answer: null,
    sentence: null,
    correct_explain: "Impressive! You highlighted your strengths using superlative and comparative structures correctly.",
    wrong_explain: "Explain your strengths using superlatives or comparatives (e.g. 'I am the most qualified candidate because...').",
    remedial_prompt: "I am the ______ (qualified) candidate for this job.",
    remedial_options: JSON.stringify(["most qualified", "more qualified", "qualifiedest", "more qualifieder"]),
    remedial_correct: "most qualified",
    category: "comparative_superlative",
    sort_order: 10
  }
];

async function run() {
  const ca = fs.readFileSync(path.join(__dirname, "../../certs/aiven-ca.pem"));
  const conn = await mysql.createConnection({
    host: process.env.MYSQL_HOST || "grammarpolice-db-mirfanr29-d9e0.h.aivencloud.com",
    port: Number(process.env.MYSQL_PORT) || 12792,
    user: process.env.MYSQL_USER || "avnadmin",
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE || "defaultdb",
    ssl: { ca }
  });

  console.log("Connected successfully to DB!");

  // 1. Add theme column to gate_templates if not exists
  const [cols] = await conn.query("DESCRIBE gate_templates");
  const colNames = cols.map(c => c.Field);
  if (!colNames.includes("theme")) {
    console.log("Adding 'theme' column to gate_templates...");
    await conn.query("ALTER TABLE gate_templates ADD COLUMN theme VARCHAR(50) DEFAULT 'daily_life'");
    console.log("Added 'theme' column.");
  } else {
    console.log("'theme' column already exists in gate_templates.");
  }

  // 2. Create reward_logs table if not exists
  console.log("Checking reward_logs table...");
  await conn.query(`
    CREATE TABLE IF NOT EXISTS reward_logs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      type ENUM('xp', 'coins') NOT NULL,
      amount INT NOT NULL,
      source VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      related_attempt_id INT NULL
    )
  `);
  console.log("reward_logs table checked/created.");

  // 3. Create certifications table if not exists
  console.log("Checking certifications table...");
  await conn.query(`
    CREATE TABLE IF NOT EXISTS certifications (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      scenario_coverage JSON NOT NULL,
      issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log("certifications table checked/created.");

  // 4. Truncate gate_templates and seed the 30 gates
  console.log("Seeding gates...");
  await conn.query("DELETE FROM gate_templates");
  
  for (const g of GATES) {
    await conn.query(`
      INSERT INTO gate_templates (
        theme, type, title, npc_text, prefix, check_regex, 
        correct_answer, sentence, correct_explain, wrong_explain, 
        remedial_prompt, remedial_options, remedial_correct, category, sort_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      g.theme, g.type, g.title, g.npc_text, g.prefix, g.check_regex,
      g.correct_answer, g.sentence, g.correct_explain, g.wrong_explain,
      g.remedial_prompt, g.remedial_options, g.remedial_correct, g.category, g.sort_order
    ]);
  }
  console.log("Successfully seeded 30 gates!");

  await conn.end();
}

run().catch(console.error);
