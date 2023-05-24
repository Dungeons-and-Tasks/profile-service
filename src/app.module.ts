import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { config } from '@/config/main.config';

import { LoggingInterceptor } from '@/common/interceptors';
import { LoggerMiddleware } from '@/common/middlewares';
import { AllExceptionsFilter } from '@/common/filters';
import { ValidationPipe } from '@/common/pipes';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProfilesModule } from './components/profiles/profiles.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: config.database.dialect,
      host: config.database.host,
      port: config.database.port,
      username: config.database.user,
      password: config.database.password,
      database: config.database.database,
      synchronize: config.server.isDev,
      logging: config.server.isDev,
      autoLoadEntities: config.server.isDev,
    }),

    JwtModule.register({
      global: true,
    }),

    // Entities
    ProfilesModule,
  ],
  controllers: [AppController],
  providers: [
    // Globals
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },

    // Service
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
