import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { LoggerModule, Params } from 'nestjs-pino';
import { loggerOptions } from 'src/config/config.logger';
import { AppController } from './app.controller';
import { NODE_ENV } from './app.environment';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { dbOrmModuleAsync } from './config/config.typeorm';
import { OrganizationModule } from './organization/organization.module';

@Module({
  imports: [
    dbOrmModuleAsync,
    LoggerModule.forRoot(loggerOptions[NODE_ENV] as Params),
    CacheModule.register(),
    AuthModule,
    OrganizationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
