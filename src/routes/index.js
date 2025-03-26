import { Router } from "express";
import userRouter from "./user.route.js";
import categoryRoute from "./category.route.js";
import foodRouter from "./food.routes.js";

const router = Router()

router.use("/users",userRouter)
router.use("/categories",categoryRoute)
router.use("/foods",foodRouter)

export default router