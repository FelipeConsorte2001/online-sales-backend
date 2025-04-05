import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentService } from 'src/payment/payment.service';
import { Repository } from 'typeorm';
import { CreateOrderDTO } from './dtos/createOrder.dto';
import { OrderEntity } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderEntity: Repository<OrderEntity>,
    private readonly paymentService: PaymentService,
  ) {}

  async createOrder(createOrder: CreateOrderDTO, cartId: number) {
    await this.paymentService.createPayment(createOrder);
  }
}
