'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('addresses', {
      id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      street: Sequelize.DataTypes.TEXT,
      province: Sequelize.DataTypes.STRING(100),
      city: Sequelize.DataTypes.STRING(100),
      postal_code: Sequelize.DataTypes.INTEGER(6).UNSIGNED,
      contactId: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'contacts',
          key: 'id',
        }
      },
      active: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      createdAt: Sequelize.DataTypes.DATE,
      updatedAt: Sequelize.DataTypes.DATE
    }, {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      engine: 'InnoDB'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('addresses');
  }
};
