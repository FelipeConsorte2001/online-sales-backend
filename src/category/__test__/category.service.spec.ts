import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ReturnDeleteMock } from 'src/__mocks__/returnDelete.mocks';
import { countProductMock } from 'src/product/__mocks__/countProduct.mock';
import { productMock } from 'src/product/__mocks__/product.mock';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { categoryMock } from '../__mock__/category.mock';
import { createCategoryMock } from '../__mock__/createCategory.mock';
import { updateCategoryMock } from '../__mock__/updateCategory.mock';
import { CategoryService } from '../category.service';
import { ReturnCategory } from '../dtos/category.dto';
import { CategoryEntity } from '../entities/category.entity';

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepository: Repository<CategoryEntity>;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([categoryMock]),
            save: jest.fn().mockResolvedValue(categoryMock),
            findOne: jest.fn().mockResolvedValue(categoryMock),
            delete: jest.fn().mockResolvedValue(ReturnDeleteMock),
          },
        },
        {
          provide: ProductService,
          useValue: {
            countProductsByCategoryId: jest
              .fn()
              .mockResolvedValue([countProductMock]),
          },
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<Repository<CategoryEntity>>(
      getRepositoryToken(CategoryEntity),
    );
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(categoryRepository).toBeDefined();
    expect(productService).toBeDefined();
  });

  it('should return list category', async () => {
    const categories = await service.findAllCategories();
    expect(categories).toEqual([
      new ReturnCategory(categoryMock, countProductMock.total),
    ]);
  });

  it('should return error in list category empty', async () => {
    jest.spyOn(categoryRepository, 'find').mockResolvedValue([]);
    expect(service.findAllCategories()).rejects.toThrow();
  });

  it('should return error in list category exception', async () => {
    jest.spyOn(categoryRepository, 'find').mockRejectedValue(new Error());
    expect(service.findAllCategories()).rejects.toThrow();
  });

  it('should return error if exist category name', async () => {
    expect(service.createCategory(createCategoryMock)).rejects.toThrow();
  });

  it('should return category after save', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(undefined);
    const category = await service.createCategory(createCategoryMock);
    expect(category).toEqual(categoryMock);
  });

  it('should return error in exception', async () => {
    jest.spyOn(categoryRepository, 'save').mockRejectedValue(new Error());
    expect(service.createCategory(createCategoryMock)).rejects.toThrow();
  });

  it('should return category in find by name', async () => {
    const category = await service.findCategoryByName(categoryMock.name);
    expect(category).toEqual(categoryMock);
  });
  it('should return category in find by id', async () => {
    const category = await service.findCategoryById(categoryMock.id);
    expect(category).toEqual(categoryMock);
  });

  it('should return error if category find by name empty', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(undefined);
    expect(service.findCategoryByName(categoryMock.name)).rejects.toThrow();
  });

  it('should return error if category find by name empty', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(undefined);
    expect(service.findCategoryById(categoryMock.id)).rejects.toThrow();
  });

  it('should return delete result in sucess', async () => {
    const category = await service.deleteCategory(categoryMock.id);
    expect(category).toEqual(ReturnDeleteMock);
  });

  it('should send relations inrequest findOne', async () => {
    const spy = jest.spyOn(categoryRepository, 'findOne');
    await service.deleteCategory(categoryMock.id);
    expect(spy.mock.calls[0][0]).toEqual({
      where: { id: categoryMock.id },
      relations: { products: true },
    });
  });

  it('should return error if category with relations', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue({
      ...categoryMock,
      products: [productMock],
    });
    expect(service.deleteCategory(categoryMock.id)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should return category in update category', async () => {
    const spy = jest.spyOn(categoryRepository, 'findOne');
    const category = await service.updateCategory(
      categoryMock.id,
      updateCategoryMock,
    );
    expect(category).toEqual(categoryMock);
    expect(spy.mock.calls.length > 0).toEqual(true);
  });

  it('should send new category to save', async () => {
    const spy = jest.spyOn(categoryRepository, 'save');
    const category = await service.updateCategory(
      categoryMock.id,
      updateCategoryMock,
    );
    expect(category).toEqual(categoryMock);
    expect(spy.mock.calls[0][0]).toEqual({
      ...categoryMock,
      ...updateCategoryMock,
    });
  });
});
