import { cityMock } from 'src/city/__mocks__/city.mock';
import { userEntityMock } from 'src/user/__mock__/user.mock';
import { AddressEntity } from '../entity/address.entity';

export const addressMock: AddressEntity = {
  numberAddress: 152,
  cep: '8465sada',
  cityId: cityMock.id,
  id: 1,
  complement: 'some complement',
  createdAt: new Date(),
  updateAt: new Date(),
  userId: userEntityMock.id,
};
