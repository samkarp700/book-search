//import the gql tagged template function
const { gql } = require('apollo-server-express');

//create typeDefs
const typeDefs = gql `
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        books: [Book]
    }
    type Book {
        _id: ID
        bookTitle: String
        bookAuthor: String
        bookDescription: String
        username: String
        savedAt: Int

    }
    type Query {
        me: User
        users: [User]
        user(username: String!): User
        books(username: String): [Book]
        book(_id: ID!): Book
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addBook(bookTitle: String!): Book
    }

    type Auth {
        token: ID!
        user: User
    }
`;


//export typedefs
module.exports = typeDefs;