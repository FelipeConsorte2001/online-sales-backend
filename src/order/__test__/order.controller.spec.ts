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
            findOrderById: jest.fn().mockResolvedValue([orderMock]),
            findAllOrders: jest.fn().mockResolvedValue([orderMock]),
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

  it('should return all orders', async () => {
    const spy = jest.spyOn(orderService, 'findAllOrders');

    const order = await controller.findAllOrders();
    expect(order).toEqual([
      {
        id: orderMock.id,
        date: orderMock.date.toString(),
        userId: orderMock.userId,
        addressId: orderMock.addressId,
        paymentId: orderMock.paymentId,
      },
    ]);
    expect(spy.mock.calls.length).toEqual(1);
  });

  it('should return orders in findOrderById', async () => {
    const spy = jest.spyOn(orderService, 'findOrdersByUserId');
    const orders = await controller.findOrderById(orderMock.id);

    expect(orders).toEqual({
      id: orderMock.id,
      date: orderMock.date.toString(),
      userId: orderMock.userId,
      addressId: orderMock.addressId,
      paymentId: orderMock.paymentId,
    });
    expect(spy.mock.calls.length).toEqual(1);
  });
});
