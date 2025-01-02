import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { IGetUserAuthInfoRequest } from "../custom/customs";
import { UnauthorizedException } from "../exceptions/unauthorised";
import { ErrorCode } from "../exceptions/roots";
import { prismaClient } from "..";
import { customUser } from "../custom/types";



const authMiddleWare = async(req:IGetUserAuthInfoRequest,res:Response,next:NextFunction):Promise<any> => {
let token = req.headers.authorization;
try {
    if(!token) {
        return next(new UnauthorizedException("Not authorised",ErrorCode.UNAUTHORISED_EXCEPTION,null))
    }
    const payload = jwt.verify(token,"secret") as customUser;
    const user = await prismaClient.user.findFirst({
        where: {username: payload.username}
    })
    if(!user) {
 return next(new UnauthorizedException("Not authorised",ErrorCode.UNAUTHORISED_EXCEPTION,null))
    }
    req.user = user;  
    next();
} catch (error) {
    next(new UnauthorizedException("Not authorised",ErrorCode.UNAUTHORISED_EXCEPTION,null))
}}

export default authMiddleWare;