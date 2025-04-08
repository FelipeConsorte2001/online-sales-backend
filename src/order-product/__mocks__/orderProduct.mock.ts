import { cartProductMock } from 'src/cart-product/__mocks__/cartProduct.mock';
import { orderMock } from 'src/order/__mocks__/order.mock';
import { productMock } from 'src/product/__mocks__/product.mock';
import { OrderProductEntity } from '../entities/orderProduct.entity';

export const orderProductMock: OrderProductEntity = {
  amount: cartProductMock.amount,
  createdAt: new Date(),
  updatedAt: new Date(),
  id: 1,
  orderId: orderMock.id,
  price: productMock.price,
  productId: productMock.id,
};
