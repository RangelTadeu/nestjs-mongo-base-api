import { Module } from '@nestjs/common';
import { ItemUseCase } from './item.use-case';
import { DataServiceModule } from '../../services/data-service/data-service.module';

@Module({
  imports: [DataServiceModule],
  providers: [ItemUseCase],
  exports: [ItemUseCase],
})
export class ItemUseCasesModule {}
