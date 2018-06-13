const { User } = require('../models');

exports.getUserByUsername = (req, res, next) => {
  return User.findOne(req.params)
    .then(user => {
      if (!user) throw { status: 404 };
      res.status(200).send({ user });
    })
    .catch(next);
};
