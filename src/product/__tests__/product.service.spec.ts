import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ReturnDeleteMock } from 'src/__mocks__/returnDelete.mocks';
import { CategoryService } from 'src/category/category.service';
import { In, Repository } from 'typeorm';
import { createProductMock } from '../__mocks__/createProduct.mock';
import { productMock } from '../__mocks__/product.mock';
import { updateProductMock } from '../__mocks__/updateProduct.mock';
import { ProductEntity } from '../entities/product.entity';
import { ProductModule } from '../product.module';
import { ProductService } from '../product.service';

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: Repository<ProductEntity>;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: CategoryService,
          useValue: {
            findCategoryById: jest.fn().mockResolvedValue(ProductModule),
          },
        },
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([productMock]),
            save: jest.fn().mockResolvedValue(productMock),
            findOne: jest.fn().mockResolvedValue(productMock),
            delete: jest.fn().mockResolvedValue(ReturnDeleteMock),
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    categoryService = module.get<CategoryService>(CategoryService);
    productRepository = module.get<Repository<ProductEntity>>(
      getRepositoryToken(ProductEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(categoryService).toBeDefined();
    expect(productRepository).toBeDefined();
  });

  it('should return all products', async () => {
    const products = await service.findAll();
    expect(products).toEqual([productMock]);
  });

  it('should return error if products empty', async () => {
    jest.spyOn(productRepository, 'find').mockResolvedValue([]);
    expect(service.findAll()).rejects.toThrow();
  });

  it('should return error in exception', async () => {
    jest.spyOn(productRepository, 'find').mockRejectedValue(new Error());
    expect(service.findAll()).rejects.toThrow();
  });

  it('should return product after insert in DB', async () => {
    const product = await service.createProduct(createProductMock);
    expect(product).toEqual(productMock);
  });

  it('should return product after insert in DB', async () => {
    jest
      .spyOn(categoryService, 'findCategoryById')
      .mockRejectedValue(new Error());
    expect(service.createProduct(createProductMock)).rejects.toThrow();
  });

  it('should return a product by id', async () => {
    const product = await service.findProductById(productMock.id);
    expect(product).toEqual(productMock);
  });

  it('should return erro id product does not exist', async () => {
    jest.spyOn(productRepository, 'findOne').mockRejectedValue(new Error());
    expect(service.findProductById).rejects.toThrow();
  });

  it('should return deleted true in delete product', async () => {
    const product = await service.deleteProduct(productMock.id);
    expect(product).toEqual(ReturnDeleteMock);
  });

  it('should product afther update', async () => {
    const product = await service.updateProduct(
      updateProductMock,
      productMock.id,
    );
    expect(product).toEqual(productMock);
  });

  it('should return erro in update product', async () => {
    jest.spyOn(productRepository, 'save').mockRejectedValue(new Error());
    expect(
      service.updateProduct(updateProductMock, productMock.id),
    ).rejects.toThrow();
  });

  it('should return relations in find all products', async () => {
    const spy = jest.spyOn(productRepository, 'find');
    const products = await service.findAll([], true);
    expect(products).toEqual([productMock]);
    expect(spy.mock.calls[0][0]).toEqual({
      relations: {
        category: true,
      },
    });
  });

  it('should return relations in find all products', async () => {
    const spy = jest.spyOn(productRepository, 'find');
    const products = await service.findAll([productMock.id], true);
    expect(products).toEqual([productMock]);
    expect(spy.mock.calls[0][0]).toEqual({
      where: {
        id: In([productMock.id]),
      },
      relations: {
        category: true,
      },
    });
  });
});
