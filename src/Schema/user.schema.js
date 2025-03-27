import Joi from "joi";

export const registerSchema = Joi.object({
    name: Joi.string().min(4).max(16).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(32).required(),
}).required();

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(32).required(),
}).required();