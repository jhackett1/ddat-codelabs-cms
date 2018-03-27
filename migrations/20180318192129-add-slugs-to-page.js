'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Pages',
      'slug',
      Sequelize.STRING
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Pages',
      'slug'
    )
  }
};
