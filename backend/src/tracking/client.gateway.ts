import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  SubscribeMessage,
} from '@nestjs/websockets';
import { TrackingService } from './tracking.service';
import { AnswerMessage } from './answer.model';

@WebSocketGateway({ namespace: 'client' })
export class ClientGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private trackingService: TrackingService) {}

  handleConnection(client: any, ...args: any[]) {
    this.trackingService.addClient();
  }

  handleDisconnect(client: any) {
    this.trackingService.removeClient();
  }

  @SubscribeMessage('answer')
  handleAnswer(client, answerMessage: AnswerMessage) {
    this.trackingService.addAnswer(answerMessage);
  }
}
