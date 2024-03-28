const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/foodExperienceControllers')

router.get('/getFoodExperience', Controllers.updateFoodExperience)

module.exports = router