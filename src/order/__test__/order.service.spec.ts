import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { cartProductMock } from 'src/cart-product/__mocks__/cartProduct.mock';
import { cartMock } from 'src/cart/__mocks__/cart.mock';
import { CartService } from 'src/cart/cart.service';
import { orderProductMock } from 'src/order-product/__mocks__/orderProduct.mock';
import { groupOrderMock } from 'src/order-product/__mocks__/returnGroupBy.mock';
import { OrderProductService } from 'src/order-product/order-product.service';
import { paymentMock } from 'src/payment/__mocks__/payment.mock';
import { PaymentService } from 'src/payment/payment.service';
import { productMock } from 'src/product/__mocks__/product.mock';
import { ProductService } from 'src/product/product.service';
import { userEntityMock } from 'src/user/__mock__/user.mock';
import { Repository } from 'typeorm';
import { createOrderPixMock } from '../__mocks__/createOrder.mock';
import { orderMock } from '../__mocks__/order.mock';
import { OrderEntity } from '../entities/order.entity';
import { OrderService } from '../order.service';

describe('OrderService', () => {
  let service: OrderService;
  let orderRepositoty: Repository<OrderEntity>;
  let paymentService: PaymentService;
  let cartService: CartService;
  let orderProductService: OrderProductService;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PaymentService,
          useValue: {
            createPayment: jest.fn().mockResolvedValue(paymentMock),
          },
        },
        {
          provide: CartService,
          useValue: {
            findCartByUserId: jest.fn().mockResolvedValue({
              ...cartMock,
              cartProduct: [cartProductMock],
            }),
            clearCart: jest.fn(),
          },
        },
        {
          provide: OrderProductService,
          useValue: {
            createOrderProduct: jest.fn().mockResolvedValue(orderProductMock),
            findAmountProductByOrderId: jest
              .fn()
              .mockResolvedValue([groupOrderMock]),
          },
        },
        {
          provide: ProductService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([productMock]),
          },
        },
        OrderService,
        {
          provide: getRepositoryToken(OrderEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([orderMock]),
            save: jest.fn().mockResolvedValue(orderMock),
          },
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    paymentService = module.get<PaymentService>(PaymentService);
    cartService = module.get<CartService>(CartService);
    orderProductService = module.get<OrderProductService>(OrderProductService);
    productService = module.get<ProductService>(ProductService);
    orderRepositoty = module.get<Repository<OrderEntity>>(
      getRepositoryToken(OrderEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(orderRepositoty).toBeDefined();
    expect(paymentService).toBeDefined();
    expect(cartService).toBeDefined();
    expect(orderProductService).toBeDefined();
    expect(productService).toBeDefined();
  });

  it('should return orders', async () => {
    const spy = jest.spyOn(orderRepositoty, 'find');
    const orders = await service.findOrdersByUserId(userEntityMock.id);

    expect(orders).toEqual([orderMock]);
    expect(spy.mock.calls[0][0]).toEqual({
      where: {
        userId: userEntityMock.id,
        id: undefined,
      },
      relations: {
        address: { city: { state: true } },
        ordersProduct: {
          product: true,
        },
        payment: {
          paymentStatus: true,
        },
        user: false,
      },
    });
  });

  it('should not return orders', async () => {
    jest.spyOn(orderRepositoty, 'find').mockResolvedValue([]);
    expect(service.findOrdersByUserId(userEntityMock.id)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should call createOrderProduct amoutn in product cart', async () => {
    const spyOrderProduct = jest.spyOn(
      orderProductService,
      'createOrderProduct',
    );
    const createOrderProductCart = await service.createOrderProductUsingCart(
      { ...cartMock, cartProduct: [cartProductMock, cartProductMock] },
      orderMock.id,
      [productMock],
    );
    expect(createOrderProductCart).toEqual([
      orderProductMock,
      orderProductMock,
    ]);
    expect(spyOrderProduct.mock.calls.length).toEqual(2);
  });

  it('should return order in createOrder', async () => {
    jest.spyOn(orderRepositoty, 'save').mockRejectedValue(new Error());

    expect(
      service.saveOrder(createOrderPixMock, userEntityMock.id, paymentMock),
    ).rejects.toThrow();
  });

  it('should return order in create order sucess', async () => {
    const order = await service.createOrder(
      createOrderPixMock,
      userEntityMock.id,
    );
    expect(order).toEqual(orderMock);
  });

  it('should return order in create order sucess', async () => {
    const spyCartService = jest.spyOn(cartService, 'findCartByUserId');
    const spyCartServiceClear = jest.spyOn(cartService, 'clearCart');
    const spyProductService = jest.spyOn(productService, 'findAll');
    const spyPaymentService = jest.spyOn(paymentService, 'createPayment');
    const spySave = jest.spyOn(orderRepositoty, 'save');
    const orderProductServiceSpy = jest.spyOn(
      orderProductService,
      'createOrderProduct',
    );

    const order = await service.createOrder(
      createOrderPixMock,
      userEntityMock.id,
    );
    expect(order).toEqual(orderMock);
    expect(spyCartService.mock.calls.length).toEqual(1);
    expect(spyCartServiceClear.mock.calls.length).toEqual(1);
    expect(spyProductService.mock.calls.length).toEqual(1);
    expect(spyPaymentService.mock.calls.length).toEqual(1);
    expect(spySave.mock.calls.length).toEqual(1);
    expect(orderProductServiceSpy.mock.calls.length).toEqual(1);
  });

  it('should return all orders', async () => {
    const spy = jest.spyOn(orderRepositoty, 'find');

    const order = await service.findAllOrders();
    expect(order).toEqual([
      { ...orderMock, amountProducts: Number(groupOrderMock.total) },
    ]);
    expect(spy.mock.calls[0][0]).toEqual({
      relations: {
        user: true,
      },
    });
  });

  it('should return erro in findAllOrders', async () => {
    jest.spyOn(orderRepositoty, 'find').mockResolvedValue([]);
    expect(service.findAllOrders()).rejects.toThrow(
      new NotFoundException('orders not found'),
    );
  });
});
