import { DeepPartial } from "typeorm";
import { z } from "zod";
import {
  userSchema,
  returnUserSchema,
  readUsersSchema,
  updateUserSchema,
} from "../schemas/users.schemas";

type iUserRequest = z.infer<typeof userSchema>;
type iUserUpdate = z.infer<typeof updateUserSchema>;
type UpdateUser = DeepPartial<iUserRequest>;

type iUserResponse = z.infer<typeof returnUserSchema>;
type ListUser = z.infer<typeof readUsersSchema>;

export { iUserRequest, iUserResponse, iUserUpdate, ListUser, UpdateUser };
