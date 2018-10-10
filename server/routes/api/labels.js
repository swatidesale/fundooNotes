const express = require('express');
const router = express.Router();

const labelController = require('../../controllers/labelController');

//Routes for label functionality
router.post('/labels',labelController.createNewLabel);
router.get('/labels',labelController.displayLabels);
router.delete('/labels/:id',labelController.deleteLabel);
router.put('/labels/:id',labelController.updateLabel);

module.exports = router;