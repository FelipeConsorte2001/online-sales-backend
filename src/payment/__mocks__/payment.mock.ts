import { PaymentType } from 'src/payment-status/enum/paymentStatus.enum';
import { PaymentEntity } from '../entities/payment.entity';

export const PaymentMock: PaymentEntity = {
  createdAt: new Date(),
  discount: 432,
  finalPrice: 48.4,
  id: 1,
  price: 4964.4,
  statusId: PaymentType.done,
  updatedAt: new Date(),
  type: '',
};
