import { Request, Response } from "express";
import {
  iScheduleRequest,
  ListSchedule,
} from "../interfaces/schedule.interfaces";
import { createScheduleService, listScheduleService } from "../services";

const createScheduleController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data: iScheduleRequest = req.body;
  const id: number = Number(req.user.id);
  const createSchedule = await createScheduleService(data, id);

  return res.status(201).json(createSchedule);
};

const readSchedulesController = async (
  req: Request,
  res: Response
): Promise<ListSchedule | void> => {
  const id: number = Number(req.params.id);
  const scheduleList = await listScheduleService(id);

  return;
};

export { createScheduleController, readSchedulesController };
