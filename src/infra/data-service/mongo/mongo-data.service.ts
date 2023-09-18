import { Inject, Injectable } from '@nestjs/common';
import { IDataServices } from '../../../services/data-service/data-services.abstract';
import { MongoGenericRepository } from './mongo-generic-.repository';
import { Dummy } from './model';

Injectable();
export class MongoDataService implements IDataServices {
  dummies: MongoGenericRepository<Dummy>;

  constructor(@Inject('DB') private db) {
    this.dummies = new MongoGenericRepository<Dummy>(this.db, 'dummies');
  }
}
