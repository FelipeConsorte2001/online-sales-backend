import { AddressEntity } from 'src/address/entity/address.entity';
import { OrderProductEntity } from 'src/order-product/entities/orderProduct.entity';
import { paymentEntity } from 'src/payment/entities/payment.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'order' })
export class OrderEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'user_id', nullable: false })
  userId: number;

  @Column({ name: 'address_id', nullable: false })
  addressId: number;

  @Column({ name: 'date', nullable: false })
  date: Date;

  @Column({ name: 'payment_id', nullable: false })
  paymentId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: UserEntity;

  @ManyToOne(() => AddressEntity, (adreess) => adreess.orders)
  @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
  address?: AddressEntity;

  @ManyToOne(() => paymentEntity, (payments) => payments.orders)
  @JoinColumn({ name: 'payment_id', referencedColumnName: 'id' })
  payment?: paymentEntity;

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.order)
  ordersProduct?: OrderProductEntity[];

  amountProducts?: number;
}
