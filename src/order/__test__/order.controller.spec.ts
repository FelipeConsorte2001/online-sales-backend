import { Test, TestingModule } from '@nestjs/testing';
import { userEntityMock } from 'src/user/__mock__/user.mock';
import { createOrderPixMock } from '../__mocks__/createOrder.mock';
import { orderMock } from '../__mocks__/order.mock';
import { OrderController } from '../order.controller';
import { OrderService } from '../order.service';

describe('OrderController', () => {
  let controller: OrderController;
  let orderService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: OrderService,
          useValue: {
            createOrder: jest.fn().mockResolvedValue(orderMock),
            findOrdersByUserId: jest.fn().mockResolvedValue([orderMock]),
          },
        },
      ],
      controllers: [OrderController],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(orderService).toBeDefined();
  });

  it('should return order in create', async () => {
    const order = await controller.createOrder(
      createOrderPixMock,
      userEntityMock.id,
    );
    expect(order).toEqual(orderMock);
  });

  it('should return order in create', async () => {
    const order = await controller.findOrdersByUserId(userEntityMock.id);
    expect(order).toEqual([orderMock]);
  });
});
