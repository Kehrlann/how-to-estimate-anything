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
});
