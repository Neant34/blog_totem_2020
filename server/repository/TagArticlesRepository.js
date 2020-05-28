const ObjectRepository = require("../repository/ObjectRepository");

module.exports = class ArticleRepository extends ObjectRepository {
  static create = async (articleId, tagId, model) =>
    model.create({
      articleId: articleId,
      tagId: tagId,
    });
};
