import db from "../models/index.js";

export const createNewCart = async (user_id) => {
    try {
        const getNewCart = await db.Cart.create(user_id)
        socket.emit('newBooking', getNewCart);
        return {
            err: 0,
            mes: 'User created successfully.',
            order: getNewCart,
        }
    } catch (error) {
        console.log('check err >>>', error)
        throw error;
    }
}


export const getAllCart = async () => {
    try {
        const allCarts = await db.Cart.findAll();
        return allCarts
    } catch (error) {
        console.log('check err >>>>', error);
        throw error;
    }
}

export const getCartById = async (cartId) => {
    try {
        if (!cartId) {
            throw new Error('Invalid user ID');
        }
        const cart = await db.Cart.findOne({ where: { id: cartId } });
        return cart;
    } catch (error) {
        console.log('check err', error)

        throw new Error(`Error getting user by ID: ${error.message}`);
    }
}

export const updateCart = async (cartId, newData) => {
    try {
        const cart = await db.Cart.findOne({ where: { link: cartId } });
        if (!cart) {
            throw new Error('Bài viết không tồn tại');
        }

        await cart.update(newData);

        return cart;
    } catch (error) {
        console.log('check err >>>>', error);
        throw error;
    }
};

export const deleteCart = async (cartId) => {

    try {
        const cart = await db.Cart.findOne({ where: { id: cartId } });
        if (!cart) {
            throw new Error('Người dùng không tồn tại');
        }
        await cart.destroy();
    } catch (error) {
        console.log('check err >>>>', error);

        throw error;
    }
}