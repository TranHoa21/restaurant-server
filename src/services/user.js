import db from "../models/index.js";
import bcrypt from 'bcryptjs';


export const createNewUser = async ({ name, email, password }) => {
    try {
        const generateRandomNumber = () => {
            const min = Math.pow(10, 5); // 10^5 = 100,000
            const max = Math.pow(10, 6) - 1; // 10^6 - 1 = 999,999
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const newId = `${generateRandomNumber()}`;

        const newUser = await db.User.findOne({ where: { email } });
        if (newUser) {
            resolve({
                err: 1,
                mes: 'Email has been registered, please use another email',
            });
            return;
        }
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8))
        const getNewUser = await db.User.create(
            {
                id: newId,
                name,
                email,
                password: hashedPassword,
            }
        )
        return {
            err: 0,
            mes: 'User created successfully.',
            user: getNewUser,
        }
    } catch (error) {
        console.log('check err >>>', error)
        throw error;
    }
}


export const getAllUser = async () => {
    try {
        const allUsers = await db.User.findAll();
        return allUsers
    } catch (error) {
        console.log('check err >>>>', error);
        throw error;
    }
}

export const getUserById = async (userId) => {
    try {
        if (!userId) {
            throw new Error('Invalid user ID');
        }
        const user = await db.User.findOne({ where: { id: userId } });
        return user;
    } catch (error) {
        console.log('check err', error)

        throw new Error(`Error getting user by ID: ${error.message}`);
    }
}

export const updateUser = async (userId, newData, fileData) => {
    try {
        const user = await db.User.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error('Người dùng không tồn tại');
        }

        // Cập nhật dữ liệu mới vào user
        if (newData.name) {
            user.name = newData.name;
        }
        if (newData.email) {
            user.email = newData.email;
        }
        if (newData.age) {
            user.age = newData.age;
        }
        if (newData.gender) {
            user.gender = newData.gender;
        }
        if (newData.phonenumber) {
            user.phonenumber = newData.phonenumber;
        }
        if (fileData !== undefined) {
            user.avatar = fileData.path;
        }


        // Lưu thay đổi vào cơ sở dữ liệu
        await user.save();

        return user;
    } catch (error) {
        console.log('check err >>>>', error);

        throw error;
    }
}

export const deleteUser = async (userId) => {

    try {
        const user = await db.User.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error('Người dùng không tồn tại');
        }
        await user.destroy();
    } catch (error) {
        console.log('check err >>>>', error);

        throw error;
    }
}