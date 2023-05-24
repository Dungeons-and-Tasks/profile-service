import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fastifyCookie from '@fastify/cookie';
import { NestFactory } from '@nestjs/core';

import { config } from '@/config/main.config';

import { AppModule } from './app.module';

// Init swagger
const initSwagger = (app: NestFastifyApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Profile Service')
    .setDescription('The profile-service API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
};

async function bootstrap() {
  // Init app
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  initSwagger(app);

  await app.register(fastifyCookie);

  // Listen server
  await app.listen(config.server.port, config.server.host, (err, address) => console.log(err || `server started at ${address}`));
}

bootstrap();
