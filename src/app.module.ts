import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from './address/address.module';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from './cache/cache.module';
import { CartModule } from './cart/cart.module';
import { CategoryModule } from './category/category.module';
import { CityModule } from './city/city.module';
import { RolesGuard } from './guards/roles.guards';
import { ProductModule } from './product/product.module';
import { StateModule } from './state/state.module';
import { UserModule } from './user/user.module';
import { PaymentStatusModule } from './payment-status/payment-status.module';
import { PaymentModule } from './payment/payment.module';
import { OrderModule } from './order/order.module';
import { OrderProductModule } from './order-product/order-product.module';
import { MailModule } from './mail/mail.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      database: process.env.DB_SCHEMA,
      host: process.env.DB_HOST_API,
      password: process.env.DB_PASS,
      username: process.env.DB_USER,
      port: Number(process.env.DB_PORT),
      type: 'postgres',
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
      migrations: [`${__dirname}/migrations/{.ts,*.js}`],
      migrationsRun: true,
    }),
    UserModule,
    StateModule,
    CityModule,
    AddressModule,
    CacheModule,
    AuthModule,
    JwtModule,
    CategoryModule,
    ProductModule,
    CartModule,
    PaymentStatusModule,
    PaymentModule,
    OrderModule,
    OrderProductModule,
    MailModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
