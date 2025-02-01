import { IsString } from 'class-validator';

export class UpdatePassowrdDTO {
  @IsString()
  newPassword: string;
  @IsString()
  lastPassword: string;
}
