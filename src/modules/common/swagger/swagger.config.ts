import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Air quality API')
  .setDescription('Air quality API description')
  .setVersion('1.0')
  .build();
