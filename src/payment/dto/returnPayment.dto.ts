import { returnPaymentStatus } from 'src/payment-status/dto/returnPaymentStatus.dto';
import { paymentEntity } from '../entities/payment.entity';

export class returnPaymentDTO {
  id: number;
  statusId: number;
  price: number;
  discount: number;
  finalPrice: number;
  type: string;
  paymentStatus?: returnPaymentStatus;

  constructor(payment: paymentEntity) {
    this.id = payment.id;
    this.statusId = payment.statusId;
    this.price = payment.price;
    this.discount = payment.discount;
    this.finalPrice = payment.finalPrice;
    this.type = payment.type;
    this.paymentStatus = payment.paymentStatus
      ? new returnPaymentStatus(payment.paymentStatus)
      : undefined;
  }
}
