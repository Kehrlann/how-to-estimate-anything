import { Injectable } from '@angular/core';
import { SocketIoService } from '../socket-io.service';
import { Socket } from 'socket.io';
import * as uuid from 'uuid/v4';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {
  private socket: Socket;
  private id: string = uuid();

  constructor(private socketIoService: SocketIoService) {
    // TODO: throttle reconnects
    this.socket = this.socketIoService.io('/client');
  }

  reportAnswer(questionId: number, min: number, max: number) {
    this.socket.emit('answer', {
      clientId: this.id,
      questionId,
      answer: { min, max }
    });
  }
}
