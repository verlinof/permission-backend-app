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
    const pendingUser = await models.PendingUser.findByPk(req.params.id);
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
    const user = await models.PendingUser.findByPk(req.params.id);
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
      await models.PendingUser.destroy({
        where: {
          id: req.params.id
        }
      })
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
    const permissions = await models.Permission.findAll();
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
    const permission = await models.Permission.findByPk(req.params.id);
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
    const permission = await models.Permission.findByPk(req.params.id);
    if (!permission) {
      return res.status(404).send({
        message: 'Permission not found'
      });
    }

    //Validate
    const response = req.params.status;
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
    if (response === 'approve') {
      await models.Permission.update({ status: 'approve' }, {
        where: {
          permissionId: req.params.id
        }
      })
    }
    await models.Permission.update({ status: 'decline' }, {
      where: {
        permissionId: req.params.id
      }
    })
    return res.status(200).send({
      message: 'Permission ' + response,
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