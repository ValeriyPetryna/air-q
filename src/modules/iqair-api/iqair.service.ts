import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { GetCityInfoDto } from './dto/getCityInfo.request.dto';
import { GetCityInfoResponseDto } from './dto/getCityInfo.response.dto';

@Injectable()
export class IqairService {
  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  private readonly BASE_URL = 'http://api.airvisual.com/v2';
  private readonly API_KEY = this.config.get('API_KEY');

  async getCityInfo(
    getCityInfoDto: GetCityInfoDto,
  ): Promise<GetCityInfoResponseDto> {
    const query = `/nearest_city?lat=${getCityInfoDto.lat}&lon=${getCityInfoDto.lon}`;
    const key = `&key=${this.API_KEY}`;
    const url = this.BASE_URL + query + key;

    const { data } = await firstValueFrom(
      this.httpService.get(url).pipe(
        catchError((error: any) => {
          if (error.response.data.status === 'fail') {
            throw new NotFoundException('City not found by current parameters');
          }

          throw new BadRequestException('An error happened!');
        }),
      ),
    );

    return data;
  }
}
