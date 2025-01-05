import { User } from "@prisma/client";
import { NextFunction, Request,Response } from "express";

export const requestLogger = (req:Request,res:Response,next: NextFunction) => {
    let timeStamp = new Date().toISOString();
    let method = req.method;
    let url = req.url
    console.log(`${timeStamp},${method}, ${url}`)
    next()
} 

export interface IGetUserAuthInfoRequest extends Request {
    user: User | undefined;
}
