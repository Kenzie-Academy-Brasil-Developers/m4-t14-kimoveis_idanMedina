import { iLoginRequest } from "../../interfaces/login.interfaces";
import { AppError } from "../../errors";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { Repository } from "typeorm";
import User from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import { Request } from "express";

const createLoginService = async (data: iLoginRequest): Promise<string> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOneBy({
    email: data.email,
  });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const passwordMatch = await compare(data.password, user.password);

  if (!passwordMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = jwt.sign(
    {
      email: user.email,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: String(user.id),
    }
  );

  return token;
};

export default createLoginService;
