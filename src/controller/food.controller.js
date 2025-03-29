import mongoose, { isValidObjectId } from 'mongoose';
import foodModel from '../model/food.model.js';
import categoryModel from '../model/category.model.js';
import { BaseException } from '../exceptions/base.exception.js';

const getAllFoods = async (req, res,next) => {
    try {
        let { limit = 10, page = 1, sortField = 'created_at', sortOrder = 'ASC', category, minPrice, maxPrice, name } = req.query;

        if (Array.isArray(limit) || Array.isArray(page)) {
            throw new BaseException('Limit must be an array',400);
        }

        limit = parseInt(limit) || 10;
        page = parseInt(page) || 1;

        if (!Number.isInteger(limit) || !Number.isInteger(page) || limit <= 0 || page <= 0) {
            throw new BaseException('Limit and page must be positive integers',400);
        }

        const sortFieldArr = ["name", "price", "created_at"];
        const sortOrderArr = ["ASC", "DESC"];

        if (!sortFieldArr.includes(sortField)) sortField = "created_at";
        if (!sortOrderArr.includes(sortOrder)) sortOrder = "ASC";

        let filter = {};
        if (category) filter.category = category;
        if (minPrice) filter.price = { ...filter.price, $gte: parseFloat(minPrice) };
        if (maxPrice) filter.price = { ...filter.price, $lte: parseFloat(maxPrice) };
        if (name) filter.name = { $regex: name, $options: "i" };

        const foods = await foodModel.find(filter)
            .populate("category")
            .sort({ [sortField]: sortOrder === "ASC" ? 1 : -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await foodModel.countDocuments(filter);

        res.status(200).send({
            message: "Success ✅",
            totalCategory: total,
            page,
            limit,
            data: foods
        });

        
    } catch (error) {
        next(error);
    }
};

const getFoodById = async (req, res,next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            throw new BaseException("invalid id",404);
        }

        const food = await foodModel.findById(id).populate("category");
        if (!food) {
            throw new BaseException("meals not found",404);
        }

        res.status(200).json({
            message: "Success ✅", data: food
        });
    } catch (error) {
        next(error);
    }
};

const createFood = async (req, res,next) => {
    try {
        const { name, price, description, imageUrl, category } = req.body;

        if (!name || !price || !description || !category || !imageUrl) {
            throw new BaseException("name ,price ,description,category and imageUrl are required",400);
        }

        if (!mongoose.isValidObjectId(category)) {
            throw new BaseException("Kategoriya id is not valid",400);
        }

        const categoryExists = await categoryModel.findById(category);
        if (!categoryExists) {
            throw new BaseException("Kategoriya mavjud emas",404);
        }

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

        res.status(201).json({
            message: "Ovqat muvaffaqiyatli yaratildi ✅",
            data: newFood
        });
    } catch (error) {
        next(error);
    }
};

const updateFood = async (req, res,next) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            throw new BaseException("Invalid id",404);
        }

        const { name, price, description, category, imageUrl } = req.body;

        if (!name && !price && !description && !category && !imageUrl) {
            throw new BaseException("nothing was changed!",404);
        }

        if (category && !mongoose.isValidObjectId(category)) {
            throw new BaseException("id is not match",404);
        }

        const updatedFood = await foodModel.findByIdAndUpdate(
            id,
            { name, price, description, category, imageUrl },
            { new: true, runValidators: true }
        );

        if (!updatedFood) {
            throw new BaseException('updatedFood is not found',400);
        }

        res.status(200).json({
            message: "Ovqat muvaffaqiyatli yangilandi ✅",
            data: updatedFood
        });
    } catch (error) {
        next(error);
    }
};

const deleteFood = async (req, res,next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            throw new BaseException("id not found",404);
        }

        const deletedFood = await foodModel.findByIdAndDelete(id);
        if (!deletedFood) {
            throw new BaseException("deletedFood not found",404);
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

export default { getAllFoods, getFoodById, createFood, updateFood, deleteFood };
