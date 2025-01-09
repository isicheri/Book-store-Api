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
    
    const book = await prismaClient.book.findFirstOrThrow({where:{title: validatedData.title}})
    if(book) {
        throw new BadRequestException("Book Title is already take",ErrorCode.BAD_REQUEST,null)
    }
        const mainBook =  await prismaClient.book.create({
            data: {
             title: validatedData.title,
             author: req.user.username ,
             userId: req.user.id
            }
        })
        res.json(mainBook)
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
            const book = await prismaClient.book.findFirstOrThrow({where: {id: +req.params.id},include: {pages: true,reviews: true,Like: true}})
                  if(req.user.role !== "ADMIN" || req.user.username !== book.author) {
                    throw new BadRequestException("sorry book is not accessible",ErrorCode.BAD_REQUEST,null)
                  }else {
                  res.json(book)
                  }
          } catch (error) {
                 throw new NotFound("book not Found",ErrorCode.BAD_REQUEST,error)
          }
}


export const getAllPublicBooks = async(req:IGetUserAuthInfoRequest,res:Response) => {
    const books = await prismaClient.book.findMany()
    const filteredPrivateBook = books.filter((book) => book.accesType === "PUBLIC")
    res.json(filteredPrivateBook)
}

export const getAllPrivateBooks = async(req:IGetUserAuthInfoRequest,res:Response) => {
    const books = await prismaClient.book.findMany()
    const filteredPrivateBook = books.filter((book) => book.accesType === "PRIVATE")
    res.json(books)
}

export const likeBook = async (req:IGetUserAuthInfoRequest,res:Response) => {
    const book = await prismaClient.book.findFirstOrThrow({where: {id: +req.params.bookId}});
    try {
        const like = await prismaClient.like.create({
    data: {
        bookId: book.id,
        userId: req.user.id
    }
        })
        res.json({
            success: true,
            data: like
        })
    } catch (error) {
        throw new BadRequestException("an error occured",ErrorCode.BAD_REQUEST,error)
    }
}

export const unlikeBook = async(req:IGetUserAuthInfoRequest,res:Response) => {
 const like =  await prismaClient.like.findFirstOrThrow({where: {bookId: +req.params.bookId}})
 if(like.userId === req.user.id) {
   await prismaClient.like.delete({
    where: {id: like.id}
   })
   res.json({
    success: true,
    data: {message: "you unliked the book"}
   })
 }else {
    throw new BadRequestException("you cant delete book",ErrorCode.BAD_REQUEST,null)
 }
}

export const getAllBooks = async(req:IGetUserAuthInfoRequest,res:Response) =>{
    const books = await prismaClient.book.findMany({include: {Like: true,reviews: true,pages:true}});
    res.json(books)
}

//still working on this

export const  addPagesToBook = async(req:IGetUserAuthInfoRequest,res:Response) => {
     try {
        const book = await prismaClient.book.findFirstOrThrow({where:{id: +req.params.bookId},include:{pages:true}});
        if(!book) {
            throw new NotFound("Book Not Found",ErrorCode.NOT_FOUND,null)
        }
       const page = await prismaClient.page.create({
        data: {
            message: req.body.content,
            bookId: req.body.bookId,
            pageNo: +req.params.pageNO
        }
       })
      res.json(page)
    } catch (error) {
        throw new BadRequestException(error.message,ErrorCode.BAD_REQUEST,error)
    }
}