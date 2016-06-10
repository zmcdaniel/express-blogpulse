'use strict';
module.exports = function(sequelize, DataTypes) {
  var author = sequelize.define('author', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    bio: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return author;
};
