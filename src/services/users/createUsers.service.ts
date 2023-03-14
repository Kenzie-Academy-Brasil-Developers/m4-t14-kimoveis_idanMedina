import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import User from "../../entities/user.entity";
import { iUserRequest, iUserResponse } from "../../interfaces/users.interfaces";
import { returnUserSchema } from "../../schemas/users.schemas";

const createUserService = async (payload: iUserRequest): Promise<iUserResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const user: User = userRepository.create(payload);

  await userRepository.save(user);

  const newUser = returnUserSchema.parse(user);
  return newUser;
};

export default createUserService;
