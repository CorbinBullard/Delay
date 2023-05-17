'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Items';
    /**
     * Add seed commands here.
     *
     * Example:
     *
    */
    await queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        name: 'Gibson SG',
        brand: 'Gibson',
        price: 1599.99,
        description: 'Officially in its 60th decade of turning heads and rattling eardrums, the Gibson SG Special continues to invite superlatives and adoration for its iconic body design and absolute mind-blowing tone.',
        instrumentType: 'guitar',
        year: 1984,
        condition: 'excellent',
        previewImage: 'https://cdn.shopify.com/s/files/1/0013/6111/7231/products/gibson-sg-standard-vintage-cherry-235520073-3_1773x.jpg'
      },
      {
        ownerId: 2,
        name: 'American Vintage II Telecaster',
        brand: 'Fender',
        price: 2249.99,
        description: `The Fender American Vintage II 1951 Telecaster is a spot-on re-creation of the '51 Tele, which was the first electric guitar to roll off Fender's assembly line bearing the "Telecaster" name.`,
        instrumentType: 'guitar',
        year: 1951,
        condition: 'excellent',
        previewImage: 'https://images.reverb.com/image/upload/s--utJKe4jN--/f_auto,t_large/v1564524336/stscmqn9gqfercgucxbe.jpg'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Items';
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Gibson SG', 'American Vintage II Telecaster'] }
    }, {});
  }
};
