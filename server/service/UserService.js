const jwt = require("jsonwebtoken");
const awsService = require("./awsService");
const jwtService = require("./jwtService");
const UserRepository = require("../repository/UserRepository");

module.exports = class UserService {
  static getUser = (id, model) => UserRepository.findById(id, model);

  static getAllUser = (model) => UserRepository.findAll(model);

  static createUser = async (
    pseudo,
    mail,
    isAdmin,
    password,
    avatarName,
    model
  ) => {
    const toCreate = await UserRepository.createUserRep(
      pseudo,
      mail,
      isAdmin,
      password,
      model
    );

    const fileName = await awsService.uploadFile(avatarName, toCreate.id);
    toCreate.set("avatarLink", awsService.getLink(fileName));
    await toCreate.save();

    return toCreate;
  };

  static updateUser = async (pseudo, mail, password, model, user) => {
    const userToUpdate = UserRepository.findById(user.userId, model);

    pseudo !== undefined && userToUpdate.set("pseudo", pseudo);
    mail !== undefined && userToUpdate.set("mail", mail);
    password !== undefined && userToUpdate.set("password", password);

    await userToUpdate.save();

    return userToUpdate;
  };

  static destroyUser = async (id, model) =>
    await UserRepository.destroy(id, model);

  static connection = (pseudo, password, model) =>
    UserRepository.findOneWithCondition(
      { where: { pseudo: pseudo } },
      model
    ).then((user) => {
      if (!user) {
        return {
          __typename: "ConnectionRefused",
          message: "User not found!",
        };
      } else if (!user.validPassword(password)) {
        return {
          __typename: "ConnectionRefused",
          message: "Incorrect password!",
        };
      } else {
        const token = jwtService.sign({
          userId: user.id,
          isAdmin: user.isAdmin,
        });
        return {
          __typename: "Connection",
          id: user.id,
          token: token,
        };
      }
    });
};
