const express = require('express');
const router = express.Router();

const imageServices = require('../../services/imageServices');
const profileImageServices = require('../../services/profileImageServices');

router.post('/uploadimage/:key',imageServices.addImage);
router.get('/uploadimage',imageServices.displayImage);

router.post('/uploadprofileimage/:key',profileImageServices.addProfileImage);
router.get('/uploadprofileimage',profileImageServices.displayImage);

module.exports = router;
