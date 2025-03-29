import { Test, TestingModule } from '@nestjs/testing';
import { ReturnDeleteMock } from 'src/__mocks__/returnDelete.mocks';
import { createProductMock } from '../__mocks__/createProduct.mock';
import { productMock } from '../__mocks__/product.mock';
import { updateProductMock } from '../__mocks__/updateProduct.mock';
import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';

describe('ProductController', () => {
  let controller: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([productMock]),
            createProduct: jest.fn().mockResolvedValue(productMock),
            deleteProduct: jest.fn().mockResolvedValue(ReturnDeleteMock),
            updateProduct: jest.fn().mockResolvedValue(productMock),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(productService).toBeDefined();
  });
  it('should return product Entity in getAllProduct', async () => {
    const product = await controller.getAllProduct();

    expect(product).toEqual([
      {
        id: productMock.id,
        name: productMock.name,
        price: productMock.price,
        image: productMock.image,
      },
    ]);
  });
  it('should return product Entity in createProduct', async () => {
    const product = await controller.createProduct(createProductMock);
    expect(product).toEqual(productMock);
  });
  it('should return product Entity in deleteProduct', async () => {
    const product = await controller.deleteProduct(productMock.id);
    expect(product).toEqual(ReturnDeleteMock);
  });
  it('should return product Entity in updateProduct', async () => {
    const product = await controller.updateProduct(
      productMock.id,
      updateProductMock,
    );

    expect(product).toEqual(productMock);
  });
});
