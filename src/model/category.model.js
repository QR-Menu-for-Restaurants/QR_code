import mongoose from "mongoose";

const CategoryShema = new mongoose.Schema(
    {
        name: {
            type: mongoose.SchemaTypes.String,
            require: true,
            unique: true
        },
        foods: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Food"
        }],
    },
    {
        collection: "categories",
        timestamps: true,
        versionKey: false
    })

export default mongoose.model("Category", CategoryShema)