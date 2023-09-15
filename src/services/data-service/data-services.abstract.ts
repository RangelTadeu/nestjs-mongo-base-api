import { Dummy } from '../../core/entities/dummy.entity';
import { IGenericRepository } from './generic-repository.abstract';

export abstract class IDataServices {
  abstract dummies: IGenericRepository<Dummy>;
}
