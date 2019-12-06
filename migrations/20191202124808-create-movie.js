'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Title: {
        type: Sequelize.STRING
      },
      Description: {
        type: Sequelize.TEXT
      },
      Runtime: {
        type: Sequelize.INTEGER
      },
      Genre: {
        type: Sequelize.STRING
      },
      Rating: {
        type: Sequelize.FLOAT
      },
      Metascore: {
        type: Sequelize.STRING
      },
      Votes: {
        type: Sequelize.INTEGER
      },
      Earning: {
        type: Sequelize.STRING
      },
      Director_Id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Directors',
          key: 'id',
        },
      },
      Actor: {
        type: Sequelize.STRING
      },
      Year: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Movies');
  }
};