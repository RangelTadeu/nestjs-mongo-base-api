import { Injectable } from '@nestjs/common';
import { IDataServices } from '../../services/data-service/data-services.abstract';
import { IPaginateResponse } from '../../core/interfaces';

@Injectable()
export class DummyUseCase {
  constructor(private readonly dataServices: IDataServices) {}

  getAll(): Promise<IPaginateResponse> {
    return this.dataServices.dummies.getAll().paginate();
  }
}
