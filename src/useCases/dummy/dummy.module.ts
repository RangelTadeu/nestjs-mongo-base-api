import { Module } from '@nestjs/common';
import { DummyUseCase } from './dummy.use-case';
import { DataServiceModule } from '../../services/data-service/data-service.module';

@Module({
  imports: [DataServiceModule],
  providers: [DummyUseCase],
  exports: [DummyUseCase],
})
export class DummyUseCasesModule {}
