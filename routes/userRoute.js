const express = require('express');
const userController = require('../controllers/userController');
const authAccess = require('../middleware/authAccess');

const router = express.Router();

//Route
router.post('/login', userController.login);
router.post('/register-user', userController.registerUser);
router.post('/register-admin', userController.registerAdmin);
router.post('/reset-password', authAccess.checkAuth, userController.resetPassword);

module.exports = router