import { Router } from "express";
import adminPanelController from "../controller/adminPanel.controller.js";
import upload from "../../utils/upload.js";

const adminRouter = Router();


adminRouter.get("/admin", adminPanelController.getAllFoods);

// image field nomi muhim!
adminRouter.post('/foods', upload.single('imageUrl'), adminPanelController.addFood);

adminRouter.post("/foods/delete/:id", adminPanelController.deleteFood);
adminRouter.post("/foods/update/:id",upload.single('imageUrl'), adminPanelController.updateFood);


export default adminRouter;
