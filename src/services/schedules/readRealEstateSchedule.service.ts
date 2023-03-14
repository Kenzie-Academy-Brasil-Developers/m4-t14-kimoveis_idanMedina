import { AppDataSource } from "../../data-source";
import { Schedule } from "../../entities";
import RealEstate from "../../entities/realEstate.entity";
import { ListRealEstate } from "../../interfaces/realEstate.interfaces";

const listScheduleService = async (
  id: number
): Promise<ListRealEstate | void> => {
  const realEstateRepository = AppDataSource.getRepository(RealEstate);
  const scheduleRepository = AppDataSource.getRepository(Schedule);

  const schedules = realEstateRepository
    .createQueryBuilder("")
    .leftJoin("realEstate.schedule", "schedules_users_properties");

  return;
};

export default listScheduleService;
