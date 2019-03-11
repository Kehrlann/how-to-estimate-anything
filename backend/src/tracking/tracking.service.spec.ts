import { Test, TestingModule } from '@nestjs/testing';
import { TrackingService } from './tracking.service';
import { take } from 'rxjs/operators';

describe('TrackingService', () => {
  let service: TrackingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrackingService],
    }).compile();

    service = module.get<TrackingService>(TrackingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('number of consumers', () => {
    const getNumberOfClients = async () => {
      return service.clientCount$.pipe(take(1)).toPromise();
    };

    it('starts at zero', async () => {
      const numberOfClients = await getNumberOfClients();
      expect(numberOfClients).toBe(0);
    });

    it('publishes the number of consumers', async () => {
      service.addClient();
      service.addClient();
      service.addClient();
      service.removeClient();

      const numberOfClients = await getNumberOfClients();
      expect(numberOfClients).toBe(2);
    });

    it(`doesn't fall below 0`, async () => {
      service.removeClient();

      const numberOfClients = await getNumberOfClients();
      expect(numberOfClients).toBe(0);
    });

    it('replays the latest value', async () => {
      const first = await getNumberOfClients();
      const second = await getNumberOfClients();
      expect(first).toBe(0);
      expect(second).toBe(0);
    });
  });

  describe('estimate count', () => {
    it('tracks estimates', async () => {
      service.recoredEstimate({
        clientId: 'one',
        questionId: 1,
        estimate: { min: 42, max: 1337 },
      });

      service.recoredEstimate({
        clientId: 'one',
        questionId: 5,
        estimate: { min: 1, max: 5 },
      });

      service.recoredEstimate({
        clientId: 'two',
        questionId: 5,
        estimate: { min: 2, max: 6.5 },
      });

      const estimates = await service.estimateCount$.pipe(take(1)).toPromise();
      expect(estimates).toEqual({ 1: 1, 5: 2 });
    });
  });
});
