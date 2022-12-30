import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AuthDto } from 'src/auth/dto';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { EditUserDto } from '../src/user/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  //starting logic
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  //teardown logic
  afterAll(() => {
    app.close();
  });

  describe('Auth tests', () => {
    const authDto: AuthDto = {
      email: 'abc@gmail.com',
      password: '123',
    };

    describe('Signup tests', () => {
      it('should Signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(authDto)
          .expectStatus(201);
      });

      it('should throw exception: email existed', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(authDto)
          .expectStatus(403);
      });
    });

    describe('Login', () => {
      it('should Login', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody(authDto)
          .expectStatus(200)
          .stores('token', 'access_token');
      });
    });
  });

  describe('User tests', () => {
    describe('Get me', () => {
      it('should get current user info', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{token}',
          })
          .expectStatus(200);
      });
    });
    describe('Edit user', () => {
      const editDto: EditUserDto = {
        firstName: 'new first name',
      };

      it('should edit current user info', () => {
        return pactum
          .spec()
          .patch('/users')
          .withHeaders({
            Authorization: 'Bearer $S{token}',
          })
          .withBody(editDto)
          .expectStatus(200)
          .expectBodyContains(editDto.firstName);
      });
    });
  });

  describe('Record tests', () => {
    describe('Create record', () => {});
    describe('Get records', () => {});
    describe('Get record by id', () => {});
    describe('Edit record', () => {});
    describe('Delete record', () => {});
  });
});
