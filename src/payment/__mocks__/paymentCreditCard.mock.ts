import { PaymentCreditCardEntity } from '../entities/paymentCreditCard.entity';
import { PaymentMock } from './payment.mock';

export const paymentCreditCartMock: PaymentCreditCardEntity = {
  ...PaymentMock,
  amountPayments: 5,
};
