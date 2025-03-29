import { productMock } from 'src/product/__mocks__/product.mock';
import { InsertCartDto } from '../dtos/insertCart.dto';

export const insertCartMock: InsertCartDto = {
  amount: 1,
  productId: productMock.id,
};
