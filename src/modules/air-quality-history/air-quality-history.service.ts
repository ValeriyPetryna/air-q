import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CRON_TIMEOUT, PARIS_COORDINATES } from '../common/constants';
import { IqairService } from '../iqair-api/iqair.service';
import { AirQualityRepositoryService } from '../db/models/air-quality-repository/air-quality.repository.service';
import { AirQualityDocument } from '../db/models/air-quality-repository/model/air-quality.model';
import { SaveCityAirQualityDto } from './dto/save-city-air-quality.request.dto';
import { AirQualityHistoryResponseDto } from './dto/air-quality-history.dto';

@Injectable()
export class AirQualityHistoryService {
  private readonly logger = new Logger(AirQualityHistoryService.name);

  constructor(
    private iqairApi: IqairService,
    private airQualityRepository: AirQualityRepositoryService,
  ) {}

  async getMostPollutedRecordByCity(
    city: string,
  ): Promise<AirQualityHistoryResponseDto> {
    const result = await this.airQualityRepository.findMostPollutedRecordByCity(
      city,
    );

    if (!result) {
      throw new NotFoundException(
        `Air quality history was not found for ${city} city.`,
      );
    }

    return this.docToDto(result);
  }

  public async saveCityAirQuality(
    saveCityAirQualityDto: SaveCityAirQualityDto,
  ): Promise<boolean> {
    this.logger.debug(`CRON job started...`);

    const response = await this.iqairApi.getCityInfo(saveCityAirQualityDto);

    if (!response || response.status !== 'success') {
      throw new HttpException(
        `Error occured while fetching air quality data`,
        HttpStatus.BAD_REQUEST,
      );
    }

    this.logger.warn(`Data was fetched for city: ${response.data.city}.`);

    await this.airQualityRepository.createAirQualityRecord({
      ...response.data.current.pollution,
      city: response.data.city,
    });

    return true;
  }

  @Cron(CRON_TIMEOUT)
  private async saveParisAirQuality(): Promise<boolean> {
    return await this.saveCityAirQuality(PARIS_COORDINATES);
  }

  private docToDto(doc: AirQualityDocument): AirQualityHistoryResponseDto {
    if (!doc) {
      return undefined;
    }

    const dto: AirQualityHistoryResponseDto = {
      city: doc.city,
      aqius: doc.aqius,
      aqicn: doc.aqicn,
      date: doc.createdAt,
    };

    return dto;
  }
}
