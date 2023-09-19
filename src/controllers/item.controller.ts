import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { ItemUseCase } from '../useCases/item/item.use-case';
import { CreateItemDto } from '../core/dto/item.dto';
import { CreateItemPipe } from '../core/pipes/dummy.pipe';

@Controller('/items')
export class ItemController {
  constructor(private readonly dummyUseCase: ItemUseCase) {}

  @Get()
  getAll() {
    return this.dummyUseCase.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.dummyUseCase.getOne(id);
  }

  @Post()
  @UsePipes(new CreateItemPipe())
  create(@Body() item: CreateItemDto) {
    return this.dummyUseCase.create(item);
  }
}
