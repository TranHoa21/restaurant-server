const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Reservation extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Reservation.belongsToMany(models.Post, { through: 'PostLikes', as: 'likedPosts' });
        }
    }
    Reservation.init({
        user_name: DataTypes.STRING,
        user_phone: DataTypes.STRING,
        status: DataTypes.ENUM('new', 'approve', 'cancel', 'completed'),
        time: DataTypes.DATE,
        number_of_people: DataTypes.INTEGER,
        number_table: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Reservation',
    });
    return Reservation;
};
