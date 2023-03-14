import { Request, Response } from "express";
import { iRealEstateRequest } from "../interfaces/realEstate.interfaces";
import { createRealEstateService, listRealEstateService } from "../services";

const createRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data: iRealEstateRequest = req.body;
  const createRealEstate = await createRealEstateService(data);

  return res.status(201).json(createRealEstate);
};

const readRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstateList = await listRealEstateService();

  return res.status(200).json(realEstateList);
};

export { createRealEstateController, readRealEstateController };
