import { Injectable, PipeTransform } from '@nestjs/common';
import { CreateItemDto } from '../dto/item.dto';

@Injectable()
export class CreateItemPipe implements PipeTransform<CreateItemDto> {
  async transform(value: CreateItemDto) {
    // do your transformations here

    return value;
  }
}
