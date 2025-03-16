import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { LoggingService } from 'src/logging/logging.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private readonly loggingService: LoggingService,
    private readonly configService: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    let user = 'Guest'; // Default user if not authenticated

    try {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1]; // Extract the JWT
        const secret = this.configService.get<string>('JWT_SECRET'); // Get JWT secret from .env file

        if (token && secret) {
          const decoded: any = jwt.verify(token, secret); // Verify and decode JWT
          user = decoded.sub ? `${decoded.sub}` : 'Unknown'; // Extract user ID from token
        }
      }
    } catch (error) {
      console.warn('JWT Verification Failed:', error.message);
    }

    const method = req.method;
    const route = req.originalUrl;
    const timestamp = new Date().toISOString();

    console.log(
      `[${timestamp}] User: ${user} | Method: ${method} | Route: ${route}`,
    );

    // Save log to database
    await this.loggingService.createLog(user, method, route);
    next();
  }
}
