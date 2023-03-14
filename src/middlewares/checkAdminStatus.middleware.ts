import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import User from "../entities/user.entity";
import { AppError } from "../errors";

const checkAdminStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.user.id;
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const findAdmin: User[] = await userRepository.find({
    where: {
      id: userId,
    },
  });

  if (!findAdmin[0].admin) {
    throw new AppError("Insufficient permission", 403);
  }
  return next();
};

export default checkAdminStatus;
