const express = require('express');
const verificatorController = require('../controllers/verificatorController');
const verificatorAccess = require('../middleware/verificatorAccess');
const adminVerificatorAccess = require('../middleware/adminVerificatorAccess');

const router = express.Router();

//Route
router.post('/accept-user/:pendingUserId', verificatorAccess.checkVerificator, verificatorController.acceptUser);
router.put('/handle-permission/:permissionId', verificatorAccess.checkVerificator, verificatorController.handlePermission);
router.get('/permissions', adminVerificatorAccess.checkAdminVerificator, verificatorController.getPermissions); //Admin and Verificator Access
router.get('/permissions/:permissionId', adminVerificatorAccess.checkAdminVerificator, verificatorController.getPermissionById); //Admin and Verificator Access
router.get('/pending-users', verificatorAccess.checkVerificator, verificatorController.getPendingUsers);
router.get('/pending-users/:pendingUserId', verificatorAccess.checkVerificator, verificatorController.getPendingUsers);

module.exports = router