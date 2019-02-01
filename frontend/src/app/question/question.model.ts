export interface Question {
  id: number;
  text: string;
  min?: number;
  max?: number;
}

export interface QuestionWithOrder extends Question {
  isLast: boolean;
}
