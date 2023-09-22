import { Inject, Injectable } from '@nestjs/common';
import { IDataServices } from '../../../services/data-service/data-services.abstract';
import { MongoGenericRepository } from './mongo-generic-.repository';
import { Item } from '../../../core/entities/item.entity';
import { DB } from '../../../core/constants';

Injectable();
export class MongoDataService implements IDataServices {
  items: MongoGenericRepository<Item>;

  constructor(@Inject(DB) private db) {
    this.items = new MongoGenericRepository<Item>(this.db, 'items');
  }
}
