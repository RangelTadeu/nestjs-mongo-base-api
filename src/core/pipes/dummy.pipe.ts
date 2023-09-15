import { Injectable, PipeTransform } from '@nestjs/common';
import { CreateDummyDto } from '../dto/dummy.dto';

@Injectable()
export class CreateDummyPipe implements PipeTransform<CreateDummyDto> {
  async transform(value: CreateDummyDto) {
    // do your transformations here

    return value;
  }
}
