import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityService } from 'src/city/city.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { createAddressDto } from './dto/createAddress.dto';
import { AddressEntity } from './entity/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) {}
  async createAddress(createAddress: createAddressDto, userId: number) {
    await this.userService.findUserById(userId);
    await this.cityService.findCityById(createAddress.cityId);
    return this.addressRepository.save({
      ...createAddress,
      userId,
    });
  }
}
