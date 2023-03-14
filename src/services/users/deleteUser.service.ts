import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import User from "../../entities/user.entity";

const deleteUserService = async (id: number): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: {
      id: id,
    },
  });
  await userRepository.softRemove(user!);
};

export default deleteUserService;
