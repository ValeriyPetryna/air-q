import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AirQualityService } from './air-quality.service';
import { AirQualityController } from './air-quality.controller';
import { AirQualityResponseDto } from './dto/air-quality.response.dto';

describe('AirQualityController', () => {
  let controller: AirQualityController;
  let service: AirQualityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AirQualityController],
      providers: [
        {
          provide: AirQualityService,
          useValue: {
            checkAirQuality: jest.fn().mockReturnValue(airQualityMock),
          },
        },
      ],
    }).compile();

    controller = module.get<AirQualityController>(AirQualityController);
    service = module.get<AirQualityService>(AirQualityService);
  });

  describe('air quality controller', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should return response for check air quality method', async () => {
      try {
        const query = {
          latitude: '11.22',
          longitude: '15.44',
        };

        const response = await controller.checkAirQuality(query);

        expect(response).toBe(airQualityMock);
        expect(service.checkAirQuality).toBeCalledWith(query);
        expect(service.checkAirQuality).toBeCalledTimes(1);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });

    it('should return error with not a number argument', async () => {
      try {
        const query = {
          latitude: 'a',
          longitude: '15.44',
        };

        await controller.checkAirQuality(query);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e.message).toBe(
          "Parameter 'latitude' should be a correct number",
        );
      }
    });
  });
});

const airQualityMock: AirQualityResponseDto = {
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
