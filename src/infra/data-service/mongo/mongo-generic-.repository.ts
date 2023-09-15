import { Model } from 'mongoose';
import {
  IGenericRepository,
  IQueryHelper,
} from '../../../services/data-service/generic-repository.abstract';
import { IPaginateResponse } from '../../../core/interfaces';

export class MongoGenericRepository<T> implements IGenericRepository<T> {
  private _repository: Model<T>;
  private _populateOnFind: string[];

  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }

  private buildQueryHelper(props?) {
    return new QueryHelper<T>(
      this._repository,
      this._populateOnFind,
      props ?? {},
    );
  }

  getAll(): IQueryHelper {
    return this.buildQueryHelper();
  }

  get(filter: any, projection?: any, options?: any): IQueryHelper {
    return this.buildQueryHelper({ filter, projection, options });
  }

  getOne(id: string): Promise<T> {
    return this._repository.findById(id, this._populateOnFind).exec();
  }
  create(item: T): Promise<T> {
    return this._repository.create(item);
  }
  updateOne(id: string, item: T, options?: any) {
    this._repository.findByIdAndUpdate({ _id: id }, item, options);
  }
  update(filter: any, update: T, options?: any) {
    return this._repository.updateMany(filter, update, options);
  }
  delete(filter: any, options?: any) {
    return this._repository.deleteMany(filter, options);
  }
  deleteOne(id: string, options?: any) {
    return this._repository, this.deleteOne(id, options).exec();
  }
  upsertMany(items: T[], filter: (item: T) => any) {
    const opts: any = items.map((item) => {
      return {
        updateOne: {
          update: items,
          filter: filter?.(item) ?? {},
          upsert: true,
        },
      };
    });

    return this._repository.bulkWrite(opts);
  }
  insertMany(items: T[]) {
    const ops: any = items.map((item) => {
      return {
        insertOne: {
          document: item,
        },
      };
    });

    return this._repository.bulkWrite(ops);
  }
}

class QueryHelper<T> implements IQueryHelper {
  private _repository: Model<T>;
  private _populateOnFind: string[];

  private filter = {};
  private projection = {};
  private options = {};

  constructor(repository: Model<T>, populaOnFind: string[] = [], queryThings) {
    this._repository = repository;
    this._populateOnFind = populaOnFind;

    const { filter, projection, options } = queryThings;

    this.filter = filter ?? {};
    this.projection = projection ?? {};
    this.options = options ?? {};
  }

  async exec(): Promise<T[]> {
    return this._repository
      .find(this.filter, this.projection, this.options)
      .populate(this._populateOnFind)
      .exec();
  }

  async paginate(page = 1, pageSize = 25): Promise<IPaginateResponse> {
    const skip = pageSize * (page - 1);

    this.options = { ...this.options, limit: pageSize, skip };

    const count = await this._repository.find(this.filter).count();

    const data = await this.exec();

    const totalPages = Math.ceil(count / pageSize);

    return { data, currentPage: page, totalPages, totalItems: count };
  }
}
