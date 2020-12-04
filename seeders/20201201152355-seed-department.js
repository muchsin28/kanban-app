'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
    await queryInterface.bulkInsert('Departments', [
      {
        name: 'IT Security Dept.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Product Design Dept.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Software Engineer Dept.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'R&D Dept.',
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Department',null,{})
  }
};
