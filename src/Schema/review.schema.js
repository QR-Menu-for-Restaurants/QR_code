import Joi from "joi";

export const reviewSchema = Joi.object({
  rating: Joi.number().required(),
  comment: Joi.string().required(),
  userId: Joi.string().required(),
  productId: Joi.string().required(),
}).required();

export const reviewUpdateSchema = Joi.object({
  rating: Joi.number(),
  comment: Joi.string(),
}).required();