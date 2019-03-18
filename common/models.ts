export interface Question {
  id: number;
  text: string;
  min?: number;
  max?: number;
}

export interface QuestionWithOrder extends Question {
  isLast: boolean;
}

export interface QuestionWithAnswer extends Question {
  answer: number;
}

export interface Estimate {
  min: number;
  max: number;
}

export interface Estimates {
  [key: string]: Estimate;
}

export interface EstimateFromClient {
  clientId: string;
  questionId: number;
  estimate: Estimate;
}

export interface Report {
  correctAnswers: number;
  unanswered: number;
  total: number;
}
