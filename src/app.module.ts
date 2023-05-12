import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/db/database.module';
import { AirQualityModule } from './modules/air-quality/air-quality.module';
import { AirQualityHistoryModule } from './modules/air-quality-history/air-quality-history.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AirQualityModule,
    AirQualityHistoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
