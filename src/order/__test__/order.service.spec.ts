import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CartService } from 'src/cart/cart.service';
import { OrderProductService } from 'src/order-product/order-product.service';
import { PaymentService } from 'src/payment/payment.service';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
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
            createPayment: jest.fn(),
          },
        },
        {
          provide: CartService,
          useValue: {
            findCartByUserId: jest.fn(),
            clearCart: jest.fn(),
          },
        },
        {
          provide: OrderProductService,
          useValue: {
            createOrderProduct: jest.fn(),
          },
        },
        {
          provide: ProductService,
          useValue: {
            findAll: jest.fn(),
          },
        },
        OrderService,
        {
          provide: getRepositoryToken(OrderEntity),
          useValue: {
            save: jest.fn,
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
});
