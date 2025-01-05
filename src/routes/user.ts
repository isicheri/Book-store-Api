import { Router } from "express";
import authMiddleWare from "../middleware/auth";
import { errorHandler } from "../errors/errors-handler";
import { updateUsername, updateUserRoleToWriter } from "../controller/user";

const userRouter:Router = Router();

userRouter.use(authMiddleWare)
userRouter.put("/update-user-username",errorHandler(updateUsername))
userRouter.put("/update-user-role", errorHandler(updateUserRoleToWriter))

export default userRouter;