const express = require('express');
const permissionController = require('../controllers/permissionController');
const authAccess = require('../middleware/authAccess');
const permissionOwner = require('../middleware/permissionOwner');

const router = express.Router();

//Route
router.get('/', authAccess.checkAuth, permissionController.index);
router.get('/:permissionId', permissionOwner.checkOwner, permissionController.show);
router.post('/', authAccess.checkAuth, permissionController.store);
router.put('/:permissionId', permissionOwner.checkOwner, permissionController.update);
router.delete('/:permissionId', permissionOwner.checkOwner, permissionController.destroy);

module.exports = router