import { Router } from "express";
import {
  createRealEstateController,
  readRealEstateController,
} from "../controllers/realEstate.controllers";
import { checkAdminStatus, checkBodyRequest, checkToken } from "../middlewares";
import { realEstateSchema } from "../schemas/realEstate.schema";

const realEstateRoutes: Router = Router();

realEstateRoutes.post(
  "",
  checkBodyRequest(realEstateSchema),
  checkToken,
  checkAdminStatus,
  createRealEstateController
);
realEstateRoutes.get("", readRealEstateController);

export default realEstateRoutes;
