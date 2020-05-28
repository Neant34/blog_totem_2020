const { ApolloError } = require("apollo-server");
const CommentRepository = require("../repository/CommentRepository");

module.exports = class CommentService {
  static createComment = (content, articleId, userId, model) =>
    CommentRepository.createCommentRep(content, articleId, userId, model);

  static updateComment = (id, content, model, user) =>
    CommentRepository.findById(id, model).then(async (comment) => {
      if (!comment) {
        throw new ApolloError("Comment not found", "COMMENT_NOT_FOUND");
      } else {
        if (comment.userId === user.userId || user.isAdmin) {
          content !== undefined && comment.set("content", content);
          await comment.save();
          return comment;
        } else {
          throw new ApolloError("User connected isn't an admin", "MISS_RIGHT");
        }
      }
    });

  static deleteComment = (id, model, user) =>
    CommentRepository.findById(id, model).then(async (comment) => {
      if (!comment) {
        throw new ApolloError("Comment not found", "COMMENT_NOT_FOUND");
      } else {
        if (comment.userId === user.userId || user.isAdmin) {
          await comment.destroy();
          return true;
        } else {
          throw new ApolloError("User connected isn't an admin", "MISS_RIGHT");
        }
      }
    });
};
