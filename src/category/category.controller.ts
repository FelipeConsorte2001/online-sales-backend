import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'src/decorator.ts/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { CategoryService } from './category.service';
import { ReturnCategory } from './dtos/category.dto';
import { createCategory } from './dtos/createCategory.dto';

@Roles(UserType.Admin, UserType.User)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get('')
  async findAllCategories(): Promise<ReturnCategory[]> {
    return (await this.categoryService.findAllCategories()).map(
      (category) => new ReturnCategory(category),
    );
  }
  @Roles(UserType.Admin, UserType.User)
  @UsePipes(ValidationPipe)
  @Post('')
  async createCategory(
    @Body() createCategory: createCategory,
  ): Promise<ReturnCategory> {
    const category = await this.categoryService
      .findCategoryByName(createCategory.name)
      .catch(() => undefined);
    if (category) {
      throw new BadRequestException(`category ${category.name} already exist`);
    }
    return this.categoryService.createCategory(createCategory);
  }
}
