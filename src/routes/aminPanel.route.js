import { Router } from "express";
import adminPanelController from "../controller/adminPanel.controller.js";


const adminRouter = Router();

adminRouter.get("/admin", adminPanelController.getAllFoods);

adminRouter.post("/foods", adminPanelController.addFood);

adminRouter.post("/foods/delete/:id", adminPanelController.deleteFood);
adminRouter.post("/foods/update/:id", adminPanelController.updateFood);


export default adminRouter;
