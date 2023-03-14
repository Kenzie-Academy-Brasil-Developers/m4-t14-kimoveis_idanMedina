import { Router } from "express";
import {
  createCategoryController,
  readCategoriesController,
  readRealEstateCategoryController,
} from "../controllers/categories.controllers";
import {
  checkAdminStatus,
  checkBodyRequest,
  checkIDIfExists,
  checkToken,
} from "../middlewares";
import { categorySchema } from "../schemas/categories.schema";

const categoriesRoutes: Router = Router();

categoriesRoutes.post(
  "",
  checkToken,
  checkBodyRequest(categorySchema),
  checkAdminStatus,
  createCategoryController
);
categoriesRoutes.get("", readCategoriesController);
categoriesRoutes.get(
  "/:id/realEstate",
  checkIDIfExists,
  readRealEstateCategoryController
);

export default categoriesRoutes;
