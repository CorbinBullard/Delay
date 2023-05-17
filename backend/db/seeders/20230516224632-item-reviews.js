'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'ProductReviews';

    /**
     * Add seed commands here.
     *
     * Example:
     *
    */
    await queryInterface.bulkInsert(options, [
      {
        userId: 2,
        itemId: 1,
        stars: 4,
        review: `This a no nonsense guitar. Based on the classic design but with essential modern appointments. Classic looks and modern playability in mind. It really is a bare essentials guitar that is great to get right into and play. The Alnico V pickups have a bit of heft for being single coils. The "C shaped satin finished neck" makes moving up/down the neck effortless. There's also the 9.5 Radius fret board and Medium Jumbo Frets, The 6-saddle String-thru with bent steel saddles is better over vintage saddles for string height, widths, and intonation. And the Three Blade pickup switch. There is beauty in its simplicity.`

      },
      {
        userId: 1,
        itemId: 2,
        stars: 5,
        review: `With the craftsmanship you are use to from Fender The player telecaster is a well made guitar with good woods straight neck, sound electronics, at an affordable price.`
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'ItemReviews';
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [2, 1] }
    }, {});
  }
};
