import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { TrackingService } from './tracking.service';

@WebSocketGateway()
export class ClientGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private trackingService: TrackingService) {}

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  handleConnection(client: any, ...args: any[]) {
    this.trackingService.addClient();
  }

  handleDisconnect(client: any) {
    this.trackingService.removeClient();
  }
}
