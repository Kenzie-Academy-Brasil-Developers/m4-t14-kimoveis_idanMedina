import { z } from "zod";
import {addressSchema, createAddressSchema} from "../schemas/addresses.schema";

type iAddress = z.infer<typeof addressSchema>;
type iCreateAdress = z.infer<typeof createAddressSchema>;
export { iAddress, iCreateAdress };
