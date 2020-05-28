'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mail: {
        type: Sequelize.STRING
      },
      pseudo: {
        type: Sequelize.STRING
      },
      avatarLink: {
        type: Sequelize.TEXT
      },
      isAdmin: {
        type: Sequelize.BOOLEAN
      },
      password: {
        type: Sequelize.STRING
      },      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      indexes: [{
        unique: true,
        fields: ['id', 'mail', 'pseudo']
      }]
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('User');
  }
};