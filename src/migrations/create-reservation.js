'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Reservations', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name_user: {
                type: Sequelize.STRING
            },
            user_phone: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.ENUM('new', 'approve', 'cancel', 'completed'),
                defaultValue: 'new',
                allowNull: false
            },
            time: {
                type: Sequelize.DATE
            },
            number_of_people: {
                type: Sequelize.INTEGER
            },
            number_table: {
                type: Sequelize.STRING
            },

            createdAt: {
                allowNull: false,
                type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                allowNull: false,
                type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Reservations');
    }
};