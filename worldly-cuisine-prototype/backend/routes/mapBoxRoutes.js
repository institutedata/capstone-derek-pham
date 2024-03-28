const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/mapBoxControllers')


router.get('/getCountryGEOJSON', Controllers.getCountryGEOJSON)

module.exports = router