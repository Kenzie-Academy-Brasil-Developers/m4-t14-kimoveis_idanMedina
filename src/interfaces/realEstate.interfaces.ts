import { z } from "zod";
import {
  readRealEstateSchema,
  realEstateSchema,
  returnRealEstateSchema,
} from "../schemas/realEstate.schema";

type iRealEstateRequest = z.infer<typeof realEstateSchema>;
type iRealEstateResponse = z.infer<typeof returnRealEstateSchema>;
type ListRealEstate = z.infer<typeof readRealEstateSchema>;

export { iRealEstateRequest, iRealEstateResponse, ListRealEstate };
