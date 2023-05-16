const router = require('express').Router();
const { ValidationError } = require('sequelize');


router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});












module.exports = router;
