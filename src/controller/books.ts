import { NextFunction, Request,Response } from "express";
import { prismaClient } from "..";
import { IGetUserAuthInfoRequest } from "../custom/customs";
import { createBookSchema } from "../schema/books";
import { UnauthorizedException } from "../exceptions/unauthorised";
import { ErrorCode } from "../exceptions/roots";
import { UnprocessableEntity } from "../exceptions/validation";


export const CreateBook = async(req:IGetUserAuthInfoRequest,res: Response) => {
    const validatedData = createBookSchema.parse(req.body)
    try {
        const books =  await prismaClient.book.create({
            data: {
             title: validatedData.title,
             author: req.user.username ,
             userId: req.user.id
            }
        })
        res.json(books)
    } catch (error) {
       throw new UnprocessableEntity("unprocessable entity,",error,ErrorCode.UNPROCESSABLE_ENTITY_ERROR)
    }
}

export const updateBookAccess = (req:IGetUserAuthInfoRequest,res:Response) => {}