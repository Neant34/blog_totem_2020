const ObjectRepository = require("../repository/ObjectRepository");

module.exports = class ArticleRepository extends ObjectRepository {
  static createArticleRep = async (title, content, isPublic, userId, model) =>
    model.create({
      title: title,
      content: content,
      isPublic: isPublic,
      userId: userId,
    });
};
