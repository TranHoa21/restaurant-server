import db from "../models/index.js";
import bcrypt from 'bcryptjs';

export const createNewOrder = async (user_id, total_price) => {
    try {
        const getNewOrder = await db.Order.create(user_id, total_price)
        socket.emit('newBooking', getNewOrder);
        return {
            err: 0,
            mes: 'User created successfully.',
            order: getNewOrder,
        }
    } catch (error) {
        console.log('check err >>>', error)
        throw error;
    }
}


export const getAllOrder = async () => {
    try {
        const allOrders = await db.Order.findAll();
        return allOrders
    } catch (error) {
        console.log('check err >>>>', error);
        throw error;
    }
}

export const getOrderById = async (orderId) => {
    try {
        if (!orderId) {
            throw new Error('Invalid user ID');
        }
        const order = await db.Order.findOne({ where: { id: orderId } });
        return order;
    } catch (error) {
        console.log('check err', error)

        throw new Error(`Error getting user by ID: ${error.message}`);
    }
}

export const updateOrder = async (orderId, newData) => {
    try {
        const order = await db.Order.findOne({ where: { link: orderId } });
        if (!order) {
            throw new Error('Bài viết không tồn tại');
        }

        await order.update(newData);

        return order;
    } catch (error) {
        console.log('check err >>>>', error);
        throw error;
    }
};

export const deleteOrder = async (orderId) => {

    try {
        const order = await db.Order.findOne({ where: { id: orderId } });
        if (!order) {
            throw new Error('Người dùng không tồn tại');
        }
        await order.destroy();
    } catch (error) {
        console.log('check err >>>>', error);

        throw error;
    }
}