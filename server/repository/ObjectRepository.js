const db = require("../models/index");

module.exports = class ObjectRepository {
  static findById = (id, model) => model.findByPk(id);
  static findOneWithCondition = (condition, model) => model.findOne(condition);
  static findAll = (model) => model.findAll();
  static findAllWithCondition = (condition, model) => model.findAll(condition);
  static destroy = (id, model) => model.destroy({ where: { id: id } });
  static query = async (query, params) =>
    await db.sequelize.query(query, params);
};
