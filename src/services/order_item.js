import db from "../models/index.js";

export const createNewOrderItem = async (order_id, menu_id, quantity, price) => {
    try {
        const getNewOrderItem = await db.Order_Item.create(order_id, menu_id, quantity, price)
        socket.emit('newBooking', getNewOrderItem);
        return {
            err: 0,
            mes: 'User created successfully.',
            order: getNewOrderItem,
        }
    } catch (error) {
        console.log('check err >>>', error)
        throw error;
    }
}


export const getAllOrderItem = async () => {
    try {
        const allOrder_Items = await db.Order_Item.findAll();
        return allOrder_Items
    } catch (error) {
        console.log('check err >>>>', error);
        throw error;
    }
}

export const getOrderItemById = async (order_itemId) => {
    try {
        if (!order_itemId) {
            throw new Error('Invalid user ID');
        }
        const order_item = await db.Order_Item.findOne({ where: { id: order_itemId } });
        return order_item;
    } catch (error) {
        console.log('check err', error)

        throw new Error(`Error getting user by ID: ${error.message}`);
    }
}

export const updateOrderItem = async (order_itemId, newData) => {
    try {
        const order_item = await db.Order_Item.findOne({ where: { link: order_itemId } });
        if (!order_item) {
            throw new Error('Bài viết không tồn tại');
        }

        await order_item.update(newData);

        return order_item;
    } catch (error) {
        console.log('check err >>>>', error);
        throw error;
    }
};

export const deleteOrderItem = async (order_itemId) => {

    try {
        const order_item = await db.Order_Item.findOne({ where: { id: order_itemId } });
        if (!order_item) {
            throw new Error('Người dùng không tồn tại');
        }
        await order_item.destroy();
    } catch (error) {
        console.log('check err >>>>', error);

        throw error;
    }
}