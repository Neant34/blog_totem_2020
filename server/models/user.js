"use strict";

const bcrypt = require("bcryptjs");
const Sequelize = require("sequelize");

const User = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    mail: {
      type: Sequelize.STRING,
      unique: true,
    },
    pseudo: {
      type: Sequelize.STRING,
      unique: true,
    },
    avatarLink: Sequelize.TEXT,
    isAdmin: Sequelize.BOOLEAN,
    password: {
      type: Sequelize.STRING,
      set: function (password) {
        const salt = bcrypt.genSaltSync();
        this.setDataValue("password", bcrypt.hashSync(password, salt));
      },
    },
  });

  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.associate = function (models) {
    User.hasMany(models.Article, {
      foreignKey: "userId",
      as: "Articles",
    });

    User.hasMany(models.Comment, {
      foreignKey: "userId",
      as: "Comments",
    });
  };

  return User;
};

module.exports = User;
