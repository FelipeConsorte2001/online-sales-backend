import { returnAddressDto } from 'src/address/dto/returnAddress.dto';
import { returnOrderProductDTO } from 'src/order-product/dto/returnOrderProduct.dto';
import { returnPaymentDTO } from 'src/payment/dto/returnPayment.dto';
import { ReturnUserDto } from '../../user/dtos/returnUser.dto';
import { OrderEntity } from '../entities/order.entity';

export class returnOrderDTO {
  id: number;
  date: string;
  userId: number;
  addressId: number;
  paymentId: number;
  user?: ReturnUserDto;
  address?: returnAddressDto;
  payment?: returnPaymentDTO;
  ordersProduct?: returnOrderProductDTO[];
  amountProducts?: number;

  constructor(order?: OrderEntity) {
    this.id = order?.id;
    this.date = order?.date.toString();
    this.userId = order?.userId;
    this.addressId = order?.addressId;
    this.paymentId = order?.paymentId;
    this.user = order?.user ? new ReturnUserDto(order?.user) : undefined;
    this.address = order?.address
      ? new returnAddressDto(order?.address)
      : undefined;
    this.payment = order?.payment
      ? new returnPaymentDTO(order?.payment)
      : undefined;
    this.ordersProduct = order?.ordersProduct
      ? order?.ordersProduct.map(
          (orderProduct) => new returnOrderProductDTO(orderProduct),
        )
      : undefined;
    this.amountProducts = order?.amountProducts;
  }
}
