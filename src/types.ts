export interface Question {
  id: number;
  questionGu: string;
  questionEn: string;
  optionsGu: string[];
  optionsEn: string[];
  correctAnswer: number; // 0-based index
  explanationGu: string;
  explanationEn: string;
  categoryGu: string;
  categoryEn: string;
  factGu: string;
  factEn: string;
  difficulty: 'Easy' | 'Medium' | 'Standard 8';
}

export type LanguageMode = 'gu' | 'en' | 'both';

export type ActiveTab = 'quiz' | 'study' | 'flashcards' | 'print' | 'certificate';

export interface QuizState {
  currentQuestionIndex: number;
  selectedAnswers: Record<number, number>; // questionId -> optionIndex
  showExplanation: boolean;
  isCompleted: boolean;
  score: number;
  timeSpentSeconds: number;
  eliminatedOptions: Record<number, number[]>; // questionId -> list of eliminated option indexes for 50-50
  hintUsed: Record<number, boolean>;
  lifelines: {
    fiftyFifty: boolean;
    hint: boolean;
  };
}

export interface StudentCertificateInfo {
  studentName: string;
  rollNumber: string;
  schoolName: string;
  score: number;
  totalMarks: number;
  date: string;
  standard: string;
}
