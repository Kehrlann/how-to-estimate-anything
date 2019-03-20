import { Controller, Get } from '@nestjs/common';
import { Report } from '@common/models';
import { EstimationService } from '../estimation.service';

@Controller('admin')
export class AdminController {
  constructor(private estimationService: EstimationService) {}

  @Get('report')
  getReport(): Report[] {
    return this.estimationService.getReport();
  }
}
