'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'ItemImages';
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert(options, [
      {
        itemId: 2,
        url: 'https://cdn.shopify.com/s/files/1/0587/3080/7348/products/1968-fender-telecaster-JSylHEB.jpg'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ItemImages';
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      itemId: { [Op.in]: [2] }
    }, {});
  }
};
