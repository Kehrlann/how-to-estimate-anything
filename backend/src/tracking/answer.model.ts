export interface AnswerMessage {
  clientId: string;
  questionId: number;
  answer: { min: number; max: number };
}
