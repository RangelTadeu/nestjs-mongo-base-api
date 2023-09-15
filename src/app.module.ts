import { Module } from '@nestjs/common';
import { DummyController } from './controllers/dummy.controller';
import { HealthController } from './controllers/health.controller';
import { DummyUseCasesModule } from './useCases/dummy/dummy.module';

@Module({
  imports: [DummyUseCasesModule],
  controllers: [DummyController, HealthController],
})
export class AppModule {}
