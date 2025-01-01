import { Router } from "express";

import authRouter from "./auth";

const RootRouter:Router = Router();
RootRouter.use("/auth",authRouter)
export default RootRouter;