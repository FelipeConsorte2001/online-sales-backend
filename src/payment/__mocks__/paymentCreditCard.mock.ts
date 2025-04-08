import { PaymentCreditCardEntity } from '../entities/paymentCreditCard.entity';
import { paymentMock } from './payment.mock';

export const paymentCreditCartMock: PaymentCreditCardEntity = {
  ...paymentMock,
  amountPayments: 5,
};
