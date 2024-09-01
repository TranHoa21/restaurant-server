import * as services from '../services';


export const createNewOrder = async (req, res) => {
    const { user_id, total_price } = req.body

    try {
        const result = await services.createNewOrder({ user_id, total_price })
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

}


export const getAllOrder = async (req, res) => {
    try {
        const orders = await services.getAllOrder();
        res.json(orders)
    } catch (error) {
        console.log('check err >>>', error)
        return res.status(500).json({
            error: true,
            message: 'Error in server',

        })
    }
}

export const getOrderById = async (req, res) => {
    const orderId = req.params.id;
    try {
        const order = await services.getUserById(orderId);
        res.json(order)
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}

export const updateOrder = async (req, res) => {
    const orderId = req.params.id;
    const newData = req.body;
    const fileData = req.file;

    try {


        const order = await services.updateOrder(orderId, newData, fileData);
        res.status(200).json({ message: 'Cập nhật thông tin người dùng thành công', order });
    } catch (error) {
        console.log('check err', error)
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật thông tin người dùng' });
    }
}

export const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        if (!orderId) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        await services.deleteUser(orderId);
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: `Error deleting user by ID: ${error.message}` });
    }
}