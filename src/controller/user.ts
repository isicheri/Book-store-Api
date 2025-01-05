import { Response } from "express";
import { IGetUserAuthInfoRequest } from "../custom/customs";
import { prismaClient } from "..";
import { updateUserSchema } from "../schema/user";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/roots";
import { Role } from "../custom/types";



export const updateUsername = async(req:IGetUserAuthInfoRequest,res:Response) => {
    const validateData = updateUserSchema.parse(req.body)
const findUser = await prismaClient.user.findFirstOrThrow({
    where: {
        id:req.user.id
    }
})
if(findUser) {
    await prismaClient.user.update({where: {id:findUser.id},data:{
        username: validateData.username
    }})
    res.json({success: true,message: "succesfully updated username"})
}else {
    throw new BadRequestException("cannot perform this operation",ErrorCode.BAD_REQUEST,null)
}
}

export const updateUserRoleToWriter = async(req:IGetUserAuthInfoRequest,res:Response) => {
    const findUser = await prismaClient.user.findFirstOrThrow({
        where: {
            id:req.user.id
        }
    })
    let role:Role = <Role.WRITER>req.query.role;
    if(findUser) {
        await prismaClient.user.update({where: {id:findUser.id},data:{
            role: role 
        }})
        res.json({success: true,message: "you are now a writer"})
    }else {
        throw new BadRequestException("cannot perform this operation",ErrorCode.BAD_REQUEST,null)
    }
}


export const getUserById = () => {}

//admin route
export const getUsers = () => {}



// i would not be adding a controller to handle a change password for now maybe there would be a V2