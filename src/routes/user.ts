import { Router } from "express";
import { registerUser } from "../controller/user";

const userRouter:Router = Router();

userRouter.post("/register-user", registerUser)

export default userRouter;