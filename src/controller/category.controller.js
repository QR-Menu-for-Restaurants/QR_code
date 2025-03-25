import { isValidObjectId } from "mongoose";
import categoryModel from "../model/category.model.js";

const getAllCategories = async (req, res) => {
    try {
        let { limit = 10, page = 1, sortField = "_id", sortOrder = "ASC" } = req.query;

        limit = Number(Array.isArray(limit) ? limit[0] : limit);
        page = Number(Array.isArray(page) ? page[0] : page);

        if (isNaN(limit) || isNaN(page)) {
            return res.status(400).json({
                message: "Limit yoki page noto'g'ri kiritildi!"
            });
        }

        const sortFieldArr = ["_id", "name", "createdAt"];
        const sortOrderArr = ["ASC", "DESC"];

        if (!sortFieldArr.includes(sortField) || !sortOrderArr.includes(sortOrder)) {
            return res.status(400).json({
                message: `sortField: ${sortField} yoki sortOrder: ${sortOrder} noto'g'ri kiritildi!`
            });
        }

        const skip = (page - 1) * limit;
        const order = sortOrder === "ASC" ? 1 : -1;

        const allCategory = await categoryModel.countDocuments();
        const categories = await categoryModel
            .find().
            sort({ [sortField]: order })
            .limit(limit).
            skip(skip);

        res.json({
            message: "Success✅",
            totalCategory: allCategory,
            limit,
            page,
            data: categories,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server xatosi",
            error: error.message
        });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!isValidObjectId(id)) {
            return res.status(404).json({
                message: "Id xato kiritildi"
            });
        }
        const category = await categoryModel.findById(id);
        res.json({
            message: "Id boyicha ma'lumot",
            data: category
        });
    } catch (error) {
        res.status(500).json({
            message: "Server xatosi",
            error: error.message
        });
    }
};

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Name kiritilishi shart"
            });
        }

        const foundedCategory = await categoryModel.findOne({ name });
        if (foundedCategory) {
            return res.status(409).json({
                message: `Category: ${name} allaqachon mavjud`
            });
        }

        const newCategory = new categoryModel({ name });
        await newCategory.save();

        res.status(201).json({
            message: "Yangi category qo'shildi",
            data: newCategory
        });
    } catch (error) {
        res.status(500).json({
            message: "Server xatosi",
            error: error.message
        });
    }
};

const updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        if (!isValidObjectId(id)) {
            return res.status(404).json({
                message: "Id xato kiritildi"
            });
        }

        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Name kiritilishi shart"
            });
        }

        const foundedCategory = await categoryModel.findOne({ name });
        if (foundedCategory) {
            return res.status(409).json({
                message: `Category: ${name} allaqachon mavjud`
            });
        }

        const category = await categoryModel.findByIdAndUpdate(id, { name }, { new: true });
        res.json({
            message: "Id bo'yicha category yangilandi",
            data: category
        });
    } catch (error) {
        res.status(500).json({
            message: "Server xatosi",
            error: error.message
        });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        if (!isValidObjectId(id)) {
            return res.status(404).json({
                message: "Id xato kiritildi"
            });
        }
        await categoryModel.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            message: "Server xatosi",
            error: error.message
        });
    }
};

export default { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
