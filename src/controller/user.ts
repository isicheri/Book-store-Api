import { Request,Response } from "express";
import { prismaClient } from "..";
import { registerUserSchema } from "../schema/user";
import { hashSync } from "bcrypt";


export const registerUser = async (req:Request,res:Response) => {
    const validateData = registerUserSchema.parse(req.body)
try {
    const user = await prismaClient.user.create({
        data: {...validateData,password: hashSync(validateData.password,10)}
    })
    res.json(user)
} catch (error) {
    res.status(400).json({
        success: true,
        message: {
            one: "an error occurred",
            two: error
        }
    })
}
}