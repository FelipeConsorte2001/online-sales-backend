import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { DeleteResult, Repository } from 'typeorm';
import { createProductDTO } from './dtos/createProduct.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly categoryService: CategoryService,
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    const products = await this.productRepository.find();
    if (!products || products.length == 0)
      throw new NotFoundException('not found products');
    return products;
  }

  async createProduct(createProduct: createProductDTO): Promise<ProductEntity> {
    await this.categoryService.findCategoryById(createProduct.categoryId);
    return this.productRepository.save(createProduct);
  }

  async findProductById(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
    });
    if (!product) throw new NotFoundException(`product id not found`);
    return product;
  }
  async deleteProduct(id: number): Promise<DeleteResult> {
    const product = await this.findProductById(id);
    return this.productRepository.delete({ id: product.id });
  }
}
