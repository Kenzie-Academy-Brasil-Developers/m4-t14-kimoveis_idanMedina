import { AppDataSource } from "../../data-source";
import RealEstate from "../../entities/realEstate.entity";
import { ListRealEstateCategory } from "../../interfaces/categories.interfaces";
import { readRealEstateCategorySchema } from "../../schemas/categories.schema";

const listRealEstateCategoryService = async (
  id: number
): Promise<ListRealEstateCategory> => {
  const realEstateRepository = AppDataSource.getRepository(RealEstate);
  const findCategories = await realEstateRepository.find({
    relations: { category: true, address: true, schedule: true },
    where: {
      category: {
        id: id,
      },
    },
  });
  /* const readRealEstateCategories =
    readRealEstateCategorySchema.parse(findCategories); */
  return findCategories;
};

export default listRealEstateCategoryService;
