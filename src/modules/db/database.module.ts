import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AirQuality,
  AirQualitySchema,
} from './models/air-quality-repository/model/air-quality.model';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: `${configService.get('DB_URI')}/${configService.get('DB_NAME')}`,
      }),
    }),
    MongooseModule.forFeature([
      { name: AirQuality.name, schema: AirQualitySchema },
    ]),
  ],
  providers: [],
  exports: [MongooseModule],
})
export class DatabaseModule {}
