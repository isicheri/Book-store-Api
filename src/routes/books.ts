import { Router } from "express";
import { errorHandler } from "../errors/errors-handler";
import { CreateBook } from "../controller/books";
import authMiddleWare from "../middleware/auth";

const bookRoute: Router = Router()

bookRoute.use(authMiddleWare)
bookRoute.post('/create',errorHandler(CreateBook))

export default bookRoute;