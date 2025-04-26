import {
    Body,
    Controller,
    Get,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'src/decorator.ts/roles.decorator';
import { UserId } from 'src/decorator.ts/user-id.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { AddressService } from './address.service';
import { createAddressDto } from './dto/createAddress.dto';
import { returnAddressDto } from './dto/returnAddress.dto';
import { AddressEntity } from './entity/address.entity';

@Roles(UserType.User, UserType.Admin, UserType.Root)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post('')
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body()
    createAddressDto: createAddressDto,
    @UserId() userId: number,
  ): Promise<AddressEntity> {
    return this.addressService.createAddress(createAddressDto, userId);
  }

  @Get()
  async findAddressByUserId(
    @UserId() userId: number,
  ): Promise<returnAddressDto[]> {
    return (await this.addressService.findAddresssByUserId(userId)).map(
      (address) => new returnAddressDto(address),
    );
  }
}
