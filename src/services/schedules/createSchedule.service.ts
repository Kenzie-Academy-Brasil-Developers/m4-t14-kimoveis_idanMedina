import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Schedule, User } from "../../entities";
import RealEstate from "../../entities/realEstate.entity";
import { AppError } from "../../errors";
import {
  iScheduleRequest,
  iScheduleResponse,
} from "../../interfaces/schedule.interfaces";
import { returnScheduleSchema } from "../../schemas/schedule.schema";

const createScheduleService = async (
  payload: iScheduleRequest,
  id: number
): Promise<iScheduleResponse> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const scheduleRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const realEstate: RealEstate | null = await realEstateRepository.findOneBy({
    id: payload.realEstateId,
  });
  if (!realEstate) {
    throw new AppError("Estate not found", 404);
  }

  const user: User | null = await userRepository.findOneBy({
    id: id,
  });
  const date: Date | string = new Date(payload.date);
  const hour: Date | string = new Date(payload.hour);

  const schedule: Schedule = scheduleRepository.create({
    date: payload.date,
    hour: payload.hour,
    realEstate: realEstate,
    user: user!,
  });
  console.log(schedule)
  await scheduleRepository.save(schedule);

  const newSchedule = returnScheduleSchema.parse(schedule);

  return newSchedule;
};

export default createScheduleService;
