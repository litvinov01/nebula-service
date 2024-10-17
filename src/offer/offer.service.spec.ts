import { Test, TestingModule } from '@nestjs/testing';
import { OfferService } from './offer.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';

describe('OfferService', () => {
  let service: OfferService;
  let offerRepository: Repository<Offer>;

  const mockOfferRepository = {
    create: jest.fn().mockImplementation((dto) => ({
      id: Date.now(),
      ...dto,
    })),
    save: jest.fn().mockImplementation((offer) => Promise.resolve(offer)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OfferService,
        {
          provide: getRepositoryToken(Offer),
          useValue: mockOfferRepository,
        },
      ],
    }).compile();

    service = module.get<OfferService>(OfferService);
    offerRepository = module.get<Repository<Offer>>(getRepositoryToken(Offer));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create offer', async () => {
    const dto = { name: 'Astrology' };
    const created = await service.create(dto);

    expect(created).toBeDefined();
    expect(created).toHaveProperty('id');
    expect(created).toHaveProperty('message');
  });
});
