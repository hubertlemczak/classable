/* eslint-disable @typescript-eslint/ban-ts-comment */
import supertest from 'supertest';

import authModel from '../api/models/auth.model';
import createServer from '../utils/createServer';
import { create } from './utils/users';

const app = createServer();

const registerInput = {
  firstName: 'jestTest',
  lastName: 'jestTest',
  email: 'jestTest@jest.com',
  password: 'jest123',
  confirmPassword: 'jest123',
};

const registerPayload = {
  firstName: 'jestTest',
  lastName: 'jestTest',
  email: 'jestTest@jest.com',
  password: expect.any(String),
};

describe('Auth', () => {
  describe('Register user', () => {
    describe('Given the user provides valid details', () => {
      it('should return a signed token', async () => {
        const userModelMock = jest.spyOn(authModel, 'register');

        const { statusCode, body } = await supertest(app)
          .post('/api/register')
          .send(registerInput);

        expect(statusCode).toBe(201);
        expect(body).toHaveProperty('token');
        expect(userModelMock).toBeCalledWith(registerPayload);
      });
    });

    describe('Given the user provides invalid details', () => {
      const invalidRegisterInput = {
        firstName: 'jestTest',
        email: 'jestTest@jest.com',
        password: 'jest123',
        confirmPassword: 'jest123',
      };

      it('should return a 400 status', async () => {
        const { statusCode, body } = await supertest(app)
          .post('/api/register')
          .send(invalidRegisterInput);

        expect(statusCode).toBe(400);
        expect(body).toHaveProperty('error');
        expect(body.error).toEqual('Missing fields in request body');
      });
    });

    describe('Given the email already exists', () => {
      it('should return a 400 status', async () => {
        const userModelMock = jest.spyOn(authModel, 'register');

        await create(registerInput);

        const { statusCode, body } = await supertest(app)
          .post('/api/register')
          .send(registerInput);

        expect(statusCode).toBe(400);
        expect(body).toHaveProperty('error');
        expect(body.error).toEqual('email already in use');
        expect(userModelMock).toBeCalledWith(registerPayload);
      });
    });
  });

  describe('Login user', () => {
    const loginInput = {
      email: 'jestTest@jest.com',
      password: 'jest123',
    };

    const invalidLoginInput = {
      email: 'jestTest@jest.com',
    };

    const invalidLoginInput2 = {
      email: 'jestTest@jest.com',
      password: 'jest123456',
    };

    describe('Given the user provides valid details', () => {
      it('should return a signed token', async () => {
        await create(registerInput);

        const { statusCode, body } = await supertest(app)
          .post('/api/login')
          .send(loginInput);

        expect(statusCode).toBe(201);
        expect(body).toHaveProperty('token');
      });
    });

    describe('Given the user provides invalid details', () => {
      it('should return a 400 status', async () => {
        const { statusCode, body } = await supertest(app)
          .post('/api/login')
          .send(invalidLoginInput);

        expect(statusCode).toBe(400);
        expect(body).toHaveProperty('error');
        expect(body.error).toEqual('Missing fields in request body');
      });

      it('should return a 403 status', async () => {
        const { statusCode, body } = await supertest(app)
          .post('/api/login')
          .send(invalidLoginInput2);

        expect(statusCode).toBe(403);
        expect(body).toHaveProperty('error');
        expect(body.error).toEqual('Invalid credentials');
      });
    });
  });
});
