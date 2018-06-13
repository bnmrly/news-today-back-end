const { Comment } = require('../models');

exports.voteOnComment = (req, res, next) => {
  const { comment_id } = req.params;
  const { vote } = req.query;
  const amount = vote === 'up' ? 1 : vote === 'down' ? -1 : 0;
  return Comment.findByIdAndUpdate(
    comment_id,
    { $inc: { votes: amount } },
    { new: true }
  )
    .then(comment => res.send({ comment }))
    .catch(next);
};

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  return Comment.findByIdAndRemove({ _id: comment_id })
    .then(() => {
      res.send({ message: 'successfully deleted comment' });
    })
    .catch(err => {
      if (err.name === 'CastError') return next({ status: 400 });
      else next(err);
    });
};
