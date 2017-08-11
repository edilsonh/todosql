"use strict";

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("todos",[
      {
        description: "Finished this app",
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        description: "Practiced writing code",
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("todos", null, {});
  }
};
