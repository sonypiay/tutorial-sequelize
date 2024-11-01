'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('transactions_history', {
      id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      type: {
        type: Sequelize.DataTypes.ENUM(['in', 'out']),
        allowNull: false,
        defaultValue: 'in',
      },
      amount: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      currentAmount: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      name: Sequelize.DataTypes.STRING(128),
      notes: Sequelize.DataTypes.TEXT,
      userId: {
        type: Sequelize.DataTypes.CHAR(36),
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'restrict',
        onUpdate: 'restrict',
      },
      categoryId: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED
      },
      createdAt: Sequelize.DataTypes.DATE,
      updatedAt: Sequelize.DataTypes.DATE
    }, {
      engine: 'InnoDB',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('transaction_history');
  }
};
