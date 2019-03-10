export interface Question {
  id: number;
  text: string;
  min?: number;
  max?: number;
}

export interface QuestionWithOrder extends Question {
  isLast: boolean;
}

export interface Answer {
  min: number;
  max: number;
}

export interface Answers {
  [key: string]: Answer;
}
