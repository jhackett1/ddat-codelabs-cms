'use strict';
module.exports = (sequelize, DataTypes) => {
  var Module = sequelize.define('Module', {
    number: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    availableFrom: DataTypes.DATE,
    availableTo: DataTypes.DATE
  }, {});
  Module.associate = function(models) {
    // associations can be defined here
    Module.hasMany(models.Lesson, {
      foreignKey: 'id',
      as: 'lessons'
    })
  };
  return Module;
};
