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

// Update an Item
router.put('/:itemId', requireAuth, async (req, res) => {
    const item = await Item.findByPk(req.params.itemId);

    if (!item) return res.status(404).json({message: 'Item could not be found'});

    const {user} = req;
    if (item.ownerId !== user.id) return res.status(403).json({ message: "Forbidden" });

    const { name, brand, price, description, instrumentType, year, condition, previewImage } = req.body;

    await item.update({
        name, brand, price, description, instrumentType, year, condition, previewImage
    })

    return res.json(item)

})

// Delete an Item
router.delete('/:itemId', requireAuth, async (req, res) => {
    const item = await Item.findByPk(req.params.itemId);
    if (!item) return res.status(404).json({ message: 'Item could not be found' });

    const { user } = req;
    if (item.ownerId !== user.id) return res.status(403).json({ message: "Forbidden" });

    await item.destroy();
    res.json({ message: "Successfully deleted" });
})

module.exports = router;
