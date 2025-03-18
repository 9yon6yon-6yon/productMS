import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import DatabaseConnection from './database/connection';
// import { JwtAuthGuard } from './auth/jwt-auth/jwt-auth.guard';
// import { APP_GUARD } from '@nestjs/core';
// import { RolesGuard } from './common/guards/roles.guard';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { LoggingModule } from './logging/logging.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';

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
    LoggingModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy, // Provide JWT Strategy
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard, // Apply JWT Authentication Guard globally
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard, // Apply Role Guard globally (after authentication)
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
