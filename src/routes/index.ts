import { Router } from "express";

import authRouter from "./auth";
import bookRoute from "./books";

const RootRouter:Router = Router();
RootRouter.use("/auth",authRouter)
RootRouter.use("/book",bookRoute)
export default RootRouter;