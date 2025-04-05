import { Router } from "express";
import adminController from "../controller/adminPanel.controller.js";
import upload from "../utils/upload.js";
import categoryController from "../controller/category.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { createFoodSchema, updateFoodSchema } from "../Schema/food.schema.js";
import { ProtectedMiddleware } from "../middleware/protected.middleware.js";
import { RolesMiddleware } from "../middleware/roles.middleware.js";
import { ROLES } from "../constants/role.contant.js";

const adminRouter = Router();

// adminRouter.get("/", adminController.getAllFoods);

adminRouter.post("/foods", ProtectedMiddleware(true),RolesMiddleware(ROLES.OWNER,ROLES.ADMIN),upload.single("imageUrl"),ValidationMiddleware(createFoodSchema),adminController.addFood);
adminRouter.delete("/foods/delete/:id",ProtectedMiddleware(true),RolesMiddleware(ROLES.ADMIN,ROLES.OWNER), adminController.deleteFood);
adminRouter.post("/foods/update/:id",ProtectedMiddleware(true),RolesMiddleware(ROLES.ADMIN,ROLES.OWNER),upload.single("imageUrl"),ValidationMiddleware(updateFoodSchema), adminController.updateFood);
adminRouter.get("/admin/categories/:id",ProtectedMiddleware(true),RolesMiddleware(ROLES.ADMIN,ROLES.OWNER),categoryController.getCategoryById);

export default adminRouter;
