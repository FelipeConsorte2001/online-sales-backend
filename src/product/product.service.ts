import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { CountProduct } from 'src/category/dtos/countProduct,dto';
import { DeleteResult, In, Repository } from 'typeorm';
import { createProductDTO } from './dtos/createProduct.dto';
import { updateProductDTO } from './dtos/updateproduct.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    @Inject(forwardRef(() => CategoryService))
    private readonly categoryService: CategoryService,
  ) {}

  async findAll(
    productId?: number[],
    isFindRelations?: boolean,
  ): Promise<ProductEntity[]> {
    let findOptions = {};
    if (productId && productId.length > 0) {
      findOptions = {
        where: {
          id: In(productId),
        },
      };
    }
    if (isFindRelations) {
      findOptions = {
        ...findOptions,
        relations: {
          category: true,
        },
      };
    }
    const products = await this.productRepository.find(findOptions);
    if (!products || products.length == 0)
      throw new NotFoundException('not found products');
    return products;
  }

  async createProduct(createProduct: createProductDTO): Promise<ProductEntity> {
    await this.categoryService.findCategoryById(createProduct.categoryId);
    return this.productRepository.save(createProduct);
  }

  async findProductById(
    id: number,
    isRelations?: boolean,
  ): Promise<ProductEntity> {
    const relations = isRelations
      ? {
          category: true,
        }
      : undefined;
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
      relations: relations,
    });
    if (!product) throw new NotFoundException(`product id not found`);
    return product;
  }
  async deleteProduct(id: number): Promise<DeleteResult> {
    const product = await this.findProductById(id);
    return this.productRepository.delete({ id: product.id });
  }
  async updateProduct(
    updateProduct: updateProductDTO,
    id: number,
  ): Promise<ProductEntity> {
    const product = await this.findProductById(id);

    return this.productRepository.save({ ...product, ...updateProduct });
  }

  async countProductsByCategoryId(): Promise<CountProduct[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .select(['product.category_id', 'COUNT(product.id) AS TOTAL'])
      .groupBy('product.category_id')
      .getRawMany();
  }
}
