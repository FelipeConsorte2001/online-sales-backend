import { IsString } from 'class-validator';

export class createCategory {
  @IsString()
  name: string;
}
