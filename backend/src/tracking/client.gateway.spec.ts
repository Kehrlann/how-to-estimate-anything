import { Test, TestingModule } from '@nestjs/testing';
import { ClientGateway } from './client.gateway';
import { TrackingService } from './tracking.service';
import { EstimateFromClient } from '@common/models';
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

  it('tracks estimates', () => {
    const estimate: EstimateFromClient = {
      clientId: 'one',
      questionId: 1,
      estimate: { min: 1, max: 42 },
    };
    gateway.handleEstimate(null, estimate);

    expect(trackingService.recoredEstimate).toHaveBeenCalledWith(estimate);
  });
});
