import { Answer } from '@common/models';

export interface AnswerMessage {
  clientId: string;
  questionId: number;
  answer: Answer;
}
