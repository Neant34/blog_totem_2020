const ObjectRepository = require("../repository/ObjectRepository");

module.exports = class CommentRepository extends ObjectRepository {
  static createCommentRep = async (content, articleId, userId, model) =>
    model.create({
      content: content,
      userId: userId,
      articleId: articleId,
    });
};
