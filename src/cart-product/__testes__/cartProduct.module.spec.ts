import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ReturnDeleteMock } from 'src/__mocks__/returnDelete.mocks';
import { cartMock } from 'src/cart/__mocks__/cart.mock';
import { insertCartMock } from 'src/cart/__mocks__/insertCart.mock';
import { updateCartMock } from 'src/cart/__mocks__/updateCart.mock';
import { productMock } from 'src/product/__mocks__/product.mock';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { cartProductMock } from '../__mocks__/cartProduct.mock';
import { CartProductService } from '../cart-product.service';
import { CartProductEntity } from '../entities/cartProduct.entity';

describe('CartProductService', () => {
  let service: CartProductService;
  let productService: ProductService;
  let cartProductRepository: Repository<CartProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ProductService,
          useValue: {
            findProductById: jest.fn().mockResolvedValue(productMock),
          },
        },
        {
          provide: getRepositoryToken(CartProductEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(cartProductMock),
            save: jest.fn().mockResolvedValue(cartProductMock),
            delete: jest.fn().mockResolvedValue(ReturnDeleteMock),
          },
        },
        CartProductService,
      ],
    }).compile();

    service = module.get<CartProductService>(CartProductService);
    productService = module.get<ProductService>(ProductService);
    cartProductRepository = module.get<Repository<CartProductEntity>>(
      getRepositoryToken(CartProductEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(productService).toBeDefined();
    expect(cartProductRepository).toBeDefined();
  });

  it('should return delete result after delete product', async () => {
    const deleteResult = await service.deleteProductCart(
      productMock.id,
      cartMock.id,
    );
    expect(deleteResult).toEqual(ReturnDeleteMock);
  });

  it('should return in exception delete', async () => {
    jest.spyOn(cartProductRepository, 'delete').mockRejectedValue(new Error());
    expect(
      service.deleteProductCart(productMock.id, cartMock.id),
    ).rejects.toThrow();
  });

  it('should return cartProduct afther create', async () => {
    const productCart = await service.createProductInCart(
      insertCartMock,
      cartMock.id,
    );
    expect(productCart).toEqual(cartProductMock);
  });

  it('should return in exception save', async () => {
    jest.spyOn(cartProductRepository, 'save').mockRejectedValue(new Error());
    expect(
      service.createProductInCart(insertCartMock, cartMock.id),
    ).rejects.toThrow();
  });

  it('should return cartProduct if exist', async () => {
    const productCart = await service.verifyProductInCart(
      productMock.id,
      cartMock.id,
    );
    expect(productCart).toEqual(cartProductMock);
  });

  it('should return in exception if cart does not exist', async () => {
    jest.spyOn(cartProductRepository, 'findOne').mockResolvedValue(undefined);
    expect(
      service.verifyProductInCart(productMock.id, cartMock.id),
    ).rejects.toThrow(NotFoundException);
  });

  it('should return in exception verifyProductInCart', async () => {
    jest.spyOn(cartProductRepository, 'findOne').mockRejectedValue(new Error());
    expect(
      service.verifyProductInCart(productMock.id, cartMock.id),
    ).rejects.toThrow(Error);
  });

  it('should return error insert productCart', async () => {
    jest
      .spyOn(productService, 'findProductById')
      .mockRejectedValue(new Error());
    expect(
      service.insertProductInCart(insertCartMock, cartMock),
    ).rejects.toThrow(Error);
  });
  it('should return in exception insert productCart', async () => {
    jest
      .spyOn(productService, 'findProductById')
      .mockRejectedValue(new NotFoundException());
    expect(
      service.insertProductInCart(insertCartMock, cartMock),
    ).rejects.toThrow(NotFoundException);
  });

  it('should return in exception insert productInCart', async () => {
    const spy = jest.spyOn(cartProductRepository, 'save');
    jest.spyOn(cartProductRepository, 'findOne').mockResolvedValue(undefined);
    const cartProduct = await service.insertProductInCart(
      insertCartMock,
      cartMock,
    );
    expect(cartProduct).toEqual(cartProductMock);
    expect(spy.mock.calls[0][0].amount).toEqual(insertCartMock.amount);
  });

  it('should return cart with more amout', async () => {
    const spy = jest.spyOn(cartProductRepository, 'save');

    const cartProduct = await service.insertProductInCart(
      insertCartMock,
      cartMock,
    );

    expect(cartProduct).toEqual(cartProductMock);
    expect(spy.mock.calls[0][0]).toEqual({
      ...cartProductMock,
      amount: cartProductMock.amount + insertCartMock.amount,
    });
  });

  it('should return in exception insert updateCart', async () => {
    jest
      .spyOn(productService, 'findProductById')
      .mockRejectedValue(new NotFoundException());
    expect(
      service.updateProductInCart(updateCartMock, cartMock),
    ).rejects.toThrow(NotFoundException);
  });

  it('should return in exception insert productInCart', async () => {
    jest.spyOn(cartProductRepository, 'findOne').mockResolvedValue(undefined);
    expect(
      service.updateProductInCart(updateCartMock, cartMock),
    ).rejects.toThrow(NotFoundException);
  });

  it('should return cart with more amout(updateCart)', async () => {
    const spy = jest.spyOn(cartProductRepository, 'save');

    const cartProduct = await service.updateProductInCart(
      updateCartMock,
      cartMock,
    );

    expect(cartProduct).toEqual(cartProductMock);
    expect(spy.mock.calls[0][0].amount).toEqual(updateCartMock.amount);
  });
});
