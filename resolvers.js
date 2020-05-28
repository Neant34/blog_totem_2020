"use strict";

const authenticated = require("./server/authenticated");
const UserService = require("./server/service/UserService");
const ArticleService = require("./server/service/ArticleService");
const TagService = require("./server/service/TagService");
const CommentService = require("./server/service/CommentService");

module.exports = {
  Article: {
    user: (parent, _0, _1) => parent.getUser(),
    comments: (parent, _0, _1) => parent.getComments(),
    tags: (parent, _0, _1) => parent.getTag(),
  },

  User: {
    articles: (parent, _0, _1) => parent.getArticles(),
    comments: (parent, _0, _1) => parent.getComments(),
  },

  Comment: {
    user: (parent, _0, _1) => parent.getUser(),
    article: (parent, _0, _1) => parent.getArticle(),
  },

  Tag: {
    articles: (parent, _0, _1) => parent.getArticle(),
  },

  Query: {
    getUser: authenticated((_0, { id }, { models }) =>
      UserService.getUser(id, models.User)
    ),
    getAllUsers: authenticated((_0, _1, { models }) =>
      UserService.getAllUser(models.User)
    ),
    getArticle: authenticated((_0, { id }, { models, user }) =>
      ArticleService.getArticle(id, models.Article, user)
    ),
    getAllArticles: authenticated((_0, _1, { models, user }) =>
      ArticleService.getAllArticles(models.Article, user)
    ),
    getTag: authenticated((_0, { name }, { models }) =>
      TagService.getTag(name, models.Tag)
    ),
    getAllTags: authenticated((_0, _1, { models }) =>
      TagService.getAllTags(models.Tag)
    ),
  },

  Mutation: {
    createUser: async (
      _0,
      { pseudo, mail, isAdmin, password, avatarName },
      { models }
    ) =>
      await UserService.createUser(
        pseudo,
        mail,
        isAdmin,
        password,
        avatarName,
        models.User
      ),
    updateUser: authenticated(
      async (_0, { pseudo, mail, password }, { models, user }) =>
        await UserService.updateUser(pseudo, mail, password, models.User, user)
    ),
    deleteUser: authenticated(
      async (_0, { id }, { models }) =>
        await UserService.destroyUser(id, models.User)
    ),
    connection: (_0, { pseudo, password }, { models }) =>
      UserService.connection(pseudo, password, models.User),

    createArticle: authenticated(
      async (_0, { title, content, isPublic, tags, img }, { models, user }) =>
        await ArticleService.createArticle(
          title,
          content,
          isPublic,
          tags,
          img,
          models,
          user.userId
        )
    ),
    updateArticle: authenticated(
      (_0, { id, title, content, isPublic }, { models, user }) =>
        ArticleService.updateArticle(
          id,
          title,
          content,
          isPublic,
          models.Article,
          user
        )
    ),
    deleteArticle: authenticated((_, { id }, { models, user }) =>
      ArticleService.deleteArticle(id, models.Article, user)
    ),

    createComment: authenticated(
      async (_0, { content, articleId }, { models, user }) =>
        await CommentService.createComment(
          content,
          articleId,
          user.userId,
          models.Comment
        )
    ),
    updateComment: authenticated(
      async (_0, { id, content }, { models, user }) =>
        await CommentService.updateComment(id, content, models.Comment, user)
    ),
    deleteComment: authenticated(
      async (_0, { id }, { models, user }) =>
        await CommentService.deleteComment(id, models.Comment, user)
    ),
  },
};
