import { Router } from "express";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { createOrderSchema,updateOrderSchema,updateOrderStatusSchema } from "../Schema/order.schema.js";
import orderController from "../controller/order.controller.js";

const orderRouter = Router();

orderRouter.post('/', ValidationMiddleware(createOrderSchema), orderController.createOrder);
orderRouter.get('/', orderController.getOrders);
orderRouter.get('/:id', orderController.getOrderById);
orderRouter.put('/:id', ValidationMiddleware(updateOrderSchema),orderController.updateOrder);
orderRouter.put('/:orderId/foods', ValidationMiddleware(updateOrderStatusSchema), orderController.updateOrderStatus);
orderRouter.delete('/:id', orderController.deleteOrder);

export default orderRouter;