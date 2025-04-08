import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { cartProductMock } from 'src/cart-product/__mocks__/cartProduct.mock';
import { cartMock } from 'src/cart/__mocks__/cart.mock';
import {
    createOrderCreditCardMock,
    createOrderPixMock,
} from 'src/order/__mocks__/createOrder.mock';
import { PaymentType } from 'src/payment-status/enum/paymentStatus.enum';
import { productMock } from 'src/product/__mocks__/product.mock';
import { Repository } from 'typeorm';
import { paymentMock } from '../__mocks__/payment.mock';
import { paymentPixMock } from '../__mocks__/paymentPix.mock';
import { PaymentEntity } from '../entities/payment.entity';
import { PaymentCreditCardEntity } from '../entities/paymentCreditCard.entity';
import { PaymentPixEntity } from '../entities/paymentPix.entity';
import { PaymentService } from '../payment.service';

describe('PaymentService', () => {
  let service: PaymentService;
  let paymentRepository: Repository<PaymentEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(PaymentEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(paymentMock),
          },
        },
        PaymentService,
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
    paymentRepository = module.get<Repository<PaymentEntity>>(
      getRepositoryToken(PaymentEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(paymentRepository).toBeDefined();
  });

  it('should create payment pix', async () => {
    const spy = jest.spyOn(paymentRepository, 'save');

    const payment = await service.createPayment(
      createOrderPixMock,
      [productMock],
      cartMock,
    );

    const savePayment: PaymentPixEntity = spy.mock
      .calls[0][0] as PaymentPixEntity;
    expect(payment).toEqual(paymentMock);
    expect(savePayment.code).toEqual(paymentPixMock.code);
    expect(savePayment.datePayment).toEqual(paymentPixMock.datePayment);
  });

  it('should create payment credit card', async () => {
    const spy = jest.spyOn(paymentRepository, 'save');

    const payment = await service.createPayment(
      createOrderCreditCardMock,
      [productMock],
      cartMock,
    );

    const savePayment: PaymentCreditCardEntity = spy.mock
      .calls[0][0] as PaymentCreditCardEntity;

    expect(payment).toEqual(paymentMock);
    expect(savePayment.amountPayments).toEqual(
      createOrderCreditCardMock.amountPayments,
    );
  });

  it('should return exception in not send data', async () => {
    expect(
      service.createPayment(
        { addressId: createOrderCreditCardMock.addressId },
        [productMock],
        cartMock,
      ),
    ).rejects.toThrow(BadRequestException);
  });

  it('should return finalPrice 0 in cartProduct undefined', async () => {
    const spy = jest.spyOn(paymentRepository, 'save');

    await service.createPayment(
      createOrderCreditCardMock,
      [productMock],
      cartMock,
    );

    const savePayment: PaymentCreditCardEntity = spy.mock
      .calls[0][0] as PaymentCreditCardEntity;

    expect(savePayment.finalPrice).toEqual(0);
  });

  it('should return finalPrice cartProduct', async () => {
    const spy = jest.spyOn(paymentRepository, 'save');
    await service.createPayment(createOrderCreditCardMock, [productMock], {
      ...cartMock,
      cartProduct: [cartProductMock],
    });
    const savePayment: PaymentCreditCardEntity = spy.mock
      .calls[0][0] as PaymentCreditCardEntity;

    expect(savePayment.finalPrice).toEqual(
      cartProductMock.amount * productMock.price,
    );
  });

  it('should return all date in save payment', async () => {
    const spy = jest.spyOn(paymentRepository, 'save');
    await service.createPayment(createOrderCreditCardMock, [productMock], {
      ...cartMock,
      cartProduct: [cartProductMock],
    });
    const savePayment: PaymentCreditCardEntity = spy.mock
      .calls[0][0] as PaymentCreditCardEntity;

    const paymentCreditCard: PaymentCreditCardEntity =
      new PaymentCreditCardEntity(
        PaymentType.done,
        cartProductMock.amount * productMock.price,
        0,
        cartProductMock.amount * productMock.price,
        createOrderCreditCardMock,
      );
    expect(savePayment).toEqual(paymentCreditCard);
  });
});
