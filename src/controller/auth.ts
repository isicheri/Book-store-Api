import { Request,Response } from "express";
import { prismaClient } from "..";
import * as jwt from "jsonwebtoken";
import { loginUserSchema, registerUserSchema } from "../schema/user";
import { compareSync, hashSync } from "bcrypt";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/roots";
import { User } from "@prisma/client";
import { customUser } from "../custom/types";
import { NotFound } from "../exceptions/not-found-exception";


export const registerUser = async (req:Request,res:Response) => {
    const validateData = registerUserSchema.parse(req.body)
    const user = await prismaClient.user.create({
        data: {
            username: validateData.username,
            password: hashSync(validateData.password,10)
        }
    })
    res.json(user)
}

export const login = async(req:Request,res:Response) => {
        const {username,password} = loginUserSchema.parse(req.body)
        const user = await prismaClient.user.findFirstOrThrow({where: {username: username}})
        if(!user) {
            throw new NotFound("User not found",ErrorCode.INTERNAL_ERROR,null);
          }
          if(!compareSync(password,user.password)){
              throw new BadRequestException('Password incorrect',ErrorCode.BAD_REQUEST,null)
          }
    let payload:customUser = {username: username,role: user.role}
    const token = jwt.sign(payload,"secret",{expiresIn: "1h"})
    res.json({data: {user,token}})
}


export const refreshToken = () => {}
export const logoutUer = () => {}