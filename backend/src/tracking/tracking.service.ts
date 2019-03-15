import { EstimateFromClient } from '@common/models';
import { Injectable } from '@nestjs/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class TrackingService {
  private _clientCount = new BehaviorSubject<number>(0);
  private _estimateCount = new BehaviorSubject<{ [id: string]: number }>({});
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
    const currentEstimates = this._estimateCount.value;
    const currentCount = currentEstimates[message.questionId] || 0;
    this._estimateCount.next({
      ...currentEstimates,
      [message.questionId]: currentCount + 1,
    });
  }
}
