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
        include: [{ model: ProductReview, include: { model: User } }, { model: ItemImage }, { model: User }]
    });

    res.json(data);
})

// Create Item Listing


router.post('/', requireAuth, async (req, res) => {
    const { name, brand, price, description, instrumentType, year, condition, previewImage } = req.body;
    const { user } = req;

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
    const data = await Item.findByPk(newItem.id, {
        include: [{ model: ProductReview, include: { model: User } }, { model: ItemImage }, { model: User }]
    });

    res.status(201).json(data);
})

// Update an Item
router.put('/:itemId', requireAuth, async (req, res) => {
    const item = await Item.findByPk(req.params.itemId);

    if (!item) return res.status(404).json({ message: 'Item could not be found' });

    const { user } = req;
    if (item.ownerId !== user.id) return res.status(403).json({ message: "Forbidden" });

    const { name, brand, price, description, instrumentType, year, condition, previewImage } = req.body;

    const newItem = await item.update({
        name, brand, price, description, instrumentType, year, condition, previewImage
    })
    const data = await Item.findByPk(newItem.id, {
        include: [{ model: ProductReview, include: { model: User } }, { model: ItemImage }, { model: User }]
    });
    // console.log("NEW ITEM ======================================================================================================================> : ", newItem.toJSON())
    return res.json(data)

});

// Delete an Item
router.delete('/:itemId', requireAuth, async (req, res) => {
    const item = await Item.findByPk(req.params.itemId);
    if (!item) return res.status(404).json({ message: 'Item could not be found' });

    const { user } = req;
    if (item.ownerId !== user.id) return res.status(403).json({ message: "Forbidden" });

    await item.destroy();
    res.json({ message: "Successfully deleted" });
});

// =============================== REVIEWS =============================== //

// Create a Review From Item ID

router.post('/:itemId/reviews', requireAuth, async (req, res) => {
    const { stars, review } = req.body;
    const { user } = req;

    const item = await Item.findByPk(req.params.itemId);
    if (!item) return res.status(404).json({ message: "Item could not be found" });

    const userReviews = await item.getProductReviews({ where: { userId: user.id } })
    if (userReviews.length) return res.status(403).json({ message: "User already has a review for this item" });

    const newReview = await item.createProductReview({
        review,
        stars,
        userId: user.id
    })
    const currReview = await ProductReview.findByPk(newReview.id, {
        include: [{ model: User }]
    });
    res.status(201).json(currReview);
})

// =============================== ITEM IMAGES =============================== //


router.post('/:itemId/images', requireAuth, async (req, res) => {
    const { url } = req.body;
    const item = await Item.findByPk(req.params.itemId);
    console.log("URL -----------------------------------------------------------------------------------------------------> : ", url);
    if (!item) return res.status(404).json({ message: "Item could not be found" });
    const { user } = req;

    if (item.ownerId !== user.id) return res.status(403).json({ message: "Forbidden" });

    const newImage = await item.createItemImage({
        itemId: item.id,
        url
    })

    res.status(201).json(newImage)
})


module.exports = router;
