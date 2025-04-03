import { Router } from "express";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import {createOrderItemSchema,updateOrderItemSchema} from "../Schema/order.item.schema.js";
import orderItemController from "../controller/order.item.controller.js";

const orderItemRouter = Router();

orderItemRouter.post('/', ValidationMiddleware(createOrderItemSchema), orderItemController.createOrderItem);
orderItemRouter.get('/:id', orderItemController.getOrderItemById);
orderItemRouter.put('/:id', ValidationMiddleware(updateOrderItemSchema), orderItemController.updateOrderItem);
orderItemRouter.delete('/:id', orderItemController.deleteOrderItem);

export default orderItemRouter;