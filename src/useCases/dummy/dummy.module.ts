import { Module } from '@nestjs/common';
import { DummyUseCase } from './dummy.use-case';

@Module({
  imports: [],
  providers: [DummyUseCase],
})
export class DummyUseCasesModule {}
