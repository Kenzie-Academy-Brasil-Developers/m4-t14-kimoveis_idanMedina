import { Router } from "express";
import { createScheduleController } from "../controllers/schedules.controllers";
import {
  checkAdminStatus,
  checkBodyRequest,
  checkIDIfExists,
  checkToken,
} from "../middlewares";
import { scheduleSchema } from "../schemas/schedule.schema";

const scheduleRoutes: Router = Router();

scheduleRoutes.post(
  "",
  checkToken,
  checkAdminStatus,
  checkBodyRequest(scheduleSchema),
  createScheduleController
);
scheduleRoutes.get(
  "/realEstate/:id",
  checkToken,
  checkAdminStatus,
  checkIDIfExists
);

export default scheduleRoutes;
