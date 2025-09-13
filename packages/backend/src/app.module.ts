import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { ReadingsModule } from './modules/readings/readings.module';
import { HttpExceptionFilter, AllExceptionsFilter } from './common/filters/http-exception.filter';

@Module({
  imports: [DatabaseModule, ReadingsModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
