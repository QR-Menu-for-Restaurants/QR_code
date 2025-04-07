import { Router } from "express";
import userRouter from "./user.route.js";
import categoryRoute from "./category.route.js";
import foodRouter from "./food.routes.js";
import adminRouter from "./aminPanel.route.js";
import orderRouter from "./order.route.js";
import orderItemRouter from "./order.item.route.js";
import pageRouter from "./page.route.js";

const router = Router()
router.use("/users",userRouter)
router.use("/categories",categoryRoute)
router.use("/foods",adminRouter)
router.use("/orders",orderRouter)
router.use("/order-items",orderItemRouter)
router.use("/",pageRouter)

export default router