import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AirQualityService } from './air-quality.service';
import { CheckAirQualityDto } from './dto/check-air-quality.dto';
import { AirQualityResponseDto } from './dto/air-quality.response.dto';

@ApiTags('Fetch Air Quality')
@Controller('air-quality')
export class AirQualityController {
  constructor(private readonly airQualityService: AirQualityService) {}

  @ApiOperation({
    description: 'Get nearest city pollution by longitude and latitude',
  })
  @ApiResponse({
    description: `City not found by current parameters.`,
    status: HttpStatus.NOT_FOUND,
    type: NotFoundException,
  })
  @ApiResponse({
    description:
      "Parameter 'latitude' or 'longitude' should be a correct number",
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestException,
  })
  @Get()
  checkAirQuality(
    @Query() checkAirQualityDto: CheckAirQualityDto,
  ): Promise<AirQualityResponseDto> {
    if (isNaN(+checkAirQualityDto.latitude)) {
      throw new BadRequestException(
        "Parameter 'latitude' should be a correct number",
      );
    }

    if (isNaN(+checkAirQualityDto.longitude)) {
      throw new BadRequestException(
        "Parameter 'longitude' should be a correct number",
      );
    }

    return this.airQualityService.checkAirQuality(checkAirQualityDto);
  }
}
