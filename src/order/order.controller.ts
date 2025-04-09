import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'src/decorator.ts/roles.decorator';
import { UserId } from 'src/decorator.ts/user-id.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { CreateOrderDTO } from './dtos/createOrder.dto';
import { returnOrderDTO } from './dtos/returnOrder.dto';
import { OrderEntity } from './entities/order.entity';
import { OrderService } from './order.service';

@Roles(UserType.Admin, UserType.User)
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

  @Roles(UserType.Admin)
  @Get('/all')
  @UsePipes(ValidationPipe)
  async findAllOrders(): Promise<returnOrderDTO[]> {
    return (await this.orderService.findAllOrders()).map(
      (order) => new returnOrderDTO(order),
    );
  }

  @Roles(UserType.Admin)
  @Get('/:orderId')
  @UsePipes(ValidationPipe)
  async findOrderById(@Param('orderId') id: number): Promise<returnOrderDTO[]> {
    return (await this.orderService.findOrdersByUserId(undefined, id)).map(
      (order) => new returnOrderDTO(order),
    );
  }
}
