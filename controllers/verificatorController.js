const models = require('../models');
const Validator = require('fastest-validator');

async function getPendingUsers(req, res) {
  try {
    const pendingUsers = await models.PendingUser.findAll();
    return res.status(200).send({
      message: 'Pending Users fetched successfully',
      data: pendingUsers
    });
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
}

async function pendingUserById(req, res) {
  try {
    const pendingUser = await models.PendingUser.findByPk(req.params.pendingUserId);
    if (!pendingUser) {
      return res.status(404).send({
        message: 'Pending User not found'
      });
    }
    return res.status(200).send({
      message: 'Pending User fetched successfully',
      data: pendingUser
    });
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
}

async function acceptUser(req, res) {
  try {
    const user = await models.PendingUser.findByPk(req.params.pendingUserId);
    if (!user) {
      return res.status(404).send({
        message: 'User not found'
      });
    }
    const userData = {
      username: user.username,
      password: user.password,
      status: 'default'
    }
    //Handle new User from pending to active
    const newUser = await models.User.create(userData);
    if (newUser) {
      const pendingUser = await models.PendingUser.findByPk(req.params.pendingUserId)
      await pendingUser.destroy();
    }

    return res.status(200).send({
      message: 'User accepted',
      data: newUser
    })
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
}

async function getPermissions(req, res) {
  try {
    const permissions = await models.Permission.findAll({
      include: [{
        model: models.User
      }]
    });
    return res.status(200).send({
      message: 'Permissions fetched successfully',
      data: permissions
    });
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
}

async function getPermissionById(req, res) {
  try {
    const permission = await models.Permission.findByPk(req.params.permissionId);
    if (!permission) {
      return res.status(404).send({
        message: 'Permission not found'
      });
    }
    return res.status(200).send({
      message: 'Permission fetched successfully',
      data: permission
    });
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
}

async function handlePermission(req, res) {
  try {
    const permission = await models.Permission.findByPk(req.params.permissionId);
    if (!permission) {
      return res.status(404).send({
        message: 'Permission not found'
      });
    }
    //Validate
    const response = { status: req.body.status };
    const validator = new Validator();
    const validationResponse = await validator.validate(response, {
      status: { type: 'enum', values: ['approve', 'decline'] }
    })
    if (validationResponse !== true) {
      return res.status(400).send({
        message: 'Validation failed',
        data: validationResponse
      });
    }
    if (response.status === 'approve') {
      await permission.update({ status: 'approve' }, {
        where: {
          permissionId: req.params.id
        }
      })
      return res.status(200).send({
        message: 'Permission Approved',
        data: permission
      })
    }
    await permission.update({ status: 'decline' }, {
      where: {
        permissionId: req.params.id
      }
    })
    return res.status(200).send({
      message: 'Permission Declined',
      data: permission
    })
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
}

module.exports = {
  getPendingUsers,
  pendingUserById,
  acceptUser,
  handlePermission,
  getPermissions,
  getPermissionById
}