import { Answer } from '@common/question.model';

export interface AnswerMessage {
  clientId: string;
  questionId: number;
  answer: Answer;
}
