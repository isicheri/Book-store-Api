import { Router } from "express";
import { errorHandler } from "../errors/errors-handler";
import { CreateBook, getAllBookPublicBooks, getAllPrivateBooks, getBookById, updateBookAccess } from "../controller/books";
import authMiddleWare from "../middleware/auth";
import { adminMiddleware } from "../middleware/admin";

const bookRoute: Router = Router()

bookRoute.use(authMiddleWare)
bookRoute.post('/create',errorHandler(CreateBook))
bookRoute.put('/update/:bookId',errorHandler(updateBookAccess))
bookRoute.get("/:id",errorHandler(getBookById))
bookRoute.get("/private-book",[adminMiddleware],errorHandler(getAllPrivateBooks))
bookRoute.get("/public-book",errorHandler(getAllBookPublicBooks))

export default bookRoute;