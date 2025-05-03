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
import { CategoryService } from './category.service';
import { ReturnCategory } from './dtos/category.dto';
import { createCategory } from './dtos/createCategory.dto';
import { updateCategory } from './dtos/updateCategory.dto';
import { CategoryEntity } from './entities/category.entity';

@Roles(UserType.Admin, UserType.Root, UserType.User)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get('')
  async findAllCategories(): Promise<ReturnCategory[]> {
    return this.categoryService.findAllCategories();
  }

  @Roles(UserType.Admin, UserType.Root)
  @UsePipes(ValidationPipe)
  @Post('')
  async createCategory(
    @Body() createCategory: createCategory,
  ): Promise<ReturnCategory> {
    return this.categoryService.createCategory(createCategory);
  }

  @Roles(UserType.Admin, UserType.Root)
  @Delete(':id')
  async deleteCategory(@Param('id') id: number): Promise<DeleteResult> {
    return this.categoryService.deleteCategory(id);
  }

  @Roles(UserType.Admin, UserType.Root)
  @UsePipes(ValidationPipe)
  @Put(':id')
  async updateCategory(
    @Param('id') id: number,
    @Body() updateCategory: updateCategory,
  ): Promise<CategoryEntity> {
    return this.categoryService.updateCategory(id, updateCategory);
  }
}
