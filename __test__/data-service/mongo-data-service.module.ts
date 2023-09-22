import { Module, Scope } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { IDataServices } from '../../src/services/data-service/data-services.abstract';
import { MongoDataService } from '../../src/infra/data-service/mongo/mongo-data.service';
import { DB } from '../../src/core/constants';

const mongodb = {
  provide: DB,
  scope: Scope.DEFAULT,
  useFactory: async () => {
    const mongod = await MongoMemoryServer.create();

    const uri = mongod.getUri();

    const connection = await MongoClient.connect(uri);
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
export class TestMongoDataServiceModule {}
