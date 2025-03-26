import { Router } from "express";
import foodController from "../controller/food.controller.js";

const foodRouter = Router();

foodRouter.get('/',foodController.getAllFoods);
foodRouter.get('/:id', foodController.getFoodById);
foodRouter.post('/', foodController.createFood);
foodRouter.put('/:id', foodController.updateFood);
foodRouter.delete('/:id', foodController.deleteFood);

export default foodRouter;