import { Router } from "express";
import foodController from "../controller/food.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { createFoodSchema, updateFoodSchema } from "../Schema/food.schema.js";

const foodRouter = Router();

foodRouter.get("/", foodController.getAllFoods);
foodRouter.get("/:id", foodController.getFoodById);
foodRouter.post(
  "/",
  ValidationMiddleware(createFoodSchema),
  foodController.createFood
);
foodRouter.put(
  "/:id",
  ValidationMiddleware(updateFoodSchema),
  foodController.updateFood
);
foodRouter.delete("/:id", foodController.deleteFood);

export default foodRouter;
