import { returnProduct } from 'src/product/dtos/returnProduct.dto';
import { CategoryEntity } from '../entities/category.entity';

export class ReturnCategory {
  id: number;
  name: string;
  amountProducts?: number;
  products?: returnProduct[];

  constructor(categoryEntity: CategoryEntity, amountProducts?: number) {
    this.id = categoryEntity.id;
    this.name = categoryEntity.name;
    this.amountProducts = amountProducts;
    this.products = categoryEntity.products
      ? categoryEntity.products.map((product) => new returnProduct(product))
      : undefined;
  }
}
