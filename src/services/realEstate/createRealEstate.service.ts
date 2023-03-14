import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import Address from "../../entities/addresses.entity";
import Category from "../../entities/categories.entity";
import RealEstate from "../../entities/realEstate.entity";
import { AppError } from "../../errors";
import {
  iRealEstateRequest,
  iRealEstateResponse,
} from "../../interfaces/realEstate.interfaces";
import { returnRealEstateSchema } from "../../schemas/realEstate.schema";

const createRealEstateService = async (
  payload: iRealEstateRequest
): Promise<iRealEstateResponse> => {

  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const matchAddress: Address | null = await addressRepository.findOneBy({
    street: payload.address.street,
    zipCode: payload.address.zipCode,
    number: payload.address.number!,
    city: payload.address.city,
    state: payload.address.state,
  });

  const category: Category | null = await categoryRepository.findOneBy({
    id: payload.categoryId,
  });
  if (!category) {
    throw new AppError("Category not exists", 404);
  }

  if (matchAddress) {
    throw new AppError("Address already exists", 409);
  }
  const address: Address = addressRepository.create({ ...payload.address });
  await addressRepository.save(address);

  const newAddress: Address | null = await addressRepository.findOneBy({
    street: address.street,
    zipCode: address.zipCode,
    number: address.number!,
    city: address.city,
    state: address.state,
  });

  const realEstate: RealEstate = realEstateRepository.create({
    value: payload.value,
    size: payload.size,
    address: newAddress!,
    category: category,
  });

  const newRealEstate = await realEstateRepository.save(realEstate);

  /* const newRealEstate = returnRealEstateSchema.parse(realEstate); */

  return newRealEstate;
};

export default createRealEstateService;
