import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseService } from './purchase.service';
import { Purchase } from './entities/purchase.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Offer } from '../offer/entities/offer.entity';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

describe('PurchaseService', () => {
  let service: PurchaseService;
  let purchaseRepository: Repository<Purchase>;
  let userRepository: Repository<User>;
  let offerRepository: Repository<Offer>;

  const mockPurchaseRepository = {
    create: jest.fn().mockImplementation((dto) => ({
      id: Date.now(),
      ...dto,
    })),
    save: jest.fn().mockImplementation((purchase) => Promise.resolve(purchase)),
  };

  const mockUserRepository = {
    findOne: jest.fn().mockImplementation((condition) =>
      Promise.resolve({
        id: condition.where.id,
        email: 'testuser@gmail.com',
      }),
    ),
  };

  const mockOfferRepository = {
    findOne: jest.fn().mockImplementation((condition) =>
      Promise.resolve({
        id: condition.where.id,
        name: 'Test Offer',
      }),
    ),
  };

  const mockHttpService = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn().mockReturnValue(of({ data: 'response data' })), // Mocking put method
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchaseService,
        {
          provide: getRepositoryToken(Purchase),
          useValue: mockPurchaseRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(Offer),
          useValue: mockOfferRepository,
        },
        {
          provide: HttpService,
          useValue: mockHttpService, // Use the mocked HttpService
        },
      ],
    }).compile();

    service = module.get<PurchaseService>(PurchaseService);
    purchaseRepository = module.get<Repository<Purchase>>(
      getRepositoryToken(Purchase),
    );
    offerRepository = module.get<Repository<Offer>>(getRepositoryToken(Offer));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a purchase', async () => {
    const dto = {
      userId: 1,
      offerId: 1,
    };

    const createdPurchase = await service.create(dto);

    expect(createdPurchase).toBeDefined();
    expect(createdPurchase).toHaveProperty('id');
  });
});
