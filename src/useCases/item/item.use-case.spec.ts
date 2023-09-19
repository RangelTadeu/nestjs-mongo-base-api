import { describe } from 'node:test';
import { ItemUseCase } from './item.use-case';
import { Test, TestingModule } from '@nestjs/testing';
import { ItemUseCasesModule } from './item.module';

describe('UsageService', () => {
  let service: ItemUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [], // teting module
      providers: [ItemUseCasesModule],
    }).compile();

    service = module.get<ItemUseCase>(ItemUseCase);
  });
});
