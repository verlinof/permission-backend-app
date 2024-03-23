const models = require('../models');
const Validator = require('fastest-validator');
const bcryptjs = require('bcryptjs');

async function getUsers(req, res) {
  try {
    const users = await models.User.findAll({
      attributes: { exclude: ['password'] }
    });
    const pendingUser = await models.PendingUser.findAll();
    return res.status(200).send({
      message: 'Users fetched successfully',
      data: {
        users: users,
        pendingUser: pendingUser
      }
    });
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
}

async function registerVerificator(req, res) {
  try {
    const isUserExist = await models.User.findOne({
      where: {
        username: req.body.username
      }
    });
    //Check if user is pending
    const isPendingUserExist = await models.User.findOne({
      where: {
        username: req.body.username
      }
    })
    //Exception Handling
    if (isUserExist || isPendingUserExist) {
      return res.status(409).send({
        message: 'User already exists'
      });
    }

    const userData = {
      username: req.body.username,
      password: req.body.password
    };
    //Validate
    const validator = new Validator();
    const validationResponse = await validator.validate(userData, {
      username: { type: 'string', optional: false, max: '20' }, //Max 20 karakter
      password: { type: 'string', optional: false, max: '50' },
    });
    if (validationResponse !== true) {
      return res.status(400).send({
        message: 'Validation failed',
        data: validationResponse
      });
    }
    const hash = await bcryptjs.hash(req.body.password, 10);
    const verificator = await models.User.create({
      username: req.body.username,
      password: hash,
      status: 'verificator'
    });
    return res.status(200).send({
      message: 'Verificator created successfully',
      data: verificator
    });
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
}

async function updateVerificator(req, res) {
  try {
    const verificator = await models.User.findByPk(req.params.userId);
    //Exception Handling
    if (!verificator) {
      return res.status(404).send({
        message: 'Verificator not found'
      });
    }
    if (verificator.status === 'admin') {
      return res.status(400).send({
        message: 'Admin cannot update verificator'
      });
    }
    if (verificator.status === 'verificator') {
      return res.status(400).send({
        message: 'Verificator already exists'
      });
    }
    //Success Update
    const response = await verificator.update({
      status: 'verificator'
    })
    return res.status(200).send({
      message: 'Verificator updated successfully',
      data: response
    });
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
}

async function resetUserPassword(req, res) {
  try {
    const user = await models.User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).send({
        message: 'User not found'
      });
    }
    if (user.status === 'admin') {
      return res.status(400).send({
        message: 'Admin cannot reset password'
      });
    }
    const validator = new Validator();
    const validationResponse = await validator.validate(req.body, {
      password: { type: 'string', optional: false, max: '50' },
    })
    if (validationResponse !== true) {
      return res.status(400).send({
        message: 'Validation failed',
        data: validationResponse
      });
    }
    const hash = await bcryptjs.hash(req.body.password, 10);
    const response = await user.update({
      password: hash
    })
    return res.status(200).send({
      message: 'User updated successfully',
      data: response
    });
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
    const permission = await models.Permission.findByPk(req.params.permissionId, {
      include: [{
        model: models.User
      }]
    });
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

module.exports = {
  getUsers,
  registerVerificator,
  updateVerificator,
  resetUserPassword,
  getPermissions,
  getPermissionById
}