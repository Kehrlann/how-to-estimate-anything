import { Injectable } from '@nestjs/common';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable()
export class TrackingService {
  private _clientCount = new BehaviorSubject<number>(0);
  get clientCount$(): Observable<number> {
    return this._clientCount;
  }

  addClient(): void {
    this._clientCount.next(this._clientCount.value + 1);
  }

  removeClient(): void {
    this._clientCount.next(Math.max(this._clientCount.value - 1, 0));
  }
}
