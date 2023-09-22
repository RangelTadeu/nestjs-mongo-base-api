import { Module } from '@nestjs/common';
import { TestMongoDataServiceModule } from './mongo-data-service.module';

@Module({
  imports: [TestMongoDataServiceModule],
  exports: [TestMongoDataServiceModule],
})
export class TestDataServiceModule {}
