import * as services from '../services';
const cloudinary = require('cloudinary').v2;
import Joi from 'joi';


export const createMenu = async (req, res) => {
    const fileData = req.file;
    const { name, country, describe, price, dish_list } = req.body;

    try {
        const schema = Joi.object({
            name: Joi.string().required(),
            country: Joi.string().required(),
            describe: Joi.string().required(),
            price: Joi.string().required(),
            dish_list: Joi.string().required(),

        });
        console.log("check fileData", fileData)
        const { error } = schema.validate({ name, country, describe, price, dish_list });
        if (error) {
            if (fileData) {
                cloudinary.uploader.destroy(fileData.filename);
            }
            return res.status(400).json({ error: error.details[0].message });
        }

        const result = await services.createNewMenu({ ...req.body }, fileData); // Truyền link vào services.createTour
        return res.status(200).json(result);
    } catch (error) {
        if (fileData) {
            cloudinary.uploader.destroy(fileData.filename);
        }
        res.status(500).json({ error: 'Internal Server Error' });
        console.log(error);
    }
};

export const getAllMenu = async (req, res) => {
    try {
        const menus = await services.getAllMenu();
        res.json(menus)
    } catch (error) {
        console.log('check err >>>', error)
        return res.status(500).json({
            error: true,
            message: 'Error in server',

        })
    }
}

export const getMenuById = async (req, res) => {
    const menuId = req.params.id;
    try {
        const menu = await services.getUserById(menuId);
        res.json(menu)
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}

export const updateMenu = async (req, res) => {
    const menuId = req.params.id;
    const newData = req.body;
    const fileData = req.file;

    try {
        if (fileData) {
            // Nếu có ảnh mới được tải lên
            // Xóa ảnh cũ trên cơ sở dữ liệu và Cloudinary
            const menu = await services.getMenuById(menuId);
            if (menu && menu.img) {
                // Xóa ảnh cũ trên Cloudinary
                const publicId = menu.img.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(publicId);
            }
            // Cập nhật đường dẫn ảnh mới vào newData
            newData.img = fileData.path;
        }

        const menu = await services.updateMenu(menuId, newData, fileData);
        res.status(200).json({ message: 'Cập nhật thông tin người dùng thành công', menu });
    } catch (error) {
        console.log('check err', error)
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật thông tin người dùng' });
    }
}

export const deleteMenu = async (req, res) => {
    try {
        const menuId = req.params.id;
        if (!menuId) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        await services.deleteUser(menuId);
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: `Error deleting user by ID: ${error.message}` });
    }
}