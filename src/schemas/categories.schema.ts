import { z } from "zod";
import { returnRealEstateSchema } from "./realEstate.schema";

const categorySchema = z.object({
  name: z.string().min(2).max(60),
});

const returnCategorySchema = categorySchema.extend({
  id: z.number(),
});

const readCategoriesSchema = z.array(returnCategorySchema);
const readRealEstateCategorySchema = z.array(returnRealEstateSchema);

export {
  categorySchema,
  returnCategorySchema,
  readCategoriesSchema,
  readRealEstateCategorySchema,
};
