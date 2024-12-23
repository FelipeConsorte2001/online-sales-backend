import { ReturnCityDto } from 'src/city/dtos/returnCity';
import { AddressEntity } from '../entity/address.entity';

export class returnAddressDto {
  complement: string;
  numberAddress: number;
  cep: string;
  city: ReturnCityDto;

  constructor(address: AddressEntity) {
    this.complement = address.complement;
    this.numberAddress = address.numberAddress;
    this.cep = address.cep;
    this.city = address.city ? new ReturnCityDto(address.city) : undefined;
  }
}
