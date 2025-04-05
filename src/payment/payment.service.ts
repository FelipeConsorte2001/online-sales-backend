import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDTO } from 'src/order/dtos/createOrder.dto';
import { PaymentType } from 'src/payment-status/enum/paymentStatus.enum';
import { PaymentEntity } from 'src/payment/entities/payment.entity';
import { PaymentCreditCardEntity } from 'src/payment/entities/paymentCreditCard.entity';
import { Repository } from 'typeorm';
import { PaymentPixEntity } from './entities/paymentPix.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
  ) {}

  async createPayment(createOrder: CreateOrderDTO): Promise<PaymentEntity> {
    if (createOrder?.amountPayments) {
      const paymentCreditCard = new PaymentCreditCardEntity(
        PaymentType.done,
        0,
        0,
        0,
        createOrder,
      );
      return this.paymentRepository.save(paymentCreditCard);
    } else if (createOrder.codePix && createOrder.datePayment) {
      const paymentPix = new PaymentPixEntity(
        PaymentType.done,
        0,
        0,
        0,
        createOrder,
      );
      return this.paymentRepository.save(paymentPix);
    }
    throw new BadRequestException(
      'Amount Paymensts or code pix payments not found',
    );
  }
}
