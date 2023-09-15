import { Controller, Get } from '@nestjs/common';
import { Public } from '../core/decorators/public.decorator';

@Controller('/health')
@Public()
export class HealthController {
  @Get()
  healthCheck() {
    return true;
  }
}
