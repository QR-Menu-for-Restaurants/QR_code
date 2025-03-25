import { Router } from "express";
import categoryController from "../controller/category.controller.js";

const categoryRoute = Router()

categoryRoute
    .get("/", categoryController.getAllCategories)
    .get("/:id", categoryController.getCategoryById)
    .post("/", categoryController.createCategory)
    .put("/:id", categoryController.updateCategory)
    .delete("/:id", categoryController.deleteCategory)

export default categoryRoute