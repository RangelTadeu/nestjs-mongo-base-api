import { IPaginateResponse } from '../../core/interfaces';

export abstract class IGenericRepository<T> {
  abstract getAll(): IQueryHelper;

  abstract get(filter: any, projection?: any, options?: any): IQueryHelper;

  abstract getOne(id: string): Promise<T>;

  abstract create(item: T): Promise<T>;

  abstract updateOne(id: string, item: T, options?: any);

  abstract update(filter: any, update: T, options?: any);

  abstract delete(filter: any, options?: any);

  abstract deleteOne(id: string, options?: any);

  abstract upsertMany(items: T[], filter: (item: T) => any);

  abstract insertMany(items: T[]);
}

export interface IQueryHelper {
  exec: () => Promise<any>;
  paginate: (page?: number, pageSize?: number) => Promise<IPaginateResponse>;
}
