import { Router } from "express";
import categoryController from "../controller/category.controller.js"
import upload from "../utils/upload.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { createCategorySchema, updateCategorySchema } from "../Schema/category.schema.js";
import { ProtectedMiddleware } from "../middleware/protected.middleware.js";
import { RolesMiddleware } from "../middleware/roles.middleware.js";

const categoryRouter = Router();

categoryRouter.get("/",ProtectedMiddleware(false),categoryController.getAllCategories);
categoryRouter.get("/:id",ProtectedMiddleware(false),categoryController.getCategoryById);
categoryRouter.post("/",ProtectedMiddleware(true),RolesMiddleware(["admin"]),upload.single("image"),ValidationMiddleware(createCategorySchema),categoryController.createCategory);
categoryRouter.post("/update/:id",ProtectedMiddleware(true),RolesMiddleware(["admin"]), upload.single("image"),ValidationMiddleware(updateCategorySchema),categoryController.updateCategory);
categoryRouter.delete("/:id",ProtectedMiddleware(true),RolesMiddleware(["admin"]), categoryController.deleteCategory);
export default categoryRouter;
