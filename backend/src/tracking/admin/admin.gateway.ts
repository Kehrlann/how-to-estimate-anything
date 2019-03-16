import {
  OnGatewayInit,
  WebSocketGateway,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { EstimationService } from '../estimation.service';
import { take } from 'rxjs/operators';

@WebSocketGateway({ namespace: 'admin' })
export class AdminGateway implements OnGatewayInit, OnGatewayConnection {
  constructor(private estimationService: EstimationService) {}

  afterInit(server: any) {
    this.estimationService.clientCount$.subscribe(count =>
      server.emit('client_count', count),
    );
    this.estimationService.estimateCount$.subscribe(count =>
      server.emit('estimate_count', count),
    );
  }

  handleConnection(client: any, ...args: any[]) {
    // this works because clientCount$ is a BehaviorSubject and will give the last known value
    this.estimationService.clientCount$
      .pipe(take(1))
      .subscribe(count => client.emit('client_count', count));

    // this works because estimateCount$ is a BehaviorSubject and will give the last known value
    this.estimationService.estimateCount$
      .pipe(take(1))
      .subscribe(count => client.emit('estimate_count', count));
  }
}
