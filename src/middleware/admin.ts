import { NextFunction,Response } from "express";
import { IGetUserAuthInfoRequest } from "../custom/customs";
import { UnauthorizedException } from "../exceptions/unauthorised";
import { ErrorCode } from "../exceptions/roots";

export const adminMiddleware = (req: IGetUserAuthInfoRequest,res:Response,next:NextFunction) => {
    const user = req.user
    user?.role === "ADMIN" ? next() : next(new UnauthorizedException("user is not an admin",ErrorCode.UNAUTHORISED_EXCEPTION,null))
}