import { z } from "zod";
import {
  categorySchema,
  returnCategorySchema,
  readCategoriesSchema,
  readRealEstateCategorySchema,
} from "../schemas/categories.schema";

type iCategoryRequest = z.infer<typeof categorySchema>;

type iCategoryResponse = z.infer<typeof returnCategorySchema>;
type ListCategories = z.infer<typeof readCategoriesSchema>;
type ListRealEstateCategory = z.infer<typeof readRealEstateCategorySchema>;

export {
  iCategoryRequest,
  iCategoryResponse,
  ListCategories,
  ListRealEstateCategory,
};
