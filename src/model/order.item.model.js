import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Order",
        required: true
    },
    foodId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Food",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    subTotal: {
        type: Number,
        required: true
    }
},{
    collection: "orderItems",
    timestamps: true,
    versionKey: false
});

export default mongoose.model('OrderItemSchema', OrderItemSchema);