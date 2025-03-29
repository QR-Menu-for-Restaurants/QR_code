import { isValidObjectId } from "mongoose";
import categoryModel from "../model/category.model.js";
import { BaseException } from "../exceptions/base.exception.js";

const getAllCategories = async (req, res,next) => {
    try {
        let { limit = 10, page = 1, sortField = "_id", sortOrder = "ASC" } = req.query;

        limit = Number(Array.isArray(limit) ? limit[0] : limit);
        page = Number(Array.isArray(page) ? page[0] : page);

        if (isNaN(limit) || isNaN(page)) {
            throw new BaseException("not a number",400);
        }

        const sortFieldArr = ["_id", "name", "createdAt"];
        const sortOrderArr = ["ASC", "DESC"];

        if (!sortFieldArr.includes(sortField) || !sortOrderArr.includes(sortOrder)) {
            throw new BaseException("sortField and sortOrder must be the same",400);
        }

        const skip = (page - 1) * limit;
        const order = sortOrder === "ASC" ? 1 : -1;

        const allCategory = await categoryModel.countDocuments();
        const categories = await categoryModel.find().populate("foods")
            .sort({ [sortField]: order })
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
        next(error);
    }
};

const getCategoryById = async (req, res,next) => {
    try {
        const id = req.params.id;

        if (!isValidObjectId(id)) {
            throw new BaseException('invalid id',404);
        }
        const category = await categoryModel.findById(id);
        res.json({
            message: "Id boyicha ma'lumot",
            data: category
        });
    } catch (error) {
        next(error);
    }
};

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            throw new BaseException("invalid name or should be set",400)
        }

        const foundedCategory = await categoryModel.findOne({ name });
        if (foundedCategory) {
            throw new BaseException("category already exists",409);
        }

        const newCategory = new categoryModel({ name });
        await newCategory.save();

        res.status(201).json({
            message: "Yangi category qo'shildi",
            data: newCategory
        });
    } catch (error) {
        next(error);
    }
};

const updateCategory = async (req, res,next) => {
    try {
        const id = req.params.id;
        if (!isValidObjectId(id)) {
            throw new BaseException('id has to be written',404)
        }

        const { name } = req.body;
        if (!name) {
            throw new BaseException('name has to be required',404);
        }

        const foundedCategory = await categoryModel.findOne({ name });
        if (foundedCategory) {
            throw new BaseException('catefory exists',404);
        }

        const category = await categoryModel.findByIdAndUpdate(id, { name }, { new: true });
        res.json({
            message: "Id bo'yicha category yangilandi",
            data: category
        });
    } catch (error) {
        next(error);
    }
};

const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        if (!isValidObjectId(id)) {
            throw new BaseException("id must be a valid",404);
        }
        await categoryModel.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

export default { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
