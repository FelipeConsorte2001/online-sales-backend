import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { DeleteResult, Repository } from 'typeorm';
import { ReturnCategory } from './dtos/category.dto';
import { CountProduct } from './dtos/countProduct,dto';
import { createCategory } from './dtos/createCategory.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,

    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
  ) {}

  findAmountCategoryInProducts(
    category: CategoryEntity,
    countList: CountProduct[],
  ): number {
    const count = countList.find(
      (itemCount) => itemCount.category_id === category.id,
    );
    if (count) return count.total;
    return 0;
  }

  async findAllCategories(): Promise<ReturnCategory[]> {
    const categories = await this.categoryRepository.find();
    const count = await this.productService.countProductsByCategoryId();
    if (!categories || categories.length == 0)
      throw new NotFoundException('Categories empty');
    return categories.map((category) => {
      return new ReturnCategory(
        category,
        this.findAmountCategoryInProducts(category, count),
      );
    });
  }
  async createCategory(
    createCategory: createCategory,
  ): Promise<CategoryEntity> {
    const category = await this.findCategoryByName(createCategory.name).catch(
      () => undefined,
    );
    if (category) throw new BadRequestException('categoty already exist');
    return this.categoryRepository.save(createCategory);
  }

  async findCategoryByName(name: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository
      .findOne({ where: { name } })
      .catch(() => undefined);
    if (!category) {
      throw new NotFoundException('category not found');
    }
    return category;
  }

  async findCategoryById(
    id: number,
    isRelations?: boolean,
  ): Promise<CategoryEntity> {
    const relations = isRelations ? { products: true } : undefined;

    const category = await this.categoryRepository
      .findOne({ where: { id: id }, relations })
      .catch(() => undefined);
    if (!category) {
      throw new NotFoundException('category not found');
    }
    return category;
  }

  async deleteCategory(id: number): Promise<DeleteResult> {
    const category = await this.findCategoryById(id, true);
    if (category.products?.length > 0) {
      throw new BadRequestException('Category with relations.');
    }
    return this.categoryRepository.delete(id);
  }
}
