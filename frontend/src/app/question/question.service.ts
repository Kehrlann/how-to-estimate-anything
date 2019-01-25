import { Injectable } from '@angular/core';
import { Question } from './question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private questions: Question[] = [
    {
      id: 1,
      text: 'Question one ?',
      answered: false
    },
    {
      id: 2,
      text: 'Question two ?',
      answered: false
    }
  ];

  constructor() {}

  getQuestions(): Question[] {
    return this.questions;
  }

  getQuestion(id: number): Question {
    return this.questions.find(q => q.id === id);
  }
}
