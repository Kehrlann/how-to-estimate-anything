import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminGateway } from './tracking/admin/admin.gateway';
import { TrackingService } from './tracking/tracking.service';
import { ClientGateway } from './tracking/client.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, TrackingService, ClientGateway, AdminGateway],
})
export class AppModule {}
