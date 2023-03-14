import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import Category from "../entities/categories.entity";
import RealEstate from "../entities/realEstate.entity";
import User from "../entities/user.entity";
import { AppError } from "../errors";

const checkIDIfExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = Number(req.params.id);
  if (req.originalUrl.includes("/users")) {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const findUser = await userRepository.findOne({
      where: { id: id },
    });

    if (!findUser) {
      throw new AppError("User not found", 404);
    }
  }

  if (req.originalUrl.includes("/categories")) {
    const categoryRepository: Repository<Category> =
      AppDataSource.getRepository(Category);
    const findCategory = await categoryRepository.findOne({
      where: { id: id },
    });

    if (!findCategory) {
      throw new AppError("Category not found", 404);
    }
  }

  if (req.originalUrl.includes("/schedules")) {
    const RealEstateRepository: Repository<RealEstate> =
      AppDataSource.getRepository(RealEstate);
    const findRealEstate = await RealEstateRepository.findOne({
      where: { id: id },
    });

    if (!findRealEstate) {
      throw new AppError("RealEstate not found", 404);
    }
  }

  return next();
};
export default checkIDIfExists;
