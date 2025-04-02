import { Router } from "express";
import categoryController from "../controller/category.controller.js"
import upload from "../utils/upload.js";

const categoryRouter = Router();

categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get("/:id", categoryController.getCategoryById);
categoryRouter.post("/", upload.single("image"), categoryController.createCategory);
categoryRouter.post("/update/:id", upload.single("image"), categoryController.updateCategory);
categoryRouter.delete("/:id", categoryController.deleteCategory);
export default categoryRouter;
