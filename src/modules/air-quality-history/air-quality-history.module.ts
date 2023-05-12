import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { IqairModule } from '../iqair-api/iqair.module';
import { AirQualityHistoryService } from './air-quality-history.service';
import { AirQualityHistoryController } from './air-quality-history.controller';
import { AirQualityRepositoryModule } from '../db/models/air-quality-repository/air-quality.repository.module';

@Module({
  controllers: [AirQualityHistoryController],
  imports: [ScheduleModule.forRoot(), IqairModule, AirQualityRepositoryModule],
  providers: [AirQualityHistoryService],
  exports: [AirQualityHistoryService],
})
export class AirQualityHistoryModule {}
