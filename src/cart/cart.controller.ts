import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'src/decorator.ts/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';

import { UserId } from 'src/decorator.ts/user-id.decorator';
import { DeleteResult } from 'typeorm';
import { CartService } from './cart.service';
import { InsertCartDto } from './dtos/insertCart.dto';
import { ReturnCartDTO } from './dtos/returnCart.dto';
import { UpdateCartDTO } from './dtos/updateCart.dto';

@Roles(UserType.Admin, UserType.Root, UserType.User)
@Roles(UserType.User)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @UsePipes(ValidationPipe)
  @Post()
  async createCart(
    @Body() insertCart: InsertCartDto,
    @UserId() userId: number,
  ): Promise<ReturnCartDTO> {
    return new ReturnCartDTO(
      await this.cartService.insertProductInCart(insertCart, userId),
    );
  }
  @Get()
  async findCartByUserId(@UserId() UserId: number): Promise<ReturnCartDTO> {
    return this.cartService.findCartByUserId(UserId, true);
  }

  @Delete()
  async clearCart(@UserId() userId: number): Promise<DeleteResult> {
    return this.cartService.clearCart(userId);
  }
  @Delete('/product/:prodoctId')
  async deleteProductCart(
    @Param('prodoctId') prodoctId: number,
    @UserId() userId: number,
  ): Promise<DeleteResult> {
    return this.cartService.deleteProductCart(prodoctId, userId);
  }

  @UsePipes(ValidationPipe)
  @Patch()
  async updateProductInCart(
    @Body() updateCart: UpdateCartDTO,
    @UserId() userId: number,
  ): Promise<ReturnCartDTO> {
    return new ReturnCartDTO(
      await this.cartService.updateProductInCart(updateCart, userId),
    );
  }
}
