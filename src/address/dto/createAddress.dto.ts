import { IsInt, IsOptional, IsString } from 'class-validator';

export class createAddressDto {
  @IsString()
  @IsOptional()
  complement: string;

  @IsInt()
  numberAddress: number;

  @IsString()
  cep: string;

  @IsInt()
  cityId: number;
}
