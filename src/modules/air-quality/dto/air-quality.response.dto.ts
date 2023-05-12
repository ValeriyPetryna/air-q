export class AirQualityResponseDto {
  Result: PolutionResponseDto;
}

export class PolutionResponseDto {
  Pollution: AirQualityDto;
  City: string;
}

export class AirQualityDto {
  ts: string;
  aqius: number;
  mainus: string;
  aqicn: number;
  maincn: string;
}
