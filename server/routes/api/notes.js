const express = require('express');
const expressValidator = require('express-validator');

const router = express.Router();
router.use(expressValidator());

const noteController = require('../../controllers/noteController');

//routes for note functionality
router.post('/notes',noteController.createNewNote);
router.get('/notes',noteController.displayNotes);
router.delete('/notes/:id',noteController.deleteNote);
router.put('/notes/:id',noteController.updateNote);
router.post('/sharenote',noteController.shareNote);

module.exports = router;