const express = require('express');
const { User, Item, ItemImage, ProductReview} = require('../../db/models')

const router = express.Router();

// Get all items
router.get('/', async (req, res) => {
    const data = await Item.findAll({
        include: [{model: ProductReview}]
    })

    res.json(data);
})






module.exports = router;
