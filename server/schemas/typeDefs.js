//import the gql tagged template function
const { gql } = require('apollo-server-express');

//create typeDefs
const typeDefs = gql `
    type Book {
        _id: ID
        bookTitle: String
        bookAuthor: String
        bookDescription: String
        username: String
        savedAt: Int

    }
    type Query {
        books(username: String): [Book]
    }
`;


//export typedefs
module.exports = typeDefs;