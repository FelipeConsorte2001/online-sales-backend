import { cartMock } from 'src/cart/__mocks__/cart.mock';
import { productMock } from 'src/product/__mocks__/product.mock';
import { CartProductEntity } from '../entities/cartProduct.entity';

export const cartProductMock: CartProductEntity = {
  amount: 1,
  cartId: cartMock.id,
  createdAt: new Date(),
  id: 1,
  productId: productMock.id,
  updatedAt: new Date(),
};
