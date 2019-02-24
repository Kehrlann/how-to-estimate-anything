import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackingService } from './tracking/tracking.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, TrackingService],
})
export class AppModule {}
