import { Module } from '@nestjs/common';
import { IqairModule } from '../iqair-api/iqair.module';
import { AirQualityService } from './air-quality.service';
import { AirQualityController } from './air-quality.controller';

@Module({
  imports: [IqairModule],
  controllers: [AirQualityController],
  providers: [AirQualityService],
})
export class AirQualityModule {}
