import { z } from "zod";

const addressSchema = z.object({
  street: z.string().min(2).max(45),
  zipCode: z.string().length(8),
  number: z.string().max(7).nullable(),
  city: z.string().min(2).max(20),
  state: z.string().length(2),
});

const createAddressSchema = addressSchema.extend({
  id: z.number(),
});

export {addressSchema, createAddressSchema};
