const express = require('express');
const router = express.Router();

const imageServices = require('../../services/imageServices');

router.post('/uploadimage/:key',imageServices.addImage);
router.get('/uploadimage',imageServices.displayImage);

module.exports = router;
