import { Injectable, NotFoundException } from '@nestjs/common';
import { IqairService } from '../iqair-api/iqair.service';
import { CheckAirQualityDto } from './dto/check-air-quality.dto';
import { AirQualityResponseDto } from './dto/air-quality.response.dto';

@Injectable()
export class AirQualityService {
  constructor(private iqairApi: IqairService) {}

  async checkAirQuality(
    checkAirQualityDto: CheckAirQualityDto,
  ): Promise<AirQualityResponseDto> {
    const result = await this.iqairApi.getCityInfo({
      lon: +checkAirQualityDto.longitude,
      lat: +checkAirQualityDto.latitude,
    });

    if (!result || result.status === 'fail') {
      throw new NotFoundException('City not found by current parameters.');
    }

    return {
      Result: {
        City: result.data.city,
        Pollution: result.data.current.pollution,
      },
    };
  }
}
