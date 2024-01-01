import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} from 'src/app.environment';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

export const dataSourceOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  autoLoadEntities: true,
  synchronize:true,
  logger: 'file',
  logging: ['warn', 'error'],
};

export const dbOrmModuleAsync = TypeOrmModule.forRootAsync({
  useFactory: () => dataSourceOptions as TypeOrmModuleOptions,
  dataSourceFactory: async (options) => {
    return addTransactionalDataSource(new DataSource(options));
  },
});