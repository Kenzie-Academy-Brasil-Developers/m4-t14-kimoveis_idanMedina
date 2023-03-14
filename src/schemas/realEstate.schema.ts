import { z } from "zod";
import { addressSchema, createAddressSchema } from "./addresses.schema";
import { returnCategorySchema } from "./categories.schema";

const realEstateSchema = z.object({
  value: z.number().max(12).or(z.string().max(12)),
  size: z.number(),
  address: addressSchema,
  categoryId: z.number().int(),
});

const returnRealEstateSchema = realEstateSchema
  .omit({ address: true, categoryId: true })
  .extend({
    id: z.number(),
    address: createAddressSchema,
    category: returnCategorySchema,
    sold: z.boolean().default(false),
    createdAt: z.date().or(z.string()),
    updatedAt: z.date().or(z.string()),
  });

const readRealEstateSchema = z.array(returnRealEstateSchema);

export { realEstateSchema, returnRealEstateSchema, readRealEstateSchema };
