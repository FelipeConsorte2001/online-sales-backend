import { ReturnCityDto } from 'src/city/dtos/returnCity';
import { AddressEntity } from '../entity/address.entity';

export class returnAddressDto {
  id: number;
  complement: string;
  numberAddress: number;
  cep: string;
  city: ReturnCityDto;

  constructor(address: AddressEntity) {
    this.id = address.id;
    this.complement = address.complement;
    this.numberAddress = address.numberAddress;
    this.cep = address.cep;
    this.city = address.city ? new ReturnCityDto(address.city) : undefined;
  }
}
