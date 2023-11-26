"use strict";

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Items";
    /**
     * Add seed commands here.
     *
     * Example:
     *
     */
    await queryInterface.bulkInsert(
      options,
      [
        {
          ownerId: 1,
          name: "Gibson SG Standard '61 - Vintage Cherry",
          brand: "Gibson",
          price: 1999.99,
          description: `Immortalized by Santana at Woodstock and smashed onstage by Townshend, the Gibson SG is a rock icon. Gibson's Nashville-made SG Standard 61 reissue takes you back to the first model year of the legendary solidbody electric guitar — small pickguard, vintage cherry finish, and all. The Gibson SG Standard 61 reissue is spec'd with a pair of toneful humbuckers; a fast, comfortable SlimTaper neck; and a bound, Plek'd rosewood fretboard with action that's almost nonexistent. The SG's lightweight mahogany body delivers great sustain and no pain, even if you play all night. And the worn nitro finish looks and feels great while enhancing the tone of this legendary rock machine. Own your piece of rock history: the Gibson SG Standard '61.`,
          instrumentType: "guitar",
          year: 1984,
          condition: "excellent",
          previewImage:
            "https://cdn.shopify.com/s/files/1/0013/6111/7231/products/gibson-sg-standard-vintage-cherry-235520073-3_1773x.jpg",
        },
        {
          ownerId: 2,
          name: "American Vintage II Telecaster",
          brand: "Fender",
          price: 2249.99,
          description: `The Fender American Vintage II 1951 Telecaster is a spot-on re-creation of the '51 Tele, which was the first electric guitar to roll off Fender's assembly line bearing the "Telecaster" name.`,
          instrumentType: "guitar",
          year: 1951,
          condition: "excellent",
          previewImage:
            "https://images.reverb.com/image/upload/s--utJKe4jN--/f_auto,t_large/v1564524336/stscmqn9gqfercgucxbe.jpg",
        },
        {
          ownerId: 3,
          name: "Sterling By Music Man StingRay RAY4 Dent 'n' Scratch Bass Guitar - Ruby Red Burst Satin",
          brand: "Musicman",
          price: 289.99,
          description:
            "Sterling by Music Man's StingRay basses bring affordability to one of the most iconic bass guitars of all time. Featuring the same vintage build with an improved 2-band active preamp system, each StingRay offers a powerful twist on top of a beloved visual display. Its balanced-sounding basswood body and hard maple neck ensure that no matter your play style, or how hard you need to slap, the StingRay will oblige with reliable bass tone. When it comes to building beloved instruments that are accessible to any musician, Sterling by Music Man is the epitome of top flight — and the StingRay is no exception.",
          instrumentType: "bass",
          year: 2022,
          condition: "new",
          previewImage:
            "https://media.sweetwater.com/api/i/q-82__f-webp__ha-7377991dc392d207__hmac-d31c2c697372d2052d951c8fdb4f08ca32c2a2a7/images/items/750/RAY4RRBdns-large.jpg",
        },
        {
          ownerId: 2,
          name: "Ibanez Premium SR1350B 4-string Bass Guitar - Dual Mocha Burst Flat",
          brand: "Ibanez",
          price: 1399.99,
          description:
            "We're fortunate to get our hands on some of the finest instruments available today, and we can confidently say that the Ibanez Premium SR1350B 4-string electric bass guitar punches above its price range in every way. Sporting sleekly contoured African mahogany body, gorgeous walnut/panga panga/maple top, rock-solid 5-piece panga panga/purpleheart neck, and bound panga panga fingerboard, the SR1350B is a boutique-quality instrument with flawless playability. That quality is borne out by its pair of aggressive Nordstrand Big Single pickups, which deliver massive, roaring tone infused with monumental sustain. The 5-piece neck is strong and sturdy, with premium tuners on one end and a Mono-rail bridge at the other. Custom Ibanez electronics with 3-band EQ complete the setup.",
          instrumentType: "bass",
          year: 2020,
          condition: "new",
          previewImage:
            "https://media.sweetwater.com/api/i/q-82__f-webp__ha-a0335df5887643e6__hmac-8a65ada0882c55cfca987c76ab08c5cbecfeb193/images/guitars/SR1350BDUF/211P01221212754/211P01221212754-body-large.jpg",
        },
        {
          ownerId: 2,
          name: "Roland FP-30X Digital Piano with Speakers - Black",
          brand: "Roland",
          price: 749.99,
          description:
            "The Roland FP-30X gives you entrée to the latest generation of the company’s award-winning FP series digital pianos, and it benefits from decades of cutting-edge technological development to bring you a refined acoustic grand piano playing experience at home, onstage, or in the studio. Roland’s acclaimed SuperNATURAL Piano sound engine and 256-voice polyphony deliver authentic sound and response. Your fingers will savor the sumptuous touch of Roland’s PHA-4 Standard keyboard with Progressive Hammer Action and Ivory Feel keys, as the FP-30X’s onboard speaker system fills the room with a rich, powerful sound that’s ideal for home playing and intimate live performances. Enhance your music with sounds curated from Roland’s flagship instruments, and shape them to perfection with the built-in effects engine. The FP-30X also features generous connectivity with audio and MIDI via Bluetooth and USB, for wireless streaming to and from your smart device and integration with your computer-based DAW setup.",
          instrumentType: "keyboard",
          year: 2020,
          condition: "new",
          previewImage:
            "https://media.sweetwater.com/api/i/q-82__f-webp__ha-1345b515224be0f3__hmac-1ed79fb9f18cc30ff135c8b131aa75cbba3bdbc2/images/items/750/FP30XBK-large.jpg",
        },
        {
          ownerId: 2,
          name: "Roland V-Drums Acoustic Design VAD706GE Electronic Drum Set - Gloss Ebony",
          brand: "Roland",
          price: 8599.99,
          description:
            "The Roland VAD706 (V-Drums Acoustic Design) hybrid drum set blends the look and response of a traditional acoustic kit with the pioneering electronics of the modern V-Drums lineup. Real wood shells with lacquered maple finish plies and Roland’s legendary multi-ply mesh heads supply a quiet and custom response at every turn. From the crack of a cranked snare to the wooly give of a classic kick drum, the VAD706 lets you feel, sense, and approach the drums in a whole new light. Across the kit, Roland’s slim, rubberized, multi-zone V-Cymbals serve up the expression you need to craft compelling musical ideas for styles ranging from jazz to metal. The VAD706 comes outfitted with Roland’s trailblazing TD-50X module and a full-sized digital snare, a ride, and hi-hat pads. Together with its massive 22-inch wood bass drum and fusion-sized 10/12/14-inch tom ensemble, the VAD706 captures subtleties in your performances that would be missed using a traditional stage kit, all while looking the part for conventional club, stadium, studio, and sanctuary use. Kitted up with a robust set of included Roland stands, the V-Drums VAD706 hybrid drum set sports an irresistible look that'll make your performances stand out in fresh new ways.",
          instrumentType: "drum",
          year: 2019,
          condition: "new",
          previewImage:
            "https://media.sweetwater.com/api/i/q-82__f-webp__ha-b4132468f20fe452__hmac-799ae84d15c4845e87cc46459680da4a8fd95e51/images/items/750/VAD706GESet-large.jpg",
        },
        {
          ownerId: 2,
          name: "Taylor 814ce Acoustic-Electric Guitar - Natural with V-Class Bracing and Radiused Armrest",
          brand: "Taylor",
          price: 3999.99,
          description:
            "Combining elegant aesthetics with sophisticated playability and tone-enhancing details, the 800 Series is Taylor’s incredibly popular class of premium rosewood guitars. The 814ce acoustic-electric plays very comfortably, thanks to its Grand Auditorium body, graceful Venetian cutaway, and ergonomically radiused rosewood armrest. Featuring beautiful premium solid tonewoods — a Sitka spruce top, Indian rosewood back and sides, a tropical mahogany neck, and a West African ebony fingerboard — the 814ce is the perfect studio and stage workhorse: brilliant in solo and sparse musical settings, and holding its own when tracked in thick arrangements. You’ll love the clear, balanced tone — a sound forged by Taylor’s revolutionary V-Class bracing and amplified flawlessly by the onboard Expression System 2 electronics. As your eyes drink in this instrument’s understated elegance, your hands savor its flawless playability, and your ears revel in its rich, organic tone, you’ll treasure your Taylor 814ce. It’s a feast for the senses.",
          instrumentType: "guitar",
          year: 2023,
          condition: "new",
          previewImage:
            "https://media.sweetwater.com/api/i/q-82__f-webp__ha-62e4111aedf20af4__hmac-bfcf57cc33454081015e33b0b7a35a0bf4705b79/images/guitars/814ceV/1212092112/1212092112-angle-large.jpg",
        },
        {
          ownerId: 3,
          name: 'Vox AC15C1 1x12" 15-watt Tube Combo Amp',
          brand: "Vox",
          price: 799.99,
          description:
            "This Vox AC15 Custom delivers the classic chime and complex grind that has made the brand famous. This 15-watt combo amp was one of the first to define the British sound and continues to be used on stages and in studios around the world. The AC15 Custom's 15-watt design offers manageable volume in the live environment while still being able to get above the band. And the 25-watt Celestion Greenback speaker mellows high frequencies. If you want a Vox with a look that's both vintage and rare, grab this AC15 Custom.",
          instrumentType: "other",
          year: 2023,
          condition: "new",
          previewImage:
            "https://media.sweetwater.com/api/i/q-82__f-webp__ha-40c1dc163abe55f8__hmac-9b20894a48ba673ecb76f382333458bd6e3ba427/images/items/750/AC15C1-large.jpg",
        },
        {
          ownerId: 3,
          name: "PRS SE McCarty 594 Electric Guitar - Black Gold Burst",
          brand: "PRS",
          price: 949.99,
          description:
            "The PRS SE McCarty 594 electric guitar marks the model’s debut within the SE series, bringing the tonal might and effortless playability of one of Paul’s most iconic models to the masses! Just like its Core line siblings, this 6-string boasts an elegant tonewood pairing of mahogany and maple — a time-tested combo that imparts both warmth and definition to your every note. Next, a pair of low-wind 58/15 LT “S” pickups take the old-school magic of ’50s-style humbuckers straight into the 21st century with an extra helping of clarity and articulation. Looking for a rock-solid gigging guitar? A PRS 2-piece bridge and PRS-designed tuners bookend the SE McCarty 594 with enhanced sustain and exceptional tuning stability. The rosewood-topped-mahogany neck rounds out this guitar’s feature set with a slightly chunky Pattern Vintage profile that’s sure to please thumb-over-neck players and fans of vintage-style neck carves.",
          instrumentType: "guitar",
          year: 2020,
          condition: "new",
          previewImage:
            "https://media.sweetwater.com/api/i/q-82__f-webp__ha-df780baee0821ff1__hmac-1759028bcb6de12a5b057744c2d4afba0d6325ec/images/guitars/SEMC594BGS/CTIF008744/CTIF008744-body-large.jpg",
        },
        {
          ownerId: 3,
          name: "Shure SM7B Cardioid Dynamic Vocal Microphone",
          brand: "Shure",
          price: 399.99,
          description:
            "The PRS SE McCarty 594 electric guitar marks the model’s debut within the SE series, bringing the tonal might and effortless playability of one of Paul’s most iconic models to the masses! Just like its Core line siblings, this 6-string boasts an elegant tonewood pairing of mahogany and maple — a time-tested combo that imparts both warmth and definition to your every note. Next, a pair of low-wind 58/15 LT “S” pickups take the old-school magic of ’50s-style humbuckers straight into the 21st century with an extra helping of clarity and articulation. Looking for a rock-solid gigging guitar? A PRS 2-piece bridge and PRS-designed tuners bookend the SE McCarty 594 with enhanced sustain and exceptional tuning stability. The rosewood-topped-mahogany neck rounds out this guitar’s feature set with a slightly chunky Pattern Vintage profile that’s sure to please thumb-over-neck players and fans of vintage-style neck carves.",
          instrumentType: "other",
          year: 2021,
          condition: "new",
          previewImage: `https://media.sweetwater.com/api/i/q-82__f-webp__ha-2b05a5c2984a30fd__hmac-c378e92d4610057e9c5624682641752fc04f63f3/images/items/750/SM7B-large.jpg`,
        },
        {
          ownerId: 3,
          name: "Tama Starclassic Performer MBS52RZS 5-piece Shell Pack - Crimson Red Waterfall, Limited Edition",
          brand: "Tama",
          price: 1799.99,
          description:
            "TAMA's Starclassic Maple/Birch drums take the basic design of their acclaimed Starclassic Maple series and put a cool twist on it. These drums feature the combination of a more mellow birch with the stiffness of maple. The results equal a supremely dynamic sound that features the characteristic warmth of birch shells enhanced by the hearty bite of maple plies. Beyond that, Starclassic Maple/Birch drums come complete with all of the outstanding hardware that sets the Starclassic series apart. This includes TAMA's die-cast hoops and Star-Cast mounting system — plus, each shell comes outfitted with quality Evans heads. To top it all off, this limited-edition Performer Starclassic features a unique hand-painted finish that's sure to turn some heads!",
          instrumentType: "drum",
          year: 2023,
          condition: "new",
          previewImage: `https://media.sweetwater.com/api/i/q-82__f-webp__ha-8ce9438217764109__hmac-e1df12541328d2c2683027934af41d0f94b5a622/images/items/750/MBS52RZBNSCRW-large.jpg`,
        },
        {
          ownerId: 3,
          name: "Fender American Vintage II 1954 Precision Bass - 2-tone Sunburst",
          brand: "Fender",
          price: 2249.99,
          description:
            "Vintage tone junkies and early Fender fans alike will revel in this bass that appears to be lifted right out of a time machine. Outfitted with early P Bass contours and complimented by a ’54 Single-Coil Precision Bass pickup, the American Vintage II 1954 Precision Bass delivers that decades’ worth of sought-after tone you know and love. You’ll find classic ’54-styled features on its ash body and comfortable maple neck and fingerboard that bring it all together for P Bass perfection. Sweetwater bassists agree: if you’re a die-hard fan of ’50s-era P Basses — but can’t get your hands on one of the originals — this direct descendent is for you.",
          instrumentType: "bass",
          year: 2023,
          condition: "new",
          previewImage: `https://media.sweetwater.com/api/i/q-82__f-webp__ha-a5701285b467f6da__hmac-a0a0864d1be4cea17c6a3cbb33531be391e24b6c/images/guitars/PBassAV254M2S/V0717/V0717-body-large.jpg`,
        },
        {
          ownerId: 1,
          name: "Fender American Professional II Stratocaster",
          brand: "Fender",
          price: 1499.99,
          description:
            "A versatile and classic electric guitar with updated features.",
          instrumentType: "guitar",
          year: 2022,
          condition: "new",
          sold: false,
          previewImage:
            "https://media.sweetwater.com/api/i/q-82__h-750__f-webp__ha-6a84086e6b6a2c6e__hmac-4a36590bcc7ba73fe14f511c66384c95914990d8/images/guitars/StratAP2HRDK/US23078959/US23078959-body-large.jpg",
        },
        {
          ownerId: 2,
          name: "Music Man StingRay Special 5-String Bass",
          brand: "Music Man",
          price: 2199.99,
          description:
            "Premium 5-string bass guitar known for its powerful tone.",
          instrumentType: "bass",
          year: 2021,
          condition: "excellent",
          sold: false,
          previewImage:
            "https://media.sweetwater.com/m/products/image/6ceb402fd807dwHRs24LoyNLf4uSWdoWlWOoRc05.png",
        },
        {
          ownerId: 3,
          name: "Pearl Masters Maple Complete Drum Set",
          brand: "Pearl",
          price: 3499.99,
          description:
            "Professional-grade drum set with a full and rich sound.",
          instrumentType: "drum",
          year: 2020,
          condition: "good",
          sold: false,
          previewImage:
            "https://media.sweetwater.com/api/i/q-82__w-750__f-webp__ha-9e5c25fb4b2877ff__hmac-479f089a82b0a1d2d88d015f7de6ad21135f37dc/images/items/750/MCT943XPC-BGS-large.jpg",
        },
        {
          ownerId: 3,
          name: "Martin D-28 Acoustic Guitar",
          brand: "Martin",
          price: 2599.99,
          description: "Iconic acoustic guitar with a rich and balanced sound.",
          instrumentType: "guitar",
          year: 2022,
          condition: "excellent",
          sold: false,
          previewImage:
            "https://media.sweetwater.com/api/i/q-82__h-750__f-webp__ha-cadda6247b9e49cc__hmac-1e08f490e8b02f50e8b33fcabc8f6e743511d97c/images/guitars/MD28/M2778025/M2778025-angle-large.jpg.auto.webp",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Items";
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        ownerId: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
