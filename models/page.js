'use strict';
module.exports = (sequelize, DataTypes) => {
  var Page = sequelize.define('Page', {
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {});
  Page.associate = function(models) {
    // associations can be defined here
  };
  return Page;
};
