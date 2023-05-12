import { Document, SchemaTimestampsConfig } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AirQualityDocument = AirQuality & Document & SchemaTimestampsConfig;

@Schema({
  timestamps: true,
})
export class AirQuality {
  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  aqius: number;

  @Prop({ required: true })
  aqicn: number;
}

export const AirQualitySchema = SchemaFactory.createForClass(AirQuality);
