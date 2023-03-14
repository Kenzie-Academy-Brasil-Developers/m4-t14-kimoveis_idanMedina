import { Request } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import User from "../../entities/user.entity";
import { iUserResponse, UpdateUser } from "../../interfaces/users.interfaces";
import { returnUserSchema } from "../../schemas/users.schemas";

const updateUserService = async (
  payload: UpdateUser,
  idUser: number
): Promise<iUserResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const userData = await userRepository.findOneBy({
    id: idUser,
  });

  const user = userRepository.create({
    ...userData,
    ...payload,
  });

  await userRepository.save(user);

  const updatedUser = returnUserSchema.parse(user);

  return updatedUser;
};

export default updateUserService;
