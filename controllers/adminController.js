const models = require('../models');
const Validator = require('fastest-validator');

async function getUsers(req, res) {
  try {
    const users = await models.User.findAll({
      where: { status: !'admin' }, //Selain admin
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

async

module.exports = {
  getUsers
}