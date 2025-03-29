import { Test, TestingModule } from '@nestjs/testing';
import { ReturnDeleteMock } from 'src/__mocks__/returnDelete.mocks';
import { userEntityMock } from 'src/user/__mock__/user.mock';
import { cartMock } from '../__mocks__/cart.mock';
import { insertCartMock } from '../__mocks__/insertCart.mock';
import { updateCartMock } from '../__mocks__/updateCart.mock';
import { CartController } from '../cart.controller';
import { CartService } from '../cart.service';

describe('CartController', () => {
  let controller: CartController;
  let cartService: CartService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [
        {
          provide: CartService,
          useValue: {
            insertProductInCart: jest.fn().mockResolvedValue(cartMock),
            findCartByUserId: jest.fn().mockResolvedValue(cartMock),
            clearCart: jest.fn().mockResolvedValue(ReturnDeleteMock),
            updateProductInCart: jest.fn().mockResolvedValue(cartMock),
          },
        },
      ],
    }).compile();

    controller = module.get<CartController>(CartController);
    cartService = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(cartService).toBeDefined();
  });

  it('should return cart entinty in insertProductCart', async () => {
    const cart = await controller.createCart(insertCartMock, userEntityMock.id);
    expect(cart).toEqual({ id: cartMock.id });
  });

  it('should return cart entinty in findCartByUserId', async () => {
    const cart = await controller.findCartByUserId(userEntityMock.id);
    expect(cart).toEqual(cartMock);
  });

  it('should return cart entinty in clearCart', async () => {
    const cart = await controller.clearCart(userEntityMock.id);
    expect(cart).toEqual(ReturnDeleteMock);
  });

  it('should return cart entinty in updateProductInCart', async () => {
    const cart = await controller.updateProductInCart(
      updateCartMock,
      userEntityMock.id,
    );
    expect(cart).toEqual({ id: cartMock.id });
  });
});
