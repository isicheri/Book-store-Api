import { Router } from "express";

import authRouter from "./auth";
import bookRoute from "./books";
import reviewRouter from "./reviews";
import userRouter from "./user";

const RootRouter:Router = Router();
RootRouter.use("/auth",authRouter)
RootRouter.use("/book",bookRoute)
RootRouter.use("/review",reviewRouter)
RootRouter.use("/user",userRouter)
export default RootRouter;