import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  SubscribeMessage,
} from '@nestjs/websockets';
import { EstimationService } from './estimation.service';
import { EstimateFromClient } from '@common/models';

@WebSocketGateway({ namespace: 'client' })
export class ClientGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private estimationService: EstimationService) {}

  handleConnection(client: any, ...args: any[]) {
    this.estimationService.addClient();
  }

  handleDisconnect(client: any) {
    this.estimationService.removeClient();
  }

  @SubscribeMessage('estimate')
  handleEstimate(client, estimate: EstimateFromClient) {
    this.estimationService.recordEstimate(estimate);
  }
}
