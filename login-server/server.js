const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');

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
    login(username: String!, password:String!):User
  }

  type Mutation {
    addUser(username: String!, password: String!): User
  }
`;

const resolvers = {
  Query: {
    users: async () => await User.find({}),
    login: async (_, {username, password}) =>{
      const user = await User.findOne({username});
      if (!user) {
        throw new Error('User not found');
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error('Invalid password');
      }
      return user; 
    }
  },
  Mutation: {
    addUser: async (_, { username, password }) => {
      const hashedPassword= await bcrypt.hash(password, 10); // hash the password
      const newUser = new User({ username, password: hashedPassword });
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
