import { Router } from "express";
import categoryController from "../controller/category.controller.js";
import upload from "../utils/upload.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../Schema/category.schema.js";
import { ProtectedMiddleware } from "../middleware/protected.middleware.js";
import { RolesMiddleware } from "../middleware/roles.middleware.js";
import { ROLES } from "../constants/role.contant.js";

const categoryRouter = Router();

categoryRouter.get(
  "/",
  ProtectedMiddleware(true),
  RolesMiddleware(ROLES.ALL),
  categoryController.getAllCategories
);

categoryRouter.get(
  "/:id",
  ProtectedMiddleware(true),
  RolesMiddleware(ROLES.ALL),
  categoryController.getCategoryById
);

// Category yaratish
categoryRouter.post(
  "/",
  ProtectedMiddleware(true),
  RolesMiddleware([ROLES.ADMIN, ROLES.OWNER]),
  upload.single("image"),
  ValidationMiddleware(createCategorySchema),
  categoryController.createCategory
);

// Categoryni yangilash (ID orqali)
categoryRouter.post(
  "/update/:id",
  ProtectedMiddleware(true),
  RolesMiddleware([ROLES.ADMIN, ROLES.OWNER]),
  upload.single("image"),
  ValidationMiddleware(updateCategorySchema),
  categoryController.updateCategory
);

// Categoryni faqat rasmni yangilash
categoryRouter.patch(
  "/update/image/:id",
  ProtectedMiddleware(true),
  RolesMiddleware([ROLES.ADMIN, ROLES.OWNER]),
  upload.single("image"),
  ValidationMiddleware(updateCategorySchema),
  categoryController.updateCategoryImageUrl
);

// Categoryni o'chirish
categoryRouter.delete(
  "/:id",
  ProtectedMiddleware(true),
  RolesMiddleware([ROLES.ADMIN, ROLES.OWNER]),
  categoryController.deleteCategory
);

export default categoryRouter;
