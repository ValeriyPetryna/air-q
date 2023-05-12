import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AirQuality, AirQualityDocument } from './model/air-quality.model';
import { CreateAirQualityDao } from './dao/create-air-quality.dao';

@Injectable()
export class AirQualityRepositoryService {
  constructor(
    @InjectModel(AirQuality.name)
    private airQualityModel: Model<AirQualityDocument>,
  ) {}

  async createAirQualityRecord(
    createAirQualityDao: CreateAirQualityDao,
  ): Promise<AirQualityDocument> {
    const newRecord = new this.airQualityModel(createAirQualityDao);

    return await newRecord.save();
  }

  async findMostPollutedRecordByCity(
    city: string,
  ): Promise<AirQualityDocument> {
    const record = await this.airQualityModel
      .find({ city })
      .sort({ score: -1 })
      .limit(1);

    return record.pop();
  }
}
