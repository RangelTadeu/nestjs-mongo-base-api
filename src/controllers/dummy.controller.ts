import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { DummyUseCase } from '../useCases/dummy/dummy.use-case';
import { CreateDummyDto } from '../core/dto/dummy.dto';
import { CreateDummyPipe } from '../core/pipes/dummy.pipe';

@Controller('/dummies')
export class DummyController {
  constructor(private readonly dummyUseCase: DummyUseCase) {}

  @Get()
  getAll() {
    return this.dummyUseCase.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.dummyUseCase.getOne(id);
  }

  @Post()
  @UsePipes(new CreateDummyPipe())
  create(@Body() item: CreateDummyDto) {
    return this.dummyUseCase.create(item);
  }
}
