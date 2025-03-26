import mongoose from 'mongoose';

const FoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Category",
        required: true
    },
    imageUrl:{
        type: mongoose.SchemaTypes.String
    }
}, {
    collection: "foods",
    timestamps: true,
    versionKey: false
});

export default mongoose.model("Food", FoodSchema);