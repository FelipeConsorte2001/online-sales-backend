import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { CityService } from 'src/city/city.service';
import { CityEntity } from 'src/city/entity/city.entity';
import { returnCode } from './dto/returnCode.dto';
import { returnCodeExternal } from './dto/returnCodeExternal.dto';

@Injectable()
export class MailService {
  constructor(
    private readonly httpService: HttpService,
    private readonly cityService: CityService,
  ) {}

  async findAddressByCode(code: string): Promise<returnCode> {
    const address: returnCodeExternal = await this.httpService.axiosRef
      .get<returnCodeExternal>(`${process.env.URL_MAIL}${code}/json/`)
      .then((res) => res.data)
      .catch((error: AxiosError) => {
        throw new BadRequestException(
          `Error in conection request ${error.message}`,
        );
      });

    const city: CityEntity | undefined = await this.cityService
      .findCityByName(address.localidade, address.uf)
      .catch(() => undefined);
    return new returnCode(address, city?.id, city?.state.id);
  }
}
