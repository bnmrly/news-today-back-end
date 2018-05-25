const { User } = require('../models');

exports.getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  return User.find({ username: username })
    .then(user => {
      if (!user) throw { status: 404 };
      res.status(200).send({ user });
    })
    .catch(console.log);
};
