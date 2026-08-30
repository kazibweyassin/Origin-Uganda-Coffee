"use server";
import { rfqSchema, sampleSchema, type FormState } from "@/lib/validation";

function values(data:FormData){return Object.fromEntries(data.entries())}
export async function submitRfq(_:FormState,data:FormData):Promise<FormState>{const result=rfqSchema.safeParse(values(data));if(!result.success)return{ok:false,message:"Please review the highlighted fields.",errors:result.error.flatten().fieldErrors};console.info("RFQ_RECEIVED",{...result.data,email:"[redacted]",phone:"[redacted]"});return{ok:true,message:"Your sourcing brief has been received. Our origin desk will respond within one business day."}}
export async function submitSample(_:FormState,data:FormData):Promise<FormState>{const result=sampleSchema.safeParse(values(data));if(!result.success)return{ok:false,message:"Please review the highlighted fields.",errors:result.error.flatten().fieldErrors};console.info("SAMPLE_REQUEST_RECEIVED",{product:result.data.product,buyerCompany:result.data.buyerCompany});return{ok:true,message:"Sample request received. We’ll confirm lot availability and courier arrangements by email."}}
