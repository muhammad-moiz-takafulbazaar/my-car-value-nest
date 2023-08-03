import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUserService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUserService = {
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: 'test@gmail.com',
          password: '1234567890',
        } as unknown as User);
      },
      find: (email: string) => {
        return Promise.resolve([
          { id: 1, email, password: '1234567890' } as unknown as User,
        ]);
      },
      // remove: () => Promise.resolve(),
      // update: () => Promise.resolve(),
    };
    fakeAuthService = {
      // signup: () => Promise.resolve(),
      signin: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as unknown as User);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUser return a list of users with the given email', async () => {
    const users = await controller.findAllUsers('test@gmail.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('test@gmail.com');
  });

  it('findUser return a single user with the given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });

  // it('findUser return an error if given id not found', async () => {
  //   fakeUserService.findOne = () => null;
  //   await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  // });

  it('signin update session object and return user', async () => {
    const session = {
      userId: 0,
    };
    const user = await controller.signin(
      {
        email: 'test@gamil.com',
        password: '1234567890',
      },
      session,
    );
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
