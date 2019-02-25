import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackingService } from './tracking/tracking.service';
import { ClientGateway } from './trakcing/client.gateway';
import { ClientGateway } from './tracking/client.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, TrackingService, ClientGateway],
})
export class AppModule {}
