import { Request,Response,NextFunction } from "express"
import { HttpException } from "../exceptions/roots"


 export const errorMiddleWare = (error: HttpException,req:Request,res:Response,next:NextFunction) =>{
    res.status(error.statusCode).json({
    success: error.message,
    message: error.message,
    errorCode: error.errorCode,
    error:error.errors,
    })
}

