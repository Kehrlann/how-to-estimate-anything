import { Test, TestingModule } from '@nestjs/testing';
import { ClientGateway } from './client.gateway';
import { EstimationService } from './estimation.service';
import { EstimateFromClient } from '@common/models';
jest.mock('./estimation.service');

describe('ClientGateway', () => {
  let gateway: ClientGateway;
  let estimationService: EstimationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientGateway, EstimationService],
    }).compile();

    gateway = module.get<ClientGateway>(ClientGateway);
    estimationService = (EstimationService as jest.Mock<EstimationService>).mock
      .instances[0];
  });

  afterEach(async () => {
    const estimationServiceMock = EstimationService as jest.Mock<
      EstimationService
    >;
    estimationServiceMock.mockClear();
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('tracks connections', () => {
    gateway.handleConnection({});

    expect(estimationService.addClient).toHaveBeenCalledTimes(1);
  });

  it('tracks disconnects', () => {
    gateway.handleDisconnect({});

    expect(estimationService.removeClient).toHaveBeenCalledTimes(1);
  });

  it('tracks estimates', () => {
    const estimate: EstimateFromClient = {
      clientId: 'one',
      questionId: 1,
      estimate: { min: 1, max: 42 },
    };
    gateway.handleEstimate(null, estimate);

    expect(estimationService.recordEstimate).toHaveBeenCalledWith(estimate);
  });
});
