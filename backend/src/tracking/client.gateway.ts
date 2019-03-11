import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  SubscribeMessage,
} from '@nestjs/websockets';
import { TrackingService } from './tracking.service';
import { EstimateFromClient } from '@common/models';

@WebSocketGateway({ namespace: 'client' })
export class ClientGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private trackingService: TrackingService) {}

  handleConnection(client: any, ...args: any[]) {
    this.trackingService.addClient();
  }

  handleDisconnect(client: any) {
    this.trackingService.removeClient();
  }

  @SubscribeMessage('estimate')
  handleEstimate(client, estimate: EstimateFromClient) {
    this.trackingService.recoredEstimate(estimate);
  }
}
