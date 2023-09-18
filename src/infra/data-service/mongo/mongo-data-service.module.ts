import { Module, Scope } from '@nestjs/common';
import { IDataServices } from '../../../services/data-service/data-services.abstract';
import { MongoDataService } from './mongo-data.service';
import { MongoClient } from 'mongodb';

const mongodb = {
  provide: 'DB',
  scope: Scope.DEFAULT,
  useFactory: async () => {
    const connection = await MongoClient.connect(process.env.MONGO_URL);
    const db = await connection.db(process.env.MONGO_DB);
    return db;
  },
};

@Module({
  imports: [],
  providers: [
    mongodb,
    {
      provide: IDataServices,
      useClass: MongoDataService,
    },
  ],
  exports: [IDataServices],
})
export class MongoDataServiceModule {}
