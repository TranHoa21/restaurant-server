'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Comments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            post_id: {
                type: Sequelize.INTEGER,
                allowNull: false,

            },
            comment_text: {
                type: Sequelize.TEXT
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,

            },
            user_name: {
                type: Sequelize.STRING,
                allowNull: false,

            },
            user_avatar: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable('Comments');
    }
};