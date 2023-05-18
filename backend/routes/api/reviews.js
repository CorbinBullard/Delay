const express = require('express');
const { User, Item, ItemImage, ProductReview } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// Update Review
// router.get('/', async (req, res) => {
//     return res.json({message: "SUCCESS!"});
// })

router.put('/:reviewId', requireAuth, async (req, res) => {
    const { review, stars } = req.body;
    const currReview = await ProductReview.findByPk(req.params.reviewId);
    if (!currReview) return res.status(404).json({ message: 'Review could not be found' });
    const { user } = req;
    if (currReview.userId !== user.id) return res.status(403).json({ message: 'Forbidden' });

    await currReview.update({
        review,
        stars
    })
    const updatedReview = await ProductReview.findByPk(currReview.id, {
        include: [{ model: User }]
    })

    return res.status(201).json(updatedReview)

});

router.delete('/:reviewId', requireAuth, async (req, res) => {
    const review = await ProductReview.findByPk(req.params.reviewId);
    if (!review) res.status(404).json({ message: 'Review could not be found' });
    const { user } = req;
    if (review.userId !== user.id) return res.status(403).json({ message: 'Forbidden' });

    await review.destroy();
    
    res.json({message: 'Successfully Deleted'})
})


module.exports = router;
