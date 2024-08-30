const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Table_reservation_history extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Table_reservation_history.belongsToMany(models.Post, { through: 'PostLikes', as: 'likedPosts' });
        }
    }
    Table_reservation_history.init({
        user_id: DataTypes.INTEGER,
        reservation_id: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Table_reservation_history',
    });
    return Table_reservation_history;
};
