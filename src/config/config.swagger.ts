import { DocumentBuilder } from '@nestjs/swagger';

const swaggerOptions = new DocumentBuilder()
  .setTitle('Socert')
  .setDescription('APIs for DApp built with NestJS, PostgreSQL')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

export { swaggerOptions };