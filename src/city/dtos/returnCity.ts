import { returnStateDto } from 'src/state/dtos/returnState.dto';
import { CityEntity } from '../entity/city.entity';

export class ReturnCityDto {
  name: string;
  state: returnStateDto;
  constructor(city: CityEntity) {
    this.name = city.name;
    this.state = city.state ? new returnStateDto(city.state) : undefined;
  }
}
