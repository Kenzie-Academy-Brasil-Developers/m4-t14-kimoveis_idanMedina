import { AppDataSource } from "../../data-source";
import User from "../../entities/user.entity";
import { ListUser } from "../../interfaces/users.interfaces";
import { readUsersSchema } from "../../schemas/users.schemas";

const listUsersService = async (): Promise<ListUser> => {
  const userRepository = AppDataSource.getRepository(User);
  const findUsers = await userRepository.find();
  const readUsers = readUsersSchema.parse(findUsers);
  return readUsers;
};

export default listUsersService;
