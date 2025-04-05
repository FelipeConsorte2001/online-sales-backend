import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartService } from 'src/cart/cart.service';
import { OrderProductService } from 'src/order-product/order-product.service';
import { PaymentEntity } from 'src/payment/entities/payment.entity';
import { PaymentService } from 'src/payment/payment.service';
import { Repository } from 'typeorm';
import { CreateOrderDTO } from './dtos/createOrder.dto';
import { OrderEntity } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly paymentService: PaymentService,
    private readonly cartService: CartService,
    private readonly productOrderService: OrderProductService,
  ) {}

  async createOrder(
    createOrder: CreateOrderDTO,
    cartId: number,
    userId: number,
  ) {
    const payment: PaymentEntity =
      await this.paymentService.createPayment(createOrder);

    const order = await this.orderRepository.save({
      addressId: createOrder.addressId,
      date: new Date(),
      paymentId: payment.id,
      userId,
    });
    const cart = await this.cartService.findCartByUserId(userId, true);

    cart.cartProduct?.forEach((cartProduct) => {
      this.productOrderService.createOrderProduct(
        cartProduct.productId,
        order.id,
        0,
        cartProduct.amount,
      );
    });
    return null;
  }
}
