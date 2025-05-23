import { ReturnCartProductDTO } from 'src/cart-product/dtos/returnCartProduct.dto';
import { CartEntity } from '../entities/cart.entity';

export class ReturnCartDTO {
  id: number;
  cartProduct?: ReturnCartProductDTO[];

  constructor(cart: CartEntity) {
    this.id = cart.id;
    this.cartProduct = cart.cartProduct
      ? cart.cartProduct.map(
          (cartProduct) => new ReturnCartProductDTO(cartProduct),
        )
      : undefined;
  }
}
