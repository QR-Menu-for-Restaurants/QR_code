import { BaseException } from "../exceptions/base.exception.js";
import reviewModel from "../model/review.model.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import userModel from "../model/user.model.js";
import foodModel from "../model/food.model.js";
import mongoose from "mongoose";

export const createReview = async (request,response,next) => {
    try {
        const {user,food,rating,comment} = request.body;

        if(!user || !food || !rating || !comment){
            throw new BaseException("All fields are required",400);
        };
        if(!mongoose.Types.ObjectId.isValid(user) || !mongoose.Types.ObjectId.isValid(food)){
            throw new BaseException("Invalid user or food id",400);
        }

        const userExists = await userModel.findById(user);
        if(!userExists){
            throw new BaseException("User not found",404);
        }
        const foodExists = await foodModel.findById(food);
        if(!foodExists){
            throw new BaseException("Food not found",404);
        };
        const newReview = new reviewModel({
            user,
            food,
            rating,
            comment
        });
        await newReview.save();
        response.status(201).send({
            message: "Review created successfully",
            data: newReview
        });
    } catch (error) {
        next(error);
    }
};
export const getReviews = async (request,response,next) => {
    try {
        const {food} = request.params;
        if(!mongoose.Types.ObjectId.isValid(food)){
            throw new BaseException("Invalid food id",400);
        }
        const foodExists = await foodModel.findById(food);
        if(!foodExists){
            throw new BaseException("Food not found",404);
        }
        const reviews = await reviewModel.find({food}).populate("user");
        response.status(200).send({
            message: "Reviews fetched successfully",
            data: reviews
        });
    } catch (error) {
        next(error);
    }
};

export const getReview = async (request,response,next) => {
    try {
        const {review} = request.params;
        if(!mongoose.Types.ObjectId.isValid(review)){
            throw new BaseException("Invalid review id",400);
        }
        const reviewExists = await reviewModel.findById(review);
        if(!reviewExists){
            throw new BaseException("Review not found",404);
        }
        response.status(200).send({
            message: "Review fetched successfully",
            data: reviewExists
        });
    } catch (error) {
        next(error);
    }
};
export const updateReview = async (request,response,next) => {
    try {
        const {review} = request.params;
        const {rating,comment} = request.body;
        if(!mongoose.Types.ObjectId.isValid(review)){
            throw new BaseException("Invalid review id",400);
        }
        const reviewExists = await reviewModel.findById(review);
        if(!reviewExists){
            throw new BaseException("Review not found",404);
        }
        reviewExists.rating = rating;
        reviewExists.comment = comment;
        await reviewExists.save();
        response.status(200).send({
            message: "Review updated successfully",
            data: reviewExists
        });
    } catch (error) {
        next(error);
    }
};
export const deleteReview = async (request,response,next) => {
    try {
        const {review} = request.params;
        if(!mongoose.Types.ObjectId.isValid(review)){
            throw new BaseException("Invalid review id",400);
        }
        const reviewExists = await reviewModel.findById(review);
        if(!reviewExists){
            throw new BaseException("Review not found",404);
        }
        await reviewExists.remove();
        response.status(200).send({
            message: "Review deleted successfully",
            data: reviewExists
        });
    } catch (error) {
        next(error);
    }
};

export default {
    createReview,
    getReviews,
    getReview,
    updateReview,
    deleteReview
}