import { categoryMock } from 'src/category/__mock__/category.mock';
import { ProductEntity } from '../entities/product.entity';

export const productMock: ProductEntity = {
  categoryId: categoryMock.id,
  createdAt: new Date(),
  id: 7435,
  image: 'http://image.com',
  name: 'name product mock',
  price: 34.3,
  updatedAt: new Date(),
  diameter: 2,
  height: 43,
  length: 5,
  weight: 4,
  width: 2,
};
