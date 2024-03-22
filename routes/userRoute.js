const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

//Route
router.post('/login', userController.login);
router.post('/register-user', userController.registerUser);
router.post('/register-admin', userController.registerAdmin);

module.exports = router