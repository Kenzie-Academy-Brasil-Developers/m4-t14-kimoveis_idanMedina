import { z } from "zod";
import { returnRealEstateSchema } from "./realEstate.schema";
import { returnUserSchema } from "./users.schemas";

const scheduleSchema = z.object({
  date: z.date().or(z.string()),
  hour: z.date().or(z.string()),
  realEstateId: z.number().int(),
});

const returnScheduleSchema = scheduleSchema
  .omit({ realEstateId: true })
  .extend({
    id: z.number(),
    realEstate: returnRealEstateSchema,
    user: returnUserSchema,
  });

const readScheduleSchema = z.array(returnScheduleSchema);

export { scheduleSchema, returnScheduleSchema, readScheduleSchema };
