import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";
import { AppDataSource } from "../data-source";
import Category from "../entities/categories.entity";
import User from "../entities/user.entity";
import { AppError } from "../errors";

const checkBodyRequest =
  (schema: ZodTypeAny) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (req.originalUrl.includes("/users")) {
      const email: string = req.body.email;
      const method: string = req.method;
      if (email) {
        if (method === "POST" || method === "PATCH") {
          const userRepository = AppDataSource.getRepository(User);
          const findEmail = await userRepository.findOne({
            where: {
              email: req.body.email,
            },
          });

          if (findEmail) {
            throw new AppError("Email already exists.", 409);
          }
        }
      }
    }

    if (req.originalUrl.includes("/categories")) {
      const name: string = req.body.name;
      const method: string = req.method;

      if (method === "POST") {
        const categoryRepository = AppDataSource.getRepository(Category);
        const findName = await categoryRepository.findOne({
          where: {
            name: name,
          },
        });

        if (findName) {
          throw new AppError("Name already exists.", 409);
        }
      }
    }

    const check = schema.parse(req.body);
    req.body = check;

    return next();
  };

export default checkBodyRequest;
