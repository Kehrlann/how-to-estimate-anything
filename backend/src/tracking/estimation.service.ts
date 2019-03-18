import { getQuestions } from '@common/data';
import {
  EstimateFromClient,
  QuestionWithAnswer,
  Report as EstimationReport,
} from '@common/models';
import { Injectable } from '@nestjs/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class EstimationService {
  private _clientCount = new BehaviorSubject<number>(0);
  private _estimateCount = new BehaviorSubject<{ [id: string]: number }>(
    getQuestions().reduce((acc, question) => {
      acc[question.id] = 0;
      return acc;
    }, {}),
  );
  private _estimates: EstimateFromClient[] = [];

  get clientCount$(): Observable<number> {
    return this._clientCount;
  }

  get estimateCount$(): Observable<{ [id: string]: number }> {
    return this._estimateCount;
  }

  addClient(): void {
    this._clientCount.next(this._clientCount.value + 1);
  }

  removeClient(): void {
    this._clientCount.next(Math.max(this._clientCount.value - 1, 0));
  }

  recordEstimate(message: EstimateFromClient) {
    this._estimates.push(message);

    const currentEstimates = this._estimateCount.value;
    const currentCount = currentEstimates[message.questionId] || 0;
    this._estimateCount.next({
      ...currentEstimates,
      [message.questionId]: currentCount + 1,
    });
  }

  getReport(): EstimationReport[] {
    const questionById: { [id: string]: QuestionWithAnswer } = {};
    for (const question of getQuestions()) {
      questionById[question.id] = question;
    }

    const reportByClientId: { [id: string]: EstimationReport } = {};

    for (const estimate of this._estimates) {
      // TODO: benchmark whether calling getQuestions once is faster
      const defaultReport = {
        correctAnswers: 0,
        unanswered: getQuestions().length,
        total: getQuestions().length,
      };
      const report = (reportByClientId[estimate.clientId] =
        reportByClientId[estimate.clientId] || defaultReport);

      const isCorrect =
        questionById[estimate.questionId].answer >= estimate.estimate.min &&
        questionById[estimate.questionId].answer <= estimate.estimate.max;

      if (isCorrect) {
        report.correctAnswers++;
      }
      report.unanswered--;
    }

    return Object.values(reportByClientId);
  }
}
