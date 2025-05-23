import { Test, TestingModule } from '@nestjs/testing';
import { stateMock } from '../__mocks__/state.mock';
import { StateController } from '../state.controller';
import { StateService } from '../state.service';

describe('StateController', () => {
  let controller: StateController;
  let stateService: StateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StateController],
      providers: [
        {
          provide: StateService,
          useValue: {
            getAllState: jest.fn().mockResolvedValue([stateMock]),
          },
        },
      ],
    }).compile();

    controller = module.get<StateController>(StateController);
    stateService = module.get<StateService>(StateService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(stateService).toBeDefined();
  });

  it('get state entity in findStateByUserId', async () => {
    const state = await controller.getAllState();
    expect(state).toEqual([stateMock]);
  });
});
