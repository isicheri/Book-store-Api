import { Router } from "express";
import userRouter from "./user";

const RootRouter:Router = Router();
RootRouter.use("/user",userRouter)
export default RootRouter;