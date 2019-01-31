import { Injectable } from '@angular/core';
import { Question } from './question.model';

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

  getQuestion(id: number): Question {
    return this.questions.find(q => q.id === id);
  }

  getNextQuestion(currentQuestionId: number): Question {
    const next = this.questions.map(q => q.id).indexOf(currentQuestionId) + 1;
    return this.questions[next];
  }
}
