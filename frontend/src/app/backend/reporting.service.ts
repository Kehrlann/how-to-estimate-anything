import { Injectable } from '@angular/core';
import { SocketIoService } from '../socket-io.service';
import { Socket } from 'socket.io';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {
  private socket: Socket;
  constructor(private socketIoService: SocketIoService) {
    // TODO: throttle reconnects
    this.socket = this.socketIoService.io('/client');
  }

  reportAnswer(questionId: number, min: number, max: number) {
    this.socket.emit('answer', { id: questionId, min, max });
  }
}
