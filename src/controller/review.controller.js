import { BaseException } from "../exceptions/base.exception.js";
import reviewModel from "../model/review.model.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import userModel from "../model/user.model.js";
import foodModel from "../model/food.model.js";
import mongoose from "mongoose";

export const createReview = async (req, res, next) => {
    try {
        const { user, food, rating, comment } = req.body;
        console.log(req.body);
        
        if (!user || !food || !rating || !comment) {
            throw new BaseException("All fields are required", 400);
        };
        if (!mongoose.Types.ObjectId.isValid(user) || !mongoose.Types.ObjectId.isValid(food)) {
            throw new BaseException("Invalid user or food id", 400);
        }

        const userExists = await userModel.findById(user);
        if (!userExists) {
            throw new BaseException("User not found", 404);
        }
        const foodExists = await foodModel.findById(food);
        if (!foodExists) {
            throw new BaseException("Food not found", 404);
        }

        const newReview = new reviewModel({
            user,
            food,
            rating,
            comment
        });
        await newReview.save();

        
        res.redirect(`/reviews`); // Redirect to food's review page
    } catch (error) {
        next(error);
    }
};

export const getReviews = async (req, res, next) => {
    try {
        const { food } = req.params;

        if (!mongoose.Types.ObjectId.isValid(food)) {
            throw new BaseException("Food ID noto‘g‘ri", 400);
        }

        const foodExists = await foodModel.findById(food);
        if (!foodExists) {
            throw new BaseException("Taom topilmadi", 404);
        }

        const reviews = await reviewModel.find({ food }).populate("users"); // Corrected populate('user')

        res.render("review", {
            food,
            reviews
        });
    } catch (error) {
        next(error);
    }
};

export const getReview = async (req, res, next) => {
    try {
        const { review } = req.params;

        if (!mongoose.Types.ObjectId.isValid(review)) {
            throw new BaseException("Review ID noto‘g‘ri", 400);
        }

        const reviewExists = await reviewModel.findById(review).populate("users").populate("food");
        if (!reviewExists) {
            throw new BaseException("Review topilmadi", 404);
        }

        res.render("review", { review: reviewExists });
    } catch (error) {
        next(error);
    }
};

export const updateReview = async (req, res, next) => {
    try {
        const { review } = req.params;
        const { rating, comment } = req.body;

        if (!mongoose.Types.ObjectId.isValid(review)) {
            throw new BaseException("Review ID noto‘g‘ri", 400);
        }

        const reviewExists = await reviewModel.findById(review);
        if (!reviewExists) {
            throw new BaseException("Review topilmadi", 404);
        }

        reviewExists.rating = rating;
        reviewExists.comment = comment;
        await reviewExists.save();

        res.redirect(`/review/${reviewExists.food}`); // Redirect after update
    } catch (error) {
        next(error);
    }
};

export const deleteReview = async (req, res, next) => {
    try {
        const { review } = req.params;

        if (!mongoose.Types.ObjectId.isValid(review)) {
            throw new BaseException("Review ID noto‘g‘ri", 400);
        }

        const reviewExists = await reviewModel.findById(review);
        if (!reviewExists) {
            throw new BaseException("Review topilmadi", 404);
        }

        const foodId = reviewExists.food; // Save foodId before deletion
        await reviewExists.remove();

        res.redirect(`/reviews/${foodId}`); // Redirect to the food's review page
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
};
