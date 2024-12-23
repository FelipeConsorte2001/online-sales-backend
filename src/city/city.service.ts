import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CacheService } from 'src/cache/cache.service';
import { Repository } from 'typeorm';
import { CityEntity } from './entity/city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    private readonly cacheService: CacheService,
  ) {}

  async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {
    return this.cacheService.getCache<CityEntity[]>(`state_${stateId}`, () => {
      return this.cityRepository.find({
        where: { stateId },
      });
    });
  }
  async findCityById(stateId: number): Promise<CityEntity> {
    const city = await this.cityRepository.findOne({ where: { id: stateId } });
    if (!city) throw new NotFoundException('City Id Not found');
    return city;
  }
}
