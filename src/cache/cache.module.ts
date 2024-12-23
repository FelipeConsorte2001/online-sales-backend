import { CacheModule as ChacheModuleNest } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';

@Module({
  imports: [ChacheModuleNest.register({ ttl: 800000000 })],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
