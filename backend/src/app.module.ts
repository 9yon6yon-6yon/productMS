import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import DatabaseConnection from './database/connection';
import { JwtAuthGuard } from './auth/jwt-auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { RolesGuard } from './common/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: DatabaseConnection,
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy, // Provide JWT Strategy
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // Apply JWT Authentication Guard globally
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // Apply Role Guard globally (after authentication)
    },
  ],
})
export class AppModule {}
