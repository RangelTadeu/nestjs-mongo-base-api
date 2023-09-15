import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IDataServices } from '../../../services/data-service/data-services.abstract';
import { MongoGenericRepository } from './mongo-generic-.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Dummy } from './model';
import { Model } from 'mongoose';

Injectable();
export class MongoDataService implements IDataServices, OnApplicationBootstrap {
  dummies: MongoGenericRepository<Dummy>;
  constructor(
    @InjectModel(Dummy.name)
    private DummyRepository: Model<Dummy>,
  ) {}

  onApplicationBootstrap() {
    this.dummies = new MongoGenericRepository<Dummy>(this.DummyRepository);
  }
}
