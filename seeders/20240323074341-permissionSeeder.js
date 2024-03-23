'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Permissions', [
      {
        userId: 3,
        title: 'Izin Cuti Khusus',
        description: 'Saya mengajukan izin cuti khusus karna saya akan menjalani ....',
        status: 'waiting',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        title: 'Izin Cuti Melahirkan',
        description: 'Saya mengajukan izin cuti melahirkan....',
        status: 'waiting',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Permissions', null, {});
  }
};
