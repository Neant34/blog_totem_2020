"use strict";
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const TagArticles = sequelize.define("TagArticles", {
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Article",
        key: "id",
      },
    },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Tag",
        key: "id",
      },
    },
  });

  return TagArticles;
};
