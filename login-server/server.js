const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    password: String!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    addUser(username: String!, password: String!): User
  }
`;

const resolvers = {
  Query: {
    users: async () => await User.find({})
  },
  Mutation: {
    addUser: async (_, { username, password }) => {
      const newUser = new User({ username, password });
      await newUser.save();
      return newUser;
    }
  }
};

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();
