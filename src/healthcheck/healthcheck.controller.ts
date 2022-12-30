import { Controller, Get } from '@nestjs/common';

@Controller('healthcheck')
export class HealthCheckController {
  // GET /healthcheck
  @Get()
  healthCheck() {
    return { healthCheck: 'OK' };
  }
}
