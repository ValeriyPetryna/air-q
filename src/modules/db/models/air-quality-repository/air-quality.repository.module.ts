import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AirQuality, AirQualitySchema } from './model/air-quality.model';
import { AirQualityRepositoryService } from './air-quality.repository.service';

@Module({
  exports: [AirQualityRepositoryService],
  imports: [
    MongooseModule.forFeature([
      { name: AirQuality.name, schema: AirQualitySchema },
    ]),
  ],
  providers: [AirQualityRepositoryService],
})
export class AirQualityRepositoryModule {}
