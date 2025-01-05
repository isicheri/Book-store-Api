import { Router } from "express";
import authMiddleWare from "../middleware/auth";
import { errorHandler } from "../errors/errors-handler";
import { createReview, deleteReview } from "../controller/reviews";

const reviewRouter:Router = Router();

reviewRouter.use(authMiddleWare)
reviewRouter.post("/post-review/:bookId",errorHandler(createReview))
reviewRouter.delete("/delete-review/:reviewId",errorHandler(deleteReview))

export default reviewRouter;