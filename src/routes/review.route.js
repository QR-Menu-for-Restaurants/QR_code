import { Router } from "express";
import reviewController from "../controller/review.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { reviewSchema } from "../Schema/review.schema.js";
import { ProtectedMiddleware } from "../middleware/protected.middleware.js";
import { RolesMiddleware } from "../middleware/roles.middleware.js";
import { ROLES } from "../constants/role.contant.js";
const reviewRouter = Router();

reviewRouter.post(
  "/",
  ValidationMiddleware(reviewSchema),
  ProtectedMiddleware,
  RolesMiddleware([ROLES.ADMIN, ROLES.USER]),
  reviewController.createReview
);
reviewRouter.get(
  "/:foodId",
  ProtectedMiddleware,
  RolesMiddleware([ROLES.ADMIN, ROLES.USER]),
  reviewController.getReviews
);
reviewRouter.put(
  "/:reviewId",
  ValidationMiddleware(reviewSchema),
  ProtectedMiddleware,
  RolesMiddleware([ROLES.ADMIN, ROLES.USER]),
  reviewController.updateReview
);  
reviewRouter.delete(
  "/:reviewId",
  ProtectedMiddleware,
  RolesMiddleware([ROLES.ADMIN, ROLES.USER]),
  reviewController.deleteReview
);
export default reviewRouter;