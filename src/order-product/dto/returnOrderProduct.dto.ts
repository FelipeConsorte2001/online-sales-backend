import { returnOrderDTO } from 'src/order/dtos/returnOrder.dto';
import { returnProduct } from 'src/product/dtos/returnProduct.dto';
import { OrderProductEntity } from '../entities/orderProduct.entity';

export class returnOrderProductDTO {
  id: number;
  orderId: number;
  productId: number;
  amount: number;
  price: number;
  order?: returnOrderDTO;
  product?: returnProduct;

  constructor(orderProduct: OrderProductEntity) {
    this.id = orderProduct.id;
    this.orderId = orderProduct.orderId;
    this.productId = orderProduct.productId;
    this.amount = orderProduct.amount;
    this.price = orderProduct.price;
    this.order = orderProduct.order
      ? new returnOrderDTO(orderProduct.order)
      : undefined;
    this.product = orderProduct.product
      ? new returnProduct(orderProduct.product)
      : undefined;
  }
}
