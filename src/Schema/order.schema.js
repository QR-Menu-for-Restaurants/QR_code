import Joi from "joi";

export const createOrderSchema = Joi.object({
    userId: Joi.string().required(),
    foodItems: Joi.array().items(
        Joi.object({
            foodId: Joi.string().required(),
            quantity: Joi.number().positive().required(),
        })
    ).required(),
}).required();

export const updateOrderSchema = Joi.object({
    foodItems: Joi.array().items(
        Joi.object({
            foodId: Joi.string().required(),
            quantity: Joi.number().positive().required(),
        })
    ).required(),
    status: Joi.string().valid("pending", "processing", "delivered", "cancelled").required(),
    deliveryAddress: Joi.string().required(),
}).required();

export const updateOrderStatusSchema = Joi.object({
    status: Joi.string().valid("pending", "processing", "delivered", "cancelled").required(),
}).required();