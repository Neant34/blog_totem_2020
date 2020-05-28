"use strict";

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      content: DataTypes.TEXT,
    },
    {}
  );

  Comment.associate = function (models) {
    Comment.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    Comment.belongsTo(models.Article, {
      foreignKey: "articleId",
      onDelete: "CASCADE",
    });
  };

  return Comment;
};
