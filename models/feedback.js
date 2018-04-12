'use strict';
module.exports = (sequelize, DataTypes) => {
  var Feedback = sequelize.define('Feedback', {
    experience: DataTypes.STRING,
    message: DataTypes.TEXT,
    moduleNumber: DataTypes.STRING
  }, {});
  Feedback.associate = function(models) {
    // associations can be defined here
  };
  return Feedback;
};
