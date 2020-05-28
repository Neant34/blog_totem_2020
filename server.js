const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const jwt = require("jsonwebtoken");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const models = require("./server/models");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    let authToken = null;
    let user = null;

    try {
      authToken = req.headers.authorization;

      if (authToken) {
        user = jwt.verify(authToken, "RANDOM_TOKEN_SECRET");
      }
    } catch (e) {
      console.warn(`Unable to authenticate using auth token: ${authToken}`);
    }

    return { models, user };
  },
});

const app = express();

server.applyMiddleware({ app });

models.sequelize.authenticate();
models.sequelize.sync();

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
