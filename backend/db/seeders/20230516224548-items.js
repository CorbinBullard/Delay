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
        name: "Gibson SG Standard '61 - Vintage Cherry",
        brand: 'Gibson',
        price: 1999.99,
        description: `Immortalized by Santana at Woodstock and smashed onstage by Townshend, the Gibson SG is a rock icon. Gibson's Nashville-made SG Standard 61 reissue takes you back to the first model year of the legendary solidbody electric guitar — small pickguard, vintage cherry finish, and all. The Gibson SG Standard 61 reissue is spec'd with a pair of toneful humbuckers; a fast, comfortable SlimTaper neck; and a bound, Plek'd rosewood fretboard with action that's almost nonexistent. The SG's lightweight mahogany body delivers great sustain and no pain, even if you play all night. And the worn nitro finish looks and feels great while enhancing the tone of this legendary rock machine. Own your piece of rock history: the Gibson SG Standard '61.`,
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
      },
      {
        ownerId: 3,
        name: "Sterling By Music Man StingRay RAY4 Dent 'n' Scratch Bass Guitar - Ruby Red Burst Satin",
        brand: 'Musicman',
        price: 289.99,
        description: "Sterling by Music Man's StingRay basses bring affordability to one of the most iconic bass guitars of all time. Featuring the same vintage build with an improved 2-band active preamp system, each StingRay offers a powerful twist on top of a beloved visual display. Its balanced-sounding basswood body and hard maple neck ensure that no matter your play style, or how hard you need to slap, the StingRay will oblige with reliable bass tone. When it comes to building beloved instruments that are accessible to any musician, Sterling by Music Man is the epitome of top flight — and the StingRay is no exception.",
        instrumentType: 'bass',
        year: 2022,
        condition: 'new',
        previewImage: 'https://media.sweetwater.com/api/i/q-82__f-webp__ha-7377991dc392d207__hmac-d31c2c697372d2052d951c8fdb4f08ca32c2a2a7/images/items/750/RAY4RRBdns-large.jpg'
      },
      {
        ownerId: 2,
        name: 'Ibanez Premium SR1350B 4-string Bass Guitar - Dual Mocha Burst Flat',
        brand: 'Ibanez',
        price: 1399.99,
        description: "We're fortunate to get our hands on some of the finest instruments available today, and we can confidently say that the Ibanez Premium SR1350B 4-string electric bass guitar punches above its price range in every way. Sporting sleekly contoured African mahogany body, gorgeous walnut/panga panga/maple top, rock-solid 5-piece panga panga/purpleheart neck, and bound panga panga fingerboard, the SR1350B is a boutique-quality instrument with flawless playability. That quality is borne out by its pair of aggressive Nordstrand Big Single pickups, which deliver massive, roaring tone infused with monumental sustain. The 5-piece neck is strong and sturdy, with premium tuners on one end and a Mono-rail bridge at the other. Custom Ibanez electronics with 3-band EQ complete the setup.",
        instrumentType: 'bass',
        year: 2020,
        condition: 'new',
        previewImage: 'https://media.sweetwater.com/api/i/q-82__f-webp__ha-a0335df5887643e6__hmac-8a65ada0882c55cfca987c76ab08c5cbecfeb193/images/guitars/SR1350BDUF/211P01221212754/211P01221212754-body-large.jpg'
      },
      {
        ownerId: 2,
        name: 'Roland FP-30X Digital Piano with Speakers - Black',
        brand: 'Roland',
        price: 749.99,
        description: "The Roland FP-30X gives you entrée to the latest generation of the company’s award-winning FP series digital pianos, and it benefits from decades of cutting-edge technological development to bring you a refined acoustic grand piano playing experience at home, onstage, or in the studio. Roland’s acclaimed SuperNATURAL Piano sound engine and 256-voice polyphony deliver authentic sound and response. Your fingers will savor the sumptuous touch of Roland’s PHA-4 Standard keyboard with Progressive Hammer Action and Ivory Feel keys, as the FP-30X’s onboard speaker system fills the room with a rich, powerful sound that’s ideal for home playing and intimate live performances. Enhance your music with sounds curated from Roland’s flagship instruments, and shape them to perfection with the built-in effects engine. The FP-30X also features generous connectivity with audio and MIDI via Bluetooth and USB, for wireless streaming to and from your smart device and integration with your computer-based DAW setup.",
        instrumentType: 'keyboard',
        year: 2020,
        condition: 'new',
        previewImage: 'https://media.sweetwater.com/api/i/q-82__f-webp__ha-1345b515224be0f3__hmac-1ed79fb9f18cc30ff135c8b131aa75cbba3bdbc2/images/items/750/FP30XBK-large.jpg'
      },
      {
        ownerId: 2,
        name: 'Roland V-Drums Acoustic Design VAD706GE Electronic Drum Set - Gloss Ebony',
        brand: 'Roland',
        price: 8599.99,
        description: "The Roland VAD706 (V-Drums Acoustic Design) hybrid drum set blends the look and response of a traditional acoustic kit with the pioneering electronics of the modern V-Drums lineup. Real wood shells with lacquered maple finish plies and Roland’s legendary multi-ply mesh heads supply a quiet and custom response at every turn. From the crack of a cranked snare to the wooly give of a classic kick drum, the VAD706 lets you feel, sense, and approach the drums in a whole new light. Across the kit, Roland’s slim, rubberized, multi-zone V-Cymbals serve up the expression you need to craft compelling musical ideas for styles ranging from jazz to metal. The VAD706 comes outfitted with Roland’s trailblazing TD-50X module and a full-sized digital snare, a ride, and hi-hat pads. Together with its massive 22-inch wood bass drum and fusion-sized 10/12/14-inch tom ensemble, the VAD706 captures subtleties in your performances that would be missed using a traditional stage kit, all while looking the part for conventional club, stadium, studio, and sanctuary use. Kitted up with a robust set of included Roland stands, the V-Drums VAD706 hybrid drum set sports an irresistible look that'll make your performances stand out in fresh new ways.",
        instrumentType: 'keyboard',
        year: 2019,
        condition: 'new',
        previewImage: 'https://media.sweetwater.com/api/i/q-82__f-webp__ha-b4132468f20fe452__hmac-799ae84d15c4845e87cc46459680da4a8fd95e51/images/items/750/VAD706GESet-large.jpg'
      },
      {
        ownerId: 2,
        name: 'Taylor 814ce Acoustic-Electric Guitar - Natural with V-Class Bracing and Radiused Armrest',
        brand: 'Taylor',
        price: 3999.99,
        description: "Combining elegant aesthetics with sophisticated playability and tone-enhancing details, the 800 Series is Taylor’s incredibly popular class of premium rosewood guitars. The 814ce acoustic-electric plays very comfortably, thanks to its Grand Auditorium body, graceful Venetian cutaway, and ergonomically radiused rosewood armrest. Featuring beautiful premium solid tonewoods — a Sitka spruce top, Indian rosewood back and sides, a tropical mahogany neck, and a West African ebony fingerboard — the 814ce is the perfect studio and stage workhorse: brilliant in solo and sparse musical settings, and holding its own when tracked in thick arrangements. You’ll love the clear, balanced tone — a sound forged by Taylor’s revolutionary V-Class bracing and amplified flawlessly by the onboard Expression System 2 electronics. As your eyes drink in this instrument’s understated elegance, your hands savor its flawless playability, and your ears revel in its rich, organic tone, you’ll treasure your Taylor 814ce. It’s a feast for the senses.",
        instrumentType: 'guitar',
        year: 2023,
        condition: 'new',
        previewImage: 'https://media.sweetwater.com/api/i/q-82__f-webp__ha-62e4111aedf20af4__hmac-bfcf57cc33454081015e33b0b7a35a0bf4705b79/images/guitars/814ceV/1212092112/1212092112-angle-large.jpg'
      },
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
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
