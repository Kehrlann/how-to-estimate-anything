import { Injectable, InjectionToken, Inject } from '@angular/core';
import { Question, QuestionWithOrder, Estimates } from '@common/models';
import { ReportingService } from '../backend/reporting.service';
import { getQuestions } from '@common/data';

// must be defined first !
export const QUESTION_DB = new InjectionToken<QuestionDb>('question.db');

interface QuestionDb {
  getQuestions(): Question[];
}

// TODO: inject local storage ?
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private get questions(): Question[] {
    return this.questionDb
      .getQuestions()
      .map(q => ({ ...q, ...this.estimates[q.id] }));
  }

  private estimates: Estimates = {};

  constructor(
    @Inject(QUESTION_DB) private questionDb: QuestionDb,
    private reportingService: ReportingService
  ) {}

  getQuestions(): Question[] {
    return this.questions;
  }

  getQuestion(id: number): QuestionWithOrder {
    const question = this.questions.find(q => q.id === id);
    const isLast =
      this.questions.findIndex(q => q.id === id) === this.questions.length - 1;
    return { ...question, isLast };
  }

  getNextQuestion(currentQuestionId: number): Question {
    const next = this.questions.map(q => q.id).indexOf(currentQuestionId) + 1;
    return this.questions[next];
  }

  getFirstQuestion(): Question {
    return this.questions[0];
  }

  saveEstimate(id: number, min: number, max: number) {
    this.estimates[id] = { min, max };
    this.reportingService.reportEstimate(id, min, max);
  }
}
