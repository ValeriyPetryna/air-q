export class GetCityInfoResponseDto {
  status: string;
  data: CityDataDto;
}

export class CityDataDto {
  city: string;
  state?: string;
  country?: string;
  location?: any;
  current: CityCurrentDataDto;
}

export class CityCurrentDataDto {
  weather?: any;
  pollution: PollutionDto;
}

export class PollutionDto {
  ts: string;
  aqius: number;
  mainus: string;
  aqicn: number;
  maincn: string;
}
