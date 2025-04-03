import { BaseException } from "../exceptions/base.exception.js";
import foodModel from "../model/food.model.js";
import orderModel from "../model/order.model.js";
import userModel from "../model/user.model.js";
import { isValidObjectId } from "mongoose";


const createOrder = async (req, res, next) => {
    try {
        const { userId, foodItems } = req.body;

        if (!isValidObjectId(userId)) {
            throw new BaseException("Invalid user id", 400);
        }

        const user = await userModel.findById(userId);
        if (!user) {
            throw new BaseException("User not found", 404);
        }

        if (!Array.isArray(foodItems) || foodItems.length === 0) {
            throw new BaseException("Food items required", 400);
        }
        let totalPrice = 0;
        for (const item of foodItems) {
            if (!isValidObjectId(item.foodId)) {
                throw new BaseException("Invalid food id", 400);
            }

            const food = await foodModel.findById(item.foodId);
            if (!food) {
                throw new BaseException(`Food not found for id: ${item.foodId}`, 404);
            }

            totalPrice += food.price * (item.quantity || 1);
        }

        const order = new orderModel({ userId, foodItems, totalPrice, status: "pending" });
        await order.save();

        res.status(201).send({
            message: "Order created successfully",
            data: order
        });
    } catch (error) {
        next(error);
    }
};


const getOrders = async (req, res, next) => {
    try {
        const orders = await orderModel
            .find()
            .populate("food.foodId")
            .select("totalPrice status");

        res.status(200).send({
            message: "Orders fetched successfully",
            data: orders
        });
    } catch (error) {
        next(error);
    }
};


const getOrderById = async (req, res, next) => {
    try {
        const { orderId } = req.params;

        if (!isValidObjectId(orderId)) {
            throw new BaseException("Invalid order id", 400);
        }

        const order = await orderModel.findById(orderId).populate("food.foodId");
        if (!order) {
            throw new BaseException("Order not found", 404);
        }

        res.status(200).send({
            message: "Order fetched successfully",
            data: order
        });
    } catch (error) {
        next(error);
    }
}

const updateOrderStatus = async (req, res, next) => {
    try {
        const { orderId, status } = req.body;

        if (!isValidObjectId(orderId)) {
            throw new BaseException("Invalid order id", 400);
        }

        const order = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!order) {
            throw new BaseException("Order not found", 404);
        }

        res.status(200).send({
            message: "Order status updated successfully",
            data: order
        });
    } catch (error) {
        next(error);
    }
};

const updateOrder = async (req, res, next) => {
    try {
        const { orderId, foodItems } = req.body;

        if (!isValidObjectId(orderId)) {
            throw new BaseException("Invalid order id", 400);
        }

        const order = await orderModel.findByIdAndUpdate(orderId, { foodItems }, { new: true });
        if (!order) {
            throw new BaseException("Order not found", 404);
        }

        res.status(200).send({
            message: "Order updated successfully",
            data: order
        });
    } catch (error) {
        next(error);
    }
}

const deleteOrder = async (req, res, next) => {
    try {
        const { orderId } = req.params;

        if (!isValidObjectId(orderId)) {
            throw new BaseException("Invalid order id", 400);
        }

        const deletedOrder = await orderModel.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            throw new BaseException("Order not found", 404);
        }

        res.status(200).send({
            message: "Order deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

export default {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
    updateOrder,
    deleteOrder,
}