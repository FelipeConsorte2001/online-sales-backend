import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'src/decorator.ts/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { DeleteResult } from 'typeorm';
import { createProductDTO } from './dtos/createProduct.dto';
import { ReturnProduct } from './dtos/returnProduct.dto';
import { updateProductDTO } from './dtos/updateproduct.dto';
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
  async createProduct(
    @Body()
    createProduct: createProductDTO,
  ): Promise<ReturnProduct> {
    return this.productService.createProduct(createProduct);
  }

  @Roles(UserType.Admin)
  @Delete('/:productId')
  async deleteProduct(
    @Param('productId') productId: number,
  ): Promise<DeleteResult> {
    return this.productService.deleteProduct(productId);
  }

  @Roles(UserType.Admin)
  @UsePipes(ValidationPipe)
  @Put('/:productId')
  async updateProduct(
    @Param('productId') productId: number,
    @Body()
    updateProduct: updateProductDTO,
  ): Promise<ProductEntity> {
    return this.productService.updateProduct(updateProduct, productId);
  }
}
