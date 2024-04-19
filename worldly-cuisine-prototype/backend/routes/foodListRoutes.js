const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/foodListControllers');

router.get('/getFoodItems', Controllers.getFoodItems);
router.post('/addFoodItem', Controllers.addFoodItem);
router.delete('/removeFoodItem/:name', Controllers.removeFoodItem);

module.exports = router;
