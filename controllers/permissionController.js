const models = require('../models');
const bcryptjs = require('bcryptjs');
const Validator = require('fastest-validator');
const jwt = require('jsonwebtoken');

async function index(req, res) {
  try {
    //Only find the permission from login users
    const permissions = await models.Permission.findAll({
      where: {
        userId: req.user
      }
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

async function show(req, res) {
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

async function store(req, res) {
  try {
    const permissionData = {
      userId: req.user,
      title: req.body.title,
      description: req.body.description,
    }
    //Validate input
    const validator = new Validator();
    const validationResponse = await validator.validate(permissionData, {
      title: { type: 'string', optional: false, max: '50' }, //Max 20 karakter
      description: { type: 'string', optional: false },
    })
    if (validationResponse !== true) {
      return res.status(400).send({
        message: 'Validation failed',
        data: validationResponse
      });
    }
    const permission = await models.Permission.create({
      userId: req.user,
      title: req.body.title,
      description: req.body.description,
      status: 'waiting'
    });
    return res.status(201).send({
      message: 'Permission created successfully',
      data: permission
    });
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
}

async function update(req, res) {
  try {
    const permission = await models.Permission.findByPk(req.params.permissionId);
    if (!permission) {
      return res.status(404).send({
        message: 'Permission not found'
      });
    }
    const permissionData = {
      userId: req.user,
      title: req.body.title,
      description: req.body.description,
    }
    //Validate input
    const validator = new Validator();
    const validationResponse = await validator.validate(permissionData, {
      title: { type: 'string', optional: false, max: '50' }, //Max 20 karakter
      description: { type: 'string', optional: false },
    })
    if (validationResponse !== true) {
      return res.status(400).send({
        message: 'Validation failed',
        data: validationResponse
      });
    }
    const response = await permission.update(permissionData);
    return res.status(200).send({
      message: 'Permission fetched successfully',
      data: response
    });
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
}

async function destroy(req, res) {
  try {
    const permission = await models.Permission.findByPk(req.params.permissionId);
    if (!permission) {
      return res.status(404).send({
        message: 'Permission not found'
      });
    }
    const response = await permission.destroy();
    return res.status(200).send({
      message: 'Permission deleted successfully',
      data: response
    });
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy
}