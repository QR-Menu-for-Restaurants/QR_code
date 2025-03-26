import foodModel from "../model/food.model.js";

const getAllFoods = async (req, res) => {
    try {
        const foods = await foodModel.find();        
        res.render("admin", { foods });
    } catch (error) {
        res.status(500).json({ message: "Error getting foods", error: error.message });
    }
}
const addFood = async (req, res) => {
    try {
        await foodModel.create(req.body);
        
        res.redirect("/admin");
    } catch (error) {
        res.status(500).json({ message: "Error adding food", error: error.message });
    }
}
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
        await foodModel.findByIdAndUpdate(req.params.id, { name, description, imageUrl, price, category });
        res.redirect("/admin");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating food");
    }
}

export default { getAllFoods, addFood, deleteFood, updateFood }