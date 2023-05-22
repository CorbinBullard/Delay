const express = require('express');
const { User, Item, ItemImage, ProductReview } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();


router.delete('/:imageId', requireAuth, async (req, res) => {
    const image = await ItemImage.findByPk(req.params.imageId, {
        include: [{ model: Item, include: [{ model: User }] }]
    });
    if (!image) return res.status(404).json({message: 'Image not found'})
    const { user } = req;
    if (image.Item.ownerId !== user.id) return res.status(403).json({message: 'Forbidden'});

    console.log(image.toJSON())
    await image.destroy();

    res.status(201).json({message: 'Successfully deleted'})
})







module.exports = router;
