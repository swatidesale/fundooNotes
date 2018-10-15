var express = require('express');
const expressValidator = require('express-validator');

var router = express.Router();
router.use(expressValidator());

const userController = require('../../controllers/userController');

//routes for user functionality
router.post('/register',userController.signUp);
router.post('/login',userController.signIn);
router.post('/forgot',userController.forgotPassword);
router.post('/reset/:token',userController.resetPassword);
router.get('/register',userController.getAllRegisteredUsers);
router.put('/updateuser/:id',userController.updateUser);

module.exports = router;

