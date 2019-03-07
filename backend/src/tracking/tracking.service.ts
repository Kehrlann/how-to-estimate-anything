import { Injectable } from '@nestjs/common';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AnswerMessage } from './answer.model';

@Injectable()
export class TrackingService {
  private _clientCount = new BehaviorSubject<number>(0);
  private _answerCount = new BehaviorSubject<{ [id: string]: number }>({});
  get clientCount$(): Observable<number> {
    return this._clientCount;
  }

  get answerCount$(): Observable<{ [id: string]: number }> {
    return this._answerCount;
  }

  addClient(): void {
    this._clientCount.next(this._clientCount.value + 1);
  }

  removeClient(): void {
    this._clientCount.next(Math.max(this._clientCount.value - 1, 0));
  }

  addAnswer(answerMessage: AnswerMessage) {
    const currentAnswers = this._answerCount.value;
    const currentCount = currentAnswers[answerMessage.questionId] || 0;
    this._answerCount.next({
      ...currentAnswers,
      [answerMessage.questionId]: currentCount + 1,
    });
  }
}
