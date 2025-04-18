import { PaymentType } from 'src/payment-status/enum/paymentStatus.enum';
import { paymentEntity } from '../entities/payment.entity';

export const paymentMock: paymentEntity = {
  createdAt: new Date(),
  discount: 432,
  finalPrice: 48.4,
  id: 1,
  price: 4964.4,
  statusId: PaymentType.done,
  updatedAt: new Date(),
  type: '',
};
