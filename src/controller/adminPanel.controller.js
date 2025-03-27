import foodModel from "../model/food.model.js";
import categoryModel from "../model/category.model.js";
import mongoose from "mongoose";

const getAllFoods = async (req, res) => {
    try {
        
        const categories = await categoryModel.find().populate("foods"); 
        res.render("admin", { categories });
    } catch (error) {
        res.status(500).json({ message: "Error getting foods", error: error.message });
    }
}
const addFood = async (req, res) => {
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

        res.redirect("/admin");
    } catch (error) {
        res.status(500).json({
            message: "Serverda xatolik ❌",
            error: error.message
        });
    }
};
const deleteFood = async (req, res) => {
    try {
        await foodModel.findByIdAndDelete(req.params.id);
        res.redirect("/admin");
    } catch (error) {
        res.status(500).json({ message: "Error deleting food", error: error.message });
    }
}
const updateFood = async (req, res) => {
    try {
        const { name, description, imageUrl, price, category } = req.body;
        console.log("keldi");
        
        await foodModel.findByIdAndUpdate(req.params.id, { name, description, imageUrl, price, category });
        res.redirect("/admin");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating food");
    }
}

export default { getAllFoods, addFood, deleteFood, updateFood }