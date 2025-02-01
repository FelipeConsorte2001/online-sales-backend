import { categoryMock } from 'src/category/__mock__/category.mock';
import { updateProductDTO } from '../dtos/updateproduct.dto';

export const updateProductMock: updateProductDTO = {
  categoryId: categoryMock.id,
  image: 'imagedddd',
  name: 'mock updated',
  price: 1500,
};
