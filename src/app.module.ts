import { Module } from '@nestjs/common';
import { ItemController } from './controllers/item.controller';
import { HealthController } from './controllers/health.controller';
import { ItemUseCasesModule } from './useCases/item/item.module';

@Module({
  imports: [ItemUseCasesModule],
  controllers: [ItemController, HealthController],
})
export class AppModule {}
