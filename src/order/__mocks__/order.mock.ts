import { addressMock } from 'src/address/__mock__/address.mock';
import { PaymentMock } from 'src/payment/__mocks__/payment.mock';
import { userEntityMock } from 'src/user/__mock__/user.mock';
import { OrderEntity } from '../entities/order.entity';

export const orderMock: OrderEntity = {
  addressId: addressMock.id,
  createdAt: new Date(),
  updatedAt: new Date(),
  date: new Date(),
  id: 1,
  paymentId: PaymentMock.id,
  userId: userEntityMock.id,
};
