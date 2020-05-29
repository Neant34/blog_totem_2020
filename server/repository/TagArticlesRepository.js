const ObjectRepository = require("../repository/ObjectRepository");

module.exports = class ArticleRepository extends ObjectRepository {
  static create = (articleId, tagId, model) =>
    model.create({
      articleId: articleId,
      tagId: tagId,
    });
};
