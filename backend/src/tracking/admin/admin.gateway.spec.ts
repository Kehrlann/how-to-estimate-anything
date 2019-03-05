import { Test, TestingModule } from '@nestjs/testing';
import { AdminGateway } from './admin.gateway';
import { Subject, BehaviorSubject } from 'rxjs';
import { TrackingService } from '../tracking.service';

describe('AdminGateway', () => {
  let gateway: AdminGateway;
  let clientCountSubject: BehaviorSubject<number>;

  beforeEach(async () => {
    clientCountSubject = new BehaviorSubject<number>(0);
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminGateway, TrackingService],
    })
      .overrideProvider(TrackingService)
      .useValue({ clientCount$: clientCountSubject })
      .compile();

    gateway = module.get<AdminGateway>(AdminGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  describe('sending client count', () => {
    it('sends clientCount to the admin client', () => {
      const server = { emit: jest.fn() };
      gateway.afterInit(server);
      clientCountSubject.next(42);

      expect(server.emit).toHaveBeenCalledWith('client_count', 42);
    });

    it('sends clientCount when the admin connects, but nothing after that', () => {
      const client = { emit: jest.fn() };

      clientCountSubject.next(24);
      gateway.handleConnection(client);
      clientCountSubject.next(42);

      expect(client.emit).toHaveBeenCalledWith('client_count', 24);
      expect(client.emit).toHaveBeenCalledTimes(1);
    });
  });
});
