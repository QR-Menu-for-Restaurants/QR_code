import mongoose, { isValidObjectId } from 'mongoose';
import foodModel from '../model/food.model.js';
import categoryModel from '../model/category.model.js';

const getAllFoods = async (req, res) => {
    try {
        const foods = await foodModel.find();
        console.log();
        
        res.status(200).json({
            message: "Success ✅", data: foods
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
        const id = req.params.id;

        if (!isValidObjectId(id)) {
            return res.status(400).json({
                message: "Noto‘g‘ri ID ❌"
            });
        }

        const food = await foodModel.findById(id);
        if (!food) {
            return res.status(404).json({
                message: "Ovqat topilmadi ❌"
            });
        }

        res.status(200).json({
            message: "Success ✅",
            data: food
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
        const { name, price, description,imageUrl, category_id } = req.body;

        if (!name || !price || !description || !category_id || !imageUrl) {
            return res.status(400).json({
                message: "name, price, description,imageUrl va category_id talab qilinadi ❌"
            });
        }

        if (!mongoose.isValidObjectId(category_id)) {
            return res.status(400).json({
                message: "Noto‘g‘ri category_id ❌"
            });
        }

        const category = await categoryModel.findById(category_id);
        if (!category) {
            return res.status(404).json({
                message: "Kategoriya topilmadi ❌"
            });
        }

        const newFood = new foodModel({ name, price, description,imageUrl, category_id });
        await newFood.save();

        res.status(201).json({
            message:
                "Ovqat muvaffaqiyatli yaratildi ✅",
            data: newFood
        });
    } catch (error) {
        res.status(500).json({
            message:
                "Serverda xatolik ❌",
            error: error.message
        });
    }
};

const updateFood = async (req, res) => {
    try {
        const id = req.params.id;

        if (!isValidObjectId(id)) {
            return res.status(400).json({
                message: "Noto‘g‘ri ID ❌"
            });
        }

        const { name, price, description, category_id,imageUrl } = req.body;

        if (!name && !price && !description && !category_id && !imageUrl) {
            return res.status(400).json({
                message: "Yangilash uchun hech qanday ma'lumot berilmadi ❌"
            });
        }

        if (category_id && !mongoose.isValidObjectId(category_id)) {
            return res.status(400).json({
                message: "Noto‘g‘ri category_id ❌"
            });
        }

        const updatedFood = await foodModel.findByIdAndUpdate(
            id,
            { name, price, description, category_id,imageUrl },
            { new: true, runValidators: true }
        );

        if (!updatedFood) {
            return res.status(404).json({
                message: "Ovqat topilmadi ❌"
            });
        }

        res.status(200).json({
            message:
                "Ovqat muvaffaqiyatli yangilandi ✅",
            data: updatedFood
        });
    } catch (error) {
        res.status(500).json({
            message:
                "Serverda xatolik ❌",
            error: error.message
        });
    }
};

const deleteFood = async (req, res) => {
    try {
        const id = req.params.id;

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

        res.status(204).json();
    } catch (error) {
        res.status(500).json({
            message:
                "Serverda xatolik ❌",
            error: error.message
        });
    }
};

export default { getAllFoods, getFoodById, createFood, updateFood, deleteFood };