import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertCartDto } from 'src/cart/dtos/insertCart.dto';
import { CartEntity } from 'src/cart/entities/cart.entity';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { CartProductEntity } from './entities/cartProduct.entity';
@Injectable()
export class CartProductService {
  constructor(
    @InjectRepository(CartProductEntity)
    private readonly cartProductRepository: Repository<CartProductEntity>,
    private readonly productService: ProductService,
  ) {}
  async verifyProductInCart(
    productId: number,
    cartId: number,
  ): Promise<CartProductEntity> {
    const cartProduct = await this.cartProductRepository.findOne({
      where: {
        productId,
        cartId,
      },
    });
    if (!cartProduct) {
      throw new NotFoundException('Product not found in cart');
    }
    return cartProduct;
  }
  async createProductInCart(
    InsertCartDto: InsertCartDto,
    cartId: number,
  ): Promise<CartProductEntity> {
    return this.cartProductRepository.save({
      amount: InsertCartDto.amount,
      productId: InsertCartDto.productId,
      cartId,
    });
  }
  async insertProductInCart(
    InsertCartDto: InsertCartDto,
    cart: CartEntity,
  ): Promise<CartProductEntity> {
    await this.productService.findProductById(InsertCartDto.productId);
    const cartProduct = await this.verifyProductInCart(
      InsertCartDto.productId,
      cart.id,
    ).catch(() => undefined);
    if (!cartProduct) {
      return this.createProductInCart(InsertCartDto, cart.id);
    }
    return this.cartProductRepository.save({
      ...cartProduct,
      amount: cartProduct.amount + InsertCartDto.amount,
    });
  }
}
