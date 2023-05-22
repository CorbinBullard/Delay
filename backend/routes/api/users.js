const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Item, ProductReview, Cart } = require('../../db/models');

const router = express.Router();

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

//SIGNUP
router.post(
    '',
    validateSignup,
    async (req, res) => {
        const { email, password, firstName, lastName, username } = req.body;
        const hashedPassword = bcrypt.hashSync(password);
        const user = await User.create({ email, username, firstName, lastName, hashedPassword });

        const safeUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
        };

        await setTokenCookie(res, safeUser);

        return res.json({
            user: safeUser
        });
    }
);

router.get('/my-listings', requireAuth, async (req, res) => {
    const { user } = req;

    if (!user) return res.status(403).json({ message: 'No Logged In User' });

    const data = await Item.findAll({
        where: { ownerId: user.id },
        include: [{ model: ProductReview }]
    });

    res.json(data);
})

// Cart

router.get('/cart', requireAuth, async (req, res) => {
    const { user } = req;

    if (!user) return res.status(403).json({ message: 'No Logged In User' });

    const cartItems = await Cart.findAll({
        where: { userId: user.id },
        include: [{ model: Item }]
    });
    res.json(cartItems);
})


module.exports = router;
