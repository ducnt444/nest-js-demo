import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { AuthModule } from './auth/auth.module';
import { HealthCheckModule } from './healthcheck/healthcheck.module';
// import { PrismaModule } from './prisma/prisma.module';
// import { RecordModule } from './record/record.module';
// import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // AuthModule,
    // UserModule,
    // RecordModule,
    // PrismaModule,
    HealthCheckModule,
  ],
})
export class AppModule {}
