'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
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
        itemId: 1,
        url: `https://media.sweetwater.com/api/i/q-82__f-webp__ha-06a4fe9abcab1472__hmac-c286a91c3b2132797777be65f9191a11d42b6ae9/images/guitars/SG61VENH/204530062/204530062-front-large.jpg`
      },
      {
        itemId: 1,
        url: `https://media.sweetwater.com/api/i/q-82__f-webp__ha-269d56e3b56007f3__hmac-cf6135fa25a909e97d1cd83b59b1bf811bfde667/images/guitars/SG61VENH/204530062/204530062-angle-large.jpg`
      },
      {
        itemId: 1,
        url: `https://media.sweetwater.com/api/i/q-82__f-webp__ha-eaefd83019557f2d__hmac-75fb67934c9ec242713ffdf2bd31a3613f8fb85c/images/guitars/SG61VENH/204530062/204530062-detail1-large.jpg`
      },
      {
        itemId: 2,
        url: 'https://cdn.shopify.com/s/files/1/0587/3080/7348/products/1968-fender-telecaster-JSylHEB.jpg'
      },
      {
        itemId: 3,
        url: `https://media.sweetwater.com/api/i/q-82__f-webp__ha-f0f4e776df3040ec__hmac-2039ecd50e8f416a33eaae4bb7c7b30a9c0d032a/images/closeup/750-RAY4RRBdns_angle.jpg`
      },
      {
        itemId: 2,
        url: `https://media.sweetwater.com/api/i/q-82__f-webp__ha-b62d93646a20c679__hmac-9235fd067b24522377f2dd979f9000431215bbc5/images/closeup/750-RAY4RRBdns_detail1.jpg`
      },
      {
        itemId: 4,
        url: `https://media.sweetwater.com/api/i/q-82__f-webp__ha-85a2af44d7b94061__hmac-b9e42704128ff140a29fd38b59a7271440b0a248/images/guitars/SR1350BDUF/211P01221212796/211P01221212796-front-large.jpg`
      },
      {
        itemId: 4,
        url: `https://media.sweetwater.com/api/i/q-82__f-webp__ha-11feeb82b5f55365__hmac-5241bd8d37f34f204ca85c873b0c364b2ccdca8a/images/guitars/SR1350BDUF/211P01221212796/211P01221212796-backbody-large.jpg`
      },
      {
        itemId: 5,
        url: `https://media.sweetwater.com/api/i/q-82__f-webp__ha-e117cce2272b5352__hmac-6a2bdac3ce605cd7181b0f74efbb26928bf9dfa7/images/closeup/750-FP30XBK_detail1.jpg`
      },
      {
        itemId: 5,
        url: `https://media.sweetwater.com/api/i/q-82__f-webp__ha-7bd59f9a7dc2d4c3__hmac-e17ec673210aacba10f095119b95a54dc7491d2d/images/closeup/750-FP30XBK_detail2.jpg`
      },
      {
        itemId: 6,
        url: 'https://media.sweetwater.com/api/i/q-82__f-webp__ha-ac95ca82ff794def__hmac-4d9d3f7bd67edd84e8fcdc027007e63fef0231aa/images/closeup/750-VAD706GESet_detail01.jpg'
      },
      {
        itemId: 6,
        url: `https://media.sweetwater.com/api/i/q-82__f-webp__ha-96c0730aa1ac2483__hmac-f60a3c345a8950526d15fc8e7043b241e3f8b71f/images/closeup/750-VAD706GESet_detail03.jpg`
      },
      {
        itemId: 7,
        url: `https://media.sweetwater.com/api/i/q-82__f-webp__ha-2ad44c8883bde682__hmac-42cd33f4d62b4215d541e4b29a5226dd1b62fcd9/images/guitars/814ceV/1212092112/1212092112-detail1-large.jpg`
      },
      {
        itemId: 7,
        url: `https://media.sweetwater.com/api/i/q-82__f-webp__ha-61e567bb0e988ace__hmac-08f4f3fff7bd4173c60b8445ab08e7806a7ecb34/images/guitars/814ceV/1212092112/1212092112-backbody-large.jpg`
      },
      {
        itemId: 7,
        url: `https://media.sweetwater.com/api/i/q-82__f-webp__ha-fda4a00bbb6bb294__hmac-49c5add022d448a4fd647a4036f5893135c510f3/images/guitars/814ceV/1212092112/1212092112-detail2-large.jpg`
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'ItemImages';
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      itemId: { [Op.in]: [1, 2] }
    }, {});
  }
};
