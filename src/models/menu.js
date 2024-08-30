const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Menu extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Menu.belongsToMany(models.Post, { through: 'PostLikes', as: 'likedPosts' });
        }
    }
    Menu.init({
        name: DataTypes.STRING,
        img: DataTypes.STRING,
        country: DataTypes.STRING,
        describe: DataTypes.STRING,
        price: DataTypes.INTEGER,
        dish_list: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Menu',
    });
    return Menu;
};
