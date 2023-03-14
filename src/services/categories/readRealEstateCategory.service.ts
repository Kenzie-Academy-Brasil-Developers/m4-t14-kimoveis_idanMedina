import { AppDataSource } from "../../data-source";
import RealEstate from "../../entities/realEstate.entity";
import { ListRealEstateCategory } from "../../interfaces/categories.interfaces";
import { readRealEstateCategorySchema } from "../../schemas/categories.schema";

const listRealEstateCategoryService = async (
  id: number
): Promise<ListRealEstateCategory> => {
  const realEstateRepository = AppDataSource.getRepository(RealEstate);
  const findCategories = await realEstateRepository.find({
    relations: { category: true, address: true, schedules: true },
    where: {
      category: {
        id: id,
      },
    },
  });

  return findCategories;
};

export default listRealEstateCategoryService;
