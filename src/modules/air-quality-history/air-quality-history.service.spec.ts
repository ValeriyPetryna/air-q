import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, NotFoundException } from '@nestjs/common';
import { PARIS_CITY, PARIS_COORDINATES } from '../common/constants';
import { IqairService } from '../iqair-api/iqair.service';
import { AirQualityHistoryService } from './air-quality-history.service';
import { AirQualityRepositoryService } from '../db/models/air-quality-repository/air-quality.repository.service';
import { AirQualityHistoryResponseDto } from './dto/air-quality-history.dto';

describe('AirQualityHistoryService', () => {
  let api: IqairService;
  let service: AirQualityHistoryService;
  let repo: AirQualityRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AirQualityHistoryService,
        {
          provide: IqairService,
          useValue: {
            getCityInfo: jest.fn().mockReturnValue(apiResponseMock),
          },
        },
        {
          provide: AirQualityRepositoryService,
          useValue: {
            findMostPollutedRecordByCity: jest
              .fn()
              .mockReturnValue(repositoryResponseMock),
            createAirQualityRecord: jest
              .fn()
              .mockReturnValue(repositoryResponseMock),
          },
        },
      ],
    }).compile();

    service = module.get<AirQualityHistoryService>(AirQualityHistoryService);
    api = module.get<IqairService>(IqairService);
    repo = module.get<AirQualityRepositoryService>(AirQualityRepositoryService);
  });

  describe('air quality history service', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should return response for get most polluted air date method', async () => {
      const response = await service.getMostPollutedRecordByCity(PARIS_CITY);

      expect(response).toStrictEqual(mostPollutedDateResponseMock);
      expect(repo.findMostPollutedRecordByCity).toBeCalledTimes(1);
      expect(repo.findMostPollutedRecordByCity).toBeCalledWith(PARIS_CITY);
    });

    it('should return response for save air quality method', async () => {
      const response = await service.saveCityAirQuality(PARIS_COORDINATES);

      expect(response).toBe(true);
      expect(api.getCityInfo).toBeCalledTimes(1);
      expect(repo.createAirQualityRecord).toBeCalledTimes(1);
      expect(api.getCityInfo).toBeCalledWith(PARIS_COORDINATES);
      expect(repo.createAirQualityRecord).toBeCalledWith(
        createAirQualityRecordMock,
      );
    });

    it('should return error for save city air quality record method', async () => {
      try {
        jest.spyOn(api, 'getCityInfo').mockResolvedValueOnce(null);

        await service.saveCityAirQuality(PARIS_COORDINATES);
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
        expect(e.message).toBe('Error occured while fetching air quality data');
      }
    });

    it('should return not found error for most polluted air date method', async () => {
      try {
        jest
          .spyOn(repo, 'findMostPollutedRecordByCity')
          .mockResolvedValueOnce(null);

        await service.getMostPollutedRecordByCity(PARIS_CITY);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe(
          `Air quality history was not found for ${PARIS_CITY} city.`,
        );
      }
    });
  });
});

const mostPollutedDateResponseMock: AirQualityHistoryResponseDto = {
  city: 'Paris',
  date: '2023-01-30T11:00:00.000Z',
  aqius: 35,
  aqicn: 20,
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

const createAirQualityRecordMock = {
  city: 'Paris',
  aqius: 35,
  aqicn: 20,
  maincn: 'n2',
  mainus: 'p2',
  ts: '2023-01-30T11:00:00.000Z',
};

const repositoryResponseMock = {
  city: 'Paris',
  aqius: 35,
  aqicn: 20,
  createdAt: '2023-01-30T11:00:00.000Z',
  updatedAt: '2023-01-30T11:00:00.000Z',
};
