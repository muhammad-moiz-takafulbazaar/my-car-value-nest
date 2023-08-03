import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
// import { setupApp } from '../src/setup-app';

describe('Authentication System - e2e', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // setupApp(app);
    await app.init();
  });

  it('handle a signup request', () => {
    const email = 'test@gmail.com';
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: '1234567890' })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
      });
  });

  it('singin new user then get the currently logged in user', async () => {
    const email = 'test@gmail.com';
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: '1234567890' })
      .expect(201);
    const cookie = res.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual(email);
  });
});
