import { Controller, Get, HttpStatus, NotFoundException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PARIS_CITY } from '../common/constants';
import { AirQualityHistoryService } from './air-quality-history.service';
import { AirQualityHistoryResponseDto } from './dto/air-quality-history.dto';

@ApiTags('Operations with Air Quality History')
@Controller('/most-polluted-date')
export class AirQualityHistoryController {
  constructor(
    private readonly airQualityHistoryService: AirQualityHistoryService,
  ) {}

  @ApiOperation({
    description:
      'Get most pollution date record for Paris (filtered by max aqius parameter value)',
  })
  @ApiResponse({
    description: `Air quality history was not found for Paris city.`,
    status: HttpStatus.NOT_FOUND,
    type: NotFoundException,
  })
  @Get('/paris')
  findParisMostPollutedDate(): Promise<AirQualityHistoryResponseDto> {
    return this.airQualityHistoryService.getMostPollutedRecordByCity(
      PARIS_CITY,
    );
  }
}
