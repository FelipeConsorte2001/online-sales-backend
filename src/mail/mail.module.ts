import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CityModule } from 'src/city/city.module';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    CityModule,
  ],
  providers: [MailService],
  controllers: [MailController],
})
export class MailModule {}
