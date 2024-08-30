import db from "../models/index.js";
import bcrypt from 'bcryptjs';


//export const  = async ({ name, img, country,describe,price,dish_list }) => {
export const createNewMenu = (body, fileData) => new Promise(async (resolve, reject) => {

    try {
        const response = await db.Menu.findOrCreate({
            where: { name: body?.name },
            defaults: {
                name: body.title,
                img: fileData?.path,
                country: body.country,
                describe: body.describe,
                price: body.price,
                dish_list: body.dish_list,
            },

        })
        resolve({
            err: response[1] ? 0 : 1,
            mes: response[1] ? 'Created' : 'Cannot create new post',
        })
        if (fileData && !response[1]) cloudinary.uploader.destroy(fileData.filename)
    }

    catch (error) {
        reject(error)
        if (fileData && !response[1]) cloudinary.uploader.destroy(fileData.filename)

    }
})

export const getAllMenu = async () => {
    try {
        const allMenus = await db.Menu.findAll();
        return allMenus
    } catch (error) {
        console.log('check err >>>>', error);
        throw error;
    }
}

export const getMenuById = async (menuId) => {
    try {
        if (!menuId) {
            throw new Error('Invalid user ID');
        }
        const menu = await db.Menu.findOne({ where: { id: menuId } });
        return menu;
    } catch (error) {
        console.log('check err', error)

        throw new Error(`Error getting user by ID: ${error.message}`);
    }
}

export const updateMenu = async (menuId, newData) => {
    try {
        const menu = await db.Menu.findOne({ where: { link: menuId } });
        if (!menu) {
            throw new Error('Bài viết không tồn tại');
        }

        await menu.update(newData);

        return menu;
    } catch (error) {
        console.log('check err >>>>', error);
        throw error;
    }
};

export const deleteMenu = async (menuId) => {

    try {
        const menu = await db.Menu.findOne({ where: { id: menuId } });
        if (!menu) {
            throw new Error('Người dùng không tồn tại');
        }
        await menu.destroy();
    } catch (error) {
        console.log('check err >>>>', error);

        throw error;
    }
}