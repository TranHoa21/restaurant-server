const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Review extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Review.belongsToMany(models.Post, { through: 'PostLikes', as: 'likedPosts' });
        }
    }
    Review.init({
        user_id: DataTypes.INTEGER,
        menu_id: DataTypes.INTEGER,
        star: DataTypes.STRING,
        content: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Review',
    });
    return Review;
};
