import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  // teardown logic: clear db one by one before e2e test
  cleanDb() {
    return this.$transaction([
      this.record.deleteMany(),
      this.user.deleteMany(),
    ]);
  }
}
