import { Controller, Get, Param } from '@nestjs/common';
import { returnCode } from './dto/returnCode.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('/:code')
  async findAddressByCode(@Param('code') code: string): Promise<returnCode> {
    return this.mailService.findAddressByCode(code);
  }
}
