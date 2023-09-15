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

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(dummyController.getHello()).toBe('Hello World!');
    });
  });
});
