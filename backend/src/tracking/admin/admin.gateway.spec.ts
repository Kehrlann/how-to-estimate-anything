import { Test, TestingModule } from '@nestjs/testing';
import { BehaviorSubject } from 'rxjs';
import { EstimationService } from '../estimation.service';
import { AdminGateway } from './admin.gateway';

describe('AdminGateway', () => {
  let gateway: AdminGateway;
  let clientCountSubject: BehaviorSubject<number>;
  let estimateCountSubject: BehaviorSubject<{ [id: string]: number }>;

  beforeEach(async () => {
    clientCountSubject = new BehaviorSubject<number>(0);
    estimateCountSubject = new BehaviorSubject({});
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminGateway, EstimationService],
    })
      .overrideProvider(EstimationService)
      .useValue({
        clientCount$: clientCountSubject,
        estimateCount$: estimateCountSubject,
      })
      .compile();

    gateway = module.get<AdminGateway>(AdminGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  describe('sending client count', () => {
    it('sends clientCount to the admin client on update', () => {
      const server = { emit: jest.fn() };
      gateway.afterInit(server);
      clientCountSubject.next(42);

      expect(server.emit).toHaveBeenCalledWith('client_count', 42);
    });

    it('proactively sends clientCount when the admin connects, once', () => {
      const client = { emit: jest.fn() };

      clientCountSubject.next(24);
      gateway.handleConnection(client);
      clientCountSubject.next(42);

      expect(client.emit).toHaveBeenCalledWith('client_count', 24);
      const clientCountCalls = client.emit.mock.calls.filter(
        call => call[0] === 'client_count',
      );
      expect(clientCountCalls).toHaveLength(1);
    });
  });

  describe('sending estimates', () => {
    it('sends estimate count to the admin client on update', () => {
      const server = { emit: jest.fn() };
      gateway.afterInit(server);
      estimateCountSubject.next({ 1: 42 });

      expect(server.emit).toHaveBeenCalledWith('estimate_count', { 1: 42 });
    });

    it('proactively sends clientCount when the admin connects, once', () => {
      const client = { emit: jest.fn() };

      estimateCountSubject.next({ 1: 1 });
      gateway.handleConnection(client);
      clientCountSubject.next(42);

      expect(client.emit).toHaveBeenCalledWith('estimate_count', { 1: 1 });
      const estimateCountCalls = client.emit.mock.calls.filter(
        call => call[0] === 'estimate_count',
      );
      expect(estimateCountCalls).toHaveLength(1);
    });
  });
});
