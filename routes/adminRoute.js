const express = require('express');
const adminController = require('../controllers/adminController');
const adminAccess = require('../middleware/adminAccess');

const router = express.Router();

//Route
router.get('/users', adminAccess.checkAdmin, adminController.getUsers);
router.post('/register-verificator', adminAccess.checkAdmin, adminController.registerVerificator);
router.put('/update-verificator/:userId', adminAccess.checkAdmin, adminController.updateVerificator);
router.put('/reset-password/:userId', adminAccess.checkAdmin, adminController.resetUserPassword);
router.get('/permissions', adminAccess.checkAdmin, adminController.getPermissions); //Admin and Verificator Access
router.get('/permissions/:permissionId', adminAccess.checkAdmin, adminController.getPermissionById); //Admin and Verificator Access

module.exports = router