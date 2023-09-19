import { Item } from '../../core/entities/item.entity';
import { IGenericRepository } from './generic-repository.abstract';

export abstract class IDataServices {
  abstract items: IGenericRepository<Item>;
}
