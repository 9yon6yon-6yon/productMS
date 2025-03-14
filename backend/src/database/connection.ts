import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Users } from 'src/entity/user.entity';

export default (configService: ConfigService): TypeOrmModuleOptions => {
  const options: TypeOrmModuleOptions = {
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get<number>('DB_PORT'), //+ is to convert it to a number otherwise string as default
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    // ssl: {
    //   ca: configService.get('CA_CERT'),
    // },
    // autoLoadEntities: true,
    entities: [Users],
    synchronize: true,
  };
  return options;
};
