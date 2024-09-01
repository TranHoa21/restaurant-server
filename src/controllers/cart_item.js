import * as services from '../services';


export const createNewCartItem = async (req, res) => {
    const { cart_id, menu_id, quantity, price } = req.body

    try {
        const result = await services.createNewCartItem({ cart_id, menu_id, quantity, price })
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

}


export const getAllCartItem = async (req, res) => {
    try {
        const cart_item = await services.getAllCartItem();
        res.json(cart_item)
    } catch (error) {
        console.log('check err >>>', error)
        return res.status(500).json({
            error: true,
            message: 'Error in server',

        })
    }
}

export const getCartItemById = async (req, res) => {
    const cart_itemId = req.params.id;
    try {
        const cart_item = await services.getCartItemById(cart_itemId);
        res.json(cart_item)
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}

export const updateCartItem = async (req, res) => {
    const cart_itemId = req.params.id;
    const newData = req.body;
    const fileData = req.file;

    try {


        const cart_item = await services.updateCartItem(cart_itemId, newData, fileData);
        res.status(200).json({ message: 'Cập nhật thông tin người dùng thành công', cart_item });
    } catch (error) {
        console.log('check err', error)
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật thông tin người dùng' });
    }
}

export const deleteCartItem = async (req, res) => {
    try {
        const cart_itemId = req.params.id;
        if (!cart_itemId) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        await services.deleteCartItem(cart_itemId);
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: `Error deleting user by ID: ${error.message}` });
    }
}