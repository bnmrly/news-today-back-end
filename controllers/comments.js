const { Comment } = require('../models');

// consider incorrect input on vote
exports.voteOnComment = (req, res, next) => {
  const { comment_id } = req.params;
  const { vote } = req.query;
  return Comment.findByIdAndUpdate(comment_id)
    .then(comment => {
      vote === 'up' ? comment.votes++ : comment.votes--;
      return comment.save();
    })
    .then(comment => res.send({ comment }))
    .catch(console.log);
};

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  return Comment.findByIdAndRemove({ _id: comment_id })
    .then(() => {
      res.send({ message: 'successfully deleted comment' });
    })
    .catch(console.log);
};
