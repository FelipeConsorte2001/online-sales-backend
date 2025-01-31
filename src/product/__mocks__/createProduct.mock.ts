import { categoryMock } from 'src/category/__mock__/category.mock';
import { createProductDTO } from '../dtos/createProduct.dto';

export const createProductMock: createProductDTO = {
  categoryId: categoryMock.id,
  image: 'image',
  name: 'mock',
  price: 1400,
};
