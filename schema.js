"use strict";

const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: Int!
    pseudo: String!
    mail: String!
    isAdmin: Boolean!
    password: String!
    articles: [Article!]!
    comments: [Comment!]!
    avatarLink: String!
  }

  type Article {
    id: Int!
    title: String!
    content: String!
    isPublic: Boolean!
    user: User!
    comments: [Comment!]!
    tags: [Tag!]!
    imgLink: String!
  }

  type Comment {
    id: Int!
    content: String!
    user: User!
    article: Article!
  }

  type Tag {
    id: Int!
    name: String!
    articles: [Article!]!
  }

  type TagArticles {
    id: Int!
    articleId: [Article]!
    tagId: [Tag]!
  }

  type Connection {
    id: Int!
    token: String!
  }

  type ConnectionRefused {
    message: String!
  }

  union ConnectionResult = Connection | ConnectionRefused

  type Query {
    getUser(id: Int!): User!
    getArticle(id: Int!): Article!
    getAllUsers: [User!]!
    getAllArticles: [Article]
    getTag(name: String!): Tag!
    getAllTags: [Tag!]!
  }

  type Mutation {
    createUser(
      pseudo: String!
      mail: String!
      isAdmin: Boolean!
      password: String!
      avatarName: String!
    ): User!
    updateUser(pseudo: String, mail: String, password: String): User!
    deleteUser(id: Int!): Boolean
    connection(pseudo: String!, password: String!): ConnectionResult!
    disconnect: String!

    createArticle(
      title: String!
      content: String!
      isPublic: Boolean!
      tags: [String!]
      img: String!
    ): Article!
    updateArticle(
      id: Int!
      title: String
      content: String
      isPublic: Boolean
    ): Article
    deleteArticle(id: Int!): Boolean

    createComment(content: String!, articleId: Int!): Comment!
    updateComment(id: Int!, content: String!): Comment!
    deleteComment(id: Int!): Boolean
  }
`;

module.exports = typeDefs;
