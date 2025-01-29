import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createCategory } from './dtos/createCategory.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async findAllCategories(): Promise<CategoryEntity[]> {
    const categories = await this.categoryRepository.find();
    if (!categories || categories.length == 0)
      throw new NotFoundException('Categories empty');
    return categories;
  }
  async createCategory(
    createCategory: createCategory,
  ): Promise<CategoryEntity> {
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
}
