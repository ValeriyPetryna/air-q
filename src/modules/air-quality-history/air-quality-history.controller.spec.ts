import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { PARIS_CITY } from '../common/constants';
import { AirQualityHistoryService } from './air-quality-history.service';
import { AirQualityHistoryController } from './air-quality-history.controller';
import { AirQualityHistoryResponseDto } from './dto/air-quality-history.dto';

describe('AirQualityHistoryController', () => {
  let controller: AirQualityHistoryController;
  let service: AirQualityHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AirQualityHistoryController],
      providers: [
        {
          provide: AirQualityHistoryService,
          useValue: {
            getMostPollutedRecordByCity: jest
              .fn()
              .mockReturnValue(responseMock),
          },
        },
      ],
    }).compile();

    controller = module.get<AirQualityHistoryController>(
      AirQualityHistoryController,
    );
    service = module.get<AirQualityHistoryService>(AirQualityHistoryService);
  });

  describe('air quality history controller', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should return response for get Paris most polluted record method', async () => {
      try {
        const response = await controller.findParisMostPollutedDate();

        expect(response).toBe(responseMock);
        expect(service.getMostPollutedRecordByCity).toBeCalledWith(PARIS_CITY);
        expect(service.getMostPollutedRecordByCity).toBeCalledTimes(1);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });
  });
});

const responseMock: AirQualityHistoryResponseDto = {
  city: 'Paris',
  aqius: 35,
  aqicn: 20,
  date: '2023-01-30T11:00:00.000Z',
};
