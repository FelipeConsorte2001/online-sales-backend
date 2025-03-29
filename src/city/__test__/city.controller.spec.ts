import { Test, TestingModule } from '@nestjs/testing';
import { stateMock } from 'src/state/__mocks__/state.mock';
import { cityMock } from '../__mocks__/city.mock';
import { CityController } from '../city.controller';
import { CityService } from '../city.service';

describe('CityController', () => {
  let controller: CityController;
  let cityService: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CityController],
      providers: [
        {
          provide: CityService,
          useValue: {
            getAllCitiesByStateId: jest.fn().mockResolvedValue([cityMock]),
          },
        },
      ],
    }).compile();

    controller = module.get<CityController>(CityController);
    cityService = module.get<CityService>(CityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(cityService).toBeDefined();
  });
  it('should return city Entity in getAllCitiesByStateId', async () => {
    const city = await controller.getAllCitiesByStateId(stateMock.id);

    expect(city).toEqual([cityMock]);
  });
});
