import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    food: 
        [
            {
                foodId: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref: "Food",
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
    ,
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "processing", "cancelled", "completed"],
        default: "pending"
    }
},{
    collection: "orders",
    timestamps: true,
    versionKey: false
});

export default mongoose.model("Order", OrderSchema);