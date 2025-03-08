import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ReturnDeleteMock } from 'src/__mocks__/returnDelete.mocks';
import { CartProductService } from 'src/cart-product/cart-product.service';
import { productMock } from 'src/product/__mocks__/product.mock';
import { userEntityMock } from 'src/user/__mock__/user.mock';
import { Repository } from 'typeorm';
import { cartMock } from '../__mocks__/cart.mock';
import { insertCartMock } from '../__mocks__/insertCart.mock';
import { updateCartMock } from '../__mocks__/updateCart.mock';
import { CartService } from '../cart.service';
import { CartEntity } from '../entities/cart.entity';

describe('CartService', () => {
  let service: CartService;
  let cartRepository: Repository<CartEntity>;
  let cartProductService: CartProductService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: CartProductService,
          useValue: {
            insertProductInCart: jest.fn().mockResolvedValue(undefined),
            deleteProductCart: jest.fn().mockResolvedValue(ReturnDeleteMock),
            updateProductInCart: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: getRepositoryToken(CartEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(cartMock),
            findOne: jest.fn().mockResolvedValue(cartMock),
          },
        },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
    cartProductService = module.get<CartProductService>(CartProductService);
    cartRepository = module.get<Repository<CartEntity>>(
      getRepositoryToken(CartEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cartRepository).toBeDefined();
    expect(cartProductService).toBeDefined();
  });

  it('should return delete result if delete cart', async () => {
    const spy = jest.spyOn(cartRepository, 'save');
    const resultDelete = await service.clearCart(userEntityMock.id);
    expect(resultDelete).toEqual(ReturnDeleteMock);
    expect(spy.mock.calls[0][0]).toEqual({
      ...cartMock,
      active: false,
    });
  });

  it('should return error in findOne undefined', async () => {
    jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.clearCart(userEntityMock.id)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return cart by id', async () => {
    const spy = jest.spyOn(cartRepository, 'findOne');
    const cart = await service.findCartByUserId(userEntityMock.id);
    expect(cart).toEqual(cartMock);
    expect(spy.mock.calls[0][0].relations).toEqual(undefined);
  });

  it('should return cart by id with relations', async () => {
    const spy = jest.spyOn(cartRepository, 'findOne');
    const cart = await service.findCartByUserId(userEntityMock.id, true);
    expect(cart).toEqual(cartMock);
    expect(spy.mock.calls[0][0].relations).toEqual({
      cartProduct: {
        product: true,
      },
    });
  });

  it('should return cart notFoundException in sucess', async () => {
    jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);
    expect(service.findCartByUserId(userEntityMock.id)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return send info in save(createCart)', async () => {
    const spy = jest.spyOn(cartRepository, 'save');
    const cart = await service.createCart(userEntityMock.id);
    expect(cart).toEqual(cartMock);
    expect(spy.mock.calls[0][0]).toEqual({
      active: true,
      userId: userEntityMock.id,
    });
  });

  it('should return cart in cart not found(insertProductInCart)', async () => {
    jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);
    const spy = jest.spyOn(cartRepository, 'save');
    const spyCartProductService = jest.spyOn(
      cartProductService,
      'insertProductInCart',
    );

    const cart = await service.insertProductInCart(
      insertCartMock,
      userEntityMock.id,
    );
    expect(cart).toEqual(cartMock);
    expect(spy.mock.calls.length).toEqual(1);
    expect(spyCartProductService.mock.calls.length).toEqual(1);
  });

  it('should return cart in cart found(insertProductInCart)', async () => {
    jest.spyOn(cartRepository, 'findOne');
    const spy = jest.spyOn(cartRepository, 'save');
    const spyCartProductService = jest.spyOn(
      cartProductService,
      'insertProductInCart',
    );

    const cart = await service.insertProductInCart(
      insertCartMock,
      userEntityMock.id,
    );
    expect(cart).toEqual(cartMock);
    expect(spy.mock.calls.length).toEqual(0);
    expect(spyCartProductService.mock.calls.length).toEqual(1);
  });

  it('should return deleteResult in delete product cart', async () => {
    const spy = jest.spyOn(cartProductService, 'deleteProductCart');
    const deleteResult = await service.deleteProductCart(
      productMock.id,
      userEntityMock.id,
    );
    expect(deleteResult).toEqual(ReturnDeleteMock);
    expect(spy.mock.calls.length).toEqual(1);
  });

  it('should return deleteResult in delete product cart', async () => {
    jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);
    const spy = jest.spyOn(cartProductService, 'deleteProductCart');
    expect(
      service.deleteProductCart(productMock.id, userEntityMock.id),
    ).rejects.toThrow(NotFoundException);
    expect(spy.mock.calls.length).toEqual(0);
  });

  it('should return notFoundException in cart not exist', async () => {
    const spyCartProductService = jest.spyOn(
      cartProductService,
      'updateProductInCart',
    );
    const spySave = jest.spyOn(cartRepository, 'save');
    const cart = await service.updateProductInCart(
      updateCartMock,
      userEntityMock.id,
    );
    expect(cart).toEqual(cartMock);
    expect(spyCartProductService.mock.calls.length).toEqual(1);
    expect(spySave.mock.calls.length).toEqual(0);
  });

  it('should return cart in createCart', async () => {
    jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);
    const spySave = jest.spyOn(cartRepository, 'save');
    const cart = await service.updateProductInCart(
      updateCartMock,
      userEntityMock.id,
    );
    expect(cart).toEqual(cartMock);
    expect(spySave.mock.calls.length).toEqual(1);
  });
});
