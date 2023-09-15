import { Test, TestingModule } from '@nestjs/testing';
import { DummyController } from './dummy.controller';
import { AppService } from '../app.service';

describe('AppController', () => {
  let appController: DummyController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DummyController],
      providers: [AppService],
    }).compile();

    appController = app.get<DummyController>(DummyController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
