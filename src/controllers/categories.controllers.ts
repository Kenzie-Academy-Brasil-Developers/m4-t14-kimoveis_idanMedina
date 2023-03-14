import { Request, Response } from "express";
import { iCategoryRequest } from "../interfaces/categories.interfaces";
import { createCategoryService, listCategoriesService } from "../services";
import listRealEstateCategoryService from "../services/categories/readRealEstateCategory.service";

const createCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryData: iCategoryRequest = req.body;
  const createCategory = await createCategoryService(categoryData);

  return res.status(201).json(createCategory);
};

const readCategoriesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoriesList = await listCategoriesService();

  return res.status(200).json(categoriesList);
};

const readRealEstateCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const listEstateCategory = await listRealEstateCategoryService(
    Number(req.params.id)
  );

  return res.status(200).json(listEstateCategory);
};

export {
  createCategoryController,
  readCategoriesController,
  readRealEstateCategoryController,
};
