'use strict';
module.exports = (sequelize, DataTypes) => {
  var Module = sequelize.define('Module', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    number: DataTypes.STRING,
    availableFrom: DataTypes.STRING,
    availableTo: DataTypes.STRING
  }, {});
  Module.associate = function(models) {
    // associations can be defined here
    Module.hasMany(models.Lesson, {
      foreignKey: 'moduleId',
      as: 'lessons',
    });
  };
  return Module;
};
