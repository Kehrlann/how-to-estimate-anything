import { Injectable } from '@angular/core';
import { SocketIoService } from '../socket-io.service';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {
  constructor(private socketIoService: SocketIoService) {
    this.socketIoService.io('/client');
  }

  reportAnswer(questionId: number, min: number, max: number) {
    // TODO: implement
  }
}
