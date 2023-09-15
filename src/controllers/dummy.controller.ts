import { Controller, Get } from '@nestjs/common';
import { DummyUseCase } from '../useCases/dummy/dummy.use-case';

@Controller('/dummies')
export class DummyController {
  constructor(private readonly dummyUseCase: DummyUseCase) {}

  @Get()
  getHello() {
    return this.dummyUseCase.getAll();
  }
}
