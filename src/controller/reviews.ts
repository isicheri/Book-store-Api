import { Response } from "express";
import { IGetUserAuthInfoRequest } from "../custom/customs";
import { prismaClient } from "..";
import { NotFound } from "../exceptions/not-found-exception";
import { ErrorCode } from "../exceptions/roots";
import { BadRequestException } from "../exceptions/bad-request";


//users can add one or more review depends,i just felt like leaving the function at that
export const createReview = async(req:IGetUserAuthInfoRequest,res:Response) => {
    const book = await prismaClient.book.findFirstOrThrow({where: {
        id: +req.params.bookId
    }})
    if(!book) {
        throw new NotFound("book not found",ErrorCode.NOT_FOUND,null)
    }
    const review = await prismaClient.review.create({
        data: {
            userId: req.user.id,
            bookId: +req.params.bookId,
            review: req.body.review
        }
    })
    res.json(review);
}


export const deleteReview = async(req:IGetUserAuthInfoRequest,res:Response) => {
const review = await prismaClient.review.findFirstOrThrow({
    where: {
        id: +req.params.reviewId
    }
})
if(!review) {
    throw new NotFound("review does not exist",ErrorCode.NOT_FOUND,null)
}
if(req.user.id === review.userId){
    await prismaClient.review.delete({where: {id:review.id}})
    res.json({message: "successfully deleted review"})
}else {
    throw new BadRequestException("cannot perform tasks",ErrorCode.BAD_REQUEST,null);
}
}