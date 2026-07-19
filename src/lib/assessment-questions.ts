export interface AssessmentQuestion {
  id: number;
  question: string;
  category: string;
  correctAnswer: string;
  explanation: string;
  options: string[];
}

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // 1. Tenses
  {
    id: 1,
    question: "She usually _____ to campus by bus.",
    category: "tenses",
    correctAnswer: "goes",
    explanation: "We use 'goes' because 'she' is a third-person singular subject in simple present tense.",
    options: ["go", "goes"]
  },
  {
    id: 2,
    question: "Right now, I _____ for my exam.",
    category: "tenses",
    correctAnswer: "am studying",
    explanation: "We use 'am studying' (present continuous) because of the time marker 'right now'.",
    options: ["study", "am studying"]
  },
  {
    id: 3,
    question: "I _____ my homework yesterday.",
    category: "tenses",
    correctAnswer: "finished",
    explanation: "We use 'finished' (past simple) because 'yesterday' specifies a completed time in the past.",
    options: ["have finished", "finished"]
  },
  {
    id: 4,
    question: "Tomorrow, we _____ our grandparents.",
    category: "tenses",
    correctAnswer: "will visit",
    explanation: "We use 'will visit' for a future plan marked by 'tomorrow'.",
    options: ["will visit", "visiting"]
  },
  // 2. Subject-verb agreement
  {
    id: 5,
    question: "My brother ___ two dogs at home.",
    category: "subject_verb_agreement",
    correctAnswer: "has",
    explanation: "My brother is a singular subject, so it takes the singular verb 'has'.",
    options: ["have", "has"]
  },
  {
    id: 6,
    question: "The students ___ working on their project.",
    category: "subject_verb_agreement",
    correctAnswer: "are",
    explanation: "The students is a plural subject, so it takes the plural verb 'are'.",
    options: ["is", "are"]
  },
  // 3. Articles (a/an/the)
  {
    id: 7,
    question: "I saw ___ elephant at the zoo yesterday.",
    category: "articles",
    correctAnswer: "an",
    explanation: "We use 'an' because the next word 'elephant' starts with a vowel sound.",
    options: ["a", "an"]
  },
  {
    id: 8,
    question: "Can you close ___ door, please?",
    category: "articles",
    correctAnswer: "the",
    explanation: "We use 'the' because it refers to a specific door that both speaker and listener know.",
    options: ["a", "the"]
  },
  // 4. Prepositions
  {
    id: 9,
    question: "The meeting is scheduled ___ Monday morning.",
    category: "prepositions",
    correctAnswer: "on",
    explanation: "We use 'on' before days of the week (like Monday).",
    options: ["in", "on", "at"]
  },
  {
    id: 10,
    question: "She was born ___ 2003.",
    category: "prepositions",
    correctAnswer: "in",
    explanation: "We use 'in' for years (like 2003).",
    options: ["in", "on", "at"]
  },
  // 5. Word order / question formation
  {
    id: 11,
    question: 'Susun jadi kalimat tanya yang benar: "you / do / like / coffee?"',
    category: "word_order_question_formation",
    correctAnswer: "Do you like coffee?",
    explanation: "The correct question structure is Aux (Do) + Subject (you) + Verb (like) + Object (coffee)?",
    options: ["Do you like coffee?", "You do like coffee?", "Like you do coffee?"]
  },
  // 6. Plural/singular & countable-uncountable
  {
    id: 12,
    question: "I need some ___.",
    category: "plural_singular_countable_uncountable",
    correctAnswer: "information",
    explanation: "'Information' is an uncountable noun and does not have a plural form like 'informations'.",
    options: ["informations", "information"]
  },
  // 7. Pronouns
  {
    id: 13,
    question: "This gift is for ___.",
    category: "pronouns",
    correctAnswer: "her",
    explanation: "After a preposition (for), we use an object pronoun like 'her'.",
    options: ["she", "her"]
  },
  // 8. Modal verbs
  {
    id: 14,
    question: "You ___ wear a seatbelt while driving.",
    category: "modal_verbs",
    correctAnswer: "should",
    explanation: "'Should' is used to express recommendation or obligation, which fits driving safety.",
    options: ["should", "can"]
  },
  // 9. Comparative/superlative
  {
    id: 15,
    question: "This laptop is ___ than my old one.",
    category: "comparative_superlative",
    correctAnswer: "cheaper",
    explanation: "The comparative form of the short adjective 'cheap' is 'cheaper' (adding -er + than).",
    options: ["cheap", "cheaper", "more cheap"]
  }
];

export function verifyAnswer(userAnswer: string, questionId: number): { isCorrect: boolean; score: number; feedback: string } {
  const q = ASSESSMENT_QUESTIONS.find(item => item.id === questionId);
  if (!q) {
    return { isCorrect: false, score: 0, feedback: "Question not found." };
  }

  const ans = userAnswer.toLowerCase().trim();
  const correct = q.correctAnswer.toLowerCase().trim();

  // Direct matches
  const isCorrect = ans === correct;

  return {
    isCorrect,
    score: isCorrect ? 100 : 0,
    feedback: isCorrect
      ? `Correct! ${q.explanation}`
      : `Incorrect. The correct answer is "${q.correctAnswer}". ${q.explanation}`
  };
}
