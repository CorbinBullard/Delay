const express = require('express');
const { User, Item, ItemImage, ProductReview, Cart } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { multipleFilesUpload, multipleMulterUpload, retrievePrivateFile, singleFileUpload, singleMulterUpload } = require("../../aws");
const router = express.Router();
const { Op } = require('sequelize');


// Get all items
router.get('/', async (req, res) => {

    const { name, minPrice, maxPrice, brand, condition, instrumentType, year } = req.query;
    const where = {};
    console.log("BRAND ------------------------------> : ", brand)

    if (name) {
        if (process.env.NODE_ENV === 'production') {
            where[Op.or] = [{ name: { [Op.iLike]: `%${name}%` } },
            { name: { [Op.iLike]: `%${name}%` } },
            { brand: { [Op.iLike]: `%${name}%` } },
            { instrumentType: { [Op.iLike]: `%${name}%` } },
            { condition: { [Op.iLike]: `%${name}%` } }
            ]
        } else {
            where[Op.or] = [{ name: { [Op.substring]: name } },
            { name: { [Op.substring]: name } },
            { brand: { [Op.substring]: name } },
            { instrumentType: { [Op.substring]: name } },
            { condition: { [Op.substring]: name } }]
        }
    }

    if (minPrice && maxPrice) where.price = { [Op.between]: [minPrice, maxPrice] }
    else {
        if (minPrice) where.price = { [Op.gte]: minPrice }
        if (maxPrice) where.price = { [Op.lte]: maxPrice }
    }

    if (brand) {
        if (process.env.NODE_ENV === 'production') {
            where.brand = { [Op.iLike]: `%${brand}%` }

        } else {
            where.brand = { [Op.substring]: brand }
        }
    }

    if (instrumentType) where.instrumentType = instrumentType;
    if (condition) where.condition = condition
    if (year) where.year = year;


    const data = await Item.findAll({
        where,
        include: [{ model: ProductReview }]
    })

    res.json(data);
})


// Get single Item
router.get('/:itemId', async (req, res) => {
    const data = await Item.findByPk(req.params.itemId, {
        include: [{ model: ProductReview, include: { model: User } }, { model: ItemImage }, { model: User }]
    });
    const item = data.toJSON();
    console.log("ITEM BACKEND -------------> ", item)
    // item.ItemImages = item.ItemImages.map(image => retrievePrivateFile(image))

    res.json(item);
})

// Create Item Listing
router.post('/', singleMulterUpload('image'), requireAuth, async (req, res) => {
    const { name, brand, price, description, instrumentType, year, condition } = req.body;
    const { user } = req;

    const key = await singleFileUpload({ file: req.file, public: true });

    const newItem = await Item.create({
        ownerId: user.id,
        name,
        brand,
        price,
        description,
        instrumentType,
        year,
        condition,
        previewImage: key
    });
    const data = await Item.findByPk(newItem.id, {
        include: [{ model: ProductReview, include: { model: User } }, { model: ItemImage }, { model: User }]
    });

    res.status(201).json(data);
})

// Update an Item
router.put('/:itemId', singleMulterUpload('image'), requireAuth, async (req, res) => {
    const item = await Item.findByPk(req.params.itemId);

    if (!item) return res.status(404).json({ message: 'Item could not be found' });

    const { user } = req;
    if (item.ownerId !== user.id) return res.status(403).json({ message: "Forbidden" });

    const { name, brand, price, description, instrumentType, year, condition } = req.body;

    const key = await singleFileUpload({ file: req.file, public: true });

    const newItem = await item.update({
        name,
        brand,
        price,
        description,
        instrumentType,
        year,
        condition,
        previewImage: key
    })
    const data = await Item.findByPk(newItem.id, {
        include: [{ model: ProductReview, include: { model: User } }, { model: ItemImage }, { model: User }]
    });

    return res.json(data);
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


router.post('/:itemId/images', singleMulterUpload('image'), requireAuth, async (req, res) => {

    const item = await Item.findByPk(req.params.itemId);
    if (!item) return res.status(404).json({ message: "Item could not be found" });
    const { user } = req;

    if (item.ownerId !== user.id) return res.status(403).json({ message: "Forbidden" });

    const key = await singleFileUpload({ file: req.file, public: true });
    console.log("key / FILE ----------------------->", key, req.file)


    const newImage = await item.createItemImage({
        itemId: item.id,
        url: key
    })

    res.status(201).json(newImage)
})

// =============================== CART =============================== //

//Add Item to cart
router.post('/:itemId/add-to-cart', requireAuth, async (req, res) => {

    const item = await Item.findByPk(req.params.itemId);
    if (!item) return res.status(404).json({ message: "Item could not be found" });
    const { user } = req;
    if (!user) return res.status(403).json({ message: 'No Logged In User' });

    const cartItem = await Cart.create({
        itemId: item.id,
        userId: user.id
    })
    const newCartItem = await Cart.findByPk(cartItem.id, {
        include: [{ model: Item }]
    })

    res.status(201).json(newCartItem);

})


module.exports = router;
