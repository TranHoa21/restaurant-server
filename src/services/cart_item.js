import db from "../models/index.js";

export const createNewCartItem = async (cart_id, menu_id, quantity, price) => {
    try {
        const getNewCartItem = await db.Cart_Item.create(cart_id, menu_id, quantity, price)
        socket.emit('newBooking', getNewCartItem);
        return {
            err: 0,
            mes: 'User created successfully.',
            order: getNewCartItem,
        }
    } catch (error) {
        console.log('check err >>>', error)
        throw error;
    }
}


export const getAllCartItem = async () => {
    try {
        const allCartItems = await db.Cart_Item.findAll();
        return allCartItems
    } catch (error) {
        console.log('check err >>>>', error);
        throw error;
    }
}

export const getCartItemById = async (cart_itemId) => {
    try {
        if (!cart_itemId) {
            throw new Error('Invalid user ID');
        }
        const cart_item = await db.Cart_Item.findOne({ where: { id: cart_itemId } });
        return cart_item;
    } catch (error) {
        console.log('check err', error)

        throw new Error(`Error getting user by ID: ${error.message}`);
    }
}

export const updateCartItem = async (cart_itemId, newData) => {
    try {
        const cart_item = await db.Cart_Item.findOne({ where: { link: cart_itemId } });
        if (!cart_item) {
            throw new Error('Bài viết không tồn tại');
        }

        await cart_item.update(newData);

        return cart_item;
    } catch (error) {
        console.log('check err >>>>', error);
        throw error;
    }
};

export const deleteCartItem = async (cart_itemId) => {

    try {
        const cart_item = await db.Cart_Item.findOne({ where: { id: cart_itemId } });
        if (!cart_item) {
            throw new Error('Người dùng không tồn tại');
        }
        await cart_item.destroy();
    } catch (error) {
        console.log('check err >>>>', error);

        throw error;
    }
}