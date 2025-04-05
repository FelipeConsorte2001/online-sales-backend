import {
  Body,
  Controller,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserId } from 'src/decorator.ts/user-id.decorator';
import { CreateOrderDTO } from './dtos/createOrder.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post('cart/:cartId')
  @UsePipes(ValidationPipe)
  async createOrder(
    @Body() createOrder: CreateOrderDTO,
    @Param('cartId') cartId: number,
    @UserId() userId: number,
  ) {
    return this.orderService.createOrder(createOrder, cartId, userId);
  }
}
