import { Request, Response } from "express";
import { iUserRequest, UpdateUser } from "../interfaces/users.interfaces";
import {
  createUserService,
  listUsersService,
  updateUserService,
  deleteUserService,
} from "../services";

const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: iUserRequest = req.body;
  const createUser = await createUserService(userData);

  return res.status(201).json(createUser);
};

const readUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const usersList = await listUsersService();

  return res.status(200).json(usersList);
};

const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data: UpdateUser = req.body;
  const id: number = Number(req.params.id);

  const updateUser = await updateUserService(data, id);

  return res.status(200).json(updateUser);
};

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = Number(req.params.id);

  await deleteUserService(id);

  return res.status(204).send();
};

export {
  createUserController,
  readUsersController,
  updateUserController,
  deleteUserController,
};
