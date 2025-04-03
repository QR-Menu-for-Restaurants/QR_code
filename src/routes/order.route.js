import { Router } from "express";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { createOrderSchema,updateOrderSchema,updateOrderStatusSchema } from "../Schema/order.schema.js";
import orderController from "../controller/order.controller.js";
import { ProtectedMiddleware } from "../middleware/protected.middleware.js";
import { RolesMiddleware } from "../middleware/roles.middleware.js";

const orderRouter = Router();

orderRouter.post('/',ProtectedMiddleware(false),ValidationMiddleware(createOrderSchema), orderController.createOrder);
orderRouter.get('/',ProtectedMiddleware(true),RolesMiddleware(["admin"]),orderController.getOrders);
orderRouter.get('/:id',ProtectedMiddleware(false),orderController.getOrderById);
orderRouter.put('/:id',ProtectedMiddleware(true),RolesMiddleware(["admin"]),ValidationMiddleware(updateOrderSchema),orderController.updateOrder);
orderRouter.put('/:orderId/foods',ProtectedMiddleware(true),RolesMiddleware(["admin"]),ValidationMiddleware(updateOrderStatusSchema), orderController.updateOrderStatus);
orderRouter.delete('/:id',ProtectedMiddleware(false),orderController.deleteOrder);

export default orderRouter;