import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import User from "../entities/user.entity";
import { AppError } from "../errors";

const checkIfAuthId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = Number(req.params.id);
  const userId: number = Number(req.user.id);
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const findAdmin: User[] = await userRepository.find({
    where: {
      id: userId,
    },
  });
  
  if (userId !== id) {
    if (!findAdmin[0].admin) {
      throw new AppError("Insufficient permission", 403);
    }
  }

  return next();
};
export default checkIfAuthId;
