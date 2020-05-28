const TagRepository = require("../repository/TagRepository");

module.exports = class TagService {
  static getTag = (name, model) =>
    TagRepository.findOneWithCondition(
      {
        where: { name: name },
      },
      model
    );

  static getAllTags = (model) => TagRepository.findAll(model);
};
