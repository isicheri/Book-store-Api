import { Router } from "express";
import { errorHandler } from "../errors/errors-handler";
import { CreateBook, getAllPublicBooks, getAllPrivateBooks, getBookById, updateBookAccess, getAllBooks, likeBook, unlikeBook } from "../controller/books";
import authMiddleWare from "../middleware/auth";
import { adminMiddleware } from "../middleware/admin";

const bookRoute: Router = Router()

bookRoute.use(authMiddleWare)
bookRoute.post('/create',errorHandler(CreateBook))
bookRoute.put('/update/:bookId',errorHandler(updateBookAccess))
bookRoute.get("/:id",errorHandler(getBookById))
bookRoute.get("/private-book",[adminMiddleware],errorHandler(getAllPrivateBooks))
bookRoute.get("/public-book",errorHandler(getAllPublicBooks))
bookRoute.get('/',[adminMiddleware],errorHandler(getAllBooks))
bookRoute.post("/like-book/:bookId",errorHandler(likeBook))
bookRoute.post("/unlike-book/:bookId",errorHandler(unlikeBook))
// bookRoute.post("/add-page/:bookId/:pageNO",errorHandler(addPagesToBook))



export default bookRoute;