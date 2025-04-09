import { CreateOrderDTO } from 'src/order/dtos/createOrder.dto';
import { ChildEntity, Column } from 'typeorm';
import { paymentEntity } from './payment.entity';

@ChildEntity()
export class PaymentCreditCardEntity extends paymentEntity {
  @Column({ name: 'amount_payments', nullable: false })
  amountPayments: number;

  constructor(
    statusId: number,
    price: number,
    discount: number,
    finalPrice: number,
    createOrderDTO: CreateOrderDTO,
  ) {
    super(statusId, price, discount, finalPrice);
    this.amountPayments = createOrderDTO?.amountPayments || 0;
  }
}
