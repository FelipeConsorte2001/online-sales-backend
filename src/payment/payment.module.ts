import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { paymentEntity } from './entities/payment.entity';
import { PaymentService } from './payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([paymentEntity])],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
