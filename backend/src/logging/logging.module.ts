import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggingService } from './logging.service';
import { Log } from 'src/entity/log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Log])],
  providers: [LoggingService],
  exports: [LoggingService],
})
export class LoggingModule {}
