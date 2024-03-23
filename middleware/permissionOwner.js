const jwt = require('jsonwebtoken');
const models = require('../models');

async function checkOwner(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const permissionId = req.params.permissionId;
    const permission = await models.Permission.findByPk(permissionId);
    if (!permission) {
      return res.status(404).send({
        message: 'Permission not found'
      });
    }

    // verifies secret and checks expiration
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(500).send({
          auth: false,
          message: 'Failed to authenticate token.'
        });
      }
      if (decoded.id !== permission.userId) {
        return res.status(403).send({
          auth: false,
          message: 'Permission denied'
        });
      }
      req.user = decoded.id;
      next();
    });
  } catch (e) {
    return res.status(401).send({
      auth: false,
      message: 'No token provided.'
    });
  }
}

module.exports = {
  checkOwner
}