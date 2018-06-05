const formatArticles = (articlesRawData, userDocs) => {
  return articlesRawData.map(article => {
    const belongs_to = article.topic;
    const created_by = userDocs.find(
      user => user.username === article.created_by
    )._id;
    return { ...article, belongs_to, created_by };
  });
};

const formatComments = (commentsRawData, articleDocs, userDocs) => {
  return commentsRawData.map(comment => {
    const belongs_to = articleDocs.find(
      article => article.title === comment.belongs_to
    )._id;
    const created_by = userDocs.find(
      user => user.username === comment.created_by
    )._id;
    return { ...comment, belongs_to, created_by };
  });
};

module.exports = { formatArticles, formatComments };
