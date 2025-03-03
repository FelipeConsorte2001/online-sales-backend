import { userEntityMock } from 'src/user/__mock__/user.mock';
import { CartEntity } from '../entities/cart.entity';

export const cartMock: CartEntity = {
  active: true,
  createdAt: new Date(),
  id: 7435,
  updatedAt: new Date(),
  userId: userEntityMock.id,
};
