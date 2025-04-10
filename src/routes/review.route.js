import { Router } from "express";
import reviewController from "../controller/review.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { reviewSchema } from "../Schema/review.schema.js";
import { ProtectedMiddleware } from "../middleware/protected.middleware.js";
import { RolesMiddleware } from "../middleware/roles.middleware.js";
import { ROLES } from "../constants/role.contant.js";
import userModel from "../model/user.model.js";
import foodModel from "../model/food.model.js";

const reviewRouter = Router();

// Yangi review qo'shish
// console.log("keldi");

reviewRouter.get("/",async (req,res)=>{
  const users= await userModel.find()
  const foods=await foodModel.find()
  
  
  res.render("review",{users,foods})
});
reviewRouter.post(
  "/create",  
  ValidationMiddleware(reviewSchema),
  ProtectedMiddleware,
  RolesMiddleware([ROLES.ALL]), // Faqat Admin va Userga ruxsat beriladi
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
