import { z } from "zod";
import { hashSync } from "bcryptjs";

const userSchema = z.object({
  name: z.string().min(2).max(45),
  email: z.string().email().max(45),
  password: z
    .string()
    .min(4)
    .max(120)
    .transform((password) => {
      return hashSync(password, 10);
    }),
  admin: z.boolean().default(false),
});

const returnUserSchema = userSchema.omit({ password: true }).extend({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});

const updateUserSchema = userSchema.omit({ admin: true }).partial();

const readUsersSchema = z.array(returnUserSchema);

export { userSchema, returnUserSchema, updateUserSchema, readUsersSchema };
