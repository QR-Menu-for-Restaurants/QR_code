import mongoose, { isValidObjectId } from 'mongoose';
import foodModel from '../model/food.model.js';
import categoryModel from '../model/category.model.js';

const getAllFoods = async (req, res) => {
    try {
        let { limit = 10, page = 1, sortField = 'created_at', sortOrder = 'ASC', category, minPrice, maxPrice, name } = req.query;

        if (Array.isArray(limit) || Array.isArray(page)) {
            return res.status(400).json({ message: "Limit and page should be single values" });
        }

        limit = parseInt(limit) || 10;
        page = parseInt(page) || 1;

        if (!Number.isInteger(limit) || !Number.isInteger(page) || limit <= 0 || page <= 0) {
            return res.status(400).json({ message: "Limit and page should be positive integers" });
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
        res.status(500).json({
            message: "Serverda xatolik ❌",
            error: error.message
        });
    }
};

const getFoodById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({
                message: "Noto‘g‘ri ID ❌"
            });
        }

        const food = await foodModel.findById(id).populate("category");
        if (!food) {
            return res.status(404).json({
                message: "Ovqat topilmadi ❌"
            });
        }

        res.status(200).json({
            message: "Success ✅", data: food
        });
    } catch (error) {
        res.status(500).json({
            message: "Serverda xatolik ❌",
            error: error.message
        });
    }
};

const createFood = async (req, res) => {
    try {
        const { name, price, description, imageUrl, category } = req.body;

        if (!name || !price || !description || !category || !imageUrl) {
            return res.status(400).json({
                message: "name, price, description, imageUrl va category talab qilinadi ❌"
            });
        }

        if (!mongoose.isValidObjectId(category)) {
            return res.status(400).json({
                message: "Noto‘g‘ri category ID ❌"
            });
        }

        const categoryExists = await categoryModel.findById(category);
        if (!categoryExists) {
            return res.status(404).json({
                message: "Kategoriya topilmadi ❌"
            });
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
        res.status(500).json({
            message: "Serverda xatolik ❌",
            error: error.message
        });
    }
};

const updateFood = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: "Noto‘g‘ri ID ❌" });
        }

        const { name, price, description, category, imageUrl } = req.body;

        if (!name && !price && !description && !category && !imageUrl) {
            return res.status(400).json({
                message: "Yangilash uchun hech qanday ma'lumot berilmadi ❌"
            });
        }

        if (category && !mongoose.isValidObjectId(category)) {
            return res.status(400).json({
                message: "Noto‘g‘ri category ID ❌"
            });
        }

        const updatedFood = await foodModel.findByIdAndUpdate(
            id,
            { name, price, description, category, imageUrl },
            { new: true, runValidators: true }
        );

        if (!updatedFood) {
            return res.status(404).json({
                message: "Ovqat topilmadi ❌"
            });
        }

        res.status(200).json({
            message: "Ovqat muvaffaqiyatli yangilandi ✅",
            data: updatedFood
        });
    } catch (error) {
        res.status(500).json({
            message: "Serverda xatolik ❌",
            error: error.message
        });
    }
};

const deleteFood = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({
                message: "Noto‘g‘ri ID ❌"
            });
        }

        const deletedFood = await foodModel.findByIdAndDelete(id);
        if (!deletedFood) {
            return res.status(404).json({
                message: "Ovqat topilmadi ❌"
            });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            message: "Serverda xatolik ❌",
            error: error.message
        });
    }
};

export default { getAllFoods, getFoodById, createFood, updateFood, deleteFood };
