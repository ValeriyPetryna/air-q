import { IsNotEmpty, IsNumberString, Max, Min } from 'class-validator';

export class CheckAirQualityDto {
  // lat: Latitude numerical value, within range [-90, 90]
  @IsNotEmpty()
  @IsNumberString()
  @Min(-90)
  @Max(90)
  latitude: string;

  // lon: Longitude numerical value, within range [-180, 180].
  @IsNotEmpty()
  @IsNumberString()
  @Min(-180)
  @Max(180)
  longitude: string;
}
