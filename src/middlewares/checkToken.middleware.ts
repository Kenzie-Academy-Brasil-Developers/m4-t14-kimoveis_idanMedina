import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppDataSource } from "../data-source";
import User from "../entities/user.entity";
import { Repository } from "typeorm";

const checkToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError("Missing Bearer Token", 401);
  }

  const auth = token.split(" ")[1];

  jwt.verify(auth, process.env.SECRET_KEY!, (error: any, decoded: any) => {
    {
      if (error) throw new AppError(error.message, 401);
    }

    req.user = {
      id: decoded.sub,
    };

    return next();
  });
};

export default checkToken;
