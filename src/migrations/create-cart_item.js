'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Cart_Items', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            cart_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Carts',
                    key: 'id',
                },
            },
            menu_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Menus',
                    key: 'id',
                },

            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: false,

            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false,

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
        await queryInterface.dropTable('Cart_Items');
    }
};