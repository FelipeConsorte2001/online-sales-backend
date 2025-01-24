import { cityMock } from 'src/city/__mocks__/city.mock';
import { createAddressDto } from '../dto/createAddress.dto';
import { addressMock } from './address.mock';

export const createAddressMock: createAddressDto = {
  numberAddress: addressMock.numberAddress,
  cep: addressMock.cep,
  cityId: cityMock.id,
  complement: addressMock.complement,
};
