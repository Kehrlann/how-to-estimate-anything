import * as data from '@common/data';
import { Test, TestingModule } from '@nestjs/testing';
import { take } from 'rxjs/operators';
import { EstimationService } from './estimation.service';
import { QuestionWithAnswer } from '@common/models';

describe('EstimationService', () => {
  let service: EstimationService;
  let getQuestionsMock: jest.SpyInstance;

  beforeEach(async () => {
    getQuestionsMock = jest.spyOn(data, 'getQuestions');
    getQuestionsMock.mockReturnValue([
      { id: 1, text: 'one', answer: 0 },
      { id: 2, text: 'two', answer: 0 },
    ]);

    const module: TestingModule = await Test.createTestingModule({
      providers: [EstimationService],
    }).compile();

    service = module.get<EstimationService>(EstimationService);
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
    it('starts with zero for every question', async () => {
      const estimates = await service.estimateCount$.pipe(take(1)).toPromise();
      expect(estimates).toEqual({ 1: 0, 2: 0 });
    });

    it('tracks estimates', async () => {
      service.recordEstimate({
        clientId: 'one',
        questionId: 1,
        estimate: { min: 42, max: 1337 },
      });

      service.recordEstimate({
        clientId: 'two',
        questionId: 1,
        estimate: { min: 2, max: 6.5 },
      });

      service.recordEstimate({
        clientId: 'one',
        questionId: 2,
        estimate: { min: 1, max: 5 },
      });

      const estimates = await service.estimateCount$.pipe(take(1)).toPromise();
      expect(estimates).toEqual({ 1: 2, 2: 1 });
    });
  });

  describe('report results', () => {
    beforeEach(() => {
      getQuestionsMock.mockReturnValue([
        { id: 1, text: 'one', answer: 1 },
        { id: 2, text: 'two', answer: 2 },
        { id: 3, text: 'three', answer: 3 },
      ] as QuestionWithAnswer[]);
    });

    it('reports how many answers estimators got right', () => {
      // estimator one is 100% correct ; testing min and max
      service.recordEstimate({
        clientId: 'one',
        questionId: 1,
        estimate: { min: -10, max: 1 },
      });
      service.recordEstimate({
        clientId: 'one',
        questionId: 2,
        estimate: { min: 2, max: 10 },
      });
      service.recordEstimate({
        clientId: 'one',
        questionId: 3,
        estimate: { min: -10, max: 10 },
      });

      // estimator two has one right and is missing one
      service.recordEstimate({
        clientId: 'two',
        questionId: 1,
        estimate: { min: -10, max: 10 },
      });
      service.recordEstimate({
        clientId: 'two',
        questionId: 2,
        estimate: { min: 1000, max: 1001 },
      });

      expect(service.getReport()).toEqual([
        { correctAnswers: 3, unanswered: 0, total: 3 },
        { correctAnswers: 1, unanswered: 1, total: 3 },
      ]);
    });
  });
});
