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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    imageUrl: { 
        type: String,
        required: true
    }
}, {
    collection: "foods",
    timestamps: true,
    versionKey: false
});

export default mongoose.model("Food", FoodSchema);
