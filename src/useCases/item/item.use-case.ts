import { Injectable } from '@nestjs/common';
import { IDataServices } from '../../services/data-service/data-services.abstract';
import { IPaginateResponse } from '../../core/interfaces';
import { CreateItemDto } from '../../core/dto/item.dto';
import { Item } from '../../core/entities/item.entity';

@Injectable()
export class ItemUseCase {
  constructor(private readonly dataServices: IDataServices) {}

  getAll(): Promise<IPaginateResponse> {
    return this.dataServices.items.getAll().paginate();
  }

  getOne(id: string) {
    return this.dataServices.items.getOne(id);
  }

  create(item: CreateItemDto) {
    const dummy = new Item();
    Object.assign(dummy, item);
    return this.dataServices.items.create(dummy);
  }
}
