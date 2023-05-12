import { of } from 'rxjs';
import { ConfigModule } from '@nestjs/config';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/axios';
import { IqairService } from './iqair.service';
import { GetCityInfoDto } from './dto/getCityInfo.request.dto';
import { GetCityInfoResponseDto } from './dto/getCityInfo.response.dto';

describe('IqairService', () => {
  let service: IqairService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IqairService],
      imports: [HttpModule, ConfigModule],
    }).compile();

    service = module.get<IqairService>(IqairService);
    httpService = module.get<HttpService>(HttpService);
  });

  describe('iqair service', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should make http request and fetch data from other API', async () => {
      jest
        .spyOn(httpService, 'get')
        .mockImplementationOnce(() =>
          of({ data: apiSuccessResponseMock } as any),
        );
      try {
        const response = await service.getCityInfo(query);

        expect(response).toBe(apiSuccessResponseMock);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });

    it('should make http request and return failed results', async () => {
      jest.spyOn(httpService, 'get').mockImplementationOnce(() => {
        throw new BadRequestException('An error happened!');
      });

      try {
        await service.getCityInfo(query);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });
  });
});

const query: GetCityInfoDto = {
  lat: 11.22,
  lon: 15.44,
};

const apiSuccessResponseMock: GetCityInfoResponseDto = {
  status: 'success',
  data: {
    city: 'Paris',
    current: {
      pollution: {
        ts: '2023-01-30T11:00:00.000Z',
        aqius: 35,
        mainus: 'p2',
        aqicn: 20,
        maincn: 'n2',
      },
    },
  },
};
