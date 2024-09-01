import * as services from '../services';


export const createNewCart = async (req, res) => {
    const { user_id } = req.body

    try {
        const result = await services.createNewCart({ user_id })
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

}


export const getAllCart = async (req, res) => {
    try {
        const allCarts = await services.getAllCart();
        res.json(allCarts)
    } catch (error) {
        console.log('check err >>>', error)
        return res.status(500).json({
            error: true,
            message: 'Error in server',

        })
    }
}

export const getCartById = async (req, res) => {
    const cartId = req.params.id;
    try {
        const cart = await services.getCartById(cartId);
        res.json(cart)
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}

export const updateCart = async (req, res) => {
    const cartId = req.params.id;
    const newData = req.body;
    const fileData = req.file;

    try {


        const cart = await services.updateCart(cartId, newData, fileData);
        res.status(200).json({ message: 'Cập nhật thông tin người dùng thành công', cart });
    } catch (error) {
        console.log('check err', error)
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật thông tin người dùng' });
    }
}

export const deleteCart = async (req, res) => {
    try {
        const cartId = req.params.id;
        if (!cartId) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        await services.deleteCart(cartId);
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: `Error deleting user by ID: ${error.message}` });
    }
}