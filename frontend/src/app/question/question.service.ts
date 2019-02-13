import { Injectable } from '@angular/core';
import { Question, QuestionWithOrder } from './question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private questions: Question[] = [
    {
      id: 1,
      text: 'Question one ?'
    },
    {
      id: 2,
      text: 'Question two ?'
    }
  ];

  constructor() {}

  getQuestions(): Question[] {
    return this.questions;
  }

  getQuestion(id: number): QuestionWithOrder {
    const question = this.questions.find(q => q.id === id);
    const isLast =
      this.questions.indexOf(question) === this.questions.length - 1;
    return { ...question, isLast };
  }

  getNextQuestion(currentQuestionId: number): Question {
    const next = this.questions.map(q => q.id).indexOf(currentQuestionId) + 1;
    return this.questions[next];
  }

  getFirstQuestion(): Question {
    return this.questions[0];
  }
}
