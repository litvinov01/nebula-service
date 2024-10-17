import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;

  const mockUserRepository = {
    create: jest.fn().mockImplementation((dto) => ({
      id: Date.now(),
      ...dto,
    })),
    save: jest.fn().mockImplementation((user) => Promise.resolve(user)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create user', async () => {
    const dto = {
      email: 'hello@gmail.com',
      marketingData: {
        trello: true,
        payment: 'paypal',
      },
    };

    const createdUser = await service.create(dto);

    expect(createdUser).toBeDefined();
    expect(createdUser).toHaveProperty('id');
  });
});
