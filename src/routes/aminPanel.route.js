import { Router } from "express";
import adminController from "../controller/adminPanel.controller.js";
import upload from "../utils/upload.js";
import categoryController from "../controller/category.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { createFoodSchema } from "../Schema/food.schema.js";

const adminRouter = Router();

// adminRouter.get("/", adminController.getAllFoods);

adminRouter.post("/foods", upload.single("imageUrl"),ValidationMiddleware(createFoodSchema),adminController.addFood);
adminRouter.delete("/foods/delete/:id", adminController.deleteFood);
adminRouter.post("/foods/update/:id", upload.single("imageUrl"), adminController.updateFood);
adminRouter.get("/admin/categories/:id", categoryController.getCategoryById);

export default adminRouter;
