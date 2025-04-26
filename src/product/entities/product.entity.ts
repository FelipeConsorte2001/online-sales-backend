import { CartProductEntity } from 'src/cart-product/entities/cartProduct.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { OrderProductEntity } from 'src/order-product/entities/orderProduct.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'product' })
export class ProductEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'category_id', nullable: false })
  categoryId: number;

  @Column({ name: 'price', type: 'decimal', nullable: false })
  price: number;

  @Column({ name: 'image', nullable: false })
  image: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'weight', nullable: false })
  weight: number;

  @Column({ name: 'length', nullable: false })
  length: number;

  @Column({ name: 'height', nullable: false })
  height: number;

  @Column({ name: 'width', nullable: false })
  width: number;

  @Column({ name: 'diameter', nullable: false })
  diameter: number;

  @ManyToOne(
    () => CategoryEntity,
    (category: CategoryEntity) => category.products,
  )
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category?: CategoryEntity;

  @ManyToMany(() => CartProductEntity, (cartEntity) => cartEntity.product)
  cartProduct?: CartProductEntity[];

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.product)
  ordersProduct?: OrderProductEntity[];
}
