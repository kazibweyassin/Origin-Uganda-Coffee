import { z } from "zod";
export const rfqSchema = z.object({
  product:z.string().min(2), quantity:z.string().min(1), destinationCountry:z.string().min(2), destinationPort:z.string().min(2),
  incoterm:z.enum(["FCA","FOB","CIP","CIF"]), packaging:z.string().min(2), sampleRequired:z.enum(["yes","no"]),
  buyerCompany:z.string().min(2), contactName:z.string().min(2), email:z.email(), phone:z.string().min(7), website:z.string().optional(),
  buyerType:z.string().min(2), purchaseFrequency:z.string().min(2), notes:z.string().max(2000).optional(), consent:z.literal("on")
});
export const sampleSchema = z.object({ product:z.string().min(2), buyerCompany:z.string().min(2), contactName:z.string().min(2), email:z.email(), phone:z.string().min(7), destinationCountry:z.string().min(2), courierAccount:z.string().optional(), intendedUse:z.string().min(10), consent:z.literal("on") });
export type FormState={ok:boolean;message:string;errors?:Record<string,string[]>};
