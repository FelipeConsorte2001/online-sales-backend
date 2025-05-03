import { IsString } from 'class-validator';

export class updateCategory {
  @IsString()
  name: string;
}
