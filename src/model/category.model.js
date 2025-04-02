import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        foods: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Food"
        }],
    },
    {
        collection: "categories",
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model("Category", categorySchema);
