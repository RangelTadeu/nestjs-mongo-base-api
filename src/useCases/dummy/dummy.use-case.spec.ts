import { describe } from 'node:test';
import { DummyUseCase } from './dummy.use-case';
import { Test, TestingModule } from '@nestjs/testing';
import { DummyUseCasesModule } from './dummy.module';

describe('UsageService', () => {
  let service: DummyUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [], // teting module
      providers: [DummyUseCasesModule],
    }).compile();

    service = module.get<DummyUseCase>(DummyUseCase);
  });
});
