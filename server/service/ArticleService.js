const { ApolloError } = require("apollo-server");
const { Op } = require("sequelize");
const awsService = require("./awsService");
const ArticleRepository = require("../repository/ArticleRepository");
const TagRepository = require("../repository/TagRepository");
const TagArticlesRepository = require("../repository/TagArticlesRepository");

module.exports = class ArticleService {
  static getArticle = (id, model, user) =>
    ArticleRepository.findOneWithCondition(
      {
        where: {
          id: id,
          [Op.or]: [{ isPublic: { [Op.is]: true } }, { userId: user.userId }],
        },
      },
      model
    );

  static getAllArticles = (model, user) =>
    ArticleRepository.findAllWithCondition(
      {
        where: {
          [Op.or]: [{ isPublic: { [Op.is]: true } }, { userId: user.userId }],
        },
      },
      model
    );

  static createArticle = async (
    title,
    content,
    isPublic,
    tags,
    img,
    models,
    userId
  ) => {
    const article = await ArticleRepository.createArticleRep(
      title,
      content,
      isPublic,
      userId,
      models.Article
    );
    tags.forEach(async (tag) => {
      tag = tag.toLowerCase();
      const [newTag, _] = await TagRepository.findOrCreateTag(tag, models.Tag);
      TagArticlesRepository.create(article.id, newTag.id, models.TagArticles);
    });

    const fileName = await awsService.uploadFile(img, article.id);

    article.set("imgLink", awsService.getLink(fileName));
    await article.save();

    return article;
  };

  static updateArticle = (id, title, content, isPublic, model, user) =>
    ArticleRepository.findById(id, model).then(async (article) => {
      if (!article) {
        throw new ApolloError("Article not found", "ARTICLE_NOT_FOUND");
      } else {
        if (article.userId === user.userId || user.isAdmin) {
          title !== undefined && article.set("title", title);
          content !== undefined && article.set("content", content);
          isPublic !== undefined && article.set("isPublic", isPublic);
          await article.save();
          return article;
        } else {
          throw new ApolloError("User connected isn't an admin", "MISS_RIGHT");
        }
      }
    });

  static deleteArticle = (id, model, user) =>
    ArticleRepository.findById(id, model).then(async (article) => {
      if (!article) {
        throw new ApolloError("Article not found", "ARTICLE_NOT_FOUND");
      } else {
        if (article.userId === user.userId || user.isAdmin) {
          await article.destroy();
          return true;
        } else {
          throw new ApolloError("User connected isn't an admin", "MISS_RIGHT");
        }
      }
    });
};
