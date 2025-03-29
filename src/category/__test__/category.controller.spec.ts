import { Test, TestingModule } from '@nestjs/testing';
import { categoryMock } from '../__mock__/category.mock';
import { createCategoryMock } from '../__mock__/createCategory.mock';
import { CategoryController } from '../category.controller';
import { CategoryService } from '../category.service';

describe('CategoryController', () => {
  let controller: CategoryController;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: {
            findAllCategories: jest.fn().mockResolvedValue([categoryMock]),
            createCategory: jest.fn().mockResolvedValue(categoryMock),
          },
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(categoryService).toBeDefined();
  });

  it('should return category entity in findAllCategories', async () => {
    const category = await controller.findAllCategories();
    expect(category).toEqual([
      {
        id: categoryMock.id,
        name: categoryMock.name,
      },
    ]);
  });

  it('should return category entity in createCategory', async () => {
    const category = await controller.createCategory(createCategoryMock);
    expect(category).toEqual(categoryMock);
  });
});
