import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserId } from 'src/decorator.ts/user-id.decorator';
import { CreateOrderDTO } from './dtos/createOrder.dto';
import { OrderEntity } from './entities/order.entity';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post('')
  @UsePipes(ValidationPipe)
  async createOrder(
    @Body() createOrder: CreateOrderDTO,
    @UserId() userId: number,
  ) {
    return this.orderService.createOrder(createOrder, userId);
  }

  @Get('')
  @UsePipes(ValidationPipe)
  async findOrdersByUserId(@UserId() UserId: number): Promise<OrderEntity[]> {
    return this.orderService.findOrdersByUserId(UserId);
  }
}
