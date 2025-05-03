import { Test, TestingModule } from '@nestjs/testing';
import { ReturnDeleteMock } from 'src/__mocks__/returnDelete.mocks';
import { categoryMock } from '../__mock__/category.mock';
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
            deleteCategory: jest.fn().mockResolvedValue(ReturnDeleteMock),
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
    expect(category).toEqual([categoryMock]);
  });

  it('should delete a category', async () => {
    const category = await controller.deleteCategory(categoryMock.id);
    expect(category).toEqual(ReturnDeleteMock);
  });

  it('should send category id to delete category', async () => {
    const spy = jest.spyOn(categoryService, 'deleteCategory');
    await controller.deleteCategory(categoryMock.id);
    expect(spy.mock.calls[0][0]).toEqual(categoryMock.id);
  });
});
