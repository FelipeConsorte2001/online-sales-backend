import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CacheService } from 'src/cache/cache.service';
import { Repository } from 'typeorm';
import { cityMock } from '../__mocks__/city.mock';
import { CityService } from '../city.service';
import { CityEntity } from '../entity/city.entity';

describe('CityService', () => {
  let service: CityService;
  let cityRepository: Repository<CityEntity>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: CacheService,
          useValue: {
            getCache: jest.fn().mockResolvedValue([cityMock]),
          },
        },
        {
          provide: getRepositoryToken(CityEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([cityMock]),
            findOne: jest.fn().mockResolvedValue(cityMock),
          },
        },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    cityRepository = module.get<Repository<CityEntity>>(
      getRepositoryToken(CityEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cityRepository).toBeDefined();
  });

  it('should return city by id', async () => {
    const city = await service.findCityById(cityMock.id);
    expect(city).toEqual(cityMock);
  });

  it('should return error city by id', async () => {
    jest.spyOn(cityRepository, 'findOne').mockResolvedValue(undefined);
    expect(service.findCityById(cityMock.id)).rejects.toThrow();
  });
  it('should return city by id', async () => {
    const city = await service.getAllCitiesByStateId(cityMock.stateId);
    expect(city).toEqual([cityMock]);
  });
});
