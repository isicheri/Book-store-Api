import { NextFunction,Request,Response } from "express"
import { ErrorCode, HttpException } from "../exceptions/roots"
import { ZodError } from "zod";
import { BadRequestException } from "../exceptions/bad-request";
import { InternalError } from "../exceptions/internal-request";


export const errorHandler = (method:Function) => {
return async(req:Request,res:Response,next:NextFunction) => {
    try {
        await method(req,res,next)
    } catch (error) {
         let exceptions:HttpException;
        if(error instanceof HttpException) {
            exceptions = error
        }else {
            if(error instanceof ZodError) {
            exceptions = new BadRequestException("Unprocessable Entity",ErrorCode.UNPROCESSABLE_ENTITY_ERROR,error)
            }else {
                exceptions = new InternalError("something went wrong in the server",ErrorCode.INTERNAL_ERROR,error)
            }
        }
        next(exceptions)
    }
}
}