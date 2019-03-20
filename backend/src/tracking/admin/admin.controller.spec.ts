import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { EstimationService } from '../estimation.service';

describe('Admin Controller', () => {
  let controller: AdminController;
  let reportSpy: jest.Mock;

  beforeEach(async () => {
    reportSpy = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
    })
      .overrideProvider(EstimationService)
      .useValue({
        getReport: reportSpy,
      })
      .compile();

    controller = module.get<AdminController>(AdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('reports current estimates', () => {
    const report = [];
    reportSpy.mockReturnValue(report);

    expect(controller.getReport()).toBe(report);
  });
});
