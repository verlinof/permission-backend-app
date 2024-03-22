const express = require('express');
const verificatorController = require('../controllers/verificatorController');
const verificatorAccess = require('../middleware/verificatorAccess');

const router = express.Router();

//Route
router.post('/accept-user/:id', verificatorAccess.checkVerificator, verificatorController.acceptUser);
router.post('/handle-permission/:id', verificatorAccess.checkVerificator, verificatorController.handlePermission);
router.get('/permissions', verificatorAccess.checkVerificator, verificatorController.getPermissions);
router.get('/permissions/:id', verificatorAccess.checkVerificator, verificatorController.getPermissionById);
router.get('/pending-users', verificatorAccess.checkVerificator, verificatorController.getPendingUsers);
router.get('/pending-users/:id', verificatorAccess.checkVerificator, verificatorController.getPendingUsers);

module.exports = router