import { Router } from "express";
import { login, registerUser } from "../controller/auth";
import { errorHandler } from "../errors/errors-handler";

const authRouter:Router = Router();

authRouter.post("/register-user", errorHandler(registerUser))
authRouter.post('/login-user', errorHandler(login))

export default authRouter;