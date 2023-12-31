'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('products', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING,
          unique: true,
        },
        price: {
          allowNull: false,
          type: Sequelize.DECIMAL(4,2)
        },
        url_image: {
          allowNull: false,
          type: Sequelize.STRING,
          default: ''
        }, 
    });;
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('products');

  }
};
