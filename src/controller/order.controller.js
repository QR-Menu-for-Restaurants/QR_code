import { BaseException } from "../exceptions/base.exception.js";
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

        const totalPrice = foodItems.reduce((sum, item) => sum + (item.food.price * item.quantity), 0);

        const order = new orderModel({ userId, totalPrice,status: "pending" });
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
        const { userId } = req.params;

        if (!isValidObjectId(userId)) {
            throw new BaseException("Invalid user id", 400);
        }

        const orders = await orderModel.find({ userId }).populate("food.foodId");
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