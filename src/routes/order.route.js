import { Router } from "express";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { createOrderSchema,updateOrderSchema,updateOrderStatusSchema } from "../Schema/order.schema.js";
import orderController from "../controller/order.controller.js";
import { ProtectedMiddleware } from "../middleware/protected.middleware.js";
import { RolesMiddleware } from "../middleware/roles.middleware.js";
import { ROLES } from "../constants/role.contant.js";

const orderRouter = Router();

orderRouter.post('/',ProtectedMiddleware(false),RolesMiddleware(ROLES.ALL),ValidationMiddleware(createOrderSchema), orderController.createOrder);
orderRouter.get('/',ProtectedMiddleware(true),RolesMiddleware(ROLES.ADMIN,ROLES.OWNER),orderController.getOrders);
orderRouter.get('/:id',ProtectedMiddleware(false),RolesMiddleware(ROLES.ALL),orderController.getOrderById);
orderRouter.put('/:id',ProtectedMiddleware(true),RolesMiddleware(ROLES.ADMIN,ROLES.OWNER),ValidationMiddleware(updateOrderSchema),orderController.updateOrder);
orderRouter.put('/:orderId/foods',ProtectedMiddleware(true),RolesMiddleware(ROLES.ADMIN,ROLES.OWNER),ValidationMiddleware(updateOrderStatusSchema), orderController.updateOrderStatus);
orderRouter.delete('/:id',ProtectedMiddleware(false),RolesMiddleware(ROLES.ALL),orderController.deleteOrder);

export default orderRouter;