import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProductEntity } from 'src/cart-product/entities/cartProduct.entity';
import { CartEntity } from 'src/cart/entities/cart.entity';
import { CreateOrderDTO } from 'src/order/dtos/createOrder.dto';
import { PaymentType } from 'src/payment-status/enum/paymentStatus.enum';
import { PaymentEntity } from 'src/payment/entities/payment.entity';
import { PaymentCreditCardEntity } from 'src/payment/entities/paymentCreditCard.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';
import { PaymentPixEntity } from './entities/paymentPix.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
  ) {}
  gerenerateFinalPrice(cart: CartEntity, products: ProductEntity[]): number {
    if (!cart.cartProduct || cart.cartProduct.length === 0) {
      return 0;
    }
    return Number(
      cart.cartProduct
        ?.map((cartProduct: CartProductEntity) => {
          const product = products.find(
            (product) => product.id === cartProduct.productId,
          );
          if (product) return cartProduct.amount * product.price;
          return 0;
        })
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        .toFixed(2),
    );
  }

  async createPayment(
    createOrder: CreateOrderDTO,
    products: ProductEntity[],
    cart: CartEntity,
  ): Promise<PaymentEntity> {
    const finalPrince = this.gerenerateFinalPrice(cart, products);
    if (createOrder?.amountPayments) {
      const paymentCreditCard = new PaymentCreditCardEntity(
        PaymentType.done,
        finalPrince,
        0,
        finalPrince,
        createOrder,
      );
      return this.paymentRepository.save(paymentCreditCard);
    } else if (createOrder.codePix && createOrder.datePayment) {
      const paymentPix = new PaymentPixEntity(
        PaymentType.done,
        finalPrince,
        0,
        finalPrince,
        createOrder,
      );
      return this.paymentRepository.save(paymentPix);
    }
    throw new BadRequestException(
      'Amount Paymensts or code pix payments not found',
    );
  }
}
