import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'src/decorator.ts/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { createProductDTO } from './dtos/createProduct.dto';
import { ReturnProduct } from './dtos/returnProduct.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductService } from './product.service';

@Roles(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProduct(): Promise<ReturnProduct[]> {
    return (await this.productService.findAll()).map(
      (product: ProductEntity) => new ReturnProduct(product),
    );
  }
  @Roles(UserType.Admin)
  @UsePipes(ValidationPipe)
  @Post('')
  async createProdut(
    @Body()
    createProduct: createProductDTO,
  ): Promise<ReturnProduct> {
    return this.productService.createProduct(createProduct);
  }
}
