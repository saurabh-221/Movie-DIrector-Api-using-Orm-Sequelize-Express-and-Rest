'use strict';
module.exports = (sequelize, DataTypes) => {
  const Director = sequelize.define('Director', {
    Name: {
      type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Name cannot be null' },
          notEmpty: { msg: 'Name cannot be empty' },
        },
    },
  }, {});
  Director.associate = function(models) {
    Director.hasMany(models.Movie, {
      foreignKey: 'Director_Id',
    });
  };
  return Director;
};