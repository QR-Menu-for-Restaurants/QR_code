import Joi from "joi";

export const createOrderItemSchema = Joi.object({
    orderId: Joi.string().required(),
    foodId: Joi.string().required(),
    quantity: Joi.number().positive().required(),
}).required();

export const updateOrderItemSchema = Joi.object({
    quantity: Joi.number().positive().required(),
}).required();