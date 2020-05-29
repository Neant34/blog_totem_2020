const ObjectRepository = require("../repository/ObjectRepository");

module.exports = class TagRepository extends ObjectRepository {
  static findOrCreateTag = (name, model) =>
    model.findOrCreate({
      where: { name: name },
    });
};
