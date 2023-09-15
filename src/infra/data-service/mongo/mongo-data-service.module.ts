import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Dummy, DummySchema } from './model';
import { IDataServices } from '../../../services/data-service/data-services.abstract';
import { MongoDataService } from './mongo-data.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Dummy.name, schema: DummySchema }]),
    MongooseModule.forRoot(process.env.MONGO_URL),
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: MongoDataService,
    },
  ],
  exports: [IDataServices],
})
export class MongoDataServiceModule {}
