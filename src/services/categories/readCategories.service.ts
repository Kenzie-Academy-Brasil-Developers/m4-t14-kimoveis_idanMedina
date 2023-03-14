import { AppDataSource } from "../../data-source";
import Category from "../../entities/categories.entity";
import { ListCategories } from "../../interfaces/categories.interfaces";
import { readCategoriesSchema } from "../../schemas/categories.schema";

const listCategoriesService = async (): Promise<ListCategories> => {
  const userRepository = AppDataSource.getRepository(Category);
  const findCategories = await userRepository.find();
  const readCategories = readCategoriesSchema.parse(findCategories);
  return readCategories;
};

export default listCategoriesService;
