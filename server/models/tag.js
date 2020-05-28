"use strict";

module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    "Tag",
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {}
  );

  Tag.associate = function (models) {
    Tag.belongsToMany(models.Article, {
      through: "TagArticles",
      as: "article",
      foreignKey: "tagId",
    });
  };

  return Tag;
};
