import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'src/decorator.ts/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';

import { UserId } from 'src/decorator.ts/user-id.decorator';
import { CartService } from './cart.service';
import { InsertCartDto } from './dtos/insertCart.dto';
import { CartEntity } from './entities/cart.entity';

@Roles(UserType.Admin, UserType.User)
@Roles(UserType.User)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @UsePipes(ValidationPipe)
  @Post()
  async createCart(
    @Body() insertCart: InsertCartDto,
    @UserId() userId: number,
  ): Promise<CartEntity> {
    return this.cartService.InsertProductInCart(insertCart, userId);
  }
}
