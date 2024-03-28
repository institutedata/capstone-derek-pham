const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/foodBarChartControllers')

router.get('/newBarChartData', Controllers.getNewData)

module.exports = router