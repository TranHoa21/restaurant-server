import * as services from '../services';


export const createNewOrderItem = async (req, res) => {
    const { order_id, menu_id, quantity, price } = req.body

    try {
        const result = await services.createNewOrderItem({ order_id, menu_id, quantity, price })
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

}


export const getAllOrderItem = async (req, res) => {
    try {
        const order_item = await services.getAllOrderItem();
        res.json(order_item)
    } catch (error) {
        console.log('check err >>>', error)
        return res.status(500).json({
            error: true,
            message: 'Error in server',

        })
    }
}

export const getOrderItemById = async (req, res) => {
    const order_itemId = req.params.id;
    try {
        const order_item = await services.getOrderItemById(order_itemId);
        res.json(order_item)
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}

export const updateOrderItem = async (req, res) => {
    const order_itemId = req.params.id;
    const newData = req.body;
    const fileData = req.file;

    try {


        const order_item = await services.updateOrderItem(order_itemId, newData, fileData);
        res.status(200).json({ message: 'Cập nhật thông tin người dùng thành công', order_item });
    } catch (error) {
        console.log('check err', error)
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật thông tin người dùng' });
    }
}

export const deleteOrderItem = async (req, res) => {
    try {
        const order_itemId = req.params.id;
        if (!order_itemId) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        await services.deleteOrderItem(order_itemId);
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: `Error deleting user by ID: ${error.message}` });
    }
}