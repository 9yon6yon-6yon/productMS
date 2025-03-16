import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from 'src/entity/log.entity';

@Injectable()
export class LoggingService {
  constructor(
    @InjectRepository(Log)
    private readonly logRepository: Repository<Log>,
  ) {}

  async createLog(user: string, method: string, route: string) {
    const log = this.logRepository.create({
      user,
      method,
      route,
    });
    await this.logRepository.save(log);
  }
}
