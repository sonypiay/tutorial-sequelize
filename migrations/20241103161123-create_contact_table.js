'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('contacts', {
      id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      firstname: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      lastname: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: true
      },
      email: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: true
      },
      phone_number: {
        type: Sequelize.DataTypes.STRING(64),
        allowNull: true
      },
      userId: {
        type: Sequelize.DataTypes.CHAR(36),
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        }
      },
      notes: Sequelize.DataTypes.TEXT,
      active: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      createdAt: Sequelize.DataTypes.DATE,
      updatedAt: Sequelize.DataTypes.DATE
    }, 
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      engine: 'InnoDB'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('contacts');
  }
};
