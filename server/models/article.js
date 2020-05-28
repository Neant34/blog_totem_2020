"use strict";

module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define(
    "Article",
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      isPublic: DataTypes.BOOLEAN,
      imgLink: DataTypes.TEXT,
    },
    {}
  );

  Article.associate = function (models) {
    Article.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    Article.hasMany(models.Comment, {
      foreignKey: "articleId",
      as: "Comments",
    });

    Article.belongsToMany(models.Tag, {
      through: "TagArticles",
      as: "tag",
      foreignKey: "articleId",
    });
  };
  return Article;
};
