import foodModel from "../model/food.model.js";
import categoryModel from "../model/category.model.js";
import mongoose from "mongoose";
import { BaseException } from "../exceptions/base.exception.js";


const getAllFoods = async (req, res,next) => {
    try {
        
        const categories = await categoryModel.find().populate("foods"); 
        res.render("admin", { categories });
    } catch (error) {
        next(new BaseException("Error getting foods",500));      }
}
const addFood = async (req, res,next) => {
    try {
        const { name, price, description, category } = req.body;
        
        if (!name || !price || !description || !category ) {
            throw new BaseException('name , price and description are required',400);
        }
        if (!req.file) {
            throw new BaseException('image is not sent',400);
          }
        if (!mongoose.isValidObjectId(category)) {
            throw new BaseException('incorrect id',400);
        }
        
        const categoryExists = await categoryModel.findById(category);
        if (!categoryExists) {
            throw new BaseException('category is not found',400);
        }

        const imageUrl = "/uploads/" + req.file.filename;
        const newFood = new foodModel({ name, price, description, category, imageUrl });
        await newFood.save();

        await categoryModel.updateOne(
            { _id: category },
            {
                $push: {
                    foods: newFood._id
                }
            }
        );

        res.redirect("/admin");
    } catch (error) {
        next(error);
    }
};
const deleteFood = async (req, res,next) => {
    try {
        await foodModel.findByIdAndDelete(req.params.id);
        res.redirect("/admin");
    } catch (error) {
        next(new BaseException("couldn't find id to delete from food ",500))
    }
}
const updateFood = async (req, res,next) => {
    try {
        const { name, description, price, category } = req.body;
        const imageUrl = "/uploads/" + req.file.filename;

        if (!imageUrl) {
            throw new BaseException("image urls are required", 400);
        }
        await foodModel.findByIdAndUpdate(req.params.id, { name, description,imageUrl, price, category });
        res.redirect("/admin");
    } catch (error) {
        next(error);
    }
}

export default { getAllFoods, addFood, deleteFood, updateFood }
