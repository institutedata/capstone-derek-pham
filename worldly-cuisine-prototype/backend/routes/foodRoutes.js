const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/foodControllers')

router.get('/getFoodOrigin/:food', Controllers.getFoodOrigin)

module.exports = router