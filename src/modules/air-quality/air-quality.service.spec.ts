import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AirQualityService } from './air-quality.service';
import { IqairService } from '../iqair-api/iqair.service';
import { AirQualityResponseDto } from './dto/air-quality.response.dto';

describe('AirQualityService', () => {
  let api: IqairService;
  let service: AirQualityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AirQualityService,
        {
          provide: IqairService,
          useValue: {
            getCityInfo: jest.fn().mockReturnValue(apiResponseMock),
          },
        },
      ],
    }).compile();

    service = module.get<AirQualityService>(AirQualityService);
    api = module.get<IqairService>(IqairService);
  });

  describe('air quality service', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should return response for check air quality method', async () => {
      const response = await service.checkAirQuality(query);

      expect(response).toStrictEqual(responseMock);
      expect(api.getCityInfo).toBeCalledTimes(1);
      expect(api.getCityInfo).toBeCalledWith(convertedQuery);
    });

    it('should return error for check air quality method', async () => {
      try {
        jest.spyOn(api, 'getCityInfo').mockResolvedValueOnce(null);

        const query = {
          latitude: '11.22',
          longitude: '15.44',
        };

        await service.checkAirQuality(query);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('City not found by current parameters');
      }
    });
  });
});

const responseMock: AirQualityResponseDto = {
  Result: {
    City: 'Paris',
    Pollution: {
      ts: '2023-01-30T11:00:00.000Z',
      aqius: 35,
      mainus: 'p2',
      aqicn: 20,
      maincn: 'n2',
    },
  },
};

const apiResponseMock = {
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

const query = {
  latitude: '11.22',
  longitude: '15.44',
};

const convertedQuery = {
  lat: 11.22,
  lon: 15.44,
};
