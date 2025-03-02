import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import DatabaseConnection from './database/connection';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: DatabaseConnection,
    inject: [ConfigService],
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
