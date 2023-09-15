import { Injectable } from '@nestjs/common';
import { IDataServices } from '../../services/data-service/data-services.abstract';
import { IPaginateResponse } from '../../core/interfaces';
import { CreateDummyDto } from '../../core/dto/dummy.dto';
import { Dummy } from '../../core/entities/dummy.entity';

@Injectable()
export class DummyUseCase {
  constructor(private readonly dataServices: IDataServices) {}

  getAll(): Promise<IPaginateResponse> {
    return this.dataServices.dummies.getAll().paginate();
  }

  getOne(id: string) {
    return this.dataServices.dummies.getOne(id);
  }

  create(item: CreateDummyDto) {
    const dummy = new Dummy();
    Object.assign(dummy, item);
    return this.dataServices.dummies.create(dummy);
  }
}
