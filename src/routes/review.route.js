import { Router } from "express";
import reviewController from "../controller/review.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { reviewSchema } from "../Schema/review.schema.js";
import { ProtectedMiddleware } from "../middleware/protected.middleware.js";
import { RolesMiddleware } from "../middleware/roles.middleware.js";
import { ROLES } from "../constants/role.contant.js";

const reviewRouter = Router();
console.log("salom");

// Yangi review qo'shish
reviewRouter.post(
  "/",  
  ValidationMiddleware(reviewSchema),
  ProtectedMiddleware,
  RolesMiddleware([ROLES.ADMIN, ROLES.USER]), // Faqat Admin va Userga ruxsat beriladi
  reviewController.createReview
);

// Foodga oid reviewlarni olish
reviewRouter.get(
  "/:foodId",
  ProtectedMiddleware,
  RolesMiddleware([ROLES.ADMIN, ROLES.USER]),
  reviewController.getReviews
);

// Reviewni yangilash
reviewRouter.put(
  "/:reviewId",
  ValidationMiddleware(reviewSchema),  // Reviewni yangilash uchun schema tekshiruvi
  ProtectedMiddleware,
  RolesMiddleware([ROLES.ADMIN, ROLES.USER]),
  reviewController.updateReview
);

// Reviewni o'chirish
reviewRouter.delete(
  "/:reviewId",
  ProtectedMiddleware,
  RolesMiddleware([ROLES.ADMIN, ROLES.USER]),
  reviewController.deleteReview
);

export default reviewRouter;
