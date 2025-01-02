import { NextFunction, Request,Response } from "express";
import { prismaClient } from "..";
import { IGetUserAuthInfoRequest } from "../custom/customs";
import { createBookSchema } from "../schema/books";
import { UnauthorizedException } from "../exceptions/unauthorised";
import { ErrorCode } from "../exceptions/roots";
import { UnprocessableEntity } from "../exceptions/validation";
import { BadRequestException } from "../exceptions/bad-request";
import { NotFound } from "../exceptions/not-found-exception";
import { rmSync } from "fs";


export const CreateBook = async(req:IGetUserAuthInfoRequest,res: Response) => {
    const validatedData = createBookSchema.parse(req.body)
        const books =  await prismaClient.book.create({
            data: {
             title: validatedData.title,
             author: req.user.username ,
             userId: req.user.id
            }
        })
        res.json(books)
}

export const updateBookAccess = async(req:IGetUserAuthInfoRequest,res:Response) => {
    const user = req.user;
    const book = await prismaClient.book.findFirstOrThrow({where:{ 
        id: +req.params.bookId
    }})
    if(!book) {
  throw new BadRequestException("book not Found",ErrorCode.BAD_REQUEST,null)
    }
    if(user.username !== book.author) {
        throw new BadRequestException("book not Found",ErrorCode.BAD_REQUEST,null)  
    }
    const data = await prismaClient.book.update({where: {id: book.id},data: {
        accesType: req.body.accesType
    }})
    res.json(data)
}

export const getBookById = async(req:IGetUserAuthInfoRequest,res:Response) => {
          try {
            const book = await prismaClient.book.findFirstOrThrow({where: {id: +req.params.id}})
                  if(req.user.role !== "ADMIN" || req.user.username !== book.author) {
                    throw new BadRequestException("sorry book is not accessible",ErrorCode.BAD_REQUEST,null)
                  }else {
                  res.json(book)
                  }
          } catch (error) {
                 throw new NotFound("book not Found",ErrorCode.BAD_REQUEST,error)
          }
}


export const getAllBookPublicBooks = async(req:IGetUserAuthInfoRequest,res:Response) => {
    const books = await prismaClient.book.findMany({where: {accesType: "PUBLIC"}})
    res.json(books)
}

export const getAllPrivateBooks = async(req:IGetUserAuthInfoRequest,res:Response) => {
    if(req.user.role === "ADMIN") {
        console.log("yes!");
    }
    const books = await prismaClient.book.findMany({where: {accesType: "PRIVATE"},include: {pages: true,reviews: true,Like: true}})
    res.json(books)
}

export const likeBook = (req:IGetUserAuthInfoRequest,res:Response) => {
    const book = "";
    const like = "";
}

export const unlikeBook = (req:IGetUserAuthInfoRequest,res:Response) => {}

export const getAllBooks = (req:IGetUserAuthInfoRequest,res:Response) =>{}

export const  addPagesToBook = (req:IGetUserAuthInfoRequest,res:Response) => {}