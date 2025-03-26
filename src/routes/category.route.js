import { Router } from "express";
import categoryController from "../controller/category.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { createCategorySchema, updateCategorySchema } from "../Schema/category.schema.js";

const categoryRoute = Router()

categoryRoute
    .get("/", categoryController.getAllCategories)
    .get("/:id", categoryController.getCategoryById)
    .post("/", ValidationMiddleware(createCategorySchema), categoryController.createCategory)
    .put("/:id", ValidationMiddleware(updateCategorySchema), categoryController.updateCategory)
    .delete("/:id", categoryController.deleteCategory)

export default categoryRoute