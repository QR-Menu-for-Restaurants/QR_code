import Joi from "joi";

export const reviewSchema = Joi.object({
  rating: Joi.number().required(),
  comment: Joi.string().required(),
  user: Joi.string().required(),
  food: Joi.string().required(),
}).required();

export const reviewUpdateSchema = Joi.object({
  rating: Joi.number(),
  comment: Joi.string(),
}).required();