const express = require('express');
//import apolloserver
const { ApolloServer } = require('apollo-server-express');

//import typedefs and resolvers
const { typeDefs, resolvers } = require('./schemas');

const path = require('path');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');


const app = express();
const PORT = process.env.PORT || 3001;
//create a new apollo server
const server = new ApolloServer({
  typeDefs, 
  resolvers, 
  context: authMiddleware
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build'));
});

const startApolloServer = async(typeDefs, resolvers) => {
  await server.start();
  //integrate apollo server with express as mware
  server.applyMiddleware({ app });
}

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}



db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
});


startApolloServer(typeDefs, resolvers);