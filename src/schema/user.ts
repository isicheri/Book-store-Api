import {z} from "zod";


export const registerUserSchema = z.object({
    username: z.string().toUpperCase(),
    password: z.string().length(8, { message: "Must be exactly 8 characters long" })
})