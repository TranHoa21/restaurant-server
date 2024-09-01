const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Cart.belongsToMany(models.Post, { through: 'PostLikes', as: 'likedPosts' });
        }
    }
    Cart.init({
        user_id: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Cart',
    });
    return Cart;
};
