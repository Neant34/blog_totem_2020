const ObjectRepository = require("../repository/ObjectRepository");

module.exports = class TagRepository extends ObjectRepository {
  static findOrCreateTag = async (name, model) =>
    model.findOrCreate({
      where: { name: name },
    });
};
