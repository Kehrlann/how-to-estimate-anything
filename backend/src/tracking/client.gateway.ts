import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { TrackingService } from './tracking.service';

@WebSocketGateway({ namespace: 'client' })
export class ClientGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private trackingService: TrackingService) {}

  handleConnection(client: any, ...args: any[]) {
    this.trackingService.addClient();
  }

  handleDisconnect(client: any) {
    this.trackingService.removeClient();
  }
}
