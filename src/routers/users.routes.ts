import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  readUsersController,
  updateUserController,
} from "../controllers/users.controllers";
import {
  checkAdminStatus,
  checkBodyRequest,
  checkToken,
  checkIfAuthId,
  checkIDIfExists,
} from "../middlewares";
import { updateUserSchema, userSchema } from "../schemas/users.schemas";
const userRoutes: Router = Router();

userRoutes.post("", checkBodyRequest(userSchema), createUserController);
userRoutes.get("", checkToken, checkAdminStatus, readUsersController);
userRoutes.patch(
  "/:id",
  checkBodyRequest(updateUserSchema),
  checkToken,
  checkIfAuthId,
  checkIDIfExists,
  updateUserController
);
userRoutes.delete(
  "/:id",
  checkToken,
  checkIDIfExists,
  checkAdminStatus,
  deleteUserController
);

export default userRoutes;
