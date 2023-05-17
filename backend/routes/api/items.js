const express = require('express');
const { User, Item, ItemImage, ProductReview } = require('../../db/models')

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



module.exports = router;
