import { Test, TestingModule } from '@nestjs/testing';
import { ItemController } from './item.controller';

describe('AppController', () => {
  let itemController: ItemController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [],
    }).compile();

    itemController = app.get<ItemController>(ItemController);
  });
});
