import orderItemModel from "../model/order.item.model.js";
import foodModel from "../model/food.model.js";
import { BaseException } from "../exceptions/base.exception.js";
import { isValidObjectId } from "mongoose";

const createOrderItem = async (req, res, next) => {
    try {
        const { orderId, foodId, quantity } = req.body;

        if (!isValidObjectId(orderId) || !isValidObjectId(foodId)) {
            throw new BaseException("Invalid order or food id", 400);
        }

        const food = await foodModel.findById(foodId);
        if (!food) {
            throw new BaseException("Food not found", 404);
        }

        const subTotal = food.price * quantity;

        const orderItem = new orderItemModel({ orderId, foodId, quantity, subTotal });
        await orderItem.save();

        res.status(201).send({
            message: "Order item added successfully",
            data: orderItem
        });
    } catch (error) {
        next(error);
    }
};

const getOrderItems = async (req, res, next) => {
    try {
        const { orderId } = req.params;

        if (!isValidObjectId(orderId)) {
            throw new BaseException("Invalid order id", 400);
        }

        const orderItems = await orderItemModel.find({ orderId }).populate("foodId");
        res.status(200).send({
            message: "Order items fetched successfully",
            data: orderItems
        });
    } catch (error) {
        next(error);
    }
};

const getOrderItemById = async (req, res, next) => {
    try {
        const { orderId, orderItemId } = req.params;

        if (!isValidObjectId(orderId) || !isValidObjectId(orderItemId)) {
            throw new BaseException("Invalid order or order item id", 400);
        }

        const orderItem = await orderItemModel.findById(orderItemId).populate("foodId");
        if (!orderItem) {
            throw new BaseException("Order item not found", 404);
        }

        res.status(200).send({
            message: "Order item fetched successfully",
            data: orderItem
        });
    } catch (error) {
        next(error);
    }
};

const updateOrderItem = async (req, res, next) => {
    try {
        const { orderId, orderItemId, quantity } = req.body;

        if (!isValidObjectId(orderId) || !isValidObjectId(orderItemId)) {
            throw new BaseException("Invalid order or order item id", 400);
        }

        const orderItem = await orderItemModel.findById(orderItemId);
        if (!orderItem) {
            throw new BaseException("Order item not found", 404);
        }

        const food = await foodModel.findById(orderItem.foodId);
        const subTotal = food.price * quantity;

        orderItem.quantity = quantity;
        orderItem.subTotal = subTotal;

        await orderItem.save();

        res.status(200).send({
            message: "Order item updated successfully",
            data: orderItem
        });
    } catch (error) {
        next(error);
    }
};

const deleteOrderItem = async (req, res, next) => {
    try {
        const { orderId, orderItemId } = req.params;

        if (!isValidObjectId(orderId) || !isValidObjectId(orderItemId)) {
            throw new BaseException("Invalid order or order item id", 400);
        }

        const orderItem = await orderItemModel.findByIdAndDelete({ _id: orderItemId, orderId });

        if (!orderItem) {
            throw new BaseException("Order item not found", 404);
        }

        res.status(200).send({
            message: "Order item deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

export default {
    createOrderItem,
    getOrderItems,
    getOrderItemById,
    updateOrderItem,
    deleteOrderItem
};
