import { paymentStatusEntity } from '../entities/paymentStatus.entity';

export class returnPaymentStatus {
  id: number;
  name: string;

  constructor(paymentStatus: paymentStatusEntity) {
    this.id = paymentStatus.id;
    this.name = paymentStatus.name;
  }
}
