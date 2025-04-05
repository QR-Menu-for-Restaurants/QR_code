import foodModel from "../model/food.model.js";
import categoryModel from "../model/category.model.js";
import mongoose from "mongoose";
import { BaseException } from "../exceptions/base.exception.js";


const getAllFoods = async (req, res, next) => {
  try {
    const { category } = req.query; 

    let query = {};
    if (category) {
      query.category = category;  
    }

    const categories = await categoryModel.find().populate({
      path: 'foods',
      match: query, 
    });

    res.render("admin", { categories, selectedCategory: category ? category : null });
  } catch (error) {
    next(new BaseException("Error getting foods", 500));
  }
};

const addFood = async (req, res, next) => {
  try {

    const { name, price, description, category } = req.body;

    if (!name || !price || !description || !category) {
      throw new BaseException('name, price, and description are required', 400);
    }

    if (!req.file) {
      throw new BaseException('image is not sent', 400);
    }

    if (!mongoose.isValidObjectId(category)) {
      throw new BaseException('incorrect category id', 400);
    }

    const categoryExists = await categoryModel.findById(category);
    if (!categoryExists) {
      throw new BaseException('category not found', 400);
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

    const updatedCategory = await categoryModel
      .findById(category)
      .populate('foods'); 

    res.render('admin', { selectedCategory: updatedCategory });

  } catch (error) {
    console.error(error); 
    next(error); 
  }
};

async function deleteFood(req, res) {
  try {
    const foodId = req.params.id;
    const food = await foodModel.findByIdAndDelete(foodId);

    if (!food) {
      return res.status(404).send({ message: "Taom topilmadi!" });
    }

    res.status(204).send()
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Xatolik yuz berdi!" });
  }
}

const updateFood = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;

    if (!name || !price || !description) {
      throw new BaseException('name, price, and description are required', 400);
    }

    const food = await foodModel.findById(id);
    if (!food) {
      throw new BaseException('food not found', 404);
    }

    food.name = name;
    food.price = price;
    food.description = description;

    await food.save();

    const updatedCategory = await categoryModel.findById(food.category).populate('foods');
    res.render('admin', { selectedCategory: updatedCategory });

  } catch (error) {
    console.error(error);
    next(error); 
  }
};


const updateFoodImageUrl = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      throw new BaseException('image is not sent', 400);
    }

    const food = await foodModel.findById(id);
    if (!food) {
      throw new BaseException('food not found', 404);
    }

    food.imageUrl = "/uploads/" + req.file.filename;

    await food.save();

    const updatedCategory = await categoryModel.findById(food.category).populate('foods');
    res.render('admin', { selectedCategory: updatedCategory });

  } catch (error) {
    console.error(error);
    next(error); 
  }
};

export default { getAllFoods, addFood, deleteFood, updateFood,updateFoodImageUrl };
