import { PaymentPixEntity } from '../entities/paymentPix.entity';
import { PaymentMock } from './payment.mock';

export const paymentPixMock: PaymentPixEntity = {
  ...PaymentMock,
  code: 'code',
  datePayment: new Date('2025-02-02'),
};
