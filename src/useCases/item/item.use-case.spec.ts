import { describe } from 'node:test';
import { ItemUseCase } from './item.use-case';
import { Test, TestingModule } from '@nestjs/testing';
import { TestDataServiceModule } from '../../../__test__/data-service/data-service.module';

describe('UsageService', () => {
  let service: ItemUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestDataServiceModule],
      providers: [ItemUseCase],
    }).compile();

    service = module.get<ItemUseCase>(ItemUseCase);
  });

  it('should add an item', async () => {
    const item = { name: 'first one' };

    const created = await service.create(item);

    expect(created._id).toBeDefined();
  });
});
