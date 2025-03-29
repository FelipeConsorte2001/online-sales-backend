import { ChildEntity, Column } from 'typeorm';
import { PaymentEntity } from './payment.entity';

@ChildEntity()
export abstract class PaymentPixEntity extends PaymentEntity {
  @Column({ name: 'status_id', nullable: false })
  code: number;

  @Column({ name: 'price', nullable: false })
  datePayment: Date;
}
