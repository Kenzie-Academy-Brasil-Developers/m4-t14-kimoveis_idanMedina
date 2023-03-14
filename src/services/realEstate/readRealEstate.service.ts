import { AppDataSource } from "../../data-source";
import RealEstate from "../../entities/realEstate.entity";
import { ListRealEstate } from "../../interfaces/realEstate.interfaces";
import { readRealEstateSchema } from "../../schemas/realEstate.schema";

const listRealEstateService = async (): Promise<ListRealEstate> => {
  const realEstateRepository = AppDataSource.getRepository(RealEstate);
  const findRealEstate = await realEstateRepository.find({
    relations: {
      address: true,
      category: true,
    },
  });

  /* const readRealEstate = readRealEstateSchema.parse(findRealEstate); */

  return findRealEstate;
};

export default listRealEstateService;
