import { isValidObjectId } from "mongoose";
import categoryModel from "../model/category.model.js";
import { BaseException } from "../exceptions/base.exception.js";

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryModel.find().populate("foods");
    res.render("category", { categories });
  } catch (error) {
    next(new BaseException("Error getting categories", 500));
  }
};

const getCategoryById = async (req, res, next) => {
    try {
      const id = req.params.id;
      if (!isValidObjectId(id)) {
        throw new BaseException("Invalid category ID", 404);
      }
      const selectedCategory = await categoryModel.findById(id).populate("foods");
  
      if (!selectedCategory) {
        return res.status(404).render("404", { message: "Category not found" });
      }
  
      const categories = await categoryModel.find(); 
  
      res.render("admin", { categories, selectedCategory }); 
    } catch (error) {
      next(error);
    }
  };
  
const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      throw new BaseException("Category name is required", 400);
    }

    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      throw new BaseException("Category already exists", 409);
    }

    const imageUrl = req.file ? "/uploads/" + req.file.filename : "";
    const newCategory = new categoryModel({ name, imageUrl });
    await newCategory.save();

    res.redirect("/categories");
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      throw new BaseException("Invalid category ID", 404);
    }

    const { name } = req.body;
    if (!name) {
      throw new BaseException("Category name is required", 400);
    }

    const imageUrl = req.file ? "/uploads/" + req.file.filename : undefined;
    const updateData = imageUrl ? { name, imageUrl } : { name };

    const category = await categoryModel.findByIdAndUpdate(id, updateData, { new: true });
    res.redirect("/categories");
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      throw new BaseException("Invalid category ID", 404);
    }

    const category = await categoryModel.findByIdAndDelete(id);
    if (!category) {
      throw new BaseException("Category not found", 404);
    }

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
