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
import { CategoryService } from './category.service';
import { ReturnCategory } from './dtos/category.dto';
import { createCategory } from './dtos/createCategory.dto';

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
}
