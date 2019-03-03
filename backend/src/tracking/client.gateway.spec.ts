import { Test, TestingModule } from '@nestjs/testing';
import { ClientGateway } from './client.gateway';
import { TrackingService } from './tracking.service';
jest.mock('./tracking.service');

describe('ClientGateway', () => {
  let gateway: ClientGateway;
  let trackingService: TrackingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientGateway, TrackingService],
    }).compile();

    gateway = module.get<ClientGateway>(ClientGateway);
    trackingService = (TrackingService as jest.Mock<TrackingService>).mock
      .instances[0];
  });

  afterEach(async () => {
    const trackingServiceMock = TrackingService as jest.Mock<TrackingService>;
    trackingServiceMock.mockClear();
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('tracks connections', () => {
    gateway.handleConnection({});

    expect(trackingService.addClient).toHaveBeenCalledTimes(1);
  });

  it('tracks disconnects', () => {
    gateway.handleDisconnect({});

    expect(trackingService.removeClient).toHaveBeenCalledTimes(1);
  });
});
