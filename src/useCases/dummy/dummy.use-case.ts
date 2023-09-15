import { Injectable } from '@nestjs/common';

@Injectable()
export class DummyUseCase {
  getHello(): string {
    return 'Hello World!';
  }
}
