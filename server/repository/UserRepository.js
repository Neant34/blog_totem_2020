const ObjectRepository = require("../repository/ObjectRepository");

module.exports = class UserRepository extends ObjectRepository {
  static createUserRep = async (pseudo, mail, isAdmin, password, model) =>
    model.create({
      pseudo: pseudo,
      mail: mail,
      isAdmin: isAdmin,
      password: password,
    });
};
