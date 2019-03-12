import {
  OnGatewayInit,
  WebSocketGateway,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { TrackingService } from '../tracking.service';
import { take } from 'rxjs/operators';

@WebSocketGateway({ namespace: 'admin' })
export class AdminGateway implements OnGatewayInit, OnGatewayConnection {
  constructor(private trackingService: TrackingService) {}

  afterInit(server: any) {
    this.trackingService.clientCount$.subscribe(count =>
      server.emit('client_count', count),
    );
    this.trackingService.estimateCount$.subscribe(count =>
      server.emit('estimate_count', count),
    );
  }

  handleConnection(client: any, ...args: any[]) {
    // this works because clientCount$ is a BehaviorSubject and will give the last known value
    this.trackingService.clientCount$
      .pipe(take(1))
      .subscribe(count => client.emit('client_count', count));

    // this works because estimateCount$ is a BehaviorSubject and will give the last known value
    this.trackingService.estimateCount$
      .pipe(take(1))
      .subscribe(count => client.emit('estimate_count', count));
  }
}
