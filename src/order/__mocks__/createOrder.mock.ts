import { addressMock } from 'src/address/__mock__/address.mock';
import { paymentCreditCartMock } from 'src/payment/__mocks__/paymentCreditCard.mock';
import { paymentPixMock } from 'src/payment/__mocks__/paymentPix.mock';
import { CreateOrderDTO } from '../dtos/createOrder.dto';

export const createOrderPixMock: CreateOrderDTO = {
  addressId: addressMock.id,
  codePix: paymentPixMock.code,
  datePayment: '2025-02-02',
};
export const createOrderCreditCardMock: CreateOrderDTO = {
  addressId: addressMock.id,
  amountPayments: paymentCreditCartMock.amountPayments,
};
