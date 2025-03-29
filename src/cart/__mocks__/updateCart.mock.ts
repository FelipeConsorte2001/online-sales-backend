import { productMock } from 'src/product/__mocks__/product.mock';
import { UpdateCartDTO } from '../dtos/updateCart.dto';

export const updateCartMock: UpdateCartDTO = {
  amount: 2,
  productId: productMock.id,
};
