import { CreateOrderDTO } from 'src/order/dtos/createOrder.dto';
import { ChildEntity, Column } from 'typeorm';
import { paymentEntity } from './payment.entity';

@ChildEntity()
export class PaymentPixEntity extends paymentEntity {
  @Column({ name: 'code', nullable: false })
  code: string;

  @Column({ name: 'date_payment', nullable: false })
  datePayment: Date;

  constructor(
    statusId: number,
    price: number,
    discount: number,
    finalPrice: number,
    createOrder: CreateOrderDTO,
  ) {
    super(statusId, price, discount, finalPrice);
    this.code = createOrder?.codePix || '';
    this.datePayment = new Date(createOrder?.datePayment || '');
  }
}
