import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import Category from "../../entities/categories.entity";
import {
  iCategoryRequest,
  iCategoryResponse,
} from "../../interfaces/categories.interfaces";
import { returnCategorySchema } from "../../schemas/categories.schema";

const createCategoryService = async (
  payload: iCategoryRequest
): Promise<iCategoryResponse> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);
  const category: Category = categoryRepository.create(payload);

  await categoryRepository.save(category);

  const newCategory = returnCategorySchema.parse(category);
  return newCategory;
};

export default createCategoryService;
