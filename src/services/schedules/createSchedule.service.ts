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
    throw new AppError("RealEstate not found", 404);
  }

  const user: User | null = await userRepository.findOneBy({
    id: id,
  });

  const date: Date | string = new Date(`${payload.date},${payload.hour}`);
  console.log(date.toString());
  if (date.toString().includes("Sat") || date.toString().includes("Sun")) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }
  const hour: number = Number(payload.hour.slice(0, 2));
  const minute: number = Number(payload.hour.slice(3, 5));
  if (hour < 8 || hour > 18) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }
  console.log(hour, minute);

  const schedule: Schedule = scheduleRepository.create({
    date: payload.date,
    hour: payload.hour,
    realEstate: realEstate,
    user: user!,
  });

  await scheduleRepository.save(schedule);

  return schedule;
};

export default createScheduleService;
