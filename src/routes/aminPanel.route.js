import { Router } from "express";
import adminPanelController from "../controller/adminPanel.controller.js";


const adminRouter = Router();



adminRouter.get("/admin", adminPanelController.getAllFoods);

adminRouter.post("/api/foods", adminPanelController.addFood);

adminRouter.post("/api/foods/delete/:id", adminPanelController.deleteFood);
adminRouter.post("/api/foods/update/:id", adminPanelController.updateFood);


export default adminRouter;
