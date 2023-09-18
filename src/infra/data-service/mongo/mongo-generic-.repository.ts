import {
  IGenericRepository,
  IQueryHelper,
} from '../../../services/data-service/generic-repository.abstract';
import { IPaginateResponse } from '../../../core/interfaces';
import { randomUUID as uuidv4 } from 'node:crypto';

export class MongoGenericRepository<T> implements IGenericRepository<T> {
  private collection: any;

  constructor(db, collectionName) {
    this.collection = db.collection(collectionName);
  }

  private buildQueryHelper(props?) {
    return new QueryHelper<T>(this.collection, props ?? {});
  }

  getAll(): QueryHelper<T> {
    return this.buildQueryHelper();
  }

  get(filter, projection?, options?): QueryHelper<T> {
    return this.buildQueryHelper({ filter, projection, options });
  }

  async getOne(id: string): Promise<any> {
    const res = await this.get({ _id: id }).exec();
    return res[0];
  }

  async create(item: T): Promise<T> {
    const res = await this.collection.insertOne({ _id: uuidv4(), ...item });

    return {
      _id: res.insertedId,
      ...item,
    };
  }

  async updateOne(id: string, item: T, options?: any) {
    let toUpdate: any = item;
    if (options?.overwrite !== true) {
      toUpdate = { $set: item };

      const res = await this.collection.update({ _id: id }, toUpdate);

      if (res.modifiedCount === 1) {
        return {
          _id: id,
          ...item,
        };
      }

      throw new Error('fail to update');
    }

    const res = await this.collection.replaceOne({ _id: id }, toUpdate);

    if (res.modifiedCount === 1) {
      return {
        _id: id,
        ...item,
      };
    }

    throw new Error('fail to update');
  }

  async update(filter: any, update: any, options?: any) {
    let toUpdate: any = update;

    if (update['$set'] == null && options?.overwrite !== true) {
      toUpdate = { $set: update };
    }

    return await this.collection.updateMany(filter, toUpdate, options);
  }

  deleteOne(id: string, options?: any) {
    return this.collection.deleteOne({ _id: id }, options);
  }

  delete(filter: any, options?: any) {
    return this.collection.deleteMany(filter, options);
  }

  upsertMany(items: Array<T>, filter: (item: T) => any) {
    const ops: any = items.map((item) => {
      return {
        updateOne: {
          update: { $set: { ...item } },
          filter: filter?.(item) ?? {},
          upsert: true,
        },
      };
    });

    return this.collection.bulkWrite(ops);
  }

  insertMany(items: T[]) {
    const ops: any = items.map((item) => {
      return {
        insertOne: {
          document: { _id: uuidv4(), ...item },
        },
      };
    });

    return this.collection.bulkWrite(ops);
  }
}

class QueryHelper<T> implements IQueryHelper {
  private collection: any;

  private filter: any = {};

  private options: any = {};

  constructor(collection: any, queryThings) {
    this.collection = collection;

    const { filter = {}, projection = {}, options = {} } = queryThings;

    this.filter = filter;

    this.options = options;

    if (projection != null) this.options.projection = projection;
  }

  async exec(): Promise<T[]> {
    return this.collection.find(this.filter, this.options).toArray();
  }

  async paginate(page = 1, pageSize = 25): Promise<IPaginateResponse> {
    let skip = 1;

    if (pageSize > 1) {
      skip = pageSize * (page - 1);
    }

    this.options = { ...this.options, limit: pageSize, skip };

    const count = await this.collection.find(this.filter).count();

    const data = await this.exec();

    const totalPages = Math.ceil(count / pageSize);

    return { data, currentPage: page, totalPages, totalItems: count };
  }
}
