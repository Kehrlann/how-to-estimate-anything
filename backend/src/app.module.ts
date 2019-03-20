import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminGateway } from './tracking/admin/admin.gateway';
import { EstimationService } from './tracking/estimation.service';
import { ClientGateway } from './tracking/client.gateway';
import { AdminController } from './tracking/admin/admin.controller';

@Module({
  imports: [],
  controllers: [AppController, AdminController],
  providers: [AppService, EstimationService, ClientGateway, AdminGateway],
})
export class AppModule {}
