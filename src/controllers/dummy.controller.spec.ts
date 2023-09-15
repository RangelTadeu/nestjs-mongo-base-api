import { Test, TestingModule } from '@nestjs/testing';
import { DummyController } from './dummy.controller';

describe('AppController', () => {
  let dummyController: DummyController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DummyController],
      providers: [],
    }).compile();

    dummyController = app.get<DummyController>(DummyController);
  });
});
