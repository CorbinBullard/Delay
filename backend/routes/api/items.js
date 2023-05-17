const express = require('express');
const { User, Item, ItemImage, ProductReview } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// Get all items
router.get('/', async (req, res) => {
    const data = await Item.findAll({
        include: [{ model: ProductReview }]
    })

    res.json(data);
})


// Get single Item
router.get('/:itemId', async (req, res) => {
    const data = await Item.findByPk(req.params.itemId, {
        include: [{ model: ProductReview }, { model: ItemImage }, { model: User }]
    });

    res.json(data);

})

// Create Item Listing


router.post('/', requireAuth, async (req, res) => {
    const { name, brand, price, description, instrumentType, year, condition, previewImage } = req.body;
    const { user } = req;
    console.log("USER: ", req.body)
    const newItem = await Item.create({
        ownerId: user.id,
        name,
        brand,
        price,
        description,
        instrumentType,
        year,
        condition,
        previewImage
    });

    res.status(201).json(newItem);
})

module.exports = router;
