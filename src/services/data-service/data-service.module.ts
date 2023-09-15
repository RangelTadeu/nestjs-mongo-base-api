import { Module } from '@nestjs/common';
import { MongoDataServiceModule } from '../../infra/data-service/mongo/mongo-data-service.module';

@Module({
  imports: [MongoDataServiceModule],
  exports: [MongoDataServiceModule],
})
export class DataServiceModule {}
