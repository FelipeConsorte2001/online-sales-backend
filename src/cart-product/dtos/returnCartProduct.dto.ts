import { ReturnCartDTO } from 'src/cart/dtos/returnCart.dto';
import { returnProduct } from 'src/product/dtos/returnProduct.dto';
import { CartProductEntity } from '../entities/cartProduct.entity';

export class ReturnCartProductDTO {
  id: number;
  cartId: number;
  productId: number;
  amount: number;
  product?: returnProduct;
  cart?: ReturnCartDTO;
  constructor(cartProduct: CartProductEntity) {
    this.id = cartProduct.id;
    this.cartId = cartProduct.cartId;
    this.productId = cartProduct.productId;
    this.amount = cartProduct.amount;
    this.product = cartProduct.product
      ? new returnProduct(cartProduct.product)
      : undefined;
    this.cart = cartProduct.cart
      ? new ReturnCartDTO(cartProduct.cart)
      : undefined;
  }
}
