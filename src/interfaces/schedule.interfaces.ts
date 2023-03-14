import { z } from "zod";
import {
  readScheduleSchema,
  returnScheduleSchema,
  scheduleSchema,
} from "../schemas/schedule.schema";

type iScheduleRequest = z.infer<typeof scheduleSchema>;
type iScheduleResponse = z.infer<typeof returnScheduleSchema>;
type ListSchedule = z.infer<typeof readScheduleSchema>;

export { iScheduleRequest, iScheduleResponse, ListSchedule };
