import { PaymentPixEntity } from '../entities/paymentPix.entity';
import { paymentMock } from './payment.mock';

export const paymentPixMock: PaymentPixEntity = {
  ...paymentMock,
  code: 'code',
  datePayment: new Date('2025-02-02'),
};
