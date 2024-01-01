import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  CONTEXT_PATH,
  NODE_ENV,
  PORT,
  SWAGGER_ENDPOINT,
} from './app.environment';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerOptions } from './config/config.swagger';
import { TransformInterceptor } from 'src/common/interceptor/transform.interceptor';
import { ErrorsInterceptor } from 'src/common/interceptor/error.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { PagingResponse } from 'src/common/common.component';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const options = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };

  app.enableCors(options);
  app.setGlobalPrefix(CONTEXT_PATH);
  app.useLogger(app.get(Logger));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new TransformInterceptor(app.get(Reflector)),
    new ErrorsInterceptor(),
    new LoggerErrorInterceptor(),
  );
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  if (NODE_ENV != 'production') {
    const document = SwaggerModule.createDocument(app, swaggerOptions, {
      extraModels: [PagingResponse],
    });
    SwaggerModule.setup(SWAGGER_ENDPOINT, app, document);
  }

  await app.listen(PORT);
}

bootstrap().catch((e) => {
  console.error(`Server encountered error ${e}`);
});
