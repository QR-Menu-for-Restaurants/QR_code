import express from "express";
import categoryModel from "../model/category.model.js";

const menuRouter = express.Router();

menuRouter.get("/menu", async (req, res) => {
  try {
    const categories = await categoryModel.find().populate("foods");
    res.render("menu", { categories });
  } catch (error) {
    console.error(error);
    res.status(500).send("Xatolik yuz berdi!");
  }
});

export default menuRouter;
