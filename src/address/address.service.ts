import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createAddressDto } from './dto/createAddress.dto';
import { AddressEntity } from './entity/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
  ) {}
  async createAddress(createAddress: createAddressDto, userId: number) {
    return this.addressRepository.save({
      ...createAddress,
      userId,
    });
  }
}
