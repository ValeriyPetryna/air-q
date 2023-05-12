import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { IqairService } from './iqair.service';

@Module({
  imports: [HttpModule],
  providers: [IqairService],
  exports: [IqairService],
})
export class IqairModule {}
