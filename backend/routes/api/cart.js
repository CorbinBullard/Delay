const express = require('express');
const { User, Item, ItemImage, ProductReview, Cart } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');


const router = express.Router();


router.delete('/:cartId', requireAuth, async (req, res) => {
    const CartItem = await Cart.findByPk(req.params.cartId);
    if (!CartItem) return res.status(404).json({ message: 'Item not found' })
    const { user } = req;
    if (CartItem.userId !== user.id) return res.status(403).json({ message: 'Forbidden' });

    await CartItem.destroy();
    return res.status(201).json({ message: 'Success' });
})




module.exports = router;
